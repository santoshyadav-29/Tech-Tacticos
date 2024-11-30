import React from 'react';
import { Terminal } from 'lucide-react';

interface CommandPanelProps {
  isActive: boolean;
}

export const CommandPanel: React.FC<CommandPanelProps> = ({ isActive }) => {
  return (
    <div className={`p-6 rounded-lg shadow-lg transition-all duration-300 ${
      isActive ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'
    }`}>
      <div className="flex items-center space-x-3">
        <Terminal className={`w-6 h-6 ${isActive ? 'text-white' : 'text-blue-500'}`} />
        <h2 className="text-lg font-semibold">Command Center</h2>
      </div>
      <div className="mt-4">
        {isActive ? (
          <p className="text-white">How can I assist you?</p>
        ) : (
          <p className="text-gray-600">Say "Okay Jarvis" to activate</p>
        )}
      </div>
    </div>
  );
};