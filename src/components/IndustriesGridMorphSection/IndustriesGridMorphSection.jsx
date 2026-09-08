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
    title: "Commercial and Residential Properties",
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
  },
  {
    id: "layout",
    title: "Layout Promoters and Developers",
    image: "/why_choose_us/empty_land.PNG",
    smallImage: "/why_choose_us/empty_land.PNG"
  }
];

export default function IndustriesGridMorphSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=5000",
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      // HORIZONTAL JOURNEY
      const panDuration = 4;
      const numPanels = 5; // 6 panels total (1 intro + 5 cards), so 5 moves

      tl.to(".horizontal-track", {
        x: `-${numPanels * 100}vw`,
        duration: panDuration * numPanels,
        ease: "none"
      });

      // Parallax effects inside horizontal panels
      for (let i = 2; i <= 6; i++) {
        tl.to(`.panel-${i}-bg`, {
          x: "10vw", 
          duration: panDuration * numPanels,
          ease: "none"
        }, 0);
        
        tl.to(`.panel-${i}-fg`, {
          x: "-10vw",
          duration: panDuration * numPanels,
          ease: "none"
        }, 0);
      }
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

      <div className="horizontal-track absolute top-0 left-0 h-full flex w-[600vw] z-10">
        
        {/* ================= PANEL 1: INTRO (100vw) ================= */}
        <div className="panel-1 relative w-screen h-screen shrink-0 border-r border-[#282D7F]/10 flex flex-col items-center justify-center">
          <div className="text-center w-full max-w-[90vw] md:max-w-6xl">
            <h2 className="font-display font-bold text-[12vw] md:text-7xl lg:text-[7.5rem] xl:text-[9rem] tracking-wide uppercase text-[#282D7F] leading-[0.9] drop-shadow-sm whitespace-nowrap md:whitespace-normal mb-8">
              WHO WE SERVE
            </h2>
            <p className="typo-body text-[#282D7F]/80 max-w-2xl mx-auto">
              Strategic planning expertise for industries, institutions, developers, and businesses shaping the spaces of tomorrow.
            </p>
          </div>
        </div>

        {/* ================= PANEL 2: INDUSTRIAL (100vw) ================= */}
        <div className="panel-2 relative w-screen h-screen shrink-0 overflow-hidden bg-white border-r border-[#282D7F]/10 flex items-center">
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center gap-16 h-[70vh]">
            <div className="md:w-[45%] h-full relative shadow-2xl rounded-[24px] overflow-hidden panel-2-bg">
              <img src={industries[0].image} className="w-full h-full object-cover" alt="" />
            </div>
            <div className="md:w-[55%] h-full flex flex-col justify-center pt-12 md:pl-24 lg:pl-32 md:pr-8 panel-2-fg">
                <span className="typo-eyebrow text-[#FCAE16]">01</span>
                <h3 className="font-display font-bold text-5xl md:text-6xl lg:text-[4.5rem] leading-[0.95] tracking-wide uppercase text-[#282D7F] mt-6 mb-8">
                  INDUSTRIAL<br/>ENTREPRENEURS<br/>& DEVELOPERS
                </h3>
                <p className="typo-body text-[#282D7F]/70 max-w-md">
                  Delivering complete planning and statutory frameworks for all scale industrial projects, ensuring seamless compliance and optimal site utilization.
                </p>
            </div>
          </div>
        </div>

        {/* ================= PANEL 3: COMMERCIAL & RESIDENTIAL (100vw) ================= */}
        <div className="panel-3 relative w-screen h-screen shrink-0 overflow-hidden flex items-center border-r border-[#282D7F]/10">
          <div className="panel-3-bg absolute inset-0 bg-brand-navy -left-[10vw]" />
          <div className="relative z-10 w-full max-w-[1500px] mx-auto px-8 md:px-24 flex flex-col md:flex-row items-center justify-between gap-16">
            <div className="md:w-[45%] text-white panel-3-fg md:ml-12 lg:ml-24">
              <span className="typo-eyebrow text-brand-gold">02</span>
              <h3 className="font-display font-bold text-5xl md:text-6xl lg:text-[4.5rem] leading-[0.95] tracking-wide uppercase text-white mt-6 mb-8">
                COMMERCIAL AND<br/>RESIDENTIAL PROPERTIES
              </h3>
              <p className="typo-body text-white/70 max-w-md">
                Planning and compliance for large-scale commercial real estate, malls, marriage halls, and corporate parks.
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
            <div className="md:w-[45%] h-full relative panel-4-bg rounded-[24px] overflow-hidden shadow-xl">
              <img src={industries[2].image} className="w-full h-full object-cover" alt="" />
            </div>
            <div className="md:w-[55%] h-full flex flex-col justify-center pt-12 pl-4 md:pl-32 lg:pl-48 md:pr-8 panel-4-fg">
                <span className="typo-eyebrow text-[#FCAE16]">03</span>
                <h3 className="font-display font-bold text-5xl md:text-6xl lg:text-[4.5rem] leading-[0.95] tracking-wide uppercase text-[#282D7F] mt-6 mb-8">
                  EDUCATIONAL<br/>INSTITUTIONS
                </h3>
                <p className="typo-body text-[#282D7F]/70 max-w-md">
                  Creating compliant, safe, and expansive environments for schools, universities, and research facilities.
                </p>
                <div className="hidden md:block h-[25vh] w-[70%] relative rounded-[24px] overflow-hidden shadow-2xl mt-8 self-start md:ml-0">
                   <img src={industries[2].smallImage} className="w-full h-full object-cover" alt="" />
                </div>
            </div>
          </div>
        </div>

        {/* ================= PANEL 5: WAREHOUSE & LOGISTICS (100vw) ================= */}
        <div className="panel-5 relative w-screen h-screen shrink-0 overflow-hidden bg-[#0A0A0D] text-white flex items-center">
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356f27?q=80&w=2070')] bg-cover bg-center mix-blend-luminosity panel-5-bg" />
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-24 flex flex-col-reverse md:flex-row items-center gap-16">
            <div className="md:w-1/2 h-[40vh] md:h-[60vh] relative panel-5-fg md:ml-24 lg:ml-36">
              <div className="w-full h-full shadow-2xl rounded-[24px] overflow-hidden relative z-10">
                <img src={industries[3].image} className="w-full h-full object-cover" alt="" />
              </div>
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
                Specialized statutory clearances, factory act approvals, and technical planning for large-scale logistics infrastructure.
              </p>
            </div>
          </div>
        </div>

        {/* ================= PANEL 6: LAYOUT PROMOTERS & DEVELOPERS (100vw) ================= */}
        <div className="panel-6 relative w-screen h-screen shrink-0 overflow-hidden bg-white flex items-center border-r border-[#282D7F]/10">
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-16 flex flex-col-reverse md:flex-row items-center gap-16 h-[70vh]">
            <div className="md:w-[55%] h-full flex flex-col justify-center pt-12 md:pr-32 lg:pr-48 md:pl-8">
                <span className="typo-eyebrow text-[#FCAE16]">05</span>
                <h3 className="font-display font-bold text-5xl md:text-6xl lg:text-[4.5rem] leading-[0.95] tracking-wide uppercase text-[#282D7F] mt-6 mb-8">
                  LAYOUT PROMOTERS<br/>& DEVELOPERS
                </h3>
                <p className="typo-body text-[#282D7F]/70 max-w-md">
                  End-to-end statutory approvals and compliance strategy for large-scale land subdivision and development projects.
                </p>
            </div>
            <div className="md:w-[45%] md:mr-12 lg:mr-24 h-full relative shadow-2xl rounded-[24px] overflow-hidden">
              <img src={industries[4].image} className="w-full h-full object-cover" alt="" />
            </div>
          </div>
        </div>

        </div>
      </section>
      </div>
    </div>
  );
}
