
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Search, Upload } from 'lucide-react';
import Header from '../components/Header';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { toast } from 'sonner';

// Mock data for the table
const mockTickets = [
  { id: 1, name: 'John Doe', ticketNumber: 'IT-2023-001', type: 'Software', pnrNumber: 'PNR001', status: 'Open', priority: 'High', assignedTo: 'Alice', dateCreated: '2023-05-10' },
  { id: 2, name: 'Jane Smith', ticketNumber: 'IT-2023-002', type: 'Hardware', pnrNumber: 'PNR002', status: 'In Progress', priority: 'Medium', assignedTo: 'Bob', dateCreated: '2023-05-11' },
  { id: 3, name: 'Mike Johnson', ticketNumber: 'IT-2023-003', type: 'Software', pnrNumber: 'PNR003', status: 'Closed', priority: 'Low', assignedTo: 'Charlie', dateCreated: '2023-05-12' },
  { id: 4, name: 'Sarah Williams', ticketNumber: 'IT-2023-004', type: 'Hardware', pnrNumber: 'PNR004', status: 'Open', priority: 'High', assignedTo: 'David', dateCreated: '2023-05-13' },
  { id: 5, name: 'David Brown', ticketNumber: 'IT-2023-005', type: 'Software', pnrNumber: 'PNR005', status: 'In Progress', priority: 'Medium', assignedTo: 'Emma', dateCreated: '2023-05-14' },
  { id: 6, name: 'Emily Davis', ticketNumber: 'IT-2023-006', type: 'Hardware', pnrNumber: 'PNR006', status: 'Closed', priority: 'Low', assignedTo: 'Frank', dateCreated: '2023-05-15' },
  { id: 7, name: 'Robert Wilson', ticketNumber: 'IT-2023-007', type: 'Software', pnrNumber: 'PNR007', status: 'Open', priority: 'High', assignedTo: 'Grace', dateCreated: '2023-05-16' },
  { id: 8, name: 'Lisa Moore', ticketNumber: 'IT-2023-008', type: 'Hardware', pnrNumber: 'PNR008', status: 'In Progress', priority: 'Medium', assignedTo: 'Henry', dateCreated: '2023-05-17' },
  { id: 9, name: 'Thomas Brown', ticketNumber: 'IT-2023-009', type: 'Software', pnrNumber: 'PNR009', status: 'Open', priority: 'High', assignedTo: 'Isabella', dateCreated: '2023-05-18' },
  { id: 10, name: 'William Green', ticketNumber: 'IT-2023-010', type: 'Hardware', pnrNumber: 'PNR010', status: 'Closed', priority: 'Low', assignedTo: 'Jack', dateCreated: '2023-05-19' },
  { id: 11, name: 'Jessica Black', ticketNumber: 'IT-2023-011', type: 'Software', pnrNumber: 'PNR011', status: 'In Progress', priority: 'Medium', assignedTo: 'Kevin', dateCreated: '2023-05-20' },
  { id: 12, name: 'Alexander White', ticketNumber: 'IT-2023-012', type: 'Hardware', pnrNumber: 'PNR012', status: 'Open', priority: 'High', assignedTo: 'Laura', dateCreated: '2023-05-21' },
];

interface SortConfig {
  key: string;
  direction: 'ascending' | 'descending';
}

