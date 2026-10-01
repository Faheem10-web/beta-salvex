import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_SLIDES = [
  {
    url: 'https://i.pinimg.com/1200x/1e/c7/94/1ec794484526bfc3428cc56e9248d159.jpg',
    alt: 'Salvex Auction Fleet - Audi RS5 Sport Coupe'
  },
  {
    url: 'https://framerusercontent.com/images/BqAnsJYACnJFkmMsTAyRsp8WJiM.jpg?width=1200&height=800',
    alt: 'Salvex Auction Fleet - Luxury Performance Vehicle'
  }
];

export default function Hero({ onSearchClick, onLiveAuctionsClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section className="salvex-hero-section" id="home">
      {/* Background Cinematic Automotive Studio Slideshow */}
      <div className="hero-backdrop">
        {HERO_SLIDES.map((slide, idx) => (
          <img
            key={slide.url}
            src={slide.url}
            alt={slide.alt}
            className={`hero-bg-image ${idx === currentSlide ? 'hero-bg-active' : 'hero-bg-inactive'}`}
            loading={idx === 0 ? 'eager' : 'lazy'}
          />
        ))}
        {/* Same feeling unified dark gradient overlays */}
        <div className="hero-dark-overlay" />
        <div className="hero-top-vignette" />
        <div className="hero-bottom-vignette" />
      </div>

      {/* Floating Bottom Slider Controls Pill */}
      <div className="hero-slider-controls" aria-label="Hero slider controls">
        <button
          type="button"
          className="hero-slider-ctrl-btn"
          onClick={handlePrevSlide}
          aria-label="Previous Slide"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="hero-slide-dots-inline">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`hero-slide-dot ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <span className="hero-slider-counter">
          <span className="hero-slider-counter-active">0{currentSlide + 1}</span> / 0{HERO_SLIDES.length}
        </span>

        <button
          type="button"
          className="hero-slider-ctrl-btn"
          onClick={handleNextSlide}
          aria-label="Next Slide"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="hero-content-wrapper">
        <div className="hero-top-row">
          {/* Left Column: Headings & Conversion CTAs */}
          <div className="hero-text-block">
            {/* Tagline / Eyebrow with red accent line */}
            <div className="hero-eyebrow-row">
              <span className="hero-eyebrow-accent-line" />
              <span className="hero-eyebrow-label">TRUSTED VEHICLE AUCTION PLATFORM</span>
            </div>

            {/* Main Heading with Red Dream Car */}
            <h1 className="hero-main-title">
              Drive Your<br />
              <span className="hero-title-highlight">Dream Car</span> Today.
            </h1>

            {/* Description */}
            <p className="hero-description">
              Discover used, damaged and salvage vehicles from trusted sources through a transparent online bidding platform.
            </p>

            {/* Action Buttons */}
            <div className="hero-cta-group">
              <button
                type="button"
                className="btn-hero-primary"
                onClick={onLiveAuctionsClick}
                id="hero-browse-auctions-btn"
              >
                <span>Browse Live Auctions</span>
                <ArrowRight size={17} className="btn-arrow" />
              </button>

              <button
                type="button"
                className="btn-hero-video"
                onClick={onSearchClick}
                id="hero-watch-video-btn"
              >
                <div className="hero-video-icon-circle">
                  <Play size={12} fill="currentColor" className="hero-video-play-icon" />
                </div>
                <span>Watch Video</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
