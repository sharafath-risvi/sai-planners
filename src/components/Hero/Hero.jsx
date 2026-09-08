import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowDownRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Keep GSAP timeline fixed to 225 frames for consistent animation timings
  const frameCount = 225; 

  const globFrames1 = import.meta.glob('/public/heroforhomeframeswebp/*.webp');
  const allFrameUrls1 = Object.keys(globFrames1)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .map(path => path.replace(/^\/public/, ''));

  const WHAT_WE_DO_HERO_ENABLED = false;
  const OUR_STORY_HERO_ENABLED = false;

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d', { alpha: false }); // Optimize for no transparency

    const images1 = [];
    const scrollObj = { frame1: 1 };

    // Preload helper
    const preload = (urls, imgArray) => {
      urls.forEach((url, index) => {
        const img = new Image();
        img.onerror = () => console.warn(`Failed to load frame: ${url}`);
        if (index === 0 && imgArray === images1) {
          img.onload = () => { if (scrollObj.frame1 === 1) render(); };
        }
        img.src = url;
        imgArray.push(img);
      });
    };
    
    preload(allFrameUrls1, images1);

    // Render logic with object-fit: cover
    const render = () => {
      if (images1.length === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;

      const drawImg = (activeImages, virtualFrame, alpha) => {
        const progress = (virtualFrame - 1) / (frameCount - 1);
        const targetIndex = Math.min(Math.floor(progress * activeImages.length), activeImages.length - 1);
        
        let img = activeImages[targetIndex];
        
        if (!img || !img.complete || img.naturalWidth === 0) {
          for (let i = targetIndex - 1; i >= 0; i--) {
            if (activeImages[i] && activeImages[i].complete && activeImages[i].naturalWidth > 0) {
              img = activeImages[i];
              break;
            }
          }
        }
        
        if (!img || !img.complete || img.naturalWidth === 0) return;

        const iw = img.naturalWidth;
        const ih = img.naturalHeight;

        if (canvas.width !== iw) canvas.width = iw;
        if (canvas.height !== ih) canvas.height = ih;

        context.globalAlpha = alpha;
        context.clearRect(0, 0, iw, ih);
        context.drawImage(img, 0, 0, iw, ih);
      };

      // Draw Video 1 base
      drawImg(images1, scrollObj.frame1, 1);
      
      context.globalAlpha = 1; // reset
    };

    // Ensure first frame renders when loaded (safety net if already loaded)
    if (images1[0]?.complete) {
      render();
    }

    // Handle Resize
    const handleResize = () => {
      render();
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Trigger once on mount

    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=600%", // Adjusted for single video sequence
          scrub: true,
          pin: true,
          onUpdate: () => {
            render();
          }
        }
      });

      const INTRO_DURATION = 40;

      // Phase 0: Initial Frozen Video + Intro Exits
      // 1. SAI moves TOP/LEFT
      tl.to('.hero-door-top', {
        yPercent: -100,
        xPercent: -20,
        duration: INTRO_DURATION,
        ease: "power2.inOut"
      }, 0);
      
      // 2. PLANNERS moves BOTTOM/RIGHT
      tl.to('.hero-door-bottom', {
        yPercent: 100,
        xPercent: 20,
        duration: INTRO_DURATION,
        ease: "power2.inOut"
      }, 0);

      tl.to('.hero-intro-overlay', {
        opacity: 0,
        duration: INTRO_DURATION,
        ease: "power2.inOut"
      }, 0);

      // Video frames tween (Starts exclusively AFTER intro finishes)
      tl.to(scrollObj, {
        frame1: frameCount,
        snap: "frame1",
        ease: "none",
        duration: frameCount
      }, INTRO_DURATION);

      // Phase 1.5: Project Category Labels (Synced with the 4 video segments)
      const V_DUR = frameCount / 4;
      const START_V1 = INTRO_DURATION;
      const START_V2 = INTRO_DURATION + V_DUR;
      const START_V3 = INTRO_DURATION + V_DUR * 2;
      const START_V4 = INTRO_DURATION + V_DUR * 3;
      const END_V4 = INTRO_DURATION + frameCount;
      const FADE_DUR = 6; // units for fade/slide

      const animateCat = (cls, start, end, isResidential = false, isFactory = false) => {
        // Add a massive delay specifically for the Residential label so it does not appear initially
        const labelStart = isResidential ? start + 30 : start + 14; 
        
        if (isFactory) {
          // FACTORY: disappear immediately (imperceptibly short transition) exactly when the state ends
          tl.fromTo(cls, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: FADE_DUR, ease: "power2.out" }, labelStart);
          tl.to(cls, { opacity: 0, duration: 1, ease: "none" }, end - 1);
        } else {
          // OTHERS: End earlier so it disappears completely before the next segment
          const labelEnd = end - 8; 
          tl.fromTo(cls, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: FADE_DUR, ease: "power2.out" }, labelStart);
          tl.to(cls, { opacity: 0, y: -10, duration: FADE_DUR, ease: "power2.in" }, labelEnd - FADE_DUR);
        }
      };

      animateCat('.hero-cat-1', START_V1, START_V2, true, false);
      animateCat('.hero-cat-2', START_V2, START_V3, false, false);
      animateCat('.hero-cat-3', START_V3, START_V4, false, false);
      animateCat('.hero-cat-4', START_V4, END_V4, false, true);

      // Phase 2: Our Story Card (Shifted by INTRO_DURATION to remain perfectly synced with video)
      if (OUR_STORY_HERO_ENABLED) {
        tl.fromTo(".hero-our-story-card",
          { y: 250, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 25, ease: "power2.out" },
          INTRO_DURATION + 65
        );
        tl.to(".hero-our-story-card",
          { y: -250, autoAlpha: 0, duration: 25, ease: "power2.in" },
          INTRO_DURATION + 90
        );
      }

      // Phase 9: FINAL CONTENT STATE (After Video 1 finishes)
      const START_FINAL = INTRO_DURATION + frameCount;
      
      const FINAL_OVERLAY_DUR = 40;
      tl.to('.hero-final-bg-overlay', { opacity: 1, duration: FINAL_OVERLAY_DUR, ease: "power2.inOut" }, START_FINAL);

      // Final State: All 4 labels appear immediately (instant transition)
      tl.fromTo(['.hero-cat-1', '.hero-cat-2', '.hero-cat-3', '.hero-cat-4'], 
        { opacity: 0, y: 0 }, 
        { opacity: 1, y: 0, duration: 0.1, ease: "none" }, 
        START_FINAL
      );

      const FINAL_ITEM_DUR = 30;
      const FINAL_STAGGER = 20;
      const TEXT_APPEAR_START = START_FINAL + (FINAL_STAGGER * 1);

      // The exact moment the Hero content starts appearing, hide all 4 labels immediately
      tl.to(['.hero-cat-1', '.hero-cat-2', '.hero-cat-3', '.hero-cat-4'], 
        { opacity: 0, duration: 0.1, ease: "none" }, 
        TEXT_APPEAR_START
      );

      // Blur the background canvas specifically, leaving all foreground content completely sharp
      tl.fromTo('.hero-canvas-wrapper', 
        { filter: 'blur(0px)' }, 
        { filter: 'blur(10px)', duration: FINAL_ITEM_DUR * 1.5, ease: "power2.out" }, 
        TEXT_APPEAR_START
      );

      tl.fromTo('.hero-final-eyebrow', { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: FINAL_ITEM_DUR, ease: "power2.out" }, TEXT_APPEAR_START);
      tl.fromTo('.hero-final-heading', { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: FINAL_ITEM_DUR, ease: "power2.out" }, START_FINAL + (FINAL_STAGGER * 2));
      tl.fromTo('.hero-final-desc', { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: FINAL_ITEM_DUR, ease: "power2.out" }, START_FINAL + (FINAL_STAGGER * 3));
      tl.fromTo('.hero-final-btn-1', { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: FINAL_ITEM_DUR, ease: "power2.out" }, START_FINAL + (FINAL_STAGGER * 4));
      tl.fromTo('.hero-final-btn-2', { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: FINAL_ITEM_DUR, ease: "power2.out" }, START_FINAL + (FINAL_STAGGER * 5));

      // Phase 10: Hold Final State so user can read it before moving to the next section
      const FINAL_HOLD = 100;
      tl.to({}, { duration: FINAL_HOLD });

    }, containerRef);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[100vh] bg-black overflow-hidden">
      
      {/* Cinematic Canvas */}
      <div className="hero-canvas-wrapper absolute inset-0 w-full h-full overflow-hidden bg-black flex items-center justify-center">
        <canvas 
          ref={canvasRef} 
          className="w-full h-[85%] md:h-full object-cover"
        />
      </div>

      {/* INITIAL INTRO OVERLAY & TEXT */}
      <div className="hero-intro-overlay absolute inset-0 bg-black/60 z-30 pointer-events-none" />

      {/* Massive SAI PLANNERS foreground text */}
      <div className="hero-door-top absolute top-0 left-0 w-full h-[50vh] z-50 flex items-end justify-center pb-2 md:pb-6 pointer-events-none">
        <h1 className="font-display text-white text-[3.5rem] md:text-[6.5rem] lg:text-[11rem] tracking-[0.2em] uppercase leading-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">SAI</h1>
      </div>
      <div className="hero-door-bottom absolute bottom-0 left-0 w-full h-[50vh] z-50 flex items-start justify-center pt-2 md:pt-6 pointer-events-none">
        <h1 className="font-display text-white text-[3.5rem] md:text-[6.5rem] lg:text-[11rem] tracking-[0.2em] uppercase leading-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">PLANNERS</h1>
      </div>

      {/* PROJECT CATEGORY LABELS */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        {[
          { id: 1, num: "01", text: "RESIDENTIAL", pos: "top-24 md:top-32 left-8 md:left-16 items-start text-left" },
          { id: 2, num: "02", text: "COMMERCIAL", pos: "top-24 md:top-32 right-8 md:right-16 items-end text-right" },
          { id: 3, num: "03", text: "WAREHOUSE", pos: "bottom-12 md:bottom-16 right-8 md:right-16 items-end text-right" },
          { id: 4, num: "04", text: "FACTORY", pos: "bottom-12 md:bottom-16 left-8 md:left-16 items-start text-left" }
        ].map((cat) => (
          <div key={cat.id} className={`hero-cat-${cat.id} absolute ${cat.pos} opacity-0 flex flex-col gap-1 md:gap-2 drop-shadow-2xl`}>
            <div className={`flex items-center gap-3 ${cat.id === 2 || cat.id === 3 ? 'flex-row-reverse' : ''}`}>
              <span className="text-brand-gold font-mono text-sm md:text-base tracking-[0.2em] font-bold drop-shadow-lg">{cat.num}</span>
              <div className="h-[1px] w-8 md:w-12 bg-brand-gold/60" />
            </div>
            <span className="text-white font-display font-bold text-3xl md:text-4xl lg:text-5xl uppercase tracking-[0.1em] leading-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
              {cat.text}
            </span>
          </div>
        ))}
      </div>

      {/* FINAL CINEMATIC BLUR OVERLAY */}
      {WHAT_WE_DO_HERO_ENABLED && (
        <div className="hero-final-blur absolute inset-0 w-full h-full bg-[#050505]/40 backdrop-blur-xl opacity-0 pointer-events-none z-10" />
      )}

      {/* NEW WHAT WE DO FINAL CONTENT */}
      {WHAT_WE_DO_HERO_ENABLED && (
        <div className="hero-final-content absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6 text-center">
          <h2 className="hero-wwd-heading font-display font-bold text-white text-6xl sm:text-7xl md:text-[7.5rem] lg:text-[10rem] uppercase tracking-wider mb-10 md:mb-14 drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)] leading-none">
            WHAT WE <span className="text-brand-gold">DO</span>
          </h2>
          <p className="hero-wwd-desc font-sans text-white/90 text-lg md:text-xl font-light max-w-2xl leading-relaxed drop-shadow-md">
            End-to-end planning and regulatory consultancy for residential, commercial, industrial, and institutional projects across Tamil Nadu.
          </p>
        </div>
      )}

      {/* Cinematic Our Story Reveal - Driven by scroll */}
      {OUR_STORY_HERO_ENABLED && (
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-20 px-6">
          
          {/* ONE SINGLE OUR STORY CARD */}
          <div className="hero-our-story-card absolute text-center max-w-[95vw] lg:max-w-5xl w-[90%] md:w-auto p-10 md:p-14 rounded-2xl bg-[#0a0510]/80 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] invisible opacity-0 translate-y-[250px]">
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-display uppercase tracking-widest mb-6 leading-[1.2] drop-shadow-lg">
              BUILDING THE FOUNDATION<br />
              <span className="text-brand-gold italic lowercase text-2xl md:text-3xl lg:text-4xl xl:text-5xl">for tomorrow</span>
            </h2>
            <p className="typo-body text-white/90 text-base md:text-lg drop-shadow-md max-w-3xl mx-auto">
              A legacy of precision and vision. We guide visionary projects from concept to reality with unmatched regulatory expertise and strategic planning.
            </p>
          </div>

        </div>
      )}

      {/* NEW 4 SERVICES OVERLAY (Triggered during Video 2) */}
      {WHAT_WE_DO_HERO_ENABLED && (
        <div className="hero-services-blur absolute inset-0 w-full h-full bg-[#050505]/40 backdrop-blur-xl opacity-0 pointer-events-none z-10" />
      )}
      
      {WHAT_WE_DO_HERO_ENABLED && (
        <div className="hero-services-container absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-8 md:px-12 lg:px-20">
          <div className="w-full max-w-[1600px] flex flex-col md:flex-row justify-between items-start gap-12 md:gap-8 lg:gap-12">
            {[
              {
                num: "01",
                title: "DTCP, CMDA & LPA\nPLAN APPROVALS"
              },
              {
                num: "02",
                title: "RERA APPROVALS\n& PROJECT COMPLIANCE"
              },
              {
                num: "03",
                title: "LAND DEVELOPMENT\n& LAYOUT PLANNING"
              },
              {
                num: "04",
                title: "INDUSTRIAL ENGINEERING\n& PLANNING"
              }
            ].map((svc, i) => (
              <div key={i} className={`hero-service-card-${i} opacity-0 flex-1 flex flex-col items-start w-full`}>
                <span className="font-mono text-5xl md:text-6xl lg:text-[5rem] text-brand-gold/90 mb-6 md:mb-8 font-light leading-none">{svc.num}</span>
                <div className="h-[1px] w-12 md:w-16 bg-white/30 mb-6 md:mb-8" />
                <h3 className="font-display font-semibold text-xl md:text-xl lg:text-2xl leading-[1.1] whitespace-pre-line text-white uppercase tracking-wider drop-shadow-md">
                  {svc.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FINAL CONTENT STATE (Triggered after Video 2 ends) */}
      <div className="hero-final-bg-overlay absolute inset-0 w-full h-full bg-gradient-to-r from-black/95 via-black/60 to-transparent from-0% via-40% to-75% opacity-0 pointer-events-none z-10" />
      
      <div className="absolute inset-0 z-20 flex flex-col justify-center pointer-events-none px-8 md:px-16 lg:px-24">
        <div className="w-full max-w-4xl xl:max-w-5xl flex flex-col items-start text-left mt-0 md:-mt-6 lg:-mt-12 xl:-mt-16">
          <div className="hero-final-eyebrow opacity-0 flex items-center space-x-4 mb-6 md:mb-8">
            <span className="font-mono text-sm md:text-base text-brand-gold tracking-[0.2em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Planning • Engineering • Approvals</span>
            <div className="h-[1px] w-12 bg-brand-gold/80" />
          </div>
          
          <h2 className="hero-final-heading opacity-0 font-display font-semibold text-white text-[3.25rem] md:text-[4.25rem] lg:text-[5.75rem] xl:text-[6.5rem] uppercase tracking-wide mb-8 md:mb-10 leading-[1.05] drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
            PLANNING THAT MOVES<br/>PROJECTS FORWARD.
          </h2>
          
          <p className="hero-final-desc opacity-0 font-sans text-white/80 text-xl md:text-2xl font-light max-w-3xl leading-relaxed mb-12 lg:mb-16 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
            End-to-end planning and regulatory consultancy for residential, commercial, industrial, and institutional projects across Tamil Nadu.
          </p>
          
          <div className="hero-final-buttons flex flex-row items-center justify-start gap-2 md:gap-8 pointer-events-auto w-full">
            <Link to="/contact" className="hero-final-btn-1 opacity-0 flex-1 md:flex-none inline-flex items-center justify-center px-2 py-3.5 md:px-10 md:py-4 text-[9px] sm:text-xs md:text-sm font-semibold tracking-widest text-[#0a0510] bg-brand-gold rounded-full transition-all duration-300 hover:bg-brand-navy hover:text-white hover:scale-105 shadow-[0_4px_20px_rgba(212,175,55,0.4)] whitespace-nowrap">
              GET A CONSULTATION
            </Link>
            <Link to="/services" className="hero-final-btn-2 opacity-0 flex-1 md:flex-none inline-flex items-center justify-center px-2 py-3.5 md:px-10 md:py-4 text-[9px] sm:text-xs md:text-sm font-medium tracking-widest text-white bg-white/5 border border-white/20 rounded-full transition-all hover:bg-white/10 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] whitespace-nowrap">
              EXPLORE OUR SERVICES
            </Link>
          </div>
        </div>
      </div>
      
      
    </div>
  );
}
