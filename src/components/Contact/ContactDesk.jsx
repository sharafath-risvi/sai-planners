import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactDesk() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Staggered reveal for contact items
      gsap.from('.desk-item', {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <section className="relative w-full bg-white py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
        
        {/* LEFT: Heading */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="font-mono text-sm tracking-[0.2em] text-brand-gold font-bold mb-8 uppercase">
            SAI PLANNERS<br/>CONTACT DESK
          </div>
          
          <h2 className="font-display font-semibold text-5xl md:text-7xl tracking-tighter leading-[0.9] text-brand-navy">
            LET'S START<br/>
            WITH A<br/>
            <span className="text-brand-gold italic font-light">CONVERSATION.</span>
          </h2>
        </div>

        {/* RIGHT: Contact List */}
        <div className="w-full lg:w-1/2 flex flex-col gap-12 pt-4">
          
          {/* Office */}
          <div className="desk-item flex flex-col md:flex-row gap-4 md:gap-12 border-t border-brand-navy/10 pt-8">
            <div className="w-32 font-mono text-xs font-bold tracking-widest text-brand-navy/40 uppercase">
              OFFICE
            </div>
            <div className="flex-1 font-body text-brand-navy text-lg md:text-xl leading-relaxed font-light">
              Shop 84,85 JJ Complex<br/>
              2nd Floor,<br/>
              Thirumangalam,<br/>
              Chennai 600 040
            </div>
          </div>

          {/* Phone */}
          <div className="desk-item flex flex-col md:flex-row gap-4 md:gap-12 border-t border-brand-navy/10 pt-8">
            <div className="w-32 font-mono text-xs font-bold tracking-widest text-brand-navy/40 uppercase">
              PHONE
            </div>
            <div className="flex-1 font-display text-brand-navy text-2xl md:text-3xl leading-snug">
              <a href="tel:9383360666" className="hover:text-brand-gold transition-colors block">9383360666</a>
              <a href="tel:9789071197" className="hover:text-brand-gold transition-colors block">9789071197</a>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="desk-item flex flex-col md:flex-row gap-4 md:gap-12 border-t border-brand-navy/10 pt-8">
            <div className="w-32 font-mono text-xs font-bold tracking-widest text-brand-navy/40 uppercase">
              WHATSAPP
            </div>
            <div className="flex-1 font-display text-brand-navy text-2xl md:text-3xl leading-snug">
              <a href="https://wa.me/919789071197" target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:opacity-80 transition-opacity flex items-center gap-3">
                9789071197
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="desk-item flex flex-col md:flex-row gap-4 md:gap-12 border-t border-brand-navy/10 pt-8">
            <div className="w-32 font-mono text-xs font-bold tracking-widest text-brand-navy/40 uppercase">
              EMAIL
            </div>
            <div className="flex-1 font-body text-brand-navy/40 text-lg md:text-xl italic font-light">
              [Email address not provided]
            </div>
          </div>

          {/* Website */}
          <div className="desk-item flex flex-col md:flex-row gap-4 md:gap-12 border-t border-brand-navy/10 pt-8">
            <div className="w-32 font-mono text-xs font-bold tracking-widest text-brand-navy/40 uppercase">
              WEBSITE
            </div>
            <div className="flex-1 font-body text-brand-navy text-lg md:text-xl leading-relaxed">
              <a href="https://www.saiplanners.in" className="hover:text-brand-gold transition-colors underline underline-offset-4">
                www.saiplanners.in
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
    </div>
  );
}
