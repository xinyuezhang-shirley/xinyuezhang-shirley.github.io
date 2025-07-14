import React, { useState, useEffect } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { Briefcase, Heart, ArrowLeft, ArrowRight } from 'lucide-react';
import BubbleBackground from './BubbleBackground';

interface RoleSelectionProps {
  onRoleSelect: (role: string) => void;
  onGoHome?: () => void;
}

// 3D Tilt Card Component
interface TiltCardProps {
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  gradient: string;
  onClick: () => void;
}

const TiltCard: React.FC<TiltCardProps> = ({ title, subtitle, icon: Icon, gradient, onClick }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / centerY * -20;
    const rotateY = (x - centerX) / centerX * 10;
    
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div 
      className="relative w-48 h-64 transition-all duration-200 cursor-pointer noselect"
      style={{ 
        width: '220px', 
        height: '290px',
        transform: 'scale(0.9)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
    >
      {/* Canvas grid for tilt tracking */}
      <div className="absolute inset-0 z-50 grid grid-cols-5 grid-rows-5 pointer-events-none">
        {Array.from({ length: 25 }, (_, i) => (
          <div key={i} className="w-full h-full" />
        ))}
      </div>

      {/* Main Card */}
      <motion.div
        className="absolute inset-0 z-10 flex flex-col justify-center items-center rounded-2xl transition-all duration-700"
        style={{
          background: gradient,
          borderRadius: '20px',
        }}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: isHovered ? 1.05 : 1,
          filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
        }}
        transition={{ duration: 0.125, ease: "easeInOut" }}
      >
        {/* Blur effect background */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-30"
          style={{
            background: gradient,
            filter: 'blur(2rem)',
            zIndex: -1,
          }}
        />

        {/* Icon */}
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-white/20 backdrop-blur-sm border border-white/30">
          <Icon size={32} className="text-white" />
        </div>

        {/* Title */}
        <motion.h3 
          className="text-xl font-bold text-white mb-2 text-center"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {title}
        </motion.h3>

        {/* Subtitle */}
        <motion.p 
          className="text-sm text-white/80 text-center px-4"
          animate={{ 
            y: isHovered ? 0 : 20,
            opacity: isHovered ? 1 : 0.8 
          }}
          transition={{ duration: 0.3 }}
        >
          {subtitle}
        </motion.p>

        {/* Prompt */}
        <motion.div 
          className="absolute bottom-2 left-3 text-white font-bold text-lg max-w-28"
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.div>
      </motion.div>
    </div>
  );
};

// Custom LinkedIn Icon Component
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// Custom Instagram Icon Component
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

// Custom Notes Icon Component
const NotesIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
  </svg>
);

const getCardHeights = () => {
  if (typeof window !== 'undefined' && window.innerWidth < 640) {
    // Mobile
    return { height: '80vh', minHeight: 420, maxHeight: '98vh' };
  } else {
    // Desktop
    return { height: '60vh', minHeight: 120, maxHeight: '80vh' };
  }
};

