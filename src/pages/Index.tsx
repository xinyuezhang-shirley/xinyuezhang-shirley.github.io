
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Smartphone, User, Briefcase, Heart, Eye } from 'lucide-react';
import WelcomeScreen from '../components/WelcomeScreen';
import RoleSelection from '../components/RoleSelection';
import RecruiterView from '../components/RecruiterView';
import FriendView from '../components/FriendView';
import ShirleyView from '../components/ShirleyView';

type ViewType = 'welcome' | 'role-selection' | 'recruiter' | 'friend' | 'shirley-peek' | 'shirley-auth';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('welcome');
  const [isUnlocked, setIsUnlocked] = useState(false);

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
      case 'shirley':
        setCurrentView('shirley-auth');
        break;
      case 'shirley-peek':
        setCurrentView('shirley-peek');
        break;
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {currentView === 'welcome' && (
          <WelcomeScreen key="welcome" onUnlock={handleUnlock} isUnlocked={isUnlocked} />
        )}
        {currentView === 'role-selection' && (
          <RoleSelection key="role-selection" onRoleSelect={handleRoleSelect} />
        )}
        {currentView === 'recruiter' && (
          <RecruiterView key="recruiter" onBack={() => setCurrentView('role-selection')} />
        )}
        {currentView === 'friend' && (
          <FriendView key="friend" onBack={() => setCurrentView('role-selection')} />
        )}
        {(currentView === 'shirley-peek' || currentView === 'shirley-auth') && (
          <ShirleyView 
            key="shirley" 
            isPeek={currentView === 'shirley-peek'}
            onBack={() => setCurrentView('role-selection')} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
