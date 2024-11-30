import { Droplets } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="absolute top-0 w-full p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Droplets className="h-6 w-6 text-blue-400" />
          <span className="text-white text-xl font-semibold">Aqua</span>
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          Contact
        </button>
      </div>
    </nav>
  );
}