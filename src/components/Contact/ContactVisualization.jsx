import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WORKFLOW_NODES = [
  "PROJECT INTENT",
  "SITE LOCATION",
  "DEVELOPMENT TYPE",
  "SERVICE REQUIREMENT",
  "APPROVAL PATHWAY"
];

export default function ContactVisualization() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2000",
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      // Initial States
      gsap.set('.vis-node', { opacity: 0, y: 30 });
      gsap.set('.vis-line-segment', { scaleY: 0, transformOrigin: "top center" });
      gsap.set('.vis-bg', { scale: 1.1, filter: "grayscale(100%) brightness(0.3)" });

      // Background Subtle Move
      tl.to('.vis-bg', { scale: 1, filter: "grayscale(50%) brightness(0.5)", duration: 5, ease: "none" }, 0);

      // Workflow reveal sequence
      WORKFLOW_NODES.forEach((node, i) => {
        // Reveal Node
        tl.to(`.vis-node-${i}`, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, i);
        
        // Draw line to next node (except for the last one)
        if (i < WORKFLOW_NODES.length - 1) {
          tl.to(`.vis-line-segment-${i}`, { scaleY: 1, duration: 0.5, ease: "none" }, i + 0.5);
        }
      });
      
      // Final highlight
      tl.to('.vis-node', { color: "#FCAE16", stagger: 0.1, duration: 0.5 }, WORKFLOW_NODES.length);
      tl.to({}, { duration: 1 }); // hold

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <section className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden flex items-center justify-center">
      
      {/* Background Cinematic Image */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <img 
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071" 
          alt="Planning Visualization" 
          className="vis-bg absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/80 mix-blend-multiply" />
      </div>

      {/* Workflow Visualization */}
      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center">
        {WORKFLOW_NODES.map((node, i) => (
          <React.Fragment key={i}>
            
            {/* Node */}
            <div className={`vis-node vis-node-${i} flex items-center gap-4`}>
              <div className="w-2 h-2 rounded-full bg-brand-gold" />
              <h3 className="font-mono text-sm md:text-base tracking-[0.2em] font-bold text-white uppercase whitespace-nowrap">
                {node}
              </h3>
            </div>

            {/* Connecting Line */}
            {i < WORKFLOW_NODES.length - 1 && (
              <div className="h-16 md:h-24 w-px bg-white/10 relative my-2">
                <div className={`vis-line-segment vis-line-segment-${i} absolute top-0 left-0 w-full h-full bg-brand-gold`} />
              </div>
            )}
            
          </React.Fragment>
        ))}
      </div>

      {/* Abstract Blueprint Overlays */}
      <div className="absolute bottom-10 left-10 text-white/20 font-mono text-xs tracking-widest pointer-events-none">
        <div>DWG: CONTACT.SEQ</div>
        <div>SCALE: 1:100</div>
        <div>REV: A</div>
      </div>
    </section>
    </div>
  );
}
