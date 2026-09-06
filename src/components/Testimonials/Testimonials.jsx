import React from 'react';

const testimonialsRow1 = [
  {
    name: "RAJESH KUMAR",
    designation: "Director, KSR Reality",
    text: "Sai Planners delivered exceptional architectural insights that completely transformed our land use strategy. Their attention to detail and deep understanding of zoning regulations is unmatched."
  },
  {
    name: "ANITA DESAI",
    designation: "CEO, Ceebros",
    text: "Working with this team was a seamless experience. They bring a rare combination of creative vision and pragmatic urban planning that moves complex projects forward effortlessly."
  },
  {
    name: "VIKRAM SINGH",
    designation: "Head of Infrastructure, Sical",
    text: "Their master planning capabilities are extraordinary. They managed our large-scale industrial development with precision, ensuring every phase was executed flawlessly on time."
  },
  {
    name: "PRIYA NATARAJAN",
    designation: "Managing Partner, Fomra",
    text: "A truly professional consultancy. From initial concept to final approval, their expertise in architectural design and structural integrity added immense value to our portfolio."
  }
];

const testimonialsRow2 = [
  {
    name: "SURESH REDDY",
    designation: "Founder, Nova Builders",
    text: "We have partnered with Sai Planners on multiple high-rise projects. Their innovative approach to sustainable design and spatial efficiency sets a new benchmark in the industry."
  },
  {
    name: "MEERA KRISHNAN",
    designation: "Operations Head, Narayana Schools",
    text: "The campus layout they designed for us was both highly functional and aesthetically inspiring. Their team understands exactly how to balance institutional requirements with beautiful architecture."
  },
  {
    name: "KARTHIK MENON",
    designation: "Director, Hind Terminals",
    text: "Their expertise in navigating complex land reclassification and regulatory approvals saved us months of delay. Highly recommended for any serious large-scale development."
  },
  {
    name: "DEEPAK SHARMA",
    designation: "Chairman, SR Group",
    text: "Outstanding consultancy. They treat every project as a unique architectural challenge, delivering tailored solutions that perfectly align with our commercial objectives."
  }
];

const MarqueeRow = ({ items, direction = 'left' }) => {
  const isLeft = direction === 'left';
  const animationClass = isLeft ? 'animate-marquee-left' : 'animate-marquee-right';

  return (
    <div className="flex w-full overflow-hidden group py-4">
      <div 
        className={`flex items-center gap-6 md:gap-8 w-max px-3 md:px-4 ${animationClass}`}
      >
        {[...Array(3)].map((_, i) => (
          <React.Fragment key={i}>
            {items.map((testimonial, idx) => (
              <div 
                key={`${i}-${idx}`} 
                className="flex-shrink-0 w-[300px] md:w-[450px] bg-white border border-brand-navy/10 rounded-3xl p-8 md:p-10 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-brand-gold/40 cursor-default relative overflow-hidden"
              >
                {/* Subtle architectural detail */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand-gold/[0.05] to-transparent rounded-tr-3xl pointer-events-none" />
                <div className="absolute top-6 right-8 text-brand-navy/5 font-display text-8xl leading-none select-none pointer-events-none">"</div>
                
                <p className="font-sans text-brand-navy/80 leading-relaxed mb-10 relative z-10 text-sm md:text-[0.95rem] tracking-wide line-clamp-4">
                  {testimonial.text}
                </p>
                
                <div className="flex flex-col relative z-10">
                  <div className="w-8 h-[2px] bg-brand-gold mb-4" />
                  <h4 className="font-display text-2xl md:text-3xl tracking-wide text-brand-navy uppercase leading-none mb-1.5">
                    {testimonial.name}
                  </h4>
                  <span className="font-mono text-[0.65rem] md:text-[0.7rem] tracking-[0.15em] text-brand-navy/50 uppercase">
                    {testimonial.designation}
                  </span>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default function Testimonials() {
  return (
    <section className="py-24 md:py-40 bg-brand-black relative overflow-hidden border-t border-white/5">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{ 
          backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)', 
          backgroundSize: '80px 80px' 
        }} 
      />

      {/* Heading Container */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10 flex flex-col items-center mb-16 md:mb-24 text-center">
        <span className="font-mono text-brand-gold font-bold tracking-[0.2em] uppercase text-sm mb-4">Client Feedback</span>
        <h2 className="font-display font-black text-5xl md:text-7xl lg:text-[5.5rem] text-white tracking-widest uppercase mb-6 leading-[0.9]">
          Testimonials
        </h2>
        <div className="h-[2px] w-16 bg-brand-gold mt-2 opacity-80" />
      </div>

      {/* Marquee Container */}
      <div className="w-full relative z-10 flex flex-col gap-6 md:gap-10">

        
        <MarqueeRow items={testimonialsRow1} direction="left" />
        <MarqueeRow items={testimonialsRow2} direction="right" />
      </div>
    </section>
  );
}
