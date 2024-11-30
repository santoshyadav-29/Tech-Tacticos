import React, { useRef, useEffect, useState } from 'react';

const CameraView: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        // Request access to the camera
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        setError('Unable to access the camera. Please check your device settings and permissions.');
      }
    };

    startCamera();

    // Cleanup function to stop the camera when the component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Camera View</h2>
      {error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <video
          ref={videoRef}
          style={{
            width: '100%',
            maxWidth: '600px',
            border: '1px solid #ccc',
            borderRadius: '8px',
          }}
          playsInline
        />
      )}
    </div>
  );
};

export default CameraView;
