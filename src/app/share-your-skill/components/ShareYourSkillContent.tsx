'use client';
import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Navbar from '@/components/Navbar';
import MobileBottomNav from '@/components/MobileBottomNav';
import ScrollProgress from '@/components/ScrollProgress';
import ShareSkillForm from './ShareSkillForm';

export default function ShareYourSkillContent() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Navbar activePath="/share-your-skill" />
      <main className="pt-16 pb-20 lg:pb-0">
        <ShareSkillForm />
      </main>
      <MobileBottomNav activePath="/share-your-skill" />
      <ToastContainer position="bottom-right" theme="dark" toastClassName="!font-sans" />
    </div>
  );
}