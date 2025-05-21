
import React, { useState, useEffect } from 'react';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Clarification: React.FC = () => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="lt-bg min-h-screen w-full flex flex-col items-center">
      <Header title="CLARIFICATION" />
      
      <div className="max-w-[1366px] w-full px-4 py-8">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[30pt] font-light text-lt-darkBlue relative inline-block">
            Clarification
            <motion.span
              className="absolute -bottom-2 left-1/2 h-1 bg-lt-brightBlue rounded-full"
              initial={{ width: "0%", x: "-50%" }}
              animate={{ width: isVisible ? "60%" : "0%", x: "-50%" }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            />
          </h2>
        </motion.div>
        
        <motion.div 
          className="form-container w-full p-8 relative hover-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <motion.button 
            onClick={() => navigate('/')}
            className="back-button absolute top-6 left-6 text-lt-darkBlue hover:text-lt-brightBlue transition-colors flex items-center"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.97 }}
          >
            <ArrowLeft className={`w-6 h-6 ${isHovering ? 'transform -translate-x-1 transition-transform' : 'transition-transform'}`} />
            <span className="ml-1 text-sm font-medium">Back to Helpdesk</span>
          </motion.button>
          
          <motion.div 
            className="text-center py-12"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <motion.div 
              className="mb-8 flex justify-center"
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100
                  }
                }
              }}
            >
              <HelpCircle className="w-16 h-16 text-lt-brightBlue animate-pulse" />
            </motion.div>
            <motion.p 
              className="text-lt-grey text-xl mb-4"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 100 }
                }
              }}
            >
              This is the Clarification page placeholder — content coming soon.
            </motion.p>
            <motion.p 
              className="text-lt-mutedGrey"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 100, delay: 0.2 }
                }
              }}
            >
              Here you will be able to request clarification on IT-related questions.
            </motion.p>
            
            <motion.div 
              className="mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="w-16 h-1 bg-lt-lightGrey mx-auto rounded-full"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Clarification;
