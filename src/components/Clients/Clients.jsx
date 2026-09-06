import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const clientData = [
  { img: '/client/ceebros.png', name: 'CEEBROS', num: '01' },
  { img: '/client/fomra.jpeg', name: 'FOMRA', num: '02' },
  { img: '/client/hind_terminals.JPG', name: 'HIND TERMINALS', num: '03' },
  { img: '/client/ksr_reality.jpeg', name: 'KSR REALITY', num: '04' },
  { img: '/client/ls_automative.jpg', name: 'LS AUTOMOTIVE', num: '05' },
  { img: '/client/mbm.JPG', name: 'MBM', num: '06' },
  { img: '/client/nadi.JPG', name: 'NADI', num: '07' },
  { img: '/client/narayana_schools.JPG', name: 'NARAYANA SCHOOLS', num: '08' },
  { img: '/client/nova.png', name: 'NOVA', num: '09' },
  { img: '/client/polyfit.JPG', name: 'POLYFIT', num: '10' },
  { img: '/client/sical.jpeg', name: 'SICAL', num: '11' },
  { img: '/client/sr.JPG', name: 'SR', num: '12' },
  { img: '/client/sri_krish.JPG', name: 'SRI KRISHNA', num: '13' },
  { img: '/client/ster.JPG', name: 'STER', num: '14' },
  { img: '/client/traditional_excellencs.JPG', name: 'TRADITIONAL EXCELLENCE', num: '15' }
];

export default function Clients() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Reveal the central architectural line progressively
      gsap.fromTo('.clients-center-line', 
        { scaleY: 0 },
        { 
          scaleY: 1, 
          ease: "none", 
          scrollTrigger: {
            trigger: '.clients-timeline-container',
            start: "top 75%",
            end: "bottom 85%",
            scrub: true
          }
        }
      );

      // Reveal each row smoothly
      const rows = gsap.utils.toArray('.client-row');
      rows.forEach((row, i) => {
        const isEven = i % 2 === 0;
        const logo = row.querySelector('.client-logo-side');
        const content = row.querySelector('.client-content-side');
        const connector = row.querySelector('.client-connector');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });

        tl.fromTo(logo, 
          { opacity: 0, x: isEven ? 30 : -30 }, 
          { opacity: 1, x: 0, duration: 1.0, ease: "power2.out" },
          0
        );
        tl.fromTo(content, 
          { opacity: 0, x: isEven ? -30 : 30 }, 
          { opacity: 1, x: 0, duration: 1.0, ease: "power2.out" },
          0.1
        );
        
        if (connector) {
          tl.fromTo(connector,
            { scaleX: 0, opacity: 0 },
            { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
            0.3
          );
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 md:py-40 bg-[#FBFBFA] relative overflow-hidden border-t border-b border-brand-navy/5" ref={containerRef}>
      {/* Subtle Architectural Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]" 
        style={{ 
          backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)', 
          backgroundSize: '80px 80px' 
        }} 
      />
      
      {/* Content Container */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10 flex flex-col items-center">
        
        {/* HEADING (Untouched) */}
        <div className="flex flex-col items-center text-center mb-24 md:mb-40">
          <span className="font-mono text-brand-gold font-bold tracking-[0.2em] uppercase text-sm mb-4">Our Clients</span>
          <h2 className="font-display font-black text-5xl md:text-7xl lg:text-[5.5rem] text-brand-navy tracking-widest uppercase mb-6 leading-[0.9]">
            Trusted by Projects<br/>That Move Forward
          </h2>
          <div className="h-[2px] w-16 bg-brand-gold mt-2 opacity-80" />
        </div>

        {/* ARCHITECTURAL TIMELINE CONTAINER */}
        <div className="clients-timeline-container relative w-full flex flex-col items-center pb-12">
          
          {/* CENTRAL SPINE */}
          <div className="absolute top-0 bottom-0 left-6 md:left-1/2 w-[1px] bg-brand-navy/10 origin-top clients-center-line" />

          {clientData.map((client, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div key={idx} className={`client-row relative w-full flex flex-col md:flex-row ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-start md:items-center mb-20 md:mb-32 group pt-4 md:pt-0`}>
                
                {/* NODE on the central line */}
                <div className="absolute left-6 md:left-1/2 top-4 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-[9px] h-[9px] md:w-3 md:h-3 bg-[#FBFBFA] border-[1.5px] border-brand-navy/20 rounded-full z-10 group-hover:border-brand-gold group-hover:scale-150 transition-all duration-700 ease-[0.25,1,0.5,1]" />
                
                {/* CONNECTOR LINE (Desktop only) */}
                <div 
                  className={`client-connector absolute top-1/2 -translate-y-1/2 h-[1px] bg-brand-navy/10 z-0 hidden md:block origin-${isEven ? 'left' : 'right'}`}
                  style={{
                    width: '12%',
                    left: isEven ? '50%' : 'auto',
                    right: isEven ? 'auto' : '50%'
                  }}
                />

                {/* CONTENT SIDE */}
                <div className={`client-content-side w-full md:w-1/2 flex flex-col justify-center pl-16 md:pl-0 mt-6 md:mt-0 ${isEven ? 'md:pr-24 md:items-end md:text-right' : 'md:pl-32 lg:pl-40 md:items-start md:text-left'} relative z-20 order-2 md:order-none`}>
                  <div className="flex items-center gap-4 mb-3">
                    {isEven && <div className="h-[1px] w-6 bg-brand-gold/60 hidden md:block" />}
                    <span className="font-mono text-[0.65rem] md:text-[0.7rem] text-brand-navy/50 tracking-[0.2em] uppercase">{client.num} / CLIENT</span>
                    {!isEven && <div className="h-[1px] w-6 bg-brand-gold/60 hidden md:block" />}
                  </div>
                  <h3 className="font-display text-4xl md:text-5xl lg:text-6xl text-brand-navy tracking-wide uppercase leading-[0.9] group-hover:text-brand-gold transition-colors duration-500">
                    {client.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-4 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-1 h-1 bg-brand-navy rounded-full hidden md:block" />
                    <span className="font-mono text-[0.6rem] md:text-[0.65rem] tracking-[0.15em] uppercase text-brand-navy">Architectural Portfolio</span>
                  </div>
                </div>

                {/* LOGO SIDE */}
                <div className={`client-logo-side w-full md:w-1/2 flex pl-16 md:pl-0 ${isEven ? 'md:justify-start md:pl-48 lg:pl-56' : 'md:justify-end md:pr-48 lg:pr-56'} relative z-20 order-1 md:order-none`}>
                  <div className="w-48 h-32 md:w-64 md:h-40 bg-white border border-brand-navy/5 shadow-[0_10px_30px_rgba(0,0,0,0.02)] rounded-2xl flex items-center justify-center transition-all duration-700 ease-[0.25,1,0.5,1] group-hover:scale-[1.03] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] group-hover:border-brand-violet/20 cursor-default">
                    <img src={client.img} alt={client.name} className="w-[80%] h-[80%] object-contain" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
