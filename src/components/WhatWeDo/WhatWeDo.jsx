import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { 
    num: "01", 
    title: "DTCP, CMDA & LPA\nPLAN APPROVALS", 
    desc: "Planning and approval coordination for applicable development projects.",
    images: [
      "https://images.unsplash.com/photo-1541888081622-482a5fbc40d5?q=80&w=2070", // Top
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070", // Center
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071"  // Bottom
    ],
    bgClass: "#0A0A0D" // Black
  },
  { 
    num: "02", 
    title: "RERA APPROVALS\n& PROJECT COMPLIANCE", 
    desc: "Navigating real estate regulations, project registration, and ongoing statutory compliance for developers.",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069", 
      "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34d?q=80&w=2070", 
      "https://images.unsplash.com/photo-1448518184296-a22facb4446f?q=80&w=2070"
    ],
    bgClass: "#1A1A24" // Dark grey
  },
  { 
    num: "03", 
    title: "LAND DEVELOPMENT\n& LAYOUT PLANNING", 
    desc: "Comprehensive master planning, site assessment, and infrastructural coordination for large land parcels.",
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356f27?q=80&w=2070", 
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070", 
      "https://images.unsplash.com/photo-1541888081622-482a5fbc40d5?q=80&w=2070"
    ],
    bgClass: "#282D7F" // Navy
  },
  { 
    num: "04", 
    title: "INDUSTRIAL ENGINEERING\n& PLANNING", 
    desc: "Specialized planning, factory act approvals, and technical drawings for industrial and manufacturing facilities.",
    images: [
      "https://images.unsplash.com/photo-1448518184296-a22facb4446f?q=80&w=2070", 
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070", 
      "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34d?q=80&w=2070"
    ],
    bgClass: "#0A0A0D" // Black
  },
  { 
    num: "05", 
    title: "STATUTORY &\nENVIRONMENTAL CLEARANCES", 
    desc: "Managing pollution control board NOCs, fire safety approvals, and environmental clearances.",
    images: [
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070", 
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071", 
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069"
    ],
    bgClass: "#F5F5F7" // Light grey
  }
];

