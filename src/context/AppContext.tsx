'use client';
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type AvailabilityStatus = 'online' | 'busy' | 'offline';

export interface Professional {
  id: string;
  name: string;
  avatar: string;
  skill: string;
  category: string;
  rating: number;
  reviewCount: number;
  city: string;
  area: string;
  experience: number;
  hourlyRate: number;
  availability: AvailabilityStatus;
  verified: boolean;
  phone: string;
  description: string;
  lat: number;
  lng: number;
  paymentMethods: string[];
  completedJobs: number;
  responseTime: string;
  skills: string[];
}

export interface HireRequest {
  id: string;
  professionalId: string;
  professionalName: string;
  skill: string;
  seekerName: string;
  seekerPhone: string;
  date: string;
  time: string;
  message: string;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  createdAt: string;
  amount: number;
}

export interface Notification {
  id: string;
  type: 'hire_request' | 'accepted' | 'completed' | 'review';
  message: string;
  time: string;
  read: boolean;
  professionalName?: string;
}

interface AppContextType {
  professionals: Professional[];
  addProfessional: (p: Professional) => void;
  hireRequests: HireRequest[];
  addHireRequest: (r: HireRequest) => void;
  notifications: Notification[];
  addNotification: (n: Notification) => void;
  markAllRead: () => void;
  unreadCount: number;
  isDark: boolean;
  toggleTheme: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filterCategory: string;
  setFilterCategory: (c: string) => void;
  selectedProfessional: Professional | null;
  setSelectedProfessional: (p: Professional | null) => void;
  isHireModalOpen: boolean;
  setIsHireModalOpen: (v: boolean) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const INITIAL_PROFESSIONALS: Professional[] = [
  {
    id: 'pro-001', name: 'Arjun Mehta', avatar: 'https://i.pravatar.cc/150?img=11',
    skill: 'Full Stack Developer', category: 'Technology', rating: 4.9, reviewCount: 127,
    city: 'Mumbai', area: 'Andheri West', experience: 6, hourlyRate: 1200,
    availability: 'online', verified: true, phone: '+91 98765 43210',
    description: 'Expert in React, Node.js, and cloud deployment. Available for freelance projects and short-term contracts.',
    lat: 19.1136, lng: 72.8697, paymentMethods: ['PhonePe', 'Google Pay'],
    completedJobs: 243, responseTime: '< 5 min', skills: ['React', 'Node.js', 'AWS', 'MongoDB'],
  },
  {
    id: 'pro-002', name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?img=5',
    skill: 'Interior Designer', category: 'Design', rating: 4.8, reviewCount: 89,
    city: 'Delhi', area: 'Hauz Khas', experience: 8, hourlyRate: 900,
    availability: 'online', verified: true, phone: '+91 87654 32109',
    description: 'Transforming spaces with contemporary Indian aesthetics. Residential and commercial projects.',
    lat: 28.5494, lng: 77.2001, paymentMethods: ['Paytm', 'Google Pay'],
    completedJobs: 156, responseTime: '< 15 min', skills: ['3D Modeling', 'AutoCAD', 'Space Planning'],
  },
  {
    id: 'pro-003', name: 'Ravi Kumar', avatar: 'https://i.pravatar.cc/150?img=15',
    skill: 'Electrician', category: 'Home Services', rating: 4.7, reviewCount: 312,
    city: 'Bangalore', area: 'Koramangala', experience: 12, hourlyRate: 450,
    availability: 'busy', verified: true, phone: '+91 76543 21098',
    description: 'Licensed electrician for residential wiring, panel upgrades, and emergency repairs. 24/7 availability.',
    lat: 12.9352, lng: 77.6245, paymentMethods: ['PhonePe', 'Paytm'],
    completedJobs: 891, responseTime: '< 30 min', skills: ['Wiring', 'Panel Upgrade', 'Solar Installation'],
  },
  {
    id: 'pro-004', name: 'Anjali Nair', avatar: 'https://i.pravatar.cc/150?img=20',
    skill: 'Yoga & Wellness Coach', category: 'Fitness', rating: 5.0, reviewCount: 64,
    city: 'Pune', area: 'Koregaon Park', experience: 5, hourlyRate: 600,
    availability: 'online', verified: true, phone: '+91 65432 10987',
    description: 'Certified yoga instructor and mindfulness coach. Online and in-person sessions available.',
    lat: 18.5362, lng: 73.8939, paymentMethods: ['Google Pay', 'PhonePe'],
    completedJobs: 178, responseTime: '< 10 min', skills: ['Hatha Yoga', 'Pranayama', 'Meditation'],
  },
  {
    id: 'pro-005', name: 'Sanjay Patel', avatar: 'https://i.pravatar.cc/150?img=33',
    skill: 'Plumber', category: 'Home Services', rating: 4.6, reviewCount: 445,
    city: 'Ahmedabad', area: 'Navrangpura', experience: 15, hourlyRate: 350,
    availability: 'online', verified: true, phone: '+91 54321 09876',
    description: 'Expert plumbing solutions — leaks, pipe fitting, bathroom renovations, and water heater installations.',
    lat: 23.0225, lng: 72.5714, paymentMethods: ['Paytm', 'PhonePe'],
    completedJobs: 1203, responseTime: '< 20 min', skills: ['Pipe Fitting', 'Drainage', 'Bathroom Reno'],
  },
  {
    id: 'pro-006', name: 'Meera Reddy', avatar: 'https://i.pravatar.cc/150?img=44',
    skill: 'UI/UX Designer', category: 'Design', rating: 4.9, reviewCount: 73,
    city: 'Hyderabad', area: 'Gachibowli', experience: 4, hourlyRate: 1100,
    availability: 'online', verified: true, phone: '+91 43210 98765',
    description: 'Product designer specializing in fintech and edtech apps. Figma, Prototyping, User Research.',
    lat: 17.4401, lng: 78.3489, paymentMethods: ['Google Pay'],
    completedJobs: 92, responseTime: '< 8 min', skills: ['Figma', 'Prototyping', 'Research', 'Framer'],
  },
  {
    id: 'pro-007', name: 'Karan Singh', avatar: 'https://i.pravatar.cc/150?img=60',
    skill: 'Math & Science Tutor', category: 'Education', rating: 4.8, reviewCount: 198,
    city: 'Jaipur', area: 'Vaishali Nagar', experience: 7, hourlyRate: 500,
    availability: 'busy', verified: false, phone: '+91 32109 87654',
    description: 'IIT graduate offering personalized tutoring for Class 9-12 and JEE/NEET preparation.',
    lat: 26.9124, lng: 75.7873, paymentMethods: ['PhonePe', 'Paytm'],
    completedJobs: 456, responseTime: '< 1 hr', skills: ['Mathematics', 'Physics', 'Chemistry', 'JEE Prep'],
  },
  {
    id: 'pro-008', name: 'Deepa Krishnan', avatar: 'https://i.pravatar.cc/150?img=47',
    skill: 'Chartered Accountant', category: 'Finance', rating: 4.9, reviewCount: 156,
    city: 'Chennai', area: 'T. Nagar', experience: 10, hourlyRate: 1500,
    availability: 'offline', verified: true, phone: '+91 21098 76543',
    description: 'CA with expertise in GST filing, income tax returns, and startup financial planning.',
    lat: 13.0418, lng: 80.2341, paymentMethods: ['Google Pay', 'Paytm'],
    completedJobs: 334, responseTime: '< 2 hrs', skills: ['GST', 'Income Tax', 'Audit', 'Startup Finance'],
  },
];

const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: 'notif-001', type: 'hire_request', message: 'Rahul Verma wants to hire you for Plumbing work', time: '2 min ago', read: false, professionalName: 'Rahul Verma' },
  { id: 'notif-002', type: 'accepted', message: 'Arjun Mehta accepted your hire request', time: '15 min ago', read: false, professionalName: 'Arjun Mehta' },
  { id: 'notif-003', type: 'review', message: 'New 5-star review from Pooja Agarwal', time: '1 hr ago', read: false },
  { id: 'notif-004', type: 'completed', message: 'Job with Priya Sharma marked as completed', time: '3 hrs ago', read: true },
  { id: 'notif-005', type: 'hire_request', message: 'Vikram Nair wants to hire you for UI Design', time: '5 hrs ago', read: true },
];

