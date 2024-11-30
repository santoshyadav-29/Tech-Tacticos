import React, { useState } from 'react';
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';



const AzureTextToSpeech = () => {
  const [text, setText] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Azure Speech API credentials (replace with your own keys and region)
  const subscriptionKey = 'BzVaXKlN3nT1g8ncbHNr4yYJlRHdyEce8ndqt2ZGXYrWDGY6dpmAJQQJ99AKACYeBjFXJ3w3AAAYACOG3tTS';
  const region = 'eastus';

  // Handle text input change
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // Start the text-to-speech synthesis
  const startTextToSpeech = () => {
    if (!text.trim()) {
      setErrorMessage('Please enter some text.');
      return;
    }

    // Clear any previous error
    setErrorMessage('');
    
    // Initialize speech synthesizer
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey, region);
    const audioConfig = SpeechSDK.AudioConfig.fromDefaultSpeakerOutput();

    const synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig, audioConfig);

    synthesizer.speakTextAsync(
      text,
      (result) => {
        if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
          console.log('Successfully synthesized the text to speech');
        } else {
          setErrorMessage('Error synthesizing speech: ' + result.errorDetails);
        }
        setIsSpeaking(false);
      },
      (error) => {
        setErrorMessage('Error: ' + error.details);
        setIsSpeaking(false);
      }
    );

    setIsSpeaking(true);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Text to Speech Translation</h2>
      
      <input
        type="text"
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text to convert to speech"
        style={{ width: '100%', padding: '10px', marginBottom: '10px', fontSize: '16px' }}
      />

      <button
        onClick={startTextToSpeech}
        disabled={isSpeaking}
        style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}
      >
        {isSpeaking ? 'Speaking...' : 'Convert to Speech'}
      </button>

      {errorMessage && (
        <div style={{ marginTop: '10px', color: 'red' }}>
          <strong>{errorMessage}</strong>
        </div>
      )}
    </div>
  );
};

export default AzureTextToSpeech;
