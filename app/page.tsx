"use client";

import { Suspense, lazy } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AmbientBackground from '@/components/AmbientBackground';
import Loading from './loading';

// Lazy load heavy components for better performance
const AboutMe = lazy(() => import('@/components/AboutMe'));
const SoftSkills = lazy(() => import('@/components/SoftSkills'));
const Skills = lazy(() => import('@/components/Skills'));
const Projects = lazy(() => import('@/components/Projects'));
const Contact = lazy(() => import('@/components/Contact'));
const Resume = lazy(() => import('@/components/Resume'));
const Footer = lazy(() => import('@/components/Footer'));
const MobileNav = lazy(() => import('@/components/MobileNav'));

export default function Page() {
  return (
    <div className="relative min-h-screen">
      {/* Global particle background */}
      <AmbientBackground />

      {/* Main content */}
      <div className="relative z-10">
        <Header />
        <Hero />
        <Suspense fallback={<Loading />}>
          <AboutMe />
          <Projects />
          <Skills />
          <SoftSkills />
          <Contact />
          <Resume />
          <Footer />
          <MobileNav />
        </Suspense>
      </div>
    </div>
  );
}
