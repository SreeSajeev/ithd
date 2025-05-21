
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SearchIssue: React.FC = () => {
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
      <Header title="SEARCH ISSUE" />
      
      <div className="max-w-[1366px] w-full px-4 py-8">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[30pt] font-light text-lt-darkBlue relative inline-block">
            Search Issue
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
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <Search className="w-16 h-16 text-lt-brightBlue" />
              </motion.div>
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
              This is the Search Issue page placeholder — content coming soon.
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
              Here you will be able to search for and track the status of reported issues.
            </motion.p>
            
            <motion.div 
              className="mt-12 max-w-md mx-auto relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <input
                type="text"
                className="form-input rounded-full bg-white pr-12"
                placeholder="Search for issues..."
                disabled
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <Search className="w-5 h-5 text-lt-mutedGrey" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SearchIssue;
