
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckSquare, Calendar, Settings, Shield, Eye, EyeOff } from 'lucide-react';

interface ShirleyViewProps {
  onBack: () => void;
  isPeek: boolean;
}

const ShirleyView = ({ onBack, isPeek }: ShirleyViewProps) => {
  const [activeTab, setActiveTab] = useState('todos');
  const [todos, setTodos] = useState([
    { id: 1, text: 'Review project proposals', completed: false, priority: 'high' },
    { id: 2, text: 'Update portfolio website', completed: true, priority: 'medium' },
    { id: 3, text: 'Call mom', completed: false, priority: 'low' },
    { id: 4, text: 'Prepare for team meeting', completed: false, priority: 'high' },
    { id: 5, text: 'Submit expense reports', completed: true, priority: 'medium' },
  ]);

  const encryptText = (text: string) => {
    if (!isPeek) return text;
    return text.split('').map(char => {
      if (char === ' ') return ' ';
      return String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }).join('');
  };

  const calendarEvents = [
    { id: 1, title: 'Team Standup', time: '9:00 AM', date: 'Today', type: 'work' },
    { id: 2, title: 'Lunch with Sarah', time: '12:30 PM', date: 'Today', type: 'personal' },
    { id: 3, title: 'Project Review', time: '3:00 PM', date: 'Today', type: 'work' },
    { id: 4, title: 'Yoga Class', time: '6:00 PM', date: 'Today', type: 'personal' },
    { id: 5, title: 'Coffee with Alex', time: '10:00 AM', date: 'Tomorrow', type: 'personal' },
  ];

  const toggleTodo = (id: number) => {
    if (isPeek) return; // No interaction in peek mode
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const renderTodos = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>
        {isPeek && (
          <div className="flex items-center gap-2 text-orange-600 bg-orange-50 px-3 py-1 rounded-full text-sm">
            <Shield size={16} />
            <span>Encrypted View</span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {todos.map((todo, index) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white rounded-lg p-4 shadow-sm border ${
              todo.completed ? 'opacity-60' : ''
            } ${isPeek ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={() => toggleTodo(todo.id)}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                todo.completed 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : 'border-gray-300'
              }`}>
                {todo.completed && <CheckSquare size={12} />}
              </div>
              <div className="flex-1">
                <p className={`${todo.completed ? 'line-through' : ''} text-gray-800`}>
                  {encryptText(todo.text)}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(todo.priority)}`}>
                {todo.priority}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {isPeek && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 p-6 bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg border border-orange-200"
        >
          <Shield size={48} className="mx-auto text-orange-500 mb-4" />
          <h3 className="text-lg font-semibold text-orange-800 mb-2">
            Welcome to the ShirleyZone™
          </h3>
          <p className="text-orange-600">
            You're viewing encrypted content to protect Shirley's privacy. 
            Only she can see the real data!
          </p>
        </motion.div>
      )}
    </motion.div>
  );

  const renderCalendar = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Calendar</h2>
        {isPeek && (
          <div className="flex items-center gap-2 text-orange-600 bg-orange-50 px-3 py-1 rounded-full text-sm">
            <Shield size={16} />
            <span>Encrypted View</span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {calendarEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg p-4 shadow-sm border"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">
                  {encryptText(event.title)}
                </h3>
                <p className="text-sm text-gray-600">
                  {event.date} at {event.time}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                event.type === 'work' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'bg-purple-50 text-purple-600'
              }`}>
                {event.type}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
    >
      {/* iOS Notes-style Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            <h1 className="text-xl font-semibold text-gray-800">
              {isPeek ? 'ShirleyZone™ (Encrypted)' : 'My Personal Space'}
            </h1>
            <div className="flex items-center gap-2">
              {isPeek ? (
                <EyeOff size={20} className="text-orange-500" />
              ) : (
                <Eye size={20} className="text-blue-500" />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('todos')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'todos'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <CheckSquare size={16} />
                <span>To-Do</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'calendar'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Calendar</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {activeTab === 'todos' && renderTodos()}
        {activeTab === 'calendar' && renderCalendar()}
      </div>
    </motion.div>
  );
};

export default ShirleyView;
