import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "INDUSTRIAL PARK MASTERPLAN",
    category: "Master Planning",
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070",
    size: "large" // Takes up full width on mobile, 2/3 on desktop
  },
  {
    title: "COMMERCIAL PLAZA",
    category: "Statutory Approvals",
    img: "https://images.unsplash.com/photo-1448518184296-a22facb4446f?q=80&w=2070",
    size: "small" // 1/3 on desktop
  },
  {
    title: "RESIDENTIAL TOWNSHIP",
    category: "Land Development",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069",
    size: "wide" // Full width
  }
];

export default function HorizontalGallery() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      gsap.utils.toArray('.project-card').forEach((card) => {
        const img = card.querySelector('.project-img');
        const content = card.querySelector('.project-content');
        
        // Subtle Parallax on Image
        gsap.to(img, {
          y: "10%",
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });

        // Reveal content on scroll
        gsap.fromTo(content,
          { y: 30, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            }
          }
        );
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <section className="relative w-full bg-brand-soft-grey py-32 md:py-48 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
          <div>
            <h4 className="font-mono text-sm tracking-widest text-brand-gold uppercase font-bold mb-4">SELECTED WORKS</h4>
            <h2 className="font-display font-semibold text-4xl md:text-6xl tracking-tighter text-brand-navy">
              DELIVERED PROJECTS.
            </h2>
          </div>
          <a href="#" className="group inline-flex items-center text-sm font-bold tracking-widest text-brand-navy hover:text-brand-gold transition-colors uppercase border-b border-brand-navy/20 hover:border-brand-gold pb-1">
            VIEW ALL WORK
            <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
          </a>
        </div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          
          {/* Large Project */}
          <div className="project-card md:col-span-8 group cursor-pointer">
            <div className="relative w-full h-[50vh] md:h-[70vh] rounded-[24px] overflow-hidden mb-6">
              <img src={projects[0].img} className="project-img absolute top-[-5%] left-0 w-full h-[110%] object-cover origin-center transition-transform duration-700 group-hover:scale-105" alt={projects[0].title} />
              <div className="absolute inset-0 bg-brand-navy/10 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
            </div>
            <div className="project-content">
              <p className="font-mono text-xs tracking-widest text-brand-gold uppercase mb-2">{projects[0].category}</p>
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-brand-navy">{projects[0].title}</h3>
            </div>
          </div>

          {/* Small Project */}
          <div className="project-card md:col-span-4 group cursor-pointer md:mt-32">
            <div className="relative w-full h-[50vh] md:h-[50vh] rounded-[24px] overflow-hidden mb-6">
              <img src={projects[1].img} className="project-img absolute top-[-5%] left-0 w-full h-[110%] object-cover origin-center transition-transform duration-700 group-hover:scale-105" alt={projects[1].title} />
              <div className="absolute inset-0 bg-brand-navy/10 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
            </div>
            <div className="project-content">
              <p className="font-mono text-xs tracking-widest text-brand-gold uppercase mb-2">{projects[1].category}</p>
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-brand-navy">{projects[1].title}</h3>
            </div>
          </div>

          {/* Wide Project */}
          <div className="project-card md:col-span-12 group cursor-pointer mt-12 md:mt-24">
            <div className="relative w-full h-[50vh] md:h-[80vh] rounded-[24px] md:rounded-[40px] overflow-hidden mb-6">
              <img src={projects[2].img} className="project-img absolute top-[-5%] left-0 w-full h-[110%] object-cover origin-center transition-transform duration-700 group-hover:scale-105" alt={projects[2].title} />
              <div className="absolute inset-0 bg-brand-navy/10 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
            </div>
            <div className="project-content md:flex md:items-end justify-between">
              <div>
                <p className="font-mono text-xs tracking-widest text-brand-gold uppercase mb-2">{projects[2].category}</p>
                <h3 className="font-display text-2xl md:text-4xl font-semibold text-brand-navy">{projects[2].title}</h3>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
    </div>
  );
}
