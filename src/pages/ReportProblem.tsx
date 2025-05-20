
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Logo from '../components/Logo';
import { useNavigate } from 'react-router-dom';

const ReportProblem: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would be the submission logic
  };

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
          <h2 className="text-[30pt] font-light text-lt-darkBlue">Report Issue</h2>
        </div>
        
        <div className="form-container w-full p-8 relative">
          <button 
            onClick={() => navigate('/')}
            className="absolute top-6 left-6 text-lt-darkBlue hover:text-lt-brightBlue transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <form onSubmit={handleSubmit} className="pt-6">
            <div className="mb-6">
              <label htmlFor="problemDescription" className="form-label block mb-2">
                Problem Description <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="problemDescription" 
                className="form-input" 
                placeholder="Enter problem description" 
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="domain" className="form-label block mb-2">Domain</label>
              <div className="relative">
                <select 
                  id="domain" 
                  className="form-input form-select" 
                  defaultValue="dropdown"
                >
                  <option value="dropdown">Select Domain</option>
                  <option value="option1">IT Infrastructure</option>
                  <option value="option2">Software</option>
                  <option value="option3">Hardware</option>
                  <option value="option4">Network</option>
                </select>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="inputDetails" className="form-label block mb-2">Input Details</label>
              <textarea 
                id="inputDetails" 
                className="form-input min-h-32" 
                placeholder="Enter details here" 
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="systemMessage" className="form-label block mb-2">System Message & Number</label>
              <textarea 
                id="systemMessage" 
                className="form-input min-h-32" 
                placeholder="Enter system message and number" 
              />
            </div>
            
            <div className="mb-8">
              <label htmlFor="attachment" className="form-label block mb-2">Attachment</label>
              <div className="flex gap-3 items-center">
                <label className="bg-lt-lightGrey text-lt-grey px-4 py-2 rounded cursor-pointer hover:bg-gray-200 transition-colors">
                  Choose File
                  <input 
                    type="file" 
                    id="attachment" 
                    className="hidden" 
                  />
                </label>
                <span className="text-lt-grey text-sm">No File Chosen</span>
              </div>
            </div>
            
            <div className="flex justify-center mt-8">
              <button 
                type="submit" 
                className="lt-button-primary max-w-[180px] w-full"
              >
                Send to IT Helpdesk
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportProblem;
