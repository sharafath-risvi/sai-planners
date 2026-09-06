import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSequence() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const storyRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    // 1. Initial Reveal Animation (Framer Motion handles most of the entry, but GSAP can do the technical grid lines if needed)
    
    // 2. Scroll Animation (Hero -> Our Story)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", // Pin for 200% of viewport height
          pin: true,
          scrub: 1, // Smooth scrubbing
        }
      });

      // Initially, image takes up most of the screen
      // As we scroll, it shrinks, moves left, and rounds corners slightly
      tl.to(imageRef.current, {
        width: "45vw",
        height: "80vh",
        x: "5vw",
        y: "10vh",
        borderRadius: "1rem",
        ease: "power2.inOut",
      }, 0);

      // Hero text content fades out and moves up
      tl.to(contentRef.current, {
        opacity: 0,
        y: -100,
        ease: "power1.inOut",
      }, 0);

      // Our Story content fades in and moves up from bottom right
      tl.fromTo(storyRef.current, {
        opacity: 0,
        x: 50,
      }, {
        opacity: 1,
        x: 0,
        ease: "power2.out",
      }, 0.2);

    }, containerRef);

    return () => ctx.revert(); // Cleanup GSAP
  }, []);

  // Use a high-quality placeholder for the architectural visual
  const heroImage = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop";

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-brand-navy overflow-hidden text-white">
      
      {/* Background/Transitioning Image */}
      <motion.div 
        ref={imageRef}
        className="absolute top-0 left-0 w-full h-full origin-top-left z-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 2, delay: 1, ease: "easeOut" }}
      >
        <img 
          src={heroImage} 
          alt="Architectural Visualization" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-navy/30 mix-blend-multiply" />
      </motion.div>

      {/* Grid Overlay for Technical Feel */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
           style={{ backgroundImage: 'linear-gradient(to right, #ffffff11 1px, transparent 1px), linear-gradient(to bottom, #ffffff11 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}
      />

      {/* Hero Content (Fades out on scroll) */}
      <div ref={contentRef} className="absolute inset-0 z-10 flex flex-col justify-end pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex items-center space-x-4 mb-6"
          >
            <div className="h-[1px] w-12 bg-brand-gold" />
            <span className="text-xs md:text-sm tracking-widest font-mono uppercase text-brand-gold">
              Planning • Engineering • Approvals
            </span>
          </motion.div>

          <motion.h1 
            ref={headingRef}
            className="font-display font-semibold leading-[0.9] tracking-tighter mb-8"
            style={{ fontSize: 'clamp(4rem, 9vw, 10rem)' }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8, ease: [0.76, 0, 0.24, 1] }}
          >
            SAI<br />PLANNERS
          </motion.h1>

          <div className="flex flex-col md:flex-row md:items-end justify-between max-w-4xl gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
              className="max-w-md"
            >
              <p className="text-xl font-medium mb-4 text-white">
                Planning. Engineering. Approvals. Delivered.
              </p>
              <p className="text-sm md:text-base text-white/70 leading-relaxed font-body">
                End-to-end planning and regulatory consultancy for residential, commercial, industrial, institutional and land-development projects across Tamil Nadu.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.2 }}
              className="flex items-center space-x-6"
            >
              <a href="#contact" data-cursor="hover" className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold tracking-widest text-brand-navy bg-brand-gold rounded-full transition-transform hover:scale-105">
                GET A CONSULTATION
              </a>
              <a href="#contact" data-cursor="hover" className="text-sm font-medium tracking-widest uppercase hover:text-brand-gold transition-colors">
                TALK TO US
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Our Story Content (Fades in on scroll) */}
      <div 
        ref={storyRef} 
        className="absolute inset-y-0 right-0 w-full md:w-[50vw] z-20 flex flex-col justify-center px-6 md:pr-24 md:pl-12 opacity-0"
      >
        <h2 className="font-display font-medium text-4xl md:text-6xl mb-12 text-white">
          Planning is more<br />than paperwork.
        </h2>
        
        <h3 className="font-display text-2xl md:text-3xl text-brand-gold mb-8">
          SAI PLANNERS connects the land, the plan, the regulations and the approval.
        </h3>
        
        <div className="space-y-6 text-white/80 font-body text-base md:text-lg max-w-xl">
          <p>
            SAI PLANNERS is a professional planning and regulatory consultancy that helps property owners, developers, industrial entrepreneurs and institutions navigate the complexities of planning, development and statutory approvals.
          </p>
          <p>
            From site assessment and planning to compliant drawings, authority liaison and approval coordination, we manage the process with clarity, precision and commitment.
          </p>
        </div>
      </div>
      
    </div>
  );
}
