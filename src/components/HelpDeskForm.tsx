
import React from 'react';
import { Search, AlertCircle, ArrowRightLeft, HelpCircle, FileText, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HelpDeskForm: React.FC = () => {
  const navigate = useNavigate();

  const handleReportProblem = () => {
    navigate('/report-problem');
  };

  return (
    <div className="form-container w-full max-w-4xl p-8">
      <div className="grid grid-cols-2 gap-x-6 gap-y-5">
        {/* Row 1 */}
        <div>
          <label htmlFor="psNumber" className="form-label block mb-1">PS Number <span className="text-red-400">*</span></label>
          <input 
            type="text" 
            id="psNumber" 
            className="form-input" 
            value="Prefilled Based on Login Details" 
            readOnly 
          />
        </div>
        <div>
          <label htmlFor="reportedBy" className="form-label block mb-1">Reported By</label>
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
          <label htmlFor="function" className="form-label block mb-1">Function <span className="text-red-400">*</span></label>
          <div className="relative">
            <select 
              id="function" 
              className="form-input form-select" 
              defaultValue="dropdown"
            >
              <option value="dropdown">Dropdown option</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="mobileNumber" className="form-label block mb-1">Mobile Number</label>
          <input 
            type="text" 
            id="mobileNumber" 
            className="form-input" 
            placeholder="Enter mobile number" 
          />
        </div>

        {/* Row 3 */}
        <div>
          <label htmlFor="externalNumber" className="form-label block mb-1">External Number <span className="text-red-400">*</span></label>
          <input 
            type="text" 
            id="externalNumber" 
            className="form-input" 
            placeholder="Enter external number"
          />
        </div>
        <div>
          <label htmlFor="plant" className="form-label block mb-1">Plant</label>
          <div className="relative">
            <select 
              id="plant" 
              className="form-input form-select" 
              defaultValue="prefilled"
            >
              <option value="prefilled">Prefilled</option>
              <option value="plant1">Plant 1</option>
              <option value="plant2">Plant 2</option>
            </select>
          </div>
        </div>

        {/* Row 4 - Full Width */}
        <div className="col-span-2">
          <label htmlFor="product" className="form-label block mb-1">Product</label>
          <input 
            type="text" 
            id="product" 
            className="form-input" 
            placeholder="Enter product details"
          />
        </div>
      </div>

      {/* Action Buttons - First Row */}
      <div className="grid grid-cols-2 gap-6 mt-8">
        <button 
          className="button-glow flex items-center justify-center py-3 px-4 rounded-md text-white max-w-[300px] mx-auto w-full"
          onClick={handleReportProblem}
        >
          <AlertCircle className="w-5 h-5 mr-2" />
          Report A Problem
        </button>
        <button className="button-glow flex items-center justify-center py-3 px-4 rounded-md text-white max-w-[300px] mx-auto w-full">
          <Search className="w-5 h-5 mr-2" />
          Search Issues
        </button>
      </div>

      {/* Action Buttons - Second Row */}
      <div className="grid grid-cols-2 gap-6 mt-8">
        <button className="button-glow flex items-center justify-center py-3 px-4 rounded-md text-white max-w-[300px] mx-auto w-full">
          <ArrowRightLeft className="w-5 h-5 mr-2" />
          Change Request
        </button>
        <button className="button-glow flex items-center justify-center py-3 px-4 rounded-md text-white max-w-[300px] mx-auto w-full">
          <HelpCircle className="w-5 h-5 mr-2" />
          Ask for Clarification
        </button>
      </div>

      {/* Action Buttons - Third Row */}
      <div className="grid grid-cols-2 gap-6 mt-8">
        <button className="button-glow flex items-center justify-center py-3 px-4 rounded-md text-white max-w-[300px] mx-auto w-full">
          <FileText className="w-5 h-5 mr-2" />
          Download UserID Request Form
        </button>
        <button className="button-glow flex items-center justify-center py-3 px-4 rounded-md text-white max-w-[300px] mx-auto w-full">
          <BarChart3 className="w-5 h-5 mr-2" />
          IT Escalation Matrix
        </button>
      </div>
    </div>
  );
};

export default HelpDeskForm;
