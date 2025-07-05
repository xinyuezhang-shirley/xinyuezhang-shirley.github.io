
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Heart, User, Eye } from 'lucide-react';

interface RoleSelectionProps {
  onRoleSelect: (role: string) => void;
}

const RoleSelection = ({ onRoleSelect }: RoleSelectionProps) => {
  const roles = [
    {
      id: 'recruiter',
      title: "I'm a Recruiter",
      subtitle: 'Professional Portfolio',
      icon: Briefcase,
      gradient: 'from-blue-500 to-blue-600',
      description: 'View professional experience, skills, and projects'
    },
    {
      id: 'friend',
      title: "I'm a Friend/Coworker",
      subtitle: 'Personal Creative Space',
      icon: Heart,
      gradient: 'from-pink-500 to-purple-600',
      description: 'Explore artwork, poems, and social connections'
    },
    {
      id: 'shirley',
      title: "I'm Shirley",
      subtitle: 'Personal Dashboard',
      icon: User,
      gradient: 'from-green-500 to-teal-600',
      description: 'Access personal workspace and tools'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4"
    >
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">Choose Your Experience</h1>
          <p className="text-xl text-gray-300">How would you like to explore my world?</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {roles.map((role, index) => (
            <motion.button
              key={role.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onRoleSelect(role.id)}
              className="group relative p-8 rounded-2xl bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${role.gradient} flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                <role.icon size={32} className="text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">{role.title}</h3>
              <h4 className="text-lg text-gray-300 mb-4">{role.subtitle}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{role.description}</p>

              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
                }}
              />
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center"
        >
          <button
            onClick={() => onRoleSelect('shirley-peek')}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 text-sm group"
          >
            <Eye size={16} />
            <span className="group-hover:underline">Not Shirley but want a sneak peek?</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RoleSelection;
