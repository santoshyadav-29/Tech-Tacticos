import { Features } from "./components/Feature";
import { LandingPage } from "./components/landingPage";
import VoiceRecognition from "./components/VoiceCommand";

const App = () => {
  return (
    <div className="bg-[#10102B]">
      <LandingPage />
      <Features />
      <VoiceRecognition />
    </div>
  );
};

export default App;
