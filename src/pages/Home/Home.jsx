import React from 'react';
import Hero from '../../components/Hero/Hero';
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs';
import IndustriesGridMorphSection from '../../components/IndustriesGridMorphSection/IndustriesGridMorphSection';
import Clients from '../../components/Clients/Clients';
import Testimonials from '../../components/Testimonials/Testimonials';
import Trust from '../../components/Trust/Trust';
import CTA from '../../components/CTA/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <IndustriesGridMorphSection />
      <Clients />
      {/* <Testimonials /> */}
      <Trust />
      <CTA />
    </>
  );
}
