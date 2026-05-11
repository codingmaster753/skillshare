'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, Bookmark, Share2, CheckCircle, Zap, LayoutGrid, List } from 'lucide-react';
import { useApp, Professional } from '@/context/AppContext';

function SkeletonCard() {
  return (
    <div className="glass rounded-2xl overflow-hidden animate-pulse">
      <div className="h-1 bg-muted/50 w-full" />
      <div className="p-5">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-14 h-14 rounded-full bg-muted/50 flex-shrink-0" />
          <div className="flex-1">
            <div className="h-4 bg-muted/50 rounded w-3/4 mb-2" />
            <div className="h-3 bg-muted/50 rounded w-1/2 mb-2" />
            <div className="flex gap-2">
              <div className="h-5 bg-muted/50 rounded-full w-16" />
              <div className="h-5 bg-muted/50 rounded-full w-16" />
            </div>
          </div>
          <div className="w-12">
            <div className="h-5 bg-muted/50 rounded w-full mb-1" />
            <div className="h-3 bg-muted/50 rounded w-8" />
          </div>
        </div>
        <div className="h-3 bg-muted/50 rounded w-full mb-2" />
        <div className="h-3 bg-muted/50 rounded w-4/5 mb-4" />
        <div className="flex gap-2">
          <div className="h-9 bg-muted/50 rounded-xl flex-1" />
          <div className="h-9 w-9 bg-muted/50 rounded-xl" />
          <div className="h-9 w-9 bg-muted/50 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

function ProfessionalCardGrid({ pro, index }: { pro: Professional; index: number }) {
  const { setSelectedProfessional, setIsHireModalOpen } = useApp();
  const [saved, setSaved] = useState(false);

  const statusBadge = {
    online: 'badge-online',
    busy: 'badge-busy',
    offline: 'badge-offline',
  }[pro.availability];

  const statusLabel = { online: '● Online', busy: '◐ Busy', offline: '○ Offline' }[pro.availability];
  const accentColors = ['border-primary/30', 'border-secondary/30', 'border-accent/30'];
  const topColors = ['bg-primary', 'bg-secondary', 'bg-accent'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -5, scale: 1.01 }}
      className={`glass rounded-2xl overflow-hidden border ${accentColors[index % 3]} transition-all duration-300 group`}
    >
      <div className={`h-1 ${topColors[index % 3]}`} />
      <div className="p-5">
        <div className="flex items-start gap-3 mb-4">
          <div className="relative flex-shrink-0">
            <img
              src={pro.avatar}
              alt={`${pro.name} — ${pro.skill} professional profile photo`}
              className="w-14 h-14 rounded-full object-cover border-2 border-primary/20"
            />
            {pro.availability === 'online' && (
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-card" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-700 text-foreground text-sm">{pro.name}</h3>
              {pro.verified && <CheckCircle size={13} className="text-primary flex-shrink-0" />}
            </div>
            <p className="text-xs text-primary font-600 mt-0.5 truncate">{pro.skill}</p>
            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
              <span className={statusBadge}>{statusLabel}</span>
              {pro.verified && <span className="badge-verified">Verified</span>}
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="font-800 text-sm gradient-text">₹{pro.hourlyRate}</div>
            <div className="text-xs text-muted-foreground">/hr</div>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground flex-wrap">
          <div className="flex items-center gap-1">
            <Star size={11} className="text-accent fill-accent" />
            <span className="font-600 text-foreground">{pro.rating}</span>
            <span>({pro.reviewCount})</span>
          </div>
          <span className="text-border">·</span>
          <div className="flex items-center gap-1">
            <MapPin size={11} />
            <span className="truncate max-w-[100px]">{pro.city}</span>
          </div>
          <span className="text-border">·</span>
          <span>{pro.experience}yr exp</span>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">{pro.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {pro.skills.slice(0, 3).map(s => (
            <span key={`mg-skill-${pro.id}-${s}`} className="px-2 py-0.5 rounded-full text-xs bg-muted/50 text-muted-foreground border border-border">
              {s}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { setSelectedProfessional(pro); setIsHireModalOpen(true); }}
            disabled={pro.availability === 'offline'}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-700 transition-all ${
              pro.availability === 'offline' ?'bg-muted/30 text-muted-foreground cursor-not-allowed' :'btn-primary'
            }`}
          >
            <Zap size={13} />
            {pro.availability === 'offline' ? 'Unavailable' : 'Hire Now'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            onClick={() => setSaved(!saved)}
            className={`w-9 h-9 rounded-xl glass border flex items-center justify-center transition-colors ${saved ? 'text-accent border-accent/30' : 'text-muted-foreground border-border hover:text-accent'}`}
          >
            <Bookmark size={15} className={saved ? 'fill-accent' : ''} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-xl glass border border-border flex items-center justify-center text-muted-foreground hover:text-secondary transition-colors"
          >
            <Share2 size={15} />
          </motion.button>
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Zap size={11} className="text-primary" />
          <span>{pro.responseTime} response</span>
          <span className="text-border mx-1">·</span>
          <span>{pro.completedJobs} completed</span>
        </div>
      </div>
    </motion.div>
  );
}

function ProfessionalCardList({ pro, index }: { pro: Professional; index: number }) {
  const { setSelectedProfessional, setIsHireModalOpen } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      whileHover={{ x: 4 }}
      className="glass rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 p-4"
    >
      <div className="flex items-center gap-4">
        <div className="relative flex-shrink-0">
          <img
            src={pro.avatar}
            alt={`${pro.name} profile photo`}
            className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
          />
          {pro.availability === 'online' && (
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-card" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-700 text-foreground text-sm">{pro.name}</h3>
            {pro.verified && <CheckCircle size={13} className="text-primary" />}
            <span className={`${{ online: 'badge-online', busy: 'badge-busy', offline: 'badge-offline' }[pro.availability]}`}>
              {{ online: '● Online', busy: '◐ Busy', offline: '○ Offline' }[pro.availability]}
            </span>
          </div>
          <p className="text-xs text-primary font-600 mt-0.5">{pro.skill} · {pro.city}</p>
          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Star size={10} className="text-accent fill-accent" />{pro.rating} ({pro.reviewCount})</span>
            <span>{pro.experience}yr exp</span>
            <span>{pro.completedJobs} jobs</span>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="text-right hidden sm:block">
            <div className="font-800 gradient-text">₹{pro.hourlyRate}/hr</div>
            <div className="text-xs text-muted-foreground">{pro.responseTime} resp.</div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => { setSelectedProfessional(pro); setIsHireModalOpen(true); }}
            disabled={pro.availability === 'offline'}
            className={`px-4 py-2 rounded-xl text-xs font-700 transition-all flex items-center gap-1.5 ${
              pro.availability === 'offline' ?'bg-muted/30 text-muted-foreground cursor-not-allowed' :'btn-primary'
            }`}
          >
            <Zap size={12} />
            Hire
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function MarketplaceGrid() {
  const { professionals, searchQuery, filterCategory } = useApp();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;

  const filtered = professionals.filter(p => {
    const q = searchQuery.toLowerCase();
    const matchQuery = q === '' ||
      p.name.toLowerCase().includes(q) ||
      p.skill.toLowerCase().includes(q) ||
      p.city.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q);
    const matchCat = filterCategory === 'All' || p.category === filterCategory;
    return matchQuery && matchCat;
  });

  const paginated = filtered.slice(0, page * PER_PAGE);
  const hasMore = paginated.length < filtered.length;

  return (
    <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16 py-6 pb-16">
      {/* Results header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-sm font-600 text-foreground">{filtered.length} professionals found</span>
          {searchQuery && (
            <span className="text-sm text-muted-foreground ml-2">for "{searchQuery}"</span>
          )}
        </div>
        <div className="flex items-center gap-1 glass rounded-xl p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${viewMode === 'grid' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            aria-label="Grid view"
          >
            <LayoutGrid size={15} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${viewMode === 'list' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            aria-label="List view"
          >
            <List size={15} />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center py-20 text-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-muted/30 flex items-center justify-center mb-4">
              <MapPin size={32} className="text-muted-foreground" />
            </div>
            <h3 className="font-700 text-foreground text-lg mb-2">No professionals found</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              No one matches your current filters. Try adjusting your search or category.
            </p>
          </motion.div>
        ) : viewMode === 'grid' ? (
          <motion.div
            key="grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-5"
          >
            {paginated.map((pro, i) => (
              <ProfessionalCardGrid key={pro.id} pro={pro} index={i} />
            ))}
          </motion.div>
        ) : (
          <motion.div key="list" className="flex flex-col gap-3">
            {paginated.map((pro, i) => (
              <ProfessionalCardList key={pro.id} pro={pro} index={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {hasMore && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            onClick={() => setPage(p => p + 1)}
            className="btn-secondary flex items-center gap-2"
          >
            Load More ({filtered.length - paginated.length} remaining)
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}