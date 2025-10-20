// src/components/Header/Header.jsx
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="title-tag">
        <span role="img" aria-label="sparkles">✨</span> AI News Summarizer
      </div>
      <h1 className="main-title">
        Transform News into Engaging Content
      </h1>
      <p className="subtitle">
        Generate AI-powered summaries and platform-specific social media posts instantly
      </p>
    </header>
  );
};

export default Header;