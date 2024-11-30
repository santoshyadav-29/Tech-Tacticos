import { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]); // Store chat messages
  const [input, setInput] = useState(''); // Store user input
  const [loading, setLoading] = useState(false); // Handle loading state

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return; // Don't send empty messages

    // Update the chat with the user's message
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', content: input }
    ]);

    setLoading(true); // Show loading indicator

    try {
      // Send the user's message to the backend API
      const response = await axios.post('http://localhost:3000/chat', {
        prompt: input
      });

      // Add the response to the chat history
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: response.data.response }
      ]);
    } catch (error) {
      console.error("Error fetching response from the API", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: "Sorry, something went wrong." }
      ]);
    } finally {
      setLoading(false); // Hide loading indicator
      setInput(""); // Clear the input field
    }
  };

  return (
    <div style={{ width: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Chatbot</h2>
      
      <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '20px', border: '1px solid #eee', padding: '10px' }}>
        {messages.map((message, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <strong>{message.role === 'user' ? 'You' : 'Assistant'}:</strong>
            <p>{message.content}</p>
          </div>
        ))}
        {loading && (
          <div>
            <strong>Assistant:</strong>
            <p>Loading...</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
