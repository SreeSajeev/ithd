
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
    <div className="helpdesk-bg min-h-screen w-full flex flex-col items-center px-4">
      <div className="w-full max-w-4xl pt-4 flex justify-start">
        <Logo />
      </div>
      
      <div className="text-center my-8">
        <h1 className="text-glow text-5xl font-bold">Report Issue</h1>
      </div>
      
      <div className="form-container w-full max-w-4xl p-8 relative">
        <button 
          onClick={() => navigate('/')}
          className="absolute top-6 left-6 text-white hover:text-blue-200 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <form onSubmit={handleSubmit} className="pt-6">
          <div className="mb-5">
            <label htmlFor="problemDescription" className="form-label block mb-1">
              Problem Description <span className="text-red-400">*</span>
            </label>
            <input 
              type="text" 
              id="problemDescription" 
              className="form-input" 
              placeholder="Enter" 
              required
            />
          </div>
          
          <div className="mb-5">
            <label htmlFor="domain" className="form-label block mb-1">Domain</label>
            <div className="relative">
              <select 
                id="domain" 
                className="form-input form-select" 
                defaultValue="dropdown"
              >
                <option value="dropdown">Dropdown option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>
            </div>
          </div>
          
          <div className="mb-5">
            <label htmlFor="inputDetails" className="form-label block mb-1">Input Details</label>
            <textarea 
              id="inputDetails" 
              className="form-input min-h-32" 
              placeholder="Enter Text Here" 
            />
          </div>
          
          <div className="mb-5">
            <label htmlFor="systemMessage" className="form-label block mb-1">System Message & Number</label>
            <textarea 
              id="systemMessage" 
              className="form-input min-h-32" 
              placeholder="Enter Text Here" 
            />
          </div>
          
          <div className="mb-7">
            <label htmlFor="attachment" className="form-label block mb-1">Attachment</label>
            <div className="flex gap-3 items-center">
              <label className="bg-white text-gray-700 px-4 py-2 rounded cursor-pointer hover:bg-gray-100 transition-colors">
                Choose File
                <input 
                  type="file" 
                  id="attachment" 
                  className="hidden" 
                />
              </label>
              <span className="text-white text-sm">No File Chosen</span>
            </div>
          </div>
          
          <div className="flex justify-center mt-8">
            <button 
              type="submit" 
              className="button-glow py-3 px-4 rounded-md text-white max-w-[300px] mx-auto w-full"
            >
              Send to IT Helpdesk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportProblem;