const RoleSelection = ({ onRoleSelect, onGoHome }: RoleSelectionProps) => {
  const [scale, setScale] = useState(1.2);
  const [cardHeights, setCardHeights] = useState(getCardHeights());
  const [direction, setDirection] = useState(0);

  const roles = [
    {
      id: 'recruiter',
      name: 'Recruiter',
      icon: Briefcase,
      description: 'Professional Portfolio',
      subtitle: 'View my professional experience, skills, and resume',
      bgImage: 'linear-gradient(43deg, rgb(65, 88, 208) 0%, rgb(200, 80, 192) 46%, rgb(255, 204, 112) 100%)'
    },
    {
      id: 'friend',
      name: 'Friend',
      icon: Heart,
      description: 'Personal Creative Space',
      subtitle: 'Explore my art, poetry, and creative projects',
      bgImage: 'linear-gradient(43deg, rgb(255, 204, 112) 0%, rgb(200, 80, 192) 46%, rgb(65, 88, 208) 100%)'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Cap maxScale to prevent cropping
      const isMobile = window.innerWidth < 640;
      const maxScroll = 400;
      const minScale = 1.2;
      const maxScale = isMobile ? 1.15 : 1.8; // Reduced max scale
      const newScale = Math.min(maxScale, minScale + (scrollY / maxScroll) * (maxScale - minScale));
      
      setScale(newScale);
    };
    
    const handleResize = () => setCardHeights(getCardHeights());
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <style>
        {`
          .noselect {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
        `}
      </style>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen relative overflow-hidden flex items-center justify-center"
        style={{
          background: 'radial-gradient(125% 125% at -2% 101%, rgba(245, 87, 2, 1) 10.5%, rgba(245, 120, 2, 1) 16%, rgba(245, 140, 2, 1) 17.5%, rgba(245, 170, 100, 1) 25%, rgba(238, 174, 202, 1) 40%, rgba(202, 179, 214, 1) 65%, rgba(148, 201, 233, 1) 100%)',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
          minWidth: '100vw',
        }}
      >
        <BubbleBackground />
        {/* Browser-style card with side-by-side options */}
        <div
          className="relative overflow-hidden shadow-xl mx-2 my-2 w-full max-w-full sm:mx-4 sm:my-4 sm:max-w-2xl rounded-2xl p-2 sm:p-0"
          style={{
            height: 'auto',
            minHeight: '420px', // larger min height for mobile
            paddingTop: '1.5rem',
            paddingBottom: '1.5rem',
            borderRadius: '20px',
            transition: 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
            willChange: 'transform, opacity',
            filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.25))',
            transform: `scale(${scale})`,
          }}
        >
          {/* Purple gradient background with overlay */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(147, 51, 234, 0.4), rgba(17, 24, 39, 0.8))',
              borderRadius: '20px',
              backgroundBlendMode: 'overlay',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              pointerEvents: 'none',
            }}
          />
          {/* MacOS-style header bar */}
          <div className="relative z-20 flex items-center h-10 px-2 sm:px-4 md:px-6" style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
            <div className="flex items-center space-x-2 mt-3">
              <span className="w-3 h-3 rounded-full bg-red-500 border border-red-300 shadow" />
              <span className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-200 shadow" />
              <span className="w-3 h-3 rounded-full bg-green-500 border border-green-300 shadow" />
            </div>
          </div>
          {/* Side-by-side Role Cards */}
          <div
            className="relative flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 px-2 sm:px-8 py-2 w-full h-full"
            style={{
              minHeight: '340px',
              minWidth: '320px',
              zIndex: 10,
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center w-full gap-4 sm:gap-12"
            >
              {/* Friend Card (Top/Left) */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex flex-col items-center mb-4 sm:mb-0"
              >
                <TiltCard
                  title={roles[1].name}
                  subtitle={roles[1].description}
                  icon={roles[1].icon}
                  gradient={roles[1].bgImage}
                  onClick={() => onRoleSelect('friend')}
                />
              </motion.div>
              {/* Center Divider (hide on mobile) */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="hidden sm:flex flex-col items-center"
              >
                <div className="w-px h-24 md:h-28 bg-white/30 mb-6"></div>
                <div className="text-sm text-white/60 text-center max-w-24">
                  <p className="font-medium mb-2">Choose Your Experience</p>
                  <p className="text-xs">Click to select</p>
                </div>
                <div className="w-px h-24 md:h-28 bg-white/30 mt-6"></div>
              </motion.div>
              {/* Recruiter Card (Bottom/Right) */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex flex-col items-center"
              >
                <TiltCard
                  title={roles[0].name}
                  subtitle={roles[0].description}
                  icon={roles[0].icon}
                  gradient={roles[0].bgImage}
                  onClick={() => onRoleSelect('recruiter')}
                />
              </motion.div>
            </motion.div>
          </div>
          
          {/* Swipe Direction Overlay */}
          {direction !== 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div
                className={`text-4xl font-bold px-8 py-4 rounded-lg border-4 ${
                  direction === 1 
                    ? 'text-blue-500 border-blue-500 bg-blue-500/20' 
                    : 'text-pink-500 border-pink-500 bg-pink-500/20'
                }`}
                style={{ backdropFilter: 'blur(10px)' }}
              >
                {direction === 1 ? 'RECRUITER' : 'FRIEND'}
              </div>
            </motion.div>
          )}
        </div>
          
          {/* Back Button at bottom */}
          {onGoHome && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="absolute bottom-6 z-30 w-full flex justify-center"
            >
              <motion.button
                onClick={() => {
                  console.log('Back button clicked!');
                  onGoHome();
                }}
                className="px-6 py-2.5 bg-white/20 hover:bg-white/30 text-white text-sm font-medium rounded-lg border border-white/30 backdrop-blur-sm transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back
              </motion.button>
            </motion.div>
          )}
        </motion.div>
    </>
  );
};

export default RoleSelection;
