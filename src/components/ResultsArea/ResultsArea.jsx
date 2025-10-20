// src/components/ResultsArea/ResultsArea.jsx
import React from 'react';
import './ResultsArea.css';
// 1. IMPORT THE CARD AND ICONS
import SocialPostCard from '../SocialPostCard/SocialPostCard';
import { FaLinkedin, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

// 2. DEFINE PLATFORM-SPECIFIC DATA
const platformDetails = {
  linkedin: {
    icon: <FaLinkedin />,
    title: 'LinkedIn',
    bgColor: '#e0f2fe', // Light blue
  },
  twitter: {
    icon: <FaTwitter />,
    title: 'Twitter (X)',
    bgColor: '#e0f7fa', // Light cyan
  },
  instagram: {
    icon: <FaInstagram />,
    title: 'Instagram',
    bgColor: '#fdf4ff', // Light purple
  },
  youtube: {
    icon: <FaYoutube />,
    title: 'YouTube',
    bgColor: '#ffebee', // Light red
  },
};

const ResultsArea = ({ summary, socialPosts }) => {
  if (!summary) {
    return null; // Don't render anything if there's no summary
  }

  // 3. FILTER OUT THE SUMMARY AND CREATE CARD DATA
  const posts = Object.keys(socialPosts)
    .filter(key => key !== 'summary' && socialPosts[key]) // Filter out summary and empty posts
    .map(key => ({
      ...platformDetails[key], // Get icon, title, color
      content: socialPosts[key], // Get AI text
      id: key,
    }));

  return (
    <div className="results-area">
      {/* --- Summary Section (no change) --- */}
      <div className="summary-section">
        <h2 className="results-title">Generated Summary</h2>
        <p className="summary-text">{summary}</p>
        <button 
          className="copy-btn" 
          onClick={() => {
            navigator.clipboard.writeText(summary);
            alert("Copied to clipboard!");
          }}
        >
          Copy Summary
        </button>
      </div>
      
      {/* --- Social Posts Section (Updated) --- */}
      <div className="social-posts-section">
        <h2 className="results-title">Social Media Posts</h2>
        <div className="posts-grid">
          {/* 4. MAP OVER THE POSTS AND RENDER CARDS */}
          {posts.map(post => (
            <SocialPostCard
              key={post.id}
              icon={post.icon}
              title={post.title}
              content={post.content}
              bgColor={post.bgColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsArea;