import React, { useState } from "react";
import { Mic, MicOff } from "lucide-react";

// Mock function to simulate backend communication
const mockBackendResponse = () => {
  const directions = ["go left", "go right"];
  return directions[Math.floor(Math.random() * directions.length)];
};

const VoiceRecognition = () => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [direction, setDirection] = useState("");
  const [result, setResult] = useState("");  // State to store either exact word or whole sentence

  const startVoiceRecognition = () => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      alert(
        "Your browser does not support Speech Recognition. Please use Chrome or Edge."
      );
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
      console.log("Voice recognition started...");
    };

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      console.log("Recognized text:", result);
      setTranscript(result);

      // List of keywords to detect specific objects
      const keywords = ["mouse", "phone", "laptop", "bottle"];
      let detectedKeyword = null;

      // Check for keywords in the result
      keywords.forEach((keyword) => {
        if (result.toLowerCase().includes(keyword)) {
          detectedKeyword = keyword;  // Store detected keyword
        }
      });

      // Set result: if keyword detected, store the keyword, else store the whole sentence
      if (detectedKeyword) {
        setResult(detectedKeyword);
        // Simulate sending object name to the backend
        console.log(`Object detected: ${detectedKeyword}`);

        // Mock backend response (go left or go right)
        const response = mockBackendResponse();
        setDirection(response);

        // Use Azure Cognitive Services to speak the direction
        speakDirection(response);
      } else {
        setResult(result);  // Store the whole sentence if no keyword detected
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      alert(`Error occurred during recognition: ${event.error}`);
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log("Voice recognition ended.");
    };

    recognition.start();
  };

  const speakDirection = (direction) => {
    // This function will use Azure Cognitive Services for text-to-speech (simulated here)
    const speech = new SpeechSynthesisUtterance(direction);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
    console.log(`Speaking: ${direction}`);
  };

  return (
    <section className="py-20 px-4 bg-navy-800/30 backdrop-blur-sm">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Try Voice Commands
          </h2>
          <p className="text-gray-300">
            Speak naturally, and your words will appear below.
          </p>
        </div>

        <div className="bg-navy-800/50 rounded-2xl p-8">
          <div className="flex flex-col items-center gap-6">
            <button
              onClick={startVoiceRecognition}
              className={`p-6 rounded-full transition-all duration-200 ease-in-out ${
                isListening
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
            >
              {isListening ? (
                <Mic className="h-8 w-8 text-white" />
              ) : (
                <MicOff className="h-8 w-8 text-white" />
              )}
            </button>

            <div className="w-full bg-navy-900/50 rounded-xl p-6 min-h-[100px] text-center">
              <p className="text-gray-300 text-lg">
                {transcript ? (
                  <>
                    You said:{" "}
                    <strong className="text-white">{transcript}</strong>
                  </>
                ) : (
                  "Your speech will appear here..."
                )}
              </p>
              <p className="text-gray-300 mt-4">
                {result && (
                  <>
                    Result: <strong className="text-white">{result}</strong>
                  </>
                )}
              </p>
              {direction && (
                <p className="text-gray-300 mt-4">
                  Direction: <strong className="text-white">{direction}</strong>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VoiceRecognition;
