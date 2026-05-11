'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import Link from 'next/link';
import { User, LogIn } from 'lucide-react';
import Navbar from '@/components/Navbar';
import MobileBottomNav from '@/components/MobileBottomNav';
import ScrollProgress from '@/components/ScrollProgress';

export default function ProfileContent() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Navbar activePath="/profile" />
      <main className="pt-16 pb-20 lg:pb-0 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-6 px-6 max-w-md"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            className="w-24 h-24 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center neon-glow-cyan"
          >
            <User size={44} className="text-primary" />
          </motion.div>

          <div>
            <h1 className="text-2xl font-800 text-foreground mb-2">Your Profile</h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Sign in to view and manage your profile, track your hire history, and manage your listed skills.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Link href="/login" className="btn-primary flex items-center justify-center gap-2 flex-1">
              <LogIn size={16} />
              Sign In
            </Link>
            <Link href="/login?tab=signup" className="btn-secondary flex items-center justify-center gap-2 flex-1">
              <User size={16} />
              Create Account
            </Link>
          </div>
        </motion.div>
      </main>
      <MobileBottomNav activePath="/profile" />
      <ToastContainer position="bottom-right" theme="dark" toastClassName="!font-sans" />
    </div>
  );
}