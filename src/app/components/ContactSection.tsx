'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, MapPin } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="section-pad relative" id="contact">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-96 h-96 blob-secondary opacity-20" />
      </div>
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-700 text-primary uppercase tracking-widest mb-3 block">Get In Touch</span>
          <h2 className="text-hero-md text-foreground">
            Contact <span className="gradient-text">Us</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Have questions or need help? Reach out to us and we&apos;ll get back to you as soon as possible.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {/* Email */}
          <motion.a
            href="mailto:skillshare7773@gmail.com"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="glass rounded-2xl p-6 border border-primary/20 card-hover flex flex-col items-center text-center gap-4 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center neon-glow-cyan group-hover:bg-primary/20 transition-colors">
              <Mail size={22} className="text-primary" />
            </div>
            <div>
              <h3 className="font-700 text-foreground text-sm mb-1">Email Us</h3>
              <p className="text-xs text-primary font-600 break-all">skillshare7773@gmail.com</p>
            </div>
          </motion.a>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="glass rounded-2xl p-6 border border-secondary/20 card-hover flex flex-col items-center text-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center neon-glow-violet">
              <MessageSquare size={22} className="text-secondary" />
            </div>
            <div>
              <h3 className="font-700 text-foreground text-sm mb-1">Live Chat</h3>
              <p className="text-xs text-muted-foreground">Available Mon–Sat, 9am–6pm</p>
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="glass rounded-2xl p-6 border border-accent/20 card-hover flex flex-col items-center text-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center neon-glow-amber">
              <MapPin size={22} className="text-accent" />
            </div>
            <div>
              <h3 className="font-700 text-foreground text-sm mb-1">Location</h3>
              <p className="text-xs text-muted-foreground">India — Serving 127+ cities</p>
            </div>
          </motion.div>
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-muted-foreground mt-10"
        >
          © 2025 SkillShare Marketplace · Built for direct professional connections
        </motion.p>
      </div>
    </section>
  );
}
