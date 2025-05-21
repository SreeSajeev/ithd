
import React from 'react';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "IT PORTAL" }) => {
  const navigate = useNavigate();
  
  const handleLogoClick = () => {
    navigate('/');
  };
  
  return (
    <div className="w-full">
      <div className="header-bg w-full h-[53px] flex items-center justify-between px-8">
        <div onClick={handleLogoClick} className="cursor-pointer transform hover:scale-105 transition-transform duration-200">
          <Logo />
        </div>
        <h1 className="lt-title hover:text-white transition-colors">{title}</h1>
      </div>
      <div className="nav-bg w-full h-[29px] flex items-center px-8">
        <div className="text-sm font-medium text-lt-darkBlue hover:text-lt-brightBlue transition-colors cursor-pointer">
          Dashboard
        </div>
      </div>
    </div>
  );
};

export default Header;
