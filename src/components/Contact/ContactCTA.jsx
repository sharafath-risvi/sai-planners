import React, { useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactCTA() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Simple fade up on scroll
      gsap.from(textRef.current.children, {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <section className="relative w-full bg-brand-soft-grey py-32 px-6 md:px-12 flex flex-col items-center justify-center text-center overflow-hidden">
      
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
        <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(#282D7F 1px, transparent 1px), linear-gradient(90deg, #282D7F 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div ref={textRef} className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        
        <h2 className="font-display font-semibold text-5xl md:text-7xl tracking-tighter text-brand-navy leading-none mb-8">
          READY TO MOVE<br/>
          YOUR PROJECT<br/>
          <span className="text-brand-gold italic font-light">FORWARD?</span>
        </h2>
        
        <p className="font-body text-brand-navy/70 text-lg md:text-xl max-w-2xl mx-auto mb-16">
          Let's discuss your site, planning requirements and approval pathway.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full">
          
          {/* Primary CTA */}
          <button className="group relative w-full md:w-auto inline-flex items-center justify-center px-10 py-5 font-semibold tracking-widest text-brand-navy bg-white border border-brand-navy/10 shadow-xl overflow-hidden rounded-full transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
            <div className="absolute inset-0 w-full h-full bg-brand-gold translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1]" />
            <span className="relative z-10 flex items-center gap-4 text-sm group-hover:text-brand-navy transition-colors duration-500">
              SEND YOUR PROJECT DETAILS
              <ArrowUpRight size={18} className="group-hover:rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
            </span>
          </button>

          {/* Secondary CTA */}
          <button className="group relative w-full md:w-auto inline-flex items-center justify-center px-8 py-5 font-semibold tracking-widest text-brand-navy bg-transparent border border-brand-navy/30 rounded-full overflow-hidden transition-all duration-500 hover:border-brand-navy">
            <span className="relative z-10 text-sm transition-colors duration-500">
              TALK TO AN APPROVAL CONSULTANT
            </span>
          </button>

        </div>
      </div>

    </section>
    </div>
  );
}
