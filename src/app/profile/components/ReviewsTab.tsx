'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp } from 'lucide-react';

const reviews = [
  {
    id: 'rev-001',
    reviewer: 'Rohit Desai',
    avatar: 'https://i.pravatar.cc/40?img=3',
    rating: 5,
    date: '08 May 2026',
    skill: 'Full Stack Development',
    comment: 'Arjun delivered an outstanding React dashboard in record time. His communication was excellent throughout and he went above and beyond with documentation. Highly recommended!',
    helpful: 12,
  },
  {
    id: 'rev-002',
    reviewer: 'Sunita Rao',
    avatar: 'https://i.pravatar.cc/40?img=9',
    rating: 5,
    date: '02 May 2026',
    skill: 'Full Stack Development',
    comment: 'Exceptional developer. Built our entire backend API in Node.js with proper error handling and test coverage. Will definitely hire again.',
    helpful: 8,
  },
  {
    id: 'rev-003',
    reviewer: 'Amit Joshi',
    avatar: 'https://i.pravatar.cc/40?img=22',
    rating: 4,
    date: '25 Apr 2026',
    skill: 'React Native Mobile Dev',
    comment: 'Great work on the mobile app. Minor delays on delivery but the final product was solid. Good communication and technical knowledge.',
    helpful: 5,
  },
  {
    id: 'rev-004',
    reviewer: 'Preethi Nair',
    avatar: 'https://i.pravatar.cc/40?img=31',
    rating: 5,
    date: '18 Apr 2026',
    skill: 'Technical Interview Coaching',
    comment: 'Cracked my Google interview after Arjun\'s coaching! His system design sessions are incredibly detailed and practical. Worth every rupee.',
    helpful: 19,
  },
  {
    id: 'rev-005',
    reviewer: 'Vikram Malhotra',
    avatar: 'https://i.pravatar.cc/40?img=51',
    rating: 5,
    date: '10 Apr 2026',
    skill: 'Full Stack Development',
    comment: 'Built our entire e-commerce platform from scratch. Responsive, fast, and well-structured code. The deployment on AWS was seamless.',
    helpful: 7,
  },
];

const ratingDist = [
  { stars: 5, count: 98, pct: 77 },
  { stars: 4, count: 21, pct: 17 },
  { stars: 3, count: 6, pct: 5 },
  { stars: 2, count: 1, pct: 1 },
  { stars: 1, count: 1, pct: 1 },
];

export default function ReviewsTab() {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Rating summary */}
        <div className="glass rounded-2xl p-6 border border-primary/20 text-center">
          <div className="text-5xl font-800 gradient-text mb-1">4.9</div>
          <div className="flex justify-center gap-1 mb-2">
            {[1,2,3,4,5]?.map(s => (
              <Star key={`rs-${s}`} size={18} className="text-accent fill-accent" />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Based on 127 reviews</p>
        </div>

        {/* Distribution */}
        <div className="lg:col-span-2 glass rounded-2xl p-6 border border-border">
          <h4 className="font-700 text-foreground text-sm mb-4">Rating Distribution</h4>
          <div className="flex flex-col gap-2.5">
            {ratingDist?.map(d => (
              <div key={`rd-${d?.stars}`} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-12 flex-shrink-0">
                  <span className="text-xs font-600 text-foreground">{d?.stars}</span>
                  <Star size={11} className="text-accent fill-accent" />
                </div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${d?.pct}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: d?.stars * 0.05 }}
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, var(--accent), var(--primary))' }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-8 text-right">{d?.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Review cards */}
      <div className="flex flex-col gap-4">
        {reviews?.map((rev, i) => (
          <motion.div
            key={rev?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="glass rounded-2xl p-5 border border-border hover:border-primary/20 transition-all"
          >
            <div className="flex items-start gap-4">
              <img
                src={rev?.avatar}
                alt={`${rev?.reviewer} reviewer photo`}
                className="w-10 h-10 rounded-full object-cover border-2 border-primary/20 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                  <div>
                    <span className="font-700 text-foreground text-sm">{rev?.reviewer}</span>
                    <span className="text-xs text-muted-foreground ml-2">· {rev?.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5]?.map(s => (
                      <Star key={`rev-star-${rev?.id}-${s}`} size={13} className={s <= rev?.rating ? 'text-accent fill-accent' : 'text-muted/50'} />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-primary font-500 mb-2">{rev?.skill}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{rev?.comment}</p>
                <div className="flex items-center gap-2 mt-3">
                  <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                    <ThumbsUp size={12} />
                    Helpful ({rev?.helpful})
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}