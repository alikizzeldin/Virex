import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Play, Sparkles, X } from 'lucide-react';
import logo from '../../assets/Virex_logo.png';
import showreelVideo from '../../assets/Virex_Video.mp4';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const statsRef = useRef(null);
  const visualRef = useRef(null);
  const orbs = useRef([]);
  const videoRef = useRef(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const openVideo = () => {
    setIsVideoOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
    document.body.style.overflow = 'auto';
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create main timeline
      const tl = gsap.timeline({ delay: 1 });

      // Animate title words
      const titleWords = titleRef.current.querySelectorAll('.hero__title-word');
      tl.fromTo(
        titleWords,
        { opacity: 0, y: 60, rotateX: -45 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );

      // Animate subtitle
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      );

      // Animate description
      tl.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      );

      // Animate buttons
      tl.fromTo(
        buttonsRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'power3.out' },
        '-=0.3'
      );

      // Animate stats with count-up
      const statValues = statsRef.current.querySelectorAll('.hero__stat-value');
      tl.fromTo(
        statsRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          onComplete: () => {
            // Count-up animation for each stat
            statValues.forEach((valueEl) => {
              const targetValue = parseInt(valueEl.getAttribute('data-value'));
              gsap.to(
                { value: 0 },
                {
                  value: targetValue,
                  duration: 2,
                  ease: 'power2.out',
                  onUpdate: function () {
                    valueEl.textContent = Math.round(this.targets()[0].value) + '+';
                  },
                }
              );
            });
          }
        },
        '-=0.2'
      );

      // Animate visual element
      tl.fromTo(
        visualRef.current,
        { opacity: 0, scale: 0.8, rotate: -10 },
        { opacity: 1, scale: 1, rotate: 0, duration: 1, ease: 'power3.out' },
        '-=0.8'
      );

      // Floating animation for orbs
      orbs.current.forEach((orb, index) => {
        gsap.to(orb, {
          y: 'random(-30, 30)',
          x: 'random(-20, 20)',
          duration: 'random(3, 5)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2,
        });
      });

      // Parallax effect on mouse move
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 30;
        const y = (clientY / window.innerHeight - 0.5) * 30;

        gsap.to(visualRef.current, {
          x,
          y,
          duration: 1,
          ease: 'power2.out',
        });

        orbs.current.forEach((orb, index) => {
          gsap.to(orb, {
            x: x * (index + 1) * 0.3,
            y: y * (index + 1) * 0.3,
            duration: 1.5,
            ease: 'power2.out',
          });
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero__bg">
        <div className="hero__grid bg-grid"></div>
        <div
          className="hero__orb hero__orb--purple"
          ref={(el) => (orbs.current[0] = el)}
        ></div>
        <div
          className="hero__orb hero__orb--cyan"
          ref={(el) => (orbs.current[1] = el)}
        ></div>
        <div
          className="hero__orb hero__orb--green"
          ref={(el) => (orbs.current[2] = el)}
        ></div>
      </div>

      <div className="hero__container container">
        <div className="hero__content">
          <div className="hero__badge">
            <Sparkles size={16} />
            <span>Award-Winning Digital Agency</span>
          </div>

          <h1 className="hero__title" ref={titleRef}>
            <span className="hero__title-word">We</span>{' '}
            <span className="hero__title-word">Create</span>{' '}
            <span className="hero__title-word gradient-text">Digital</span>{' '}
            <span className="hero__title-word gradient-text">Experiences</span>
          </h1>

          <p className="hero__subtitle" ref={subtitleRef}>
            Transforming Ideas into Stunning Digital Reality
          </p>

          <p className="hero__description" ref={descriptionRef}>
            We are a creative digital agency specializing in web design, branding, and
            digital solutions that help businesses stand out in the digital landscape.
          </p>

          <div className="hero__buttons" ref={buttonsRef}>
            <a href="https://wa.me/970595114517" target="_blank" rel="noopener noreferrer" className="btn btn-primary hero__btn">
              Start a Project
              <ArrowRight size={18} />
            </a>
            <button className="btn btn-secondary hero__btn hero__btn--play" onClick={openVideo}>
              <div className="hero__play-icon">
                <Play size={16} fill="currentColor" />
              </div>
              Watch Showreel
            </button>
          </div>

          <div className="hero__stats" ref={statsRef}>
            <div className="hero__stat">
              <span className="hero__stat-value gradient-text" data-value="250">0+</span>
              <span className="hero__stat-label">Projects Delivered</span>
            </div>
            <div className="hero__stat-divider"></div>
            <div className="hero__stat">
              <span className="hero__stat-value gradient-text" data-value="50">0+</span>
              <span className="hero__stat-label">Happy Clients</span>
            </div>
            <div className="hero__stat-divider"></div>
            <div className="hero__stat">
              <span className="hero__stat-value gradient-text" data-value="15">0+</span>
              <span className="hero__stat-label">Awards Won</span>
            </div>
          </div>
        </div>

        <div className="hero__visual" ref={visualRef}>
          <div className="hero__visual-wrapper">
            <div className="hero__visual-card hero__visual-card--1">
              <div className="hero__visual-card-inner">
                <div className="hero__visual-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span>Web Design</span>
              </div>
            </div>
            <div className="hero__visual-card hero__visual-card--2">
              <div className="hero__visual-card-inner">
                <div className="hero__visual-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" />
                    <line x1="15" y1="9" x2="15.01" y2="9" />
                  </svg>
                </div>
                <span>Branding</span>
              </div>
            </div>
            <div className="hero__visual-card hero__visual-card--3">
              <div className="hero__visual-card-inner">
                <div className="hero__visual-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 20V10" />
                    <path d="M18 20V4" />
                    <path d="M6 20v-4" />
                  </svg>
                </div>
                <span>Marketing</span>
              </div>
            </div>
            <div className="hero__visual-center">
              <img src={logo} alt="Virex" className="hero__logo-main" />
            </div>
          </div>
        </div>
      </div>

      <div className="hero__scroll-indicator">
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel"></div>
        </div>
        <span>Scroll to explore</span>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="video-modal" onClick={closeVideo}>
          <div className="video-modal__overlay"></div>
          <div className="video-modal__content" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal__close" onClick={closeVideo} aria-label="Close video">
              <X size={24} />
            </button>
            <div className="video-modal__wrapper">
              <video
                ref={videoRef}
                src={showreelVideo}
                controls
                autoPlay
                className="video-modal__video"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
