// src/App.jsx
import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import InputArea from './components/InputArea/InputArea'; // <-- 1. IMPORT

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [socialPosts, setSocialPosts] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerateContent = async (inputType, content) => {
    console.log("Generating content for:", inputType, content);
    setIsLoading(true);
    setError(null);
    setSummary("");
    setSocialPosts(null);

    // --- API LOGIC WILL GO HERE ---
    
    setTimeout(() => {
      setIsLoading(false);
      setSummary("This is a placeholder summary. The real one will come from the Gemini API.");
      setSocialPosts({
        linkedin: "This is a placeholder LinkedIn post.",
        twitter: "This is a placeholder X (Twitter) post.",
        instagram: "This is a placeholder Instagram post.",
        youtube: "This is a placeholder YouTube post."
      });
    }, 2000);
  };

  return (
    <div className="app">
      <div className="container">
        <Header />
        
        <main>
          {/* 2. ADD THE COMPONENT */}
          <InputArea onGenerate={handleGenerateContent} isLoading={isLoading} />

          {/* This is the placeholder results area */}
          {isLoading && <p style={{ textAlign: 'center', marginTop: '1rem' }}>Loading...</p>}
          {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{error}</p>}
          
          {summary && (
            <div style={{ marginTop: '2rem', padding: '1rem', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3>Summary:</h3>
              <p>{summary}</p>
            </div>
          )}
          {socialPosts && (
             <div style={{ marginTop: '1rem', padding: '1rem', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3>Social Posts:</h3>
              <pre>{JSON.stringify(socialPosts, null, 2)}</pre>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;