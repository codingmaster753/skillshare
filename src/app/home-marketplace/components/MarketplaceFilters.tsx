'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, ChevronDown, Star } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const CATEGORIES = ['All', 'Technology', 'Design', 'Home Services', 'Fitness', 'Education', 'Finance'];
const SORT_OPTIONS = ['Relevance', 'Rating: High to Low', 'Price: Low to High', 'Price: High to Low', 'Fastest Response'];
const AVAILABILITY = ['All', 'Online Now', 'Busy', 'Any'];
const CITIES = ['All Cities', 'Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Ahmedabad', 'Jaipur'];

export default function MarketplaceFilters() {
  const { filterCategory, setFilterCategory } = useApp();
  const [sortBy, setSortBy] = useState('Relevance');
  const [availability, setAvailability] = useState('All');
  const [city, setCity] = useState('All Cities');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16 py-4">
      {/* Category chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin mb-4">
        {CATEGORIES?.map(cat => (
          <button
            key={`mf-cat-${cat}`}
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
      </div>
      {/* Filter bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={e =>setSortBy(e?.target?.value)}
              className="input-glass pr-8 pl-3 py-2 text-sm appearance-none cursor-pointer"
            >
              {SORT_OPTIONS?.map(o => <option key={`sort-${o}`} value={o}>{o}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>

          {/* City */}
          <div className="relative">
            <select
              value={city}
              onChange={e => setCity(e?.target?.value)}
              className="input-glass pr-8 pl-3 py-2 text-sm appearance-none cursor-pointer"
            >
              {CITIES?.map(c => <option key={`city-${c}`} value={c}>{c}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>

          {/* Availability */}
          <div className="flex items-center gap-1 glass rounded-xl p-1">
            {AVAILABILITY?.map(a => (
              <button
                key={`avail-${a}`}
                onClick={() => setAvailability(a)}
                className={`px-3 py-1.5 rounded-lg text-xs font-600 transition-all ${
                  availability === a
                    ? 'bg-primary/20 text-primary' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-600 transition-all glass border ${
            showFilters ? 'border-primary/40 text-primary' : 'border-border text-muted-foreground hover:text-foreground'
          }`}
        >
          <SlidersHorizontal size={15} />
          Advanced Filters
        </button>
      </div>
      {/* Advanced filter panel */}
      <motion.div
        initial={false}
        animate={{ height: showFilters ? 'auto' : 0, opacity: showFilters ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="mt-4 glass rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Price Range */}
          <div>
            <label className="block text-xs font-600 text-muted-foreground mb-2 uppercase tracking-wider">
              Hourly Rate (₹)
            </label>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-foreground font-600">₹{priceRange?.[0]}</span>
              <input
                type="range"
                min={0}
                max={2000}
                step={50}
                value={priceRange?.[1]}
                onChange={e => setPriceRange([priceRange?.[0], Number(e?.target?.value)])}
                className="flex-1 accent-primary"
              />
              <span className="text-foreground font-600">₹{priceRange?.[1]}</span>
            </div>
          </div>

          {/* Min Rating */}
          <div>
            <label className="block text-xs font-600 text-muted-foreground mb-2 uppercase tracking-wider">
              Minimum Rating
            </label>
            <div className="flex items-center gap-1">
              {[1,2,3,4,5]?.map(r => (
                <button key={`rating-filter-${r}`} className="text-accent hover:scale-110 transition-transform">
                  <Star size={20} className="fill-accent" />
                </button>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <label className="block text-xs font-600 text-muted-foreground mb-2 uppercase tracking-wider">
              Experience
            </label>
            <div className="flex flex-wrap gap-1.5">
              {['Any', '1-3 yr', '3-5 yr', '5+ yr', '10+ yr']?.map(e => (
                <button
                  key={`exp-${e}`}
                  className="px-2.5 py-1 rounded-lg text-xs glass border border-border text-muted-foreground hover:border-primary/30 hover:text-primary transition-all"
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Payment */}
          <div>
            <label className="block text-xs font-600 text-muted-foreground mb-2 uppercase tracking-wider">
              Payment Method
            </label>
            <div className="flex flex-wrap gap-1.5">
              {['PhonePe', 'Google Pay', 'Paytm']?.map(p => (
                <button
                  key={`pay-filter-${p}`}
                  className="px-2.5 py-1 rounded-lg text-xs glass border border-border text-muted-foreground hover:border-primary/30 hover:text-primary transition-all"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}