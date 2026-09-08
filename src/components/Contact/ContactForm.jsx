import React, { useState, useRef } from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';

const PROJECT_TYPES = [
  "RESIDENTIAL", "COMMERCIAL", "INDUSTRIAL", "INSTITUTIONAL", 
  "WAREHOUSE", "LOGISTICS", "LAYOUT", "LAND DEVELOPMENT", "OTHER"
];

const SERVICES = [
  "FEASIBILITY STUDY", "MASTER PLANNING", "TECHNICAL COORDINATION", 
  "APPROVAL DRAWINGS", "STATUTORY CLEARANCES"
];

const CONTACT_METHODS = [
  { id: 'phone', label: 'PHONE' },
  { id: 'email', label: 'EMAIL' },
  { id: 'whatsapp', label: 'WHATSAPP' }
];

const FormField = ({ label, type = "text", placeholder, options, value, onChange }) => {
  const inputClasses = "w-full bg-[#FCFCFC] border border-[#0A0A0A]/15 rounded-md py-3.5 px-4 text-[#0A0A0A] font-sans text-base outline-none transition-all placeholder:text-[#0A0A0A]/30 focus:border-brand-navy focus:ring-1 focus:ring-brand-navy/20 focus:bg-white";
  
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-xs font-sans text-[#0A0A0A]/80 font-bold uppercase tracking-wide">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea 
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${inputClasses} resize-none h-32`}
        />
      ) : type === "select" ? (
        <select 
          value={value}
          onChange={onChange}
          className={`${inputClasses} appearance-none cursor-pointer`}
        >
          <option value="" disabled className="text-[#0A0A0A]/30">{placeholder}</option>
          {options && options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : (
        <input 
          type={type} 
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={inputClasses}
        />
      )}
    </div>
  );
};

export default function ContactForm() {
  const containerRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '', company: '', phone: '', email: '', location: '',
    projectType: '', service: '', description: '', contactMethod: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div ref={containerRef}>
      <section className="relative w-full bg-[#F9F9F8] text-brand-navy py-24 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
      
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
        <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(5,5,5,1) 1px, transparent 1px), linear-gradient(90deg, rgba(5,5,5,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-20 relative z-10 items-start">
        
        {/* LEFT: Info */}
        <div className="w-full lg:w-[calc(38%-2rem)] xl:w-[calc(38%-2.5rem)] flex flex-col relative">
          <div className="lg:sticky lg:top-32">
            <span className="typo-eyebrow text-brand-gold mb-4 block tracking-[0.2em] font-semibold">GET IN TOUCH</span>
            <h2 className="font-display font-bold text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] tracking-tight leading-[1.05] mb-6">
              TELL US <br/> WHAT YOU'RE <br/> <span className="text-brand-gold italic font-normal">BUILDING.</span>
            </h2>
            <p className="typo-body text-brand-navy/80 text-lg md:text-xl font-light mb-10 leading-relaxed max-w-md">
              Every project begins with understanding the site, the development intent and the approval pathway. Let's discuss your next big development.
            </p>

            <div className="space-y-8 border-t border-brand-navy/10 pt-10">
              <div className="flex items-start gap-6 group">
                <span className="font-mono text-sm text-brand-gold pt-1">01</span>
                <div>
                  <h5 className="font-mono text-[10px] tracking-widest text-brand-navy/50 uppercase mb-2 group-hover:text-brand-navy transition-colors">Expert Consultation</h5>
                  <p className="font-body text-brand-navy text-base leading-[1.6] font-light">
                    Our team brings decades of experience navigating complex statutory regulations and urban planning challenges.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <span className="font-mono text-sm text-brand-gold pt-1">02</span>
                <div>
                  <h5 className="font-mono text-[10px] tracking-widest text-brand-navy/50 uppercase mb-2 group-hover:text-brand-navy transition-colors">Seamless Execution</h5>
                  <p className="font-body text-brand-navy text-base leading-[1.6] font-light">
                    From feasibility studies to master planning and statutory clearances, we handle it all with precision.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Form Architecture (White Card like Career) */}
        <div className="w-full lg:w-[calc(62%-2rem)] xl:w-[calc(62%-2.5rem)] pt-12 lg:pt-0">
          <div className="bg-white rounded-2xl shadow-xl border border-[#0A0A0A]/10 p-8 md:p-12 w-full relative">
            
            <div className="mb-10">
              <h3 className="font-display font-bold text-3xl md:text-4xl text-[#0A0A0A] leading-tight mb-3 uppercase tracking-wide">
                Project Inquiry
              </h3>
              <p className="font-sans text-[#0A0A0A]/60 text-base">
                Fill out the fields below and we'll get back to you shortly.
              </p>
            </div>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Full Name" placeholder="John Doe" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} />
                <FormField label="Company / Organization" placeholder="Company Name" value={formData.company} onChange={(e) => handleChange('company', e.target.value)} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Phone Number" type="tel" placeholder="+91 90000 00000" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} />
                <FormField label="Email Address" type="email" placeholder="john@example.com" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />
              </div>

              <div className="grid grid-cols-1 gap-6">
                <FormField label="Project Location" placeholder="City, Region, or specific address..." value={formData.location} onChange={(e) => handleChange('location', e.target.value)} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Project Type" type="select" placeholder="Select Project Type" options={PROJECT_TYPES} value={formData.projectType} onChange={(e) => handleChange('projectType', e.target.value)} />
                <FormField label="Service Required" type="select" placeholder="Select Service" options={SERVICES} value={formData.service} onChange={(e) => handleChange('service', e.target.value)} />
              </div>

              <div className="grid grid-cols-1 gap-6">
                <FormField label="Preferred Contact Method" type="select" placeholder="Select Contact Method" options={CONTACT_METHODS.map(m => m.label)} value={formData.contactMethod} onChange={(e) => handleChange('contactMethod', e.target.value)} />
              </div>
              
              <div>
                <FormField label="Brief Project Description" type="textarea" placeholder="Tell us briefly about your project, site and what you need help with..." value={formData.description} onChange={(e) => handleChange('description', e.target.value)} />
              </div>

              <div className="pt-6">
                <button className="w-full bg-brand-navy text-white font-sans font-bold tracking-widest uppercase py-4 px-8 rounded-md transition-all duration-300 hover:bg-brand-gold hover:text-brand-navy shadow-md">
                  Submit Inquiry
                </button>
              </div>
              
            </form>
          </div>
        </div>

      </div>
    </section>
    </div>
  );
}
