
import React, { useState } from 'react';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const Clarification: React.FC = () => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="lt-bg min-h-screen w-full flex flex-col items-center">
      <Header />
      
      <div className="max-w-[1366px] w-full px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-[30pt] font-light text-lt-darkBlue">Clarification</h2>
        </div>
        
        <div className="form-container w-full p-8 relative hover-card">
          <button 
            onClick={() => navigate('/')}
            className="back-button absolute top-6 left-6 text-lt-darkBlue hover:text-lt-brightBlue transition-colors flex items-center"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <ArrowLeft className={`w-6 h-6 ${isHovering ? 'transform -translate-x-1 transition-transform' : 'transition-transform'}`} />
            <span className="ml-1 text-sm font-medium">Back to Helpdesk</span>
          </button>
          
          <div className="text-center py-12">
            <div className="mb-8 flex justify-center">
              <HelpCircle className="w-16 h-16 text-lt-brightBlue animate-pulse" />
            </div>
            <p className="text-lt-grey text-xl mb-4">This is the Clarification page placeholder — content coming soon.</p>
            <p className="text-lt-mutedGrey">Here you will be able to request clarification on IT-related questions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clarification;
