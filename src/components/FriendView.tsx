
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Image, BookOpen, Music, Instagram, Heart, Play, ExternalLink } from 'lucide-react';

interface FriendViewProps {
  onBack: () => void;
}

const FriendView = ({ onBack }: FriendViewProps) => {
  const [activeTab, setActiveTab] = useState('gallery');

  const artworks = [
    { id: 1, title: 'Sunset Dreams', medium: 'Digital Art', image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop' },
    { id: 2, title: 'Urban Sketches', medium: 'Pencil Drawing', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop' },
    { id: 3, title: 'Nature Study', medium: 'Watercolor', image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=400&fit=crop' },
    { id: 4, title: 'Abstract Emotions', medium: 'Acrylic', image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=400&fit=crop' },
    { id: 5, title: 'Portrait Series', medium: 'Digital Art', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop' },
    { id: 6, title: 'Landscape Study', medium: 'Oil Paint', image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop' },
  ];

  const poems = [
    {
      title: 'Digital Dawn',
      date: 'March 2024',
      content: `In pixels and code I find my way,
Through screens that glow both night and day.
Each line of text, each painted hue,
Reflects the dreams I'm reaching through.

The keyboard clicks like raindrops fall,
Creating worlds that captivate all.
In art and verse, in song and rhyme,
I capture fragments lost in time.`
    },
    {
      title: 'Coffee Shop Musings',
      date: 'February 2024',
      content: `Steam rises from my morning cup,
As thoughts and inspiration stir up.
The bustling crowd, the gentle hum,
Of life unfolding, never done.

Each face tells stories left untold,
Of dreams both new and growing old.
In this moment, pen in hand,
I write the world I understand.`
    },
    {
      title: 'Midnight Code',
      date: 'January 2024',
      content: `When the world sleeps and screens glow bright,
I dance with code throughout the night.
Functions flow like poetry,
Variables set creativity free.

Debug by moonlight, dream in loops,
Logic leaps in graceful swoops.
In this digital symphony,
I find my truest melody.`
    }
  ];

  const recentTracks = [
    { name: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '3:20' },
    { name: 'Good 4 U', artist: 'Olivia Rodrigo', album: 'SOUR', duration: '2:58' },
    { name: 'Heat Waves', artist: 'Glass Animals', album: 'Dreamland', duration: '3:58' },
    { name: 'Stay', artist: 'The Kid LAROI & Justin Bieber', album: 'F*CK LOVE 3', duration: '2:21' },
    { name: 'Industry Baby', artist: 'Lil Nas X ft. Jack Harlow', album: 'MONTERO', duration: '3:32' },
  ];

  const socialLinks = [
    { platform: 'Instagram', handle: '@shirley.creates', followers: '2.1K', icon: Instagram, color: 'from-pink-500 to-orange-500' },
    { platform: 'Rednote', handle: '@shirley_art', followers: '1.8K', icon: Heart, color: 'from-red-500 to-pink-500' },
  ];

  const tabConfig = [
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'poems', label: 'Poems', icon: BookOpen },
    { id: 'music', label: 'Music', icon: Music },
    { id: 'social', label: 'Social', icon: Instagram },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'gallery':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {artworks.map((artwork, index) => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <h4 className="font-semibold">{artwork.title}</h4>
                      <p className="text-sm opacity-90">{artwork.medium}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        );

      case 'poems':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {poems.map((poem, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg"
              >
                <header className="mb-4">
                  <h3 className="text-2xl font-bold text-purple-800">{poem.title}</h3>
                  <p className="text-purple-600">{poem.date}</p>
                </header>
                <div className="prose prose-purple max-w-none">
                  {poem.content.split('\n\n').map((stanza, stanzaIndex) => (
                    <p key={stanzaIndex} className="mb-4 leading-relaxed text-gray-700">
                      {stanza.split('\n').map((line, lineIndex) => (
                        <span key={lineIndex}>
                          {line}
                          {lineIndex < stanza.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  ))}
                </div>
              </motion.article>
            ))}
          </motion.div>
        );

      case 'music':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-purple-800 mb-4">Recently Played</h3>
              <div className="space-y-3">
                {recentTracks.map((track, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-purple-50 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <button className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white group-hover:bg-purple-600 transition-colors">
                        <Play size={16} />
                      </button>
                      <div>
                        <h4 className="font-semibold text-gray-800">{track.name}</h4>
                        <p className="text-sm text-gray-600">{track.artist} • {track.album}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{track.duration}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 'social':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {socialLinks.map((social, index) => (
              <motion.div
                key={social.platform}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg cursor-pointer group"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${social.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <social.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{social.platform}</h3>
                <p className="text-gray-600 mb-1">{social.handle}</p>
                <p className="text-sm text-gray-500 mb-4">{social.followers} followers</p>
                <button className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors">
                  <span>Visit Profile</span>
                  <ExternalLink size={16} />
                </button>
              </motion.div>
            ))}
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
      className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100"
    >
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Shirley's Creative Space
            </h1>
            <div className="w-16"></div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold text-purple-800 mb-4">Welcome to My World!</h2>
          <p className="text-lg text-purple-600">
            Explore my creative journey through art, poetry, and music ✨
          </p>
        </motion.div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-purple-200 p-4 z-10">
          <div className="max-w-md mx-auto">
            <nav className="flex justify-around">
              {tabConfig.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-gray-500 hover:text-purple-500'
                  }`}
                >
                  <tab.icon size={24} />
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="pb-24">
          {renderTabContent()}
        </div>
      </div>
    </motion.div>
  );
};

export default FriendView;
