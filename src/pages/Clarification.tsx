
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Logo from '../components/Logo';
import { useNavigate } from 'react-router-dom';

const Clarification: React.FC = () => {
  const navigate = useNavigate();

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
          <h2 className="text-[30pt] font-light text-lt-darkBlue">Clarification</h2>
        </div>
        
        <div className="form-container w-full p-8 relative">
          <button 
            onClick={() => navigate('/')}
            className="absolute top-6 left-6 text-lt-darkBlue hover:text-lt-brightBlue transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="text-center py-12">
            <p className="text-lt-grey text-xl">This is the Clarification page placeholder — content coming soon.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clarification;
