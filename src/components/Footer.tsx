import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/xinyuezhang-shirley',
      color: 'hover:text-gray-600'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/xinyue-zhang-2292b225b/',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:xinyuezhang.shirley@gmail.com',
      color: 'hover:text-red-500'
    }
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full py-6 px-8 mt-auto"
      style={{
        background: 'rgba(255,255,255,0.25)',
        backdropFilter: 'blur(8px)',
        borderTop: '1px solid rgba(255,255,255,0.15)',
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left side - Copyright */}
        <div className="flex items-center space-x-2 text-slate-700">
          <span className="text-sm font-medium">
            © {currentYear} Xinyue (Shirley) Zhang
          </span>
          <Heart size={16} className="text-pink-500 animate-pulse" />
        </div>

        {/* Center - Made with love */}
        <div className="text-center text-slate-600 text-sm">
          <span>Made with </span>
          <Heart size={14} className="inline text-pink-500 animate-pulse" />
          <span> and React</span>
        </div>

        {/* Right side - Social links */}
        <div className="flex items-center space-x-4">
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center space-x-1 text-slate-600 transition-colors duration-200 ${link.color}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <link.icon size={18} />
              <span className="text-sm font-medium hidden sm:inline">{link.name}</span>
              <ExternalLink size={12} className="opacity-60" />
            </motion.a>
          ))}
        </div>
      </div>

      {/* Bottom line */}
      <div className="max-w-6xl mx-auto mt-4 pt-4 border-t border-slate-200/30">
        <div className="text-center text-xs text-slate-500">
          <p>
            Professional Portfolio & Creative Space • Built with TypeScript, React, and Framer Motion
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer; 