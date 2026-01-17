import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Linkedin, Twitter, Instagram, Github } from 'lucide-react';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [focusedField, setFocusedField] = useState(null);

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email Us',
      value: 'virexdigitalsolutions@gmail.com',
      link: 'mailto:virexdigitalsolutions@gmail.com',
    },
    {
      icon: <Phone size={24} />,
      title: 'WhatsApp',
      value: '+970 595 114 517',
      link: 'https://wa.me/970595114517',
    },
    {
      icon: <MapPin size={24} />,
      title: 'Location',
      value: 'Palestine',
      link: '#',
    },
  ];

  const socialLinks = [
    { icon: <Linkedin size={20} />, href: '#', label: 'LinkedIn' },
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
    { icon: <Instagram size={20} />, href: '#', label: 'Instagram' },
    { icon: <Github size={20} />, href: '#', label: 'GitHub' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.fromTo(
        '.contact .section-header',
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

      // Animate info cards
      gsap.fromTo(
        infoRef.current.children,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 80%',
          },
        }
      );

      // Animate form
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="contact__bg">
        <div className="bg-grid"></div>
        <div className="bg-gradient-blur purple" style={{ top: '-10%', right: '20%' }}></div>
        <div className="bg-gradient-blur cyan" style={{ bottom: '10%', left: '10%' }}></div>
      </div>

      <div className="container">
        <div className="section-header">
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">
            Let's Start a <span className="gradient-text">Project Together</span>
          </h2>
          <p className="section-description">
            Have a project in mind? We'd love to hear about it. Get in touch and let's create something amazing together.
          </p>
        </div>

        <div className="contact__wrapper">
          <div className="contact__info" ref={infoRef}>
            {contactInfo.map((info, index) => (
              <a key={index} href={info.link} className="contact__info-card">
                <div className="contact__info-icon">{info.icon}</div>
                <div className="contact__info-content">
                  <h4>{info.title}</h4>
                  <p>{info.value}</p>
                </div>
              </a>
            ))}

            <div className="contact__social">
              <h4>Follow Us</h4>
              <div className="contact__social-links">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="contact__social-link"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form className="contact__form" ref={formRef} onSubmit={handleSubmit}>
            <div className="contact__form-header">
              <h3>Send us a message</h3>
              <p>Fill out the form below and we'll get back to you within 24 hours.</p>
            </div>

            <div className="contact__form-row">
              <div className={`contact__form-group ${focusedField === 'name' || formData.name ? 'contact__form-group--active' : ''}`}>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
                <label htmlFor="name">Your Name</label>
                <span className="contact__form-line"></span>
              </div>

              <div className={`contact__form-group ${focusedField === 'email' || formData.email ? 'contact__form-group--active' : ''}`}>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
                <label htmlFor="email">Email Address</label>
                <span className="contact__form-line"></span>
              </div>
            </div>

            <div className={`contact__form-group ${focusedField === 'subject' || formData.subject ? 'contact__form-group--active' : ''}`}>
              <input
                type="text"
                name="subject"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                onFocus={() => setFocusedField('subject')}
                onBlur={() => setFocusedField(null)}
                required
              />
              <label htmlFor="subject">Subject</label>
              <span className="contact__form-line"></span>
            </div>

            <div className={`contact__form-group ${focusedField === 'message' || formData.message ? 'contact__form-group--active' : ''}`}>
              <textarea
                name="message"
                id="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                required
              ></textarea>
              <label htmlFor="message">Your Message</label>
              <span className="contact__form-line"></span>
            </div>

            <button type="submit" className="btn btn-primary contact__submit">
              Send Message
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
