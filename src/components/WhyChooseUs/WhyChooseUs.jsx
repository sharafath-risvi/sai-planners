import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stories = [
  {
    num: "01",
    title: "SITE ASSESSMENT",
    desc: "Understanding land, context and development potential.",
    img: "/why_choose_us/empty_land.PNG"
  },
  {
    num: "02",
    title: "PLANNING STRATEGY",
    desc: "Crafting strategies aligned with regulations, planning requirements and project goals.",
    img: "/why_choose_us/planning_startegy.PNG"
  },
  {
    num: "03",
    title: "TECHNICAL COORDINATION",
    desc: "Coordinating technical inputs with precision and clarity.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071"
  },
  {
    num: "04",
    title: "APPROVAL DRAWINGS",
    desc: "Preparing accurate, approval-ready documentation.",
    img: "/why_choose_us/approval_drawings.PNG"
  },
  {
    num: "05",
    title: "AUTHORITY LIAISON",
    desc: "Liaising with authorities and managing follow-ups for smoother approvals.",
    img: "/why_choose_us/authority_liason.PNG"
  }
];

export default function WhyChooseUs() {
  const mainRef = useRef(null);
  const desktopContainerRef = useRef(null);
  const mobileContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      const isMobile = window.innerWidth < 768;

      if (!isMobile) {
        
        // ==========================================
        // EXACT REFERENCE ANIMATION LOGIC
        // Shared Top Edge + Height Unfolding
        // ==========================================

        // Initialize Backgrounds
        gsap.set('.wcu-bg-layer', { opacity: 0, scale: 1.1 });
        gsap.set('.wcu-bg-0', { opacity: 1 });
        
        // Initialize Text Content
        gsap.set('.wcu-content', { opacity: 0, y: 30 });
        gsap.set('.wcu-content-0', { opacity: 1, y: 0 });

        // Initialize Intro Header
        gsap.set('.wcu-intro-header', { opacity: 1, x: 0, scale: 1 });

        // Geometric Engine for the Track
        // Center image: 45vw x 70vh
        // Side image: 18vw x 35vh
        // Gap: 2vw
        const getPos = (offset) => {
          if (offset === 0) {
            return { 
              x: "0vw", 
              width: "45vw", 
              height: "70vh", 
              opacity: 1, 
              filter: "brightness(1)", 
              zIndex: 30 
            };
          } else {
            const sign = Math.sign(offset);
            const abs = Math.abs(offset);
            // Center is 22.5 from mid, gap is 2, half-side is 9 = 33.5vw distance for first neighbor.
            // Consecutive neighbors are 18 + 2 = 20vw apart.
            const xPos = sign * (33.5 + (abs - 1) * 20);
            
            return { 
              x: `${xPos}vw`, 
              width: "18vw", 
              height: "35vh", 
              opacity: abs > 2 ? 0 : 1, 
              filter: "brightness(0.95)",
              zIndex: 30 - abs
            };
          }
        };

        // Initialize All Items (State 0)
        stories.forEach((_, i) => {
          gsap.set(`.wcu-item-${i}`, {
            ...getPos(i),
            xPercent: -50 // Ensures width scaling happens from the center outwards
          });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: desktopContainerRef.current,
            start: "top top",
            end: "+=7500", // Long scroll for 5 items
            pin: true,
            scrub: 1,
            anticipatePin: 1
          }
        });

        const holdDur = 1.5;
        const transDur = 2.5;

        // Loop through the 5 items
        for (let active = 0; active < stories.length - 1; active++) {
          let next = active + 1;
          let startTime = active * (holdDur + transDur);

          // 1. Hold phase (Parallax active background)
          tl.to(`.wcu-bg-${active}`, { scale: 1, duration: holdDur, ease: "none" }, startTime);
          
          // 2. Transition phase
          let transStart = startTime + holdDur;

          // Update active state for the progress indicator
          tl.call(() => setActiveIndex(next), null, transStart + (transDur / 2));
          tl.call(() => setActiveIndex(active), null, transStart + (transDur / 2) - 0.01); // Handle reverse scroll

          // Fade out current text
          tl.to(`.wcu-content-${active}`, { opacity: 0, y: 30, duration: 0.8 }, transStart);

          // Fade out intro header on first transition
          if (active === 0) {
            tl.to('.wcu-intro-header', { 
              opacity: 0, 
              x: -30, 
              scale: 0.96, 
              duration: transDur, 
              ease: "power2.inOut" 
            }, transStart);
          }

          // Background crossfade (Smooth scale + opacity)
          tl.to(`.wcu-bg-${active}`, { opacity: 0, duration: transDur, ease: "power2.inOut" }, transStart)
            .to(`.wcu-bg-${next}`, { opacity: 1, duration: transDur, ease: "power2.inOut" }, transStart);

          // Shift all items in the strip (Width, Height, X offset)
          stories.forEach((_, i) => {
            let newOffset = i - next; 
            tl.to(`.wcu-item-${i}`, { 
              ...getPos(newOffset), 
              duration: transDur, 
              ease: "power2.inOut" 
            }, transStart);
          });

          // Fade in next text
          tl.to(`.wcu-content-${next}`, { opacity: 1, y: 0, duration: 1 }, transStart + transDur - 0.5);
        }

        // --- FINAL HOLD ---
        let finalTime = (stories.length - 1) * (holdDur + transDur);
        let finalBg = stories.length - 1;
        
        tl.to(`.wcu-bg-${finalBg}`, { scale: 1, duration: holdDur, ease: "none" }, finalTime);
        tl.to({}, { duration: holdDur }); // extra padding at the end

      } 
      else {
        // ==========================================
        // MOBILE FALLBACK (Vertical Stack)
        // ==========================================
        const mobileBlocks = gsap.utils.toArray('.wcu-mobile-fade');
        mobileBlocks.forEach((block) => {
          gsap.fromTo(block, 
            { opacity: 0, y: 30 },
            {
              opacity: 1, 
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: block,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });
      }

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <div ref={mainRef}>
      
      {/* ========================================== */}
      {/* DESKTOP LAYOUT (Exact Reference Interaction) */}
      {/* ========================================== */}
      <section 
        ref={desktopContainerRef} 
        id="expertise-desktop" 
        className="hidden md:flex flex-col relative w-full h-screen bg-[#050505] text-white overflow-hidden z-10"
      >
        
        {/* DEEP LAYER: Full Screen Synchronized Backgrounds */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#050505]">
          {stories.map((story, index) => (
            <div key={`bg-${index}`} className={`wcu-bg-layer wcu-bg-${index} absolute inset-0 w-full h-full`}>
              <img 
                src={story.img} 
                alt={`Background ${index}`} 
                className="w-full h-full object-cover"
              />
              {/* Premium cinematic film-grain / dark overlay combo */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/95 via-[#020202]/60 to-[#020202]/95 mix-blend-multiply" />
            </div>
          ))}
        </div>

        {/* HEADER: Introductory */}
        <div className="absolute top-[45vh] left-[4vw] xl:left-[5vw] -translate-y-1/2 z-50 pointer-events-none w-auto whitespace-nowrap">
          <div className="wcu-intro-header origin-left">
            <h4 className="typo-eyebrow text-brand-gold mb-4 lg:mb-6 text-base md:text-lg lg:text-xl">
              WHY CHOOSE
            </h4>
            <h2 className="typo-display text-white uppercase text-[4rem] md:text-[5.5rem] lg:text-[6.5rem] xl:text-[7.5rem] leading-none tracking-normal" style={{fontWeight: 300}}>
              SAI PLANNERS
            </h2>
          </div>
        </div>

        {/* PROGRESS INDICATOR (Bottom Left) */}
        <div className="absolute bottom-12 left-12 z-50 flex items-center gap-4 font-mono text-xs tracking-widest pointer-events-none">
          <span className={`transition-colors duration-500 ${activeIndex === 0 ? 'text-brand-gold font-bold' : 'text-white/40'}`}>
            01
          </span>
          <div className="relative w-32 h-[1px] bg-white/20">
            <div 
              className="absolute top-0 left-0 h-[1px] bg-brand-gold transition-all duration-700 ease-[0.76,0,0.24,1]" 
              style={{ width: `${((activeIndex) / (stories.length - 1)) * 100}%` }}
            />
            {/* The circular knob */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-gold transition-all duration-700 ease-[0.76,0,0.24,1]"
              style={{ left: `${((activeIndex) / (stories.length - 1)) * 100}%`, transform: `translate(-50%, -50%)` }}
            />
          </div>
          <span className={`transition-colors duration-500 ${activeIndex === stories.length - 1 ? 'text-brand-gold font-bold' : 'text-white/40'}`}>
            05
          </span>
        </div>

        {/* MIDDLE LAYER: Cinematic Shared-Top-Edge Film Strip */}
        <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none">
          
          {stories.map((story, index) => (
            <div 
              key={`item-${index}`}
              className={`wcu-gallery-item wcu-item-${index} absolute top-[15vh] left-1/2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-auto border border-white/10`}
              // Notice we define base border radius here. `object-fit: cover` ensures image fills dimensions safely.
              style={{ borderRadius: '12px', willChange: 'transform, width, height, opacity, filter' }}
            >
              <img 
                src={story.img} 
                alt={story.title} 
                className="w-full h-full object-cover"
              />
              
              {/* Gradient dedicated entirely to making the bottom text legible */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent pointer-events-none" />

              {/* Text Content overlay on the image */}
              <div className={`wcu-content wcu-content-${index} absolute bottom-12 left-10 right-10 z-30`}>
                <span className="typo-eyebrow text-brand-gold mb-4 block text-base md:text-lg">
                  {story.num} — {story.title}
                </span>
                <p className="typo-body text-white/90 font-light text-lg md:text-xl">
                  {story.desc}
                </p>
              </div>

            </div>
          ))}
          
        </div>

      </section>

      {/* ========================================== */}
      {/* MOBILE LAYOUT                              */}
      {/* ========================================== */}
      <section 
        ref={mobileContainerRef}
        id="expertise-mobile" 
        className="md:hidden relative w-full bg-[#050505] text-white py-24 overflow-hidden z-10"
      >
        <div className="mb-12 text-left px-6">
          <h4 className="typo-eyebrow text-brand-gold mb-2 text-base">
            WHY CHOOSE
          </h4>
          <h2 className="typo-display text-white uppercase text-[3rem] sm:text-[4rem] leading-[0.95]" style={{fontWeight: 300}}>
            SAI PLANNERS
          </h2>
        </div>

        <div className="flex flex-col gap-8 w-full px-4">
          {stories.map((story, index) => (
            <div key={`mobile-${index}`} className="wcu-mobile-fade w-full h-[50vh] rounded-[12px] overflow-hidden shadow-2xl relative border border-white/10">
              <img 
                src={story.img} 
                alt={story.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/95 via-[#050505]/40 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <span className="typo-eyebrow text-brand-gold mb-3 block text-base md:text-lg">
                  {story.num} — {story.title}
                </span>
                <p className="typo-body text-white/80 font-light text-lg md:text-xl">
                  {story.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      </div>
    </div>
  );
}
