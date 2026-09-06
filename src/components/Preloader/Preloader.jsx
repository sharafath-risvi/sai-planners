import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoaded(true), 500); // Small pause at 100%
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isLoaded && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-navy text-white overflow-hidden"
          exit={{ y: '-100%', opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Logo Container */}
          <motion.div
            className="overflow-hidden"
            initial={{ y: 0 }}
            animate={progress === 100 ? { y: -50, opacity: 0 } : { y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-display font-semibold tracking-widest text-center"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
              SAI PLANNERS
            </motion.h1>
          </motion.div>

          {/* Progress Indicator */}
          <motion.div 
            className="absolute bottom-12 right-12 font-mono text-sm tracking-widest text-brand-gold"
            animate={progress === 100 ? { opacity: 0 } : { opacity: 1 }}
          >
            {Math.min(progress, 100).toString().padStart(2, '0')} — 100
          </motion.div>

          {/* Architectural Lines */}
          <motion.div 
            className="absolute inset-0 pointer-events-none opacity-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white transform -translate-y-1/2 scale-x-0 origin-left animate-[growLine_2s_ease-out_forwards]" />
            <div className="absolute left-1/2 top-0 w-[1px] h-full bg-white transform -translate-x-1/2 scale-y-0 origin-top animate-[growLine_2s_ease-out_0.5s_forwards]" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
