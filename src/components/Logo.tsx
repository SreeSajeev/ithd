
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="w-[42px] h-[20px] flex items-center justify-center bg-white">
        <div className="text-lt-darkBlue font-bold text-sm">L&T</div>
      </div>
      <span className="ml-2 text-black font-medium italic">L&T Valves Limited</span>
    </div>
  );
};

export default Logo;
