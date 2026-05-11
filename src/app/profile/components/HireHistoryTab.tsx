'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, XCircle, ExternalLink } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const STATUS_CONFIG = {
  accepted: { label: 'Accepted', className: 'badge-online', icon: CheckCircle },
  pending: { label: 'Pending', className: 'badge-busy', icon: Clock },
  completed: { label: 'Completed', className: 'badge-verified', icon: CheckCircle },
  cancelled: { label: 'Cancelled', className: 'badge-offline', icon: XCircle },
};

export default function HireHistoryTab() {
  const { hireRequests } = useApp();
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'completed' | 'cancelled'>('all');

  const filtered = filter === 'all' ? hireRequests : hireRequests.filter(r => r.status === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h3 className="font-700 text-foreground text-lg">Hire History</h3>
          <p className="text-sm text-muted-foreground">{hireRequests.length} total requests</p>
        </div>
        <div className="flex items-center gap-1 glass rounded-xl p-1">
          {(['all', 'pending', 'accepted', 'completed', 'cancelled'] as const).map(s => (
            <button
              key={`hf-${s}`}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-600 capitalize transition-all ${
                filter === s ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-muted/30 flex items-center justify-center mb-3">
            <Clock size={28} className="text-muted-foreground" />
          </div>
          <h4 className="font-700 text-foreground mb-1">No hire requests yet</h4>
          <p className="text-sm text-muted-foreground max-w-xs">
            Once clients send you hire requests, they'll appear here with full details.
          </p>
        </div>
      ) : (
        <div className="glass rounded-2xl overflow-hidden border border-border">
          {/* Table header */}
          <div className="hidden lg:grid grid-cols-[1fr_1fr_1fr_auto_auto_auto] gap-4 px-5 py-3 border-b border-border bg-muted/20">
            {['Professional', 'Skill', 'Date & Time', 'Amount', 'Status', ''].map(h => (
              <div key={`hh-${h}`} className="text-xs font-700 text-muted-foreground uppercase tracking-wider">{h}</div>
            ))}
          </div>

          {/* Rows */}
          <div className="divide-y divide-border">
            {filtered.map((req, i) => {
              const statusCfg = STATUS_CONFIG[req.status];
              const StatusIcon = statusCfg.icon;
              return (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_auto_auto_auto] gap-3 lg:gap-4 px-5 py-4 hover:bg-muted/20 transition-colors"
                >
                  <div>
                    <div className="text-xs text-muted-foreground lg:hidden font-500 mb-0.5">Client</div>
                    <div className="font-600 text-foreground text-sm">{req.seekerName}</div>
                    <div className="text-xs text-muted-foreground">{req.seekerPhone}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground lg:hidden font-500 mb-0.5">Skill</div>
                    <div className="text-sm text-foreground">{req.skill}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1">{req.message}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground lg:hidden font-500 mb-0.5">Date & Time</div>
                    <div className="text-sm text-foreground font-600">{req.date}</div>
                    <div className="text-xs text-muted-foreground">{req.time}</div>
                  </div>
                  <div className="flex items-center">
                    <div>
                      <div className="text-xs text-muted-foreground lg:hidden font-500 mb-0.5">Amount</div>
                      <div className="font-700 gradient-text text-sm">₹{req.amount.toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={statusCfg.className}>
                      {statusCfg.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="w-7 h-7 rounded-lg glass border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                      <ExternalLink size={13} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}