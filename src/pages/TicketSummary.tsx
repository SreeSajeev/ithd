
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, HelpCircle } from 'lucide-react';
import Header from '../components/Header';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { motion } from 'framer-motion';

// Mock data for dropdowns
const issueTypes = ["Software", "Hardware", "Network", "Security", "Other"];
const issueCategories = ["Critical", "High", "Medium", "Low"];
const trApplicability = ["Yes", "No", "Undetermined"];
const ownersList = ["Alice", "Bob", "Charlie", "David", "Emma"];
const reviewersList = ["Frank", "Grace", "Hannah", "Isaac", "Jane"];

const TicketSummary: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<Record<number, boolean>>({});

  // Form fields state
  const [issueType, setIssueType] = useState<string>("");
  const [issueCategory, setIssueCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [trApplicable, setTrApplicable] = useState<string>("");
  const [ageOfIssue, setAgeOfIssue] = useState<string>("");
  const [ageOfTask, setAgeOfTask] = useState<string>("");
  const [timeSpent, setTimeSpent] = useState<string>("");
  const [lastChanged, setLastChanged] = useState<string>("");
  const [owner, setOwner] = useState<string>("");
  const [reviewer, setReviewer] = useState<string>("");

  // Mock rows data for the grid
  const rows = [
    { id: 1, issueId: "ITSK-2023-001", title: "Windows Login Error" },
    { id: 2, issueId: "ITSK-2023-002", title: "Network Connectivity Issue" },
    { id: 3, issueId: "ITSK-2023-003", title: "Software Installation Request" },
    { id: 4, issueId: "ITSK-2023-004", title: "Hardware Replacement" },
    { id: 5, issueId: "ITSK-2023-005", title: "VPN Access Problem" },
  ];

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAnalyse = () => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      // Check if any item is selected
      const hasSelection = Object.values(selectedItems).some(value => value);
      
      if (hasSelection) {
        toast.success("Analysis initiated for selected tickets");
        navigate('/ticket-details');
      } else {
        toast.error("Please select at least one ticket to analyse");
      }
    }, 1500);
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
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span>Back to Helpdesk View</span>
          </button>
        </div>
        
        <motion.div 
          className="bg-white rounded-lg shadow-lg p-6 mb-6"
          variants={itemVariants}
        >
          <h2 className="text-[25pt] font-light text-lt-darkBlue mb-6">Ticket Details Analysis</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div variants={itemVariants} className="form-group">
              <label htmlFor="issueType" className="block text-lt-darkBlue font-medium mb-2">Issue Type</label>
              <Select value={issueType} onValueChange={setIssueType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  {issueTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
            
            <motion.div variants={itemVariants} className="form-group">
              <label htmlFor="issueCategory" className="block text-lt-darkBlue font-medium mb-2">Issue Category</label>
              <Select value={issueCategory} onValueChange={setIssueCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {issueCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
            
            <motion.div variants={itemVariants} className="form-group">
              <label htmlFor="searchTerm" className="block text-lt-darkBlue font-medium mb-2">Issue Search Term</label>
              <Input 
                type="text" 
                id="searchTerm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full" 
              />
            </motion.div>
            
            <TooltipProvider>
              <motion.div variants={itemVariants} className="form-group">
                <div className="flex items-center mb-2">
                  <label htmlFor="trApplicability" className="block text-lt-darkBlue font-medium">TR Applicability</label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" className="h-6 w-6 p-0 ml-2">
                        <HelpCircle className="h-4 w-4 text-lt-grey" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Technical Requirements applicability for this issue</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Select value={trApplicable} onValueChange={setTrApplicable}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select applicability" />
                  </SelectTrigger>
                  <SelectContent>
                    {trApplicability.map((app) => (
                      <SelectItem key={app} value={app}>{app}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>
            </TooltipProvider>
            
            <TooltipProvider>
              <motion.div variants={itemVariants} className="form-group">
                <div className="flex items-center mb-2">
                  <label htmlFor="ageOfIssue" className="block text-lt-darkBlue font-medium">Age of Issue</label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" className="h-6 w-6 p-0 ml-2">
                        <HelpCircle className="h-4 w-4 text-lt-grey" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Number of days since the issue was created</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input 
                  type="number" 
                  id="ageOfIssue"
                  value={ageOfIssue}
                  onChange={(e) => setAgeOfIssue(e.target.value)}
                  className="w-full" 
                  min="0"
                />
              </motion.div>
            </TooltipProvider>
            
            <motion.div variants={itemVariants} className="form-group">
              <label htmlFor="ageOfTask" className="block text-lt-darkBlue font-medium mb-2">Age of Task</label>
              <Input 
                type="number" 
                id="ageOfTask"
                value={ageOfTask}
                onChange={(e) => setAgeOfTask(e.target.value)}
                className="w-full" 
                min="0"
              />
            </motion.div>
            
            <TooltipProvider>
              <motion.div variants={itemVariants} className="form-group">
                <div className="flex items-center mb-2">
                  <label htmlFor="timeSpent" className="block text-lt-darkBlue font-medium">Total Time Spent</label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" className="h-6 w-6 p-0 ml-2">
                        <HelpCircle className="h-4 w-4 text-lt-grey" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Total time spent on this issue in minutes</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input 
                  type="number" 
                  id="timeSpent"
                  value={timeSpent}
                  onChange={(e) => setTimeSpent(e.target.value)}
                  className="w-full" 
                  min="0"
                />
              </motion.div>
            </TooltipProvider>
            
            <motion.div variants={itemVariants} className="form-group">
              <label htmlFor="lastChanged" className="block text-lt-darkBlue font-medium mb-2">Last Changed On</label>
              <Input 
                type="date" 
                id="lastChanged"
                value={lastChanged}
                onChange={(e) => setLastChanged(e.target.value)}
                className="w-full" 
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="form-group">
              <label htmlFor="owner" className="block text-lt-darkBlue font-medium mb-2">Owner</label>
              <Select value={owner} onValueChange={setOwner}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select owner" />
                </SelectTrigger>
                <SelectContent>
                  {ownersList.map((own) => (
                    <SelectItem key={own} value={own}>{own}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
            
            <motion.div variants={itemVariants} className="form-group">
              <label htmlFor="reviewer" className="block text-lt-darkBlue font-medium mb-2">Reviewer</label>
              <Select value={reviewer} onValueChange={setReviewer}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select reviewer" />
                </SelectTrigger>
                <SelectContent>
                  {reviewersList.map((rev) => (
                    <SelectItem key={rev} value={rev}>{rev}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-lg shadow-lg overflow-hidden"
          variants={itemVariants}
        >
          <div className="p-4 border-b border-lt-lightGrey">
            <h3 className="text-lg font-semibold text-lt-darkBlue">Selected Tickets</h3>
            <p className="text-lt-grey">Select the tickets you want to analyse</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-lt-lightGrey">
                <tr>
                  <th className="px-4 py-3 text-left text-lt-darkBlue font-medium">Select</th>
                  <th className="px-4 py-3 text-left text-lt-darkBlue font-medium">Issue ID</th>
                  <th className="px-4 py-3 text-left text-lt-darkBlue font-medium">Title</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-lt-lightGrey">
                {rows.map((row) => (
                  <motion.tr 
                    key={row.id}
                    className="hover:bg-lt-offWhite/50 transition-all cursor-pointer"
                    whileHover={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)" }}
                    variants={itemVariants}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`check-${row.id}`}
                          checked={selectedItems[row.id] || false}
                          onCheckedChange={() => handleCheckboxChange(row.id)}
                          className="checkbox-custom"
                        />
                        {selectedItems[row.id] && (
                          <Check className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-lt-grey">{row.issueId}</td>
                    <td className="px-4 py-3 text-lt-grey">{row.title}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 flex justify-end">
            <Button 
              onClick={handleAnalyse} 
              className="lt-button-primary px-6"
              disabled={loading}
            >
              {loading ? "Processing..." : "Analyse & Propose"}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TicketSummary;
