'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Edit3, Share2, MapPin, Star, Clock, Briefcase, Camera } from 'lucide-react';
import { toast } from 'react-toastify';

const MOCK_PROFILE = {
  name: 'Arjun Mehta',
  avatar: 'https://i.pravatar.cc/150?img=11',
  skill: 'Full Stack Developer',
  category: 'Technology',
  city: 'Mumbai',
  area: 'Andheri West',
  rating: 4.9,
  reviewCount: 127,
  verified: true,
  availability: 'online' as const,
  memberSince: 'March 2024',
  bio: 'Expert in React, Node.js, and cloud deployment. Building scalable products for startups and enterprises across India. Open to freelance, short-term contracts, and consulting.',
  totalEarnings: 284500,
  completedJobs: 243,
  responseTime: '< 5 min',
  hourlyRate: 1200,
};

export default function ProfileHeader() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="relative overflow-hidden">
      {/* Cover */}
      <div className="h-40 lg:h-52 relative" style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.2) 0%, rgba(139,92,246,0.2) 100%)' }}>
        <div className="absolute inset-0 blob-primary opacity-40" />
        <div className="absolute inset-0 blob-secondary opacity-30" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16">
        <div className="relative -mt-16 lg:-mt-20 pb-6">
          <div className="flex flex-col lg:flex-row lg:items-end gap-5">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="relative"
              >
                <img
                  src={MOCK_PROFILE.avatar}
                  alt={`${MOCK_PROFILE.name} profile photo`}
                  className="w-28 h-28 lg:w-32 lg:h-32 rounded-2xl object-cover border-4 border-background shadow-2xl neon-glow-cyan"
                />
                {MOCK_PROFILE.verified && (
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-background">
                    <CheckCircle size={16} className="text-primary-foreground" />
                  </div>
                )}
                <button className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                  <Camera size={13} />
                </button>
              </motion.div>
            </div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-1 min-w-0 pt-4 lg:pt-8"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-2xl font-800 text-foreground">{MOCK_PROFILE.name}</h1>
                    {MOCK_PROFILE.verified && (
                      <span className="badge-verified flex items-center gap-1">
                        <CheckCircle size={11} /> Verified
                      </span>
                    )}
                    <span className="badge-online">● Online</span>
                  </div>
                  <p className="text-primary font-600 mt-0.5">{MOCK_PROFILE.skill}</p>
                  <div className="flex items-center gap-3 mt-1.5 text-sm text-muted-foreground flex-wrap">
                    <span className="flex items-center gap-1"><MapPin size={13} />{MOCK_PROFILE.area}, {MOCK_PROFILE.city}</span>
                    <span className="flex items-center gap-1"><Star size={13} className="text-accent fill-accent" />{MOCK_PROFILE.rating} ({MOCK_PROFILE.reviewCount} reviews)</span>
                    <span className="flex items-center gap-1"><Clock size={13} />Responds in {MOCK_PROFILE.responseTime}</span>
                    <span className="flex items-center gap-1"><Briefcase size={13} />Member since {MOCK_PROFILE.memberSince}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                    onClick={() => { toast.success('Profile link copied!'); }}
                    className="btn-secondary flex items-center gap-2 text-sm px-4 py-2.5"
                  >
                    <Share2 size={15} />
                    Share Profile
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                    onClick={() => setIsEditing(!isEditing)}
                    className="btn-primary flex items-center gap-2 text-sm px-4 py-2.5"
                  >
                    <Edit3 size={15} />
                    Edit Profile
                  </motion.button>
                </div>
              </div>

              {/* Bio */}
              <p className="text-sm text-muted-foreground mt-3 max-w-2xl leading-relaxed">
                {MOCK_PROFILE.bio}
              </p>

              {/* Earnings highlight */}
              <div className="mt-4 inline-flex items-center gap-3 glass rounded-xl px-4 py-2.5 border border-primary/20">
                <div>
                  <div className="text-xs text-muted-foreground font-500 uppercase tracking-wider">Total Earnings</div>
                  <div className="font-800 text-lg gradient-text">₹{MOCK_PROFILE.totalEarnings.toLocaleString('en-IN')}</div>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <div className="text-xs text-muted-foreground font-500 uppercase tracking-wider">Rate</div>
                  <div className="font-800 text-lg gradient-text">₹{MOCK_PROFILE.hourlyRate}/hr</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}