// src/components/ThemeToggle/ThemeToggle.jsx
import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import './ThemeToggle.css';

// This function checks for saved preference or system preference
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme;
  }
  // Check system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light'; // Default
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  // Effect to apply the theme to <html> tag and save to localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'light' ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default ThemeToggle;