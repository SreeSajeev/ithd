
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center group">
      <div className="w-[42px] h-[20px] flex items-center justify-center bg-white group-hover:bg-lt-brightBlue transition-colors duration-300">
        <div className="text-lt-darkBlue group-hover:text-white font-bold text-sm transition-colors duration-300">L&T</div>
      </div>
      <span className="ml-2 text-black font-medium italic group-hover:text-white transition-colors duration-300">L&T Valves Limited</span>
    </div>
  );
};

export default Logo;
