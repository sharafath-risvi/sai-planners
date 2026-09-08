import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const industries = [
  {
    id: "industrial",
    title: "Industrial Entrepreneurs & Developers",
    image: "/why_choose_us/industrial_entrepreneurs_developers.PNG",
    smallImage: "/why_choose_us/industrial_entrepreneurs_developers.PNG"
  },
  {
    id: "commercial",
    title: "Commercial Properties",
    image: "/why_choose_us/commercial_buildind.PNG",
    smallImage: "/why_choose_us/commercial_buildind.PNG"
  },
  {
    id: "education",
    title: "Educational Institutions",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070",
    smallImage: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086"
  },
  {
    id: "warehouse",
    title: "Warehouse & Logistics",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070",
    smallImage: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=2070"
  }
];

export default function IndustriesGridMorphSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=6000",
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      let time = 0;

      // ==========================================
      // PHASE 1: DOOR REVEAL (Main Image)
      // ==========================================
      
      gsap.set(".img-0-wrapper", {
        width: isMobile ? "90vw" : "75vw",
        height: isMobile ? "60vh" : "60vh",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        clipPath: "inset(100% 0 0 0)"
      });
      
      gsap.set([".img-1-wrapper", ".img-2-wrapper", ".img-3-wrapper"], { opacity: 0 });

      tl.fromTo(".intro-text-who", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, time);
      tl.fromTo(".intro-text-title", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, time + 0.2);
      time += 1.5;

      tl.to(".img-0-wrapper", { clipPath: "inset(0% 0 0 0)", duration: 2, ease: "power2.inOut" }, time);
      tl.fromTo(".img-0", { scale: 1.15 }, { scale: 1, duration: 2, ease: "power2.out" }, time);
      
      tl.to([".intro-text-who", ".intro-text-title"], { opacity: 0, y: -20, duration: 1 }, time + 1);
      
      time += 2;
      tl.to({}, { duration: 1 }, time); // HOLD
      time += 1;

      // ==========================================
      // PHASE 2 & 3: GRID FORMATION & MORPH
      // ==========================================
      
      if (!isMobile) {
        const gridDuration = 2;

        tl.to(".img-0-wrapper", {
          width: "35vw",
          height: "45vh",
          top: "15vh",
          left: "10vw",
          xPercent: 0,
          yPercent: 0,
          duration: gridDuration,
          ease: "power2.inOut"
        }, time);

        tl.fromTo(".img-1-wrapper", 
          { width: "40vw", height: "30vh", top: "100vh", left: "50vw", xPercent: 0, yPercent: 0 },
          { top: "15vh", opacity: 1, duration: gridDuration, ease: "power2.inOut" }, 
          time
        );

        tl.fromTo(".img-2-wrapper", 
          { width: "40vw", height: "40vh", top: "48vh", left: "100vw", xPercent: 0, yPercent: 0 },
          { left: "50vw", opacity: 1, duration: gridDuration, ease: "power2.inOut" }, 
          time + 0.2
        );

        time += gridDuration;
        tl.to({}, { duration: 1 }, time); // HOLD
        time += 1;

        tl.to(".img-0-wrapper", {
          width: "45vw",
          height: "30vh",
          top: "55vh",
          left: "10vw",
          duration: gridDuration,
          ease: "power2.inOut"
        }, time);

        tl.to(".img-1-wrapper", {
          width: "25vw",
          height: "35vh",
          top: "15vh",
          left: "10vw",
          duration: gridDuration,
          ease: "power2.inOut"
        }, time);

        tl.to(".img-2-wrapper", {
          width: "50vw",
          height: "35vh",
          top: "15vh",
          left: "38vw",
          duration: gridDuration,
          ease: "power2.inOut"
        }, time);

        tl.fromTo(".img-3-wrapper",
          { width: "32vw", height: "30vh", top: "100vh", left: "58vw", xPercent: 0, yPercent: 0 },
          { top: "55vh", opacity: 1, duration: gridDuration, ease: "power2.inOut" },
          time + 0.2
        );

      } else {
        const gridDuration = 2;
        
        tl.to(".img-0-wrapper", {
          width: "80vw",
          height: "30vh",
          top: "15vh",
          left: "10vw",
          xPercent: 0,
          yPercent: 0,
          duration: gridDuration,
          ease: "power2.inOut"
        }, time);

        tl.fromTo(".img-1-wrapper", 
          { width: "80vw", height: "30vh", top: "100vh", left: "10vw", xPercent: 0, yPercent: 0 },
          { top: "48vh", opacity: 1, duration: gridDuration, ease: "power2.inOut" }, 
          time
        );

        time += gridDuration;
        tl.to({}, { duration: 1 }, time); // HOLD
        time += 1;
        
        tl.to(".img-0-wrapper", { width: "45vw", height: "25vh", left: "5vw", duration: gridDuration }, time);
        tl.to(".img-1-wrapper", { width: "40vw", height: "25vh", left: "55vw", top: "15vh", duration: gridDuration }, time);
        
        tl.fromTo(".img-2-wrapper", 
          { width: "90vw", height: "35vh", top: "100vh", left: "5vw", xPercent: 0, yPercent: 0 },
          { top: "45vh", opacity: 1, duration: gridDuration, ease: "power2.inOut" }, 
          time
        );
      }
      
      time += 2;
      tl.to({}, { duration: 1.5 }, time); // HOLD before horizontal journey
      time += 1.5;

      // ==========================================
      // PHASE 4: HORIZONTAL JOURNEY
      // ==========================================
      const panDuration = 4;
      const numPanels = 4; // 5 panels total, 4 moves

      tl.to(".horizontal-track", {
        x: `-${numPanels * 100}vw`,
        duration: panDuration * numPanels,
        ease: "none"
      }, time);

      // Parallax effects inside horizontal panels
      for (let i = 2; i <= 5; i++) {
        // Background slightly slower
        tl.to(`.panel-${i}-bg`, {
          x: "10vw", 
          duration: panDuration * numPanels,
          ease: "none"
        }, time);
        
        // Foreground slightly faster
        tl.to(`.panel-${i}-fg`, {
          x: "-10vw",
          duration: panDuration * numPanels,
          ease: "none"
        }, time);
      }

      time += (panDuration * numPanels);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <div ref={containerRef}>
        <section className="relative w-full h-screen bg-[#F5F5F7] text-[#282D7F] overflow-hidden">
      
      {/* Decorative Brand Shapes */}
      <div className="absolute inset-0 pointer-events-none opacity-30 z-0">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-bl-full bg-white/50 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full border border-[#FCAE16]/30" />
        <div className="absolute top-1/2 left-[20%] w-[1px] h-[30vh] bg-[#282D7F]/10" />
      </div>

      <div className="horizontal-track absolute top-0 left-0 h-full flex w-[500vw] z-10">
        
        {/* ================= PANEL 1: GRID MORPHING STAGE (100vw) ================= */}
        <div className="panel-1 relative w-screen h-screen shrink-0 border-r border-[#282D7F]/10">
          
          <div className="intro-text-who absolute top-[20%] left-1/2 -translate-x-1/2 z-10 text-center w-full max-w-[90vw] md:max-w-6xl">
            <h2 className="font-display font-bold text-[12vw] md:text-7xl lg:text-[7.5rem] xl:text-[9rem] tracking-wide uppercase text-[#282D7F] leading-[0.9] drop-shadow-sm whitespace-nowrap md:whitespace-normal">
              WHO WE SERVE
            </h2>
          </div>
          <div className="intro-text-title absolute top-[45%] left-1/2 -translate-x-1/2 text-center w-full max-w-[90vw] md:max-w-6xl z-10">
            <p className="typo-body text-[#282D7F]/80 max-w-2xl mx-auto">
              Strategic planning expertise for industries, institutions, developers, and businesses shaping the spaces of tomorrow.
            </p>
          </div>

          <div className="absolute inset-0 z-20">
            <div className="img-0-wrapper absolute overflow-hidden shadow-2xl rounded-[24px]">
              <img src={industries[0].image} className="img-0 w-full h-full object-cover origin-center" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-transparent to-transparent flex items-end p-6 md:p-8">
                <span className="font-display text-white font-semibold tracking-wide text-sm md:text-lg drop-shadow-md">01 — INDUSTRIAL ENTREPRENEURS & DEVELOPERS</span>
              </div>
            </div>
            <div className="img-1-wrapper absolute overflow-hidden shadow-2xl rounded-[24px]">
              <img src={industries[1].image} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-transparent to-transparent flex items-end p-6 md:p-8">
                <span className="font-display text-white font-semibold tracking-wide text-sm md:text-lg drop-shadow-md">02 — COMMERCIAL PROPERTIES</span>
              </div>
            </div>
            <div className="img-2-wrapper absolute overflow-hidden shadow-2xl rounded-[24px]">
              <img src={industries[2].image} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-transparent to-transparent flex items-end p-6 md:p-8">
                <span className="font-display text-white font-semibold tracking-wide text-sm md:text-lg drop-shadow-md">03 — EDUCATIONAL INSTITUTIONS</span>
              </div>
            </div>
            <div className="img-3-wrapper absolute overflow-hidden shadow-2xl rounded-[24px]">
              <img src={industries[3].image} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-transparent to-transparent flex items-end p-6 md:p-8">
                <span className="font-display text-white font-semibold tracking-wide text-sm md:text-lg drop-shadow-md">04 — WAREHOUSE & LOGISTICS</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= PANEL 2: INDUSTRIAL (100vw) ================= */}
        <div className="panel-2 relative w-screen h-screen shrink-0 overflow-hidden bg-white border-r border-[#282D7F]/10 flex items-center">
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center gap-16 h-[70vh]">
            
            {/* Left Image */}
            <div className="md:w-[45%] h-full relative shadow-2xl rounded-[24px] overflow-hidden panel-2-bg">
              <img src={industries[0].image} className="w-full h-full object-cover" alt="" />
            </div>

            {/* Right: Content + Small Image Below */}
            <div className="md:w-[55%] h-full flex flex-col justify-between pt-12 md:pl-24 lg:pl-32 md:pr-8">
              <div className="panel-2-fg">
                <span className="typo-eyebrow text-[#FCAE16]">01</span>
                <h3 className="font-display font-bold text-5xl md:text-6xl lg:text-[4.5rem] leading-[0.95] tracking-wide uppercase text-[#282D7F] mt-6 mb-8">
                  INDUSTRIAL<br/>ENTREPRENEURS<br/>& DEVELOPERS
                </h3>
                <p className="typo-body text-[#282D7F]/70 max-w-md">
                  Delivering complete planning and statutory frameworks for large-scale industrial projects, ensuring seamless compliance and optimal site utilization.
                </p>
              </div>

              <div className="h-[25vh] w-[70%] relative panel-2-fg rounded-[24px] overflow-hidden shadow-2xl mt-8 self-start md:ml-0">
                 <img src={industries[0].smallImage} className="w-full h-full object-cover" alt="" />
              </div>
            </div>

          </div>
        </div>

        {/* ================= PANEL 3: COMMERCIAL (100vw) ================= */}
        <div className="panel-3 relative w-screen h-screen shrink-0 overflow-hidden flex items-center border-r border-[#282D7F]/10">
          <div className="panel-3-bg absolute inset-0 bg-brand-navy -left-[10vw]" />
          
          {/* Container - added padding to push content slightly inward from extreme left edge */}
          <div className="relative z-10 w-full max-w-[1500px] mx-auto px-8 md:px-24 flex flex-col md:flex-row items-center justify-between gap-16">
            <div className="md:w-[45%] text-white panel-3-fg md:ml-12 lg:ml-24">
              <span className="typo-eyebrow text-brand-gold">02</span>
              <h3 className="font-display font-bold text-5xl md:text-6xl lg:text-[4.5rem] leading-[0.95] tracking-wide uppercase text-white mt-6 mb-8">
                COMMERCIAL<br/>PROPERTIES
              </h3>
              <p className="typo-body text-white/70 max-w-md">
                Master planning and compliance for large-scale commercial real estate, retail spaces, and corporate parks.
              </p>
            </div>
            
            <div className="md:w-[45%] h-[50vh] md:h-[65vh] relative panel-3-fg">
              <div className="w-full h-full shadow-2xl rounded-[24px] overflow-hidden relative z-10">
                <img src={industries[1].image} className="w-full h-full object-cover" alt="" />
              </div>
              
              <div className="absolute -bottom-8 -right-8 w-48 h-40 shadow-2xl rounded-[16px] overflow-hidden z-20 hidden md:block border-4 border-[#282D7F]">
                <img src={industries[1].smallImage} className="w-full h-full object-cover" alt="" />
              </div>
            </div>
          </div>
        </div>

        {/* ================= PANEL 4: EDUCATION (100vw) ================= */}
        <div className="panel-4 relative w-screen h-screen shrink-0 overflow-hidden bg-[#F5F5F7] border-r border-[#282D7F]/10 flex items-center">
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center gap-16 h-[70vh]">
            
            {/* Left: Large main image */}
            <div className="md:w-[45%] h-full relative panel-4-bg rounded-[24px] overflow-hidden shadow-xl">
              <img src={industries[2].image} className="w-full h-full object-cover" alt="" />
            </div>
            
            {/* Right: Content + Small Image Below - Pushed heavily to the right for premium breathing space */}
            <div className="md:w-[55%] h-full flex flex-col justify-between pt-12 pl-4 md:pl-32 lg:pl-48 md:pr-8">
              <div className="panel-4-fg">
                <span className="typo-eyebrow text-[#FCAE16]">03</span>
                <h3 className="font-display font-bold text-5xl md:text-6xl lg:text-[4.5rem] leading-[0.95] tracking-wide uppercase text-[#282D7F] mt-6 mb-8">
                  EDUCATIONAL<br/>INSTITUTIONS
                </h3>
                <p className="typo-body text-[#282D7F]/70 max-w-md">
                  Creating compliant, safe, and expansive environments for schools, universities, and research facilities.
                </p>
              </div>
              
              <div className="hidden md:block h-[25vh] w-[70%] relative panel-4-fg rounded-[24px] overflow-hidden shadow-2xl mt-8 self-start md:ml-0">
                 <img src={industries[2].smallImage} className="w-full h-full object-cover" alt="" />
              </div>
            </div>

          </div>
        </div>

        {/* ================= PANEL 5: WAREHOUSE & LOGISTICS (100vw) ================= */}
        <div className="panel-5 relative w-screen h-screen shrink-0 overflow-hidden bg-[#0A0A0D] text-white flex items-center">
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356f27?q=80&w=2070')] bg-cover bg-center mix-blend-luminosity panel-5-bg" />
          
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-24 flex flex-col-reverse md:flex-row items-center gap-16">
            
            {/* Left Image - Pushed inward from left edge for premium breathing room */}
            <div className="md:w-1/2 h-[40vh] md:h-[60vh] relative panel-5-fg md:ml-24 lg:ml-36">
              <div className="w-full h-full shadow-2xl rounded-[24px] overflow-hidden relative z-10">
                <img src={industries[3].image} className="w-full h-full object-cover" alt="" />
              </div>
              
              {/* Added Small Supporting Image (Different layout position: overlapping bottom right of main image) */}
              <div className="absolute -bottom-8 -right-8 w-48 h-40 shadow-2xl rounded-[16px] overflow-hidden z-20 hidden md:block border-4 border-[#0A0A0D]">
                <img src={industries[3].smallImage} className="w-full h-full object-cover" alt="" />
              </div>
            </div>

            <div className="md:w-1/2 md:pl-20 lg:pl-32">
              <span className="typo-eyebrow text-[#FCAE16]">04</span>
              <h3 className="font-display font-bold text-5xl md:text-6xl lg:text-[4.5rem] leading-[0.95] tracking-wide uppercase text-white mt-6 mb-8">
                WAREHOUSE &<br/>LOGISTICS
              </h3>
              <p className="typo-body text-white/70 max-w-md">
                Specialized statutory clearances, factory act approvals, and technical master planning for large-scale logistics infrastructure.
              </p>
            </div>

          </div>
        </div>

        </div>
      </section>
      </div>
    </div>
  );
}
