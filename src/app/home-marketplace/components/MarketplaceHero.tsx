'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, TrendingUp } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const trendingSkills = ['Full Stack Dev', 'Interior Design', 'Electrician', 'Yoga Coach', 'CA / Tax', 'UI/UX Design', 'Plumber', 'Math Tutor'];

export default function MarketplaceHero() {
  const { searchQuery, setSearchQuery, professionals } = useApp();
  const onlineCount = professionals?.filter(p => p?.availability === 'online')?.length;

  return (
    <div className="relative overflow-hidden py-16 lg:py-20">
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute top-0 right-0 w-96 h-96 blob-secondary opacity-30" />
      <div className="absolute bottom-0 left-0 w-80 h-80 blob-primary opacity-20" />
      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-600 text-primary border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              {onlineCount} professionals online right now
            </span>
          </div>
          <h1 className="text-hero-md text-foreground mb-3">
            Find <span className="gradient-text">Skilled Professionals</span> Near You
          </h1>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Browse, filter, and hire verified professionals directly — no middlemen, instant contact, UPI payments.
          </p>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 glass rounded-2xl p-2 border border-primary/20 neon-glow-cyan">
              <Search size={20} className="text-muted-foreground ml-3 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search for skills, professionals, or cities..."
                value={searchQuery}
                onChange={e => setSearchQuery(e?.target?.value)}
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm py-2"
              />
              <div className="flex items-center gap-2 flex-shrink-0">
                <button className="glass rounded-xl px-3 py-2 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <MapPin size={14} />
                  <span className="hidden sm:inline">Mumbai</span>
                </button>
                <button className="btn-primary text-sm px-5 py-2.5 flex items-center gap-1.5">
                  <Search size={14} />
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Trending */}
          <div className="flex items-center justify-center gap-2 mt-5 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <TrendingUp size={13} className="text-accent" />
              <span>Trending:</span>
            </div>
            {trendingSkills?.map(skill => (
              <button
                key={`trending-${skill}`}
                onClick={() => setSearchQuery(skill)}
                className="px-3 py-1 rounded-full text-xs glass border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
              >
                {skill}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}