export default function WhatWeDo() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=600%", // Long 600vh pin
          pin: true,
          scrub: 1,
        }
      });

      // ==========================================
      // STAGE 1: PULL BACK & REVEAL DIAGONAL COMPOSITION
      // ==========================================
      
      // Center card shrinks and centers
      tl.to(".wwd-center-card", {
        width: "35vw",
        height: "65vh",
        x: 0,
        y: 0,
        ease: "power2.inOut",
        duration: 1.5
      }, 0);

      // Top-Left card enters
      tl.fromTo(".wwd-top-card", {
        opacity: 0,
        scale: 0.7,
        x: -150,
        y: -150
      }, {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        ease: "power2.out",
        duration: 1.5
      }, 0);

      // Bottom-Right card enters (slightly different timing for depth)
      tl.fromTo(".wwd-bottom-card", {
        opacity: 0,
        scale: 0.7,
        x: 150,
        y: 150
      }, {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        ease: "power2.out",
        duration: 1.8
      }, 0);

      tl.to({}, { duration: 0.5 }); // Hold briefly

      // ==========================================
      // STAGE 2: SERVICE LOOP (01 -> 05)
      // ==========================================
      
      let time = 2.3;
      const transDuration = 1.2;
      const holdDuration = 1.0;

      for (let i = 0; i < services.length - 1; i++) {
        // Subtle continuous movement while holding
        tl.to(`.wwd-center-img-${i}`, { scale: 1.05, duration: holdDuration, ease: "none" }, time);
        tl.to(".wwd-top-card", { y: -10, x: -10, duration: holdDuration, ease: "none" }, time);
        tl.to(".wwd-bottom-card", { y: 10, x: 10, duration: holdDuration, ease: "none" }, time);
        
        time += holdDuration;

        // --- TRANSITION TO NEXT SERVICE ---
        
        // Background color transition
        tl.to(".wwd-container", { backgroundColor: services[i+1].bgClass, duration: transDuration }, time);
        
        // Text color adjustments if background becomes light (Service 05)
        const isNextLight = services[i+1].bgClass === "#F5F5F7";
        if (isNextLight) {
          tl.to(".wwd-title, .wwd-desc, .wwd-static-title", { color: "#0A0A0D", duration: transDuration }, time);
          tl.to(".wwd-bg-number", { WebkitTextStroke: "2px rgba(10,10,13,0.1)", duration: transDuration }, time);
        } else {
          tl.to(".wwd-title, .wwd-desc, .wwd-static-title", { color: "#FFFFFF", duration: transDuration }, time);
          tl.to(".wwd-bg-number", { WebkitTextStroke: "2px rgba(255,255,255,0.1)", duration: transDuration }, time);
        }

        // Center Content Text transitions
        tl.to(`.wwd-content-${i}`, { y: -40, opacity: 0, duration: transDuration * 0.5 }, time);
        tl.fromTo(`.wwd-content-${i+1}`, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: transDuration * 0.5 }, time + transDuration * 0.5);

        // Huge Number transition
        tl.to(".wwd-bg-number", { scale: 1.2, opacity: 0, y: -50, duration: transDuration * 0.5 }, time);
        tl.call(() => {
          const numEl = document.querySelector('.wwd-bg-number');
          if(numEl) numEl.innerText = services[i+1].num;
        }, null, time + transDuration * 0.5);
        tl.fromTo(".wwd-bg-number", { scale: 0.8, opacity: 0, y: 50 }, { scale: 1, opacity: 1, y: 0, duration: transDuration * 0.5 }, time + transDuration * 0.5);

        // Center Image depth transition
        tl.to(`.wwd-center-img-${i}`, { scale: 0.92, opacity: 0, duration: transDuration }, time);
        tl.fromTo(`.wwd-center-img-${i+1}`, { scale: 1.08, opacity: 0 }, { scale: 1, opacity: 1, duration: transDuration }, time);

        // Top Image transition (moves slightly out, then new image fades in, moves back)
        tl.to(".wwd-top-card", { x: -30, y: -30, duration: transDuration * 0.5 }, time);
        tl.to(`.wwd-top-img-${i}`, { opacity: 0, duration: transDuration }, time);
        tl.fromTo(`.wwd-top-img-${i+1}`, { opacity: 0 }, { opacity: 1, duration: transDuration }, time);
        tl.to(".wwd-top-card", { x: 0, y: 0, duration: transDuration * 0.5 }, time + transDuration * 0.5);

        // Bottom Image transition
        tl.to(".wwd-bottom-card", { x: 30, y: 30, duration: transDuration * 0.5 }, time);
        tl.to(`.wwd-bottom-img-${i}`, { opacity: 0, duration: transDuration }, time);
        tl.fromTo(`.wwd-bottom-img-${i+1}`, { opacity: 0 }, { opacity: 1, duration: transDuration }, time);
        tl.to(".wwd-bottom-card", { x: 0, y: 0, duration: transDuration * 0.5 }, time + transDuration * 0.5);

        time += transDuration;
      }

      // ==========================================
      // STAGE 3: THE RELEASE
      // ==========================================
      // Hold final service briefly
      tl.to(`.wwd-center-img-${services.length-1}`, { scale: 1.05, duration: holdDuration, ease: "none" }, time);
      time += holdDuration;

      // Expand and fade out to release pin
      tl.to(".wwd-center-card", { scale: 1.2, opacity: 0, duration: 1.5, ease: "power2.inOut" }, time);
      tl.to(".wwd-top-card", { x: -100, y: -100, opacity: 0, duration: 1.5, ease: "power2.inOut" }, time);
      tl.to(".wwd-bottom-card", { x: 100, y: 100, opacity: 0, duration: 1.5, ease: "power2.inOut" }, time);
      tl.to(".wwd-bg-number", { opacity: 0, duration: 1 }, time);
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Clean Section Separator */}
      <div className="w-full h-[25vh] bg-brand-black flex flex-col items-center justify-center relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="h-[40%] w-[1px] bg-brand-gold mb-4" />
        <span className="typo-eyebrow text-brand-gold mb-2">OUR SERVICES</span>
        <h2 className="font-display font-semibold text-white/40 uppercase" style={{fontSize:'clamp(1.5rem,4vw,4rem)',letterSpacing:'0.2em',lineHeight:1}}>WHAT WE DO</h2>
      </div>

      <div ref={containerRef}>
      <section className="wwd-container relative w-full h-screen bg-brand-black overflow-hidden flex items-center justify-center text-white">
        
        {/* Architectural Grid Overlay */}
        <div className="absolute inset-[-10%] pointer-events-none opacity-[0.15] z-0">
          <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        </div>
        <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />

        {/* Background Number */}
        <div className="wwd-bg-number absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[35vw] font-display font-bold text-transparent pointer-events-none z-0" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.1)" }}>
          {services[0].num}
        </div>

        {/* DIAGONAL COMPOSITION CONTAINER */}
        <div className="relative w-full max-w-[1400px] h-full flex items-center justify-center">

          {/* CARD 1: TOP-LEFT IMAGE */}
          <div className="wwd-top-card absolute top-[10vh] left-[5vw] lg:left-[10vw] w-[25vw] h-[35vh] z-20 shadow-2xl overflow-hidden pointer-events-none" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
            {services.map((svc, i) => (
              <div key={`top-${i}`} className={`wwd-top-img-${i} absolute inset-0 w-full h-full origin-center ${i === 0 ? 'opacity-100' : 'opacity-0'}`}>
                <img src={svc.images[0]} className="w-full h-full object-cover" alt="" />
              </div>
            ))}
          </div>

          {/* CARD 2: CENTER MAIN CARD */}
          <div className="wwd-center-card absolute w-[70vw] h-[75vh] z-30 shadow-2xl overflow-hidden flex flex-col justify-end p-8 lg:p-12" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
            
            {/* Center Images */}
            {services.map((svc, i) => (
              <div key={`center-${i}`} className={`wwd-center-img-${i} absolute inset-0 w-full h-full origin-center ${i === 0 ? 'opacity-100' : 'opacity-0'}`}>
                <img src={svc.images[1]} className="w-full h-full object-cover" alt="" />
                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent mix-blend-multiply" />
              </div>
            ))}

            {/* Center Content Static Header */}
            <div className="relative z-10 w-full max-w-2xl mb-4">
              <h4 className="wwd-static-title typo-eyebrow text-brand-gold">WHAT WE DO</h4>
            </div>

            {/* Center Content Dynamic Data */}
            <div className="relative z-10 w-full max-w-2xl h-[25vh]">
              {services.map((svc, i) => (
                <div key={`content-${i}`} className={`wwd-content-${i} absolute bottom-0 left-0 w-full ${i === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="font-mono text-2xl lg:text-3xl text-brand-gold">{svc.num}</span>
                    <div className="h-[1px] w-12 bg-white/30" />
                  </div>
                  <h3 className="wwd-title typo-subhead font-semibold leading-tight whitespace-pre-line mb-4 text-white">
                    {svc.title}
                  </h3>
                  <p className="wwd-desc typo-body text-white/80">
                    {svc.desc}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Architectural thin border inside the card */}
            <div className="absolute inset-4 border border-white/10 pointer-events-none z-20" />
          </div>

          {/* CARD 3: BOTTOM-RIGHT IMAGE */}
          <div className="wwd-bottom-card absolute bottom-[10vh] right-[5vw] lg:right-[10vw] w-[20vw] h-[25vh] z-40 shadow-2xl overflow-hidden pointer-events-none" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
            {services.map((svc, i) => (
              <div key={`bottom-${i}`} className={`wwd-bottom-img-${i} absolute inset-0 w-full h-full origin-center ${i === 0 ? 'opacity-100' : 'opacity-0'}`}>
                <img src={svc.images[2]} className="w-full h-full object-cover" alt="" />
              </div>
            ))}
          </div>

        </div>

      </section>
    </div>
    </>
  );
}
