import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROCESS_STAGES = [
  { 
    num: "01", 
    title: "SITE", 
    desc: "Comprehensive site assessment and context analysis.",
    img: "/why_choose_us/empty_land.PNG"
  },
  { 
    num: "02", 
    title: "STRATEGY", 
    desc: "Structuring the precise planning strategy.",
    img: "/why_choose_us/planning_startegy.PNG"
  },
  { 
    num: "03", 
    title: "TECH COORD", 
    desc: "Technical coordination across disciplines.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071"
  },
  { 
    num: "04", 
    title: "APPROVAL DRAWINGS", 
    desc: "Preparation of regulatory approval drawings.",
    img: "/why_choose_us/approval_drawings.PNG"
  },
  { 
    num: "05", 
    title: "DOCUMENTATION", 
    desc: "Rigorous documentation and filing.",
    img: "/why_choose_us/documentation_process.jpg"
  },
  { 
    num: "06", 
    title: "AUTHORITY LIAISON", 
    desc: "Managing submissions with statutory authorities.",
    img: "/why_choose_us/authority_liason.PNG"
  },
  { 
    num: "07", 
    title: "FOLLOW-UP", 
    desc: "Ensuring clearance to move projects forward.",
    img: "/why_choose_us/follow_up_process.jpg"
  },
];

export default function AboutProcess() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const panelsRef = useRef([]);
  const imagesRef = useRef([]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 1024;
      
      // 1. Entrance Animation
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });

      // Heading entrance
      gsap.set('.process-heading', { opacity: 0, y: 50 });
      entranceTl.to('.process-heading', { opacity: 1, y: 0, duration: 1, ease: "power3.out" });

      // Panels staggered entrance (fade and slight scale to form the connected composition)
      gsap.set(panelsRef.current, { opacity: 0, y: 50, scale: 0.95 });
      entranceTl.to(panelsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.5");

      // 2. Horizontal Scroll & Cinematic Image Parallax
      if (!isMobile && trackRef.current) {
        const track = trackRef.current;
        
        // Calculate exact horizontal scroll needed to view the full track
        const getScrollDistance = () => -(track.scrollWidth - window.innerWidth + 40);

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${track.scrollWidth}`, // Pinned duration matches content width
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        });

        // Move the entire track horizontally leftwards
        scrollTl.to(track, {
          x: getScrollDistance,
          ease: "none"
        });

        // Add subtle internal image parallax to each panel to create elegant depth without floating cards
        imagesRef.current.forEach((img) => {
          if (!img) return;
          // Image starts slightly shifted left, moves right as the track scrolls left
          gsap.set(img, { xPercent: -15, scale: 1.1 });
          scrollTl.to(img, {
            xPercent: 15,
            ease: "none"
          }, 0);
        });
      } else {
        // Mobile subtle vertical parallax on images
        imagesRef.current.forEach((img) => {
          if (!img) return;
          gsap.set(img, { yPercent: -10, scale: 1.1 });
          gsap.to(img, {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          });
        });
      }

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full bg-[#030407] overflow-hidden py-16 lg:py-0">
      
      {/* Premium Cinematic Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none" />

      {/* Main Container - Pinned on Desktop */}
      <div className="w-full lg:h-screen flex flex-col justify-center pt-8 lg:pt-16">
        
        {/* Pinned Heading - One Single Horizontal Row */}
        <div className="process-heading w-full px-6 lg:px-12 mb-8 lg:mb-12 relative z-20">
          <h2 className="font-display font-bold text-[7.5vw] md:text-[50px] lg:text-[70px] xl:text-[90px] 2xl:text-[110px] text-white leading-[0.85] uppercase tracking-wide drop-shadow-2xl whitespace-nowrap overflow-hidden">
            <span className="text-brand-gold">OUR ROLE</span> — PROCESS EXPERTISE
          </h2>
        </div>

        {/* Massive Connected Image Panel Composition */}
        <div className="w-full relative z-10 overflow-hidden">
          <div 
            ref={trackRef}
            className="flex flex-col lg:flex-row gap-4 lg:gap-2 w-full lg:w-max px-6 lg:px-12 pb-10 lg:pb-12"
          >
            {PROCESS_STAGES.map((stage, idx) => (
              <div 
                key={idx}
                ref={el => panelsRef.current[idx] = el}
                className="relative flex-shrink-0 w-full sm:w-[85vw] md:w-[60vw] lg:w-[32vw] xl:w-[28vw] 2xl:w-[25vw] aspect-[4/5] lg:h-[70vh] lg:aspect-auto rounded-xl lg:rounded-2xl overflow-hidden group cursor-pointer"
                style={{
                  // Subtle scale-down effect for unhovered panels creates a gentle 3D depth field 
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* The Image itself IS the panel */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img 
                    ref={el => imagesRef.current[idx] = el}
                    src={stage.img} 
                    alt={stage.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                </div>
                
                {/* Clean dark gradient for text readability */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#020305] via-[#020305]/50 to-transparent opacity-95 transition-opacity duration-700 group-hover:opacity-100" />
                
                {/* Subtle top edge highlight */}
                <div className="absolute inset-0 border border-white/10 rounded-xl lg:rounded-2xl pointer-events-none" />

                {/* Integrated Editorial Text */}
                <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-end translate-z-[30px] transition-transform duration-500 group-hover:translate-y-[-10px]">
                  
                  {/* Process Number */}
                  <div className="flex items-center gap-3 lg:gap-4 mb-2 lg:mb-3">
                    <span className="font-mono text-brand-gold text-lg lg:text-xl font-bold tracking-[0.2em] block drop-shadow-md">
                      {stage.num}.
                    </span>
                  </div>
                  
                  {/* Process Title */}
                  <h3 className="font-display font-semibold text-white text-4xl md:text-5xl lg:text-[56px] xl:text-[64px] uppercase leading-[0.9] tracking-wider drop-shadow-xl break-words">
                    {stage.title}
                  </h3>
                  
                  {/* Process Description (Reveals smoothly on hover on desktop) */}
                  <div className="grid grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out mt-0 lg:group-hover:mt-4">
                    <div className="overflow-hidden">
                      <p className="font-sans text-white/80 text-sm md:text-base font-light leading-[1.6]">
                        {stage.desc}
                      </p>
                    </div>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
