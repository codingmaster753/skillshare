'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Zap, Shield, CreditCard, Clock, Star } from 'lucide-react';
import dynamic from 'next/dynamic';

const MiniBentoMap = dynamic(() => import('./MiniBentoMap'), { ssr: false, loading: () => (
  <div className="w-full h-40 rounded-xl bg-muted/30 shimmer" />
) });

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function BentoFeatures() {
  return (
    <section className="section-pad relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-80 h-80 blob-secondary opacity-30" />
      </div>
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-700 text-primary uppercase tracking-widest mb-3 block">Why SkillShare</span>
          <h2 className="text-hero-md text-foreground">
            Built for <span className="gradient-text">Direct Connection</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            No agencies, no commissions, no delays — connect directly with verified professionals in your city.
          </p>
        </motion.div>

        {/* Bento Grid — 3 cols, 2 rows */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-5"
        >
          {/* Card 1 — Live Location (spans 2 rows on lg) */}
          <motion.div
            variants={item}
            whileHover={{ scale: 1.02, rotateY: 2 }}
            className="glass rounded-2xl p-5 gradient-border card-hover lg:row-span-2 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center neon-glow-cyan">
                <MapPin size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-700 text-foreground text-sm">Live Location Tracking</h3>
                <p className="text-xs text-muted-foreground">Real-time professional map</p>
              </div>
            </div>

            {/* Mini Map */}
            <div className="flex-1 min-h-40 rounded-xl overflow-hidden mb-4">
              <MiniBentoMap />
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              See exactly where verified professionals are right now. Filter by skill, distance, and availability for instant hiring.
            </p>

            <div className="mt-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-400 font-600">127 professionals active near you</span>
            </div>
          </motion.div>

          {/* Card 2 — Direct Hiring */}
          <motion.div
            variants={item}
            whileHover={{ scale: 1.02, rotateY: -2 }}
            className="glass rounded-2xl p-5 gradient-border card-hover"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center neon-glow-violet">
                  <Zap size={20} className="text-secondary" />
                </div>
                <h3 className="font-700 text-foreground text-sm">Direct Hiring</h3>
              </div>
              <span className="glass px-3 py-1 rounded-full text-xs font-700 text-accent border border-accent/30">
                NO MIDDLEMEN
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Contact and hire professionals directly. No agency fees, no commissions — negotiate your own terms.
            </p>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border">
              <div className="flex -space-x-2">
                {['11','5','15','20']?.map((n, i) => (
                  <img key={`avatar-bento-${i}`} src={`https://i.pravatar.cc/32?img=${n}`} alt={`Professional ${i+1}`} className="w-7 h-7 rounded-full border-2 border-card" />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">+48,000 professionals available</span>
            </div>
          </motion.div>

          {/* Card 3 — Secure UPI */}
          <motion.div
            variants={item}
            whileHover={{ scale: 1.02 }}
            className="glass rounded-2xl p-5 gradient-border card-hover"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center neon-glow-amber">
                <CreditCard size={20} className="text-accent" />
              </div>
              <h3 className="font-700 text-foreground text-sm">Secure UPI Payments</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Pay directly via your preferred UPI app. Instant, secure, and commission-free transactions.
            </p>
            <div className="flex items-center gap-3">
              {[
                { name: 'PhonePe', color: 'text-purple-400', bg: 'bg-purple-400/10', emoji: '📱' },
                { name: 'GPay', color: 'text-blue-400', bg: 'bg-blue-400/10', emoji: '🔵' },
                { name: 'Paytm', color: 'text-cyan-400', bg: 'bg-cyan-400/10', emoji: '💳' },
              ]?.map(p => (
                <div key={`upi-${p?.name}`} className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl ${p?.bg} border border-border`}>
                  <span className="text-lg">{p?.emoji}</span>
                  <span className={`text-xs font-700 ${p?.color}`}>{p?.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 4 — Verified Professionals */}
          <motion.div
            variants={item}
            whileHover={{ scale: 1.02 }}
            className="glass rounded-2xl p-5 gradient-border card-hover"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Shield size={20} className="text-primary" />
              </div>
              <h3 className="font-700 text-foreground text-sm">Verified & Rated</h3>
            </div>
            <div className="flex flex-col gap-2">
              {[
                { label: 'ID Verified', pct: 100 },
                { label: 'Skill Tested', pct: 87 },
                { label: '5-Star Rated', pct: 64 },
              ]?.map(bar => (
                <div key={`bar-${bar?.label}`}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{bar?.label}</span>
                    <span className="text-primary font-600">{bar?.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${bar?.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, var(--primary), var(--secondary))' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 5 — Fast Response */}
          <motion.div
            variants={item}
            whileHover={{ scale: 1.02 }}
            className="glass rounded-2xl p-5 gradient-border card-hover"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Clock size={20} className="text-secondary" />
              </div>
              <h3 className="font-700 text-foreground text-sm">Lightning Response</h3>
            </div>
            <div className="text-4xl font-800 gradient-text mb-1">8 min</div>
            <p className="text-xs text-muted-foreground mb-3">Average response time across all categories</p>
            <div className="flex items-center gap-2">
              {['⚡', '⚡', '⚡', '⚡', '⚡']?.map((e, i) => (
                <motion.span
                  key={`bolt-${i}`}
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  className="text-lg"
                >
                  {e}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Card 6 — Reviews */}
          <motion.div
            variants={item}
            whileHover={{ scale: 1.02 }}
            className="glass rounded-2xl p-5 gradient-border card-hover"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Star size={20} className="text-accent" />
              </div>
              <h3 className="font-700 text-foreground text-sm">Community Reviews</h3>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-800 gradient-text-amber">4.8</span>
              <span className="text-muted-foreground text-sm">/ 5.0</span>
            </div>
            <div className="flex gap-1 mb-3">
              {[1,2,3,4,5]?.map(s => (
                <Star key={`star-hero-${s}`} size={16} className={s <= 4 ? 'text-accent fill-accent' : 'text-accent/40'} />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Based on 3.1L+ verified reviews</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}