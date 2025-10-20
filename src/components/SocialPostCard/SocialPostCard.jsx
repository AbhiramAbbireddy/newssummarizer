// src/components/SocialPostCard/SocialPostCard.jsx
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import './SocialPostCard.css';

// Props:
// - icon: The icon component (e.g., <FaLinkedin />)
// - title: The platform name (e.g., "LinkedIn")
// - content: The AI-generated text
// - bgColor: A background color for the card's header
const SocialPostCard = ({ icon, title, content, bgColor }) => {
  // We use a 'ref' to tell html2canvas exactly which element to screenshot
  const cardContentRef = useRef(null);

  const handleCopyText = () => {
    navigator.clipboard.writeText(content);
    alert("Copied to clipboard!"); // Simple feedback
  };

  const handleDownloadImage = () => {
    if (cardContentRef.current) {
      html2canvas(cardContentRef.current, { 
        backgroundColor: '#ffffff', // Ensure background is white
        useCORS: true // In case of any external images
      }).then((canvas) => {
        // Create a link to download the image
        const link = document.createElement('a');
        link.download = `${title.toLowerCase()}_post.png`;
        link.href = canvas.toDataURL('image/png');
        link.click(); // Trigger the download
      });
    }
  };

  return (
    <div className="social-post-card">
      {/* This is the part we'll screenshot */}
      <div 
        className="card-content-wrapper" 
        ref={cardContentRef} 
        style={{ '--card-bg-color': bgColor }}
      >
        <div className="card-header">
          <span className="card-icon">{icon}</span>
          <h3 className="card-title">{title}</h3>
        </div>
        <p className="card-content">
          {content}
        </p>
      </div>
      
      {/* --- Action Buttons --- */}
      <div className="card-actions">
        <button className="card-btn copy-btn" onClick={handleCopyText}>
          Copy Text
        </button>
        <button className="card-btn download-btn" onClick={handleDownloadImage}>
          Download as Image
        </button>
      </div>
    </div>
  );
};

export default SocialPostCard;