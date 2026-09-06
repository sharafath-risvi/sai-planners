import React, { useRef, useEffect } from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactFinal() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Subtle continuous pan for background
      gsap.to('.final-contact-bg', {
        yPercent: 10,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
      
      // Reveal items
      gsap.from('.final-reveal', {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <section className="relative w-full min-h-screen bg-brand-soft-grey flex flex-col justify-between overflow-hidden pt-32 pb-12">
      
      {/* Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1541888081622-482a5fbc40d5?q=80&w=2070" 
          alt="Clean Architectural Background" 
          className="final-contact-bg absolute inset-0 w-full h-full object-cover grayscale opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-soft-grey via-transparent to-brand-soft-grey" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6">
        
        <p className="final-reveal font-mono text-xs md:text-sm tracking-[0.3em] text-brand-navy/60 font-bold uppercase mb-8">
          TELL US ABOUT YOUR PROJECT.
        </p>

        <h2 className="final-reveal font-display font-semibold text-5xl md:text-7xl lg:text-[6rem] tracking-tighter leading-[0.9] text-brand-navy mb-16">
          LET'S BUILD<br/>
          THE NEXT STEP<br/>
          <span className="text-brand-gold">TOGETHER.</span>
        </h2>

        <div className="final-reveal flex flex-col sm:flex-row items-center gap-6">
          
          <button className="group relative inline-flex items-center justify-center px-10 py-5 font-semibold tracking-widest text-brand-navy bg-brand-gold border border-brand-gold rounded-full overflow-hidden transition-all duration-500 hover:scale-105 shadow-xl">
            <div className="absolute inset-0 w-full h-full bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1]" />
            <span className="relative z-10 flex items-center gap-3 text-sm transition-colors duration-500">
              GET IN TOUCH
              <ArrowUpRight size={18} className="group-hover:rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
            </span>
          </button>

          <a 
            href="https://wa.me/919789071197" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-8 py-5 font-semibold tracking-widest text-brand-navy bg-transparent border border-brand-navy/20 rounded-full transition-all duration-500 hover:border-[#25D366] hover:bg-[#25D366]/5"
          >
            <span className="relative z-10 flex items-center gap-3 text-sm transition-colors duration-500 group-hover:text-[#25D366]">
              <MessageCircle size={18} />
              WHATSAPP US
            </span>
          </a>

        </div>

      </div>

      {/* Footer Branding Area */}
      <div className="relative z-10 w-full flex flex-col items-center mt-20 pt-12 border-t border-brand-navy/10">
        <h3 className="font-display font-bold text-2xl tracking-[0.2em] text-brand-navy mb-2">
          SAI PLANNERS
        </h3>
        <p className="font-mono text-[10px] md:text-xs tracking-widest text-brand-navy/50 uppercase">
          Planning • Engineering • Regulatory Consultancy
        </p>
      </div>

    </section>
    </div>
  );
}
