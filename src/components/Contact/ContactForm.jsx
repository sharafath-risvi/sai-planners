import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PROJECT_TYPES = [
  "RESIDENTIAL", "COMMERCIAL", "INDUSTRIAL", "INSTITUTIONAL", 
  "WAREHOUSE", "LOGISTICS", "LAYOUT", "LAND DEVELOPMENT", "OTHER"
];

const SERVICES = [
  "FEASIBILITY STUDY", "MASTER PLANNING", "TECHNICAL COORDINATION", 
  "APPROVAL DRAWINGS", "STATUTORY CLEARANCES"
];

const CONTACT_METHODS = [
  { id: 'phone', label: 'PHONE', icon: Phone },
  { id: 'email', label: 'EMAIL', icon: Mail },
  { id: 'whatsapp', label: 'WHATSAPP', icon: MessageCircle }
];

export default function ContactForm() {
  const containerRef = useRef(null);
  
  // Form State
  const [activeGroup, setActiveGroup] = useState(1);
  const [formData, setFormData] = useState({
    name: '', company: '', phone: '', email: '', location: '',
    projectType: '', service: '', description: '', contactMethod: ''
  });

  // Track scroll position to update active group indicator
  useEffect(() => {
    let ctx = gsap.context(() => {
      
      const groups = gsap.utils.toArray('.form-group-section');
      
      groups.forEach((group, index) => {
        ScrollTrigger.create({
          trigger: group,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveGroup(index + 1),
          onEnterBack: () => setActiveGroup(index + 1),
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div ref={containerRef}>
      <section className="relative w-full bg-white text-brand-navy py-32 px-6 md:px-12 lg:px-20">
      
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(#282D7F 1px, transparent 1px), linear-gradient(90deg, #282D7F 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 relative z-10">
        
        {/* LEFT: Sticky Header & Progress */}
        <div className="w-full lg:w-1/3 flex flex-col relative">
          <div className="lg:sticky lg:top-32">
            <h2 className="font-display font-semibold text-5xl md:text-6xl tracking-tight leading-none mb-6">
              TELL US<br/>WHAT YOU'RE<br/>BUILDING.
            </h2>
            <p className="font-body text-brand-navy/70 text-lg mb-16 max-w-sm">
              Every project begins with understanding the site, the development intent and the approval pathway.
            </p>

            {/* Progress Indicator */}
            <div className="hidden lg:flex flex-col gap-8 border-l border-brand-navy/10 pl-6">
              {[
                { num: 1, label: "PERSONAL DETAILS" },
                { num: 2, label: "PROJECT DETAILS" },
                { num: 3, label: "REQUIREMENTS" },
                { num: 4, label: "CONTACT PREFERENCE" }
              ].map((step) => (
                <div key={step.num} className={`flex items-center gap-4 transition-all duration-500 ${activeGroup === step.num ? 'opacity-100' : 'opacity-30'}`}>
                  <span className={`font-mono text-xs font-bold ${activeGroup === step.num ? 'text-brand-gold' : 'text-brand-navy'}`}>
                    0{step.num}
                  </span>
                  <div className={`w-12 h-[1px] ${activeGroup === step.num ? 'bg-brand-gold' : 'bg-brand-navy'}`} />
                  <span className="font-mono text-xs tracking-widest uppercase">
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Form Architecture */}
        <div className="w-full lg:w-2/3 flex flex-col gap-24">
          
          {/* GROUP 01 */}
          <div className="form-group-section flex flex-col gap-12">
            <div className="lg:hidden font-mono text-xs text-brand-gold font-bold tracking-widest border-b border-brand-gold/30 pb-2">
              01 — PERSONAL DETAILS
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <InputField label="01 — NAME" value={formData.name} onChange={(v) => handleChange('name', v)} />
              <InputField label="02 — COMPANY / ORGANIZATION" value={formData.company} onChange={(v) => handleChange('company', v)} />
              <InputField label="03 — PHONE NUMBER" type="tel" value={formData.phone} onChange={(v) => handleChange('phone', v)} />
              <InputField label="04 — EMAIL ADDRESS" type="email" value={formData.email} onChange={(v) => handleChange('email', v)} />
            </div>
          </div>

          {/* GROUP 02 */}
          <div className="form-group-section flex flex-col gap-12">
            <div className="lg:hidden font-mono text-xs text-brand-gold font-bold tracking-widest border-b border-brand-gold/30 pb-2">
              02 — PROJECT DETAILS
            </div>

            <InputField label="05 — PROJECT LOCATION" placeholder="City, Region, or specific address..." value={formData.location} onChange={(v) => handleChange('location', v)} />

            <div className="flex flex-col gap-6">
              <label className="font-mono text-xs font-bold tracking-widest text-brand-navy/60">06 — PROJECT TYPE</label>
              <div className="flex flex-wrap gap-3">
                {PROJECT_TYPES.map(type => (
                  <button
                    key={type}
                    onClick={() => handleChange('projectType', type)}
                    className={`font-mono text-xs tracking-widest px-6 py-3 border transition-all duration-300 rounded-full ${
                      formData.projectType === type 
                        ? 'border-brand-gold bg-brand-gold/10 text-brand-navy shadow-[0_0_15px_rgba(252,174,22,0.2)]' 
                        : 'border-brand-navy/20 hover:border-brand-navy/50 text-brand-navy/70'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* GROUP 03 */}
          <div className="form-group-section flex flex-col gap-12">
            <div className="lg:hidden font-mono text-xs text-brand-gold font-bold tracking-widest border-b border-brand-gold/30 pb-2">
              03 — REQUIREMENTS
            </div>

            <div className="flex flex-col gap-6">
              <label className="font-mono text-xs font-bold tracking-widest text-brand-navy/60">07 — SERVICE REQUIRED</label>
              <div className="flex flex-wrap gap-3">
                {SERVICES.map(service => (
                  <button
                    key={service}
                    onClick={() => handleChange('service', service)}
                    className={`font-mono text-xs tracking-widest px-6 py-3 border transition-all duration-300 rounded-full ${
                      formData.service === service 
                        ? 'border-brand-gold bg-brand-gold/10 text-brand-navy shadow-[0_0_15px_rgba(252,174,22,0.2)]' 
                        : 'border-brand-navy/20 hover:border-brand-navy/50 text-brand-navy/70'
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6 relative group">
              <label className="font-mono text-xs font-bold tracking-widest text-brand-navy/60 transition-colors group-focus-within:text-brand-gold">08 — BRIEF PROJECT DESCRIPTION</label>
              <textarea 
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Tell us briefly about your project, site and what you need help with..."
                className="w-full bg-transparent border border-brand-navy/20 p-6 min-h-[200px] font-body text-brand-navy text-lg outline-none resize-none transition-all duration-300 focus:border-brand-gold focus:bg-brand-gold/5"
              />
            </div>
          </div>

          {/* GROUP 04 */}
          <div className="form-group-section flex flex-col gap-12">
            <div className="lg:hidden font-mono text-xs text-brand-gold font-bold tracking-widest border-b border-brand-gold/30 pb-2">
              04 — CONTACT PREFERENCE
            </div>

            <div className="flex flex-col gap-6">
              <label className="font-mono text-xs font-bold tracking-widest text-brand-navy/60">09 — PREFERRED CONTACT METHOD</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {CONTACT_METHODS.map(method => (
                  <button
                    key={method.id}
                    onClick={() => handleChange('contactMethod', method.id)}
                    className={`flex items-center justify-center gap-3 font-mono text-xs tracking-widest py-4 border transition-all duration-300 rounded-sm ${
                      formData.contactMethod === method.id 
                        ? 'border-brand-gold bg-brand-gold/10 text-brand-navy' 
                        : 'border-brand-navy/20 hover:border-brand-navy/50 text-brand-navy/70'
                    }`}
                  >
                    <method.icon size={16} className={formData.contactMethod === method.id ? 'text-brand-gold' : ''} />
                    {method.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
    </div>
  );
}

// Reusable Input Component with Architectural styling
function InputField({ label, type = "text", placeholder = "", value, onChange }) {
  return (
    <div className="relative flex flex-col justify-end h-[60px] group">
      <label className="absolute left-0 transition-all duration-300 font-mono text-xs font-bold tracking-widest pointer-events-none
        peer-focus:-translate-y-8 peer-focus:text-brand-gold
        peer-valid:-translate-y-8 peer-valid:text-brand-navy/40
        text-brand-navy/60 top-4"
      >
        {label}
      </label>
      <input 
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="peer w-full bg-transparent border-b border-brand-navy/20 py-2 font-body text-brand-navy text-lg outline-none transition-all duration-300 focus:border-brand-gold placeholder:text-transparent focus:placeholder:text-brand-navy/20"
      />
      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-gold transition-all duration-500 ease-out peer-focus:w-full" />
    </div>
  );
}
