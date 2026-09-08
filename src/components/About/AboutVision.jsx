import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutVision() {
  const containerRef = useRef(null);
  
  useLayoutEffect(() => {
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

      // Background pan
      tl.to('.vision-bg', { scale: 1.1, xPercent: -5, duration: 2, ease: "none" }, 0);

      // Transition from Vision to Mission
      
      // Hold Vision state
      tl.to({}, { duration: 0.5 });
      
      // Exit Vision (slides up)
      tl.to(['.vision-heading', '.vision-content'], {
        y: "-50%",
        opacity: 0,
        duration: 1,
        ease: "power2.inOut"
      }, 0.5);

      // Enter Mission (slides up from below)
      tl.fromTo(['.mission-heading', '.mission-content'], 
        { y: "50%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1, ease: "power2.inOut" },
        0.5
      );
      
      // Hold Mission state
      tl.to({}, { duration: 0.5 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <section className="relative w-full h-[100svh] bg-brand-navy overflow-hidden flex items-center justify-center">
      
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <img 
          src="/images/img3.webp" 
          alt="Cityscape" 
          className="vision-bg absolute inset-0 w-full h-full object-cover grayscale mix-blend-overlay scale-[1.05]"
        />
        <div className="absolute inset-0 bg-brand-navy/90" />
      </div>

      <div className="relative z-20 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 h-full flex flex-col md:flex-row items-center">
        
        {/* LEFT SIDE: Headings */}
        <div className="w-full md:w-1/2 h-[35vh] md:h-full relative flex items-center justify-start md:border-r md:border-white/10 pt-16 md:pt-0">
          
          {/* Vision Heading */}
          <div className="vision-heading absolute left-0 w-full pr-8">
             <h4 className="typo-eyebrow text-brand-gold mb-4 md:mb-6">
               OUR VISION
             </h4>
             <h2 className="font-display font-bold leading-none text-white" style={{fontSize:'clamp(4.5rem,12vw,12rem)',letterSpacing:'0.02em'}}>
               VISION
             </h2>
          </div>

          {/* Mission Heading */}
          <div className="mission-heading absolute left-0 w-full pr-8 opacity-0 pointer-events-none">
             <h4 className="typo-eyebrow text-brand-gold mb-4 md:mb-6">
               OUR MISSION
             </h4>
             <h2 className="font-display font-bold leading-none text-white" style={{fontSize:'clamp(4.5rem,12vw,12rem)',letterSpacing:'0.02em'}}>
               MISSION
             </h2>
          </div>

        </div>

        {/* RIGHT SIDE: Content */}
        <div className="w-full md:w-1/2 h-[55vh] md:h-full relative flex items-start md:items-center md:pl-16 lg:pl-24">
          
          {/* Vision Content */}
          <div className="vision-content absolute left-0 md:left-16 lg:left-24 w-[90%] md:w-[85%]">
             <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] leading-[1] tracking-wide text-white">
               TO BECOME TAMIL NADU'S<br/>
               <span className="text-brand-gold italic" style={{fontWeight:400}}>MOST TRUSTED PARTNER.</span>
             </h2>
             <div className="w-12 h-[2px] bg-brand-gold/50 my-6 md:my-8" />
             <p className="font-sans text-white/90 text-xl md:text-2xl font-light leading-[1.65] tracking-wide max-w-xl">
               Providing authoritative planning, engineering, and regulatory solutions with a strong, state-wide presence.
             </p>
          </div>

          {/* Mission Content */}
          <div className="mission-content absolute left-0 md:left-16 lg:left-24 w-[90%] md:w-[85%] opacity-0 pointer-events-none">
             <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] leading-[1] tracking-wide text-white">
               FROM DEVELOPMENT PLAN<br/>
               <span className="text-brand-gold italic" style={{fontWeight:400}}>TO APPROVAL-READY PROJECT.</span>
             </h2>
             <div className="w-12 h-[2px] bg-brand-gold/50 my-6 md:my-8" />
             <p className="font-sans text-white/90 text-xl md:text-2xl font-light leading-[1.65] tracking-wide max-w-xl">
               We manage the entire lifecycle with precision and commitment, ensuring compliance across residential, commercial, and industrial domains.
             </p>
          </div>

        </div>

      </div>
    </section>
    </div>
  );
}
