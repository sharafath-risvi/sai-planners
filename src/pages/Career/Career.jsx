import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CTA from '../../components/CTA/CTA';

gsap.registerPlugin(ScrollTrigger);

const FormField = ({ label, type = "text", placeholder }) => {
  const inputClasses = "w-full bg-[#FCFCFC] border border-[#0A0A0A]/15 rounded-md py-3.5 px-4 text-[#0A0A0A] font-sans text-base outline-none transition-all placeholder:text-[#0A0A0A]/30 focus:border-brand-navy focus:ring-1 focus:ring-brand-navy/20 focus:bg-white";
  
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-xs font-sans text-[#0A0A0A]/80 font-bold uppercase tracking-wide">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea 
          placeholder={placeholder}
          className={`${inputClasses} resize-none h-32`}
        />
      ) : type === "select" ? (
        <select 
          defaultValue=""
          className={`${inputClasses} appearance-none cursor-pointer`}
        >
          <option value="" disabled className="text-[#0A0A0A]/30">{placeholder}</option>
          {label === "Position / Area of Interest" && (
            <>
              <option value="planning">Urban & Regional Planning</option>
              <option value="regulatory">Regulatory Approvals & Compliance</option>
              <option value="drafting">AutoCAD Drafting & Design</option>
              <option value="liaison">Authority Liaison</option>
              <option value="other">Other</option>
            </>
          )}
          {label === "Experience Level" && (
            <>
              <option value="fresher">Fresher (0-1 years)</option>
              <option value="junior">Junior (1-3 years)</option>
              <option value="mid">Mid-level (3-7 years)</option>
              <option value="senior">Senior (7+ years)</option>
            </>
          )}
        </select>
      ) : type === "file" ? (
         <input 
          type="file" 
          className="w-full text-[#0A0A0A] font-sans text-sm py-[9px] px-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-[#EAEAEA] file:text-[#0A0A0A] hover:file:bg-[#D4D4D4] transition-all cursor-pointer border border-[#0A0A0A]/15 rounded-md bg-[#FCFCFC] focus:bg-white"
        />
      ) : (
        <input 
          type={type} 
          placeholder={placeholder}
          className={inputClasses}
        />
      )}
    </div>
  );
};

