import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Globe,
  Palette,
  TrendingUp,
  Megaphone,
  Video,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const services = [
    {
      icon: <Globe size={32} />,
      title: 'Web Development',
      description:
        'Custom websites and web applications built with modern technologies for optimal performance and scalability.',
      features: ['React & Next.js', 'E-commerce', 'CMS Integration', 'API Development'],
      color: 'purple',
    },
    {
      icon: <Palette size={32} />,
      title: 'UI/UX Design',
      description:
        'User-centered design solutions that combine aesthetics with functionality to create memorable experiences.',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
      color: 'blue',
    },
    {
      icon: <Layers size={32} />,
      title: 'Brand Identity',
      description:
        'Comprehensive branding solutions that tell your story and create lasting impressions.',
      features: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Brand Strategy'],
      color: 'cyan',
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'SEO & Analytics',
      description:
        'Data-driven optimization strategies to improve visibility and drive organic growth.',
      features: ['SEO Audit', 'Keyword Research', 'Analytics Setup', 'Performance Tracking'],
      color: 'green',
    },
    {
      icon: <Megaphone size={32} />,
      title: 'Digital Marketing',
      description:
        'Strategic marketing campaigns that reach your target audience and drive conversions.',
      features: ['Social Media', 'PPC Campaigns', 'Email Marketing', 'Content Strategy'],
      color: 'purple',
    },
    {
      icon: <Video size={32} />,
      title: 'Motion & Video',
      description:
        'Engaging motion graphics and video content that brings your brand to life.',
      features: ['Animation', 'Video Production', 'Motion Graphics', '3D Visualization'],
      color: 'cyan',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.fromTo(
        '.services .section-header',
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

      // Animate cards
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
            delay: (index % 3) * 0.15,
          }
        );

        // Hover animation for arrow
        const arrow = card.querySelector('.service-card__arrow');
        card.addEventListener('mouseenter', () => {
          gsap.to(arrow, {
            x: 5,
            y: -5,
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(arrow, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="services" ref={sectionRef}>
      <div className="services__bg">
        <div className="bg-gradient-blur purple" style={{ top: '-10%', right: '-5%' }}></div>
        <div className="bg-gradient-blur cyan" style={{ bottom: '-10%', left: '-5%' }}></div>
      </div>

      <div className="container">
        <div className="section-header">
          <span className="section-label">Our Services</span>
          <h2 className="section-title">
            Comprehensive <span className="gradient-text">Digital Solutions</span>
          </h2>
          <p className="section-description">
            From concept to launch, we provide end-to-end services to help your business
            thrive in the digital world.
          </p>
        </div>

        <div className="services__grid">
          {services.map((service, index) => (
            <div
              key={index}
              className={`service-card service-card--${service.color}`}
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <div className="service-card__header">
                <div className="service-card__icon">{service.icon}</div>
                <ArrowUpRight size={20} className="service-card__arrow" />
              </div>

              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__description">{service.description}</p>

              <ul className="service-card__features">
                {service.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>

              <div className="service-card__glow"></div>
            </div>
          ))}
        </div>

        <div className="services__cta">
          <p>Need a custom solution for your business?</p>
          <a href="#contact" className="btn btn-primary">
            Let's Discuss Your Project
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
