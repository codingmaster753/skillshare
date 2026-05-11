'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, MessageSquare, Clock, CheckCircle, Loader2, Calendar } from 'lucide-react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import { useApp } from '@/context/AppContext';

interface HireFormData {
  seekerName: string;
  seekerPhone: string;
  time: string;
  message: string;
}

export default function HireModal() {
  const { isHireModalOpen, setIsHireModalOpen, selectedProfessional, addHireRequest, addNotification } = useApp();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<HireFormData>();

  const onClose = () => {
    setIsHireModalOpen(false);
    setSubmitted(false);
    reset();
    setSelectedDate(null);
  };

  const onSubmit = async (data: HireFormData) => {
    if (!selectedDate) {
      toast.error('Please select a date for the service.');
      return;
    }
    setIsSubmitting(true);

    // Simulate API call — backend: POST /api/hire-requests
    await new Promise(r => setTimeout(r, 1800));

    const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth()+1).padStart(2,'0')}-${String(selectedDate.getDate()).padStart(2,'0')}`;

    addHireRequest({
      id: `hire-${Date.now()}`,
      professionalId: selectedProfessional?.id || '',
      professionalName: selectedProfessional?.name || '',
      skill: selectedProfessional?.skill || '',
      seekerName: data.seekerName,
      seekerPhone: data.seekerPhone,
      date: dateStr,
      time: data.time,
      message: data.message,
      status: 'pending',
      createdAt: dateStr,
      amount: (selectedProfessional?.hourlyRate || 0) * 2,
    });

    addNotification({
      id: `notif-${Date.now()}`,
      type: 'hire_request',
      message: `Your hire request for ${selectedProfessional?.name} has been sent`,
      time: 'Just now',
      read: false,
    });

    setIsSubmitting(false);
    setSubmitted(true);

    toast.success(`🎉 Hire request sent to ${selectedProfessional?.name}!`, {
      position: 'bottom-right',
      autoClose: 4000,
    });
  };

  return (
    <AnimatePresence>
      {isHireModalOpen && selectedProfessional && (
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
            className="relative w-full max-w-lg glass-strong rounded-2xl overflow-hidden shadow-2xl neon-glow-cyan"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-3">
                <img
                  src={selectedProfessional.avatar}
                  alt={`${selectedProfessional.name} profile photo`}
                  className="w-10 h-10 rounded-full object-cover border-2 border-primary/30"
                />
                <div>
                  <h3 className="font-700 text-foreground text-sm">{selectedProfessional.name}</h3>
                  <p className="text-xs text-primary">{selectedProfessional.skill}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-800 gradient-text">₹{selectedProfessional.hourlyRate}/hr</span>
                <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors ml-2">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-4 py-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                      className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center neon-glow-cyan"
                    >
                      <CheckCircle size={32} className="text-primary" />
                    </motion.div>
                    <div>
                      <h4 className="font-700 text-lg text-foreground">Request Sent!</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {selectedProfessional.name} will respond within {selectedProfessional.responseTime}
                      </p>
                    </div>
                    <button onClick={onClose} className="btn-primary mt-2">
                      Done
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-xs font-600 text-muted-foreground mb-1.5 uppercase tracking-wider">
                          Your Name
                        </label>
                        <div className="relative">
                          <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <input
                            {...register('seekerName', { required: 'Name is required' })}
                            placeholder="Rohit Sharma"
                            className="input-glass pl-9"
                          />
                        </div>
                        {errors.seekerName && (
                          <p className="text-red-400 text-xs mt-1">{errors.seekerName.message}</p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-xs font-600 text-muted-foreground mb-1.5 uppercase tracking-wider">
                          Mobile Number
                        </label>
                        <div className="relative">
                          <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <input
                            {...register('seekerPhone', {
                              required: 'Phone is required',
                              pattern: { value: /^[6-9]\d{9}$/, message: 'Enter valid 10-digit mobile' }
                            })}
                            placeholder="9876543210"
                            className="input-glass pl-9"
                          />
                        </div>
                        {errors.seekerPhone && (
                          <p className="text-red-400 text-xs mt-1">{errors.seekerPhone.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Date */}
                      <div>
                        <label className="block text-xs font-600 text-muted-foreground mb-1.5 uppercase tracking-wider">
                          Service Date
                        </label>
                        <div className="relative">
                          <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10 pointer-events-none" />
                          <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            minDate={new Date()}
                            placeholderText="Select date"
                            className="input-glass pl-9 w-full"
                            dateFormat="dd/MM/yyyy"
                          />
                        </div>
                      </div>

                      {/* Time */}
                      <div>
                        <label className="block text-xs font-600 text-muted-foreground mb-1.5 uppercase tracking-wider">
                          Preferred Time
                        </label>
                        <div className="relative">
                          <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <select
                            {...register('time', { required: 'Please select time' })}
                            className="input-glass pl-9 appearance-none cursor-pointer"
                          >
                            <option value="">Select time</option>
                            {['08:00 AM','09:00 AM','10:00 AM','11:00 AM','12:00 PM','01:00 PM','02:00 PM','03:00 PM','04:00 PM','05:00 PM','06:00 PM','07:00 PM'].map(t => (
                              <option key={`time-${t}`} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                        {errors.time && (
                          <p className="text-red-400 text-xs mt-1">{errors.time.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-600 text-muted-foreground mb-1.5 uppercase tracking-wider">
                        Service Details
                      </label>
                      <div className="relative">
                        <MessageSquare size={16} className="absolute left-3 top-3.5 text-muted-foreground" />
                        <textarea
                          {...register('message', { required: 'Please describe what you need' })}
                          placeholder="Describe what you need help with..."
                          rows={3}
                          className="input-glass pl-9 resize-none"
                        />
                      </div>
                      {errors.message && (
                        <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    {/* Payment note */}
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-muted/30 border border-border">
                      <span className="text-xs text-muted-foreground">
                        Payment via: {selectedProfessional.paymentMethods.join(' · ')}
                      </span>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary flex items-center justify-center gap-2 w-full py-3.5"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Sending Request...
                        </>
                      ) : (
                        <>Send Hire Request</>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}