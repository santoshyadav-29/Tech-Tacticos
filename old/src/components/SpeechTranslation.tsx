import React, { useState } from "react";

const TextToSpeech: React.FC = () => {
  const [text, setText] = useState<string>("");

  const speakText = () => {
    if (!("speechSynthesis" in window)) {
      alert("Your browser does not support Text-to-Speech. Please use a modern browser like Chrome or Edge.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US"; // Set the language
    utterance.rate = 1; // Speed of speech (default is 1)
    utterance.pitch = 1; // Pitch of speech (default is 1)

    // Speak the text
    window.speechSynthesis.speak(utterance);

    utterance.onstart = () => console.log("Speech synthesis started...");
    utterance.onend = () => console.log("Speech synthesis ended.");
    utterance.onerror = (event) => console.error("Speech synthesis error:", event.error);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Text-to-Speech Demo</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something to speak..."
        rows={4}
        style={{ width: "80%", padding: "10px", fontSize: "16px", marginBottom: "10px" }}
      ></textarea>
      <br />
      <button
        onClick={speakText}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Speak
      </button>
    </div>
  );
};

export default TextToSpeech;
