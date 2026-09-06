import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactTransition() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1500",
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      // Initial States
      gsap.set('.transition-overlay', { opacity: 0.95 });
      gsap.set('.transition-line', { scaleX: 0, transformOrigin: "left center" });
      gsap.set('.transition-word', { opacity: 0, y: 50 });

      // Sequence
      tl.to('.transition-overlay', { opacity: 0.4, duration: 2 }, 0)
        .to('.transition-line', { scaleX: 1, duration: 1.5, ease: "power2.inOut" }, 0.5)
        .to('.transition-word', { opacity: 1, y: 0, stagger: 0.15, duration: 1, ease: "power3.out" }, 1);
        
      tl.to({}, { duration: 1 }); // Hold

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <section className="relative w-full h-screen bg-brand-navy overflow-hidden flex items-center justify-center">
      
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069" 
          alt="Architectural Interior" 
          className="w-full h-full object-cover grayscale"
        />
        <div className="transition-overlay absolute inset-0 bg-brand-navy" />
      </div>

      {/* Decorative Gold Line */}
      <div className="absolute top-1/3 left-0 w-full h-px px-12 md:px-32 flex items-center">
        <div className="w-full h-px bg-white/10 relative">
          <div className="transition-line absolute inset-0 bg-brand-gold w-full h-full" />
        </div>
      </div>

      {/* Typography */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pt-20">
        <h2 className="font-display font-light text-4xl md:text-6xl lg:text-8xl tracking-tight text-white leading-tight">
          <div className="overflow-hidden flex flex-wrap gap-x-4 md:gap-x-8">
            {["GOOD", "PROJECTS"].map((word, i) => (
              <span key={i} className="transition-word">{word}</span>
            ))}
          </div>
          <div className="overflow-hidden flex flex-wrap gap-x-4 md:gap-x-8 text-brand-navy/60">
            {["START", "WITH"].map((word, i) => (
              <span key={i} className="transition-word text-white/50 italic">{word}</span>
            ))}
          </div>
          <div className="overflow-hidden flex flex-wrap gap-x-4 md:gap-x-8 text-brand-gold font-semibold">
            {["CLEAR", "CONVERSATIONS."].map((word, i) => (
              <span key={i} className="transition-word">{word}</span>
            ))}
          </div>
        </h2>
      </div>

    </section>
    </div>
  );
}
