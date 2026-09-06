import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CTA from '../../components/CTA/CTA';

gsap.registerPlugin(ScrollTrigger);

const resources = [
  {
    id: '01',
    titleBlack: 'GOVERNMENT',
    titleViolet: 'ORDERS',
    label: 'TAMIL NADU GOVERNMENT',
    desc: 'Access Government Orders and related official government notifications.',
    btnLabel: 'VISIT PORTAL',
    url: 'https://www.tn.gov.in/go.php?dep_id=MTU=&year=MjAyNg==',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '02',
    titleBlack: 'TAMIL NADU',
    titleViolet: 'GAZETTE',
    label: 'STATIONERY & PRINTING DEPARTMENT',
    desc: 'Access official Tamil Nadu Gazette publications and notifications.',
    btnLabel: 'VIEW GAZETTE',
    url: 'https://www.stationeryprinting.tn.gov.in/gazette.php',
    img: 'https://images.unsplash.com/photo-1541888081622-421f5fb3d052?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '03',
    titleBlack: 'TOWN & COUNTRY',
    titleViolet: 'PLANNING',
    label: 'DTCP — GOVERNMENT OF TAMIL NADU',
    desc: 'Access the Directorate of Town and Country Planning portal for planning and development-related information.',
    btnLabel: 'VISIT DTCP',
    url: 'https://tcp.tn.gov.in/home',
    img: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '04',
    titleBlack: 'CHENNAI METROPOLITAN',
    titleViolet: 'DEVELOPMENT AUTHORITY',
    label: 'CMDA',
    desc: 'Access the official CMDA portal for Chennai metropolitan planning and development information.',
    btnLabel: 'VISIT CMDA',
    url: 'https://www.cmdachennai.gov.in/index.html',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '05',
    titleBlack: 'ONLINE PLANNING',
    titleViolet: 'PERMISSION',
    label: 'TAMIL NADU SINGLE WINDOW PORTAL',
    desc: 'Access the official online planning permission portal.',
    btnLabel: 'OPEN PORTAL',
    url: 'https://onlineppa.tn.gov.in/',
    img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200'
  }
];

