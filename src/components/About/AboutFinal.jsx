import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function AboutFinal() {
  const containerRef = useRef(null);
  
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1500",
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      // Initial States
      gsap.set('.final-bg', { scale: 1.5, opacity: 0 });
      gsap.set('.final-text', { y: 100, opacity: 0 });
      gsap.set('.final-cta', { y: 50, opacity: 0, scale: 0.9 });
      gsap.set('.final-overlay', { opacity: 1 });

      // Sequence
      tl.to('.final-bg', { scale: 1, opacity: 0.4, duration: 2, ease: "power2.out" }, 0)
        .to('.final-overlay', { opacity: 0.7, duration: 2 }, 0)
        .to('.final-text', { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }, 0.5)
        .to('.final-cta', { y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.5)" }, 1.5);
      
      tl.to({}, { duration: 1 }); // hold

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <section className="relative w-full h-screen bg-brand-navy overflow-hidden flex items-center justify-center">
      
      {/* Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070" 
          alt="Sai Planners Architectural Hero" 
          className="final-bg absolute inset-0 w-full h-full object-cover grayscale"
        />
        <div className="final-overlay absolute inset-0 bg-brand-navy mix-blend-multiply" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        
        <div className="final-text">
          <h2 className="typo-display text-white leading-none mb-6">
            READY TO BUILD<br/>
            <span className="text-brand-gold italic" style={{fontWeight:400}}>WITH CONFIDENCE?</span>
          </h2>
          <p className="typo-body text-white/80 font-light max-w-2xl mx-auto mb-12">
            Connect with our experts to discuss your project's planning and regulatory requirements.
          </p>
        </div>

        <div className="final-cta">
          <Link 
            to="/#contact"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold tracking-widest text-brand-navy bg-brand-gold rounded-full overflow-hidden transition-all duration-500 hover:scale-105"
          >
            <div className="absolute inset-0 w-full h-full bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1]" />
            <span className="typo-cta relative z-10 group-hover:text-brand-navy transition-colors duration-500">
              START YOUR PROJECT
            </span>
          </Link>
        </div>

      </div>

    </section>
    </div>
  );
}