const ITHelpdeskView: React.FC = () => {
  const navigate = useNavigate();
  const [issueType, setIssueType] = useState<string>('');
  const [pnrNumber, setPnrNumber] = useState<string>('');
  const [isIssueTypeOpen, setIsIssueTypeOpen] = useState<boolean>(false);
  const [isPnrOpen, setIsPnrOpen] = useState<boolean>(false);
  const [filteredTickets, setFilteredTickets] = useState(mockTickets);
  const [fileUploaded, setFileUploaded] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const handleSearch = () => {
    let filtered = mockTickets;
    if (issueType) {
      filtered = filtered.filter(ticket => ticket.type === issueType);
    }
    if (pnrNumber) {
      filtered = filtered.filter(ticket => ticket.pnrNumber === pnrNumber);
    }
    setFilteredTickets(filtered);
    toast.success(`Found ${filtered.length} tickets matching your criteria`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileUploaded(e.target.files[0].name);
      toast.success(`File "${e.target.files[0].name}" uploaded successfully`);
    }
  };

  const handleExportCSV = () => {
    // Mock CSV export functionality
    const header = ['Name', 'Ticket Number', 'Type', 'PNR Number', 'Status', 'Priority', 'Assigned To', 'Date Created'];
    const data = filteredTickets.map(t => 
      [t.name, t.ticketNumber, t.type, t.pnrNumber, t.status, t.priority, t.assignedTo, t.dateCreated]
    );
    
    const csvContent = [
      header.join(','),
      ...data.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'tickets.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Export successful');
  };

  const sortData = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
    
    const sortedData = [...filteredTickets].sort((a, b) => {
      if (a[key as keyof typeof a] < b[key as keyof typeof b]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key as keyof typeof a] > b[key as keyof typeof b]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    
    setFilteredTickets(sortedData);
  };

  const getSortIndicator = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null;
    }
    
    return sortConfig.direction === 'ascending' ? ' ↑' : ' ↓';
  };

  const handleRowClick = (id: number) => {
    setSelectedTicket(id);
    navigate('/ticket-summary');
  };

  return (
    <div className="min-h-screen flex flex-col bg-lt-offWhite">
      <Header title="IT HELPDESK VIEW" />
      
      <motion.div 
        className="container mx-auto p-6 flex-grow"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate('/')}
            className="back-button text-lt-grey hover:text-lt-brightBlue transition-colors flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span>Back to Helpdesk</span>
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-lt-lightGrey mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <h2 className="text-[25pt] font-light text-lt-darkBlue mb-4 md:mb-0">Ticket Management</h2>
            <div className="text-lt-darkBlue font-semibold text-lg">
              Total Tickets: {filteredTickets.length}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="form-label block mb-2">Filter by Issue Type</label>
              <div className="relative">
                <button
                  type="button"
                  className="form-input form-select flex justify-between items-center w-full cursor-pointer"
                  onClick={() => setIsIssueTypeOpen(!isIssueTypeOpen)}
                >
                  <span>{issueType || 'Select Issue Type'}</span>
                </button>
                {isIssueTypeOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-lt-lightGrey rounded-md shadow-lg">
                    <ul>
                      <li
                        className="px-4 py-2 hover:bg-lt-lightGrey cursor-pointer"
                        onClick={() => {
                          setIssueType('Software');
                          setIsIssueTypeOpen(false);
                        }}
                      >
                        Software
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-lt-lightGrey cursor-pointer"
                        onClick={() => {
                          setIssueType('Hardware');
                          setIsIssueTypeOpen(false);
                        }}
                      >
                        Hardware
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-lt-lightGrey cursor-pointer"
                        onClick={() => {
                          setIssueType('');
                          setIsIssueTypeOpen(false);
                        }}
                      >
                        All Types
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex-1">
              <label className="form-label block mb-2">Filter by PNR Number</label>
              <div className="relative">
                <button
                  type="button"
                  className="form-input form-select flex justify-between items-center w-full cursor-pointer"
                  onClick={() => setIsPnrOpen(!isPnrOpen)}
                >
                  <span>{pnrNumber || 'Select PNR Number'}</span>
                </button>
                {isPnrOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-lt-lightGrey rounded-md shadow-lg">
                    <ul>
                      {Array.from(new Set(mockTickets.map(t => t.pnrNumber))).map((pnr) => (
                        <li
                          key={pnr}
                          className="px-4 py-2 hover:bg-lt-lightGrey cursor-pointer"
                          onClick={() => {
                            setPnrNumber(pnr);
                            setIsPnrOpen(false);
                          }}
                        >
                          {pnr}
                        </li>
                      ))}
                      <li
                        className="px-4 py-2 hover:bg-lt-lightGrey cursor-pointer"
                        onClick={() => {
                          setPnrNumber('');
                          setIsPnrOpen(false);
                        }}
                      >
                        All PNR Numbers
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Button 
              onClick={handleSearch} 
              className="lt-button-primary btn-ripple flex items-center justify-center px-8 py-4 text-base"
            >
              <Search className="w-5 h-5 mr-2" />
              Find Issue
            </Button>
            
            <div className="relative">
              <Button 
                className="lt-button-secondary btn-ripple flex items-center justify-center px-8 py-4 text-base"
                onClick={() => document.getElementById('fileUpload')?.click()}
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Weekly Plan
              </Button>
              <input
                type="file"
                id="fileUpload"
                className="hidden"
                accept=".csv,.xlsx"
                onChange={handleFileUpload}
              />
            </div>
            
            <Button 
              onClick={() => navigate('/it-performance-dashboard')} 
              className="lt-button-primary btn-ripple flex items-center justify-center px-8 py-4 text-base"
            >
              Go to Performance Dashboard
            </Button>
          </div>
          
          {fileUploaded && (
            <div className="mb-4 p-2 bg-green-50 text-green-600 rounded-md flex justify-between">
              <span>File uploaded: {fileUploaded}</span>
              <button className="text-lt-brightBlue hover:underline" onClick={() => setFileUploaded(null)}>
                Clear
              </button>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-md border border-lt-lightGrey overflow-hidden">
          <div className="flex justify-end p-4 border-b border-lt-lightGrey">
            <button 
              onClick={handleExportCSV}
              className="flex items-center text-lt-brightBlue hover:text-lt-darkBlue transition-colors"
            >
              <Download className="w-4 h-4 mr-1" />
              Export as CSV
            </button>
          </div>
          
          {/* Excel-like table with fixed header and scrollable body */}
          <div className="overflow-hidden" style={{ maxHeight: '60vh' }}>
            <div style={{ maxHeight: '60vh', overflow: 'auto' }} className="min-w-full">
              <table className="min-w-full divide-y divide-lt-lightGrey border-collapse">
                <thead className="bg-lt-lightGrey sticky top-0 z-10">
                  <tr>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-lt-darkBlue uppercase tracking-wider cursor-pointer border border-gray-300 bg-gray-100 hover:bg-gray-200"
                      onClick={() => sortData('name')}
                    >
                      Name {getSortIndicator('name')}
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-lt-darkBlue uppercase tracking-wider cursor-pointer border border-gray-300 bg-gray-100 hover:bg-gray-200" 
                      onClick={() => sortData('ticketNumber')}
                    >
                      Ticket Number {getSortIndicator('ticketNumber')}
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-lt-darkBlue uppercase tracking-wider cursor-pointer border border-gray-300 bg-gray-100 hover:bg-gray-200"
                      onClick={() => sortData('type')}
                    >
                      Type {getSortIndicator('type')}
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-lt-darkBlue uppercase tracking-wider cursor-pointer border border-gray-300 bg-gray-100 hover:bg-gray-200"
                      onClick={() => sortData('pnrNumber')}
                    >
                      PNR Number {getSortIndicator('pnrNumber')}
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-lt-darkBlue uppercase tracking-wider cursor-pointer border border-gray-300 bg-gray-100 hover:bg-gray-200"
                      onClick={() => sortData('status')}
                    >
                      Status {getSortIndicator('status')}
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-lt-darkBlue uppercase tracking-wider cursor-pointer border border-gray-300 bg-gray-100 hover:bg-gray-200"
                      onClick={() => sortData('priority')}
                    >
                      Priority {getSortIndicator('priority')}
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-lt-darkBlue uppercase tracking-wider cursor-pointer border border-gray-300 bg-gray-100 hover:bg-gray-200"
                      onClick={() => sortData('assignedTo')}
                    >
                      Assigned To {getSortIndicator('assignedTo')}
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-lt-darkBlue uppercase tracking-wider cursor-pointer border border-gray-300 bg-gray-100 hover:bg-gray-200"
                      onClick={() => sortData('dateCreated')}
                    >
                      Date Created {getSortIndicator('dateCreated')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-lt-lightGrey">
                  {filteredTickets.map((ticket) => (
                    <tr 
                      key={ticket.id}
                      className="hover:bg-blue-50 cursor-pointer transition-colors border-b border-lt-lightGrey"
                      onClick={() => handleRowClick(ticket.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap border-x border-gray-200">{ticket.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap border-x border-gray-200">{ticket.ticketNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap border-x border-gray-200">{ticket.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap border-x border-gray-200">{ticket.pnrNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap border-x border-gray-200">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          ticket.status === 'Open' ? 'bg-yellow-100 text-yellow-800' :
                          ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-x border-gray-200">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          ticket.priority === 'High' ? 'bg-red-100 text-red-800' :
                          ticket.priority === 'Medium' ? 'bg-orange-100 text-orange-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-x border-gray-200">{ticket.assignedTo}</td>
                      <td className="px-6 py-4 whitespace-nowrap border-x border-gray-200">{ticket.dateCreated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ITHelpdeskView;
