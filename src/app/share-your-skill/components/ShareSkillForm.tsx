'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { User, Mail, Phone, Briefcase, MapPin, CreditCard, ChevronRight, ChevronLeft, CheckCircle, Loader2, Zap, Star, FileText, Clock, Award } from 'lucide-react';
import { useApp, Professional } from '@/context/AppContext';
import Icon from '@/components/ui/AppIcon';


interface SkillFormData {
  // Step 1 — Personal
  name: string;
  email: string;
  mobile: string;
  city: string;
  area: string;
  // Step 2 — Skill
  skillTitle: string;
  category: string;
  description: string;
  experience: number;
  skills: string;
  // Step 3 — Service & Pricing
  serviceFrom: string;
  serviceTo: string;
  hourlyRate: number;
  availability: 'online' | 'busy' | 'offline';
  // Step 4 — Payment
  phonepe: boolean;
  googlepay: boolean;
  paytm: boolean;
}

const CATEGORIES = ['Technology', 'Design', 'Home Services', 'Fitness', 'Education', 'Finance', 'Healthcare', 'Photography', 'Music', 'Cooking'];
const CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Ahmedabad', 'Jaipur', 'Kolkata', 'Surat'];

const STEPS = [
  { id: 1, label: 'Personal Info', icon: User },
  { id: 2, label: 'Skill Details', icon: Briefcase },
  { id: 3, label: 'Service Area & Pricing', icon: MapPin },
  { id: 4, label: 'Payment Methods', icon: CreditCard },
];

const cityCoords: Record<string, { lat: number; lng: number }> = {
  Mumbai: { lat: 19.076, lng: 72.877 },
  Delhi: { lat: 28.613, lng: 77.209 },
  Bangalore: { lat: 12.971, lng: 77.594 },
  Pune: { lat: 18.520, lng: 73.856 },
  Hyderabad: { lat: 17.385, lng: 78.486 },
  Chennai: { lat: 13.083, lng: 80.270 },
  Ahmedabad: { lat: 23.022, lng: 72.571 },
  Jaipur: { lat: 26.912, lng: 75.787 },
  Kolkata: { lat: 22.572, lng: 88.363 },
  Surat: { lat: 21.170, lng: 72.831 },
};

