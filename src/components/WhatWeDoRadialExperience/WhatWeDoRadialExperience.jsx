import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Robust Unsplash images
const services = [
  {
    num: "01",
    title: "PLANNING & APPROVALS",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070" // Updated image
  },
  {
    num: "02",
    title: "ENGINEERING & DESIGN",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069"
  },
  {
    num: "03",
    title: "STATUTORY COMPLIANCE",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070"
  },
  {
    num: "04",
    title: "PROJECT COORDINATION",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070"
  }
];

export default function WhatWeDoRadialExperience() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      const isMobile = window.innerWidth < 768;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=8000",
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      // Initial States
      gsap.set(".wwd-service-card", { opacity: 0, transformPerspective: 1200 });
      gsap.set(".wwd-intro-text", { opacity: 1, y: 0 });
      
      // Background Image Initial State
      gsap.set(".wwd-bg-image", { opacity: 0, scale: 1.08 });
      gsap.set(".wwd-bg-overlay", { opacity: 0 });
      
      // Initial positioning setup
      gsap.set(".wwd-card-0", { xPercent: -50, yPercent: -50, top: "120%", left: "50%", zIndex: 40 });
      gsap.set(".wwd-card-1", { xPercent: -50, yPercent: -50, top: "50%", left: "50%", zIndex: 30, scale: 0.8, z: -100 });
      gsap.set(".wwd-card-2", { xPercent: -50, yPercent: -50, top: "50%", left: "50%", zIndex: 20, rotationY: 90, z: -500, scale: 0.5 });
      gsap.set(".wwd-card-3", { xPercent: -50, yPercent: -50, top: "50%", left: "50%", zIndex: 10, rotationX: -90, z: -500, scale: 0.5 });

      let time = 0;

      // ==========================================
      // SCROLL 1: FIRST SERVICE ESTABLISHES (ENTERS FROM BOTTOM)
      // ==========================================
      tl.to(".wwd-intro-text", { opacity: 0, y: -40, duration: 1.5, ease: "power2.inOut" }, time);
      tl.to(".wwd-card-0", { opacity: 1, top: "50%", duration: 2, ease: "power3.out" }, time + 0.5);
      
      time += 2.5;
      tl.to({}, { duration: 1 }, time); // HOLD
      time += 1;

      // ==========================================
      // SCROLL 2: SECOND SERVICE EMERGES
      // ==========================================
      // Adjust offsets for slightly larger cards
      const xOffset = isMobile ? 0 : -20; // vw
      const yOffset = isMobile ? -24 : -24; // Increased vertical gap for breathing room (was -20)

      // Card 0 moves to top-left position
      tl.to(".wwd-card-0", { 
        x: `${xOffset}vw`, 
        y: `${yOffset}vh`,
        duration: 2, 
        ease: "power2.inOut" 
      }, time);
      
      // Card 1 emerges to top-right position
      tl.to(".wwd-card-1", { 
        opacity: 1, 
        scale: 1, 
        z: 0,
        x: `${-xOffset}vw`,
        y: `${yOffset}vh`,
        duration: 2, 
        ease: "power2.inOut" 
      }, time);

      time += 2;
      tl.to({}, { duration: 1 }, time); // HOLD
      time += 1;

      // ==========================================
      // SCROLL 3: THIRD SERVICE ROTATES INTO POSITION
      // ==========================================
      // Card 2 rotates in to bottom-left
      tl.to(".wwd-card-2", {
        opacity: 1,
        rotationY: 0,
        z: 0,
        scale: 1,
        x: `${xOffset}vw`,
        y: `${-yOffset}vh`,
        duration: 2.5,
        ease: "power3.inOut"
      }, time);

      time += 2.5;
      tl.to({}, { duration: 1 }, time); // HOLD
      time += 1;

      // ==========================================
      // SCROLL 4: FOURTH SERVICE ROTATES INTO POSITION
      // ==========================================
      // Card 3 rotates in to bottom-right
      tl.to(".wwd-card-3", {
        opacity: 1,
        rotationX: 0,
        z: 0,
        scale: 1,
        x: `${-xOffset}vw`,
        y: `${-yOffset}vh`,
        duration: 2.5,
        ease: "power3.inOut"
      }, time);

      time += 2.5;

      // ==========================================
      // BACKGROUND IMAGE REVEAL
      // ==========================================
      // Smoothly reveal the cinematic background image behind the 4 cards
      tl.to(".wwd-bg-image", { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }, time);
      tl.to(".wwd-bg-overlay", { opacity: 1, duration: 1.2, ease: "power2.out" }, time);
      
      // Add a subtle continuous cinematic movement to the background image
      tl.to(".wwd-bg-image", { scale: 1.05, x: 20, duration: 10, ease: "none" }, time + 1.2);

      time += 1.2;
      tl.to({}, { duration: 1.5 }, time); // HOLD in 2x2 grid
      time += 1.5;

      // ==========================================
      // CENTERED DEPTH STACK
      // ==========================================
      // Target offsets to create a stacked deck effect:
      // Card 0: front (x:0, y:0, z:0, scale:1)
      // Card 1: behind (x:0, y:-15px, z:-60px, scale:0.97)
      // Card 2: behind (x:0, y:-30px, z:-120px, scale:0.94)
      // Card 3: back (x:0, y:-45px, z:-180px, scale:0.91)
      // Z-index was already set initially (40, 30, 20, 10).
      
      const stackDuration = 2.5;
      
      tl.to(".wwd-card-0", { x: 0, y: 0, z: 0, scale: 1, duration: stackDuration, ease: "power2.inOut" }, time);
      tl.to(".wwd-card-1", { x: 0, y: -15, z: -60, scale: 0.97, duration: stackDuration, ease: "power2.inOut" }, time);
      tl.to(".wwd-card-2", { x: 0, y: -30, z: -120, scale: 0.94, duration: stackDuration, ease: "power2.inOut" }, time);
      tl.to(".wwd-card-3", { x: 0, y: -45, z: -180, scale: 0.91, duration: stackDuration, ease: "power2.inOut" }, time);
      
      time += stackDuration;
      tl.to({}, { duration: 1.5 }, time); // HOLD STACK
      time += 1.5;

      // ==========================================
      // FINAL CINEMATIC ZOOM SEQUENCE (01 -> 02 -> 03 -> 04)
      // ==========================================
      const zoomDuration = 2.5;
      
      // 01 zooms out
      tl.to(".wwd-card-0", { x: 0, y: 0, scale: 2.5, z: 800, opacity: 0, filter: "blur(20px)", duration: zoomDuration, ease: "power3.in" }, time);
      time += zoomDuration * 0.8;
      
      // As 01 leaves, 02 moves up to front position
      tl.to(".wwd-card-1", { y: 0, z: 0, scale: 1, duration: 0.5, ease: "power2.out" }, time - 0.5);
      // 02 zooms out
      tl.to(".wwd-card-1", { x: 0, y: 0, scale: 2.5, z: 800, opacity: 0, filter: "blur(20px)", duration: zoomDuration, ease: "power3.in" }, time);
      time += zoomDuration * 0.8;
      
      // As 02 leaves, 03 moves up
      tl.to(".wwd-card-2", { y: 0, z: 0, scale: 1, duration: 0.5, ease: "power2.out" }, time - 0.5);
      // 03 zooms out
      tl.to(".wwd-card-2", { x: 0, y: 0, scale: 2.5, z: 800, opacity: 0, filter: "blur(20px)", duration: zoomDuration, ease: "power3.in" }, time);
      time += zoomDuration * 0.8;
      
      // As 03 leaves, 04 moves up
      tl.to(".wwd-card-3", { y: 0, z: 0, scale: 1, duration: 0.5, ease: "power2.out" }, time - 0.5);
      // 04 zooms out
      tl.to(".wwd-card-3", { x: 0, y: 0, scale: 2.5, z: 800, opacity: 0, filter: "blur(20px)", duration: zoomDuration, ease: "power3.in" }, time);
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <div ref={containerRef}>
        <section id="services" className="relative w-full h-screen bg-[#0A0A0A] overflow-hidden flex items-center justify-center perspective-[1200px] z-10">
      
      {/* Background Image Reveal Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1541888081622-482a5fbc40d5?q=80&w=2070" 
          alt="Cinematic architectural background"
          className="wwd-bg-image absolute inset-0 w-full h-full object-cover origin-center"
        />
        <div className="wwd-bg-overlay absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/95 via-[#0A0A0A]/60 to-[#0A0A0A]/95 mix-blend-multiply" />
        
        {/* Architectural Grid Overlay */}
        <div className="absolute inset-[-10%] pointer-events-none opacity-[0.10]">
          <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        </div>
      </div>

      {/* Premium Intro Text */}
      <div className="wwd-intro-text absolute z-50 text-center px-6 w-full mt-[-10vh]">
        <h4 className="typo-eyebrow text-white mb-4 block">
          OUR SERVICES
        </h4>
        <h2 className="font-display font-semibold text-5xl md:text-7xl lg:text-[7rem] text-brand-gold tracking-tighter leading-none mb-6 whitespace-nowrap">
          WHAT WE DO
        </h2>
        <h4 className="font-mono text-sm md:text-base tracking-[0.2em] text-white/80 uppercase font-bold max-w-xl mx-auto leading-relaxed">
          Turning complex planning into clear, compliant development.
        </h4>
      </div>

      {/* 3D Service Cards */}
      {services.map((service, index) => (
        <div 
          key={index}
          className={`wwd-service-card wwd-card-${index} absolute w-[45vw] md:w-[36vw] h-[30vh] md:h-[38vh] transform-style-preserve-3d shadow-2xl rounded-[24px] overflow-hidden border border-white/10 bg-brand-navy`}
        >
          <img 
            src={service.image} 
            alt={service.title} 
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Subtle gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/30 to-transparent mix-blend-multiply" />
          
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end h-full z-10 pointer-events-none">
            <span className="font-mono text-xl text-brand-gold font-bold mb-2 opacity-90">{service.num}</span>
            <h3 className="font-display text-xl md:text-2xl font-semibold text-white leading-tight drop-shadow-lg">
              {service.title}
            </h3>
          </div>
        </div>
      ))}

      </section>
      </div>
    </div>
  );
}
