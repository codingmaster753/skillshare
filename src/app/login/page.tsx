'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, User, Lock, Mail, Zap, CheckCircle, AlertCircle } from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';

interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

function LoginPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(
    searchParams.get('tab') === 'signup' ? 'signup' : 'login'
  );

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginShowPw, setLoginShowPw] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Signup state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirm, setSignupConfirm] = useState('');
  const [signupShowPw, setSignupShowPw] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // Load remembered credentials
  useEffect(() => {
    const remembered = localStorage.getItem('skillshare_remembered');
    if (remembered) {
      try {
        const { email } = JSON.parse(remembered);
        setLoginEmail(email);
        setRememberMe(true);
      } catch {}
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);

    await new Promise(r => setTimeout(r, 800));

    const usersRaw = localStorage.getItem('skillshare_users');
    const users: StoredUser[] = usersRaw ? JSON.parse(usersRaw) : [];
    const user = users.find(u => u.email.toLowerCase() === loginEmail.toLowerCase() && u.password === loginPassword);

    if (!user) {
      setLoginError('Invalid email or password. Please try again.');
      setIsLoading(false);
      return;
    }

    // Save session
    localStorage.setItem('skillshare_session', JSON.stringify({ id: user.id, name: user.name, email: user.email }));

    if (rememberMe) {
      localStorage.setItem('skillshare_remembered', JSON.stringify({ email: loginEmail }));
    } else {
      localStorage.removeItem('skillshare_remembered');
    }

    setIsLoading(false);
    setLoginSuccess(true);

    setTimeout(() => {
      router.push('/profile');
    }, 1500);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');

    if (!signupName.trim()) { setSignupError('Please enter your name.'); return; }
    if (!signupEmail.includes('@')) { setSignupError('Please enter a valid email.'); return; }
    if (signupPassword.length < 6) { setSignupError('Password must be at least 6 characters.'); return; }
    if (signupPassword !== signupConfirm) { setSignupError('Passwords do not match.'); return; }

    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));

    const usersRaw = localStorage.getItem('skillshare_users');
    const users: StoredUser[] = usersRaw ? JSON.parse(usersRaw) : [];

    if (users.find(u => u.email.toLowerCase() === signupEmail.toLowerCase())) {
      setSignupError('An account with this email already exists.');
      setIsLoading(false);
      return;
    }

    const newUser: StoredUser = {
      id: `user-${Date.now()}`,
      name: signupName.trim(),
      email: signupEmail.toLowerCase().trim(),
      password: signupPassword,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem('skillshare_users', JSON.stringify(users));
    localStorage.setItem('skillshare_session', JSON.stringify({ id: newUser.id, name: newUser.name, email: newUser.email }));

    setIsLoading(false);
    setSignupSuccess(true);

    setTimeout(() => {
      router.push('/profile');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden px-4">
      {/* Animated background */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] blob-primary opacity-40 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] blob-secondary opacity-30 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-2.5 mb-3">
            <AppLogo size={44} />
            <span className="font-sans font-800 text-2xl tracking-tight gradient-text">SkillShare</span>
          </Link>
          <p className="text-sm text-muted-foreground">Connect with skilled professionals directly</p>
        </div>

        {/* Card */}
        <div className="glass-strong rounded-2xl overflow-hidden shadow-2xl neon-glow-cyan">
          {/* Tab switcher */}
          <div className="flex border-b border-border">
            {(['login', 'signup'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setLoginError(''); setSignupError(''); }}
                className={`flex-1 py-4 text-sm font-700 transition-all relative ${
                  activeTab === tab ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab === 'login' ? 'Sign In' : 'Create Account'}
                {activeTab === tab && (
                  <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            ))}
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {/* LOGIN FORM */}
              {activeTab === 'login' && (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.25 }}
                >
                  {loginSuccess ? (
                    <div className="flex flex-col items-center gap-4 py-8 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center neon-glow-cyan"
                      >
                        <CheckCircle size={32} className="text-primary" />
                      </motion.div>
                      <div>
                        <h4 className="font-700 text-lg text-foreground">Welcome back!</h4>
                        <p className="text-sm text-muted-foreground mt-1">Redirecting to your profile...</p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                      <div>
                        <label className="block text-xs font-600 text-muted-foreground mb-1.5 uppercase tracking-wider">Email</label>
                        <div className="relative">
                          <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <input
                            type="email"
                            value={loginEmail}
                            onChange={e => setLoginEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className="input-glass pl-9 w-full"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-600 text-muted-foreground mb-1.5 uppercase tracking-wider">Password</label>
                        <div className="relative">
                          <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <input
                            type={loginShowPw ? 'text' : 'password'}
                            value={loginPassword}
                            onChange={e => setLoginPassword(e.target.value)}
                            placeholder="Your password"
                            required
                            className="input-glass pl-9 pr-10 w-full"
                          />
                          <button
                            type="button"
                            onClick={() => setLoginShowPw(!loginShowPw)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {loginShowPw ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="remember"
                          checked={rememberMe}
                          onChange={e => setRememberMe(e.target.checked)}
                          className="w-4 h-4 rounded accent-primary cursor-pointer"
                        />
                        <label htmlFor="remember" className="text-xs text-muted-foreground cursor-pointer select-none">
                          Remember my email
                        </label>
                      </div>

                      {loginError && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-xl px-3 py-2"
                        >
                          <AlertCircle size={14} />
                          {loginError}
                        </motion.div>
                      )}

                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-primary flex items-center justify-center gap-2 py-3 mt-1"
                      >
                        {isLoading ? (
                          <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        ) : (
                          <>
                            <Zap size={16} />
                            Sign In
                          </>
                        )}
                      </motion.button>

                      <p className="text-center text-xs text-muted-foreground">
                        Don&apos;t have an account?{' '}
                        <button type="button" onClick={() => setActiveTab('signup')} className="text-primary hover:underline font-600">
                          Create one
                        </button>
                      </p>
                    </form>
                  )}
                </motion.div>
              )}

              {/* SIGNUP FORM */}
              {activeTab === 'signup' && (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  {signupSuccess ? (
                    <div className="flex flex-col items-center gap-4 py-8 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center neon-glow-cyan"
                      >
                        <CheckCircle size={32} className="text-primary" />
                      </motion.div>
                      <div>
                        <h4 className="font-700 text-lg text-foreground">Account Created!</h4>
                        <p className="text-sm text-muted-foreground mt-1">Redirecting to your profile...</p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSignup} className="flex flex-col gap-4">
                      <div>
                        <label className="block text-xs font-600 text-muted-foreground mb-1.5 uppercase tracking-wider">Full Name</label>
                        <div className="relative">
                          <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <input
                            type="text"
                            value={signupName}
                            onChange={e => setSignupName(e.target.value)}
                            placeholder="Your full name"
                            required
                            className="input-glass pl-9 w-full"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-600 text-muted-foreground mb-1.5 uppercase tracking-wider">Email</label>
                        <div className="relative">
                          <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <input
                            type="email"
                            value={signupEmail}
                            onChange={e => setSignupEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className="input-glass pl-9 w-full"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-600 text-muted-foreground mb-1.5 uppercase tracking-wider">Password</label>
                        <div className="relative">
                          <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <input
                            type={signupShowPw ? 'text' : 'password'}
                            value={signupPassword}
                            onChange={e => setSignupPassword(e.target.value)}
                            placeholder="Min. 6 characters"
                            required
                            className="input-glass pl-9 pr-10 w-full"
                          />
                          <button
                            type="button"
                            onClick={() => setSignupShowPw(!signupShowPw)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {signupShowPw ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-600 text-muted-foreground mb-1.5 uppercase tracking-wider">Confirm Password</label>
                        <div className="relative">
                          <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <input
                            type="password"
                            value={signupConfirm}
                            onChange={e => setSignupConfirm(e.target.value)}
                            placeholder="Repeat password"
                            required
                            className="input-glass pl-9 w-full"
                          />
                        </div>
                      </div>

                      {signupError && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-xl px-3 py-2"
                        >
                          <AlertCircle size={14} />
                          {signupError}
                        </motion.div>
                      )}

                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-primary flex items-center justify-center gap-2 py-3 mt-1"
                      >
                        {isLoading ? (
                          <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        ) : (
                          <>
                            <User size={16} />
                            Create Account
                          </>
                        )}
                      </motion.button>

                      <p className="text-center text-xs text-muted-foreground">
                        Already have an account?{' '}
                        <button type="button" onClick={() => setActiveTab('login')} className="text-primary hover:underline font-600">
                          Sign in
                        </button>
                      </p>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          <Link href="/" className="hover:text-primary transition-colors">← Back to Home</Link>
        </p>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <LoginPageContent />
    </Suspense>
  );
}
