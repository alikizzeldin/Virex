import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, Heart } from 'lucide-react';
import logo from '../../assets/Virex_logo.png';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Team', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press Kit', href: '#' },
    ],
    services: [
      { name: 'Web Development', href: '#services' },
      { name: 'UI/UX Design', href: '#services' },
      { name: 'Brand Identity', href: '#services' },
      { name: 'Digital Marketing', href: '#services' },
    ],
    resources: [
      { name: 'Blog', href: '#' },
      { name: 'Case Studies', href: '#portfolio' },
      { name: 'Documentation', href: '#' },
      { name: 'FAQs', href: '#' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
    ],
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer__content',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: 0 },
      ease: 'power3.inOut',
    });
  };

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer__gradient-border"></div>

      <div className="container">
        <div className="footer__content">
          {/* Main Footer */}
          <div className="footer__main">
            <div className="footer__brand">
              <a href="#home" className="footer__logo">
                <img src={logo} alt="Virex" />
                <span>VIREX</span>
              </a>
              <p className="footer__tagline">
                Transforming ideas into stunning digital experiences. We're a creative digital agency passionate about building brands that matter.
              </p>
              <div className="footer__newsletter">
                <h4>Subscribe to our newsletter</h4>
                <form className="footer__newsletter-form">
                  <input type="email" placeholder="Enter your email" />
                  <button type="submit" className="btn btn-primary">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            <div className="footer__links">
              <div className="footer__links-column">
                <h4>Company</h4>
                <ul>
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer__links-column">
                <h4>Services</h4>
                <ul>
                  {footerLinks.services.map((link, index) => (
                    <li key={index}>
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer__links-column">
                <h4>Resources</h4>
                <ul>
                  {footerLinks.resources.map((link, index) => (
                    <li key={index}>
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer__links-column">
                <h4>Legal</h4>
                <ul>
                  {footerLinks.legal.map((link, index) => (
                    <li key={index}>
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="footer__bottom">
            <p className="footer__copyright">
              © {new Date().getFullYear()} Virex. All rights reserved. Made with{' '}
              <Heart size={14} className="footer__heart" fill="currentColor" /> by Virex Team
            </p>

            <button className="footer__scroll-top" onClick={scrollToTop} aria-label="Scroll to top">
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
