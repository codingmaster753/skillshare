'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function HireModal() {
  const { isHireModalOpen, setIsHireModalOpen } = useApp();

  const onClose = () => {
    setIsHireModalOpen(false);
  };

  return (
    <AnimatePresence>
      {isHireModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative w-full max-w-md glass-strong rounded-2xl overflow-hidden shadow-2xl neon-glow-cyan"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <h3 className="font-700 text-foreground">Hire Now</h3>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Body — empty/coming soon */}
            <div className="px-6 py-12 flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center neon-glow-cyan">
                <Zap size={32} className="text-primary" />
              </div>
              <h4 className="font-700 text-lg text-foreground">Coming Soon</h4>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                The hiring feature is being set up. Check back soon to connect with professionals directly.
              </p>
              <button onClick={onClose} className="btn-primary mt-2">
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}