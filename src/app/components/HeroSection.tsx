'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Zap, Star, Users, MapPin, Shield, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const floatingIcons = [
  { icon: '⚡', label: 'Electrician', x: '8%', y: '20%', delay: 0 },
  { icon: '🎨', label: 'Designer', x: '85%', y: '15%', delay: 0.5 },
  { icon: '🔧', label: 'Plumber', x: '5%', y: '65%', delay: 1 },
  { icon: '💻', label: 'Developer', x: '88%', y: '60%', delay: 1.5 },
  { icon: '📚', label: 'Tutor', x: '15%', y: '80%', delay: 0.8 },
  { icon: '🏋️', label: 'Trainer', x: '80%', y: '80%', delay: 1.2 },
  { icon: '🎵', label: 'Musician', x: '50%', y: '10%', delay: 0.3 },
  { icon: '🏠', label: 'Interior', x: '92%', y: '38%', delay: 0.7 },
];

function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const stepValue = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += stepValue;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="font-800 text-3xl lg:text-4xl gradient-text tabular-nums">
      {prefix}{count.toLocaleString('en-IN')}{suffix}
    </div>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const stats = [
    { label: 'Skilled Professionals', target: 48200, suffix: '+', icon: <Users size={20} className="text-primary" /> },
    { label: 'Cities Covered', target: 127, suffix: '+', icon: <MapPin size={20} className="text-secondary" /> },
    { label: 'Successful Hires', target: 312000, suffix: '+', icon: <Star size={20} className="text-accent" /> },
    { label: 'Avg Response Time', target: 8, suffix: ' min', icon: <Zap size={20} className="text-primary" /> },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <div ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 hero-gradient" />
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] blob-primary opacity-60" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] blob-secondary opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] blob-accent opacity-30" />
      </motion.div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating skill icons */}
      {floatingIcons.map((icon, i) => (
        <motion.div
          key={`float-icon-${i}`}
          className="absolute hidden md:flex flex-col items-center gap-1 pointer-events-none select-none"
          style={{ left: icon.x, top: icon.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ delay: icon.delay + 1, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: icon.delay }}
            className="w-12 h-12 glass rounded-xl flex items-center justify-center text-xl shadow-lg"
          >
            {icon.icon}
          </motion.div>
          <span className="text-xs text-muted-foreground font-500">{icon.label}</span>
        </motion.div>
      ))}

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16 pt-32 pb-20"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div variants={item} className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-600 text-primary border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              48,200+ professionals online now
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={item} className="text-hero-xl mb-4">
            <span className="text-foreground">Direct Hiring &</span>
            <br />
            <span className="gradient-text text-glow-cyan">Real-time Skill Mapping</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p variants={item} className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
            Connect instantly with verified skilled professionals near you — no middlemen, transparent pricing, UPI payments.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/home-marketplace" className="btn-primary flex items-center gap-2 text-base px-8 py-4">
                Find Skilled People
                <ArrowRight size={18} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/share-your-skill" className="btn-secondary flex items-center gap-2 text-base px-8 py-4">
                <Zap size={18} />
                Share Your Skill
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust badges */}
          <motion.div variants={item} className="flex items-center justify-center gap-6 mb-12 text-sm text-muted-foreground">
            {[
              { icon: <Shield size={14} className="text-primary" />, text: 'Verified Professionals' },
              { icon: <Star size={14} className="text-accent" />, text: 'Rated & Reviewed' },
              { icon: <TrendingUp size={14} className="text-secondary" />, text: 'No Commission' },
            ].map((b, i) => (
              <div key={`trust-${i}`} className="flex items-center gap-1.5">
                {b.icon}
                <span>{b.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={item}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={`stat-${i}`}
                whileHover={{ scale: 1.05, y: -2 }}
                className="glass rounded-2xl p-4 text-center card-hover gradient-border"
              >
                <div className="flex justify-center mb-2">{stat.icon}</div>
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                <p className="text-xs text-muted-foreground mt-1 font-500">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground font-500">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-muted-foreground/30 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </div>
  );
}