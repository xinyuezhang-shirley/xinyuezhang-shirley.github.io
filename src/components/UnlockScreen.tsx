import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Smartphone, Monitor, Battery, Wifi, Signal } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

interface UnlockScreenProps {
  onUnlock: () => void;
  isUnlocked: boolean;
  className?: string;
  scale?: number; // new: scale for the computer image
}

const UnlockScreen = ({ onUnlock, isUnlocked, className, scale = 1 }: UnlockScreenProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center overflow-hidden z-40 ${className || ''}`} style={{ minHeight: '100vh', minWidth: '100vw' }}>
      {/* Laptop Container */}
      <div className="laptop" style={{ transform: `scale(${scale})` }}>
        {/* Screen */}
        <div className="screen">
          {/* Header */}
          <div className="header"></div>
          
          {/* Login UI Content */}
          <motion.div
            animate={isUnlocked ? { scale: 0.8, opacity: 0.3 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center w-full max-w-xs"
            style={{ transform: 'scale(0.7)', pointerEvents: 'auto' }}
          >
            {/* Profile Picture */}
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-2"
            >
              <div 
                className="w-10 h-10 mx-auto rounded-full flex items-center justify-center text-white text-sm font-semibold mb-1"
                style={{
                  background: 'linear-gradient(135deg, rgba(147,197,253,0.9), rgba(196,181,253,0.9))',
                  border: '2px solid rgba(255,255,255,0.4)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.3)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                SZ
              </div>
              <div className="text-xs font-medium text-white drop-shadow-lg">Shirley Zhang</div>
            </motion.div>

            {/* Password Input */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-2"
            >
              <div className="relative">
                <input
                  type="password"
                  value="ready_for_the_ride?"
                  readOnly
                  className="w-full px-2 py-1 text-white text-center text-xs focus:outline-none"
                  placeholder="Enter password"
                  style={{ 
                    background: 'rgba(255,255,255,0.12)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    borderRadius: '8px',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.15)',
                  }}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <Lock size={12} className="text-white opacity-70" />
                </div>
              </div>
            </motion.div>

            {/* Unlock Button */}
            <motion.button
              onClick={() => {
                console.log('Unlock button clicked!');
                onUnlock();
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full font-medium py-1.5 px-3 rounded-lg transition-all duration-200 relative z-50 text-xs cursor-pointer"
              style={{ 
                background: 'linear-gradient(135deg, rgba(59,130,246,0.9), rgba(37,99,235,0.9))',
                border: '1px solid rgba(255,255,255,0.25)',
                color: 'white',
                boxShadow: '0 8px 16px rgba(59,130,246,0.3), inset 0 1px 0 rgba(255,255,255,0.25)',
                backdropFilter: 'blur(12px)',
                pointerEvents: 'auto',
              }}
            >
              Unlock
            </motion.button>

            {/* Time Display */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-2 text-center"
            >
              <div className="text-xs font-light mb-1 text-white drop-shadow-lg">{formatTime(currentTime)}</div>
              <div className="text-xs opacity-80 text-white drop-shadow-lg">{formatDate(currentTime)}</div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Keyboard */}
        <div className="keyboard"></div>
      </div>

      {/* CSS Styles */}
      <style>{`
        .laptop {
          transform: scale(0.8);
        }
        .screen {
          border-radius: 20px;
          box-shadow: inset 0 0 0 2px #c8cacb, inset 0 0 0 10px #000;
          height: 318px;
          width: 518px;
          margin: 0 auto;
          padding: 9px 9px 23px 9px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background-image: linear-gradient(
            15deg,
            #3f51b1 0%,
            #5a55ae 13%,
            #7b5fac 25%,
            #8f6aae 38%,
            #a86aa4 50%,
            #cc6b8e 62%,
            #f18271 75%,
            #f3a469 87%,
            #f7c978 100%
          );
          transform-style: preserve-3d;
          transform: perspective(1900px) rotateX(-88.5deg);
          transform-origin: 50% 100%;
          animation: openOnce 2s ease-out forwards;
          pointer-events: auto;
        }
        @keyframes openOnce {
          0% {
            transform: perspective(1900px) rotateX(-88.5deg);
          }
          100% {
            transform: perspective(1000px) rotateX(0deg);
          }
        }
        @keyframes open {
          0% {
            transform: perspective(1900px) rotateX(-88.5deg);
          }
          100% {
            transform: perspective(1000px) rotateX(0deg);
          }
        }
        .screen::before {
          content: "";
          width: 518px;
          height: 12px;
          position: absolute;
          background: linear-gradient(#979899, transparent);
          top: -3px;
          transform: rotateX(90deg);
          border-radius: 5px 5px;
        }
        .text {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
            Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          color: #fff;
          letter-spacing: 1px;
          text-shadow: 0 0 5px #fff;
        }
        .header {
          width: 100px;
          height: 12px;
          position: absolute;
          background-color: #000;
          top: 10px;
          left: 50%;
          transform: translate(-50%, -0%);
          border-radius: 0 0 6px 6px;
        }
        .screen::after {
          background: linear-gradient(to bottom, #272727, #0d0d0d);
          border-radius: 0 0 20px 20px;
          bottom: 2px;
          content: "";
          height: 24px;
          left: 2px;
          position: absolute;
          width: 514px;
        }
        .keyboard {
          background: radial-gradient(circle at center, #e2e3e4 85%, #a9abac 100%);
          border: solid #a0a3a7;
          border-radius: 2px 2px 12px 12px;
          border-width: 1px 2px 0 2px;
          box-shadow: inset 0 -2px 8px 0 #6c7074;
          height: 24px;
          margin-top: -10px;
          position: relative;
          width: 620px;
          z-index: 9;
        }
        .keyboard::after {
          background: #e2e3e4;
          border-radius: 0 0 10px 10px;
          box-shadow: inset 0 0 4px 2px #babdbf;
          content: "";
          height: 10px;
          left: 50%;
          margin-left: -60px;
          position: absolute;
          top: 0;
          width: 120px;
        }
        .keyboard::before {
          background: 0 0;
          border-radius: 0 0 3px 3px;
          bottom: -2px;
          box-shadow: -270px 0 #272727, 250px 0 #272727;
          content: "";
          height: 2px;
          left: 50%;
          margin-left: -10px;
          position: absolute;
          width: 40px;
        }
        @media (max-width: 640px) {
          .laptop {
            transform: scale(0.6);
          }
        }
      `}</style>
    </div>
  );
};

export default UnlockScreen; 