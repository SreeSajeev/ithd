
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="w-10 h-10 rounded-full border-2 border-gray-700 flex items-center justify-center bg-white">
        <div className="text-black font-bold text-lg">L&T</div>
      </div>
      <span className="ml-2 text-black font-medium">L&T Valves Limited</span>
    </div>
  );
};

export default Logo;
