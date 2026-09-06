import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CTA from '../../components/CTA/CTA';

gsap.registerPlugin(ScrollTrigger);

const FormField = ({ label, num, type = "text", placeholder }) => {
  const inputClasses = "w-full bg-transparent border-b border-white/20 py-3 text-white font-body text-base outline-none transition-all placeholder:text-white/30 rounded-none focus:border-brand-gold focus:bg-white/[0.03]";
  
  return (
    <div className="relative group flex items-start gap-4">
      {num && (
        <span className="font-mono text-[10px] text-brand-gold/60 pt-4 transition-colors group-focus-within:text-brand-gold font-bold">
          {num}
        </span>
      )}
      <div className="flex-1 relative">
        <label className="block text-[10px] font-mono tracking-widest text-white/50 uppercase mb-1 transition-all duration-300 group-focus-within:text-brand-gold group-focus-within:-translate-y-1">
          {label}
        </label>
        {type === "textarea" ? (
          <textarea 
            placeholder={placeholder}
            className={`${inputClasses} resize-none h-24`}
          />
        ) : type === "select" ? (
          <select 
            defaultValue=""
            className={`${inputClasses} appearance-none [&>option]:bg-brand-navy [&>option]:text-white`}
          >
            <option value="" disabled className="text-white/30">{placeholder}</option>
            {label === "Project Type" && (
              <>
                <option value="residential">Residential Layout</option>
                <option value="commercial">Commercial Building</option>
                <option value="industrial">Industrial Facility</option>
                <option value="warehouse">Warehouse / Logistics</option>
                <option value="institutional">Institutional</option>
                <option value="other">Other</option>
              </>
            )}
            {label === "Service Required" && (
              <>
                <option value="dtcp">DTCP, CMDA & LPA Plan Approvals</option>
                <option value="rera">RERA Approvals & Compliance</option>
                <option value="layout">Land Development & Layout Planning</option>
                <option value="engineering">Industrial Engineering & Planning</option>
                <option value="clearance">Statutory & Environmental Clearances</option>
                <option value="other">Other</option>
              </>
            )}
            {label === "Preferred Contact Method" && (
              <>
                <option value="phone">Phone Call</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="email">Email</option>
              </>
            )}
          </select>
        ) : (
          <input 
            type={type} 
            placeholder={placeholder}
            className={inputClasses}
          />
        )}
        <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-gold transition-all duration-500 ease-out group-focus-within:w-full" />
      </div>
    </div>
  );
};

