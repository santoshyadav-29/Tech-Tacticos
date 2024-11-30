import React, { useState } from "react";

const VoiceRecognition: React.FC = () => {
  const [transcript, setTranscript] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);

  // Function to handle speech recognition
  const startVoiceRecognition = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Your browser does not support Speech Recognition. Please use Chrome or Edge.");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = "en-US"; // Set language
    recognition.interimResults = false; // Process final results only
    recognition.continuous = false; // Stop after one result

    // Handle recognition events
    recognition.onstart = () => {
      setIsListening(true);
      console.log("Voice recognition started...");
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[0][0].transcript; // Capture recognized text
      console.log("Recognized text:", result);
      setTranscript(result); // Update state
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      alert(`Error occurred during recognition: ${event.error}`);
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log("Voice recognition ended.");
    };

    // Start recognition
    recognition.start();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>HTML Voice Recognition Demo</h1>
      <button
        onClick={startVoiceRecognition}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: isListening ? "red" : "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        {isListening ? "Listening..." : "Start Voice Input"}
      </button>
      <p style={{ marginTop: "20px", fontSize: "18px" }}>
        You said: <strong>{transcript}</strong>
      </p>
    </div>
  );
};

export default VoiceRecognition;
