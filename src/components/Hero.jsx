import React, { useState, useEffect } from 'react';
import { ArrowRight, Play } from 'lucide-react';

const HERO_SLIDES = [
  {
    url: 'https://res.cloudinary.com/ddluoarzr/image/upload/v1790837270/new_ahotww.png',
    alt: 'Salvex Auction Fleet - Mercedes-AMG GT Coupe'
  }
];

export default function Hero({ onSearchClick, onLiveAuctionsClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (HERO_SLIDES.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="salvex-hero-section" id="home">
      {/* Background Cinematic Automotive Studio Slideshow */}
      <div className="hero-backdrop">
        {/* Desktop Slideshow */}
        {HERO_SLIDES.map((slide, idx) => (
          <img
            key={slide.url}
            src={slide.url}
            alt={slide.alt}
            className={`hero-bg-image hero-bg-desktop ${idx === currentSlide ? 'hero-bg-active' : 'hero-bg-inactive'}`}
            loading={idx === 0 ? 'eager' : 'lazy'}
          />
        ))}

        {/* Dedicated 425px - 320px Mobile Screen Wallpaper */}
        <img
          src="https://res.cloudinary.com/ddluoarzr/image/upload/v1790837270/new_ahotww.png"
          onError={(e) => {
            e.currentTarget.src = 'https://i.pinimg.com/736x/6d/e2/7c/6de27ca3f8b331283f1db592c3b3e90d.jpg';
          }}
          alt="Salvex Auction Fleet - Mercedes-AMG GT Coupe"
          className="hero-bg-image hero-bg-mobile"
          loading="eager"
        />

        {/* Unified dark gradient overlays matching luxury studio reference */}
        <div className="hero-dark-overlay" />
        <div className="hero-top-vignette" />
        <div className="hero-bottom-vignette" />
      </div>

      {/* Centered reference pagination indicators (Desktop Full Screen View) */}
      {HERO_SLIDES.length > 1 && (
        <div className="hero-center-pagination" aria-label="Slide indicators">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`hero-center-dot ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

      <div className="hero-content-wrapper">
        <div className="hero-top-row">
          {/* Left Column: Headings & Conversion CTAs */}
          <div className="hero-text-block">
            {/* Tagline / Eyebrow */}
            <div className="hero-eyebrow-row">
              <span className="hero-eyebrow-accent-line" />
              <span className="hero-eyebrow-label">TRUSTED VEHICLE AUCTION PLATFORM</span>
            </div>

            {/* Main Heading with Outfit / Plus Jakarta Sans font family */}
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
