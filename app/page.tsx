"use client";

import { Suspense, lazy } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Loading from './loading';

/* Sections below the fold lazy-load; the shell (Header + Hero) is eager so
   the page has a painted, legible first viewport immediately. */
const AboutMe = lazy(() => import('@/components/AboutMe'));
const Projects = lazy(() => import('@/components/Projects'));
const Skills = lazy(() => import('@/components/Skills'));
const SoftSkills = lazy(() => import('@/components/SoftSkills'));
const Contact = lazy(() => import('@/components/Contact'));
const Resume = lazy(() => import('@/components/Resume'));
const Footer = lazy(() => import('@/components/Footer'));

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<Loading />}>
          <AboutMe />
          <Projects />
          <Skills />
          <SoftSkills />
          <Contact />
          <Resume />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
