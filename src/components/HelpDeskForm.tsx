
import React, { useState } from 'react';
import { Search, AlertCircle, ArrowRightLeft, HelpCircle, FileText, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HelpDeskForm: React.FC = () => {
  const navigate = useNavigate();
  const [activeField, setActiveField] = useState<string | null>(null);
  const [hoverButton, setHoverButton] = useState<string | null>(null);

  // Form field state
  const [psNumber] = useState("Prefilled Based on Login Details");
  const [reportedBy] = useState("Prefilled");
  const [selectedFunction, setSelectedFunction] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [externalNumber, setExternalNumber] = useState("");
  const [selectedPlant, setSelectedPlant] = useState("prefilled");
  const [product, setProduct] = useState("");

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

  const handleFocus = (fieldName: string) => {
    setActiveField(fieldName);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  return (
    <div className="form-container w-full max-w-[1366px] p-8 bg-white">
      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        {/* Row 1 */}
        <div className="relative">
          <label htmlFor="psNumber" className={`form-label block mb-2 ${activeField === 'psNumber' ? 'text-lt-brightBlue' : ''}`}>
            PS Number <span className="text-red-500 required-indicator">*</span>
          </label>
          <input 
            type="text" 
            id="psNumber" 
            className="form-input" 
            value={psNumber} 
            readOnly 
            onFocus={() => handleFocus('psNumber')}
            onBlur={handleBlur}
          />
          <div className={`input-focus-indicator ${activeField === 'psNumber' ? 'w-full' : 'w-0'}`}></div>
        </div>
        <div className="relative">
          <label htmlFor="reportedBy" className={`form-label block mb-2 ${activeField === 'reportedBy' ? 'text-lt-brightBlue' : ''}`}>
            Reported By
          </label>
          <input 
            type="text" 
            id="reportedBy" 
            className="form-input" 
            value={reportedBy}
            readOnly 
            onFocus={() => handleFocus('reportedBy')}
            onBlur={handleBlur}
          />
          <div className={`input-focus-indicator ${activeField === 'reportedBy' ? 'w-full' : 'w-0'}`}></div>
        </div>

        {/* Row 2 */}
        <div className="relative">
          <label htmlFor="function" className={`form-label block mb-2 ${activeField === 'function' ? 'text-lt-brightBlue' : ''}`}>
            Function <span className="text-red-500 required-indicator">*</span>
          </label>
          <div className="relative">
            <select 
              id="function" 
              className="form-input form-select" 
              value={selectedFunction}
              onChange={(e) => setSelectedFunction(e.target.value)}
              onFocus={() => handleFocus('function')}
              onBlur={handleBlur}
            >
              <option value="">Select Function</option>
              <option value="option1">Finance</option>
              <option value="option2">Human Resources</option>
              <option value="option3">Engineering</option>
              <option value="option4">Operations</option>
            </select>
          </div>
          <div className={`input-focus-indicator ${activeField === 'function' ? 'w-full' : 'w-0'}`}></div>
        </div>
        <div className="relative">
          <label htmlFor="mobileNumber" className={`form-label block mb-2 ${activeField === 'mobileNumber' ? 'text-lt-brightBlue' : ''}`}>
            Mobile Number
          </label>
          <input 
            type="text" 
            id="mobileNumber" 
            className="form-input" 
            placeholder="Enter mobile number" 
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            onFocus={() => handleFocus('mobileNumber')}
            onBlur={handleBlur}
          />
          <div className={`input-focus-indicator ${activeField === 'mobileNumber' ? 'w-full' : 'w-0'}`}></div>
        </div>

        {/* Row 3 */}
        <div className="relative">
          <label htmlFor="externalNumber" className={`form-label block mb-2 ${activeField === 'externalNumber' ? 'text-lt-brightBlue' : ''}`}>
            External Number <span className="text-red-500 required-indicator">*</span>
          </label>
          <input 
            type="text" 
            id="externalNumber" 
            className="form-input" 
            placeholder="Enter external number"
            value={externalNumber}
            onChange={(e) => setExternalNumber(e.target.value)}
            onFocus={() => handleFocus('externalNumber')}
            onBlur={handleBlur}
          />
          <div className={`input-focus-indicator ${activeField === 'externalNumber' ? 'w-full' : 'w-0'}`}></div>
        </div>
        <div className="relative">
          <label htmlFor="plant" className={`form-label block mb-2 ${activeField === 'plant' ? 'text-lt-brightBlue' : ''}`}>
            Plant
          </label>
          <div className="relative">
            <select 
              id="plant" 
              className="form-input form-select" 
              value={selectedPlant}
              onChange={(e) => setSelectedPlant(e.target.value)}
              onFocus={() => handleFocus('plant')}
              onBlur={handleBlur}
            >
              <option value="prefilled">Prefilled Plant</option>
              <option value="plant1">Plant 1</option>
              <option value="plant2">Plant 2</option>
            </select>
          </div>
          <div className={`input-focus-indicator ${activeField === 'plant' ? 'w-full' : 'w-0'}`}></div>
        </div>

        {/* Row 4 - Full Width */}
        <div className="col-span-2 relative">
          <label htmlFor="product" className={`form-label block mb-2 ${activeField === 'product' ? 'text-lt-brightBlue' : ''}`}>
            Product
          </label>
          <input 
            type="text" 
            id="product" 
            className="form-input" 
            placeholder="Enter product details"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            onFocus={() => handleFocus('product')}
            onBlur={handleBlur}
          />
          <div className={`input-focus-indicator ${activeField === 'product' ? 'w-full' : 'w-0'}`}></div>
        </div>
      </div>

      {/* Action Buttons - First Row */}
      <div className="grid grid-cols-3 gap-6 mt-10">
        <button 
          className={`lt-button-primary btn-ripple flex items-center justify-center max-w-[180px] w-full mx-auto ${hoverButton === 'report' ? 'shadow-lg' : ''}`}
          onClick={handleReportProblem}
          onMouseEnter={() => setHoverButton('report')}
          onMouseLeave={() => setHoverButton(null)}
        >
          <AlertCircle className={`w-5 h-5 mr-2 ${hoverButton === 'report' ? 'animate-pulse' : ''}`} />
          Report A Problem
        </button>
        <button 
          className={`lt-button-secondary btn-ripple flex items-center justify-center max-w-[180px] w-full mx-auto ${hoverButton === 'search' ? 'shadow-lg' : ''}`}
          onClick={handleSearchIssue}
          onMouseEnter={() => setHoverButton('search')}
          onMouseLeave={() => setHoverButton(null)}
        >
          <Search className={`w-5 h-5 mr-2 ${hoverButton === 'search' ? 'animate-pulse' : ''}`} />
          Search Issues
        </button>
        <button 
          className={`lt-button-primary btn-ripple flex items-center justify-center max-w-[180px] w-full mx-auto ${hoverButton === 'change' ? 'shadow-lg' : ''}`}
          onClick={handleChangeRequest}
          onMouseEnter={() => setHoverButton('change')}
          onMouseLeave={() => setHoverButton(null)}
        >
          <ArrowRightLeft className={`w-5 h-5 mr-2 ${hoverButton === 'change' ? 'animate-pulse' : ''}`} />
          Change Request
        </button>
      </div>

      {/* Action Buttons - Second Row */}
      <div className="grid grid-cols-3 gap-6 mt-8 mb-4">
        <button 
          className={`lt-button-secondary btn-ripple flex items-center justify-center max-w-[180px] w-full mx-auto ${hoverButton === 'clarification' ? 'shadow-lg' : ''}`}
          onClick={handleClarification}
          onMouseEnter={() => setHoverButton('clarification')}
          onMouseLeave={() => setHoverButton(null)}
        >
          <HelpCircle className={`w-5 h-5 mr-2 ${hoverButton === 'clarification' ? 'animate-pulse' : ''}`} />
          Ask for Clarification
        </button>
        <button 
          className={`lt-button-primary btn-ripple flex items-center justify-center max-w-[180px] w-full mx-auto ${hoverButton === 'download' ? 'shadow-lg' : ''}`}
          onMouseEnter={() => setHoverButton('download')}
          onMouseLeave={() => setHoverButton(null)}
        >
          <FileText className={`w-5 h-5 mr-2 ${hoverButton === 'download' ? 'animate-pulse' : ''}`} />
          Download UserID Form
        </button>
        <button 
          className={`lt-button-secondary btn-ripple flex items-center justify-center max-w-[180px] w-full mx-auto ${hoverButton === 'escalation' ? 'shadow-lg' : ''}`}
          onMouseEnter={() => setHoverButton('escalation')}
          onMouseLeave={() => setHoverButton(null)}
        >
          <BarChart3 className={`w-5 h-5 mr-2 ${hoverButton === 'escalation' ? 'animate-pulse' : ''}`} />
          IT Escalation Matrix
        </button>
      </div>
    </div>
  );
};

export default HelpDeskForm;
