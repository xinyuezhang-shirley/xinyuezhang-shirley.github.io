
import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Lock, Fingerprint } from 'lucide-react';

interface WelcomeScreenProps {
  onUnlock: () => void;
  isUnlocked: boolean;
}

const WelcomeScreen = ({ onUnlock, isUnlocked }: WelcomeScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden"
    >
      {/* Background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="text-center z-10">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-light text-white mb-4 leading-tight">
            Welcome to
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold text-white bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
            Xinyue (Shirley) Zhang's
          </h2>
          <h3 className="text-2xl md:text-4xl font-light text-white mt-2">
            Personal Website
          </h3>
        </motion.div>

        {/* iPhone Interface */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative mx-auto"
        >
          <div className="w-80 h-[600px] mx-auto relative">
            {/* iPhone Frame */}
            <div className="absolute inset-0 bg-black rounded-[50px] p-2">
              <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-[42px] relative overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
                
                {/* Screen Content */}
                <div className="p-8 pt-12 h-full flex flex-col items-center justify-center text-white">
                  <motion.div
                    animate={isUnlocked ? { scale: 0.8, opacity: 0.3 } : { scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                  >
                    <div className="text-lg font-light mb-2">12:34</div>
                    <div className="text-sm opacity-70 mb-8">Sunday, March 15</div>
                    
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="mb-8"
                    >
                      <Lock size={60} className="mx-auto mb-4 opacity-80" />
                    </motion.div>
                    
                    <p className="text-sm opacity-80 mb-8">
                      Swipe up or tap to unlock
                    </p>
                  </motion.div>

                  {/* Unlock Button */}
                  <motion.button
                    onClick={onUnlock}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
                  >
                    <motion.div
                      animate={isUnlocked ? { scale: 1.5, opacity: 0 } : {}}
                      transition={{ duration: 0.5 }}
                      className="w-16 h-16 rounded-full border-2 border-white border-opacity-30 flex items-center justify-center backdrop-blur-sm bg-white bg-opacity-10"
                    >
                      <Fingerprint size={28} className="text-white" />
                    </motion.div>
                  </motion.button>

                  {/* Face ID Animation */}
                  {isUnlocked && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: 1 }}
                        className="w-20 h-20 border-4 border-green-400 border-t-transparent rounded-full"
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="absolute text-green-400 font-semibold"
                      >
                        Face ID
                      </motion.div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-white text-opacity-70 mt-8 text-lg"
        >
          An interactive journey through my world
        </motion.p>
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;
