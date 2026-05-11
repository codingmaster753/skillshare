'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Star, Settings, Layers } from 'lucide-react';
import MySkillsTab from './MySkillsTab';
import HireHistoryTab from './HireHistoryTab';
import ReviewsTab from './ReviewsTab';
import SettingsTab from './SettingsTab';
import Icon from '@/components/ui/AppIcon';


const TABS = [
  { id: 'skills', label: 'My Skills', icon: Layers },
  { id: 'history', label: 'Hire History', icon: Briefcase },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState('skills');

  return (
    <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16 pb-12">
      {/* Tab nav */}
      <div className="flex items-center gap-1 glass rounded-2xl p-1.5 mb-6 overflow-x-auto scrollbar-thin w-fit">
        {TABS?.map(tab => {
          const Icon = tab?.icon;
          const isActive = activeTab === tab?.id;
          return (
            <button
              key={`tab-${tab?.id}`}
              onClick={() => setActiveTab(tab?.id)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-600 transition-all whitespace-nowrap ${
                isActive ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="tab-bg"
                  className="absolute inset-0 rounded-xl bg-primary neon-glow-cyan"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon size={15} />
                {tab?.label}
              </span>
            </button>
          );
        })}
      </div>
      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === 'skills' && <MySkillsTab />}
          {activeTab === 'history' && <HireHistoryTab />}
          {activeTab === 'reviews' && <ReviewsTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}