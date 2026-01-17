import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Users, Briefcase, Clock } from 'lucide-react';
import logo from '../../assets/Virex_logo.png';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef([]);

  const stats = [
    { icon: <Briefcase size={24} />, value: 250, suffix: '+', label: 'Projects Completed' },
    { icon: <Users size={24} />, value: 50, suffix: '+', label: 'Happy Clients' },
    { icon: <Award size={24} />, value: 15, suffix: '+', label: 'Awards Won' },
    { icon: <Clock size={24} />, value: 8, suffix: '+', label: 'Years Experience' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate image
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -80, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Animate content
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Animate stats with counter
      statsRef.current.forEach((stat, index) => {
        const valueEl = stat.querySelector('.about__stat-value');
        const targetValue = parseInt(valueEl.getAttribute('data-value'));

        gsap.fromTo(
          stat,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stat,
              start: 'top 90%',
            },
            delay: index * 0.1,
            onComplete: () => {
              // Counter animation
              gsap.to(
                { value: 0 },
                {
                  value: targetValue,
                  duration: 2,
                  ease: 'power2.out',
                  onUpdate: function () {
                    valueEl.textContent = Math.round(this.targets()[0].value);
                  },
                }
              );
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="about__bg">
        <div className="bg-grid"></div>
        <div className="bg-gradient-blur purple" style={{ top: '10%', left: '-15%' }}></div>
        <div className="bg-gradient-blur green" style={{ bottom: '10%', right: '-10%' }}></div>
      </div>

      <div className="container">
        <div className="about__wrapper">
          <div className="about__image" ref={imageRef}>
            <div className="about__image-wrapper">
              <div className="about__image-main">
                <div className="about__image-placeholder">
                  <img src={logo} alt="Virex Team" />
                </div>
              </div>
              <div className="about__image-accent about__image-accent--1"></div>
              <div className="about__image-accent about__image-accent--2"></div>
              <div className="about__experience-badge">
                <span className="about__experience-value">8+</span>
                <span className="about__experience-text">Years of Excellence</span>
              </div>
            </div>
          </div>

          <div className="about__content" ref={contentRef}>
            <span className="section-label">About Us</span>
            <h2 className="about__title">
              We're a Team of <span className="gradient-text">Creative Minds</span>
            </h2>
            <p className="about__description">
              At Virex, we believe in the power of digital transformation. Since our founding,
              we've been helping businesses of all sizes establish their digital presence and
              achieve their goals through innovative design and technology solutions.
            </p>
            <p className="about__description">
              Our team of passionate designers, developers, and strategists work together
              to create memorable experiences that connect brands with their audiences.
              We don't just build websites – we craft digital experiences that inspire and convert.
            </p>

            <div className="about__highlights">
              <div className="about__highlight">
                <div className="about__highlight-check">✓</div>
                <span>Award-winning creative team</span>
              </div>
              <div className="about__highlight">
                <div className="about__highlight-check">✓</div>
                <span>Data-driven strategies</span>
              </div>
              <div className="about__highlight">
                <div className="about__highlight-check">✓</div>
                <span>24/7 dedicated support</span>
              </div>
              <div className="about__highlight">
                <div className="about__highlight-check">✓</div>
                <span>Transparent communication</span>
              </div>
            </div>

            <a href="https://wa.me/970595114517" target="_blank" rel="noopener noreferrer" className="btn btn-primary about__btn">
              Work With Us
            </a>
          </div>
        </div>

        <div className="about__stats">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="about__stat"
              ref={(el) => (statsRef.current[index] = el)}
            >
              <div className="about__stat-icon">{stat.icon}</div>
              <div className="about__stat-content">
                <span
                  className="about__stat-value gradient-text"
                  data-value={stat.value}
                >
                  0
                </span>
                <span className="about__stat-suffix gradient-text">{stat.suffix}</span>
                <span className="about__stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
