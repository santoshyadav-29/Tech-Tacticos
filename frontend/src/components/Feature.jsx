import { Droplets, Ear, Navigation } from 'lucide-react';

export const Features = () => {
  const features = [
    {
      title: 'Ask',
      description: 'AquaCollect treats black and grey wastewater 100% biologically within its own facility.',
      Icon: Droplets,
    },
    {
      title: 'Hear',
      description: 'AquaClear enables the deployment of temporary or permanent networks.',
      Icon: Ear,
    },
    {
      title: 'Navigate',
      description: 'AQUAREUSE transforms black or grey water for a new use, before returning it to its source.',
      Icon: Navigation,
    },
  ];

  const FeatureCard = ({ title, description, Icon }) => {
    return (
      <div className="bg-[#282840] rounded-2xl p-8 backdrop-blur-sm flex flex-col items-center text-center max-w-sm">
        <div className="bg-[#282840] p-4 rounded-full mb-6">
          <Icon className="h-8 w-8 text-blue-400" />
        </div>
        <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
        <p className="text-gray-300 mb-6">{description}</p>
        <button className="px-6 py-2 text-blue-400 border border-blue-400 rounded-lg hover:bg-blue-400/10 transition-colors">
          Our Products
        </button>
      </div>
    );
  };

  return (
    <section className="py-20 px-4">
      <div className="md:w-[90%] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Find Your World, One Word at a Time
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            VisionVoice empowers visually impaired individuals with precise, real-time object location. Using voice commands and
            CCTV technology, our system delivers accurate audio directions, making daily tasks simple and intuitive. Transform
            accessibility with innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              Icon={feature.Icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