export default function ShareSkillForm() {
  const { addProfessional, addNotification } = useApp();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<SkillFormData>({ mode: 'onChange' });

  const watchedCity = watch('city');

  const stepFields: Record<number, (keyof SkillFormData)[]> = {
    1: ['name', 'email', 'mobile', 'city', 'area'],
    2: ['skillTitle', 'category', 'description', 'experience'],
    3: ['serviceFrom', 'serviceTo', 'hourlyRate', 'availability'],
    4: [],
  };

  const handleNext = async () => {
    const valid = await trigger(stepFields[step]);
    if (valid) setStep(s => Math.min(s + 1, 4));
  };

  const togglePayment = (method: string) => {
    setSelectedPayments(prev =>
      prev.includes(method) ? prev.filter(p => p !== method) : [...prev, method]
    );
  };

  const onSubmit = async (data: SkillFormData) => {
    if (selectedPayments.length === 0) {
      toast.error('Please select at least one payment method.');
      return;
    }
    setIsSubmitting(true);

    // Backend: POST /api/professionals — create professional profile
    await new Promise(r => setTimeout(r, 2200));

    const coords = cityCoords[data.city] || { lat: 20.5937, lng: 78.9629 };

    const newPro: Professional = {
      id: `pro-${Date.now()}`,
      name: data.name,
      avatar: `https://i.pravatar.cc/150?u=${data.email}`,
      skill: data.skillTitle,
      category: data.category,
      rating: 0,
      reviewCount: 0,
      city: data.city,
      area: data.area,
      experience: Number(data.experience),
      hourlyRate: Number(data.hourlyRate),
      availability: data.availability,
      verified: false,
      phone: data.mobile,
      description: data.description,
      lat: coords.lat + (Math.random() * 0.05 - 0.025),
      lng: coords.lng + (Math.random() * 0.05 - 0.025),
      paymentMethods: selectedPayments,
      completedJobs: 0,
      responseTime: '< 30 min',
      skills: data.skills ? data.skills.split(',').map(s => s.trim()) : [data.skillTitle],
    };

    addProfessional(newPro);
    addNotification({
      id: `notif-${Date.now()}`,
      type: 'accepted',
      message: `Your skill "${data.skillTitle}" has been listed on SkillShare`,
      time: 'Just now',
      read: false,
    });

    setIsSubmitting(false);
    setSubmitted(true);

    toast.success('🎉 Your skill has been listed! You\'re now visible on the map.', {
      position: 'bottom-right',
      autoClose: 5000,
    });
  };

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction > 0 ? -60 : 60, opacity: 0 }),
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="glass-strong rounded-3xl p-10 max-w-md w-full text-center neon-glow-cyan"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
            className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 neon-glow-cyan"
          >
            <CheckCircle size={40} className="text-primary" />
          </motion.div>
          <h2 className="text-2xl font-800 text-foreground mb-2">You're Live! 🎉</h2>
          <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
            Your skill has been listed on SkillShare. You're now visible on the map and can start receiving hire requests immediately.
          </p>
          <div className="flex flex-col gap-3">
            <div className="glass rounded-xl p-3 flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Star size={16} className="text-primary" />
              </div>
              <div>
                <div className="text-xs font-700 text-foreground">Profile under review</div>
                <div className="text-xs text-muted-foreground">Verification within 24 hrs</div>
              </div>
            </div>
            <div className="glass rounded-xl p-3 flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <Zap size={16} className="text-secondary" />
              </div>
              <div>
                <div className="text-xs font-700 text-foreground">Now visible on map</div>
                <div className="text-xs text-muted-foreground">Hire requests incoming</div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <a href="/" className="btn-primary flex-1 text-center">View Marketplace</a>
            <a href="/profile" className="btn-secondary flex-1 text-center">My Profile</a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen py-12">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient pointer-events-none" />
      <div className="absolute top-20 right-10 w-80 h-80 blob-secondary opacity-20 pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-80 h-80 blob-primary opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="text-xs font-700 text-primary uppercase tracking-widest mb-3 block">Join SkillShare</span>
          <h1 className="text-hero-md text-foreground mb-2">
            Share Your <span className="gradient-text">Skill</span>
          </h1>
          <p className="text-muted-foreground text-sm">
            List your skill and start receiving direct hire requests — no commission, instant UPI payments.
          </p>
        </motion.div>

        {/* Step Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-border z-0">
              <motion.div
                className="h-full"
                style={{ background: 'linear-gradient(90deg, var(--primary), var(--secondary))' }}
                animate={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            {STEPS.map(s => {
              const Icon = s.icon;
              const isComplete = step > s.id;
              const isActive = step === s.id;
              return (
                <div key={`step-${s.id}`} className="flex flex-col items-center gap-2 z-10">
                  <motion.div
                    animate={{
                      background: isComplete ? 'var(--primary)' : isActive ? 'rgba(6,182,212,0.15)' : 'var(--muted)',
                      borderColor: isComplete || isActive ? 'var(--primary)' : 'var(--border)',
                    }}
                    className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all"
                  >
                    {isComplete ? (
                      <CheckCircle size={18} className="text-primary-foreground" />
                    ) : (
                      <Icon size={16} className={isActive ? 'text-primary' : 'text-muted-foreground'} />
                    )}
                  </motion.div>
                  <span className={`text-xs font-600 hidden sm:block ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-3xl overflow-hidden neon-glow-cyan"
        >
          <div className="px-6 lg:px-8 py-6 border-b border-border">
            <h2 className="font-700 text-foreground text-lg">
              Step {step}: {STEPS[step - 1].label}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {step === 1 && 'Tell us who you are so clients can trust you'}
              {step === 2 && 'Describe your skill and experience in detail'}
              {step === 3 && 'Define where you work and how much you charge'}
              {step === 4 && 'Choose how clients will pay you directly'}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait" custom={step}>
              <motion.div
                key={`form-step-${step}`}
                custom={step}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="px-6 lg:px-8 py-6"
              >
                {/* STEP 1 — Personal Info */}
                {step === 1 && (
                  <div className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-600 text-muted-foreground mb-1.5 uppercase tracking-wider">
                          Full Name <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <input
                            {...register('name', { required: 'Full name is required', minLength: { value: 2, message: 'Name too short' } })}
                            placeholder="Arjun Mehta"
                            className="input-glass pl-9"
                          />
                        </div>
                        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-600 text-muted-foreground mb-1.5 uppercase tracking-wider">
                          Email Address <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <input
                            {...register('email', {
                              required: 'Email is required',
                              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' }
                            })}
                            type="email"
                            placeholder="arjun@gmail.com"
                            className="input-glass pl-9"
                          />
                        </div>
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-600 text-muted-foreground mb-1.5 uppercase tracking-wider">
                        Mobile Number <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <span className="absolute left-9 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">+91</span>
                        <input
                          {...register('mobile', {
                            required: 'Mobile number is required',
                            pattern: { value: /^[6-9]\d{9}$/, message: 'Enter valid 10-digit mobile number' }
                          })}
                          placeholder="9876543210"
                          className="input-glass pl-16"
                        />
                      </div>
                      {errors.mobile && <p className="text-red-400 text-xs mt-1">{errors.mobile.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-600 text-muted-foreground mb-1.5 uppercase tracking-wider">
                          City <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <select
                            {...register('city', { required: 'Please select your city' })}
                            className="input-glass pl-9 appearance-none cursor-pointer"
                          >
                            <option value="">Select city</option>
                            {CITIES.map(c => <option key={`city-opt-${c}`} value={c}>{c}</option>)}
                          </select>
                        </div>
                        {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city.message}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-600 text-muted-foreground mb-1.5 uppercase tracking-wider">
                          Area / Locality <span className="text-red-400">*</span>
                        </label>
                        <input
                          {...register('area', { required: 'Area is required' })}
                          placeholder="e.g. Andheri West"
                          className="input-glass"
                        />
                        {errors.area && <p className="text-red-400 text-xs mt-1">{errors.area.message}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2 — Skill Details */}
                {step === 2 && (
                  <div className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-600 text-muted-foreground mb-1.5 uppercase tracking-wider">
                          Skill Title <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <Briefcase size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <input
                            {...register('skillTitle', { required: 'Skill title is required', minLength: { value: 3, message: 'Too short' } })}
                            placeholder="e.g. Full Stack Developer"
                            className="input-glass pl-9"
                          />
                        </div>
                        {errors.skillTitle && <p className="text-red-400 text-xs mt-1">{errors.skillTitle.message}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-600 text-muted-foreground mb-1.5 uppercase tracking-wider">
                          Category <span className="text-red-400">*</span>
                        </label>
                        <select
                          {...register('category', { required: 'Category is required' })}
                          className="input-glass appearance-none cursor-pointer"
                        >
                          <option value="">Select category</option>
                          {CATEGORIES.map(c => <option key={`cat-opt-${c}`} value={c}>{c}</option>)}
                        </select>
                        {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-600 text-muted-foreground mb-1.5 uppercase tracking-wider">
                        Service Description <span className="text-red-400">*</span>
                      </label>
                      <p className="text-xs text-muted-foreground mb-1.5">Describe what you offer, your approach, and what clients can expect.</p>
                      <div className="relative">
                        <FileText size={15} className="absolute left-3 top-3.5 text-muted-foreground" />
                        <textarea
                          {...register('description', {
                            required: 'Description is required',
                            minLength: { value: 30, message: 'Please write at least 30 characters' }
                          })}
                          placeholder="I specialize in building scalable React + Node.js applications. I offer project-based and hourly engagements..."
                          rows={4}
                          className="input-glass pl-9 resize-none"
                        />
                      </div>
                      {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-600 text-muted-foreground mb-1.5 uppercase tracking-wider">
                          Years of Experience <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <Award size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <input
                            {...register('experience', {
                              required: 'Experience is required',
                              min: { value: 0, message: 'Must be 0 or more' },
                              max: { value: 50, message: 'Too many years' }
                            })}
                            type="number"
                            min={0}
                            max={50}
                            placeholder="5"
                            className="input-glass pl-9"
                          />
                        </div>
                        {errors.experience && <p className="text-red-400 text-xs mt-1">{errors.experience.message}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-600 text-muted-foreground mb-1.5 uppercase tracking-wider">
                          Key Skills (comma separated)
                        </label>
                        <input
                          {...register('skills')}
                          placeholder="React, Node.js, AWS"
                          className="input-glass"
                        />
                        <p className="text-xs text-muted-foreground mt-1">e.g. React, Node.js, Figma</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3 — Service Area & Pricing */}
                {step === 3 && (
                  <div className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-600 text-muted-foreground mb-1.5 uppercase tracking-wider">
                          Service From (City) <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                          <select
                            {...register('serviceFrom', { required: 'Service area start is required' })}
                            className="input-glass pl-9 appearance-none cursor-pointer"
                          >
                            <option value="">Select start city</option>
                            {CITIES.map(c => <option key={`sf-${c}`} value={c}>{c}</option>)}
                          </select>
                        </div>
                        {errors.serviceFrom && <p className="text-red-400 text-xs mt-1">{errors.serviceFrom.message}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-600 text-muted-foreground mb-1.5 uppercase tracking-wider">
                          Service To (City) <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
                          <select
                            {...register('serviceTo', { required: 'Service area end is required' })}
                            className="input-glass pl-9 appearance-none cursor-pointer"
                          >
                            <option value="">Select end city</option>
                            {CITIES.map(c => <option key={`st-${c}`} value={c}>{c}</option>)}
                          </select>
                        </div>
                        {errors.serviceTo && <p className="text-red-400 text-xs mt-1">{errors.serviceTo.message}</p>}
                      </div>
                    </div>

                    {/* Service area info */}
                    <div className="glass rounded-xl p-4 flex items-start gap-3">
                      <MapPin size={18} className="text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-600 text-foreground">Service Area Coverage</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Your profile will appear on the map for all seekers within your selected service range. You can also offer remote / online services.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-600 text-muted-foreground mb-1.5 uppercase tracking-wider">
                          Hourly Rate (₹) <span className="text-red-400">*</span>
                        </label>
                        <p className="text-xs text-muted-foreground mb-1.5">Set a competitive rate. You can negotiate with clients directly.</p>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-600 text-sm">₹</span>
                          <input
                            {...register('hourlyRate', {
                              required: 'Hourly rate is required',
                              min: { value: 100, message: 'Minimum ₹100/hr' },
                              max: { value: 10000, message: 'Maximum ₹10,000/hr' }
                            })}
                            type="number"
                            min={100}
                            max={10000}
                            placeholder="800"
                            className="input-glass pl-7"
                          />
                        </div>
                        {errors.hourlyRate && <p className="text-red-400 text-xs mt-1">{errors.hourlyRate.message}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-600 text-muted-foreground mb-1.5 uppercase tracking-wider">
                          Current Availability <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <Clock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <select
                            {...register('availability', { required: 'Availability is required' })}
                            className="input-glass pl-9 appearance-none cursor-pointer"
                          >
                            <option value="online">● Online — Available now</option>
                            <option value="busy">◐ Busy — Limited availability</option>
                            <option value="offline">○ Offline — Not available</option>
                          </select>
                        </div>
                        {errors.availability && <p className="text-red-400 text-xs mt-1">{errors.availability.message}</p>}
                      </div>
                    </div>

                    {/* Pricing tips */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { range: '₹200–500', label: 'Home Services', desc: 'Electricians, Plumbers' },
                        { range: '₹500–1200', label: 'Creative / Education', desc: 'Designers, Tutors' },
                        { range: '₹1000–3000', label: 'Tech / Finance', desc: 'Developers, CAs' },
                      ].map(tip => (
                        <div key={`tip-${tip.label}`} className="glass rounded-xl p-3 text-center">
                          <div className="font-700 text-primary text-sm">{tip.range}</div>
                          <div className="text-xs font-600 text-foreground mt-0.5">{tip.label}</div>
                          <div className="text-xs text-muted-foreground">{tip.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 4 — Payment Methods */}
                {step === 4 && (
                  <div className="flex flex-col gap-5">
                    <p className="text-sm text-muted-foreground">
                      Select the UPI payment methods you accept. Clients will pay you directly — no commission taken by SkillShare.
                    </p>

                    <div className="flex flex-col gap-4">
                      {[
                        {
                          id: 'PhonePe',
                          name: 'PhonePe',
                          emoji: '📱',
                          color: 'text-purple-400',
                          bg: 'bg-purple-400/10',
                          border: 'border-purple-400/30',
                          activeBg: 'bg-purple-400/20',
                          desc: 'India\'s #1 UPI app — 500M+ users',
                        },
                        {
                          id: 'Google Pay',
                          name: 'Google Pay',
                          emoji: '🔵',
                          color: 'text-blue-400',
                          bg: 'bg-blue-400/10',
                          border: 'border-blue-400/30',
                          activeBg: 'bg-blue-400/20',
                          desc: 'Fast, secure payments via Google',
                        },
                        {
                          id: 'Paytm',
                          name: 'Paytm',
                          emoji: '💳',
                          color: 'text-cyan-400',
                          bg: 'bg-cyan-400/10',
                          border: 'border-cyan-400/30',
                          activeBg: 'bg-cyan-400/20',
                          desc: 'UPI + Wallet — widest acceptance',
                        },
                      ].map(method => {
                        const isSelected = selectedPayments.includes(method.id);
                        return (
                          <motion.button
                            key={`pay-method-${method.id}`}
                            type="button"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => togglePayment(method.id)}
                            className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
                              isSelected
                                ? `${method.activeBg} ${method.border}`
                                : 'glass border-border hover:border-primary/30'
                            }`}
                          >
                            <div className={`w-12 h-12 rounded-xl ${method.bg} flex items-center justify-center text-2xl flex-shrink-0`}>
                              {method.emoji}
                            </div>
                            <div className="flex-1">
                              <div className={`font-700 text-sm ${isSelected ? method.color : 'text-foreground'}`}>
                                {method.name}
                              </div>
                              <div className="text-xs text-muted-foreground mt-0.5">{method.desc}</div>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                              isSelected ? `${method.border} ${method.bg}` : 'border-border'
                            }`}>
                              {isSelected && <div className={`w-2.5 h-2.5 rounded-full ${method.color.replace('text-', 'bg-')}`} />}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>

                    {selectedPayments.length === 0 && (
                      <p className="text-amber-400 text-xs flex items-center gap-1.5">
                        <span>⚠️</span> Please select at least one payment method to continue.
                      </p>
                    )}

                    {/* Summary card */}
                    <div className="glass rounded-2xl p-5 border border-primary/20">
                      <h3 className="font-700 text-foreground text-sm mb-3 flex items-center gap-2">
                        <CheckCircle size={16} className="text-primary" />
                        Review Your Listing
                      </h3>
                      <div className="grid grid-cols-2 gap-y-2 text-xs">
                        {[
                          { label: 'Skill', value: watch('skillTitle') || '—' },
                          { label: 'Category', value: watch('category') || '—' },
                          { label: 'City', value: watch('city') || '—' },
                          { label: 'Experience', value: watch('experience') ? `${watch('experience')} years` : '—' },
                          { label: 'Rate', value: watch('hourlyRate') ? `₹${watch('hourlyRate')}/hr` : '—' },
                          { label: 'Availability', value: watch('availability') || '—' },
                        ].map(row => (
                          <div key={`summary-${row.label}`}>
                            <span className="text-muted-foreground">{row.label}: </span>
                            <span className="text-foreground font-600">{row.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="px-6 lg:px-8 py-5 border-t border-border flex items-center justify-between">
              <motion.button
                type="button"
                whileHover={{ scale: step > 1 ? 1.03 : 1 }}
                whileTap={{ scale: step > 1 ? 0.97 : 1 }}
                onClick={() => setStep(s => Math.max(s - 1, 1))}
                disabled={step === 1}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-600 transition-all ${
                  step === 1
                    ? 'text-muted-foreground cursor-not-allowed opacity-40'
                    : 'btn-secondary'
                }`}
              >
                <ChevronLeft size={16} />
                Back
              </motion.button>

              <div className="flex items-center gap-2">
                {STEPS.map(s => (
                  <div
                    key={`dot-${s.id}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      s.id === step ? 'w-6 bg-primary' : s.id < step ? 'w-3 bg-primary/40' : 'w-3 bg-muted'
                    }`}
                  />
                ))}
              </div>

              {step < 4 ? (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleNext}
                  className="btn-primary flex items-center gap-2 px-5 py-2.5 text-sm"
                >
                  Next
                  <ChevronRight size={16} />
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={isSubmitting || selectedPayments.length === 0}
                  whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-700 transition-all ${
                    isSubmitting || selectedPayments.length === 0
                      ? 'bg-muted text-muted-foreground cursor-not-allowed'
                      : 'btn-primary'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Listing Skill...
                    </>
                  ) : (
                    <>
                      <Zap size={16} />
                      Go Live!
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}