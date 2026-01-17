import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';
import './Portfolio.css';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const sectionRef = useRef(null);
  const projectsRef = useRef([]);
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = ['all', 'web', 'branding', 'mobile', 'marketing'];

  const projects = [
    {
      title: 'Nova E-Commerce',
      category: 'web',
      description: 'Modern e-commerce platform with seamless checkout experience and real-time inventory management',
      tags: ['React', 'Node.js', 'Stripe'],
      image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80',
      color: 'purple',
    },
    {
      title: 'Zenith Finance',
      category: 'branding',
      description: 'Complete brand identity for fintech startup including logo, guidelines, and marketing materials',
      tags: ['Branding', 'Logo Design', 'Guidelines'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      color: 'cyan',
    },
    {
      title: 'PulseHealth App',
      category: 'mobile',
      description: 'Health and wellness tracking app with personalized insights and workout plans',
      tags: ['React Native', 'Firebase', 'UI/UX'],
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
      color: 'green',
    },
    {
      title: 'EcoVerde Campaign',
      category: 'marketing',
      description: 'Comprehensive digital marketing campaign that increased brand awareness by 300%',
      tags: ['Social Media', 'PPC', 'Content'],
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80',
      color: 'green',
    },
    {
      title: 'CryptoTrack Dashboard',
      category: 'web',
      description: 'Real-time cryptocurrency portfolio tracker with advanced analytics and alerts',
      tags: ['Next.js', 'Web3', 'Charts'],
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
      color: 'blue',
    },
    {
      title: 'Roast & Brew',
      category: 'branding',
      description: 'Premium coffee brand identity with packaging design and retail experience',
      tags: ['Packaging', 'Identity', 'Print'],
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
      color: 'purple',
    },
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.fromTo(
        '.portfolio .section-header',
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

      // Animate filter buttons
      gsap.fromTo(
        '.portfolio__filters button',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Animate projects on filter change
    gsap.fromTo(
      projectsRef.current,
      { opacity: 0, scale: 0.9, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
      }
    );
  }, [activeFilter]);

  return (
    <section id="portfolio" className="portfolio" ref={sectionRef}>
      <div className="portfolio__bg">
        <div className="bg-grid"></div>
        <div className="bg-gradient-blur cyan" style={{ top: '20%', right: '-15%' }}></div>
        <div className="bg-gradient-blur purple" style={{ bottom: '20%', left: '-10%' }}></div>
      </div>

      <div className="container">
        <div className="section-header">
          <span className="section-label">Our Work</span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-description">
            Explore our latest work and see how we've helped businesses transform their digital presence.
          </p>
        </div>

        <div className="portfolio__filters">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`portfolio__filter ${activeFilter === filter ? 'portfolio__filter--active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        <div className="portfolio__grid">
          {filteredProjects.map((project, index) => (
            <div
              key={`${project.title}-${activeFilter}`}
              className={`portfolio__item portfolio__item--${project.color}`}
              ref={(el) => (projectsRef.current[index] = el)}
            >
              <div className="portfolio__image">
                <img src={project.image} alt={project.title} className="portfolio__image-img" />
                <div className="portfolio__image-overlay"></div>
                <div className="portfolio__actions">
                  <button className="portfolio__action" aria-label="View project">
                    <ExternalLink size={18} />
                  </button>
                  <button className="portfolio__action" aria-label="View code">
                    <Github size={18} />
                  </button>
                </div>
              </div>

              <div className="portfolio__content">
                <span className="portfolio__category">{project.category}</span>
                <h3 className="portfolio__title">{project.title}</h3>
                <p className="portfolio__description">{project.description}</p>
                <div className="portfolio__tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="portfolio__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="portfolio__cta">
          <a href="#contact" className="btn btn-secondary">
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
