import { useState, useEffect } from "react";
import axios from "axios";

const Chatbot = (props) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.message && !loading) {
      handleChatbotResponse(props.message);
    }
  }, [props.message]);

  const handleChatbotResponse = async (message) => {
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/chat", {
        prompt: message,
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: response.data.response },
      ]);
    } catch (error) {
      console.error("Error fetching response from the API", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[400px] mx-auto p-5 border text-white border-gray-300 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Chatbot</h2>

      <div className="max-h-[300px] overflow-y-auto mb-4 border border-gray-200 p-3">
        {messages.map((message, index) => (
          <div key={index} className="mb-3">
            <strong className="mr-2">
              {message.role === "user" ? "You" : "Assistant"}:
            </strong>
            <span>{message.content}</span>
          </div>
        ))}
        {loading && (
          <div>
            <strong className="mr-2">Assistant:</strong>
            <span>Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
