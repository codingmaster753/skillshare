'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const CATEGORIES = ['All', 'Technology', 'Design', 'Home Services', 'Fitness', 'Education', 'Finance'];

export default function SkillCards() {
  const { filterCategory, setFilterCategory } = useApp();

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
              0 professionals found · Direct contact, no commission
            </p>
          </div>

          {/* Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by skill or city..."
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
          {CATEGORIES?.map(cat => (
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

        {/* Empty State */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-24 h-24 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 neon-glow-cyan"
          >
            <Users size={40} className="text-primary" />
          </motion.div>
          <h3 className="font-700 text-foreground text-xl mb-3">No Professionals Listed Yet</h3>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            Be the first to share your skill! Register your profile and start connecting with clients directly.
          </p>
        </motion.div>
      </div>
    </section>
  );
}