
import React from 'react';
import Logo from '../components/Logo';
import HelpDeskForm from '../components/HelpDeskForm';

const Index = () => {
  return (
    <div className="lt-bg min-h-screen w-full flex flex-col items-center">
      {/* Header */}
      <div className="w-full">
        <div className="header-bg w-full h-[53px] flex items-center justify-between px-8">
          <Logo />
          <h1 className="lt-title">IT PORTAL</h1>
        </div>
        <div className="nav-bg w-full h-[29px]">
          {/* Navigation items would go here */}
        </div>
      </div>
      
      <div className="max-w-[1366px] w-full px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-[30pt] font-light text-lt-darkBlue">IT HELPDESK</h2>
        </div>
        
        <HelpDeskForm />
      </div>
    </div>
  );
};

export default Index;
