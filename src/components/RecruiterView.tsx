import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Linkedin, Github, Code, Briefcase, GraduationCap, User, Phone, MapPin, Calendar, Globe, Plus, MessageCircle, MoreHorizontal, Star, Users, Award, BookOpen, FileText, FolderOpen, Loader2 } from 'lucide-react';
import { linkedinAPI, LinkedInProfile, LinkedInExperience, LinkedInEducation, LinkedInSkill, LinkedInProject } from '../services/linkedin';
import { resumeParser } from '../services/resume-parser';
import Footer from './Footer';
import BubbleBackground from './BubbleBackground';

interface RecruiterViewProps {
  onBack: () => void;
}

const RecruiterView = ({ onBack }: RecruiterViewProps) => {
  const [activeTab, setActiveTab] = useState('about');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // LinkedIn data state
  const [profile, setProfile] = useState<LinkedInProfile | null>(null);
  const [experiences, setExperiences] = useState<LinkedInExperience[]>([]);
  const [education, setEducation] = useState<LinkedInEducation[]>([]);
  const [skills, setSkills] = useState<LinkedInSkill[]>([]);
  const [projects, setProjects] = useState<LinkedInProject[]>([]);

  // Fetch LinkedIn data and resume data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch LinkedIn profile data (basic info)
        const linkedInProfile = await linkedinAPI.getProfile();
        console.log('LinkedIn profile data:', linkedInProfile);

        // Fetch resume data (detailed info)
        console.log('About to fetch resume data...');
        const resumeData = await resumeParser.parseResume();
        console.log('Resume data:', resumeData);
        console.log('Resume experiences:', resumeData.experiences);
        console.log('Resume education:', resumeData.education);
        console.log('Resume skills:', resumeData.skills);
        console.log('Resume projects:', resumeData.projects);

        // Combine LinkedIn profile with resume summary
        const combinedProfile: LinkedInProfile = {
          ...linkedInProfile,
          summary: resumeData.summary || linkedInProfile.summary
        };

        console.log('Setting profile:', combinedProfile);
        console.log('Setting experiences:', resumeData.experiences);
        console.log('Setting education:', resumeData.education);
        console.log('Setting skills:', resumeData.skills);
        console.log('Setting projects:', resumeData.projects);
        
        setProfile(combinedProfile);
        setExperiences(resumeData.experiences);
        setEducation(resumeData.education);
        setSkills(resumeData.skills);
        setProjects(resumeData.projects);
        
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Failed to load profile data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper functions for formatting dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const formatDuration = (startDate: string, endDate?: string) => {
    const start = formatDate(startDate);
    const end = endDate ? formatDate(endDate) : 'Present';
    return `${start} - ${end}`;
  };

  // Loading component
  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading LinkedIn profile...</p>
        </div>
      </div>
    );
  }

  // Error component
  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <div className="space-y-3">
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mr-3"
            >
              Try Again
            </button>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Don't render if no profile data - but show a message instead of returning null
  console.log('Profile state:', profile);
  console.log('Experiences state:', experiences);
  console.log('Education state:', education);
  console.log('Skills state:', skills);
  console.log('Projects state:', projects);
  if (!profile) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No profile data available</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'resume', label: 'Skills', icon: FileText }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed">{profile.summary}</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Education</h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.fieldOfStudy}</h3>
                    <p className="text-blue-600 font-medium">{edu.schoolName}</p>
                    <p className="text-gray-600 text-sm">{formatDuration(edu.startDate, edu.endDate)}</p>
                    {edu.grade && <p className="text-gray-600 text-sm">GPA: {edu.grade}</p>}
                    {edu.activities && <p className="text-gray-700 text-sm">{edu.activities}</p>}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Experience</h2>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-l-2 border-gray-200 pl-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                      <p className="text-blue-600 font-medium">{exp.companyName}</p>
                    </div>
                    <span className="text-sm text-gray-500">{formatDuration(exp.startDate, exp.endDate)}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{exp.location}</p>
                  <p className="text-gray-700 mb-3">{exp.description}</p>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
                  {project.url && (
                    <div className="flex gap-2">
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                        <Globe size={20} />
                      </a>
                    </div>
                  )}
                </div>
                <p className="text-gray-700 mb-4">{project.description}</p>
                <p className="text-gray-600 text-sm">{formatDuration(project.startDate, project.endDate)}</p>
              </motion.div>
            ))}
          </div>
        );

      case 'resume':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Professional Summary</h2>
              <p className="text-gray-700 leading-relaxed">{profile.summary}</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Skills</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="font-medium text-gray-900">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
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
      className="min-h-screen w-full flex flex-col"
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: 'radial-gradient(125% 125% at -2% 101%, rgba(245, 87, 2, 1) 10.5%, rgba(245, 120, 2, 1) 16%, rgba(245, 140, 2, 1) 17.5%, rgba(245, 170, 100, 1) 25%, rgba(238, 174, 202, 1) 40%, rgba(202, 179, 214, 1) 65%, rgba(148, 201, 233, 1) 100%)',
        backgroundAttachment: 'fixed',
      }}
    >
      <BubbleBackground />
      <div className="flex-1 flex flex-col items-center justify-center w-full h-full">
        {/* Glassmorphic Card Container */}
        <div
          className="relative overflow-hidden shadow-xl w-full h-full flex-1 flex flex-col rounded-2xl"
          style={{
            borderRadius: '20px',
            filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.25))',
          }}
        >
          {/* Purple gradient background with overlay */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              pointerEvents: 'none',
            }}
          />
          
          {/* MacOS-style header bar */}
          <div className="relative z-10 flex items-center h-10 px-2 sm:px-4 md:px-6" style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
            <div className="flex items-center space-x-2 mt-3">
              <span className="w-3 h-3 rounded-full bg-red-500 border border-red-300 shadow" />
              <span className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-200 shadow" />
              <span className="w-3 h-3 rounded-full bg-green-500 border border-green-300 shadow" />
            </div>
          </div>

          {/* LinkedIn Header */}
          <header className="relative z-10 bg-white bg-opacity-90 backdrop-blur-lg shadow-sm border-b border-white border-opacity-20">
            <div className="px-4 py-3">
              <div className="flex items-center justify-between">
                <button
                  onClick={onBack}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ArrowLeft size={20} />
                  <span>Back</span>
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center">
                    <span className="text-white font-bold text-sm">in</span>
                  </div>
                  <span className="text-gray-600 font-medium">LinkedIn</span>
                </div>
                <div className="w-16"></div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <div 
            className="relative z-10 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
            style={{
              backdropFilter: 'blur(12px)',
              background: 'rgba(255,255,255,0.08)',
              borderBottomLeftRadius: '20px',
              borderBottomRightRadius: '20px',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <div className="p-2 sm:p-6">
              {/* Profile Header */}
              <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-lg shadow-sm border border-white border-opacity-20 mb-6 overflow-hidden">
                {/* Cover Photo */}
                <div className="h-32 sm:h-48 bg-gradient-to-r from-blue-600 to-purple-600 relative">
                  <div className="absolute bottom-0 left-0 right-0 h-10 sm:h-20 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                {/* Profile Info */}
                <div className="relative px-4 sm:px-6 pb-6">
                  {/* Profile Picture */}
                  <div className="absolute -top-12 sm:-top-16 left-4 sm:left-6 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <span className="text-white text-2xl sm:text-3xl font-bold">SZ</span>
                  </div>
                  {/* Profile Details */}
                  <div className="ml-24 sm:ml-40 pt-4">
                    <h1 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">{profile.firstName} {profile.lastName}</h1>
                    <p className="text-base sm:text-lg text-gray-700 mb-2">{profile.headline}</p>
                    <p className="text-gray-600 mb-4 flex items-center gap-1">
                      <MapPin size={16} />
                      {profile.location}
                    </p>
                    {/* Action Buttons - stack vertically on mobile, full width */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full max-w-xs sm:max-w-none">
                      <a 
                        href="https://www.linkedin.com/in/xinyue-zhang-2292b225b/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors text-center w-full sm:w-auto"
                      >
                        Message
                      </a>
                      <a 
                        href={resumeParser.getResumeUrl()} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="border border-gray-300 text-gray-700 px-4 py-2 rounded-full font-medium hover:bg-gray-50 transition-colors text-center w-full sm:w-auto"
                      >
                        Download Resume
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-lg shadow-sm border border-white border-opacity-20 mb-6">
                <div className="flex flex-nowrap overflow-x-auto border-b border-gray-200 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 font-medium transition-colors text-sm sm:text-base whitespace-nowrap ${
                          activeTab === tab.id
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-600 hover:text-gray-800'
                          }`}
                      >
                        <Icon size={18} />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 min-h-0">
                {/* Main Content */}
                <div className="lg:col-span-2 min-h-0">
                  {renderTabContent()}
                </div>

                {/* Sidebar - stack below main content on mobile */}
                <div className="space-y-4 sm:space-y-6 min-h-0 lg:col-span-1 w-full">
                  {/* Skills Section */}
                  <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-lg shadow-sm border border-white border-opacity-20 p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Top Skills</h2>
                    <div className="space-y-2 sm:space-y-3">
                      {skills.slice(0, 6).map((skill, index) => (
                        <motion.div
                          key={skill.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex justify-between items-center"
                        >
                          <span className="text-gray-700 font-medium">{skill.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-lg shadow-sm border border-white border-opacity-20 p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Contact info</h2>
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail size={16} className="text-gray-500" />
                        <span className="text-blue-600 text-sm">xinyuezhang.shirley@gmail.com</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Globe size={16} className="text-gray-500" />
                        <span className="text-blue-600 text-sm">linkedin.com/in/xinyue-zhang-2292b225b</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Github size={16} className="text-gray-500" />
                        <span className="text-blue-600 text-sm">github.com/xinyuezhang-shirley</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> Removed to prevent duplicate footers */}
    </motion.div>
  );
};

export default RecruiterView;
