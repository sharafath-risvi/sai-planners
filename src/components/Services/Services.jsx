import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { num: "01", title: "DTCP, CMDA & LPA Plan Approvals" },
  { num: "02", title: "RERA Approvals & Project Compliance" },
  { num: "03", title: "Land Development & Layout Planning" },
  { num: "04", title: "Engineering & Planning for Industrial Projects" },
  { num: "05", title: "Statutory & Environmental Clearances" }
];

const images = [
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541888081622-482a5fbc40d5?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1448518184296-a22facb4446f?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34d?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop"
];

export default function Services() {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const textRefs = useRef([]);
  const imageRefs = useRef([]);
  const bgNumberRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=500%", // 5 slides, 500%
          pin: true,
          scrub: 1,
        }
      });

      // Technical Grid transition initially (before entering the pinned services)
      gsap.fromTo(".tech-line", 
        { scaleX: 0 }, 
        { 
          scaleX: 1, 
          ease: "power2.out", 
          stagger: 0.2, 
          scrollTrigger: {
            trigger: ".tech-grid-container",
            start: "top 80%",
            end: "top 20%",
            scrub: true
          }
        }
      );

      // Loop through services for the pinned animation
      services.forEach((_, i) => {
        const isLast = i === services.length - 1;
        
        // Show current text
        tl.to(textRefs.current[i], { opacity: 1, y: 0, duration: 1 }, i * 2);
        
        // Background number update
        tl.add(() => {
          if (bgNumberRef.current) {
            bgNumberRef.current.innerText = services[i].num;
          }
        }, i * 2);

        // Image animation (Morphing/Crossfade)
        if (i > 0) {
          // Hide previous image by clipping
          tl.to(imageRefs.current[i - 1], {
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            scale: 1.1,
            duration: 1.5,
            ease: "power3.inOut"
          }, i * 2 - 0.5);
        }

        // Show current image
        tl.fromTo(imageRefs.current[i], 
          { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", scale: 1.2 },
          { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", scale: 1, duration: 1.5, ease: "power3.inOut" }, 
          i * 2 - 0.5
        );

        if (!isLast) {
          // Hide current text before next
          tl.to(textRefs.current[i], { opacity: 0, y: -50, duration: 1 }, i * 2 + 1);
        }
      });

      // Special 3D Fly transition at the very end
      tl.to(imageRefs.current[services.length - 1], {
        scale: 0.6,
        x: "-20vw",
        y: "-10vh",
        rotationY: -15,
        rotationZ: -5,
        duration: 2,
        ease: "power2.inOut"
      }, "+=0.5");

      tl.to(".floating-board-1", {
        opacity: 1,
        x: "-5vw",
        y: "-5vh",
        duration: 2,
        ease: "power2.inOut"
      }, "<");

      tl.to(".floating-board-2", {
        opacity: 1,
        x: "5vw",
        y: "5vh",
        duration: 2,
        ease: "power2.inOut"
      }, "<");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-white">
      {/* Technical Grid Transition */}
      <div className="tech-grid-container relative h-[50vh] w-full flex items-center justify-center overflow-hidden border-b border-gray-200">
        <div className="absolute inset-0 bg-white"
             style={{ backgroundImage: 'linear-gradient(to right, #f3f3f5 1px, transparent 1px), linear-gradient(to bottom, #f3f3f5 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}
        />
        
        {/* Abstract Technical Labels */}
        <div className="absolute top-12 left-12 font-mono text-xs text-brand-muted-grey tracking-widest uppercase">SITE <br/>01 <br/>13°05'... <br/>TN</div>
        
        {/* Lines */}
        <div className="tech-line absolute top-1/3 left-0 w-full h-[1px] bg-brand-navy/20 origin-left" />
        <div className="tech-line absolute top-2/3 left-0 w-full h-[1px] bg-brand-gold/50 origin-right" />
        
        <h2 className="relative z-10 text-[10vw] font-display font-bold leading-none tracking-tighter text-brand-navy mix-blend-multiply">
          WHAT<br />WE<br />DO
        </h2>
      </div>

      {/* Pinned Cinematic Service Experience */}
      <div ref={wrapperRef} className="relative h-screen w-full bg-brand-soft-grey overflow-hidden flex items-center justify-center">
        
        {/* Huge background number */}
        <div 
          ref={bgNumberRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-display font-bold text-transparent opacity-10 pointer-events-none select-none transition-all duration-300"
          style={{ WebkitTextStroke: "2px #282D7F" }}
        >
          01
        </div>

        {/* Central Image Stack */}
        <div className="relative w-[80vw] h-[50vh] md:w-[40vw] md:h-[60vh] perspective-[1000px] z-10">
          {images.map((src, i) => (
            <div 
              key={i}
              ref={el => imageRefs.current[i] = el}
              className="absolute inset-0 w-full h-full overflow-hidden shadow-2xl rounded-sm will-change-transform"
              style={{ clipPath: i === 0 ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
            >
              <img src={src} alt={`Service ${i+1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Floating Presentation Boards (Extra images for 3D fly transition) */}
        <div className="absolute right-[10vw] top-[20vh] w-[25vw] h-[35vh] opacity-0 shadow-2xl rounded-sm transform translate-z-[-100px] rotate-y-12 floating-board-1 hidden md:block">
           <img src="https://images.unsplash.com/photo-1504307651254-35680f356f27?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
        </div>
        <div className="absolute left-[15vw] bottom-[15vh] w-[20vw] h-[30vh] opacity-0 shadow-2xl rounded-sm transform translate-z-[-50px] -rotate-y-12 floating-board-2 hidden md:block">
           <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
        </div>

        {/* Text Content */}
        <div className="absolute bottom-12 md:bottom-24 left-6 md:left-24 z-20">
          {services.map((service, i) => (
            <div 
              key={service.num}
              ref={el => textRefs.current[i] = el}
              className="absolute bottom-0 left-0 w-[80vw] md:w-[40vw]"
              style={{ opacity: i === 0 ? 1 : 0, transform: i === 0 ? "translateY(0)" : "translateY(50px)" }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-brand-gold font-mono text-xl">{service.num}</span>
                <div className="h-[1px] w-12 bg-brand-navy/30" />
              </div>
              <h3 className="font-display text-3xl md:text-5xl text-brand-navy font-semibold leading-tight">
                {service.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
