import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  { id: "sketch", label: "SKETCH", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071", filter: "grayscale(100%) contrast(150%) brightness(1.2)" }, // Simulating sketch
  { id: "plan", label: "PLANNING", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071", filter: "sepia(50%) hue-rotate(180deg) opacity(0.8)" }, // Simulating blueprint
  { id: "coord", label: "COORDINATION", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069", filter: "none" }, // Real photo building
  { id: "approve", label: "APPROVAL", img: "https://images.unsplash.com/photo-1541888081622-482a5fbc40d5?q=80&w=2070", filter: "none" }, // Real photo modern
  { id: "execute", label: "EXECUTION", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070", filter: "none" }, // Real photo final
];

export default function AboutMission() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=4000",
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      // Initial States
      gsap.set('.mission-img', { opacity: 0, scale: 1.1 });
      gsap.set('.mission-img-0', { opacity: 1, scale: 1 });
      gsap.set('.stage-label', { opacity: 0.3, y: 10 });
      gsap.set('.stage-label-0', { opacity: 1, y: 0, color: '#FCAE16' });

      // Transform Sequence
      for (let i = 0; i < STAGES.length - 1; i++) {
        const next = i + 1;
        
        // Hold current
        tl.to({}, { duration: 0.5 });

        // Transition to next
        tl.to(`.mission-img-${i}`, { opacity: 0, scale: 1.1, duration: 1 }, `step${i}`)
          .to(`.mission-img-${next}`, { opacity: 1, scale: 1, duration: 1 }, `step${i}`)
          .to(`.stage-label-${i}`, { opacity: 0.3, color: '#FFFFFF', duration: 0.5 }, `step${i}`)
          .to(`.stage-label-${next}`, { opacity: 1, y: 0, color: '#FCAE16', duration: 0.5 }, `step${i}`);
      }

      // Final Hold
      tl.to({}, { duration: 1 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <section className="relative w-full h-screen bg-brand-navy overflow-hidden flex items-center justify-center">
      
      <div className="absolute top-12 left-12 lg:left-20 z-20 pointer-events-none">
        <h4 className="font-mono text-xs tracking-widest text-brand-gold font-bold mb-2 uppercase">
          07 / OUR MISSION
        </h4>
        <h2 className="font-display font-semibold text-3xl md:text-5xl lg:text-6xl tracking-tight text-white leading-none max-w-2xl drop-shadow-lg">
          FROM DEVELOPMENT PLAN TO APPROVAL-READY PROJECT.
        </h2>
      </div>

      {/* Image Transformation Stage */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {STAGES.map((stage, idx) => (
          <img 
            key={idx}
            src={stage.img} 
            alt={stage.label}
            className={`mission-img mission-img-${idx} absolute inset-0 w-full h-full object-cover`}
            style={{ filter: stage.filter }}
          />
        ))}
        {/* Dark vignette to keep text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/80 via-brand-navy/30 to-brand-navy/80" />
      </div>

      {/* Progress Track */}
      <div className="absolute bottom-12 left-0 w-full px-6 md:px-20 z-20 flex justify-center">
        <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-4 md:gap-12 w-full max-w-4xl">
          {STAGES.map((stage, idx) => (
            <React.Fragment key={idx}>
              <div className={`stage-label stage-label-${idx} font-mono text-[10px] md:text-xs tracking-[0.2em] md:tracking-widest font-bold whitespace-nowrap`}>
                {stage.label}
              </div>
              {idx < STAGES.length - 1 && (
                <div className="hidden md:block flex-1 h-[1px] bg-white/20" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

    </section>
    </div>
  );
}