export default function Resources() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (!prefersReducedMotion) {
        // Hero Reveal
        const heroTl = gsap.timeline();
        heroTl.fromTo('.hero-reveal',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", stagger: 0.15, delay: 0.2 }
        );

        // Resources Stagger
        gsap.fromTo('.resource-card',
          { y: 60, opacity: 0 },
          {
            scrollTrigger: {
              trigger: '.resources-grid',
              start: "top 80%",
            },
            y: 0, 
            opacity: 1, 
            duration: 1, 
            ease: "power3.out", 
            stagger: 0.15
          }
        );

        // CTA Reveal
        gsap.fromTo('.cta-reveal',
          { y: 30, opacity: 0 },
          {
            scrollTrigger: {
              trigger: '.bottom-cta-section',
              start: "top 85%",
            },
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            ease: "power3.out",
            stagger: 0.1
          }
        );
      } else {
        gsap.set(['.hero-reveal', '.resource-card', '.cta-reveal'], { opacity: 1, y: 0 });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#05060A] min-h-screen text-white overflow-hidden relative selection:bg-brand-gold selection:text-brand-navy pt-32">
      
      {/* Premium Ambient Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>
      <div className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-[radial-gradient(circle_at_center,rgba(252,174,22,0.05)_0%,transparent_70%)] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_center,rgba(86,63,163,0.06)_0%,transparent_70%)] pointer-events-none z-0" />

      {/* HERO SECTION */}
      <section className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 pt-16 md:pt-24 pb-20 md:pb-32">
        <div className="max-w-4xl">
          <div className="overflow-hidden mb-8 md:mb-10">
            <h4 className="hero-reveal font-mono text-xs md:text-sm tracking-[0.25em] text-brand-gold uppercase font-bold">
              RESOURCES
            </h4>
          </div>
          
          <h1 className="hero-reveal font-display font-bold leading-[0.95] uppercase tracking-wide mb-10 md:mb-12 w-full max-w-5xl" style={{fontSize: 'clamp(2.5rem, 7vw, 7rem)'}}>
            <span className="block text-white mb-1 md:mb-2">
              OFFICIAL <span className="text-brand-violet">RESOURCES</span>
            </span>
            <span className="block text-white">
              FOR BETTER PLANNING
            </span>
          </h1>

          <div className="overflow-hidden">
            <p className="hero-reveal font-sans text-white/70 text-lg md:text-xl font-light leading-[1.7] tracking-wide max-w-2xl">
              Quick access to official Tamil Nadu government, planning, regulatory and permission portals used across the planning process.
            </p>
          </div>
        </div>
      </section>

      {/* RESOURCES DIRECTORY */}
      <section className="relative z-10 w-full bg-[#F9F9F8] text-[#0A0A0A] py-24 md:py-32 rounded-t-[2.5rem] md:rounded-t-[4rem]">
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="mb-16 md:mb-24 max-w-4xl">
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl uppercase tracking-wide leading-[0.9] mb-8 text-[#0A0A0A]">
              OFFICIAL PLANNING <span className="text-brand-violet">RESOURCES</span>
            </h2>
            <div className="w-12 h-[2px] bg-brand-violet/50 mb-8" />
            <p className="font-sans text-[#0A0A0A]/70 text-lg md:text-xl font-light leading-[1.7] tracking-wide max-w-2xl">
              Direct access to the official government platforms relevant to planning, regulation, approvals and statutory information.
            </p>
          </div>

          {/* Large Horizontal Editorial Cards Layout */}
          <div className="resources-grid flex flex-col gap-16 md:gap-24">
            {resources.map((resource, idx) => {
              const isImageLeft = idx % 2 !== 0; // 01 is right (idx 0 -> false), 02 is left (idx 1 -> true)
              return (
                <a 
                  key={resource.id}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-card group flex flex-col lg:flex-row relative w-full border border-[#0A0A0A]/10 hover:border-brand-gold rounded-3xl md:rounded-[2.5rem] bg-white overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-brand-violet/10 transition-all duration-700"
                >
                  
                  {/* CONTENT SIDE */}
                  <div className={`flex flex-col justify-between p-8 md:p-12 lg:p-16 xl:p-20 w-full lg:w-[55%] xl:w-[60%] order-2 ${isImageLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div>
                      <div className="flex justify-between items-start mb-10">
                        <span className="font-display font-bold text-5xl md:text-6xl text-brand-violet/20 group-hover:text-brand-violet transition-colors duration-500 leading-none">
                          {resource.id}
                        </span>
                        <div className="w-12 h-12 rounded-full border border-[#0A0A0A]/10 flex items-center justify-center group-hover:border-brand-violet group-hover:bg-brand-violet transition-colors duration-500">
                          <ArrowUpRight className="w-5 h-5 text-[#0A0A0A]/40 group-hover:text-white transition-colors duration-500 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </div>
                      
                      <h4 className="font-mono text-[10px] md:text-xs font-bold tracking-[0.25em] text-[#0A0A0A]/50 uppercase mb-4 group-hover:text-brand-violet transition-colors duration-500">
                        {resource.label}
                      </h4>
                      
                      <h3 className="font-display font-bold text-4xl md:text-5xl lg:text-[3.5rem] uppercase leading-[0.9] tracking-wide mb-6 group-hover:text-brand-violet transition-colors duration-500 pr-4">
                        <span className="text-[#0A0A0A] group-hover:text-brand-violet transition-colors duration-500">{resource.titleBlack}</span>{' '}
                        <span className="text-brand-violet">{resource.titleViolet}</span>
                      </h3>
                      
                      <p className="font-sans text-[#0A0A0A]/70 font-light text-base md:text-xl leading-[1.65] tracking-wide max-w-xl">
                        {resource.desc}
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-3 font-mono text-sm md:text-base font-bold tracking-[0.2em] uppercase text-[#0A0A0A] mt-12 group-hover:text-brand-violet transition-colors duration-300">
                      {resource.btnLabel}
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                  </div>

                  {/* IMAGE SIDE */}
                  <div className={`relative w-full lg:w-[45%] xl:w-[40%] h-[300px] lg:h-auto order-1 overflow-hidden ${isImageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                    <img 
                      src={resource.img} 
                      alt={resource.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                    />
                  </div>
                </a>
              );
            })}
          </div>

          <div className="mt-16 md:mt-24 pt-8 border-t border-[#0A0A0A]/10 flex justify-center">
            <p className="font-sans text-xs md:text-sm text-[#0A0A0A]/40 font-light text-center">
              * External links open official government websites in a new tab.
            </p>
          </div>
        </div>
      </section>

      <CTA />

    </div>
  );
}
