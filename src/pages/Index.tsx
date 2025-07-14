import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Smartphone, User, Briefcase, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import UnlockScreen from '../components/UnlockScreen';
import RoleSelection from '../components/RoleSelection';
import RecruiterView from '../components/RecruiterView';
import FriendView from '../components/FriendView';
import Footer from '../components/Footer';
import BubbleBackground from '../components/BubbleBackground';
import { useIsMobile } from '../hooks/use-mobile';

type ViewType = 'welcome' | 'role-selection' | 'recruiter' | 'friend';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('welcome');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [scale, setScale] = useState(1.2);
  const [headerOpacity, setHeaderOpacity] = useState(1);
  const [responsiveFontSize, setResponsiveFontSize] = useState(() => {
    if (typeof window !== 'undefined') {
      // Estimate the max font size that fits the sentence in one line
      const text = 'Hi, I am Xinyue (Shirley) Zhang.';
      const avgCharWidth = 0.6; // em, rough estimate
      const padding = 32; // px, for side padding
      const maxWidth = window.innerWidth - padding;
      const fontSize = Math.floor(maxWidth / (text.length * avgCharWidth));
      return Math.max(16, Math.min(fontSize, 80));
    }
    return 32;
  });

  useEffect(() => {
    if (currentView !== 'welcome') return;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      console.log('Scroll Y:', scrollY); // Debug log
      
      // Cap maxScale for mobile
      const isMobile = window.innerWidth < 640;
      const maxScroll = 400;
      const minScale = 1.2;
      const maxScale = isMobile ? 1.15 : 2.2;
      const newScale = Math.min(maxScale, minScale + (scrollY / maxScroll) * (maxScale - minScale));
      
      console.log('New scale:', newScale); // Debug log
      setScale(newScale);
      setHeaderOpacity(Math.max(0, 1 - (scrollY / (maxScroll * 0.7))));
    };
    
    const handleResize = () => {
      const text = 'Hi, I am Xinyue (Shirley) Zhang.';
      const avgCharWidth = 0.6;
      const padding = 32;
      const maxWidth = window.innerWidth - padding;
      const fontSize = Math.floor(maxWidth / (text.length * avgCharWidth));
      setResponsiveFontSize(Math.max(16, Math.min(fontSize, 80)));
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [currentView]);

  const handleUnlock = () => {
    setIsUnlocked(true);
    setTimeout(() => setCurrentView('role-selection'), 800);
  };

  const handleRoleSelect = (role: string) => {
    switch (role) {
      case 'recruiter':
        setCurrentView('recruiter');
        break;
      case 'friend':
        setCurrentView('friend');
        break;
      default:
        console.log('Unknown role:', role);
    }
  };

  // Calculate font size for intro text based on headerOpacity (1 = big, 0 = normal)
  const minFontSize = 36; // px (text-3xl)
  const maxFontSize = 64; // px (text-7xl)
  const fontSize = minFontSize + (maxFontSize - minFontSize) * headerOpacity;

  return (
    <div className="min-h-screen w-full flex flex-col" style={{
      minHeight: '100vh',
      background: 'radial-gradient(125% 125% at -2% 101%, rgba(245, 87, 2, 1) 10.5%, rgba(245, 120, 2, 1) 16%, rgba(245, 140, 2, 1) 17.5%, rgba(245, 170, 100, 1) 25%, rgba(238, 174, 202, 1) 40%, rgba(202, 179, 214, 1) 65%, rgba(148, 201, 233, 1) 100%)',
      backgroundAttachment: 'fixed',
    }}>
      <BubbleBackground />
      
      {/* Typewriter Animation Styles */}
      <style>{`
        .cursor {
          position: relative;
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
        }
        
        @keyframes typewriter {
          from { 
            width: 0; 
            opacity: 1;
          }
          to { 
            width: 100%; 
            opacity: 1;
          }
        }
        
        @keyframes blinkingCursor {
          from { border-right-color: rgba(255,255,255,.75); }
          to { border-right-color: transparent; }
        }
        
        .typewriter-animation {
          animation: 
            typewriter 2s steps(40) 0.5s 1 normal both, 
            blinkingCursor 500ms steps(50) infinite normal;
          width: 0;
        }
      `}</style>
      
      {/* Site-wide header */}
      <header className="w-full py-4 px-8 flex items-center justify-between" style={{background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)', borderBottom: '1px solid rgba(255,255,255,0.15)', zIndex: 50}}>
        <span className="text-lg font-bold tracking-tight text-slate-800" style={{letterSpacing: '0.01em'}}>Shirley's Personal Website</span>
        <nav className="flex items-center space-x-6 text-slate-700 text-base font-medium">
          <button
            className="hover:text-indigo-500 transition bg-transparent border-none outline-none cursor-pointer"
            style={{ background: 'none', padding: 0 }}
            onClick={() => setCurrentView('welcome')}
          >
            Home
          </button>
          <button
            className="hover:text-indigo-500 transition bg-transparent border-none outline-none cursor-pointer"
            style={{ background: 'none', padding: 0 }}
            onClick={() => setCurrentView('recruiter')}
          >
            Resume
          </button>

        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center relative w-full">
      <AnimatePresence mode="wait">
        {currentView === 'welcome' && (
            <div className="relative min-h-screen h-screen w-full flex flex-col items-center">
              {/* Intro text above the card, always visible and centered */}
              <div className="w-full flex flex-col justify-center items-center gap-0">
                  {Array.from({ length: Math.ceil(window.innerHeight / responsiveFontSize) }).map((_, i) => (
                    <motion.h1
                      key={i}
                      initial={{ opacity: 1, y: 0, fontSize: responsiveFontSize }}
                      animate={{
                        opacity: headerOpacity,
                        y: 0,
                        fontSize: responsiveFontSize,
                      }}
                      transition={{ fontSize: { type: 'spring', stiffness: 80, damping: 20 } }}
                      className="font-bold text-center cursor typewriter-animation w-full"
                      style={{
                        fontSize: responsiveFontSize,
                        background: 'linear-gradient(90deg, #a78bfa 0%, #f472b6 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 4px 24px rgba(168,139,250,0.25), 0 1px 0 #fff',
                        letterSpacing: '0.02em',
                        fontFamily: '"Orbitron", "Audiowide", "Russo One", "Chakra Petch", monospace',
                        fontWeight: 700,
                        lineHeight: 1,
                        overflow: 'hidden',
                        borderRight: '2px solid rgba(255,255,255,.75)',
                        maxWidth: '95vw',
                        paddingLeft: '0.5rem',
                        paddingRight: '0.5rem',
                        whiteSpace: 'nowrap',
                        wordBreak: 'normal',
                      }}
                    >
                      Hi, I am Xinyue (Shirley) Zhang.
                    </motion.h1>
                  ))}
              </div>
              {/* UnlockScreen with scroll-to-scale on all devices, only the card scales */}
              <UnlockScreen
                key="welcome"
                onUnlock={handleUnlock}
                isUnlocked={isUnlocked}
                scale={scale}
              />
              {/* Spacer to create space below the card */}
              <div className="h-32 md:h-48"></div>
            </div>
        )}
        {currentView === 'role-selection' && (
          <RoleSelection key="role-selection" onRoleSelect={handleRoleSelect} onGoHome={() => {
            console.log('Home button clicked!');
            setCurrentView('welcome');
          }} />
        )}
        {currentView === 'recruiter' && (
          <RecruiterView key="recruiter" onBack={() => setCurrentView('role-selection')} />
        )}
        {currentView === 'friend' && (
          <FriendView key="friend" onBack={() => setCurrentView('role-selection')} />
        )}
      </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
