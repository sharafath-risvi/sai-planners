import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutFounder() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "center center",
          scrub: 1.2,
        }
      });

      const isMobile = window.innerWidth < 768;
      
      if (!isMobile) {
        // Desktop cinematic split from center
        tl.fromTo('.founder-img-wrapper', 
          { x: '15vw', scale: 0.9, opacity: 0 },
          { x: 0, scale: 1, opacity: 1, duration: 1, ease: "power2.out" }, 0
        )
        .fromTo('.founder-content-wrapper',
          { x: '-15vw', opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: "power2.out" }, 0
        )
        .fromTo('.founder2-img-wrapper', 
          { x: '-15vw', scale: 0.9, opacity: 0 },
          { x: 0, scale: 1, opacity: 1, duration: 1, ease: "power2.out" }, 0.2
        )
        .fromTo('.founder2-content-wrapper',
          { x: '15vw', opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: "power2.out" }, 0.2
        );
        
        // Inner image parallax (subtle vertical shift for depth)
        gsap.to('.founder-img', {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });

        gsap.to('.founder2-img', {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      } else {
        // Mobile natural stack
        tl.fromTo('.founder-img-wrapper', 
          { y: 50, scale: 0.95, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 1, ease: "power2.out" }, 0
        )
        .fromTo('.founder-content-wrapper',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, 0.5
        )
        .fromTo('.founder2-img-wrapper', 
          { y: 50, scale: 0.95, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 1, ease: "power2.out" }, 0.8
        )
        .fromTo('.founder2-content-wrapper',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, 1.3
        );
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-[#F9F9F8] overflow-hidden py-32 flex items-center">
      
      {/* Architectural Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
        <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(#000000 1px, transparent 1px), linear-gradient(90deg, #000000 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-16 lg:gap-24">
          
          {/* Left: Founder Image */}
          <div className="founder-img-wrapper w-full md:w-[45%] relative">
            <div className="aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-[2px] shadow-2xl relative">
              <img 
                src="/founders/founder1.jpg" 
                alt="Mr. R Ravi" 
                className="founder-img absolute inset-0 w-full h-[115%] -top-[7.5%] object-cover"
              />
              <div className="absolute inset-0 bg-brand-navy/5 mix-blend-overlay pointer-events-none" />
              {/* Thin Inner Border */}
              <div className="absolute inset-4 border border-brand-navy/10 pointer-events-none" />
            </div>
            
            {/* Technical Detail Corner Marks */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t border-l border-brand-navy/30 hidden md:block" />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b border-r border-brand-navy/30 hidden md:block" />
          </div>

          {/* Right: Content */}
          <div className="founder-content-wrapper w-full md:w-[50%] relative flex flex-col justify-center">
            
            <div className="mb-10 relative">
              {/* Subtle decorative line */}
              
              <h4 className="typo-eyebrow text-brand-gold mb-4">
                OUR FOUNDER
              </h4>
              <h2 className="typo-display text-brand-navy mb-3">
                Mr. R Ravi
              </h2>
              <p className="typo-eyebrow text-brand-navy/50">
                Founder
              </p>
            </div>

            <div className="space-y-6 typo-body text-brand-navy/80 font-light">
              <p>
                Sai Planners is built on the legacy of Mr. R Ravi, who has decades of experience in regulatory approvals, project facilitation, and government liaison services. His commitment to trust, reliability, and client success laid the foundation for the firm.
              </p>
            </div>

          </div>

        </div>

        {/* Second Founder */}
        <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-16 lg:gap-24 mt-24 md:mt-32">
          
          {/* Right: Founder 2 Image */}
          <div className="founder2-img-wrapper w-full md:w-[45%] relative">
            <div className="aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-[2px] shadow-2xl relative">
              <img 
                src="/founders/founder2.jpg" 
                alt="Mohana Krishnaa" 
                className="founder2-img absolute inset-0 w-full h-[115%] -top-[7.5%] object-cover"
              />
              <div className="absolute inset-0 bg-brand-navy/5 mix-blend-overlay pointer-events-none" />
              {/* Thin Inner Border */}
              <div className="absolute inset-4 border border-brand-navy/10 pointer-events-none" />
            </div>
            
            {/* Technical Detail Corner Marks */}
            <div className="absolute -top-4 -right-4 w-8 h-8 border-t border-r border-brand-navy/30 hidden md:block" />
            <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b border-l border-brand-navy/30 hidden md:block" />
          </div>

          {/* Left: Founder 2 Content */}
          <div className="founder2-content-wrapper w-full md:w-[50%] relative flex flex-col justify-center">
            
            <div className="mb-10 relative">
              
              <h4 className="typo-eyebrow text-brand-gold mb-4">
                LEADERSHIP
              </h4>
              <h2 className="typo-display text-brand-navy mb-3">
                Mohana Krishnaa
              </h2>
              <p className="typo-eyebrow text-brand-navy/50">
                Leadership
              </p>
            </div>

            <div className="space-y-6 typo-body text-brand-navy/80 font-light">
              <p>
                The legacy is carried forward by his son, Mohana Krishnaa, who has been actively involved in the business for over 3 years, combining modern management practices with hands-on expertise in planning, approvals, and compliance to serve clients across Tamil Nadu.
              </p>
            </div>

          </div>

        </div>
      </div>
      
    </section>
  );
}
