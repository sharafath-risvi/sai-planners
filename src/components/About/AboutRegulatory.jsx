import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { id: '01', title: 'STATUTORY APPROVALS', src: '/1/ezgif-frame-001.png' },
  { id: '02', title: 'PLANNING COMPLIANCE', src: '/2/ezgif-frame-001.png' },
  { id: '03', title: 'LIAISON & COORDINATION', src: '/3/ezgif-frame-001.png' },
  { id: '04', title: 'DOCUMENTATION SUPPORT', src: '/4/ezgif-frame-001.png' },
  { id: '05', title: 'REGULATORY ADVISORY', src: '/5/ezgif-frame-001.png' }
];

export default function AboutRegulatory() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // Desktop Setup
        gsap.set('.entrance-wrapper', {
          x: (index) => index * 80 + 150,
          y: (index) => index * 20 + 50,
          z: (index) => -index * 150 - 150,
          opacity: 0,
          rotateY: -25,
        });

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 65%",
          onEnter: () => {
            gsap.to('.entrance-wrapper', {
              x: (index) => index * 75, 
              y: (index) => index * 12,
              z: (index) => -index * 120, 
              opacity: 1,
              rotateY: -12, 
              stagger: 0.12,
              duration: 1.8,
              ease: "power3.out"
            });
          }
        });

        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "center center",
            end: "+=250%",
            pin: true,
            scrub: 1,
            anticipatePin: 1
          }
        });

        tl.to('.parallax-wrapper', {
          y: (index) => (window.innerHeight * 1.2) + ((SERVICES.length - index) * 150),
          duration: 1,
          ease: "power2.inOut",
          stagger: 0.85
        });
      });

      mm.add("(max-width: 1023px)", () => {
        // Mobile / Tablet Setup
        gsap.set('.entrance-wrapper', {
          x: (index) => index * 20 + 30,
          y: (index) => index * 30 + 50,
          z: (index) => -index * 120 - 100,
          opacity: 0,
          rotateY: -20,
        });

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 75%",
          onEnter: () => {
            gsap.to('.entrance-wrapper', {
              x: (index) => index * 15, 
              y: (index) => index * 25,
              z: (index) => -index * 90, 
              opacity: 1,
              rotateY: -10, 
              stagger: 0.15,
              duration: 1.5,
              ease: "power3.out"
            });
          }
        });

        let tlMobile = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "center center",
            end: "+=200%",
            pin: true,
            scrub: 1,
            anticipatePin: 1
          }
        });

        tlMobile.to('.parallax-wrapper', {
          y: (index) => (window.innerHeight * 1.2) + ((SERVICES.length - index) * 100),
          duration: 1,
          ease: "power2.inOut",
          stagger: 0.85
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full bg-transparent px-3 md:px-6 py-12 md:py-24">
      <section 
        ref={containerRef} 
        className="relative w-full min-h-[85vh] lg:min-h-[90vh] bg-[#05060A] rounded-[32px] md:rounded-[48px] overflow-hidden flex items-center shadow-2xl border border-white/[0.03]"
      >
        
        {/* Subtle Cinematic Background Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_100%,rgba(252,174,22,0.02)_0%,transparent_50%)] pointer-events-none"></div>

        <div className="container mx-auto px-6 md:px-12 lg:px-20 w-full h-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 relative z-10 py-16 lg:py-0">
          
          {/* LEFT SIDE - CONTENT */}
          <div className="w-full lg:w-[35%] flex flex-col space-y-6 lg:space-y-8 z-20 pt-8 lg:pt-0">
            <h2 className="font-display font-bold text-[46px] md:text-[60px] lg:text-[70px] xl:text-[80px] leading-[0.95] text-white tracking-wide">
              AUTHORITY NETWORK &<br />
              <span className="text-brand-gold">REGULATORY</span><br />
              EXPERTISE
            </h2>
            
            <p className="font-sans text-[15px] md:text-lg text-white/70 max-w-sm lg:max-w-[420px] leading-[1.6] font-normal">
              Our expertise includes strategic coordination with planning authorities and statutory departments, ensuring complex regulatory pathways are navigated seamlessly.
            </p>
          </div>

          {/* RIGHT SIDE - 3D IMAGE COMPOSITION */}
          <div 
            className="w-full lg:w-[60%] h-[450px] md:h-[550px] lg:h-[650px] relative flex items-center justify-center lg:justify-start"
            style={{ perspective: '1800px', transformStyle: 'preserve-3d' }}
          >
            
            <div 
              className="relative w-full h-full flex items-center group/container"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {SERVICES.map((item, index) => (
                <div 
                  key={item.id}
                  className="parallax-wrapper absolute left-1/2 -translate-x-1/2 lg:left-10 lg:translate-x-0 origin-center"
                  style={{ zIndex: SERVICES.length - index, transformStyle: 'preserve-3d' }}
                >
                  <div className="entrance-wrapper will-change-transform">
                    <div className="image-panel group relative w-[230px] md:w-[280px] lg:w-[320px] aspect-[2/3] md:aspect-[3/4] rounded-[24px] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)] transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] lg:hover:scale-[1.04] lg:hover:-translate-y-3 lg:hover:shadow-[0_40px_80px_rgba(0,0,0,0.8)] cursor-pointer bg-brand-navy border border-white/10">
                      
                      <img 
                        src={item.src} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] lg:group-hover:scale-110"
                      />
                      
                      {/* Premium Dark Gradient Override */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#030407] via-black/30 to-transparent opacity-90"></div>
                      
                      {/* Card Content */}
                      <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-6 flex flex-col space-y-2">
                        <span className="font-mono text-brand-gold text-[10px] md:text-xs tracking-[0.25em] font-bold">
                          {item.id}
                        </span>
                        <h3 className="font-display text-white text-[22px] md:text-[26px] lg:text-[30px] leading-[0.9] uppercase tracking-tight pr-4">
                          {item.title}
                        </h3>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
          
        </div>
      </section>
    </div>
  );
}
