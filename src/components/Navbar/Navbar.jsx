import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';
import logo from '../../assets/Virex_logo.png';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const ctaRef = useRef(null);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    // Initial animation
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(
      logoRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }
    )
      .fromTo(
        linksRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.7)' },
        '-=0.2'
      );

    // Scroll handler
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className={`navbar ${isScrolled ? 'navbar--scrolled' : ''} ${isMobileMenuOpen ? 'navbar--mobile-open' : ''}`}
    >
      <div className="navbar__container container">
        <a href="#home" className="navbar__logo" ref={logoRef}>
          <img src={logo} alt="Virex" className="navbar__logo-img" />
          <span className="navbar__logo-text">VIREX</span>
        </a>

        <div className={`navbar__links ${isMobileMenuOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              className="navbar__link"
              ref={(el) => (linksRef.current[index] = el)}
              onClick={closeMobileMenu}
            >
              <span className="navbar__link-text">{link.name}</span>
              <span className="navbar__link-indicator"></span>
            </a>
          ))}
        </div>

        <div className="navbar__actions">
          <a href="https://wa.me/970595114517" target="_blank" rel="noopener noreferrer" className="btn btn-primary navbar__cta" ref={ctaRef}>
            Get Started
          </a>

          <button
            className="navbar__mobile-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
