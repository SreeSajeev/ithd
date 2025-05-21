
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import HelpDeskForm from '../components/HelpDeskForm';
import { motion } from 'framer-motion';

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="lt-bg min-h-screen w-full flex flex-col items-center">
      <Header />
      
      <div className="max-w-[1366px] w-full px-4 py-8">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[30pt] font-light text-lt-darkBlue relative inline-block">
            IT HELPDESK
            <motion.span
              className="absolute -bottom-2 left-1/2 h-1 bg-lt-brightBlue rounded-full"
              initial={{ width: "0%", x: "-50%" }}
              animate={{ width: loaded ? "60%" : "0%", x: "-50%" }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            />
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <HelpDeskForm />
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
