import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import CTA from '../../components/CTA/CTA';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  { 
    num: "01", 
    tag: "PLANNING & APPROVALS",
    title: "DTCP, CMDA & LPA Plan Approvals",
    desc: "Our team coordinates comprehensive planning submissions and statutory approval requirements with the applicable development authorities, helping large-scale real estate projects move through the urban planning process with greater clarity, compliance, and reduced friction.",
    img: "https://images.unsplash.com/photo-1541888081622-482a5fbc40d5?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    num: "02", 
    tag: "REGULATORY COMPLIANCE",
    title: "RERA Approvals and Project Compliance Support",
    desc: "We navigate complex real estate regulations and project registration requirements on behalf of developers, ensuring ongoing statutory compliance and transparent reporting standards are met throughout the project lifecycle.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
  },
  { 
    num: "03", 
    tag: "MASTER PLANNING",
    title: "Land Development, Layout Planning & Approvals",
    desc: "We provide end-to-end master planning, strategic site assessment, and infrastructural coordination for large land parcels, transforming raw land into structured, regulatory-compliant layouts ready for successful development.",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356f27?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    num: "04", 
    tag: "STRATEGIC ADVISORY",
    title: "Land Use Reclassification & Zone Conversion",
    desc: "Our experts provide technical guidance and coordination for land use reclassification and zone conversions, effectively unlocking and maximizing the legal development potential of your strategic real estate assets.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    num: "05", 
    tag: "INDUSTRIAL ENGINEERING",
    title: "Engineering & Planning Services for Industrial Projects",
    desc: "We deliver specialized engineering planning, structural validations, and precise technical drawings, working closely with regulatory bodies to secure factory act approvals for complex industrial and manufacturing facilities.",
    img: "https://images.unsplash.com/photo-1448518184296-a22facb4446f?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    num: "06", 
    tag: "ENVIRONMENTAL CLEARANCE",
    title: "TNPCB Approvals & Environmental Compliance",
    desc: "We manage the entire environmental clearance lifecycle, coordinating closely with pollution control boards to secure essential NOCs and ensure your projects align with modern environmental protection standards.",
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop"
  },
  {
    num: "07",
    tag: "SAFETY COMPLIANCE",
    title: "Fire NOC & Fire-Safety Approval Coordination",
    desc: "Our team handles end-to-end coordination for critical fire safety compliance, designing compliant layouts and navigating regulatory pathways to secure necessary NOCs from emergency service authorities.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop"
  },
  {
    num: "08",
    tag: "INDUSTRIAL HEALTH",
    title: "DISH Approvals & Industrial Safety Coordination",
    desc: "We systematically secure industrial safety approvals and manage ongoing operational compliance with Directorate of Industrial Safety and Health (DISH) regulations, protecting both workers and enterprise operations.",
    img: "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34d?q=80&w=2070&auto=format&fit=crop"
  },
  {
    num: "09",
    tag: "INFRASTRUCTURE NOCs",
    title: "PWD NOCs & Related Statutory Clearances",
    desc: "We act as a direct liaison with public works departments and related municipal authorities to secure the vital statutory clearances required for infrastructure integration, access, and overall project commencement.",
    img: "https://images.unsplash.com/photo-1503708928676-1cb796a0891e?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function Services() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  
  // Dynamically detect all frames at build/runtime using Vite
  const glob1 = import.meta.glob('/public/serviceoneframeswebp/*.webp');
  const glob2 = import.meta.glob('/public/servicetwoframeswebp/*.webp');

  const getSortedUrls = (globObj) => {
    return Object.keys(globObj)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
      .map(path => path.replace(/^\/public/, ''));
  };

  const allFrameUrls = [...getSortedUrls(glob1), ...getSortedUrls(glob2)];
  const frameCount = allFrameUrls.length || 600; // Fallback just in case

  const serviceText = {
    s1: { num: "01", title: "DTCP PLAN APPROVALS", desc: "Coordinating planning submissions and statutory approval requirements with the Directorate of Town and Country Planning." },
    s2: { num: "02", title: "CMDA PLAN APPROVALS", desc: "Navigating planning and development approval requirements within the Chennai Metropolitan Development Authority jurisdiction." },
    s3: { num: "03", title: "LPA PLAN APPROVALS", desc: "Securing planning approvals under the relevant Local Planning Authority for regional real estate projects." },
    s4: { num: "04", title: "RERA APPROVALS & COMPLIANCE SUPPORT", desc: "Navigating complex real estate regulations and project registration requirements to ensure ongoing statutory compliance." },
    s5: { num: "08", title: "LAND DEVELOPMENT & LAYOUT PLANNING", desc: "End-to-end master planning, strategic site assessment, and infrastructural coordination for large land parcels." },
    s6: { num: "05", title: "LAND USE RECLASSIFICATION & ZONE CONVERSION", desc: "Technical guidance and coordination for land use reclassification, maximizing the legal development potential of assets." },
    s7: { num: "09", title: "INDUSTRIAL & MANUFACTURING ENGINEERING SERVICES", desc: "Specialized engineering planning, structural validations, and technical drawings for complex industrial facilities." },
    s8: { num: "10", title: "TNPCB APPROVALS & COMPLIANCE SUPPORT", desc: "Managing the entire environmental clearance lifecycle and coordinating with pollution control boards for essential NOCs." },
    s9: { num: "11", title: "FIRE NOC & FIRE APPROVAL COORDINATION", desc: "End-to-end coordination for critical fire safety compliance, designing compliant layouts and securing emergency service NOCs." },
    s10: { num: "12", title: "DISH APPROVALS", desc: "Securing industrial safety approvals and managing ongoing operational compliance with DISH regulations." },
    s11: { num: "06", title: "PWD APPROVALS", desc: "Direct liaison with public works departments to secure vital statutory clearances required for infrastructure integration." },
    s12: { num: "07", title: "WETLAND NOC & RELATED CLEARANCES", desc: "Guiding projects through wetland preservation regulations and securing necessary clearances for development." },
  };

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { alpha: false });
    const images = [];
    const scrollObj = { frame: 1 };

    // Preload the dynamically detected combined sequence
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = allFrameUrls[i];
      images.push(img);
    }

    const render = () => {
      const img = images[Math.floor(scrollObj.frame) - 1];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const ratio = Math.max(cw / iw, ch / ih);
      const cx = (cw - iw * ratio) / 2;
      const cy = (ch - ih * ratio) / 2;
      
      // Crucial: Clear the canvas before drawing to prevent alpha-stacking (darkness/ghosting) 
      // from semi-transparent PNG frames during scroll.
      context.clearRect(0, 0, cw, ch);
      context.drawImage(img, 0, 0, iw, ih, cx, cy, iw * ratio, ih * ratio);
    };

    if (images[0]?.complete) {
      render();
    } else if (images[0]) {
      images[0].onload = render;
    }

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2100%",
          scrub: true,
          pin: true,
        }
      });

      // INITIAL SHAPE OPENING (Runs on load)
      gsap.set('.services-hero-intro', { opacity: 0, scale: 1.05 });
      gsap.set('.hero-canvas-wrapper', { clipPath: 'circle(15% at 50% 50%)' }); // Elegant circular opening
      
      const openingTl = gsap.timeline({ delay: 0.2 });
      openingTl.to('.hero-canvas-wrapper', {
        clipPath: 'circle(150% at 50% 50%)',
        duration: 2.0,
        ease: "power3.inOut"
      })
      .to('.services-hero-intro', {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power2.out"
      }, "-=0.5");

      // INITIAL SCROLL EXIT (Split OUR SERVICES physically off-screen)
      // We use a massive x translation so they physically leave the viewport.
      // We delay the opacity fade so the movement is the primary effect.
      tl.to('.split-our', { x: -2000, duration: 0.8, ease: "power2.in" }, 0);
      tl.to('.split-services', { x: 2000, duration: 0.8, ease: "power2.in" }, 0);
      tl.to('.split-our', { opacity: 0, duration: 0.2 }, 0.6);
      tl.to('.split-services', { opacity: 0, duration: 0.2 }, 0.6);
      tl.to('.services-hero-intro-inner', { opacity: 0, duration: 0.2 }, 0.6);

      // ==========================================
      // CHAPTER 1: Frames 1 -> 300 (Services 1-6)
      // ==========================================

      // VIDEO TIMELINE PART 1 (Frames 1 -> 149)
      // 149 frames at 12.5 frames/unit = 11.92 units
      tl.addLabel("chap1_vid", 0);
      tl.to(scrollObj, { frame: 149, ease: "none", duration: 11.92, onUpdate: () => render() }, "chap1_vid");

      // BLOCK 1 & 2 COMBINED: DTCP (Service 1) & CMDA (Service 2)
      tl.addLabel("txt1", 0.8); // Shifted later
      
      // Enter together
      tl.fromTo('.service-card-dtcp', { opacity: 0, x: -50, y: 50, visibility: 'visible' }, { opacity: 1, x: 0, y: 0, duration: 0.5, ease: "power2.out" }, "txt1");
      tl.fromTo('.service-card-cmda', { opacity: 0, x: 50, y: 50, visibility: 'visible' }, { opacity: 1, x: 0, y: 0, duration: 0.5, ease: "power2.out" }, "txt1");
      
      // Exit together (MUCH SOONER)
      tl.to('.service-card-dtcp', { opacity: 0, y: -100, duration: 0.4, ease: "power2.in" }, "txt1+=0.8");
      tl.to('.service-card-cmda', { opacity: 0, y: -100, duration: 0.4, ease: "power2.in" }, "txt1+=0.8");
      
      // Hide together
      tl.set(['.service-card-dtcp', '.service-card-cmda'], { visibility: 'hidden' });

      // BLOCK 2A: LPA (Service 3)
      tl.addLabel("txt2", 6.0); // Appear at exactly 6 seconds from the start
      tl.fromTo('.layout-lpa', { opacity: 0, y: -150, visibility: 'visible' }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "txt2");
      tl.to('.layout-lpa', { y: 100, duration: 2.0, ease: "none" }, "txt2+=0.5");
      tl.to('.layout-lpa', { opacity: 0, y: 250, duration: 0.5, ease: "power2.in" }, "txt2+=2.5");
      tl.set('.layout-lpa', { visibility: 'hidden' });

      // BLOCK 2B: RERA (Service 4)
      tl.addLabel("txt2b", 6.0); // Appear at exactly 6 seconds from the start
      tl.fromTo('.layout-rera', { opacity: 0, y: 150, visibility: 'visible' }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "txt2b");
      tl.to('.layout-rera', { y: -100, duration: 2.0, ease: "none" }, "txt2b+=0.5");
      tl.to('.layout-rera', { opacity: 0, y: -250, duration: 0.5, ease: "power2.in" }, "txt2b+=2.5");
      tl.set('.layout-rera', { visibility: 'hidden' });


      // BLOCK 4: LAND USE (Service 6)
      tl.addLabel("txt4", 10.0); // Sequenced late, giving a huge gap after Services 3 & 4
      tl.fromTo('.layout-landuse', { opacity: 0, y: -150, visibility: 'visible' }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "txt4");
      tl.to('.layout-landuse', { y: 100, duration: 1.0, ease: "none" }, "txt4+=0.5");
      tl.to('.layout-landuse', { opacity: 0, y: 250, duration: 0.42, ease: "power2.in" }, "txt4+=1.5");
      tl.set('.layout-landuse', { visibility: 'hidden' });

      // Spacer to reach the end of Frame 149 precisely
      tl.to({}, { duration: 0 }, "txt4+=1.92");

      // ==========================================
      // CHAPTER 2: DIRECT JUMP TO FRAME 150
      // ==========================================
      tl.addLabel("chap2_vid1", "chap1_vid+=11.92");
      tl.set(scrollObj, { frame: 150, onUpdate: () => render() }, "chap2_vid1");
      
      // VIDEO TIMELINE PART 2 (Frames 150 -> 300)
      // 150 frames at 12.5 frames/unit = 12.0 units
      tl.to(scrollObj, { frame: frameCount, ease: "none", duration: 12.0, onUpdate: () => render() }, "chap2_vid1");


      // SERVICE 11: PWD
      tl.addLabel("txt11", "chap2_vid1+=0.5"); // Short natural gap after Service 6 ends
      tl.fromTo('.layout-pwd', { opacity: 0, x: -200, visibility: 'visible' }, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, "txt11");
      tl.to('.layout-pwd', { x: 100, duration: 1.5, ease: "none" }, "txt11+=0.5");
      tl.to('.layout-pwd', { opacity: 0, x: 300, duration: 0.5, ease: "power2.in" }, "txt11+=2.0");
      tl.set('.layout-pwd', { visibility: 'hidden' });

      // SERVICE 12: WETLAND 
      tl.addLabel("txt12", "chap2_vid1+=3.5"); // Short natural gap after Service 11 ends
      tl.fromTo('.layout-wetland', { opacity: 0, x: 200, visibility: 'visible' }, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, "txt12");
      tl.to('.layout-wetland', { x: -50, duration: 1.5, ease: "none" }, "txt12+=0.5"); // Small left float
      tl.to('.layout-wetland', { opacity: 0, visibility: 'hidden', duration: 0.01 }, "txt12+=2.0"); // Instantly hide right after float

      // SERVICE 5: LAND DEV
      tl.addLabel("txt5", "chap2_vid1+=6.0"); // Slightly earlier appearance
      tl.fromTo('.layout-landdev', { opacity: 0, y: 150, visibility: 'visible' }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "txt5");
      tl.to('.layout-landdev', { y: -50, duration: 1.0, ease: "none" }, "txt5+=0.5"); // Float adjusted to maintain exact disappearance time
      tl.to('.layout-landdev', { opacity: 0, visibility: 'hidden', duration: 0.01 }, "txt5+=1.5"); // Instantly hide immediately after

      // SERVICE 7: INDUSTRIAL
      tl.addLabel("txt7", "chap2_vid1+=7.5"); // Immediately after Service 5 disappears
      tl.fromTo('.layout-industrial', { opacity: 0, x: -100, y: 100, visibility: 'visible' }, { opacity: 1, x: 0, y: 0, duration: 0.5, ease: "power2.out" }, "txt7");
      tl.to('.layout-industrial', { x: 100, y: -100, duration: 0.5, ease: "none" }, "txt7+=0.5"); // VERY short display
      tl.to('.layout-industrial', { opacity: 0, visibility: 'hidden', duration: 0.01 }, "txt7+=1.0"); // Instantly hide immediately after

      // SERVICE 8: TNPCB
      tl.addLabel("txt8", "chap2_vid1+=8.5"); // Immediately after Service 7 ends
      tl.fromTo('.layout-tnpcb', { opacity: 0, scaleX: 0, visibility: 'visible' }, { opacity: 1, scaleX: 1, duration: 0.5, ease: "power2.out" }, "txt8");
      tl.to({}, { duration: 0.5 }, "txt8+=0.5"); // VERY short display moment
      tl.to('.layout-tnpcb', { opacity: 0, scale: 0.9, duration: 0.15, ease: "power2.inOut" }, "txt8+=1.0"); // Clean, fast, intentional exit
      tl.set('.layout-tnpcb', { visibility: 'hidden' }, "txt8+=1.15");

      // SERVICE 9 & 10: FIRE NOC & DISH (Appearing Together INSTANTLY)
      // Trigger exactly after the clean exit of Service 8
      tl.addLabel("txt9_10", "txt8+=1.15"); 
      
      // INSTANT STATE CHANGE: Blur the background and show 9 & 10 instantly with zero delay
      tl.set('.global-blur-overlay', { visibility: 'visible', opacity: 1 }, "txt9_10");
      tl.set('.layout-fire, .layout-dish', { visibility: 'visible', opacity: 1, y: 0 }, "txt9_10");

      // Continuous float
      tl.to('.layout-fire, .layout-dish', { y: -10, duration: 0.85, ease: "none" }, "txt9_10");
      
      // INSTANT HIDE (No fade-out, no exit delay - matching Service 8's exact instant exit transition)
      tl.to('.global-blur-overlay', { visibility: 'hidden', opacity: 0, duration: 0.01 }, "txt9_10+=0.85");
      tl.to('.layout-fire, .layout-dish', { visibility: 'hidden', opacity: 0, duration: 0.01 }, "txt9_10+=0.85");

      // FINAL HERO STATE
      // Video reaches final frame at chap2_vid1+=12.0
      tl.addLabel("final_state", "chap2_vid1+=12.0");
      tl.to('.final-blur-overlay', { visibility: 'visible', opacity: 1, duration: 1.0, ease: "power2.inOut" }, "final_state");
      tl.fromTo('.layout-final', { opacity: 0, y: 30, visibility: 'visible' }, { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, "final_state+=0.3");
      tl.to({}, { duration: 0.1 }, "final_state+=1.3"); // Hold removed so scroll smoothly hands off to the next section

    }, containerRef);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen font-body text-white selection:bg-brand-gold selection:text-brand-navy">
      
      {/* 1. CINEMATIC HERO SECTION (Pinned) */}
      <section ref={containerRef} className="relative w-full h-[100vh] bg-black overflow-hidden flex flex-col justify-center border-b border-white/5">
        
        {/* Canvas Video Background */}
        <div className="hero-canvas-wrapper absolute inset-0 w-full h-full overflow-hidden transition-all duration-300">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block object-cover" />
        </div>
        
        {/* Cinematic Dark Overlay - Dynamic via GSAP */}
        <div className="hero-dark-overlay absolute inset-0 bg-black/30 pointer-events-none z-10" style={{ opacity: 0.2 }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_75%_at_50%_50%,rgba(0,0,0,0.15)_0%,transparent_100%)] pointer-events-none z-10" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-10 mix-blend-overlay pointer-events-none z-10" />

        {/* Initial Hero Content (Fades out on scroll) */}
        <div className="services-hero-intro relative z-20 w-full h-full flex flex-col items-center justify-center pointer-events-none px-6">
          <div className="relative services-hero-intro-inner">
            {/* Extremely subtle localized dark gradient for readability */}
            <div className="absolute inset-0 bg-black/40 blur-[100px] rounded-[100%] scale-[2] z-0" />
            <h1 className="relative z-10 font-display text-white text-5xl md:text-8xl lg:text-[9rem] font-black uppercase tracking-[0.15em] leading-none drop-shadow-2xl text-center flex flex-col items-center">
              <span className="split-our inline-block">OUR</span>
              <span className="split-services inline-block mt-2">SERVICES</span>
            </h1>
          </div>
        </div>

        {/* NEW UNIQUE 10-SERVICE CINEMATIC LAYOUTS */}
        <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
          
          {/* Global Blur Overlay for Services 9 & 10 */}
          <div className="global-blur-overlay absolute inset-0 backdrop-blur-md bg-black/30 pointer-events-none" style={{ visibility: 'hidden', opacity: 0 }} />
          
          {/* Scroll A: DTCP + CMDA (Existing Lightweight Panel Design) */}
          <div className="card-pair-1 absolute inset-0 flex flex-col md:flex-row items-center justify-center md:justify-between px-4 md:px-12 lg:px-24 xl:px-32 gap-8 md:gap-16">
            <div className="service-card-dtcp text-left w-full max-w-[460px] p-6 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10" style={{ visibility: 'hidden', opacity: 0 }}>
              <div className="font-mono text-brand-gold/80 text-base font-semibold tracking-wider mb-2">{serviceText.s1.num}</div>
              <h2 className="text-2xl text-white font-display font-bold uppercase tracking-wide mb-2 drop-shadow-md">{serviceText.s1.title}</h2>
              <p className="font-sans text-white/90 text-sm font-light drop-shadow-sm">{serviceText.s1.desc}</p>
            </div>
            <div className="service-card-cmda text-left w-full max-w-[460px] p-6 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10" style={{ visibility: 'hidden', opacity: 0 }}>
              <div className="font-mono text-brand-gold/80 text-base font-semibold tracking-wider mb-2">{serviceText.s2.num}</div>
              <h2 className="text-2xl text-white font-display font-bold uppercase tracking-wide mb-2 drop-shadow-md">{serviceText.s2.title}</h2>
              <p className="font-sans text-white/90 text-sm font-light drop-shadow-sm">{serviceText.s2.desc}</p>
            </div>
          </div>

          {/* Scroll B: LPA (Top -> Bottom) */}
          <div className="layout-lpa absolute inset-x-0 top-[15%] flex flex-col items-center text-center" style={{ visibility: 'hidden', opacity: 0 }}>
            <span className="text-brand-gold/80 font-mono tracking-widest text-lg mb-4">{serviceText.s3.num}</span>
            <h2 className="font-display font-black text-5xl md:text-7xl text-white drop-shadow-2xl uppercase tracking-wide w-full max-w-4xl leading-none">{serviceText.s3.title}</h2>
          </div>

          {/* Scroll C: RERA (Bottom -> Top) */}
          <div className="layout-rera absolute inset-x-0 bottom-[15%] flex flex-col items-center text-center" style={{ visibility: 'hidden', opacity: 0 }}>
            <h2 className="font-display font-black text-5xl md:text-7xl text-white drop-shadow-2xl uppercase tracking-wide w-full max-w-4xl leading-none mb-4">{serviceText.s4.title}</h2>
            <span className="text-brand-gold/80 font-mono tracking-widest text-lg">{serviceText.s4.num}</span>
          </div>

          {/* Scroll D: LAND DEV (Bottom -> Top) */}
          <div className="layout-landdev absolute inset-x-12 bottom-[15%] flex flex-col" style={{ visibility: 'hidden', opacity: 0 }}>
            <div className="flex items-end gap-8">
              <span className="font-display text-7xl md:text-9xl font-black text-white/20 leading-none">{serviceText.s5.num}</span>
              <h2 className="font-display font-black text-4xl md:text-6xl text-white drop-shadow-xl uppercase w-full max-w-3xl leading-[1.1] mb-2">{serviceText.s5.title}</h2>
            </div>
            <div className="h-[2px] w-full max-w-4xl bg-gradient-to-r from-brand-gold to-transparent mt-4" />
          </div>

          {/* Scroll E: LAND USE (Vertical Editorial) */}
          <div className="layout-landuse absolute inset-y-0 left-12 flex items-center" style={{ visibility: 'hidden', opacity: 0 }}>
            <h2 className="font-display font-black text-5xl md:text-[4.5rem] text-white/90 leading-[0.85] uppercase max-w-lg break-words drop-shadow-2xl">
              {serviceText.s6.title.split(' ').map((word, i) => <div key={i}>{word}</div>)}
            </h2>
            <div className="ml-8 font-mono text-brand-gold tracking-widest text-2xl" style={{ writingMode: 'vertical-rl' }}>{serviceText.s6.num}</div>
          </div>

          {/* INTERMISSION: REMOVED */}


          {/* Scroll F: INDUSTRIAL (Diagonal) */}
          <div className="layout-industrial absolute top-[20%] left-[10%] flex flex-col max-w-4xl" style={{ visibility: 'hidden', opacity: 0 }}>
             <h2 className="font-display font-black text-5xl md:text-7xl text-white drop-shadow-2xl uppercase italic tracking-wider leading-[1]">{serviceText.s7.title}</h2>
             <span className="text-brand-gold/80 font-mono tracking-widest text-2xl mt-4 ml-2">{serviceText.s7.num}</span>
          </div>

          {/* Scroll G: TNPCB (Horizontal Line) */}
          <div className="layout-tnpcb absolute top-1/2 left-0 w-full -translate-y-1/2 flex items-center justify-center gap-8 px-12" style={{ visibility: 'hidden', opacity: 0 }}>
             <div className="flex-grow h-[1px] bg-white/30" />
             <div className="flex flex-col items-center flex-shrink-0 max-w-[70vw] md:max-w-none text-center">
               <span className="text-brand-gold font-mono tracking-[0.2em] mb-2 md:mb-4">{serviceText.s8.num}</span>
               <h2 className="font-display font-bold text-2xl md:text-5xl text-white uppercase tracking-widest text-center whitespace-normal md:whitespace-nowrap drop-shadow-lg leading-tight md:leading-normal">{serviceText.s8.title}</h2>
             </div>
             <div className="flex-grow h-[1px] bg-white/30" />
          </div>

          {/* Scroll H: FIRE NOC & DISH (Sequenced) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-16 px-4 md:px-12 w-full max-w-[1100px]">
              {/* Left Card: Service 9 */}
              <div className="layout-fire flex-1 text-left p-8 md:p-12 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-start" style={{ visibility: 'hidden', opacity: 0 }}>
                <div className="font-mono text-brand-gold/80 text-lg font-semibold tracking-wider mb-4">{serviceText.s9.num}</div>
                <h2 className="text-3xl md:text-4xl text-white font-display font-bold uppercase tracking-wide mb-4 leading-[1.2] drop-shadow-md">{serviceText.s9.title}</h2>
                <p className="font-sans text-white/90 text-sm md:text-base font-light leading-[1.7] drop-shadow-sm">{serviceText.s9.desc}</p>
              </div>
              {/* Right Card: Service 10 */}
              <div className="layout-dish flex-1 text-left p-8 md:p-12 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-start" style={{ visibility: 'hidden', opacity: 0 }}>
                <div className="font-mono text-brand-gold/80 text-lg font-semibold tracking-wider mb-4">{serviceText.s10.num}</div>
                <h2 className="text-3xl md:text-4xl text-white font-display font-bold uppercase tracking-wide mb-4 leading-[1.2] drop-shadow-md">{serviceText.s10.title}</h2>
                <p className="font-sans text-white/90 text-sm md:text-base font-light leading-[1.7] drop-shadow-sm">{serviceText.s10.desc}</p>
              </div>
            </div>
          </div>

          {/* Scroll J: PWD (Left -> Right) */}
          <div className="layout-pwd absolute bottom-[30%] left-12" style={{ visibility: 'hidden', opacity: 0 }}>
            <h2 className="font-display font-black text-6xl md:text-[5.5rem] text-white uppercase tracking-wide border-l-8 border-white/50 pl-6 leading-none max-w-4xl">{serviceText.s11.title}</h2>
            <span className="block font-mono text-brand-gold text-xl mt-6 pl-6 tracking-[0.3em]">{serviceText.s11.num}</span>
          </div>

          {/* Scroll K: WETLAND (FINAL STATE - SERVICE 10 DESIGN) */}
          <div className="layout-wetland absolute top-[30%] right-4 md:right-12 text-right max-w-[90vw] md:max-w-none" style={{ visibility: 'hidden', opacity: 0 }}>
            <span className="block font-mono text-brand-gold text-xl md:text-2xl mb-2 md:mb-4 tracking-widest">{serviceText.s12.num}</span>
            <h2 className="font-display font-black text-4xl md:text-7xl text-white uppercase tracking-wide border-r-4 md:border-r-8 border-brand-gold pr-4 md:pr-6 leading-none md:max-w-3xl ml-auto text-wrap whitespace-normal">{serviceText.s12.title}</h2>
          </div>

          {/* Final Cinematic Blur Overlay */}
          <div className="final-blur-overlay absolute inset-0 backdrop-blur-xl bg-black/40 pointer-events-none z-30" style={{ visibility: 'hidden', opacity: 0 }} />
          
          {/* Final Hero State Content */}
          <div className="layout-final absolute inset-0 flex flex-col items-center justify-center text-center z-40 pointer-events-none px-6" style={{ visibility: 'hidden', opacity: 0 }}>
            <div className="relative">
              <div className="absolute inset-0 bg-black/50 blur-[120px] rounded-[100%] scale-[2.5] z-0" />
              <h2 className="relative z-10 font-display text-white text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-[0.1em] leading-[1.1] drop-shadow-2xl text-center max-w-5xl">
                END-TO-END PROJECT<br/><span className="text-brand-gold mt-2 block">CLEARANCES & APPROVALS</span>
              </h2>
              <div className="relative z-10 h-1 w-24 bg-brand-gold mt-10 mx-auto opacity-80" />
            </div>
          </div>

        </div>

      </section>


      {/* 4. FINAL CLOSING CTA */}
      <CTA />

    </div>
  );
}
