import { useState } from "react";
import { Mic, MicOff } from "lucide-react";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";

const VoiceRecognition = () => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [direction, setDirection] = useState("");
  const [MLResult, setMLResult] = useState("");
  const [error, setError] = useState("");

  // API base URL
  const BASE_URL = "http://192.168.84.13:8000";

  // Azure Speech SDK credentials
  const AZURE_SPEECH_KEY =
    "BzVaXKlN3nT1g8ncbHNr4yYJlRHdyEce8ndqt2ZGXYrWDGY6dpmAJQQJ99AKACYeBjFXJ3w3AAAYACOG3tTS";
  const AZURE_REGION = "eastus";

  // Start the project before voice recognition
  const startProject = async () => {
    try {
      const response = await fetch(`${BASE_URL}/start`, { method: "GET" });
      const data = await response.json();

      if (data.message !== "started") {
        throw new Error("Failed to start project");
      }
      console.log("Project started successfully");
    } catch (err) {
      setError("Could not start project: " + err.message);
      console.error(err);
    }
  };

  // Function to fetch the latest direction
  const fetchDirection = async () => {
    try {
      const response = await fetch(`${BASE_URL}/direction`, { method: "GET" });
      const data = await response.json();

      if (data.message) {
        setDirection(data.message);
        speakDirection(data.message); // Speak the direction
      } else {
        setDirection("No direction provided.");
      }
    } catch (err) {
      setError("Failed to fetch direction: " + err.message);
      console.error(err);
    }
  };

  // Start voice recognition and process the results
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

    // Start the project before starting voice recognition
    startProject();

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

    recognition.onresult = async (event) => {
      const result = event.results[0][0].transcript;
      console.log("Recognized text:", result);
      setTranscript(result);

      // List of keywords to detect specific objects
      const keywords = ["mouse", "phone", "laptop", "bottle","scissor"];
      let detectedKeyword = null;

      // Check for keywords in the result
      keywords.forEach((keyword) => {
        if (result.toLowerCase().includes(keyword)) {
          detectedKeyword = keyword; // Store detected keyword
        }
      });

      // If a keyword is detected, fetch the direction
      if (detectedKeyword) {
        setMLResult(detectedKeyword);
        console.log(`Object detected: ${detectedKeyword}`);
        fetchDirection(); // Fetch direction only for detected keywords
      } else {
        setMLResult("");
        setDirection("No valid keyword detected.");
      }

      // Fetch direction after a 2-second gap
      setInterval(() => {
        fetchDirection();
      }, 2000); // 2 seconds delay
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

  // Speak the direction using Azure Cognitive Services
  const speakDirection = async (text) => {
    const speechConfig = sdk.SpeechConfig.fromSubscription(
      AZURE_SPEECH_KEY,
      AZURE_REGION
    );
    const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

    synthesizer.speakTextAsync(
      text,
      (result) => {
        if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
          console.log(`Spoken successfully: ${text}`);
        } else {
          console.error(
            "Speech synthesis canceled, " +
              result.errorDetails +
              "\nDid you set the key and region values?"
          );
        }
        synthesizer.close();
      },
      (err) => {
        console.error(err);
        synthesizer.close();
      }
    );
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
              {error && <p className="text-red-500 mb-4">{error}</p>}

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

              {MLResult && (
                <p className="text-gray-300 mt-4">
                  Detected Object:{" "}
                  <strong className="text-white">{MLResult}</strong>
                </p>
              )}

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
