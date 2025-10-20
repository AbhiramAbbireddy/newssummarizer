import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import * as cheerio from 'cheerio';

// --- 1. SETUP ---
dotenv.config();
const app = express();
const port = 3001; // We'll run the server on port 3001

// Middlewares
app.use(cors()); // Allow requests from our React app
app.use(express.json()); // Allow the server to read JSON

// --- 2. GEMINI API SETUP ---
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined in .env");
}
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

// This is the prompt we'll send to Gemini
const generationPrompt = (articleText) => `
You are an expert content strategist.
Your task is to analyze the following news article text and generate a concise summary and platform-specific social media posts.

**Article Text:**
---
${articleText}
---

**Instructions:**
Generate a response in a valid JSON format. Do not include any text or markdown formatting (like \`\`\`json) outside of the JSON block.
The JSON object must have the following keys: "summary", "linkedin", "twitter", "instagram", and "youtube".

**JSON Format:**
{
  "summary": "A concise, neutral summary of the article in 3-4 sentences.",
  "linkedin": "A professional post for LinkedIn, highlighting key insights and ending with a question to engage professionals.",
  "twitter": "A short, engaging tweet (X post) under 280 characters, using 2-3 relevant hashtags.",
  "instagram": "A compelling caption for an Instagram post. Start with a strong hook and use relevant emojis.",
  "youtube": "A brief description or script idea for a YouTube video based on the article's main points."
}
`;

// --- 3. HELPER FUNCTIONS ---

// Function to call Gemini API
async function generateContent(articleText) {
  try {
    const prompt = generationPrompt(articleText);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Clean the response
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    // Parse and return the JSON
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    if (error.message.includes('safety')) {
      throw new Error("Content blocked by Gemini's safety settings.");
    }
    throw new Error("Failed to generate content from Gemini API.");
  }
}

// Function to scrape text from a URL
async function scrapeTextFromUrl(url) {
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const $ = cheerio.load(data);
    
    let articleText = '';
    $('p').each((i, elem) => {
      articleText += $(elem).text() + '\n\n';
    });
    
    if (!articleText) {
      throw new Error("Could not find any paragraph text on the page.");
    }
    
    return articleText;
  } catch (error) {
    console.error("Scraping Error:", error.message);
    throw new Error(`Failed to scrape text from URL. ${error.message}`);
  }
}

// --- 4. API ENDPOINTS ---
app.post('/api/summarize-text', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "No text provided." });
    }
    
    const result = await generateContent(text);
    res.json(result);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/summarize-url', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "No URL provided." });
    }

    const articleText = await scrapeTextFromUrl(url);
    const result = await generateContent(articleText);
    res.json(result);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- 5. START SERVER ---
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});