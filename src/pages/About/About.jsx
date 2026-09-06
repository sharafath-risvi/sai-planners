import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import all cinematic sections
import AboutHero from '../../components/About/AboutHero';
import AboutOverview from '../../components/About/AboutOverview';
import AboutProcess from '../../components/About/AboutProcess';
import AboutFounder from '../../components/About/AboutFounder';
import AboutRegulatory from '../../components/About/AboutRegulatory';
import AboutVision from '../../components/About/AboutVision';
import AboutValues from '../../components/About/AboutValues';
import CTA from '../../components/CTA/CTA';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const pageRef = useRef(null);
  
  // Clean up ScrollTriggers on unmount to prevent memory leaks or layout thrashing
  // between page navigations.
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Refresh ScrollTrigger after all components mount
      // to ensure pinning calculations are correct across the huge page
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-white min-h-screen">
      
      {/* 01. Hero Section */}
      <AboutHero />
      
      {/* 02. Company Overview (Pinned Reveal) */}
      <AboutOverview />

      {/* 03. Process / Role (Horizontal Journey) */}
      <AboutProcess />

      {/* 03.5 Our Founder (Cinematic Reveal) */}
      <AboutFounder />

      {/* 04. Authority & Regulatory (Dark Network Map) */}
      <AboutRegulatory />

      {/* 05. Vision & Mission (Cinematic Side-by-Side) */}
      <AboutVision />

      {/* 07. Our Values (Circular Orbit) */}
      <AboutValues />

      {/* 08. Final Statement & CTA */}
      <CTA />

    </div>
  );
}
