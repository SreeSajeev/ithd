
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Paperclip, Send } from 'lucide-react';
import Header from '../components/Header';
import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ResponsePage: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  
  // Mock data for the issue
  const issueData = {
    issueNumber: 'IT-2023-005',
    status: 'In Progress',
    startDate: '2023-05-14 09:00',
    targetDate: '2023-05-16 17:00',
    owner: 'Emma Johnson',
    cc: 'support@company.com',
    thread: `
Issue reported by David Brown on 2023-05-14:
I'm having trouble accessing the CRM system. It shows an error message about database connection.

Response from IT (Emma) on 2023-05-14 11:30:
Hi David, we're looking into this issue. Can you please provide your employee ID and a screenshot of the error?

Response from David Brown on 2023-05-14 12:45:
My employee ID is EMP2345. Here's the screenshot attached.

Response from IT (Emma) on 2023-05-14 14:20:
Thanks, David. We've identified the problem with the database connection. The IT team is working on restoring the connection. We expect this to be resolved within the next 2 hours.

Response from IT (Emma) on 2023-05-14 16:30:
Update: The database connection has been restored. Please try accessing the CRM system again and let us know if you still face any issues.
    `
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Please enter a message before replying");
      return;
    }
    
    toast.success("Reply sent successfully");
    setMessage('');
    setFile(null);
    // In a real app, we would send the message and file to the server here
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      toast.info(`File "${e.target.files[0].name}" attached`);
    }
  };
  
  const handleFileRemove = () => {
    setFile(null);
    toast.info("File attachment removed");
  };
  
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
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-lt-offWhite">
      <Header title="RESPONSE THREAD" />
      
      <motion.div 
        className="container mx-auto p-6 flex-grow"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate('/ticket-details')}
            className="back-button text-lt-grey hover:text-lt-brightBlue transition-colors flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span>Back to Ticket Details</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left panel with issue metadata */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-1 space-y-6"
          >
            <Card className="bg-white shadow-md">
              <CardHeader>
                <CardTitle>Issue Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-lt-darkBlue">Issue Number</p>
                  <p className="text-base">{issueData.issueNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-lt-darkBlue">Status</p>
                  <div className="mt-1">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${issueData.status === 'Open' ? 'bg-yellow-100 text-yellow-800' :
                      issueData.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'}`}>
                      {issueData.status}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-lt-darkBlue">Start</p>
                  <p className="text-base">{issueData.startDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-lt-darkBlue">Target Date</p>
                  <p className="text-base">{issueData.targetDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-lt-darkBlue">Owner</p>
                  <p className="text-base">{issueData.owner}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-lt-darkBlue">CC Address</p>
                  <p className="text-base">{issueData.cc}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Right panel with response thread and reply form */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-2 space-y-6"
          >
            {/* Reply form */}
            <Card className="bg-white shadow-md">
              <CardHeader>
                <CardTitle>Your Response</CardTitle>
                <CardDescription>Type your message and attach any necessary files</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-lt-darkBlue">Type your message</label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Enter your response here..."
                      className="min-h-32 bg-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-lt-darkBlue">Attachment</label>
                      <input
                        id="fileUpload"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => document.getElementById('fileUpload')?.click()}
                        className="flex items-center"
                      >
                        <Paperclip className="w-4 h-4 mr-1" />
                        Attach File
                      </Button>
                    </div>
                    
                    {file && (
                      <div className="bg-blue-50 p-2 rounded-md flex justify-between items-center mt-2">
                        <span className="text-sm truncate">{file.name}</span>
                        <button 
                          type="button" 
                          onClick={handleFileRemove}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-end">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit" 
                      className="lt-button-primary flex items-center"
                    >
                      <Send className="w-4 h-4 mr-1" />
                      Reply to User
                    </Button>
                  </motion.div>
                </CardFooter>
              </form>
            </Card>
            
            {/* Response thread */}
            <Card className="bg-white shadow-md">
              <CardHeader>
                <CardTitle>Issue and Response Thread</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-md max-h-96 overflow-auto whitespace-pre-line">
                  {issueData.thread}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResponsePage;
