import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const industries = [
  { name: "Industrial entrepreneurs", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070" },
  { name: "Factory owners", image: "https://images.unsplash.com/photo-1504307651254-35680f356f27?q=80&w=2070" },
  { name: "Property developers", image: "https://images.unsplash.com/photo-1541888081622-482a5fbc40d5?q=80&w=2070" },
  { name: "Landowners", image: "https://images.unsplash.com/photo-1448518184296-a22facb4446f?q=80&w=2070" },
  { name: "Layout developers", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071" },
  { name: "Schools", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069" },
  { name: "Educational institutions", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069" },
  { name: "Commercial developers", image: "https://images.unsplash.com/photo-1541888081622-482a5fbc40d5?q=80&w=2070" },
  { name: "Warehouse developers", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070" },
  { name: "Logistics developers", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070" },
  { name: "Infrastructure developers", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071" }
];

export default function Industries() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal items on scroll
      gsap.from(".industry-item", {
        opacity: 0,
        y: 50,
        stagger: 0.05,
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
    <div ref={containerRef} className="relative bg-brand-black text-white min-h-screen py-32 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
        <h2 className="font-display font-semibold text-6xl md:text-8xl leading-none tracking-tighter">
          WHO<br/>WE<br/>SERVE
        </h2>
      </div>

      <div className="w-full flex flex-wrap justify-center content-center px-4 md:px-24 gap-4 md:gap-x-12 md:gap-y-8">
        {industries.map((ind, i) => (
          <div key={i} className="industry-item group relative cursor-pointer">
            <h3 
              data-cursor="hover"
              className="font-display text-3xl md:text-5xl lg:text-6xl text-brand-muted-grey hover:text-white transition-colors duration-500 whitespace-nowrap"
            >
              {ind.name}
            </h3>
            
            {/* Hover Image Reveal */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-50 rounded-xl overflow-hidden shadow-2xl scale-50 group-hover:scale-100">
              <img src={ind.image} className="w-full h-full object-cover" alt="" />
            </div>
          </div>
        ))}
      </div>

      {/* Layered Collage Background Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5 mix-blend-screen">
        <div className="absolute top-[10%] left-[10%] w-[40vw] h-[40vh] bg-[url('https://images.unsplash.com/photo-1541888081622-482a5fbc40d5?q=80&w=2070')] bg-cover bg-center rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-[30vw] h-[30vh] bg-[url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070')] bg-cover bg-center rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
    </div>
  );
}
