'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit3, Trash2, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import Link from 'next/link';

const mySkills = [
  {
    id: 'ms-001',
    title: 'Full Stack Development',
    category: 'Technology',
    rate: 1200,
    availability: 'online',
    verified: true,
    views: 342,
    hires: 87,
    rating: 4.9,
    active: true,
    tags: ['React', 'Node.js', 'AWS'],
  },
  {
    id: 'ms-002',
    title: 'React Native Mobile Dev',
    category: 'Technology',
    rate: 1400,
    availability: 'busy',
    verified: true,
    views: 198,
    hires: 34,
    rating: 4.8,
    active: true,
    tags: ['React Native', 'Expo', 'Firebase'],
  },
  {
    id: 'ms-003',
    title: 'Technical Interview Coaching',
    category: 'Education',
    rate: 800,
    availability: 'offline',
    verified: false,
    views: 89,
    hires: 22,
    rating: 4.7,
    active: false,
    tags: ['DSA', 'System Design', 'Mock Interviews'],
  },
];

export default function MySkillsTab() {
  const [skills, setSkills] = useState(mySkills);

  const toggleActive = (id: string) => {
    setSkills(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));
    toast.success('Skill visibility updated');
  };

  const deleteSkill = (id: string) => {
    setSkills(prev => prev.filter(s => s.id !== id));
    toast.success('Skill removed from your profile');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-700 text-foreground text-lg">My Skills</h3>
          <p className="text-sm text-muted-foreground">{skills.filter(s => s.active).length} active listings</p>
        </div>
        <Link href="/share-your-skill">
          <motion.button
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            className="btn-primary flex items-center gap-2 text-sm px-4 py-2.5"
          >
            <Plus size={16} />
            Add Skill
          </motion.button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: i * 0.08 }}
            className={`glass rounded-2xl p-5 border transition-all ${skill.active ? 'border-primary/20' : 'border-border opacity-60'}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-700 text-foreground text-sm truncate">{skill.title}</h4>
                  {skill.verified && <CheckCircle size={13} className="text-primary flex-shrink-0" />}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{skill.category}</p>
              </div>
              <div className="text-right flex-shrink-0 ml-2">
                <div className="font-800 text-sm gradient-text">₹{skill.rate}/hr</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {skill.tags.map(tag => (
                <span key={`ms-tag-${skill.id}-${tag}`} className="px-2 py-0.5 rounded-full text-xs bg-muted/50 text-muted-foreground border border-border">
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4 text-center">
              {[
                { label: 'Views', value: skill.views },
                { label: 'Hires', value: skill.hires },
                { label: 'Rating', value: skill.rating },
              ].map(stat => (
                <div key={`ms-stat-${skill.id}-${stat.label}`} className="glass rounded-xl p-2">
                  <div className="font-700 text-sm text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => toggleActive(skill.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-600 transition-all border ${
                  skill.active
                    ? 'border-primary/30 text-primary bg-primary/5 hover:bg-primary/10' :'border-border text-muted-foreground hover:border-primary/30 hover:text-primary'
                }`}
              >
                {skill.active ? <Eye size={13} /> : <EyeOff size={13} />}
                {skill.active ? 'Active' : 'Inactive'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-xl glass border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                title="Edit skill"
              >
                <Edit3 size={13} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                onClick={() => deleteSkill(skill.id)}
                className="w-8 h-8 rounded-xl glass border border-border flex items-center justify-center text-muted-foreground hover:text-red-400 transition-colors"
                title="Delete skill"
              >
                <Trash2 size={13} />
              </motion.button>
            </div>
          </motion.div>
        ))}

        {/* Add new card */}
        <Link href="/share-your-skill">
          <motion.div
            whileHover={{ scale: 1.02, borderColor: 'var(--primary)' }}
            className="glass rounded-2xl p-5 border-2 border-dashed border-border flex flex-col items-center justify-center gap-3 min-h-[200px] cursor-pointer transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:neon-glow-cyan transition-all">
              <Plus size={24} className="text-primary" />
            </div>
            <div className="text-center">
              <p className="font-700 text-foreground text-sm">Add New Skill</p>
              <p className="text-xs text-muted-foreground mt-0.5">List another skill and reach more clients</p>
            </div>
          </motion.div>
        </Link>
      </div>
    </div>
  );
}