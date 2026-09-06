import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutHero() {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const textRef = useRef(null);
  const eyebrowRef = useRef(null);
  const statementRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Intro Animation
      const tl = gsap.timeline();

      // Initial states
      gsap.set(imgRef.current, { scale: 1.08 });
      gsap.set(eyebrowRef.current, { opacity: 0, y: 20 });
      gsap.set('.hero-word', { opacity: 0, y: 100, rotateX: -20 });
      gsap.set(statementRef.current, { opacity: 0, y: 20 });

      // Play intro
      tl.to(imgRef.current, { scale: 1, duration: 2.5, ease: "power3.out" }, 0)
        .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 0.5)
        .to('.hero-word', { 
          opacity: 1, 
          y: 0, 
          rotateX: 0, 
          duration: 1.2, 
          stagger: 0.15, 
          ease: "expo.out" 
        }, 0.6)
        .to(statementRef.current, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 1.2);

      // Scroll Parallax & Separation
      gsap.to(imgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.to(textRef.current, {
        yPercent: -40,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <section className="relative w-full h-screen overflow-hidden bg-brand-navy">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <img 
          ref={imgRef}
          src="/images/img2.JPG" 
          alt="Sai Planners Architectural Hero" 
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-brand-navy/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent opacity-80" />
      </div>

      {/* Content */}
      <div ref={textRef} className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6">
        
        <div ref={eyebrowRef} className="typo-eyebrow text-brand-gold mb-6 md:text-sm tracking-[0.2em]">
          ABOUT SAI PLANNERS
        </div>

        <div className="overflow-hidden mb-2">
          <h1 className="hero-word font-display font-bold leading-none text-white" style={{fontSize:'clamp(5.5rem,15vw,15rem)',letterSpacing:'0.04em'}}>
            ABOUT
          </h1>
        </div>
        <div className="overflow-hidden mb-12">
          <h1 className="hero-word font-display font-bold leading-none text-brand-gold" style={{fontSize:'clamp(4.5rem,12vw,12rem)',letterSpacing:'0.04em'}}>
            SAI PLANNERS
          </h1>
        </div>

        <p ref={statementRef} className="font-body text-white/80 font-light tracking-wide max-w-2xl" style={{fontSize:'clamp(1rem,1.8vw,1.4rem)',lineHeight:1.6}}>
          Planning. Engineering. Regulatory Expertise.
        </p>

      </div>

    </section>
    </div>
  );
}
