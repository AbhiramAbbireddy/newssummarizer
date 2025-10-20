// src/components/InputArea/InputArea.jsx
import React, { useState } from 'react';
import './InputArea.css';

// Props:
// - onGenerate: The function to call from App.jsx when the button is clicked.
// - isLoading: A boolean from App.jsx to disable the button during API calls.
const InputArea = ({ onGenerate, isLoading }) => {
  const [inputType, setInputType] = useState('url'); // 'url' or 'text'
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    
    if (inputType === 'url') {
      if (!url) return; // Don't submit if empty
      onGenerate('url', url);
    } else {
      if (!text) return; // Don't submit if empty
      onGenerate('text', text);
    }
  };

  return (
    <div className="input-area">
      {/* --- Tab Switcher --- */}
      <div className="tab-switcher">
        <button
          className={`tab-btn ${inputType === 'url' ? 'active' : ''}`}
          onClick={() => setInputType('url')}
        >
          <span role="img" aria-label="link">🔗</span> URL
        </button>
        <button
          className={`tab-btn ${inputType === 'text' ? 'active' : ''}`}
          onClick={() => setInputType('text')}
        >
          <span role="img" aria-label="document">📄</span> Text
        </button>
      </div>

      {/* --- Input Form --- */}
      <form className="input-form" onSubmit={handleSubmit}>
        <div className="input-container">
          {inputType === 'url' ? (
            <input
              type="url"
              className="url-input"
              placeholder="https.example.com/article"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          ) : (
            <textarea
              className="text-input"
              placeholder="Paste your news article text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          )}
        </div>

        <button 
          type="submit" 
          className="generate-btn" 
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Summary & Posts'}
        </button>
      </form>
    </div>
  );
};

export default InputArea;