import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Data
const services = [
  { num: "01", title: "DTCP, CMDA\n& LPA PLAN\nAPPROVALS", desc: "Expert coordination for residential and commercial layout approvals across planning authorities in Tamil Nadu." },
  { num: "02", title: "RERA APPROVALS\n& PROJECT\nCOMPLIANCE", desc: "Navigating real estate regulations, project registration, and ongoing statutory compliance for developers." },
  { num: "03", title: "LAND DEVELOPMENT\n& LAYOUT PLANNING", desc: "Comprehensive master planning, site assessment, and infrastructural coordination for large land parcels." },
  { num: "04", title: "INDUSTRIAL\nENGINEERING\n& PLANNING", desc: "Specialized planning, factory act approvals, and technical drawings for industrial and manufacturing facilities." },
  { num: "05", title: "STATUTORY &\nENVIRONMENTAL\nCLEARANCES", desc: "Managing pollution control board NOCs, fire safety approvals, and environmental clearances." }
];

const serviceImages = [
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop", // 01
  "https://images.unsplash.com/photo-1541888081622-482a5fbc40d5?q=80&w=2070&auto=format&fit=crop", // 02
  "https://images.unsplash.com/photo-1448518184296-a22facb4446f?q=80&w=2070&auto=format&fit=crop", // 03
  "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34d?q=80&w=2070&auto=format&fit=crop", // 04
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop"  // 05
];

