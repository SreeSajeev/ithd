
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Logo from '../components/Logo';
import { useNavigate } from 'react-router-dom';

const SearchIssue: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="helpdesk-bg min-h-screen w-full flex flex-col items-center px-4">
      <div className="w-full max-w-4xl pt-4 flex justify-start">
        <Logo />
      </div>
      
      <div className="text-center my-8">
        <h1 className="text-glow text-5xl font-bold">Search Issue</h1>
      </div>
      
      <div className="form-container w-full max-w-4xl p-8 relative">
        <button 
          onClick={() => navigate('/')}
          className="absolute top-6 left-6 text-white hover:text-blue-200 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <div className="text-center py-12">
          <p className="text-white text-xl">This is the Search Issue page placeholder — content coming soon.</p>
        </div>
      </div>
    </div>
  );
};

export default SearchIssue;
