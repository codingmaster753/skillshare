'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { X, Bell, CheckCheck, UserCheck, Star, Briefcase } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface Props {
  onClose: () => void;
}

export default function NotificationPanel({ onClose }: Props) {
  const { notifications, markAllRead, unreadCount } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'hire_request': return <Briefcase size={16} className="text-accent" />;
      case 'accepted': return <UserCheck size={16} className="text-primary" />;
      case 'review': return <Star size={16} className="text-secondary" />;
      case 'completed': return <CheckCheck size={16} className="text-green-400" />;
      default: return <Bell size={16} className="text-muted-foreground" />;
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="fixed top-20 right-4 lg:right-8 xl:right-10 2xl:right-16 z-50 w-80 sm:w-96 glass-strong rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Bell size={18} className="text-primary" />
            <span className="font-700 text-sm text-foreground">Notifications</span>
            {unreadCount > 0 && (
              <span className="bg-accent text-accent-foreground text-xs font-700 px-2 py-0.5 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markAllRead}
              className="text-xs text-primary hover:text-primary/80 font-600 transition-colors"
            >
              Mark all read
            </button>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Notification List */}
        <div className="max-h-80 overflow-y-auto scrollbar-thin">
          {notifications.map((notif, i) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-start gap-3 px-5 py-3.5 border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer ${
                !notif.read ? 'bg-primary/5' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                !notif.read ? 'bg-primary/10' : 'bg-muted/50'
              }`}>
                {getIcon(notif.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground leading-snug">{notif.message}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{notif.time}</p>
              </div>
              {!notif.read && (
                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 text-center">
          <button className="text-xs text-primary hover:text-primary/80 font-600 transition-colors">
            View all notifications
          </button>
        </div>
      </motion.div>
    </>
  );
}