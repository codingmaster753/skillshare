'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Search, PlusCircle, User } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface Props {
  activePath: string;
}

export default function MobileBottomNav({ activePath }: Props) {
  const tabs = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/home-marketplace', label: 'Find', icon: Search },
    { href: '/share-your-skill', label: 'Share', icon: PlusCircle },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden glass-strong border-t border-border">
      <div className="flex items-center justify-around px-2 py-2 pb-safe">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activePath === tab.href;
          return (
            <Link key={`bottom-${tab.href}`} href={tab.href} className="flex-1">
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`flex flex-col items-center gap-1 py-1.5 px-2 rounded-xl transition-all ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <div className={`relative ${isActive ? 'neon-glow-cyan rounded-lg' : ''}`}>
                  <Icon size={22} />
                  {isActive && (
                    <motion.div
                      layoutId="bottom-nav-indicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                    />
                  )}
                </div>
                <span className={`text-xs font-600 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  {tab.label}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}