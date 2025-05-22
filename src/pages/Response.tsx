
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Response: React.FC = () => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [uploads, setUploads] = useState<File[]>([]);
  const [ccAddress, setCcAddress] = useState<string>('');

  // Mock data
  const responseData = {
    issueNumber: 'IT-2025-00042',
    status: 'In Progress',
    startDate: '2025-05-15 09:30',
    targetDate: '2025-05-25 18:00',
    owner: 'Jane Smith',
    thread: `[2025-05-15 09:30] User: Unable to access the application after password reset. I tried multiple times but keep getting "Invalid credentials" error.\n\n[2025-05-15 10:15] IT Support: Thank you for reporting this issue. Could you please provide your username and when you last reset your password?\n\n[2025-05-15 11:05] User: My username is jdoe123, and I reset my password yesterday around 4 PM.\n\n[2025-05-16 09:10] IT Support: We've identified an issue with the password synchronization system. We're implementing a fix now and will update you shortly.`
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
    if (!message) {
      toast.error('Please type a message before replying');
      return;
    }
    toast.success('Response sent to user');
    setTimeout(() => {
      navigate('/ticket-details');
    }, 1500);
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
      <Header title="RESPONSE" />
      
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
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <ArrowLeft className={`w-5 h-5 mr-1 ${isHovering ? 'transform -translate-x-1 transition-transform' : 'transition-transform'}`} />
            <span>Back to Ticket Details</span>
          </button>
        </div>
        
        <motion.h1 
          className="text-[30pt] font-light text-center mb-8"
          variants={itemVariants}
        >
          Response
        </motion.h1>
        
        <form onSubmit={handleSubmit}>
          <motion.div className="space-y-6" variants={itemVariants}>
            {/* Top Card - Ticket Information */}
            <Card className="border border-lt-lightGrey shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-[20pt] font-light text-lt-darkBlue">Ticket Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="issueNumber" className="form-label">Issue Number</Label>
                    <Input 
                      id="issueNumber" 
                      value={responseData.issueNumber}
                      className="form-input mt-1"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="status" className="form-label">Status</Label>
                    <Input 
                      id="status" 
                      value={responseData.status}
                      className="form-input mt-1"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="owner" className="form-label">Owner</Label>
                    <Input 
                      id="owner" 
                      value={responseData.owner}
                      className="form-input mt-1"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="start" className="form-label">Start</Label>
                    <Input 
                      id="start" 
                      value={responseData.startDate}
                      className="form-input mt-1"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="target" className="form-label">Target Date</Label>
                    <Input 
                      id="target" 
                      value={responseData.targetDate}
                      className="form-input mt-1"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="ccAddress" className="form-label">CC Address</Label>
                    <Input 
                      id="ccAddress" 
                      value={ccAddress}
                      onChange={(e) => setCcAddress(e.target.value)}
                      placeholder="email@example.com"
                      className="form-input mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Middle Card - Message and Attachments */}
            <Card className="border border-lt-lightGrey shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-[20pt] font-light text-lt-darkBlue">Your Message</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="message" className="form-label">Type your Message</Label>
                    <Textarea 
                      id="message"
                      className="form-input min-h-32 mt-1"
                      placeholder="Type your response to the user here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label className="form-label">Attachment Upload</Label>
                    <div className="mt-1">
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
                            <motion.div 
                              key={index} 
                              className="flex items-center justify-between bg-lt-offWhite p-2 rounded-md"
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <span className="text-sm truncate max-w-[80%]">{file.name}</span>
                              <button 
                                type="button" 
                                onClick={() => handleRemoveFile(index)}
                                className="text-lt-grey hover:text-red-500 transition-colors"
                              >
                                <X size={16} />
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Bottom Card - Response Thread */}
            <Card className="border border-lt-lightGrey shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-[20pt] font-light text-lt-darkBlue">Issue and Response Thread</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  className="form-input min-h-64 font-mono text-sm"
                  value={responseData.thread}
                  readOnly
                />
              </CardContent>
            </Card>
            
            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <Button 
                type="submit" 
                className="lt-button-primary btn-ripple px-12 py-4 text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-5 h-5 mr-2" />
                Reply to User
              </Button>
            </div>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default Response;
