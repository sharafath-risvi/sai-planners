import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PORTFOLIO_ITEMS = [
  { num: "01", title: "INDUSTRIAL FACILITIES", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070", desc: "Complex industrial approvals and compliance." },
  { num: "02", title: "LAYOUTS", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069", desc: "Strategic residential and commercial land layouts." },
  { num: "03", title: "WAREHOUSES", img: "https://images.unsplash.com/photo-1586528116311-ad8ed7c1590e?q=80&w=2070", desc: "Large-scale storage and transit facility planning." },
  { num: "04", title: "EDUCATIONAL", img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070", desc: "Institutional compliance and master planning." },
  { num: "05", title: "LOGISTICS", img: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=2072", desc: "Supply chain infrastructure and hubs." },
  { num: "06", title: "LAND DEVELOPMENT", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2032", desc: "Extensive township and zonal planning." }
];

export default function AboutExperience() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      const isMobile = window.innerWidth < 768;

      if (!isMobile) {
        const panels = gsap.utils.toArray('.exp-panel');
        
        // Calculate total horizontal scroll needed
        const totalWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const scrollDist = totalWidth - viewportWidth + 300; // Add padding

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${scrollDist}`,
            pin: true,
            scrub: 1.2,
            anticipatePin: 1
          }
        });

        // Move the track horizontally
        tl.to(trackRef.current, {
          x: - (totalWidth - viewportWidth + 100), // scroll to end of track
          ease: "none",
        }, 0);

        // Add cinematic interactions to each panel as it moves
        panels.forEach((panel, i) => {
          const imgWrap = panel.querySelector('.img-wrap');
          const innerImg = panel.querySelector('img');
          const textBlock = panel.querySelector('.exp-text');
          
          // Parallax and depth effect within the horizontal scroll
          gsap.fromTo(innerImg, 
            { xPercent: 20, scale: 1.2, rotationY: -10 },
            { 
              xPercent: -20, 
              scale: 1, 
              rotationY: 10,
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: () => `top top-=${i * (scrollDist / panels.length)}`,
                end: () => `top top-=${(i + 2) * (scrollDist / panels.length)}`,
                scrub: true
              }
            }
          );
          
          // Text reveals
          gsap.fromTo(textBlock,
            { opacity: 0, y: 50 },
            {
              opacity: 1, y: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: containerRef.current,
                start: () => `top top-=${Math.max(0, (i - 0.5) * (scrollDist / panels.length))}`,
                end: () => `top top-=${(i + 0.5) * (scrollDist / panels.length)}`,
                scrub: true
              }
            }
          );
        });
      } else {
        // Mobile vertical scroll
        const panels = gsap.utils.toArray('.exp-panel');
        panels.forEach((panel) => {
          gsap.fromTo(panel, 
            { opacity: 0, y: 50 },
            {
              opacity: 1, y: 0,
              duration: 1,
              scrollTrigger: {
                trigger: panel,
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <section className="relative w-full h-screen bg-brand-soft-grey overflow-hidden flex items-center">
      
      {/* Background ambient text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap pointer-events-none opacity-5">
        <h2 className="font-display font-bold text-[20vw] leading-none text-brand-navy">
          EXPERIENCE & EXPERTISE
        </h2>
      </div>

      <div className="absolute top-12 left-12 lg:left-20 z-20 pointer-events-none">
        <h4 className="font-mono text-xs tracking-widest text-brand-gold font-bold mb-2 uppercase">
          04 / PROJECT WORLD
        </h4>
        <h2 className="font-display font-semibold text-3xl lg:text-4xl tracking-tight text-brand-navy">
          EXPERIENCE & EXPERTISE
        </h2>
      </div>

      {/* HORIZONTAL TRACK */}
      <div ref={trackRef} className="flex flex-col md:flex-row h-full md:h-[70vh] items-center pt-24 md:pt-0 pl-[10vw] pr-[10vw] md:gap-[15vw] gap-12 w-full md:w-max relative z-10 overflow-y-auto md:overflow-visible">
        
        {PORTFOLIO_ITEMS.map((item, idx) => (
          <div key={idx} className="exp-panel flex flex-col items-start w-[80vw] md:w-[45vw] shrink-0 relative perspective-[1000px]">
            
            {/* Cinematic Image Container */}
            <div className="img-wrap w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-[2px] shadow-2xl relative mb-8">
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-cover origin-center"
              />
              <div className="absolute inset-0 bg-brand-navy/20 mix-blend-multiply" />
            </div>

            {/* Content block slightly offset over the image */}
            <div className="exp-text md:absolute md:-bottom-12 md:-left-8 bg-white p-6 md:p-8 shadow-xl z-20 w-[90%] md:w-[70%]">
              <span className="font-mono text-xl text-brand-gold font-bold mb-2 block">
                {item.num}
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-semibold mb-3 leading-none text-brand-navy">
                {item.title}
              </h3>
              <p className="font-body text-brand-navy/70 text-sm md:text-base leading-relaxed">
                {item.desc}
              </p>
            </div>

          </div>
        ))}
        
      </div>
    </section>
    </div>
  );
}
