
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Linkedin, Github, Code, Briefcase, GraduationCap, User, Phone } from 'lucide-react';

interface RecruiterViewProps {
  onBack: () => void;
}

const RecruiterView = ({ onBack }: RecruiterViewProps) => {
  const [activeSection, setActiveSection] = useState('about');

  const navigation = [
    { id: 'about', label: 'About', icon: User },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  const skills = [
    { name: 'Python', level: 95, color: 'bg-blue-500' },
    { name: 'React', level: 90, color: 'bg-cyan-500' },
    { name: 'JavaScript', level: 88, color: 'bg-yellow-500' },
    { name: 'TypeScript', level: 85, color: 'bg-blue-600' },
    { name: 'Node.js', level: 82, color: 'bg-green-500' },
    { name: 'SQL', level: 88, color: 'bg-orange-500' },
    { name: 'AWS', level: 80, color: 'bg-orange-600' },
    { name: 'Docker', level: 75, color: 'bg-blue-400' },
  ];

  const experiences = [
    {
      company: 'Tech Innovation Corp',
      position: 'Senior Software Engineer',
      duration: '2022 - Present',
      description: 'Led development of scalable web applications serving 100k+ users',
      achievements: [
        'Improved application performance by 40%',
        'Mentored 3 junior developers',
        'Architected microservices infrastructure'
      ]
    },
    {
      company: 'Digital Solutions Inc',
      position: 'Full Stack Developer',
      duration: '2020 - 2022',
      description: 'Developed and maintained customer-facing applications',
      achievements: [
        'Built responsive React applications',
        'Implemented RESTful APIs',
        'Collaborated with design team on UX improvements'
      ]
    }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'about':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-6">About Me</h2>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Passionate software engineer with 4+ years of experience building innovative web applications. 
                I specialize in full-stack development with a focus on creating scalable, user-centric solutions.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                I thrive in collaborative environments and enjoy solving complex technical challenges while 
                mentoring others and contributing to open-source projects.
              </p>
            </div>
          </motion.div>
        );

      case 'education':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Education</h2>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Master of Computer Science</h3>
              <p className="text-blue-600 font-medium mb-2">University of Technology • 2018-2020</p>
              <p className="text-slate-600 mb-4">Specialized in Software Engineering and Machine Learning</p>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li>GPA: 3.8/4.0</li>
                <li>Thesis: "Optimizing React Performance in Large-Scale Applications"</li>
                <li>Relevant Coursework: Advanced Algorithms, Database Systems, Software Architecture</li>
              </ul>
            </div>
          </motion.div>
        );

      case 'experience':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Work Experience</h2>
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-sm border"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800">{exp.position}</h3>
                    <p className="text-blue-600 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {exp.duration}
                  </span>
                </div>
                <p className="text-slate-600 mb-4">{exp.description}</p>
                <ul className="list-disc list-inside text-slate-600 space-y-1">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        );

      case 'skills':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Technical Skills</h2>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="grid gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-700">{skill.name}</span>
                      <span className="text-sm text-slate-500">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                        className={`h-2 rounded-full ${skill.color}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 'contact':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Get In Touch</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <motion.a
                href="mailto:shirley@example.com"
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                    <Mail className="text-red-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Email</h3>
                    <p className="text-slate-600">shirley@example.com</p>
                  </div>
                </div>
              </motion.a>

              <motion.a
                href="https://linkedin.com/in/shirley-zhang"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Linkedin className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">LinkedIn</h3>
                    <p className="text-slate-600">Connect with me</p>
                  </div>
                </div>
              </motion.a>

              <motion.a
                href="https://github.com/shirley-zhang"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                    <Github className="text-gray-700" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">GitHub</h3>
                    <p className="text-slate-600">View my projects</p>
                  </div>
                </div>
              </motion.a>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
    >
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            <h1 className="text-2xl font-bold text-slate-800">Xinyue (Shirley) Zhang</h1>
            <div className="w-16"></div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-lg shadow-sm border p-4 sticky top-24">
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeSection === item.id
                          ? 'bg-blue-50 text-blue-600 border border-blue-200'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <item.icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderSection()}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecruiterView;
