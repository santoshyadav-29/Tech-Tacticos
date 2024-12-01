import { Features } from "./components/Feature";
import { LandingPage } from "./components/landingPage";
// import ChatBot from "./components/OpenAI";
import VoiceRecognition from "./components/VoiceCommand";

const App = () => {
  return (
    <div className="bg-[#10102B]">
      <LandingPage />
      <Features />
      <div id="app" className="main">
      <VoiceRecognition />
      {/* <ChatBot /> */}
      </div>
      
    </div>
  );
};

export default App;
