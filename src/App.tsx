import React, { useState } from 'react';

import { CommandPanel } from './components/CommandPanel.tsx';
import SpeechRecognitionComponent from './components/SpeechRecognition.tsx';
// import TextToSpeech from './components/SpeechTranslation.tsx';
import AzureTextToSpeech from './components/AzureTextToSpeech.tsx';
import CameraView from './components/Camera.tsx';


// API Key for Azure Speech Services = BzVaXKlN3nT1g8ncbHNr4yYJlRHdyEce8ndqt2ZGXYrWDGY6dpmAJQQJ99AKACYeBjFXJ3w3AAAYACOG3tTS
// Endpoint for Azure Speech Services = https://eastus.api.cognitive.microsoft.com/

// Region = eastus

function App() {
 const [isActive, setIsActive] = useState(false);

  
  
  

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-12 px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Voice Command Assistant</h1>
          <p className="text-gray-600">Your personal AI assistant is ready to help</p>
        </header>

        <div className="space-y-8">
          {/* <VoiceStatus isListening={isListening} transcript={transcript} /> */}
          <SpeechRecognitionComponent />
          
          <div className="mt-8">
            <CameraView />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            {/* <TextToSpeech /> */}
            <AzureTextToSpeech />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;