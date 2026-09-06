import React, { useLayoutEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      });

      if (!prefersReducedMotion) {
        // Expand architectural dividers
        tl.fromTo('.footer-divider', 
          { scaleX: 0 }, 
          { scaleX: 1, duration: 1.5, ease: "power3.out", stagger: 0.15 }
        );

        // Reveal editorial text content
        tl.fromTo('.footer-reveal',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", stagger: 0.05 },
          "-=1.2"
        );
      } else {
        gsap.set(['.footer-divider', '.footer-reveal'], {
          opacity: 1, y: 0, scaleX: 1
        });
      }

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={containerRef} className="relative w-full bg-white text-black pt-24 pb-8 overflow-hidden z-20">
      
      {/* Subtle Architectural Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-50" style={{ backgroundImage: 'linear-gradient(#EAEAEA 1px, transparent 1px), linear-gradient(90deg, #EAEAEA 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(252,174,22,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 relative z-10 flex flex-col justify-between">
        
        {/* TOP SECTION: CTA & Eyebrow */}
        <div className="flex flex-col items-start justify-start pb-16 lg:pb-24">
          
          <div className="overflow-hidden mb-10">
            <div className="footer-reveal">
              <Link to="/" className="inline-block py-2">
                <img 
                  src="/logo/logo.png" 
                  alt="Sai Planners" 
                  className="h-[110px] md:h-[140px] lg:h-[180px] w-auto object-contain opacity-90 hover:opacity-100 transition-all duration-300 origin-left" 
                />
              </Link>
            </div>
          </div>
          
          <div className="overflow-hidden mb-8 lg:mb-12">
            <h2 className="footer-reveal font-display font-bold text-[11vw] sm:text-[60px] md:text-[70px] lg:text-[90px] xl:text-[110px] leading-[0.9] tracking-wide max-w-5xl text-black uppercase">
              LET'S BUILD WHAT <br />
              <span className="text-brand-navy font-normal">MOVES PROJECTS FORWARD.</span>
            </h2>
          </div>
          
          <div className="overflow-hidden">
            <div className="footer-reveal">
              <Link to="/contact" className="group flex items-center justify-center gap-6 px-8 py-4 lg:px-10 lg:py-5 border border-black bg-black rounded-xl hover:border-brand-navy hover:bg-brand-navy transition-all duration-500">
                <span className="font-mono text-sm md:text-base tracking-[0.15em] uppercase text-white group-hover:text-white transition-colors duration-500">
                  GET A CONSULTATION
                </span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 group-hover:translate-x-2">
                  <svg className="w-5 h-5 text-white transition-colors duration-500 group-hover:text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* DIVIDER 1 */}
        <div className="footer-divider w-full h-[1px] bg-[#D1D1D1] origin-left mb-12 lg:mb-16" />

        {/* SECTION 2: INFORMATION GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 lg:pb-24">
          
          {/* 01 / EXPLORE */}
          <div className="flex flex-col space-y-6 lg:space-y-8">
            <div className="overflow-hidden">
              <h4 className="footer-reveal font-mono text-[10px] tracking-[0.25em] text-black uppercase font-bold mb-2">
                <span className="text-brand-navy mr-2">01 /</span> EXPLORE
              </h4>
            </div>
            <ul className="space-y-4 lg:space-y-5 font-sans text-sm lg:text-base font-light text-black">
              <li className="overflow-hidden">
                <div className="footer-reveal">
                  <Link to="/" className="group inline-flex items-center gap-3 hover:text-brand-navy transition-all duration-300">
                    Home <span className="text-brand-navy opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
                  </Link>
                </div>
              </li>
              <li className="overflow-hidden">
                <div className="footer-reveal">
                  <Link to="/about" className="group inline-flex items-center gap-3 hover:text-brand-navy transition-all duration-300">
                    About <span className="text-brand-navy opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
                  </Link>
                </div>
              </li>
              <li className="overflow-hidden">
                <div className="footer-reveal">
                  {isHome ? (
                    <a href="#expertise-desktop" className="group inline-flex items-center gap-3 hover:text-brand-navy transition-all duration-300">
                      Services <span className="text-brand-navy opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
                    </a>
                  ) : (
                    <Link to="/#expertise-desktop" className="group inline-flex items-center gap-3 hover:text-brand-navy transition-all duration-300">
                      Services <span className="text-brand-navy opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
                    </Link>
                  )}
                </div>
              </li>
              <li className="overflow-hidden">
                <div className="footer-reveal">
                  <Link to="/contact" className="group inline-flex items-center gap-3 hover:text-brand-navy transition-all duration-300">
                    Contact <span className="text-brand-navy opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
                  </Link>
                </div>
              </li>
            </ul>
          </div>

          {/* 02 / OUR EXPERTISE */}
          <div className="flex flex-col space-y-6 lg:space-y-8">
            <div className="overflow-hidden">
              <h4 className="footer-reveal font-mono text-[10px] tracking-[0.25em] text-black uppercase font-bold mb-2">
                <span className="text-brand-navy mr-2">02 /</span> OUR EXPERTISE
              </h4>
            </div>
            <ul className="space-y-4 lg:space-y-5 font-sans text-sm lg:text-base font-light text-black">
              <li className="overflow-hidden">
                <div className="footer-reveal">
                  <a href="#" className="group inline-flex items-center gap-3 hover:text-brand-navy transition-all duration-300">
                    Statutory Approvals <span className="text-brand-navy opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
                  </a>
                </div>
              </li>
              <li className="overflow-hidden">
                <div className="footer-reveal">
                  <a href="#" className="group inline-flex items-center gap-3 hover:text-brand-navy transition-all duration-300">
                    Planning Compliance <span className="text-brand-navy opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
                  </a>
                </div>
              </li>
              <li className="overflow-hidden">
                <div className="footer-reveal">
                  <a href="#" className="group inline-flex items-center gap-3 hover:text-brand-navy transition-all duration-300">
                    Liaison & Coordination <span className="text-brand-navy opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
                  </a>
                </div>
              </li>
              <li className="overflow-hidden">
                <div className="footer-reveal">
                  <a href="#" className="group inline-flex items-center gap-3 hover:text-brand-navy transition-all duration-300">
                    Regulatory Advisory <span className="text-brand-navy opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* 03 / COMPANY */}
          <div className="flex flex-col space-y-6 lg:space-y-8">
            <div className="overflow-hidden">
              <h4 className="footer-reveal font-mono text-[10px] tracking-[0.25em] text-black uppercase font-bold mb-2">
                <span className="text-brand-navy mr-2">03 /</span> COMPANY
              </h4>
            </div>
            <ul className="space-y-4 lg:space-y-5 font-sans text-sm lg:text-base font-light text-black">
              <li className="overflow-hidden">
                <div className="footer-reveal">
                  <Link to="/about" className="group inline-flex items-center gap-3 hover:text-brand-navy transition-all duration-300">
                    Our Story <span className="text-brand-navy opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
                  </Link>
                </div>
              </li>
              <li className="overflow-hidden">
                <div className="footer-reveal">
                  <Link to="/about#role" className="group inline-flex items-center gap-3 hover:text-brand-navy transition-all duration-300">
                    Our Role <span className="text-brand-navy opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
                  </Link>
                </div>
              </li>
              <li className="overflow-hidden">
                <div className="footer-reveal">
                  <Link to="/about#values" className="group inline-flex items-center gap-3 hover:text-brand-navy transition-all duration-300">
                    Core Values <span className="text-brand-navy opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
                  </Link>
                </div>
              </li>
              <li className="overflow-hidden">
                <div className="footer-reveal">
                  <Link to="/contact" className="group inline-flex items-center gap-3 hover:text-brand-navy transition-all duration-300">
                    Contact <span className="text-brand-navy opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
                  </Link>
                </div>
              </li>
            </ul>
          </div>

          {/* 04 / CONTACT */}
          <div className="flex flex-col space-y-6 lg:space-y-8">
            <div className="overflow-hidden">
              <h4 className="footer-reveal font-mono text-[10px] tracking-[0.25em] text-black uppercase font-bold mb-2">
                <span className="text-brand-navy mr-2">04 /</span> CONTACT
              </h4>
            </div>
            <ul className="space-y-5 lg:space-y-6 font-sans text-[#333333] text-sm lg:text-base font-light">
              <li className="overflow-hidden">
                <div className="footer-reveal">
                  <a href="tel:+910000000000" className="text-black hover:text-brand-navy transition-colors inline-block relative">
                    +91 0000 0000 00
                  </a>
                </div>
              </li>
              <li className="overflow-hidden">
                <div className="footer-reveal">
                  <a href="mailto:contact@saiplanners.com" className="text-black hover:text-brand-navy transition-colors inline-block relative">
                    contact@saiplanners.com
                  </a>
                </div>
              </li>
              <li className="overflow-hidden">
                <div className="footer-reveal">
                  <span className="text-[#333333] cursor-default block max-w-[200px]">
                    Tamil Nadu, India
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* 05 / CONNECT */}
          <div className="flex flex-col space-y-6 lg:space-y-8">
            <div className="overflow-hidden">
              <h4 className="footer-reveal font-mono text-[10px] tracking-[0.25em] text-black uppercase font-bold mb-2">
                <span className="text-brand-navy mr-2">05 /</span> CONNECT
              </h4>
            </div>
            <ul className="space-y-4 lg:space-y-5 font-sans text-sm lg:text-base font-light text-black">
              <li className="overflow-hidden">
                <div className="footer-reveal">
                  <a href="#" className="group inline-flex items-center gap-3 hover:text-brand-navy transition-all duration-300">
                    Instagram <span className="text-brand-navy opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
                  </a>
                </div>
              </li>
              <li className="overflow-hidden">
                <div className="footer-reveal">
                  <a href="#" className="group inline-flex items-center gap-3 hover:text-brand-navy transition-all duration-300">
                    LinkedIn <span className="text-brand-navy opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
                  </a>
                </div>
              </li>
              <li className="overflow-hidden">
                <div className="footer-reveal">
                  <a href="#" className="group inline-flex items-center gap-3 hover:text-brand-navy transition-all duration-300">
                    Facebook <span className="text-brand-navy opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* DIVIDER 2 */}
        <div className="footer-divider w-full h-[1px] bg-[#D1D1D1] origin-left mb-6 lg:mb-8" />

        {/* SECTION 3: LEGAL (Very Bottom) */}
        <div className="overflow-hidden mb-2">
          <div className="footer-reveal flex flex-col md:flex-row justify-between items-start md:items-center text-[10px] md:text-[11px] text-[#333333] font-mono uppercase tracking-[0.15em] gap-6 md:gap-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-black">
              <p className="flex items-center gap-4">
                <span className="w-[6px] h-[6px] rounded-full bg-brand-navy block" />
                © {new Date().getFullYear()} SAI PLANNERS.
              </p>
              <a 
                href="https://thajiratechworks.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="opacity-60 sm:border-l sm:border-black/20 sm:pl-6 text-[9px] md:text-[10px] hover:text-brand-navy hover:opacity-100 transition-all cursor-pointer inline-block"
              >
                Developed by Thajira Techworks
              </a>
            </div>
            
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              <a href="#" className="hover:text-brand-navy transition-colors group relative">
                Privacy Policy
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-brand-navy scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>
              <a href="#" className="hover:text-brand-navy transition-colors group relative">
                Terms of Service
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-brand-navy scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