export default function MainCinematicSequence() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1200%", // Massive 1200vh pinned area
          pin: true,
          scrub: 1,
        }
      });

      // ==========================================
      // STAGE 1: HERO EXIT
      // ==========================================
      // Hero image scales down and fades out
      tl.to(".hero-img-container", {
        scale: 0.8,
        opacity: 0,
        y: -100,
        duration: 1,
        ease: "power2.inOut"
      }, 0);
      
      // Hero text moves up and out
      tl.to(".hero-text", {
        y: -150,
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut"
      }, 0);

      // ==========================================
      // STAGE 2: OUR STORY ENTRY
      // ==========================================
      // Image panel enters from top
      tl.fromTo(".story-img-panel", {
        y: "-100vh",
        scale: 0.9,
      }, {
        y: "0vh",
        scale: 1,
        duration: 1.2,
        ease: "power3.inOut"
      }, 0.5);

      // Content panel enters from bottom
      tl.fromTo(".story-content-panel", {
        y: "100vh",
      }, {
        y: "0vh",
        duration: 1.2,
        ease: "power3.inOut"
      }, 0.5);

      // ==========================================
      // STAGE 3: OUR STORY INTERNAL ANIMATION
      // ==========================================
      // Hold composition for a moment, reveal text internally
      tl.fromTo(".story-text-reveal", {
        y: 30,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out"
      }, 1.7);
      
      // Subtle zoom on story image during text reveal
      tl.fromTo(".story-inner-img", {
        scale: 1.08
      }, {
        scale: 1,
        duration: 1.5,
        ease: "none"
      }, 1.7);

      // ==========================================
      // STAGE 4: OUR STORY -> SERVICES TRANSITION
      // ==========================================
      // Content panel moves away to the left
      tl.to(".story-content-panel", {
        x: "-50vw",
        opacity: 0,
        duration: 1,
        ease: "power2.inOut"
      }, 3.5);

      // Image panel expands to center and becomes the Services Stage
      tl.to(".story-img-panel", {
        x: "-25vw", // Adjust based on original offset
        width: "70vw",
        height: "65vh",
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Reset any asymmetrical clips
        duration: 1.2,
        ease: "power3.inOut"
      }, 3.5);
      
      // Bring in the small Top-Left and Bottom-Right images
      tl.fromTo(".services-tl-img", {
        x: -100, y: -100, opacity: 0, scale: 0.8
      }, {
        x: 0, y: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out"
      }, 4.2);

      tl.fromTo(".services-br-img", {
        x: 100, y: 100, opacity: 0, scale: 0.8
      }, {
        x: 0, y: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out"
      }, 4.2);

      // Huge Background Number fade in
      tl.fromTo(".services-bg-number", {
        opacity: 0, y: 50
      }, {
        opacity: 1, y: 0, duration: 1
      }, 4.2);

      // ==========================================
      // STAGE 5: SERVICES LOOP (01 - 05)
      // ==========================================
      let currentTime = 5.0;
      const serviceDuration = 2;

      services.forEach((service, index) => {
        // Show current service text
        tl.fromTo(`.service-text-${index}`, {
          opacity: 0, y: 30
        }, {
          opacity: 1, y: 0, duration: 0.5
        }, currentTime);

        // Update background number
        tl.to(".services-bg-number", {
          onStart: () => { document.querySelector('.services-bg-number').innerText = service.num; },
          onReverseComplete: () => { document.querySelector('.services-bg-number').innerText = service.num; }
        }, currentTime);

        // Zoom out central image slowly
        tl.fromTo(`.center-img-${index}`, {
          scale: 1.08
        }, {
          scale: 1, duration: serviceDuration, ease: "none"
        }, currentTime);
        
        // Small images gentle float
        tl.to(".services-tl-img", { y: -15, x: -10, duration: serviceDuration, ease: "none" }, currentTime);
        tl.to(".services-br-img", { y: 15, x: 10, duration: serviceDuration, ease: "none" }, currentTime);

        // If not the last service, transition to next
        if (index < services.length - 1) {
          const nextTime = currentTime + serviceDuration;
          
          // Fade out current text
          tl.to(`.service-text-${index}`, {
            opacity: 0, y: -30, duration: 0.5
          }, nextTime - 0.5);

          // Central image crossfade/clip to next
          tl.to(`.center-img-${index}`, {
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            scale: 0.95,
            duration: 1,
            ease: "power2.inOut"
          }, nextTime);

          tl.fromTo(`.center-img-${index + 1}`, {
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            scale: 1.15
          }, {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1,
            ease: "power2.inOut"
          }, nextTime);

          // Small images swap
          tl.to(".tl-inner", { opacity: 0, scale: 0.8, duration: 0.5 }, nextTime);
          tl.to(".br-inner", { opacity: 0, scale: 0.8, duration: 0.5 }, nextTime);
          
          // Swap image src technically happens visually via overlapping divs or we just crossfade the inner divs.
          // For simplicity in this massive timeline, we will crossfade multiple image layers inside the TL and BR containers.
          tl.to(`.tl-img-${index}`, { opacity: 0, duration: 0.5 }, nextTime);
          tl.to(`.tl-img-${index + 1}`, { opacity: 1, duration: 0.5 }, nextTime + 0.5);
          
          tl.to(`.br-img-${index}`, { opacity: 0, duration: 0.5 }, nextTime);
          tl.to(`.br-img-${index + 1}`, { opacity: 1, duration: 0.5 }, nextTime + 0.5);

          tl.to(".tl-inner", { opacity: 1, scale: 1, duration: 0.5 }, nextTime + 0.5);
          tl.to(".br-inner", { opacity: 1, scale: 1, duration: 0.5 }, nextTime + 0.5);
        }

        currentTime += serviceDuration + 1.5; // Add transition time buffer
      });

      // ==========================================
      // STAGE 6: BREAK APART & RELEASE
      // ==========================================
      const finalTime = currentTime - 1.5;
      
      tl.to(`.service-text-${services.length - 1}`, { opacity: 0, y: -30, duration: 0.5 }, finalTime);
      tl.to(".services-bg-number", { opacity: 0, scale: 1.5, duration: 1 }, finalTime);
      
      // Central expands to fill
      tl.to(".story-img-panel", { // which holds the central images
        width: "100vw",
        height: "100vh",
        x: 0,
        y: 0,
        duration: 1.5,
        ease: "power3.inOut"
      }, finalTime);

      // TL and BR fly away
      tl.to(".services-tl-img", { x: "-20vw", y: "-20vh", opacity: 0, rotation: -15, duration: 1.5 }, finalTime);
      tl.to(".services-br-img", { x: "20vw", y: "20vh", opacity: 0, rotation: 15, duration: 1.5 }, finalTime);

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-brand-navy overflow-hidden">
      
      {/* ========================================== */}
      {/* 1. HERO ELEMENTS */}
      {/* ========================================== */}
      <div className="hero-img-container absolute inset-0 w-full h-full z-0 origin-center">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070" 
          alt="Hero background" 
          className="w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
        {/* Subtle technical grid */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(to right, #ffffff11 1px, transparent 1px), linear-gradient(to bottom, #ffffff11 1px, transparent 1px)', backgroundSize: '4rem 4rem' }} />
      </div>

      <div className="hero-text absolute inset-0 z-10 flex flex-col justify-end pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl">
          <div className="flex items-center space-x-4 mb-6">
            <div className="h-[1px] w-12 bg-brand-gold" />
            <span className="text-xs md:text-sm tracking-widest font-mono uppercase text-brand-gold">Planning • Engineering • Approvals</span>
          </div>
          <h1 className="font-display font-semibold leading-[0.9] tracking-tighter mb-8 text-white" style={{ fontSize: 'clamp(4rem, 9vw, 10rem)' }}>
            SAI<br />PLANNERS
          </h1>
          <div className="flex flex-col md:flex-row md:items-end justify-between max-w-4xl gap-8 text-white">
            <div className="max-w-md">
              <p className="text-xl font-medium mb-4">Planning. Engineering. Approvals. Delivered.</p>
              <p className="text-sm md:text-base text-white/70 leading-relaxed font-body">End-to-end planning and regulatory consultancy for residential, commercial, industrial, institutional and land-development projects across Tamil Nadu.</p>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#contact" data-cursor="hover" className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold tracking-widest text-brand-navy bg-brand-gold rounded-full">GET A CONSULTATION</a>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* 2. OUR STORY & WHAT WE DO SHARED ELEMENTS */}
      {/* ========================================== */}
      
      {/* Background Number for Services (Sits behind everything in the stage) */}
      <div className="services-bg-number absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-display font-bold text-transparent opacity-0 pointer-events-none z-10" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.1)" }}>
        01
      </div>

      {/* Main Image Panel (Starts as Our Story Image -> morphs into Center Services Image) */}
      <div className="story-img-panel absolute right-[5vw] top-[15vh] w-[45vw] h-[70vh] z-20 overflow-hidden shadow-2xl" style={{ clipPath: "polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)" }}>
        
        {/* We stack the service images inside this panel. Index 0 is also the "Our Story" image. */}
        {serviceImages.map((src, i) => (
          <div 
            key={i} 
            className={`center-img-${i} absolute inset-0 w-full h-full origin-center will-change-transform`}
            style={{ 
              clipPath: i === 0 ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
              zIndex: 10 - i 
            }}
          >
            <img src={src} className={`story-inner-img w-full h-full object-cover`} alt="" />
            {i === 0 && <div className="absolute inset-0 bg-brand-navy/20 mix-blend-multiply" />}
          </div>
        ))}
      </div>

      {/* Our Story Content Panel */}
      <div className="story-content-panel absolute left-[5vw] top-[30vh] w-[40vw] z-30 bg-white text-brand-navy p-12 lg:p-16 rounded-tr-3xl shadow-2xl">
        <div className="story-text-reveal">
          <h4 className="font-mono text-sm tracking-widest text-brand-gold mb-6 uppercase">Our Story</h4>
        </div>
        <div className="story-text-reveal">
          <h2 className="font-display font-semibold text-4xl lg:text-5xl leading-tight mb-8">
            Planning is more<br />than paperwork.
          </h2>
        </div>
        <div className="story-text-reveal h-[2px] w-12 bg-brand-navy mb-8" />
        <div className="story-text-reveal space-y-6 text-brand-dark-grey font-body text-base lg:text-lg">
          <p>SAI PLANNERS is a professional planning and regulatory consultancy that helps property owners, developers, industrial entrepreneurs and institutions navigate the complexities of planning, development and statutory approvals.</p>
          <p>From site assessment and planning to compliant drawings, authority liaison and approval coordination, we manage the process with clarity, precision and commitment.</p>
        </div>
      </div>

      {/* ========================================== */}
      {/* 3. SERVICES SATELLITE IMAGES & TEXT */}
      {/* ========================================== */}
      
      {/* Top Left Image */}
      <div className="services-tl-img absolute top-[10vh] left-[10vw] w-[15vw] h-[25vh] z-30 shadow-xl opacity-0 overflow-hidden">
        <div className="tl-inner w-full h-full relative">
          {serviceImages.map((src, i) => (
             <img key={`tl-${i}`} src={serviceImages[(i + 1) % serviceImages.length]} className={`tl-img-${i} absolute inset-0 w-full h-full object-cover ${i===0 ? 'opacity-100' : 'opacity-0'}`} alt="" />
          ))}
        </div>
      </div>

      {/* Bottom Right Image */}
      <div className="services-br-img absolute bottom-[10vh] right-[10vw] w-[18vw] h-[28vh] z-30 shadow-xl opacity-0 overflow-hidden">
        <div className="br-inner w-full h-full relative">
          {serviceImages.map((src, i) => (
             <img key={`br-${i}`} src={serviceImages[(i + 2) % serviceImages.length]} className={`br-img-${i} absolute inset-0 w-full h-full object-cover ${i===0 ? 'opacity-100' : 'opacity-0'}`} alt="" />
          ))}
        </div>
      </div>

      {/* Services Text Overlay */}
      <div className="absolute inset-0 pointer-events-none z-40 flex items-center justify-center">
        <div className="relative w-full h-full">
          {services.map((service, i) => (
            <div 
              key={`text-${i}`} 
              className={`service-text-${i} absolute left-[10vw] top-[40vh] max-w-sm opacity-0 text-white pointer-events-auto`}
            >
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-brand-gold font-mono text-xl">{service.num}</span>
                <div className="h-[1px] w-12 bg-white/30" />
              </div>
              <h3 className="font-display text-4xl lg:text-5xl font-semibold leading-tight whitespace-pre-line mb-6">
                {service.title}
              </h3>
              <p className="font-body text-white/80 text-sm lg:text-base leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
