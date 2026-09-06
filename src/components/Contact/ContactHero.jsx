import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactHero() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline();

      // Initial states
      gsap.set('.contact-hero-bg', { scale: 1.08 });
      gsap.set('.contact-hero-grid', { opacity: 0 });
      gsap.set('.contact-eyebrow', { opacity: 0, y: 20 });
      gsap.set('.contact-hero-word', { opacity: 0, y: 100, rotateX: -20 });
      gsap.set('.contact-hero-desc', { opacity: 0, y: 30 });
      gsap.set('.scroll-indicator', { opacity: 0, y: -20 });

      // Intro Animation
      tl.to('.contact-hero-bg', { scale: 1, duration: 2.5, ease: "power3.out" }, 0)
        .to('.contact-hero-grid', { opacity: 0.15, duration: 2 }, 0)
        .to('.contact-eyebrow', { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 0.5)
        .to('.contact-hero-word', { 
          opacity: 1, 
          y: 0, 
          rotateX: 0, 
          duration: 1.2, 
          stagger: 0.15, 
          ease: "expo.out" 
        }, 0.6)
        .to('.contact-hero-desc', { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 1.2)
        .to('.scroll-indicator', { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 1.8);

      // Scroll Parallax
      gsap.to('.contact-hero-bg', {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.to('.contact-hero-content', {
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
      <section className="relative w-full h-screen overflow-hidden bg-brand-navy flex items-center justify-center">
      
      {/* Background */}
      <div className="absolute inset-0 w-full h-[120%] -top-[10%] z-0 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1541888081622-482a5fbc40d5?q=80&w=2070" 
          alt="Modern Development" 
          className="contact-hero-bg w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-navy/70 mix-blend-multiply" />
        
        {/* Subtle Blueprint Grid Details */}
        <div className="contact-hero-grid absolute inset-0 mix-blend-overlay">
          <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        </div>
      </div>

      {/* Content */}
      <div className="contact-hero-content relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col pt-20">
        
        <div className="contact-eyebrow font-mono text-sm md:text-base tracking-[0.3em] text-brand-gold font-bold mb-8 uppercase">
          CONTACT SAI PLANNERS
        </div>

        <div className="flex flex-col gap-2 mb-12">
          <div className="overflow-hidden">
            <h1 className="contact-hero-word font-display font-semibold text-6xl md:text-8xl lg:text-[9rem] tracking-tighter text-white leading-[0.9]">
              LET'S
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="contact-hero-word font-display font-semibold text-6xl md:text-8xl lg:text-[9rem] tracking-tighter text-white leading-[0.9]">
              DISCUSS
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="contact-hero-word font-display font-semibold text-6xl md:text-8xl lg:text-[9rem] tracking-tighter text-brand-gold leading-[0.9]">
              YOUR PROJECT.
            </h1>
          </div>
        </div>

        <p className="contact-hero-desc font-body text-white/80 text-lg md:text-2xl font-light tracking-wide max-w-2xl leading-relaxed">
          Planning a new development, industrial facility, layout, warehouse, commercial project or institutional building? Talk to SAI PLANNERS about your site and approval requirements.
        </p>

      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-12 left-6 md:left-12 z-20 flex flex-col items-start gap-4">
        <span className="font-mono text-xs tracking-[0.2em] text-white/50 uppercase">SCROLL TO BEGIN</span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-brand-gold animate-[scroll-down_2s_ease-in-out_infinite]" />
        </div>
      </div>

    </section>
    </div>
  );
}