export default function Contact() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    // Ensure we start at top
    window.scrollTo(0, 0);

    let ctx = gsap.context(() => {
      // 1. Hero Animation
      const heroTl = gsap.timeline();
      heroTl.fromTo('.contact-hero-grid', { opacity: 0 }, { opacity: 0.15, duration: 2, ease: "power2.out" }, 0.2);
      heroTl.fromTo('.contact-hero-title span', { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", stagger: 0.1 }, 0.5);
      heroTl.fromTo('.contact-hero-line', { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: "power3.inOut" }, 1);

      // 2. Main Content Entrance (FAST & CINEMATIC)
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.contact-main-section',
          start: "top 80%",
          end: "center center",
          toggleActions: "play none none reverse"
        }
      });
      
      const leftElements = gsap.utils.toArray('.contact-left > div, .contact-left > p');
      mainTl.fromTo(leftElements, 
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }, 0
      );
      
      const contactItems = gsap.utils.toArray('.contact-item');
      mainTl.fromTo(contactItems,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }, 0.2
      );
      
      mainTl.fromTo('.contact-right', 
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0
      );

      mainTl.fromTo('.contact-divider', 
        { scaleY: 0 },
        { scaleY: 1, duration: 1, ease: "power2.inOut", transformOrigin: "top" }, 0.3
      );

      // 3. Map Section Reveal
      const mapTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.contact-map-section',
          start: "top 80%",
          end: "center center",
          toggleActions: "play none none reverse"
        }
      });

      mapTl.fromTo('.map-frame',
        { clipPath: "inset(15% 5% 15% 5% round 8px)", scale: 0.95, opacity: 0 },
        { clipPath: "inset(0% 0% 0% 0% round 8px)", scale: 1, opacity: 1, duration: 1.5, ease: "power3.inOut" }, 0
      );
      
      mapTl.fromTo('.map-label',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0.8
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#F9F9F8] min-h-screen">
      
      {/* 1. CONTACT HERO */}
      <section className="relative w-full h-[60vh] md:h-[70vh] flex flex-col justify-end pb-24 md:pb-32 overflow-hidden bg-[#0A0A0A] text-white">
        {/* Technical Background */}
        <div className="contact-hero-grid absolute inset-0 pointer-events-none opacity-0 z-0">
          <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(252,174,22,0.1),transparent_60%)] pointer-events-none z-0" />
        
        {/* Architectural Framing */}
        <div className="absolute top-1/4 right-[10%] w-[25vw] h-[25vw] border border-white/5 rounded-full pointer-events-none z-0" />
        <div className="absolute top-12 left-12 w-16 h-16 border-t border-l border-white/20 pointer-events-none z-0" />
        
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <h1 className="contact-hero-title font-display font-bold uppercase mb-8 md:mb-10 w-full" style={{fontSize:'clamp(3.5rem,8vw,9.5rem)',letterSpacing:'0.02em',lineHeight:'0.9'}}>
            <div className="overflow-hidden inline-block py-2 pr-4 -my-2 -mr-4"><span className="inline-block text-white">LET'S DISCUSS</span></div>{' '}
            <div className="overflow-hidden inline-block py-2 pr-6 -my-2 -mr-6"><span className="inline-block text-brand-gold italic" style={{fontWeight:400}}>YOUR PROJECT</span></div>
          </h1>
          <div className="contact-hero-line w-full md:w-[60%] h-[1px] bg-white/20 origin-left" />
        </div>
      </section>

      {/* 2. MAIN CONTACT AREA */}
      <section className="contact-main-section relative py-24 md:py-32 bg-[#F9F9F8] overflow-hidden">
        {/* Subtle background grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
          <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(5,5,5,1) 1px, transparent 1px), linear-gradient(90deg, rgba(5,5,5,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-20 relative items-start">
            
            {/* Center architectural line (Desktop only) */}
            <div className="contact-divider hidden lg:block absolute left-[38%] top-0 bottom-0 w-[1px] bg-brand-navy/10 -translate-x-1/2" />
            <div className="hidden lg:block absolute left-[38%] top-[10%] w-3 h-3 border border-brand-gold rounded-full -translate-x-1/2 bg-[#F9F9F8] z-10" />

            {/* LEFT SIDE: INFO (38%) */}
            <div className="contact-left w-full lg:w-[calc(38%-2rem)] xl:w-[calc(38%-2.5rem)] flex flex-col relative">
              
              <div className="mb-12 md:mb-16 relative">
                <span className="typo-eyebrow text-brand-gold mb-4 block tracking-[0.2em] font-semibold">CONTACT US</span>
                <h2 className="font-display font-bold text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] leading-[1.05] text-brand-navy tracking-tight">
                  GET IN <br/> <span className="text-brand-gold italic font-normal">TOUCH</span>
                </h2>
                
                {/* Architectural accent */}
                <div className="absolute -left-6 top-2 w-[2px] h-20 bg-brand-gold/30 hidden md:block" />
              </div>
              
              <p className="typo-body text-brand-navy/80 text-lg md:text-xl font-light mb-16 leading-relaxed max-w-md">
                Planning a new development, industrial facility, layout, warehouse, commercial project or institutional building? Talk to SAI PLANNERS about your site and approval requirements.
              </p>
              
              <div className="space-y-10 border-t border-brand-navy/10 pt-10">
                
                {/* Contact Items - Editorial layout */}
                <div className="contact-item flex items-start gap-6 group">
                  <span className="font-mono text-sm text-brand-gold pt-1">01</span>
                  <div>
                    <h5 className="font-mono text-[10px] tracking-widest text-brand-navy/50 uppercase mb-2 group-hover:text-brand-navy transition-colors">OFFICE</h5>
                    <p className="font-body text-brand-navy text-lg leading-[1.6] font-light">
                      Shop 84,85 JJ Complex<br/>
                      2nd Floor, Thirumangalam<br/>
                      Chennai 600 040
                    </p>
                  </div>
                </div>

                <div className="contact-item flex items-start gap-6 group">
                  <span className="font-mono text-sm text-brand-gold pt-1">02</span>
                  <div>
                    <h5 className="font-mono text-[10px] tracking-widest text-brand-navy/50 uppercase mb-2 group-hover:text-brand-navy transition-colors">PHONE</h5>
                    <div className="flex flex-col space-y-1">
                      <a href="tel:9383360666" className="font-display text-xl text-brand-navy hover:text-brand-gold transition-colors">93833 60666</a>
                      <a href="tel:9789071197" className="font-display text-xl text-brand-navy hover:text-brand-gold transition-colors">97890 71197</a>
                    </div>
                  </div>
                </div>

                <div className="contact-item flex items-start gap-6 group">
                  <span className="font-mono text-sm text-brand-gold pt-1">03</span>
                  <div>
                    <h5 className="font-mono text-[10px] tracking-widest text-brand-navy/50 uppercase mb-2 group-hover:text-brand-navy transition-colors">WHATSAPP</h5>
                    <a href="https://wa.me/919789071197" target="_blank" rel="noreferrer" className="font-display text-xl text-brand-navy hover:text-brand-gold transition-colors flex items-center gap-3">
                      97890 71197
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                  </div>
                </div>

                <div className="contact-item flex items-start gap-6 group">
                  <span className="font-mono text-sm text-brand-gold pt-1">04</span>
                  <div>
                    <h5 className="font-mono text-[10px] tracking-widest text-brand-navy/50 uppercase mb-2 group-hover:text-brand-navy transition-colors">WEBSITE</h5>
                    <a href="https://www.saiplanners.in" className="font-display text-xl text-brand-navy hover:text-brand-gold transition-colors relative overflow-hidden group/link inline-block">
                      www.saiplanners.in
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-gold transform -translate-x-full group-hover/link:translate-x-0 transition-transform duration-500" />
                    </a>
                  </div>
                </div>

              </div>
              
            </div>

            {/* RIGHT SIDE: FORM (62%) */}
            <div className="contact-right w-full lg:w-[calc(62%-2rem)] xl:w-[calc(62%-2.5rem)] pt-12 lg:pt-0">
              <div className="relative bg-brand-navy rounded-2xl shadow-[0_30px_60px_rgba(7,9,26,0.15)] border border-brand-navy/10 p-8 md:p-12 lg:p-14 overflow-hidden w-full">
                
                {/* Subtle internal blueprint grid for the card */}
                <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

                <div className="relative z-10 w-full">
                  <div className="mb-12">
                    <span className="typo-eyebrow text-brand-gold mb-4 block tracking-[0.2em] font-semibold">ENQUIRY</span>
                    <h3 className="font-display font-bold text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] text-white leading-[1.05] tracking-tight drop-shadow-sm mb-6">
                      START YOUR <br/> <span className="text-brand-gold italic font-normal">PROJECT</span>
                    </h3>
                    <p className="font-body text-white/70 text-lg font-light max-w-xl">
                      Tell us about your project and approval requirements.
                    </p>
                  </div>
                  
                  <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                      <FormField num="01" label="Your Name" placeholder="John Doe" />
                      <FormField num="02" label="Company / Organization" placeholder="Company Name" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                      <FormField num="03" label="Phone Number" type="tel" placeholder="+91 90000 00000" />
                      <FormField num="04" label="Email Address" type="email" placeholder="john@example.com" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                      <FormField num="05" label="Project Location" placeholder="Thirumangalam, Chennai" />
                      <FormField num="06" label="Project Type" type="select" placeholder="Select Project Type" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                      <FormField num="07" label="Service Required" type="select" placeholder="Select Service" />
                      <FormField num="08" label="Preferred Contact Method" type="select" placeholder="Phone or Email?" />
                    </div>
                    
                    <div>
                      <FormField num="09" label="Brief Project Description" type="textarea" placeholder="Tell us about your requirements..." />
                    </div>

                    <div className="pt-8">
                      <button className="group relative inline-flex items-center justify-center px-10 py-5 font-mono text-sm tracking-widest text-brand-navy bg-brand-gold overflow-hidden rounded-[2px] transition-all duration-500 w-full hover:shadow-2xl hover:shadow-brand-gold/20">
                        <div className="absolute inset-0 w-full h-full bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1]" />
                        <span className="relative z-10 flex items-center gap-3 transition-colors duration-300 group-hover:text-brand-navy font-bold">
                          SEND YOUR PROJECT DETAILS
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-2 transition-transform duration-300">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </span>
                      </button>
                    </div>
                    
                  </form>
                </div>
              </div>
            </div>

          </div>
          
        </div>
      </section>

      {/* 3. MAP SECTION */}
      <section className="contact-map-section py-24 md:py-32 bg-white text-brand-navy">
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12">
          
          <div className="mb-12 md:mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h4 className="typo-eyebrow text-brand-gold mb-4">
                FIND US
              </h4>
              <h2 className="typo-display text-brand-navy">
                VISIT SAI PLANNERS
              </h2>
            </div>
            
            <div className="hidden md:block">
              <a href="https://maps.app.goo.gl/rsr7SNKcGn63YqEEA" target="_blank" rel="noreferrer" className="group relative inline-flex items-center justify-center px-8 py-3 text-xs font-mono font-bold tracking-widest text-brand-navy bg-brand-soft-grey border border-brand-navy/10 rounded-full overflow-hidden transition-all duration-500 hover:border-brand-gold">
                <div className="absolute inset-0 w-full h-full bg-brand-gold translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 group-hover:text-brand-navy transition-colors duration-300 flex items-center gap-2">
                  GET DIRECTIONS
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                </span>
              </a>
            </div>
          </div>

          <div className="relative w-full h-[60vh] md:h-[75vh] map-frame overflow-hidden rounded-[2px] shadow-2xl bg-brand-soft-grey">
            <iframe 
              src="https://maps.google.com/maps?q=Shop%2084,85%20JJ%20Complex%202nd%20Floor,%20Thirumangalam,%20Chennai%20600%20040&t=&z=14&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale-[0.8] contrast-125 opacity-90 mix-blend-multiply hover:grayscale-0 hover:mix-blend-normal hover:opacity-100 transition-all duration-1000"
            ></iframe>
            
            {/* Map Premium Label */}
            <div className="map-label absolute bottom-6 left-6 md:bottom-12 md:left-12 bg-white text-brand-navy p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2px] max-w-[280px] md:max-w-sm border border-brand-navy/5">
              <h3 className="typo-subhead font-semibold mb-2" style={{fontSize:'clamp(1.2rem,2vw,1.8rem)'}}>SAI PLANNERS</h3>
              <p className="typo-eyebrow text-brand-gold mb-4">
                Headquarters
              </p>
              <p className="typo-body text-sm md:text-base leading-relaxed text-brand-navy/80">
                Shop 84,85 JJ Complex<br/>
                2nd Floor, Thirumangalam<br/>
                Chennai 600 040
              </p>
              <div className="md:hidden mt-6">
                 <a href="https://maps.app.goo.gl/rsr7SNKcGn63YqEEA" target="_blank" rel="noreferrer" className="text-xs font-mono font-bold text-brand-gold uppercase tracking-widest flex items-center gap-2 hover:text-brand-navy transition-colors">
                  Get Directions
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                </a>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      <CTA />

    </div>
  );
}
