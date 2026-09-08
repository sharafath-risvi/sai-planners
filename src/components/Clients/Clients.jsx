import React from 'react';

const clientData = [
  { img: '/client/ceebros.png', name: 'CEEBROS', num: '01' },
  { img: '/client/fomra.jpeg', name: 'FOMRA', num: '02' },
  { img: '/client/hind_terminals.JPG', name: 'HIND TERMINALS', num: '03' },
  { img: '/client/ksr_reality.jpeg', name: 'KSR REALITY', num: '04' },
  { img: '/client/ls_automative.jpg', name: 'LS AUTOMOTIVE', num: '05' },
  { img: '/client/mbm.JPG', name: 'MBM', num: '06' },
  { img: '/client/nadi.JPG', name: 'NADI', num: '07' },
  { img: '/client/narayana_schools.JPG', name: 'NARAYANA SCHOOLS', num: '08' },
  { img: '/client/nova.png', name: 'NOVA', num: '09' },
  { img: '/client/polyfit.JPG', name: 'POLYFIT', num: '10' },
  { img: '/client/sical.jpeg', name: 'SICAL', num: '11' },
  { img: '/client/sr.JPG', name: 'SR', num: '12' },
  { img: '/client/sri_krish.JPG', name: 'SRI KRISHNA', num: '13' },
  { img: '/client/ster.JPG', name: 'STER', num: '14' },
  { img: '/client/traditional_excellencs.JPG', name: 'TRADITIONAL EXCELLENCE', num: '15' }
];

export default function Clients() {
  const row1 = clientData.slice(0, 8);
  const row2 = clientData.slice(8);

  const MarqueeRow = ({ items, reverse }) => {
    // Duplicate the items array to create a seamless infinite loop
    const duplicatedItems = [...items, ...items];
    return (
      <div className="flex w-full overflow-hidden relative">
        <div 
          className="flex items-center gap-6 md:gap-10 pr-6 md:pr-10 w-max"
          style={{ 
            animation: reverse ? 'marqueeRight 40s linear infinite' : 'marqueeLeft 40s linear infinite'
          }}
        >
          {duplicatedItems.map((item, idx) => (
            <div 
              key={idx} 
              className="w-40 h-28 md:w-56 md:h-36 bg-white border border-brand-navy/5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] rounded-[12px] flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] cursor-default overflow-hidden"
            >
              <img src={item.img} alt={item.name} className="w-[80%] h-[80%] object-contain" />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="py-24 md:py-32 bg-[#FBFBFA] relative overflow-hidden border-t border-b border-brand-navy/5">
      <style>
        {`
          @keyframes marqueeLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marqueeRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}
      </style>
      
      {/* Subtle Architectural Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]" 
        style={{ 
          backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)', 
          backgroundSize: '80px 80px' 
        }} 
      />
      
      <div className="w-full relative z-10 flex flex-col items-center">
        
        {/* HEADING (Untouched) */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24 px-6">
          <span className="font-mono text-brand-gold font-bold tracking-[0.2em] uppercase text-sm mb-4">Our Clients</span>
          <h2 className="font-display font-black text-5xl md:text-7xl lg:text-[5.5rem] text-brand-navy tracking-widest uppercase mb-6 leading-[0.9]">
            Trusted by Projects<br/>That Move Forward
          </h2>
          <div className="h-[2px] w-16 bg-brand-gold mt-2 opacity-80" />
        </div>

        {/* AUTOMATIC MARQUEE CONTAINER */}
        <div className="w-full flex flex-col gap-12 md:gap-24 mt-4 md:mt-8">
          <MarqueeRow items={row1} reverse={false} />
          <MarqueeRow items={row2} reverse={true} />
        </div>

      </div>
    </section>
  );
}
