import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { Home, Sparkles, Lightbulb, Zap, Palette, Mail, ArrowRight } from 'lucide-react';
import logo from '../../assets/Virex_logo.png';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const ctaRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileLinksRef = useRef([]);
  const mobileCTARef = useRef(null);
  const hamburgerRef = useRef(null);
  const orbitingIconsRef = useRef([]);
  const menuTimelineRef = useRef(null);

  const navLinks = [
    { name: 'Home', href: '#home', Icon: Home },
    { name: 'Features', href: '#features', Icon: Sparkles },
    { name: 'About', href: '#about', Icon: Lightbulb },
    { name: 'Services', href: '#services', Icon: Zap },
    { name: 'Portfolio', href: '#portfolio', Icon: Palette },
    { name: 'Contact', href: '#contact', Icon: Mail },
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

  const openMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(true);
    document.body.style.overflow = 'hidden';

    // Kill any existing timeline
    if (menuTimelineRef.current) {
      menuTimelineRef.current.kill();
    }

    const tl = gsap.timeline();
    menuTimelineRef.current = tl;

    // Animate hamburger to X
    const bars = hamburgerRef.current?.querySelectorAll('.hamburger__bar');
    if (bars) {
      tl.to(bars[0], { rotate: 45, y: 8, duration: 0.3, ease: 'power2.inOut' }, 0)
        .to(bars[1], { opacity: 0, scaleX: 0, duration: 0.2, ease: 'power2.inOut' }, 0)
        .to(bars[2], { rotate: -45, y: -8, duration: 0.3, ease: 'power2.inOut' }, 0);
    }

    // Animate menu overlay
    tl.fromTo(
      mobileMenuRef.current,
      { clipPath: 'circle(0% at calc(100% - 40px) 40px)' },
      {
        clipPath: 'circle(150% at calc(100% - 40px) 40px)',
        duration: 0.8,
        ease: 'power3.inOut'
      },
      0
    );

    // Animate floating icons
    tl.fromTo(
      orbitingIconsRef.current,
      { scale: 0, opacity: 0, rotation: -180 },
      {
        scale: 1,
        opacity: 0.15,
        rotation: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(2)'
      },
      0.3
    );

    // Animate links with stagger
    tl.fromTo(
      mobileLinksRef.current,
      { x: -80, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out'
      },
      0.4
    );

    // Animate CTA button
    tl.fromTo(
      mobileCTARef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' },
      0.7
    );
  }, []);

  const closeMobileMenu = useCallback(() => {
    // Kill any existing timeline
    if (menuTimelineRef.current) {
      menuTimelineRef.current.kill();
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = 'auto';
      }
    });
    menuTimelineRef.current = tl;

    // Animate hamburger back
    const bars = hamburgerRef.current?.querySelectorAll('.hamburger__bar');
    if (bars) {
      tl.to(bars[0], { rotate: 0, y: 0, duration: 0.3, ease: 'power2.inOut' }, 0)
        .to(bars[1], { opacity: 1, scaleX: 1, duration: 0.2, ease: 'power2.inOut' }, 0.1)
        .to(bars[2], { rotate: 0, y: 0, duration: 0.3, ease: 'power2.inOut' }, 0);
    }

    // Animate elements out
    tl.to(
      mobileCTARef.current,
      { y: 30, opacity: 0, duration: 0.3, ease: 'power2.in' },
      0
    );

    tl.to(
      mobileLinksRef.current,
      { x: 50, opacity: 0, duration: 0.3, stagger: 0.03, ease: 'power2.in' },
      0
    );

    tl.to(
      orbitingIconsRef.current,
      { scale: 0, opacity: 0, rotation: 180, duration: 0.3, stagger: 0.02, ease: 'power2.in' },
      0.1
    );

    // Close menu overlay
    tl.to(
      mobileMenuRef.current,
      {
        clipPath: 'circle(0% at calc(100% - 40px) 40px)',
        duration: 0.5,
        ease: 'power3.inOut'
      },
      0.2
    );
  }, []);

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  const handleLinkClick = () => {
    closeMobileMenu();
  };

  // Handle link hover animation
  const handleLinkHover = (index, isEnter) => {
    const link = mobileLinksRef.current[index];
    if (!link) return;

    const icon = link.querySelector('.mobile-nav__link-icon');
    const text = link.querySelector('.mobile-nav__link-text');
    const number = link.querySelector('.mobile-nav__link-number');

    if (isEnter) {
      gsap.to(link, { x: 20, duration: 0.3, ease: 'power2.out' });
      gsap.to(icon, { scale: 1.3, rotate: 15, duration: 0.3, ease: 'back.out(2)' });
      gsap.to(text, { color: '#a855f7', duration: 0.3 });
      gsap.to(number, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' });
    } else {
      gsap.to(link, { x: 0, duration: 0.3, ease: 'power2.out' });
      gsap.to(icon, { scale: 1, rotate: 0, duration: 0.3, ease: 'power2.out' });
      gsap.to(text, { color: '#ffffff', duration: 0.3 });
      gsap.to(number, { opacity: 0.3, x: -10, duration: 0.3, ease: 'power2.out' });
    }
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

        <div className="navbar__links">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              className="navbar__link"
              ref={(el) => (linksRef.current[index] = el)}
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
            ref={hamburgerRef}
          >
            <div className="hamburger">
              <span className="hamburger__bar"></span>
              <span className="hamburger__bar"></span>
              <span className="hamburger__bar"></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-nav ${isMobileMenuOpen ? 'mobile-nav--open' : ''}`}
        ref={mobileMenuRef}
      >
        <div className="mobile-nav__bg">
          {/* Animated background gradient orbs */}
          <div className="mobile-nav__orb mobile-nav__orb--1"></div>
          <div className="mobile-nav__orb mobile-nav__orb--2"></div>
          <div className="mobile-nav__orb mobile-nav__orb--3"></div>
        </div>

        {/* Floating icons background decoration */}
        <div className="mobile-nav__floating-icons">
          {navLinks.map((link, index) => {
            const IconComponent = link.Icon;
            return (
              <div
                key={`float-${index}`}
                className="mobile-nav__floating-icon"
                ref={(el) => (orbitingIconsRef.current[index] = el)}
                style={{
                  '--float-delay': `${index * 0.5}s`,
                  '--float-x': `${15 + (index % 3) * 30}%`,
                  '--float-y': `${10 + Math.floor(index / 3) * 40 + (index % 2) * 15}%`,
                }}
              >
                <IconComponent size={24} />
              </div>
            );
          })}
        </div>

        {/* Navigation links */}
        <div className="mobile-nav__content">
          <div className="mobile-nav__links">
            {navLinks.map((link, index) => {
              const IconComponent = link.Icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="mobile-nav__link"
                  ref={(el) => (mobileLinksRef.current[index] = el)}
                  onClick={handleLinkClick}
                  onMouseEnter={() => handleLinkHover(index, true)}
                  onMouseLeave={() => handleLinkHover(index, false)}
                  onTouchStart={() => handleLinkHover(index, true)}
                  onTouchEnd={() => handleLinkHover(index, false)}
                >
                  <span className="mobile-nav__link-number">0{index + 1}</span>
                  <span className="mobile-nav__link-icon"><IconComponent size={24} /></span>
                  <span className="mobile-nav__link-text">{link.name}</span>
                  <span className="mobile-nav__link-arrow">
                    <ArrowRight size={18} />
                  </span>
                </a>
              );
            })}
          </div>

          {/* CTA Button */}
          <a
            href="https://wa.me/970595114517"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-nav__cta"
            ref={mobileCTARef}
            onClick={handleLinkClick}
          >
            <span className="mobile-nav__cta-text">Start Your Project</span>
            <span className="mobile-nav__cta-icon">
              <ArrowRight size={20} />
            </span>
          </a>
        </div>

        {/* Decorative elements */}
        <div className="mobile-nav__decoration">
          <div className="mobile-nav__line mobile-nav__line--1"></div>
          <div className="mobile-nav__line mobile-nav__line--2"></div>
          <div className="mobile-nav__line mobile-nav__line--3"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
