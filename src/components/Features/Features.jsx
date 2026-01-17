import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Palette,
  Code,
  Smartphone,
  Search,
  Zap,
  Shield,
} from 'lucide-react';
import './Features.css';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const features = [
    {
      icon: <Palette size={28} />,
      title: 'Creative Design',
      description:
        'Stunning visual designs that captivate your audience and elevate your brand identity.',
      color: 'purple',
    },
    {
      icon: <Code size={28} />,
      title: 'Web Development',
      description:
        'Custom web solutions built with cutting-edge technologies for optimal performance.',
      color: 'blue',
    },
    {
      icon: <Smartphone size={28} />,
      title: 'Mobile First',
      description:
        'Responsive designs that look perfect on every device, from mobile to desktop.',
      color: 'cyan',
    },
    {
      icon: <Search size={28} />,
      title: 'SEO Optimization',
      description:
        'Strategic SEO implementations to boost your visibility and organic rankings.',
      color: 'green',
    },
    {
      icon: <Zap size={28} />,
      title: 'Fast Performance',
      description:
        'Lightning-fast loading speeds optimized for the best user experience.',
      color: 'purple',
    },
    {
      icon: <Shield size={28} />,
      title: 'Secure & Reliable',
      description:
        'Enterprise-grade security measures to protect your digital assets.',
      color: 'cyan',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section header
      gsap.fromTo(
        '.features .section-header',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Animate feature cards
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
            delay: index * 0.1,
          }
        );
      });

      // Hover animations
      cardsRef.current.forEach((card) => {
        const icon = card.querySelector('.feature-card__icon');
        const glow = card.querySelector('.feature-card__glow');

        card.addEventListener('mouseenter', () => {
          gsap.to(icon, {
            scale: 1.1,
            rotate: 5,
            duration: 0.3,
            ease: 'power2.out',
          });
          gsap.to(glow, {
            opacity: 1,
            scale: 1.2,
            duration: 0.4,
            ease: 'power2.out',
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(icon, {
            scale: 1,
            rotate: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
          gsap.to(glow, {
            opacity: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" className="features" ref={sectionRef}>
      <div className="features__bg">
        <div className="bg-gradient-blur purple" style={{ top: '20%', right: '-10%' }}></div>
        <div className="bg-gradient-blur cyan" style={{ bottom: '10%', left: '-5%' }}></div>
      </div>

      <div className="container">
        <div className="section-header">
          <span className="section-label">Why Choose Us</span>
          <h2 className="section-title">
            Features That Make Us <span className="gradient-text">Stand Out</span>
          </h2>
          <p className="section-description">
            We combine creativity with technology to deliver exceptional digital experiences
            that drive results and exceed expectations.
          </p>
        </div>

        <div className="features__grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card feature-card--${feature.color}`}
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <div className="feature-card__glow"></div>
              <div className="feature-card__content">
                <div className="feature-card__icon">{feature.icon}</div>
                <h3 className="feature-card__title">{feature.title}</h3>
                <p className="feature-card__description">{feature.description}</p>
              </div>
              <div className="feature-card__border"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
