import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import './Testimonials.css';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'محمد أبو سليم',
      role: 'صاحب مشروع',
      content:
        'فريق Virex حوّل فكرتنا لمتجر إلكتروني احترافي بالكامل. التصميم راقي والموقع سريع وسهل الاستخدام. زادت مبيعاتنا بشكل ملحوظ. شكراً لكم على الإبداع والاحترافية.',
      rating: 5,
      color: 'purple',
    },
    {
      name: 'سارة الخطيب',
      role: 'مديرة تسويق',
      content:
        'تعاملنا مع Virex لتصميم هويتنا البصرية وموقعنا الإلكتروني. النتيجة كانت أكثر من رائعة! فهموا رؤيتنا وترجموها بشكل إبداعي. أنصح الجميع بالتعامل معهم.',
      rating: 5,
      color: 'cyan',
    },
    {
      name: 'أحمد نصار',
      role: 'رائد أعمال',
      content:
        'من أفضل القرارات اللي اتخذناها كانت التعامل مع Virex. صمموا لنا موقع وتطبيق للطلبات غير شكل. العملاء صاروا يطلبوا أونلاين بسهولة. فريق محترف ومتعاون جداً.',
      rating: 5,
      color: 'green',
    },
    {
      name: 'لينا عبد الرحمن',
      role: 'صاحبة متجر',
      content:
        'Virex ساعدونا نوصل للعالم من خلال موقع إلكتروني عصري. التصميم دمج بين الأصالة والحداثة بشكل مذهل. تجربة ممتازة من البداية للنهاية.',
      rating: 5,
      color: 'blue',
    },
    {
      name: 'يوسف الحاج',
      role: 'مدير مشروع',
      content:
        'كنا بحاجة لموقع يعرض منتجاتنا بشكل احترافي. Virex قدموا تصميم راقي وحملة تسويقية زادت وعي الناس بمنتجاتنا. شراكة ناجحة ومستمرة.',
      rating: 5,
      color: 'purple',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.fromTo(
        '.testimonials .section-header',
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

      // Animate slider
      gsap.fromTo(
        '.testimonials__slider-wrapper',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    // Auto-advance slider
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Animate slide change
    gsap.fromTo(
      sliderRef.current,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }
    );
  }, [currentIndex]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="testimonials" ref={sectionRef}>
      <div className="testimonials__bg">
        <div className="bg-gradient-blur purple" style={{ top: '10%', left: '-10%' }}></div>
        <div className="bg-gradient-blur cyan" style={{ bottom: '10%', right: '-5%' }}></div>
      </div>

      <div className="container">
        <div className="section-header">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="section-description">
            Don't just take our word for it - hear from some of our satisfied clients.
          </p>
        </div>

        <div className="testimonials__slider-wrapper">
          <div className="testimonials__slider" ref={sliderRef}>
            <div className={`testimonial-card testimonial-card--${currentTestimonial.color}`}>
              <div className="testimonial-card__quote">
                <Quote size={48} />
              </div>

              <div className="testimonial-card__rating">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>

              <p className="testimonial-card__content">{currentTestimonial.content}</p>

              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">
                  {currentTestimonial.name.charAt(0)}
                </div>
                <div className="testimonial-card__info">
                  <h4 className="testimonial-card__name">{currentTestimonial.name}</h4>
                  <p className="testimonial-card__role">{currentTestimonial.role}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="testimonials__controls">
            <button className="testimonials__arrow" onClick={prevSlide} aria-label="Previous">
              <ChevronLeft size={24} />
            </button>

            <div className="testimonials__dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`testimonials__dot ${index === currentIndex ? 'testimonials__dot--active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button className="testimonials__arrow" onClick={nextSlide} aria-label="Next">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
