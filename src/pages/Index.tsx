
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Header from '../components/Header';
import HelpDeskForm from '../components/HelpDeskForm';
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Index() {
  const navigate = useNavigate();

  const handleCardClick = (route: string) => {
    navigate(route);
  };

  const handleDownloadUserIDForm = () => {
    // Simulate file download
    const link = document.createElement('a');
    link.href = '#'; // Replace with actual file path
    link.setAttribute('download', 'UserID_Request_Form.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("User ID Form downloaded successfully");
  };

  const escalationMatrix = [
    { level: 'Level 1', contact: 'IT Helpdesk', email: 'helpdesk@company.com', phone: '+1-555-123-4567', responseTime: '2 hours' },
    { level: 'Level 2', contact: 'IT Support Manager', email: 'support.manager@company.com', phone: '+1-555-234-5678', responseTime: '4 hours' },
    { level: 'Level 3', contact: 'IT Director', email: 'it.director@company.com', phone: '+1-555-345-6789', responseTime: '1 business day' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
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
      <Header title="IT HELPDESK" />

      <div className="container mx-auto px-4 py-8 flex-grow">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Left column - IT Helpdesk Form */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <div className="form-container p-6 mb-8">
              <h2 className="text-[30pt] font-light text-center mb-8">
                IT Helpdesk
              </h2>
              <HelpDeskForm />
            </div>
            
            {/* IT Escalation Matrix */}
            <motion.div 
              variants={itemVariants} 
              className="form-container p-6 mb-8"
              whileHover={{ boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)" }}
            >
              <h2 className="text-[25pt] font-light text-center mb-6">
                IT Escalation Matrix
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-lt-lightGrey">
                  <thead>
                    <tr className="bg-lt-darkBlue text-white">
                      <th className="py-3 px-4 text-left">Level</th>
                      <th className="py-3 px-4 text-left">Contact Person</th>
                      <th className="py-3 px-4 text-left">Email</th>
                      <th className="py-3 px-4 text-left">Phone</th>
                      <th className="py-3 px-4 text-left">Response Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {escalationMatrix.map((level, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="py-3 px-4 border-b border-lt-lightGrey">{level.level}</td>
                        <td className="py-3 px-4 border-b border-lt-lightGrey">{level.contact}</td>
                        <td className="py-3 px-4 border-b border-lt-lightGrey">{level.email}</td>
                        <td className="py-3 px-4 border-b border-lt-lightGrey">{level.phone}</td>
                        <td className="py-3 px-4 border-b border-lt-lightGrey">{level.responseTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column - Actions */}
          <motion.div variants={itemVariants} className="md:col-span-1 space-y-8">
            <div className="form-container p-6">
              <h3 className="text-[20pt] font-light mb-6">Quick Actions</h3>
              <div className="space-y-4">
                <Card
                  className="hover:shadow-lg transition-shadow duration-200 cursor-pointer hover-card"
                  onClick={() => handleCardClick('/report-problem')}
                >
                  <CardHeader>
                    <CardTitle>Report Problem</CardTitle>
                    <CardDescription>Submit an issue ticket</CardDescription>
                  </CardHeader>
                </Card>

                <Card
                  className="hover:shadow-lg transition-shadow duration-200 cursor-pointer hover-card"
                  onClick={() => handleCardClick('/search-issue')}
                >
                  <CardHeader>
                    <CardTitle>Search Issue</CardTitle>
                    <CardDescription>Find existing tickets</CardDescription>
                  </CardHeader>
                </Card>

                <Card
                  className="hover:shadow-lg transition-shadow duration-200 cursor-pointer hover-card"
                  onClick={() => handleCardClick('/change-request')}
                >
                  <CardHeader>
                    <CardTitle>Change Request</CardTitle>
                    <CardDescription>Request system changes</CardDescription>
                  </CardHeader>
                </Card>

                <Card
                  className="hover:shadow-lg transition-shadow duration-200 cursor-pointer hover-card"
                  onClick={() => handleCardClick('/clarification')}
                >
                  <CardHeader>
                    <CardTitle>Ask for Clarification</CardTitle>
                    <CardDescription>Get help with existing issues</CardDescription>
                  </CardHeader>
                </Card>
                
                {/* New UserID Form Download Card */}
                <Card
                  className="hover:shadow-lg transition-shadow duration-200 cursor-pointer hover-card bg-gradient-to-br from-white to-blue-50"
                  onClick={handleDownloadUserIDForm}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Download className="h-5 w-5 mr-2 text-lt-brightBlue" />
                      Download UserID Form
                    </CardTitle>
                    <CardDescription>Request new system access</CardDescription>
                  </CardHeader>
                </Card>

                <Button
                  onClick={() => navigate('/login')}
                  className="lt-button-secondary w-full py-4 text-base flex items-center justify-center"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Staff Portal Login
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <footer className="bg-white py-4 border-t border-lt-lightGrey">
        <div className="container mx-auto px-4">
          <p className="text-center text-lt-grey text-sm">
            © 2025 IT Helpdesk. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Index;
