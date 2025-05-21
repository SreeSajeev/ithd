
import React from 'react';
import Header from '../components/Header';
import HelpDeskForm from '../components/HelpDeskForm';

const Index = () => {
  return (
    <div className="lt-bg min-h-screen w-full flex flex-col items-center">
      <Header />
      
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
