import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'HOME', href: '/' },
  { name: 'ABOUT', href: '/about' },
  { name: 'SERVICES', href: '/services' },
  { name: 'RESOURCES', href: '/resources' },
  { name: 'CONTACT', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Floating navigation logic
      if (currentScrollY > 100) {
        setIsScrolled(true);
        if (currentScrollY > lastScrollY && !isMobileMenuOpen) {
          setIsHidden(true); // Hide on scroll down
        } else {
          setIsHidden(false); // Show on scroll up
        }
      } else {
        setIsScrolled(false);
        setIsHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out ${
          isScrolled ? 'py-5' : 'py-10'
        }`}
        initial={{ y: '-150%' }}
        animate={{ y: isHidden ? '-150%' : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <div className={`flex items-center justify-between transition-all duration-500 ${
            isScrolled ? 'bg-white/10 backdrop-blur-xl border border-white/10 px-10 py-4 rounded-full shadow-2xl' : 'bg-transparent'
          }`}>
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center relative h-10 md:h-12 lg:h-14 w-[140px] md:w-[180px] lg:w-[220px]">
              <Link to="/" className="absolute bottom-[-16px] lg:bottom-[-24px] left-0 group z-[200]">
                <img 
                  src="/logo/logo.png" 
                  alt="Sai Planners" 
                  className="h-[72px] md:h-[104px] lg:h-32 w-auto object-contain transition-transform duration-300 origin-bottom-left group-hover:scale-[1.05]" 
                />
              </Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center space-x-10 -translate-x-2 lg:-translate-x-6 xl:-translate-x-8">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.href.startsWith('/#') ? (
                    <a
                      href={location.pathname === '/' ? link.href.replace('/', '') : link.href}
                      className={`text-[15px] md:text-base font-medium tracking-[0.15em] transition-colors hover:text-brand-gold ${
                        isScrolled ? 'text-white/80' : 'text-white/80'
                      }`}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className={`text-[15px] md:text-base font-medium tracking-[0.15em] transition-colors hover:text-brand-gold ${
                        isScrolled ? 'text-white/80' : 'text-white/80'
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:block">
              <Link 
                to="/contact" 
                className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold tracking-widest text-brand-navy bg-brand-gold rounded-full transition-colors duration-300 hover:bg-brand-navy hover:text-white"
              >
                GET A CONSULTATION
              </Link>
            </div>

            {/* Mobile Toggle */}
            <div className="lg:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className={`p-2 focus:outline-none ${isScrolled ? 'text-white' : 'text-white'}`}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <div className="mobile-menu-container">
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              className="fixed inset-0 z-[110] bg-brand-navy text-white flex flex-col"
              initial={{ opacity: 0, y: '-100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '-100%' }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="flex justify-between items-center p-6 md:p-12">
                <span className="font-display font-bold text-xl tracking-widest">SAI PLANNERS</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-white">
                  <X size={32} />
                </button>
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-center space-y-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (i * 0.1), duration: 0.5, ease: "easeOut" }}
                  >
                    {link.href.startsWith('/#') ? (
                      <a
                        href={location.pathname === '/' ? link.href.replace('/', '') : link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-3xl md:text-5xl font-display font-light tracking-widest hover:text-brand-gold transition-colors"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-3xl md:text-5xl font-display font-light tracking-widest hover:text-brand-gold transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <Link
                    to="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="mt-8 px-8 py-4 bg-brand-gold text-brand-navy font-semibold tracking-widest rounded-full inline-block transition-colors duration-300 hover:bg-brand-navy hover:text-white"
                  >
                    GET A CONSULTATION
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
