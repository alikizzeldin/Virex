import React, { useEffect, useRef, useState, useCallback } from 'react';
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
  const visualWrapperRef = useRef(null);
  const centerLogoRef = useRef(null);
  const orbs = useRef([]);
  const cards = useRef([]);
  const videoRef = useRef(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const cardPositions = useRef([]);

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

  // Magnetic effect for center logo
  const handleCenterMouseMove = useCallback((e) => {
    if (!centerLogoRef.current) return;
    const rect = centerLogoRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.15;
    const deltaY = (e.clientY - centerY) * 0.15;

    gsap.to(centerLogoRef.current, {
      x: deltaX,
      y: deltaY,
      rotateY: deltaX * 0.3,
      rotateX: -deltaY * 0.3,
      duration: 0.4,
      ease: 'power2.out',
    });
  }, []);

  const handleCenterMouseLeave = useCallback(() => {
    if (!centerLogoRef.current) return;
    gsap.to(centerLogoRef.current, {
      x: 0,
      y: 0,
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    });
  }, []);

  // Card drag handlers
  const handleCardMouseDown = useCallback((e, index) => {
    e.preventDefault();
    const card = cards.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    // Store original position
    if (!cardPositions.current[index]) {
      cardPositions.current[index] = {
        x: card.offsetLeft,
        y: card.offsetTop,
      };
    }

    setIsDragging(true);
    setActiveCard(index);

    // Lift card effect
    gsap.to(card, {
      scale: 1.1,
      zIndex: 100,
      boxShadow: '0 20px 40px rgba(168, 85, 247, 0.4), 0 0 30px rgba(168, 85, 247, 0.2)',
      duration: 0.2,
    });
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || activeCard === null) return;
    const card = cards.current[activeCard];
    if (!card) return;

    const wrapper = visualWrapperRef.current;
    const wrapperRect = wrapper.getBoundingClientRect();

    const newX = e.clientX - wrapperRect.left - dragOffset.current.x;
    const newY = e.clientY - wrapperRect.top - dragOffset.current.y;

    gsap.to(card, {
      left: newX,
      top: newY,
      duration: 0.1,
    });
  }, [isDragging, activeCard]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging || activeCard === null) return;
    const card = cards.current[activeCard];
    if (!card) return;

    // Snap back animation with bounce
    gsap.to(card, {
      scale: 1,
      zIndex: 1,
      boxShadow: 'none',
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });

    setIsDragging(false);
    setActiveCard(null);
  }, [isDragging, activeCard]);

  // Card hover effects
  const handleCardMouseEnter = useCallback((index) => {
    if (isDragging) return;
    const card = cards.current[index];
    if (!card) return;

    gsap.to(card, {
      scale: 1.08,
      y: -10,
      boxShadow: '0 15px 35px rgba(168, 85, 247, 0.3), 0 0 20px rgba(168, 85, 247, 0.15)',
      duration: 0.3,
      ease: 'power2.out',
    });

    // Glow pulse on icon
    const icon = card.querySelector('.hero__visual-icon');
    if (icon) {
      gsap.to(icon, {
        scale: 1.15,
        boxShadow: '0 0 25px rgba(168, 85, 247, 0.6)',
        duration: 0.3,
      });
    }
  }, [isDragging]);

  const handleCardMouseLeave = useCallback((index) => {
    if (isDragging && activeCard === index) return;
    const card = cards.current[index];
    if (!card) return;

    gsap.to(card, {
      scale: 1,
      y: 0,
      boxShadow: 'none',
      duration: 0.4,
      ease: 'power2.out',
    });

    const icon = card.querySelector('.hero__visual-icon');
    if (icon) {
      gsap.to(icon, {
        scale: 1,
        boxShadow: 'none',
        duration: 0.3,
      });
    }
  }, [isDragging, activeCard]);

  // 3D tilt effect on cards
  const handleCardMouseMove = useCallback((e, index) => {
    if (isDragging) return;
    const card = cards.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = (e.clientY - centerY) * -0.15;
    const rotateY = (e.clientX - centerX) * 0.15;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, [isDragging]);

  const handleCardTiltReset = useCallback((index) => {
    const card = cards.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  }, []);

  useEffect(() => {
    // Add global mouse event listeners for drag
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

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

      // Animate visual element with stagger for cards
      tl.fromTo(
        visualRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.8'
      );

      // Animate cards with stagger and rotation
      tl.fromTo(
        cards.current,
        { opacity: 0, scale: 0, rotation: -180 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.7)',
        },
        '-=0.5'
      );

      // Center logo pulse animation
      tl.fromTo(
        centerLogoRef.current,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(2)',
        },
        '-=0.3'
      );

      // Continuous pulse glow on center
      gsap.to(centerLogoRef.current, {
        boxShadow: '0 0 60px rgba(168, 85, 247, 0.6), 0 0 100px rgba(168, 85, 247, 0.3)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

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

      // Orbit animation for cards (subtle)
      cards.current.forEach((card, index) => {
        if (!card) return;
        const angle = (index * 120) * (Math.PI / 180);
        gsap.to(card, {
          y: `+=${Math.sin(angle) * 5}`,
          x: `+=${Math.cos(angle) * 5}`,
          duration: 3 + index,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      // Parallax effect on mouse move
      const handleParallax = (e) => {
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

      window.addEventListener('mousemove', handleParallax);

      return () => {
        window.removeEventListener('mousemove', handleParallax);
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
          <div className="hero__visual-wrapper" ref={visualWrapperRef}>
            <div
              className={`hero__visual-card hero__visual-card--1 ${isDragging && activeCard === 0 ? 'is-dragging' : ''}`}
              ref={(el) => (cards.current[0] = el)}
              onMouseDown={(e) => handleCardMouseDown(e, 0)}
              onMouseEnter={() => handleCardMouseEnter(0)}
              onMouseLeave={() => { handleCardMouseLeave(0); handleCardTiltReset(0); }}
              onMouseMove={(e) => handleCardMouseMove(e, 0)}
            >
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
              <div className="hero__card-glow"></div>
            </div>
            <div
              className={`hero__visual-card hero__visual-card--2 ${isDragging && activeCard === 1 ? 'is-dragging' : ''}`}
              ref={(el) => (cards.current[1] = el)}
              onMouseDown={(e) => handleCardMouseDown(e, 1)}
              onMouseEnter={() => handleCardMouseEnter(1)}
              onMouseLeave={() => { handleCardMouseLeave(1); handleCardTiltReset(1); }}
              onMouseMove={(e) => handleCardMouseMove(e, 1)}
            >
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
              <div className="hero__card-glow"></div>
            </div>
            <div
              className={`hero__visual-card hero__visual-card--3 ${isDragging && activeCard === 2 ? 'is-dragging' : ''}`}
              ref={(el) => (cards.current[2] = el)}
              onMouseDown={(e) => handleCardMouseDown(e, 2)}
              onMouseEnter={() => handleCardMouseEnter(2)}
              onMouseLeave={() => { handleCardMouseLeave(2); handleCardTiltReset(2); }}
              onMouseMove={(e) => handleCardMouseMove(e, 2)}
            >
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
              <div className="hero__card-glow"></div>
            </div>
            <div
              className="hero__visual-center"
              ref={centerLogoRef}
              onMouseMove={handleCenterMouseMove}
              onMouseLeave={handleCenterMouseLeave}
            >
              <img src={logo} alt="Virex" className="hero__logo-main" />
              <div className="hero__center-ring hero__center-ring--1"></div>
              <div className="hero__center-ring hero__center-ring--2"></div>
              <div className="hero__center-ring hero__center-ring--3"></div>
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
