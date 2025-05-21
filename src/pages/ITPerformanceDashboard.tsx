
import React from 'react';
import { ArrowLeft, BarChart, Download } from 'lucide-react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { Button } from '@/components/ui/button';

// Mock data for charts
const ticketsOverTimeData = [
  { name: 'Jan', tickets: 65 },
  { name: 'Feb', tickets: 59 },
  { name: 'Mar', tickets: 80 },
  { name: 'Apr', tickets: 81 },
  { name: 'May', tickets: 56 },
  { name: 'Jun', tickets: 55 },
  { name: 'Jul', tickets: 40 },
];

const ticketTypeData = [
  { name: 'Application', value: 45 },
  { name: 'Infrastructure', value: 30 },
  { name: 'Network', value: 25 },
];

const priorityData = [
  { name: 'High', value: 15, color: '#de3618' },
  { name: 'Medium', value: 25, color: '#f59e0b' },
  { name: 'Low', value: 10, color: '#10b981' },
];

const chartConfig = {
  tickets: { label: 'Tickets', color: '#0370c0' },
  application: { label: 'Application', color: '#0370c0' },
  infrastructure: { label: 'Infrastructure', color: '#024d87' },
  network: { label: 'Network', color: '#10b981' },
  high: { label: 'High', color: '#de3618' },
  medium: { label: 'Medium', color: '#f59e0b' },
  low: { label: 'Low', color: '#10b981' },
};

const ITPerformanceDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = React.useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const COLORS = ['#0370c0', '#024d87', '#10b981'];

  return (
    <div className="min-h-screen flex flex-col bg-lt-offWhite">
      <Header title="IT PERFORMANCE DASHBOARD" />
      
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
          IT Team Performance Dashboard
        </motion.h1>
        
        {/* Summary Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={itemVariants}
        >
          <div className="bg-white p-6 rounded-lg shadow-md border border-lt-lightGrey hover-card">
            <h3 className="text-[20pt] font-normal text-lt-darkBlue mb-2">Total Tickets Resolved</h3>
            <div className="flex justify-between items-end">
              <div className="text-4xl font-light text-lt-brightBlue">386</div>
              <div className="flex flex-col text-right">
                <span className="text-sm text-lt-grey">Today: 12</span>
                <span className="text-sm text-lt-grey">This Week: 73</span>
                <span className="text-sm text-lt-grey">This Month: 301</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-lt-lightGrey hover-card">
            <h3 className="text-[20pt] font-normal text-lt-darkBlue mb-2">Avg. Resolution Time</h3>
            <div className="text-4xl font-light text-lt-brightBlue">3.2 days</div>
            <div className="text-sm text-green-600 mt-2">↓ 0.5 days from last month</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-lt-lightGrey hover-card">
            <h3 className="text-[20pt] font-normal text-lt-darkBlue mb-2">SLA Compliance</h3>
            <div className="text-4xl font-light text-lt-brightBlue">94.2%</div>
            <div className="text-sm text-green-600 mt-2">↑ 2.1% from last month</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-lt-lightGrey hover-card">
            <h3 className="text-[20pt] font-normal text-lt-darkBlue mb-2">Most Active Member</h3>
            <div className="text-2xl font-light text-lt-brightBlue">Rajesh K.</div>
            <div className="text-sm text-lt-grey mt-2">42 tickets resolved this month</div>
          </div>
        </motion.div>
        
        {/* Charts - Middle Section */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
          variants={itemVariants}
        >
          <div className="bg-white p-6 rounded-lg shadow-md border border-lt-lightGrey">
            <h3 className="text-[20pt] font-normal text-lt-darkBlue mb-4">Ticket Volume Over Time</h3>
            <div className="flex justify-end mb-4">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 focus:z-10 focus:bg-lt-lightGrey">
                  Daily
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-900 bg-lt-lightGrey border-t border-b border-r border-gray-200 hover:bg-gray-100 focus:z-10 focus:bg-lt-lightGrey">
                  Weekly
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-lg hover:bg-gray-100 focus:z-10 focus:bg-lt-lightGrey">
                  Monthly
                </button>
              </div>
            </div>
            <div className="h-64">
              <ChartContainer config={chartConfig}>
                <LineChart data={ticketsOverTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="tickets"
                    stroke="#0370c0"
                    strokeWidth={2}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-lt-lightGrey">
            <h3 className="text-[20pt] font-normal text-lt-darkBlue mb-4">Ticket Distribution by Type</h3>
            <div className="h-64 flex flex-col">
              <div className="flex-1">
                <ChartContainer config={chartConfig}>
                  <PieChart>
                    <Pie
                      data={ticketTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {ticketTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ChartContainer>
              </div>
              <div className="flex justify-center mt-4">
                {ticketTypeData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center mx-3">
                    <div
                      className="w-3 h-3 rounded-full mr-1"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-sm text-lt-grey">{entry.name}: {entry.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Bottom Section */}
        <motion.div 
          className="grid grid-cols-1 gap-6 mb-8"
          variants={itemVariants}
        >
          <div className="bg-white p-6 rounded-lg shadow-md border border-lt-lightGrey">
            <h3 className="text-[20pt] font-normal text-lt-darkBlue mb-4">Priority Breakdown of Pending Tickets</h3>
            <div className="h-64">
              <ChartContainer config={chartConfig}>
                <RechartsBarChart data={priorityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value">
                    {priorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </RechartsBarChart>
              </ChartContainer>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex justify-center"
          variants={itemVariants}
        >
          <Button 
            className="lt-button-primary btn-ripple flex items-center justify-center px-8"
            onClick={() => {
              // Handle report download action
              const link = document.createElement('a');
              link.href = '#';
              link.setAttribute('download', 'IT_Performance_Full_Report.pdf');
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            <Download className="w-5 h-5 mr-2" />
            View Full Report
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ITPerformanceDashboard;
