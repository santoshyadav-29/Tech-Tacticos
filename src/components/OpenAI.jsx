// src/App.js
import React, { useState } from 'react';
import { fetchOpenAIResponse } from '../api';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseText(''); // Reset previous response

    // Fetch response from OpenAI
    const result = await fetchOpenAIResponse(inputText);
    setResponseText(result);
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>OpenAI with React</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your prompt"
          rows="5"
          cols="50"
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      <h2>Response from OpenAI:</h2>
      <p>{responseText}</p>
    </div>
  );
};

export default App;
