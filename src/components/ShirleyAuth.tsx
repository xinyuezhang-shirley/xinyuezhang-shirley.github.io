
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Eye, User, Shield } from 'lucide-react';

interface ShirleyAuthProps {
  onAuth: (authType: 'login' | 'peek') => void;
  onBack: () => void;
}

const ShirleyAuth = ({ onAuth, onBack }: ShirleyAuthProps) => {
  const [showLogin, setShowLogin] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, accept any credentials
    if (credentials.email && credentials.password) {
      onAuth('login');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4"
    >
      <div className="max-w-md w-full">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-8"
        >
          <button
            onClick={onBack}
            className="absolute top-8 left-8 flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>

          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-6 mx-auto">
            <User size={40} className="text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4">Welcome, Shirley!</h1>
          <p className="text-xl text-gray-300">How would you like to access your space?</p>
        </motion.div>

        {!showLogin ? (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-4"
          >
            <button
              onClick={() => setShowLogin(true)}
              className="w-full group relative p-6 rounded-2xl bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
                  <Lock size={24} className="text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-white mb-1">Login as Shirley</h3>
                  <p className="text-gray-300 text-sm">Access your personal dashboard</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => onAuth('peek')}
              className="w-full group relative p-6 rounded-2xl bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                  <Eye size={24} className="text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-white mb-1">Sneak Peek</h3>
                  <p className="text-gray-300 text-sm">Not Shirley but want a preview?</p>
                </div>
              </div>
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl border border-white border-opacity-20 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield size={24} className="text-white" />
              <h2 className="text-2xl font-bold text-white">Secure Login</h2>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
              >
                Login
              </button>
            </form>

            <button
              onClick={() => setShowLogin(false)}
              className="w-full mt-4 text-gray-300 hover:text-white transition-colors text-sm"
            >
              Back to options
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ShirleyAuth;
