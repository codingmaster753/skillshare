'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Moon, Shield, CreditCard, Trash2, LogOut, ChevronRight, Check, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useApp } from '@/context/AppContext';

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${checked ? 'bg-primary' : 'bg-muted'}`}
      aria-checked={checked}
      role="switch"
    >
      <motion.div
        animate={{ x: checked ? 22 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
      />
    </motion.button>
  );
}

export default function SettingsTab() {
  const { isDark, toggleTheme } = useApp();
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    hireNotif: true,
    reviewNotif: true,
    marketingNotif: false,
    smsNotif: true,
    profilePublic: true,
    showPhone: false,
    showEarnings: false,
  });

  const [selectedUPI, setSelectedUPI] = useState(['PhonePe', 'Google Pay']);

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Backend: PATCH /api/profile/settings
    await new Promise(r => setTimeout(r, 1200));
    setIsSaving(false);
    toast.success('Settings saved successfully!');
  };

  const toggleUPI = (method: string) => {
    setSelectedUPI(prev =>
      prev.includes(method) ? prev.filter(p => p !== method) : [...prev, method]
    );
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl border border-border overflow-hidden"
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <Bell size={18} className="text-primary" />
          <h3 className="font-700 text-foreground text-sm">Notifications</h3>
        </div>
        <div className="divide-y divide-border">
          {[
            { key: 'hireNotif' as const, label: 'Hire Requests', desc: 'Get notified when a client wants to hire you' },
            { key: 'reviewNotif' as const, label: 'New Reviews', desc: 'Alerts when someone leaves a review' },
            { key: 'smsNotif' as const, label: 'SMS Alerts', desc: 'Receive hire alerts via SMS on your mobile' },
            { key: 'marketingNotif' as const, label: 'Tips & Updates', desc: 'Platform updates and skill improvement tips' },
          ].map(item => (
            <div key={`notif-${item.key}`} className="flex items-center justify-between px-5 py-4">
              <div>
                <div className="text-sm font-600 text-foreground">{item.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{item.desc}</div>
              </div>
              <Toggle checked={settings[item.key]} onChange={() => toggleSetting(item.key)} />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Privacy */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl border border-border overflow-hidden"
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <Shield size={18} className="text-secondary" />
          <h3 className="font-700 text-foreground text-sm">Privacy & Visibility</h3>
        </div>
        <div className="divide-y divide-border">
          {[
            { key: 'profilePublic' as const, label: 'Public Profile', desc: 'Allow anyone to find and view your profile' },
            { key: 'showPhone' as const, label: 'Show Phone Number', desc: 'Display your mobile number on your public profile' },
            { key: 'showEarnings' as const, label: 'Show Earnings Badge', desc: 'Display your total earnings on your profile' },
          ].map(item => (
            <div key={`priv-${item.key}`} className="flex items-center justify-between px-5 py-4">
              <div>
                <div className="text-sm font-600 text-foreground">{item.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{item.desc}</div>
              </div>
              <Toggle checked={settings[item.key]} onChange={() => toggleSetting(item.key)} />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Appearance */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass rounded-2xl border border-border overflow-hidden"
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <Moon size={18} className="text-accent" />
          <h3 className="font-700 text-foreground text-sm">Appearance</h3>
        </div>
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <div className="text-sm font-600 text-foreground">Dark Mode</div>
            <div className="text-xs text-muted-foreground mt-0.5">Switch between dark and light interface</div>
          </div>
          <Toggle checked={isDark} onChange={toggleTheme} />
        </div>
      </motion.div>

      {/* Payment Methods */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl border border-border overflow-hidden"
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <CreditCard size={18} className="text-primary" />
          <h3 className="font-700 text-foreground text-sm">UPI Payment Methods</h3>
        </div>
        <div className="px-5 py-4">
          <p className="text-xs text-muted-foreground mb-4">Select which UPI methods you accept from clients</p>
          <div className="flex flex-col gap-3">
            {[
              { id: 'PhonePe', emoji: '📱', desc: 'PhonePe UPI', color: 'text-purple-400' },
              { id: 'Google Pay', emoji: '🔵', desc: 'Google Pay', color: 'text-blue-400' },
              { id: 'Paytm', emoji: '💳', desc: 'Paytm UPI', color: 'text-cyan-400' },
            ].map(method => {
              const isSelected = selectedUPI.includes(method.id);
              return (
                <button
                  key={`upi-setting-${method.id}`}
                  onClick={() => toggleUPI(method.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left ${
                    isSelected ? 'border-primary/30 bg-primary/5' : 'border-border hover:border-primary/20'
                  }`}
                >
                  <span className="text-xl">{method.emoji}</span>
                  <span className={`text-sm font-600 flex-1 ${method.color}`}>{method.desc}</span>
                  {isSelected && <Check size={16} className="text-primary" />}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Save button */}
      <motion.button
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        onClick={handleSave}
        disabled={isSaving}
        className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 text-sm font-700"
      >
        {isSaving ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Check size={16} />
            Save Settings
          </>
        )}
      </motion.button>

      {/* Danger zone */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="glass rounded-2xl border border-red-500/20 overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-red-500/10">
          <h3 className="font-700 text-red-400 text-sm">Danger Zone</h3>
        </div>
        <div className="divide-y divide-border">
          <button
            onClick={() => toast.error('Sign out functionality — connect to auth provider')}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-red-500/5 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <LogOut size={16} className="text-muted-foreground group-hover:text-red-400 transition-colors" />
              <div className="text-left">
                <div className="text-sm font-600 text-foreground group-hover:text-red-400 transition-colors">Sign Out</div>
                <div className="text-xs text-muted-foreground">Sign out from your SkillShare account</div>
              </div>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
          <button
            onClick={() => toast.error('Account deletion requires confirmation — connect to backend')}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-red-500/5 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <Trash2 size={16} className="text-muted-foreground group-hover:text-red-400 transition-colors" />
              <div className="text-left">
                <div className="text-sm font-600 text-foreground group-hover:text-red-400 transition-colors">Delete Account</div>
                <div className="text-xs text-muted-foreground">Permanently remove your profile and all data</div>
              </div>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}