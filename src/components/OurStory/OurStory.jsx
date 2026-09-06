import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function OurStory() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      
      const isMobile = window.innerWidth < 768;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=120%", // Brief pin just for the transition so user can naturally scroll to next section
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      // 1. Cinematic Wipe (White panel expands, pushing divider right)
      tl.to('.curtain-white', { width: "100%", duration: 2, ease: "power2.inOut" }, 0);
      
      // 2. Fade out the typography gracefully
      tl.to('.story-text', { opacity: 0, x: 30, duration: 1.2, ease: "power2.inOut" }, 0.4);
      tl.to('.our-text', { opacity: 0, x: -30, duration: 1.2, ease: "power2.inOut" }, 0.6);
      
      // 3. Fade out the divider near the end of the wipe
      tl.to('.curtain-divider', { opacity: 0, duration: 0.5 }, 1.5);

      // 4. Fade out the entire transition overlay to reveal content cleanly
      tl.to('.transition-overlay', { opacity: 0, duration: 0.8, ease: "power2.inOut" }, 1.8);

      // 5. Main content animations (synced with the wipe completion)
      tl.to('.main-image', { scale: 1, duration: 2, ease: "power2.out" }, 1.0);
      tl.to('.bg-text', { opacity: 1, duration: 2, ease: "power2.out" }, 1.5);
      tl.to('.content-panel', { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, 1.8);

      // 6. Architectural details fade in
      tl.to('.arch-line-h', { scaleX: 1, duration: 1.5, ease: "power3.inOut", stagger: 0.2 }, 2.0);
      tl.to('.arch-line-v', { scaleY: 1, duration: 1.5, ease: "power3.inOut", stagger: 0.2 }, 2.0);
      tl.to('.arch-crosshair', { opacity: 1, duration: 1 }, 2.5);
      tl.to('.arch-label', { opacity: 1, duration: 1, stagger: 0.2 }, 2.7);

      // Pad the end slightly
      tl.to({}, { duration: 0.5 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <div ref={containerRef}>
        <section id="about" className="relative w-full h-[100svh] bg-[#F5F5F7] text-brand-navy overflow-hidden flex items-center justify-center">

        {/* ========================================== */}
        {/* OVERSIZED BACKGROUND TYPOGRAPHY            */}
        {/* ========================================== */}
        <div className="absolute inset-0 flex flex-col justify-center overflow-hidden pointer-events-none z-0 select-none">
          <h2 className="bg-text font-display font-semibold text-[28vw] leading-[0.85] tracking-tighter text-brand-navy/5 whitespace-nowrap opacity-0 text-center">
            OUR STORY
          </h2>
        </div>

        {/* ========================================== */}
        {/* ARCHITECTURAL DETAILS LAYER                */}
        {/* ========================================== */}
        <div className="absolute inset-0 z-10 pointer-events-none hidden md:block">
          {/* Grid lines */}
          <div className="arch-line-h absolute top-[15%] left-0 w-full h-[1px] bg-brand-navy/10 origin-left scale-x-0" />
          <div className="arch-line-h absolute bottom-[15%] left-0 w-full h-[1px] bg-brand-navy/10 origin-left scale-x-0" />
          <div className="arch-line-v absolute top-0 left-[15%] w-[1px] h-full bg-brand-navy/10 origin-top scale-y-0" />
          <div className="arch-line-v absolute top-0 right-[15%] w-[1px] h-full bg-brand-navy/10 origin-top scale-y-0" />

          {/* Tech labels */}
          <div className="arch-label absolute top-[15%] left-[15%] -translate-y-[150%] text-[9px] font-mono tracking-widest text-brand-navy/40 opacity-0">
            LAT 13.0827 / LON 80.2707
          </div>
          <div className="arch-label absolute bottom-[15%] right-[15%] translate-y-[150%] text-[9px] font-mono tracking-widest text-brand-navy/40 opacity-0 text-right">
            PLANNING • ENGINEERING • REGULATORY
          </div>
          <div className="arch-label absolute top-8 right-12 text-[10px] font-mono tracking-[0.2em] text-brand-gold font-bold opacity-0">
            01 / OUR STORY
          </div>

          {/* Crosshairs */}
          <div className="arch-crosshair absolute top-[15%] left-[15%] w-4 h-4 -translate-x-1/2 -translate-y-1/2 opacity-0">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-brand-navy/30" />
            <div className="absolute top-0 left-1/2 w-[1px] h-full bg-brand-navy/30" />
          </div>
          <div className="arch-crosshair absolute bottom-[15%] right-[15%] w-4 h-4 -translate-x-1/2 -translate-y-1/2 opacity-0">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-brand-navy/30" />
            <div className="absolute top-0 left-1/2 w-[1px] h-full bg-brand-navy/30" />
          </div>
        </div>

        {/* ========================================== */}
        {/* MAIN SCENE (Image + Text)                  */}
        {/* ========================================== */}
        <div className="relative z-20 w-full h-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-start justify-between pt-[12vh] md:pt-[18vh] pb-12 gap-8 lg:gap-16">
          
          {/* 60% Image on Left */}
          <div className="main-image-wrapper relative w-full md:w-[55%] lg:w-[60%] h-[45vh] md:h-[65vh] rounded-2xl overflow-hidden shadow-2xl origin-center border border-brand-navy/10 shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1448518184296-a22facb4446f?q=80&w=2070" 
              alt="Architectural Planning" 
              className="main-image w-full h-full object-cover scale-[1.08]"
            />
          </div>

          {/* Text Composition on Right, Upper Middle */}
          <div className="content-panel relative w-full md:w-[40%] lg:w-[35%] flex flex-col justify-start z-30 opacity-0 translate-y-10 pt-4 md:pt-0">
            
            <div className="flex items-center gap-4 mb-6">
              <span className="typo-eyebrow text-brand-gold">
                OUR STORY
              </span>
            </div>

            <h2 className="typo-section text-brand-navy mb-8">
              Planning With Purpose. <span className="font-semibold text-brand-gold italic">Building With Confidence.</span>
            </h2>

            <div className="w-12 h-[2px] bg-brand-navy mb-8" />

            <p className="typo-body text-brand-dark-grey font-light">
              SAI PLANNERS is a premier planning, engineering, and regulatory consultancy focused on helping clients develop projects with absolute clarity. From master site assessment and compliant drawings to authority liaison, we manage the entire lifecycle with precision and commitment.
            </p>
          </div>

        </div>

        {/* ========================================== */}
        {/* LAYER 3: THE TRANSITION OVERLAY            */}
        {/* ========================================== */}
        <div className="transition-overlay absolute inset-0 w-full h-full z-50 pointer-events-none overflow-hidden">
          
          {/* Dynamic Backgrounds */}
          <div className="absolute inset-0 flex">
            <div className="curtain-white h-full bg-[#F5F5F7] w-[50%] relative shadow-[5px_0_30px_rgba(0,0,0,0.15)] z-10" />
            <div className="curtain-divider w-[1px] md:w-[2px] h-full bg-brand-gold/40 z-20" />
            <div className="curtain-dark h-full bg-brand-navy flex-1 z-0" />
          </div>

          {/* Typography (Absolutely Positioned for Stability) */}
          <div className="absolute inset-0 flex items-center justify-center z-30">
             <div className="w-1/2 flex justify-end pr-8 md:pr-16 lg:pr-32">
                <h1 className="our-text font-display font-semibold leading-none text-brand-navy" style={{fontSize:'clamp(4rem,12vw,11rem)',letterSpacing:'-0.04em'}}>
                  OUR
                </h1>
             </div>
             <div className="w-1/2 flex justify-start pl-8 md:pl-16 lg:pl-32">
                <h1 className="story-text font-display font-semibold leading-none text-white" style={{fontSize:'clamp(4rem,12vw,11rem)',letterSpacing:'-0.04em'}}>
                  STORY
                </h1>
             </div>
          </div>

        </div>

      </section>
      </div>
    </div>
  );
}
