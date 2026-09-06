import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: "VISION", value: "01", suffix: "" },
  { label: "YEARS EXPERTISE", value: "10", suffix: "+" },
  { label: "PROJECTS DELIVERED", value: "50", suffix: "+" },
  { label: "ACRES PLANNED", value: "500", suffix: "+" }
];

export default function Trust() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      gsap.from(".stat-item", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });

      // Simple number counter animation
      gsap.utils.toArray('.stat-value-num').forEach((el) => {
        const targetValue = parseInt(el.innerText, 10);
        if (isNaN(targetValue)) return;
        
        gsap.from(el, {
          innerText: 0,
          duration: 2,
          ease: "power2.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div>
      <div ref={containerRef}>
        <section className="relative bg-white text-brand-navy py-32 md:py-48 overflow-hidden">
      
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #282D7F 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          
          {stats.map((stat, i) => (
            <div key={i} className="stat-item flex flex-col border-t border-brand-navy/20 pt-8">
              <p className="typo-eyebrow text-brand-gold mb-6">
                {stat.label}
              </p>
              <h3 className="typo-display text-brand-navy flex items-baseline" style={{fontWeight:600}}>
                {stat.value === "01" ? (
                  <span>{stat.value}</span>
                ) : (
                  <>
                    <span className="stat-value-num">{stat.value}</span>
                    <span className="text-brand-gold ml-1" style={{fontSize:'0.5em'}}>{stat.suffix}</span>
                  </>
                )}
              </h3>
            </div>
          ))}

        </div>

        </div>
      </section>
      </div>
    </div>
  );
}
