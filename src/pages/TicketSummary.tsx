
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Search } from 'lucide-react';
import Header from '../components/Header';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const TicketSummary: React.FC = () => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);

  // Mock data for ticket rows
  const [ticketRows, setTicketRows] = useState([
    {
      id: 1,
      issueType: 'Software',
      issueCategory: 'Application',
      issueSearchTerm: 'Login failure',
      trApplicability: 'Yes',
      ageOfIssue: 5,
      ageOfTask: 2,
      totalTimeSpent: 120,
      lastChangedOn: '2025-05-21',
      owner: 'Jane Smith',
      reviewer: 'John Doe',
      checked: false
    },
    {
      id: 2,
      issueType: 'Hardware',
      issueCategory: 'Infrastructure',
      issueSearchTerm: 'Printer not working',
      trApplicability: 'No',
      ageOfIssue: 3,
      ageOfTask: 1,
      totalTimeSpent: 60,
      lastChangedOn: '2025-05-20',
      owner: 'Robert Johnson',
      reviewer: 'Emily Davis',
      checked: false
    },
    {
      id: 3,
      issueType: 'Network',
      issueCategory: 'Connectivity',
      issueSearchTerm: 'VPN connection issues',
      trApplicability: 'Yes',
      ageOfIssue: 7,
      ageOfTask: 4,
      totalTimeSpent: 180,
      lastChangedOn: '2025-05-19',
      owner: 'Mike Wilson',
      reviewer: 'Sarah Thompson',
      checked: false
    }
  ]);

  const handleCheckboxChange = (id: number) => {
    setTicketRows(prevRows =>
      prevRows.map(row =>
        row.id === id ? { ...row, checked: !row.checked } : row
      )
    );
  };

  const handleAnalyzeClick = () => {
    const selectedTickets = ticketRows.filter(row => row.checked);
    if (selectedTickets.length === 0) {
      toast.error("Please select at least one ticket to analyze");
      return;
    }
    
    navigate('/ticket-details');
    toast.success(`Analyzing ${selectedTickets.length} selected tickets`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-lt-offWhite">
      <Header title="TICKET SUMMARY" />
      
      <motion.div 
        className="container mx-auto p-6 flex-grow"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate('/it-helpdesk-view')}
            className="back-button text-lt-grey hover:text-lt-brightBlue transition-colors flex items-center"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <ArrowLeft className={`w-5 h-5 mr-1 ${isHovering ? 'transform -translate-x-1 transition-transform' : 'transition-transform'}`} />
            <span>Back to Helpdesk View</span>
          </button>
        </div>
        
        <motion.h1 
          className="text-[30pt] font-light text-center mb-8"
          variants={itemVariants}
        >
          Ticket Summary
        </motion.h1>
        
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md border border-lt-lightGrey mb-8"
          variants={itemVariants}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-lt-lightGrey">
              <thead className="bg-lt-lightGrey">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-lt-grey uppercase tracking-wider">Select</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-lt-grey uppercase tracking-wider">Issue Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-lt-grey uppercase tracking-wider">Issue Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-lt-grey uppercase tracking-wider">Search Term</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-lt-grey uppercase tracking-wider">TR Applicability</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-lt-grey uppercase tracking-wider">Age of Issue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-lt-grey uppercase tracking-wider">Age of Task</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-lt-grey uppercase tracking-wider">Time Spent (min)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-lt-grey uppercase tracking-wider">Last Changed</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-lt-grey uppercase tracking-wider">Owner</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-lt-grey uppercase tracking-wider">Reviewer</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-lt-lightGrey">
                {ticketRows.map((row) => (
                  <motion.tr 
                    key={row.id}
                    className="hover:bg-lt-offWhite hover:shadow-sm transition-all duration-200"
                    whileHover={{ 
                      backgroundColor: "rgba(246, 246, 246, 0.8)",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                    }}
                    variants={itemVariants}
                  >
                    <td className="px-6 py-4">
                      <Checkbox 
                        checked={row.checked} 
                        onCheckedChange={() => handleCheckboxChange(row.id)}
                        className="data-[state=checked]:bg-lt-brightBlue"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.issueType}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.issueCategory}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.issueSearchTerm}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.trApplicability}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.ageOfIssue} days</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.ageOfTask} days</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.totalTimeSpent}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.lastChangedOn}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.owner}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.reviewer}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 flex justify-center">
            <Button 
              onClick={handleAnalyzeClick}
              className="lt-button-primary btn-ripple px-12 py-4 text-base"
            >
              <Search className="w-5 h-5 mr-2" />
              Analyse & Propose
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TicketSummary;
