import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  { 
    id: "integrity", 
    word: "INTEGRITY", 
    num: "01", 
    desc: "Integrity and honesty at every step of our planning process.",
    img: "/our_core/integrity.PNG"
  },
  { 
    id: "transparency", 
    word: "TRANSPARENCY", 
    num: "02", 
    desc: "Transparency and clarity guide how we approach every project and relationship.",
    img: "/our_core/transparency.PNG"
  },
  { 
    id: "precision", 
    word: "PRECISION", 
    num: "03", 
    desc: "Technical precision in all documentation, ensuring faultless regulatory compliance.",
    img: "/our_core/precision.PNG"
  },
  { 
    id: "knowledge", 
    word: "KNOWLEDGE", 
    num: "04", 
    desc: "Deep regulatory knowledge and foresight to navigate complex statutory frameworks.",
    img: "/our_core/knowledge.PNG"
  },
  { 
    id: "responsive", 
    word: "RESPONSIVENESS", 
    num: "05", 
    desc: "Responsive communication with clients, stakeholders, and regulatory authorities.",
    img: "/our_core/responsiveness.PNG"
  }
];

export default function AboutValues() {
  const sectionRef = useRef(null);
  const compositionRef = useRef(null);
  const innersRef = useRef([]);

  const getCardWrapperClasses = (idx) => {
    const base = "relative flex-shrink-0 w-full sm:w-[80%] md:w-[45%] lg:w-[28%] xl:w-[26%] aspect-[3/4] will-change-transform transition-all duration-500 mx-auto";
    
    switch(idx) {
      case 0: return `${base} z-10 lg:translate-y-[30px]`;
      case 1: return `${base} z-20 lg:-translate-y-[10px]`;
      case 2: return `${base} z-10 lg:translate-y-[30px]`;
      case 3: return `${base} z-20 lg:-translate-y-[20px] lg:translate-x-[40px]`;
      case 4: return `${base} z-10 lg:translate-y-[10px] lg:-translate-x-[40px]`;
      default: return base;
    }
  }

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let ctx = gsap.context(() => {
      
      // 1. Initial State Setup
      gsap.set('.header-anim-target', { opacity: 0, y: 50 });
      gsap.set('.card-wrapper', { 
        opacity: 0, 
        y: 100, 
        z: -200, 
        rotationY: -5,
        rotationX: 5
      });

      // 2. Vertical Reveal Animation (Triggered when scrolled into view)
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });

      entranceTl.to('.header-anim-target', {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: "power3.out"
      })
      .to('.card-wrapper', {
        opacity: 1,
        y: 0,
        z: 0,
        rotationY: 0,
        rotationX: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.8");

      // 3. Subtle Mouse Movement 3D interaction (Desktop Only)
      if (!isMobile && !prefersReducedMotion) {
        const handleMouseMove = (e) => {
          const { clientX, clientY } = e;
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;
          
          const deltaX = (clientX - centerX) / centerX;
          const deltaY = (clientY - centerY) / centerY;

          gsap.to(compositionRef.current, {
            rotationY: deltaX * 4,
            rotationX: -deltaY * 4,
            ease: "power2.out",
            duration: 1
          });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
      }

      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full bg-white text-black py-16 md:py-24 lg:py-32 overflow-hidden">
      
      {/* Subtle Architectural Grid Background */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.04) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 max-w-[2000px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Editorial Heading */}
        <div className="header-anim-target w-full flex flex-col items-center lg:items-start mb-12 lg:mb-20 overflow-hidden">
          <h2 className="font-display font-bold text-[11vw] sm:text-[64px] md:text-[80px] lg:text-[110px] xl:text-[140px] 2xl:text-[160px] leading-[0.85] tracking-normal uppercase text-center lg:text-left text-[#0A0A0A] drop-shadow-sm whitespace-nowrap">
            OUR CORE <span className="text-brand-gold relative inline-block drop-shadow-none">VALUES</span>
          </h2>
        </div>

        {/* 3D Cards Editorial Horizontal Composition */}
        <div 
          className="w-full relative pb-12 overflow-visible"
          style={{ perspective: '2500px' }}
        >
          <div 
            ref={compositionRef}
            className="w-full flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-14 xl:gap-16 px-6 lg:px-0 py-10 lg:py-16 transform-style-3d"
          >
            {VALUES.map((val, idx) => (
              <div 
                key={idx}
                className={`card-wrapper ${getCardWrapperClasses(idx)}`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div 
                  ref={el => innersRef.current[idx] = el}
                  className="card-parallax-inner w-full h-full relative group rounded-[24px] md:rounded-[32px] lg:rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] lg:shadow-[0_40px_100px_rgba(0,0,0,0.8)] bg-[#0A0D14] border border-white/5"
                >
                  {/* Image */}
                  <img 
                    src={val.img} 
                    alt={val.word}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.8s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                  
                  {/* Cinematic Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020305] via-black/60 to-transparent opacity-95 transition-opacity duration-700 group-hover:opacity-100" />

                  {/* Content Container */}
                  <div className="absolute inset-0 p-6 sm:p-8 md:p-10 lg:p-10 xl:p-12 flex flex-col justify-end translate-z-[40px] transition-transform duration-500">
                    
                    {/* Number and Line */}
                    <div className="flex items-center gap-4 mb-4 md:mb-5">
                      <span className="font-mono text-brand-gold text-base md:text-lg xl:text-xl font-bold tracking-[0.2em] block">
                        {val.num}
                      </span>
                      <div className="w-10 h-[2px] bg-brand-gold/50" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-display font-semibold text-white tracking-widest uppercase mb-0 drop-shadow-2xl leading-[1.05] w-full hyphens-none whitespace-normal text-[1.45rem] sm:text-[1.6rem] md:text-[1.8rem] lg:text-[1.9rem] xl:text-[2.05rem]">
                      {val.word}
                    </h3>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
