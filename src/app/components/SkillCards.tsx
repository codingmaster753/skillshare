'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, Clock, Bookmark, Share2, CheckCircle, Zap, Phone, Search } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Professional } from '@/context/AppContext';

const CATEGORIES = ['All', 'Technology', 'Design', 'Home Services', 'Fitness', 'Education', 'Finance'];

function SkeletonCard() {
  return (
    <div className="glass rounded-2xl overflow-hidden animate-pulse">
      <div className="h-3 bg-muted/50 w-full" />
      <div className="p-5">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-14 h-14 rounded-full bg-muted/50" />
          <div className="flex-1">
            <div className="h-4 bg-muted/50 rounded w-3/4 mb-2" />
            <div className="h-3 bg-muted/50 rounded w-1/2 mb-2" />
            <div className="h-3 bg-muted/50 rounded w-1/3" />
          </div>
        </div>
        <div className="h-10 bg-muted/50 rounded-xl" />
      </div>
    </div>
  );
}

function ProfessionalCard({ pro, index }: { pro: Professional; index: number }) {
  const { setSelectedProfessional, setIsHireModalOpen } = useApp();
  const [saved, setSaved] = useState(false);

  const statusColor = {
    online: 'badge-online',
    busy: 'badge-busy',
    offline: 'badge-offline',
  }[pro.availability];

  const statusLabel = {
    online: '● Online',
    busy: '◐ Busy',
    offline: '○ Offline',
  }[pro.availability];

  const accentColors = ['border-primary/30', 'border-secondary/30', 'border-accent/30'];
  const topColors = ['bg-primary', 'bg-secondary', 'bg-accent'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className={`glass rounded-2xl overflow-hidden border ${accentColors[index % 3]} transition-all duration-300 group`}
    >
      {/* Top accent bar */}
      <div className={`h-1 ${topColors[index % 3]} w-full`} />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="relative flex-shrink-0">
            <img
              src={pro.avatar}
              alt={`${pro.name} profile photo`}
              className="w-14 h-14 rounded-full object-cover border-2 border-primary/20"
            />
            {pro.availability === 'online' && (
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-card" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-700 text-foreground text-sm truncate">{pro.name}</h3>
              {pro.verified && (
                <CheckCircle size={14} className="text-primary flex-shrink-0" />
              )}
            </div>
            <p className="text-xs text-primary font-600 mt-0.5 truncate">{pro.skill}</p>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className={statusColor}>{statusLabel}</span>
              {pro.verified && <span className="badge-verified">Verified</span>}
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="font-800 text-sm gradient-text">₹{pro.hourlyRate}</div>
            <div className="text-xs text-muted-foreground">/hr</div>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star size={12} className="text-accent fill-accent" />
            <span className="font-600 text-foreground">{pro.rating}</span>
            <span>({pro.reviewCount})</span>
          </div>
          <span className="text-border">·</span>
          <div className="flex items-center gap-1">
            <MapPin size={11} />
            <span className="truncate">{pro.area}, {pro.city}</span>
          </div>
          <span className="text-border">·</span>
          <div className="flex items-center gap-1">
            <Clock size={11} />
            <span>{pro.experience}yr exp</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
          {pro.description}
        </p>

        {/* Skills tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {pro.skills.slice(0, 3).map(skill => (
            <span key={`skill-tag-${pro.id}-${skill}`} className="px-2 py-0.5 rounded-full text-xs bg-muted/50 text-muted-foreground border border-border">
              {skill}
            </span>
          ))}
          {pro.skills.length > 3 && (
            <span className="px-2 py-0.5 rounded-full text-xs bg-muted/50 text-muted-foreground border border-border">
              +{pro.skills.length - 3}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setSelectedProfessional(pro);
              setIsHireModalOpen(true);
            }}
            disabled={pro.availability === 'offline'}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-700 transition-all ${
              pro.availability === 'offline' ?'bg-muted/30 text-muted-foreground cursor-not-allowed' :'btn-primary'
            }`}
          >
            <Zap size={13} />
            {pro.availability === 'offline' ? 'Unavailable' : 'Hire Now'}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.open(`tel:${pro.phone}`)}
            className="w-9 h-9 rounded-xl glass border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
            title="Call"
          >
            <Phone size={15} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSaved(!saved)}
            className={`w-9 h-9 rounded-xl glass border border-border flex items-center justify-center transition-colors ${
              saved ? 'text-accent border-accent/30' : 'text-muted-foreground hover:text-accent'
            }`}
            title={saved ? 'Saved' : 'Save'}
          >
            <Bookmark size={15} className={saved ? 'fill-accent' : ''} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-xl glass border border-border flex items-center justify-center text-muted-foreground hover:text-secondary transition-colors"
            title="Share"
          >
            <Share2 size={15} />
          </motion.button>
        </div>

        {/* Response time */}
        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Zap size={11} className="text-primary" />
          <span>Responds in {pro.responseTime}</span>
          <span className="text-border mx-1">·</span>
          <span>{pro.completedJobs} jobs done</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function SkillCards() {
  const { professionals, searchQuery, filterCategory, setFilterCategory } = useApp();
  const [isLoading] = useState(false);

  const filtered = professionals.filter(p => {
    const matchQuery = searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.skill.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = filterCategory === 'All' || p.category === filterCategory;
    return matchQuery && matchCat;
  });

  return (
    <section className="section-pad relative">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8"
        >
          <div>
            <span className="text-xs font-700 text-primary uppercase tracking-widest mb-3 block">Discover Talent</span>
            <h2 className="text-hero-md text-foreground">
              Skilled <span className="gradient-text">Professionals</span>
            </h2>
            <p className="text-muted-foreground mt-2 text-sm">
              {filtered.length} professionals found · Direct contact, no commission
            </p>
          </div>

          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by skill or city..."
                value={searchQuery}
                readOnly
                className="input-glass pl-9 w-full sm:w-56 text-sm"
              />
            </div>
          </div>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-thin"
        >
          {CATEGORIES.map(cat => (
            <button
              key={`skill-filter-${cat}`}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-600 whitespace-nowrap transition-all flex-shrink-0 ${
                filterCategory === cat
                  ? 'bg-primary text-primary-foreground neon-glow-cyan'
                  : 'glass text-muted-foreground hover:text-foreground border border-border hover:border-primary/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Cards Grid */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="skeleton"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-5"
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={`skel-${i}`} />
              ))}
            </motion.div>
          ) : filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-muted/30 flex items-center justify-center mb-4">
                <Search size={32} className="text-muted-foreground" />
              </div>
              <h3 className="font-700 text-foreground text-lg mb-2">No professionals found</h3>
              <p className="text-sm text-muted-foreground max-w-xs mb-4">
                No one matching your filters is available right now. Try a different skill category or city.
              </p>
              <button
                onClick={() => setFilterCategory('All')}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="cards"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-5"
            >
              {filtered.map((pro, i) => (
                <ProfessionalCard key={pro.id} pro={pro} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Load more */}
        {filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-10"
          >
            <button className="btn-secondary flex items-center gap-2">
              Load More Professionals
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}