
import React from 'react';
import ltLogo from '../assets/L&T Valves Logo.png';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center group">
      <div className="logo-container w-[42px] h-[42px] flex items-center justify-center overflow-hidden transition-all duration-300">
        <img 
          src={ltLogo} 
          alt="L&T Logo" 
          className="w-full h-full transform group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="ml-3 flex flex-col justify-center">
        <span className="text-white font-medium text-xl tracking-wide whitespace-nowrap transform group-hover:translate-x-1 transition-transform duration-300">
          L&T Valves Limited
        </span>
        <span className="text-lt-lightGrey text-xs font-light italic transform group-hover:translate-x-1 transition-transform duration-500">
          Your trusted valve solution partner
        </span>
      </div>
    </div>
  );
};

export default Logo;
