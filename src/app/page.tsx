'use client';
import { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Certificates from '@/components/Certificates';
import Contact from '@/components/Contact';
import Stats from '@/components/Stats';
import Marquee from '@/components/Marquee';
import LoadingScreen from '@/components/LoadingScreen';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen isVisible={loading} />
      <main className={loading ? 'main-hidden' : 'main-visible'}>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Stats />
        <Projects />
        <Experience />
        <Certificates />
        <Contact />
      </main>
    </>
  );
}