export default function Career() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);

    let ctx = gsap.context(() => {
      // Hero Animation
      const heroTl = gsap.timeline();
      heroTl.fromTo('.career-hero-grid', { opacity: 0 }, { opacity: 0.15, duration: 2, ease: "power2.out" }, 0.2);
      heroTl.fromTo('.career-hero-title span', { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", stagger: 0.1 }, 0.5);
      heroTl.fromTo('.career-hero-line', { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: "power3.inOut" }, 1);

      // Main Content Animation
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.career-main-section',
          start: "top 80%",
          end: "center center",
          toggleActions: "play none none reverse"
        }
      });
      
      const leftElements = gsap.utils.toArray('.career-left > div, .career-left > p, .career-item');
      mainTl.fromTo(leftElements, 
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }, 0
      );
      
      mainTl.fromTo('.career-right', 
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0
      );

      mainTl.fromTo('.career-divider', 
        { scaleY: 0 },
        { scaleY: 1, duration: 1, ease: "power2.inOut", transformOrigin: "top" }, 0.3
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#F9F9F8] min-h-screen">
      
      {/* 1. CAREER HERO */}
      <section className="relative w-full h-[60vh] md:h-[70vh] flex flex-col justify-end pb-24 md:pb-32 overflow-hidden bg-[#0A0A0A] text-white">
        <div className="career-hero-grid absolute inset-0 pointer-events-none opacity-0 z-0">
          <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(252,174,22,0.1),transparent_60%)] pointer-events-none z-0" />
        
        <div className="absolute top-1/4 right-[10%] w-[25vw] h-[25vw] border border-white/5 rounded-full pointer-events-none z-0" />
        <div className="absolute top-12 left-12 w-16 h-16 border-t border-l border-white/20 pointer-events-none z-0" />
        
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <h1 className="career-hero-title font-display font-bold uppercase mb-8 md:mb-10 w-full" style={{fontSize:'clamp(3.5rem,8vw,9.5rem)',letterSpacing:'0.02em',lineHeight:'0.9'}}>
            <div className="overflow-hidden inline-block py-2 pr-4 -my-2 -mr-4"><span className="inline-block text-white">JOIN OUR</span></div>{' '}
            <div className="overflow-hidden inline-block py-2 pr-6 -my-2 -mr-6"><span className="inline-block text-brand-gold italic" style={{fontWeight:400}}>TEAM</span></div>
          </h1>
          <div className="career-hero-line w-full md:w-[60%] h-[1px] bg-white/20 origin-left" />
        </div>
      </section>

      {/* 2. MAIN CAREER AREA */}
      <section className="career-main-section relative py-24 md:py-32 bg-[#F9F9F8] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
          <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(5,5,5,1) 1px, transparent 1px), linear-gradient(90deg, rgba(5,5,5,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-20 relative items-start">
            
            <div className="career-divider hidden lg:block absolute left-[38%] top-0 bottom-0 w-[1px] bg-brand-navy/10 -translate-x-1/2" />
            <div className="hidden lg:block absolute left-[38%] top-[10%] w-3 h-3 border border-brand-gold rounded-full -translate-x-1/2 bg-[#F9F9F8] z-10" />

            {/* LEFT SIDE: INFO */}
            <div className="career-left w-full lg:w-[calc(38%-2rem)] xl:w-[calc(38%-2.5rem)] flex flex-col relative">
              
              <div className="mb-12 md:mb-16 relative">
                <span className="typo-eyebrow text-brand-gold mb-4 block tracking-[0.2em] font-semibold">CAREERS</span>
                <h2 className="font-display font-bold text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] leading-[1.05] text-brand-navy tracking-tight">
                  SHAPE THE <br/> <span className="text-brand-gold italic font-normal">FUTURE</span>
                </h2>
                <div className="absolute -left-6 top-2 w-[2px] h-20 bg-brand-gold/30 hidden md:block" />
              </div>
              
              <p className="typo-body text-brand-navy/80 text-lg md:text-xl font-light mb-10 leading-relaxed max-w-md">
                At Sai Planners, we are constantly looking for talented individuals who are passionate about urban planning, regulatory compliance, and transforming landscapes.
              </p>

              <div className="space-y-8 border-t border-brand-navy/10 pt-10">
                <div className="career-item flex items-start gap-6 group">
                  <span className="font-mono text-sm text-brand-gold pt-1">01</span>
                  <div>
                    <h5 className="font-mono text-[10px] tracking-widest text-brand-navy/50 uppercase mb-2 group-hover:text-brand-navy transition-colors">Professional Growth</h5>
                    <p className="font-body text-brand-navy text-base leading-[1.6] font-light">
                      Work on diverse, large-scale projects and expand your expertise in statutory planning and approvals.
                    </p>
                  </div>
                </div>

                <div className="career-item flex items-start gap-6 group">
                  <span className="font-mono text-sm text-brand-gold pt-1">02</span>
                  <div>
                    <h5 className="font-mono text-[10px] tracking-widest text-brand-navy/50 uppercase mb-2 group-hover:text-brand-navy transition-colors">Collaborative Culture</h5>
                    <p className="font-body text-brand-navy text-base leading-[1.6] font-light">
                      Join a dedicated team of experts in a supportive and dynamic environment where every voice matters.
                    </p>
                  </div>
                </div>
              </div>
              
            </div>

            {/* RIGHT SIDE: NORMAL FORM */}
            <div className="career-right w-full lg:w-[calc(62%-2rem)] xl:w-[calc(62%-2.5rem)] pt-12 lg:pt-0">
              <div className="bg-white rounded-2xl shadow-xl border border-[#0A0A0A]/10 p-8 md:p-12 w-full relative">
                
                <div className="mb-10">
                  <h3 className="font-display font-bold text-3xl md:text-4xl text-[#0A0A0A] leading-tight mb-3 uppercase tracking-wide">
                    Application Form
                  </h3>
                  <p className="font-sans text-[#0A0A0A]/60 text-base">
                    Fill out the fields below and we'll get back to you shortly.
                  </p>
                </div>
                
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField label="Full Name" placeholder="John Doe" />
                    <FormField label="Email Address" type="email" placeholder="john@example.com" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField label="Phone Number" type="tel" placeholder="+91 90000 00000" />
                    <FormField label="Position / Area of Interest" type="select" placeholder="Select Area" />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <FormField label="Experience Level" type="select" placeholder="Select Experience" />
                  </div>
                  
                  <div>
                    <FormField label="Message / Cover Letter" type="textarea" placeholder="Tell us about yourself and why you'd be a great fit..." />
                  </div>

                  <div>
                    <FormField label="Upload Resume / CV" type="file" placeholder="Choose a file..." />
                  </div>

                  <div className="pt-6">
                    <button className="w-full bg-brand-navy text-white font-sans font-bold tracking-widest uppercase py-4 px-8 rounded-md transition-all duration-300 hover:bg-brand-gold hover:text-brand-navy shadow-md">
                      Submit Application
                    </button>
                  </div>
                  
                </form>
              </div>
            </div>

          </div>
          
        </div>
      </section>

      <CTA />

    </div>
  );
}
