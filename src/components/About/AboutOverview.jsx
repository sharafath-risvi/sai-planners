import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STORY_STAGES = [
  {
    num: "01",
    title: "OUR STORY",
    desc: "SAI PLANNERS is a planning, engineering and regulatory consultancy focused on helping clients develop projects in accordance with applicable planning regulations and statutory requirements."
  },
  {
    num: "02",
    title: "OUR APPROACH",
    desc: "We turn development plans into clearer pathways forward, ensuring every phase is meticulously assessed for feasibility and compliance."
  },
  {
    num: "03",
    title: "OUR EXPERIENCE",
    desc: "We work across residential, commercial, industrial, institutional, warehouse, logistics and land-development projects."
  }
];

export default function AboutOverview() {
  const containerRef = useRef(null);
  
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3000",
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      const track = document.querySelector('.story-track');
      const stages = gsap.utils.toArray('.story-stage');
      
      if (!track || stages.length === 0) return;

      const trackHeight = track.clientHeight;
      const stageHeight = stages[0].clientHeight;
      const gap = parseInt(window.getComputedStyle(track).gap) || 0;
      
      // Total distance to move so the last stage ends up exactly where the first stage started
      const maxScroll = (stageHeight + gap) * (stages.length - 1);
      
      // Background Image
      tl.to('.story-image', { scale: 1, xPercent: -5, duration: 3, ease: "none" }, 0);
      tl.to('.story-overlay', { opacity: 0.3, duration: 3, ease: "none" }, 0);
      
      // Track Movement
      tl.to('.story-track', { y: -maxScroll, ease: "none", duration: 3 }, 0);

      // Progress bar indicator
      tl.fromTo('.story-progress', { scaleY: 0 }, { scaleY: 1, ease: "none", duration: 3 }, 0);

      // States Initialization
      gsap.set(stages[0], { opacity: 1, scale: 1, filter: "blur(0px)" });
      gsap.set(stages.slice(1), { opacity: 0.15, scale: 0.95, filter: "blur(2px)" });

      // Stage 0 (Starts active, exits over first half)
      tl.to(stages[0], { opacity: 0.15, scale: 0.95, filter: "blur(2px)", duration: 1.5, ease: "power2.inOut" }, 0);

      // Stage 1 (Enters over first half, exits over second half)
      tl.to(stages[1], { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.5, ease: "power2.inOut" }, 0);
      tl.to(stages[1], { opacity: 0.15, scale: 0.95, filter: "blur(2px)", duration: 1.5, ease: "power2.inOut" }, 1.5);

      // Stage 2 (Enters over second half)
      tl.to(stages[2], { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.5, ease: "power2.inOut" }, 1.5);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <section className="relative w-full h-[100svh] bg-white flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 h-full flex flex-col md:flex-row items-center">
          
          {/* LEFT: Text Content Stack */}
          <div className="relative w-full md:w-[45%] lg:w-[40%] h-[50vh] md:h-full flex flex-col justify-center pr-8 z-20">
            
            {/* Scroll Progress Indicator */}
            <div className="hidden md:block absolute left-[-2rem] top-[30%] w-[2px] h-[40%] bg-brand-navy/10 overflow-hidden">
              <div className="story-progress w-full h-full bg-brand-gold origin-top scale-y-0" />
            </div>
            
            {/* Editorial Viewport */}
            <div className="relative w-full h-[40vh] md:h-[60vh] overflow-hidden flex flex-col justify-start mask-v-fade">
              <div className="story-track relative w-full flex flex-col gap-[15vh] md:gap-[25vh] pt-[5vh] md:pt-[10vh]">
                {STORY_STAGES.map((stage, idx) => (
                  <div key={idx} className="story-stage w-full transform-gpu origin-left">
                    <div className="typo-eyebrow text-brand-gold mb-4 md:mb-6">
                      {stage.title}
                    </div>
                    <div className="w-12 h-[2px] bg-brand-navy/20 mb-6 md:mb-8" />
                    <p className="font-display text-brand-navy/80 font-light max-w-lg" style={{fontSize:'clamp(1.4rem,2.5vw,2.2rem)',lineHeight:1.45,letterSpacing:'0.015em',fontWeight:300}}>
                      {stage.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Visual */}
          <div className="w-full md:w-[55%] lg:w-[60%] h-[40vh] md:h-[80vh] relative z-10 flex items-center justify-end">
            <div className="relative w-full md:w-[90%] h-full overflow-hidden bg-brand-soft-grey rounded-2xl md:rounded-[3rem] shadow-2xl">
              <img 
                src="/images/img1.JPG" 
                alt="Sai Planners Overview" 
                className="story-image absolute inset-0 w-full h-full object-cover scale-[1.15] origin-center"
              />
              <div className="story-overlay absolute inset-0 bg-brand-navy/5 mix-blend-multiply pointer-events-none" />
              
              {/* Subtle Architectural Grid on Image */}
              <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20">
                <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
              </div>
            </div>
          </div>

        </div>
      </section>
      
      {/* Global CSS for vertical mask */}
      <style dangerouslySetInnerHTML={{__html: `
        .mask-v-fade {
          mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
        }
      `}} />
    </div>
  );
}
