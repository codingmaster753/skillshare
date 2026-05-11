'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Filter, Layers } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useApp } from '@/context/AppContext';

const FullMap = dynamic(() => import('./FullMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] lg:h-[600px] rounded-2xl bg-muted/30 shimmer flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-muted-foreground">
        <MapPin size={32} className="animate-pulse text-primary" />
        <span className="text-sm font-500">Loading live map...</span>
      </div>
    </div>
  ),
});

const CATEGORIES = ['All', 'Technology', 'Design', 'Home Services', 'Fitness', 'Education', 'Finance'];

export default function MapSection() {
  const { filterCategory, setFilterCategory } = useApp();
  const [mapLayer, setMapLayer] = useState<'standard' | 'satellite'>('standard');

  return (
    <section className="section-pad relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 blob-primary opacity-20" />
      </div>
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8"
        >
          <div>
            <span className="text-xs font-700 text-primary uppercase tracking-widest mb-3 block">Live Map</span>
            <h2 className="text-hero-md text-foreground">
              Professionals <span className="gradient-text">Near You</span>
            </h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Real-time locations of verified professionals. Click any marker to view profile and hire.
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1 glass rounded-xl p-1">
              <Filter size={14} className="text-muted-foreground ml-2" />
              {CATEGORIES?.map(cat => (
                <button
                  key={`map-filter-${cat}`}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-600 transition-all ${
                    filterCategory === cat
                      ? 'bg-primary text-primary-foreground neon-glow-cyan'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden gradient-border relative"
        >
          <FullMap />

          {/* Live indicator */}
          <div className="absolute top-4 left-4 z-[400] glass rounded-xl px-3 py-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-600 text-foreground">Live — 127 professionals</span>
          </div>

          {/* Layer toggle */}
          <button
            onClick={() => setMapLayer(l => l === 'standard' ? 'satellite' : 'standard')}
            className="absolute top-4 right-4 z-[400] glass rounded-xl px-3 py-2 flex items-center gap-2 hover:bg-muted/50 transition-colors"
          >
            <Layers size={14} className="text-primary" />
            <span className="text-xs font-600 text-foreground">Map Style</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}