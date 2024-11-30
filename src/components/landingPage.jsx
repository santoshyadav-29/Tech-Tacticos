import { Navbar } from "./Navbar";
import planet from "../assets/Planet.png";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-indigo-900 to-navy-900 relative overflow-hidden">
      <Navbar />
      <div className="md:w-[90%] mx-auto min-h-screen flex items-center justify-between px-4 py-10 sm:py-16">
        {/* Left side text section */}
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Find Your World,
            <br />
            One Word at a Time
          </h1>
          <p className="text-gray-300 text-base sm:text-lg mb-8">
            Finding is hard to
          </p>
          <div className="flex gap-4 flex-wrap">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mb-4 sm:mb-0">
              Learn More
            </button>
            <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors">
              <a href="#app">Try it out!</a>
            </button>
          </div>
        </div>

        {/* Right side planet image */}
        <div className="relative w-full sm:w-[400px] md:w-[500px] lg:w-[600px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] animate-float">
          <img
            src={planet}
            alt="Earth Globe"
            className="w-full h-full object-cover rounded-full "
          />
          <div className="absolute inset-0 rounded-full shadow-inner"></div>
        </div>
      </div>
    </div>
  );
};
