import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactLocation() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });

      // Reset
      gsap.set('.map-overlay-grid', { opacity: 0 });
      gsap.set('.map-route-line', { strokeDashoffset: 500, strokeDasharray: 500 });
      gsap.set('.office-marker', { scale: 0, opacity: 0, y: -30 });
      gsap.set('.map-label', { opacity: 0, x: -20 });

      // Animation
      tl.to('.map-overlay-grid', { opacity: 0.2, duration: 1 })
        .to('.map-route-line', { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" }, 0.5)
        .to('.office-marker', { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.5)" }, 1.5)
        .to('.map-label', { opacity: 1, x: 0, stagger: 0.2, duration: 0.5 }, 1.8);

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <section className="relative w-full bg-brand-navy py-32 px-6 md:px-12 lg:px-20 text-white overflow-hidden">
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
        
        {/* LEFT: Content */}
        <div className="w-full lg:w-1/3 flex flex-col z-10">
          <div className="font-mono text-sm tracking-[0.2em] text-brand-gold font-bold mb-6 uppercase">
            LOCATION
          </div>
          
          <h2 className="font-display font-semibold text-5xl md:text-7xl tracking-tighter leading-none mb-6">
            FIND<br/>
            SAI PLANNERS.
          </h2>
          
          <p className="font-body text-white/80 text-lg mb-12">
            Visit our office in Thirumangalam, Chennai.
          </p>

          <a 
            href="https://maps.app.goo.gl/rsr7SNKcGn63YqEEA" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 text-sm font-mono tracking-widest text-brand-gold hover:text-white transition-colors"
          >
            <div className="w-12 h-12 rounded-full border border-brand-gold/30 flex items-center justify-center group-hover:bg-brand-gold group-hover:border-brand-gold transition-all duration-300">
              <ArrowUpRight size={18} className="group-hover:text-brand-navy" />
            </div>
            VIEW ON GOOGLE MAPS
          </a>
        </div>

        {/* RIGHT: Stylized Map Visualization */}
        <div className="w-full lg:w-2/3 h-[50vh] md:h-[60vh] relative bg-[#07091A] rounded-xl overflow-hidden shadow-2xl border border-white/10">
          
          {/* Base Map Image (Desaturated/Dark) */}
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074" 
            alt="Chennai Map Aerial" 
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 mix-blend-screen"
          />

          {/* Abstract Grid */}
          <div className="map-overlay-grid absolute inset-0 mix-blend-overlay">
            <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          </div>

          {/* Abstract SVG Route */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path 
               className="map-route-line" 
               d="M 10,90 Q 40,80 60,50 T 80,30" 
               fill="none" 
               stroke="#FCAE16" 
               strokeWidth="0.5" 
               strokeLinecap="round" 
             />
          </svg>

          {/* City Label */}
          <div className="map-label absolute bottom-8 left-8">
            <div className="font-mono text-xs tracking-widest text-white/50 bg-brand-navy/80 px-2 py-1 backdrop-blur-sm border border-white/10">
              CHENNAI, TN
            </div>
          </div>

          {/* Office Marker */}
          <div className="absolute top-[30%] left-[80%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            
            <div className="office-marker relative z-10 flex flex-col items-center">
              <div className="bg-brand-gold text-brand-navy p-3 rounded-full shadow-[0_0_20px_rgba(252,174,22,0.4)] mb-2">
                <MapPin size={24} strokeWidth={2.5} />
              </div>
              <div className="w-1 h-12 bg-gradient-to-b from-brand-gold to-transparent" />
            </div>

            <div className="map-label mt-2 absolute top-full whitespace-nowrap">
              <div className="font-mono text-[10px] font-bold tracking-widest text-brand-navy bg-brand-gold px-3 py-1 shadow-lg">
                SAI PLANNERS OFFICE
              </div>
              <div className="font-mono text-[10px] tracking-widest text-white bg-brand-navy/90 px-3 py-1 text-center border border-white/10 border-t-0">
                THIRUMANGALAM
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
    </div>
  );
}
