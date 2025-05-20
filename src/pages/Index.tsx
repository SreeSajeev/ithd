
import React from 'react';
import Logo from '../components/Logo';
import HelpDeskForm from '../components/HelpDeskForm';

const Index = () => {
  return (
    <div className="helpdesk-bg min-h-screen w-full flex flex-col items-center px-4">
      <div className="w-full max-w-4xl pt-4 flex justify-start">
        <Logo />
      </div>
      
      <div className="text-center my-8">
        <h1 className="text-glow text-5xl font-bold">IT HELPDESK</h1>
      </div>
      
      <HelpDeskForm />
    </div>
  );
};

export default Index;
