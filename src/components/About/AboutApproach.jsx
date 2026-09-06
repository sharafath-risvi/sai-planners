import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutApproach() {
  const containerRef = useRef(null);
  
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3500",
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      // Initial States
      gsap.set('.approach-title', { opacity: 1, y: 0 });
      gsap.set('.site-boundary', { opacity: 0 });
      gsap.set('.planning-grid', { opacity: 0, scale: 0.95 });
      gsap.set('.jurisdiction-info', { opacity: 0, x: 30 });
      gsap.set('.approval-path', { scaleY: 0, transformOrigin: "bottom center", opacity: 0 });
      gsap.set('.tech-inputs', { opacity: 0, y: 20 });
      gsap.set('.bg-img', { scale: 1.1, filter: 'grayscale(0%)' });
      gsap.set('.overlay-dark', { opacity: 0.2 });

      // 1. Zoom out slightly and darken
      tl.to('.bg-img', { scale: 1, filter: 'grayscale(20%)', duration: 1 })
        .to('.overlay-dark', { opacity: 0.6, duration: 1 }, 0);

      // 2. Site Boundary Draw
      tl.to('.site-boundary', { opacity: 1, duration: 0.2 })
        .to('.site-boundary line, .site-boundary polyline, .site-boundary rect', { 
          strokeDashoffset: 0, 
          strokeDasharray: 1000, // Fallback since drawSVG requires paid plugin, we use basic CSS stroke anim approach via GSAP
          duration: 1.5 
        }, "+=0.2");

      // 3. Planning Grid Appears
      tl.to('.planning-grid', { opacity: 0.4, scale: 1, duration: 1 }, "-=0.5");

      // 4. Jurisdiction Info
      tl.to('.jurisdiction-info', { opacity: 1, x: 0, duration: 1 });

      // 5. Approval Pathway Lines Animate
      tl.to('.approval-path', { opacity: 1, scaleY: 1, stagger: 0.5, duration: 1.5 });

      // 6. Technical Inputs
      tl.to('.tech-inputs', { opacity: 1, y: 0, stagger: 0.3, duration: 1 });

      // 7. Transition to Approval Ready (Title change)
      tl.to('.approach-title-1', { opacity: 0, y: -20, duration: 0.5 })
        .to('.approach-title-2', { opacity: 1, y: 0, duration: 0.5 }, "-=0.2");

      // 8. Final Polish & Hold
      tl.to('.site-boundary', { stroke: '#FCAE16', duration: 1 }) // Turns gold
        .to({}, { duration: 1 }); // hold

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <section className="relative w-full h-screen bg-brand-navy overflow-hidden flex items-center justify-center">
      
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070" 
          alt="Aerial Site Map" 
          className="bg-img absolute inset-0 w-full h-full object-cover"
        />
        <div className="overlay-dark absolute inset-0 bg-brand-navy mix-blend-multiply" />
      </div>

      {/* SVG Blueprint Overlays */}
      <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center">
        {/* Planning Grid */}
        <div className="planning-grid absolute w-[80vw] h-[80vh] border border-white/20">
          <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '5vw 5vw' }} />
        </div>

        {/* Site Boundary (Simulated SVG) */}
        <svg className="site-boundary absolute w-[60vw] h-[60vh] overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline 
            points="10,10 90,20 80,90 20,80 10,10" 
            fill="none" 
            stroke="white" 
            strokeWidth="0.5"
            strokeDasharray="300"
            strokeDashoffset="300" 
          />
        </svg>

        {/* Approval Pathway Lines (Vertical lines rising up) */}
        <div className="absolute bottom-0 w-[60vw] h-[40vh] flex justify-between px-10">
          <div className="approval-path w-[2px] h-full bg-brand-gold/60 relative">
            <div className="absolute -top-3 -left-1.5 w-3 h-3 rounded-full bg-brand-gold" />
          </div>
          <div className="approval-path w-[2px] h-full bg-brand-gold/60 relative">
            <div className="absolute -top-3 -left-1.5 w-3 h-3 rounded-full bg-brand-gold" />
          </div>
          <div className="approval-path w-[2px] h-full bg-brand-gold/60 relative">
            <div className="absolute -top-3 -left-1.5 w-3 h-3 rounded-full bg-brand-gold" />
          </div>
        </div>
      </div>

      {/* Content Overlays */}
      <div className="relative z-20 w-full h-full max-w-[1800px] mx-auto px-12 lg:px-20 pt-20">
        
        {/* Titles */}
        <div className="absolute top-20 left-12 lg:left-20">
          <h4 className="font-mono text-xs tracking-widest text-brand-gold font-bold mb-4 uppercase">
            03 / OUR APPROACH
          </h4>
          <div className="relative h-32">
            <h2 className="approach-title approach-title-1 absolute top-0 left-0 font-display font-semibold text-5xl lg:text-7xl tracking-tighter leading-none text-white drop-shadow-lg">
              UNDERSTAND FIRST.<br/>
              PLAN WITH PRECISION.
            </h2>
            <h2 className="approach-title approach-title-2 absolute top-0 left-0 font-display font-semibold text-5xl lg:text-7xl tracking-tighter leading-none text-brand-gold drop-shadow-lg opacity-0 translate-y-5">
              COMPLIANT.<br/>
              APPROVAL-READY.
            </h2>
          </div>
        </div>

        {/* Jurisdiction Info Box */}
        <div className="jurisdiction-info absolute top-[40%] right-12 lg:right-20 bg-white/10 backdrop-blur-md border border-white/20 p-6 max-w-sm rounded-xl">
          <div className="font-mono text-xs text-brand-gold mb-2">JURISDICTION ANALYSIS</div>
          <p className="font-body text-white/90 text-sm">
            Evaluating applicable planning jurisdiction and structuring the optimal approval pathway for statutory compliance.
          </p>
        </div>

        {/* Technical Inputs Labels */}
        <div className="absolute bottom-20 left-12 lg:left-20 flex gap-6">
          <div className="tech-inputs font-mono text-xs text-white border border-white/30 px-4 py-2 bg-brand-navy/50 backdrop-blur-sm">
            SITE ASSESSMENT
          </div>
          <div className="tech-inputs font-mono text-xs text-white border border-white/30 px-4 py-2 bg-brand-navy/50 backdrop-blur-sm">
            TECHNICAL COORD
          </div>
          <div className="tech-inputs font-mono text-xs text-white border border-white/30 px-4 py-2 bg-brand-navy/50 backdrop-blur-sm">
            AUTHORITY SUBMISSION
          </div>
        </div>

      </div>

    </section>
    </div>
  );
}
