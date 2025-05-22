
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Paperclip, Send, X } from 'lucide-react';
import Header from '../components/Header';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

const TicketDetails: React.FC = () => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const [uploads, setUploads] = useState<File[]>([]);
  const [timeSpent, setTimeSpent] = useState<string>('');
  const [problemStatement, setProblemStatement] = useState<string>('');
  const [rootCause, setRootCause] = useState<string>('');
  const [reviewRemarks, setReviewRemarks] = useState<string>('');
  const [previousReview, setPreviousReview] = useState<string>('');
  const [additionalNotes, setAdditionalNotes] = useState<string>('');

  // Mock ticket data
  const ticketData = {
    date: '2025-05-21',
    issueType: 'Software',
    category: 'Application',
    searchItem: 'Login failure',
    transaction: 'User Authentication',
    taskStatus: 'In Progress',
    age: '5 days',
    responseThread: 'User reported inability to log in to the system after password reset',
    reporter: 'John Smith',
    product: 'ERP System',
    function: 'Authentication',
    plant: 'HQ',
    mobileNumber: '+1 (555) 123-4567',
    externalNumber: 'EXT-001-2025'
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setUploads([...uploads, ...newFiles]);
      toast.success(`Added ${newFiles.length} attachment(s)`);
    }
  };

  const handleRemoveFile = (index: number) => {
    const newUploads = [...uploads];
    newUploads.splice(index, 1);
    setUploads(newUploads);
    toast.info('Attachment removed');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemStatement) {
      toast.error('Please provide a problem statement');
      return;
    }
    toast.success('Form submitted successfully');
  };

  const handleResponse = () => {
    navigate('/response');
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
      <Header title="TICKET DETAILS" />
      
      <motion.div 
        className="container mx-auto p-6 flex-grow"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate('/ticket-summary')}
            className="back-button text-lt-grey hover:text-lt-brightBlue transition-colors flex items-center"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <ArrowLeft className={`w-5 h-5 mr-1 ${isHovering ? 'transform -translate-x-1 transition-transform' : 'transition-transform'}`} />
            <span>Back to Ticket Summary</span>
          </button>
        </div>
        
        <motion.h1 
          className="text-[30pt] font-light text-center mb-8"
          variants={itemVariants}
        >
          Ticket Details
        </motion.h1>
        
        <div className="grid md:grid-cols-5 gap-6">
          {/* Left Panel - Editable Form (3/5 width) */}
          <motion.div 
            className="md:col-span-3 bg-white p-6 rounded-lg shadow-md border border-lt-lightGrey"
            variants={itemVariants}
          >
            <h2 className="text-[25pt] font-light text-lt-darkBlue mb-6">Analyse and Propose</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="problemStatement">Problem Statement/Requirement</Label>
                <Textarea 
                  id="problemStatement"
                  className="form-input min-h-24 mt-2"
                  placeholder="Describe the problem statement or requirement"
                  value={problemStatement}
                  onChange={(e) => setProblemStatement(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="rootCause">Root Cause & Objective</Label>
                <Textarea 
                  id="rootCause"
                  className="form-input min-h-24 mt-2"
                  placeholder="Describe the root cause and objective"
                  value={rootCause}
                  onChange={(e) => setRootCause(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="reviewRemarks">Review Remarks</Label>
                <Textarea 
                  id="reviewRemarks"
                  className="form-input min-h-24 mt-2"
                  placeholder="Enter any review remarks"
                  value={reviewRemarks}
                  onChange={(e) => setReviewRemarks(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="previousReview">Previous Review</Label>
                <Textarea 
                  id="previousReview"
                  className="form-input min-h-24 mt-2"
                  placeholder="Previous review information"
                  value={previousReview}
                  onChange={(e) => setPreviousReview(e.target.value)}
                  readOnly
                />
              </div>
              
              <div>
                <Label>Attachment Upload</Label>
                <div className="mt-2 space-y-2">
                  <div className="file-input-wrapper">
                    <label className="file-input-button bg-lt-lightGrey hover:bg-lt-offWhite transition-colors flex items-center cursor-pointer">
                      <Paperclip className="w-4 h-4 mr-2" />
                      Choose File
                      <input 
                        type="file" 
                        id="attachment" 
                        className="file-input" 
                        onChange={handleFileChange}
                        multiple
                      />
                    </label>
                  </div>
                  
                  {uploads.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {uploads.map((file, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between bg-lt-offWhite p-2 rounded-md"
                        >
                          <span className="text-sm truncate max-w-[80%]">{file.name}</span>
                          <button 
                            type="button" 
                            onClick={() => handleRemoveFile(index)}
                            className="text-lt-grey hover:text-red-500 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <Label htmlFor="additionalNotes">Additional Notes</Label>
                <Textarea 
                  id="additionalNotes"
                  className="form-input min-h-32 mt-2"
                  placeholder="Enter any additional notes"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="timeSpent">Time Spent (Minutes)</Label>
                <Input 
                  id="timeSpent"
                  type="number"
                  className="form-input w-32 mt-2"
                  placeholder="Minutes"
                  value={timeSpent}
                  onChange={(e) => setTimeSpent(e.target.value)}
                />
              </div>
              
              <div className="flex justify-center pt-4 space-x-4">
                <Button 
                  type="submit" 
                  className="lt-button-primary btn-ripple px-10 py-4 text-base"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send
                </Button>
                
                <Button 
                  type="button"
                  onClick={handleResponse}
                  className="lt-button-secondary btn-ripple px-10 py-4 text-base"
                >
                  Response
                </Button>
              </div>
            </form>
          </motion.div>
          
          {/* Right Panel - Fixed Ticket Metadata (2/5 width) */}
          <motion.div 
            className="md:col-span-2"
            variants={itemVariants}
          >
            <div className="bg-white p-6 rounded-lg shadow-md border border-lt-lightGrey sticky top-6">
              <h2 className="text-[20pt] font-light text-lt-darkBlue mb-6">Ticket Information</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-lt-grey text-sm">Date</p>
                    <p className="font-medium">{ticketData.date}</p>
                  </div>
                  <div>
                    <p className="text-lt-grey text-sm">Issue Type</p>
                    <p className="font-medium">{ticketData.issueType}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-lt-grey text-sm">Category</p>
                  <p className="font-medium">{ticketData.category}</p>
                </div>
                
                <div>
                  <p className="text-lt-grey text-sm">Search Item</p>
                  <p className="font-medium">{ticketData.searchItem}</p>
                </div>
                
                <div>
                  <p className="text-lt-grey text-sm">Transaction</p>
                  <p className="font-medium">{ticketData.transaction}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-lt-grey text-sm">Task Status</p>
                    <p className="font-medium">{ticketData.taskStatus}</p>
                  </div>
                  <div>
                    <p className="text-lt-grey text-sm">Age</p>
                    <p className="font-medium">{ticketData.age}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-lt-grey text-sm">Response Thread</p>
                  <p className="font-medium text-sm line-clamp-2" title={ticketData.responseThread}>
                    {ticketData.responseThread}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-lt-grey text-sm">Reporter</p>
                    <HoverCard>
                      <HoverCardTrigger>
                        <p className="font-medium cursor-help">{ticketData.reporter}</p>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Contact Information</p>
                          <p className="text-xs">Mobile: {ticketData.mobileNumber}</p>
                          <p className="text-xs">External: {ticketData.externalNumber}</p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                  <div>
                    <p className="text-lt-grey text-sm">Product</p>
                    <p className="font-medium">{ticketData.product}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-lt-grey text-sm">Function</p>
                    <p className="font-medium">{ticketData.function}</p>
                  </div>
                  <div>
                    <p className="text-lt-grey text-sm">Plant</p>
                    <p className="font-medium">{ticketData.plant}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default TicketDetails;
