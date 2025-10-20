// src/App.jsx
import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import InputArea from './components/InputArea/InputArea';
import Loader from './components/Loader/Loader'; // <-- 1. IMPORT LOADER
import ResultsArea from './components/ResultsArea/ResultsArea'; // <-- 2. IMPORT RESULTSAREA
import Footer from './components/Footer/Footer';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';

// Define the server URL
const API_BASE_URL = "https://newssummarizer-jxn0.onrender.com";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [socialPosts, setSocialPosts] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerateContent = async (inputType, content) => {
    setIsLoading(true);
    setError(null);
    setSummary("");
    setSocialPosts(null);

    try {
      let endpoint = '';
      let body = {};

      if (inputType === 'url') {
        endpoint = `${API_BASE_URL}/api/summarize-url`;
        body = { url: content };
      } else { // inputType === 'text'
        endpoint = `${API_BASE_URL}/api/summarize-text`;
        body = { text: content };
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `HTTP error! status: ${response.status}`);
      }

      const results = await response.json();
      
      setSummary(results.summary);
      setSocialPosts(results); 

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <ThemeToggle />
      <div className="container">
        <Header />
        
        <main>
          <InputArea onGenerate={handleGenerateContent} isLoading={isLoading} />

          {/* --- 3. UPDATE THE RESULTS DISPLAY --- */}
          
          {/* Show Loader when loading */}
          {isLoading && <Loader />}
          
          {/* Show error if one exists */}
          {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>Error: {error}</p>}
          
          {/* Show ResultsArea when not loading AND summary exists */}
          {!isLoading && summary && (
            <ResultsArea summary={summary} socialPosts={socialPosts} />
          )}

        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;