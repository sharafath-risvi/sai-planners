import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowDownRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });

      tl.fromTo(".cta-image", 
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 0.4, duration: 1.5, ease: "power2.out" }
      );

      tl.fromTo(".cta-content",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
        "-=1"
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <section id="contact" className="relative bg-brand-navy min-h-[90vh] flex items-center overflow-hidden text-white rounded-t-[40px] md:rounded-t-[80px] -mt-10 z-20">
      
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full origin-center bg-brand-black">
        <img src="https://images.unsplash.com/photo-1504307651254-35680f356f27?q=80&w=2070" className="cta-image w-full h-full object-cover mix-blend-luminosity" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/80 to-brand-navy/30" />
      </div>
      
      <div className="cta-content relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full py-32 flex flex-col items-center text-center">
        
        <h4 className="typo-eyebrow text-brand-gold mb-8">
          START YOUR PROJECT
        </h4>
        
        <h2 className="typo-display mb-10 max-w-5xl text-white drop-shadow-lg leading-[0.9] text-[3rem] md:text-[clamp(4rem,8vw,8rem)] tracking-wide">
          <span className="block md:hidden">READY TO MOVE<br/>YOUR PROJECT<br/><span className="text-brand-gold font-normal">FORWARD?</span></span>
          <span className="hidden md:block">READY TO MOVE YOUR<br/><span className="text-brand-gold font-normal">PROJECT FORWARD?</span></span>
        </h2>
          
        <p className="typo-body text-white/80 max-w-2xl mb-16">
          Let us understand your site, project requirements, and approval needs. We will help you identify the right planning pathway and coordinate the entire process.
        </p>
        
        <div className="flex flex-row items-center justify-center md:justify-start gap-2 md:gap-6 mt-12 w-full md:w-auto px-4 md:px-0">
          
          <Link 
            to="/contact" 
            className="flex-1 md:flex-none group relative inline-flex items-center justify-center px-2 py-3.5 md:px-10 lg:px-12 md:py-5 text-brand-navy bg-brand-gold rounded-full overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-brand-gold/20"
          >
            <div className="absolute inset-0 w-full h-full bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1]" />
            <span className="typo-cta relative z-10 group-hover:text-brand-navy transition-colors duration-500 flex items-center gap-1 md:gap-2 text-[10px] md:text-[13px] tracking-[0.1em] md:tracking-[0.25em]">
              CONSULTATION
              <ArrowDownRight className="w-3 h-3 md:w-5 md:h-5 transition-transform duration-500 group-hover:rotate-[-45deg]" />
            </span>
          </Link>

          <a 
            href="mailto:contact@saiplanners.com" 
            className="flex-1 md:flex-none group relative inline-flex items-center justify-center px-2 py-3.5 md:px-10 lg:px-12 md:py-5 text-white border border-white/30 rounded-full overflow-hidden transition-all duration-500 hover:border-brand-gold hover:bg-white/5"
          >
            <span className="relative z-10 font-mono text-[10px] md:text-[13px] font-bold tracking-[0.1em] md:tracking-[0.25em] uppercase transition-colors duration-500 flex items-center gap-2 group-hover:text-brand-gold">
              CONTACT US
            </span>
          </a>

        </div>

      </div>
    </section>
    </div>
  );
}
