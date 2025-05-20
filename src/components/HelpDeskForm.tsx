
import React from 'react';
import { Search, AlertCircle, ArrowRightLeft, HelpCircle, FileText, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HelpDeskForm: React.FC = () => {
  const navigate = useNavigate();

  const handleReportProblem = () => {
    navigate('/report-problem');
  };

  const handleSearchIssue = () => {
    navigate('/search-issue');
  };

  const handleChangeRequest = () => {
    navigate('/change-request');
  };

  const handleClarification = () => {
    navigate('/clarification');
  };

  return (
    <div className="form-container w-full max-w-[1366px] p-8 bg-white">
      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        {/* Row 1 */}
        <div>
          <label htmlFor="psNumber" className="form-label block mb-2">PS Number <span className="text-red-500">*</span></label>
          <input 
            type="text" 
            id="psNumber" 
            className="form-input" 
            value="Prefilled Based on Login Details" 
            readOnly 
          />
        </div>
        <div>
          <label htmlFor="reportedBy" className="form-label block mb-2">Reported By</label>
          <input 
            type="text" 
            id="reportedBy" 
            className="form-input" 
            value="Prefilled" 
            readOnly 
          />
        </div>

        {/* Row 2 */}
        <div>
          <label htmlFor="function" className="form-label block mb-2">Function <span className="text-red-500">*</span></label>
          <div className="relative">
            <select 
              id="function" 
              className="form-input form-select" 
              defaultValue="dropdown"
            >
              <option value="dropdown">Select Function</option>
              <option value="option1">Finance</option>
              <option value="option2">Human Resources</option>
              <option value="option3">Engineering</option>
              <option value="option4">Operations</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="mobileNumber" className="form-label block mb-2">Mobile Number</label>
          <input 
            type="text" 
            id="mobileNumber" 
            className="form-input" 
            placeholder="Enter mobile number" 
          />
        </div>

        {/* Row 3 */}
        <div>
          <label htmlFor="externalNumber" className="form-label block mb-2">External Number <span className="text-red-500">*</span></label>
          <input 
            type="text" 
            id="externalNumber" 
            className="form-input" 
            placeholder="Enter external number"
          />
        </div>
        <div>
          <label htmlFor="plant" className="form-label block mb-2">Plant</label>
          <div className="relative">
            <select 
              id="plant" 
              className="form-input form-select" 
              defaultValue="prefilled"
            >
              <option value="prefilled">Prefilled Plant</option>
              <option value="plant1">Plant 1</option>
              <option value="plant2">Plant 2</option>
            </select>
          </div>
        </div>

        {/* Row 4 - Full Width */}
        <div className="col-span-2">
          <label htmlFor="product" className="form-label block mb-2">Product</label>
          <input 
            type="text" 
            id="product" 
            className="form-input" 
            placeholder="Enter product details"
          />
        </div>
      </div>

      {/* Action Buttons - First Row */}
      <div className="grid grid-cols-3 gap-6 mt-10">
        <button 
          className="lt-button-primary flex items-center justify-center max-w-[180px] w-full mx-auto"
          onClick={handleReportProblem}
        >
          <AlertCircle className="w-5 h-5 mr-2" />
          Report A Problem
        </button>
        <button 
          className="lt-button-secondary flex items-center justify-center max-w-[180px] w-full mx-auto"
          onClick={handleSearchIssue}
        >
          <Search className="w-5 h-5 mr-2" />
          Search Issues
        </button>
        <button 
          className="lt-button-primary flex items-center justify-center max-w-[180px] w-full mx-auto"
          onClick={handleChangeRequest}
        >
          <ArrowRightLeft className="w-5 h-5 mr-2" />
          Change Request
        </button>
      </div>

      {/* Action Buttons - Second Row */}
      <div className="grid grid-cols-3 gap-6 mt-8 mb-4">
        <button 
          className="lt-button-secondary flex items-center justify-center max-w-[180px] w-full mx-auto"
          onClick={handleClarification}
        >
          <HelpCircle className="w-5 h-5 mr-2" />
          Ask for Clarification
        </button>
        <button className="lt-button-primary flex items-center justify-center max-w-[180px] w-full mx-auto">
          <FileText className="w-5 h-5 mr-2" />
          Download UserID Form
        </button>
        <button className="lt-button-secondary flex items-center justify-center max-w-[180px] w-full mx-auto">
          <BarChart3 className="w-5 h-5 mr-2" />
          IT Escalation Matrix
        </button>
      </div>
    </div>
  );
};

export default HelpDeskForm;