const INITIAL_HIRE_REQUESTS: HireRequest[] = [
  { id: 'hire-001', professionalId: 'pro-001', professionalName: 'Arjun Mehta', skill: 'Full Stack Developer', seekerName: 'Rohit Desai', seekerPhone: '+91 99887 76655', date: '2026-05-12', time: '10:00 AM', message: 'Need a React dashboard built urgently', status: 'accepted', createdAt: '2026-05-11', amount: 4800 },
  { id: 'hire-002', professionalId: 'pro-003', professionalName: 'Ravi Kumar', skill: 'Electrician', seekerName: 'Sunita Rao', seekerPhone: '+91 88776 65544', date: '2026-05-13', time: '09:00 AM', message: 'Kitchen wiring repair needed', status: 'pending', createdAt: '2026-05-11', amount: 900 },
  { id: 'hire-003', professionalId: 'pro-002', professionalName: 'Priya Sharma', skill: 'Interior Designer', seekerName: 'Amit Joshi', seekerPhone: '+91 77665 54433', date: '2026-05-10', time: '02:00 PM', message: 'Living room redesign consultation', status: 'completed', createdAt: '2026-05-08', amount: 3600 },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [professionals, setProfessionals] = useState<Professional[]>(INITIAL_PROFESSIONALS);
  const [hireRequests, setHireRequests] = useState<HireRequest[]>(INITIAL_HIRE_REQUESTS);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [isDark, setIsDark] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);

  const addProfessional = useCallback((p: Professional) => {
    setProfessionals(prev => [p, ...prev]);
  }, []);

  const addHireRequest = useCallback((r: HireRequest) => {
    setHireRequests(prev => [r, ...prev]);
  }, []);

  const addNotification = useCallback((n: Notification) => {
    setNotifications(prev => [n, ...prev]);
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleTheme = useCallback(() => {
    setIsDark(prev => {
      const next = !prev;
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('light', !next);
      }
      return next;
    });
  }, []);

  return (
    <AppContext.Provider value={{
      professionals, addProfessional,
      hireRequests, addHireRequest,
      notifications, addNotification, markAllRead, unreadCount,
      isDark, toggleTheme,
      searchQuery, setSearchQuery,
      filterCategory, setFilterCategory,
      selectedProfessional, setSelectedProfessional,
      isHireModalOpen, setIsHireModalOpen,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}