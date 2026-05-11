'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Star, Eye, Zap, TrendingUp } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const stats = [
  {
    id: 'stat-hires',
    label: 'Total Hires',
    value: '243',
    change: '+18 this month',
    positive: true,
    icon: Briefcase,
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/20',
  },
  {
    id: 'stat-rating',
    label: 'Avg Rating',
    value: '4.9',
    change: '127 reviews',
    positive: true,
    icon: Star,
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'border-accent/20',
  },
  {
    id: 'stat-views',
    label: 'Profile Views',
    value: '1,842',
    change: '+124 this week',
    positive: true,
    icon: Eye,
    color: 'text-secondary',
    bg: 'bg-secondary/10',
    border: 'border-secondary/20',
  },
  {
    id: 'stat-response',
    label: 'Response Time',
    value: '< 5 min',
    change: 'Top 5% on platform',
    positive: true,
    icon: Zap,
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/20',
  },
];

export default function ProfileStats() {
  return (
    <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16 py-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats?.map((stat, i) => {
          const Icon = stat?.icon;
          return (
            <motion.div
              key={stat?.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -3, scale: 1.01 }}
              className={`glass rounded-2xl p-5 border ${stat?.border} card-hover`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl ${stat?.bg} flex items-center justify-center`}>
                  <Icon size={18} className={stat?.color} />
                </div>
                <TrendingUp size={14} className={stat?.positive ? 'text-green-400' : 'text-red-400'} />
              </div>
              <div className={`text-2xl font-800 ${stat?.color} tabular-nums`}>{stat?.value}</div>
              <div className="text-xs font-600 text-foreground mt-0.5">{stat?.label}</div>
              <div className={`text-xs mt-1 ${stat?.positive ? 'text-green-400' : 'text-red-400'}`}>{stat?.change}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}