import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero({ onSearchClick, onLiveAuctionsClick }) {
  return (
    <section className="salvex-hero-section" id="home">
      {/* Background Cinematic Automotive Studio */}
      <div className="hero-backdrop">
        <img
          src="https://i.pinimg.com/1200x/b9/45/25/b94525f45873913627d8e3a9fcf3abee.jpg"
          alt="Salvex Auction Fleet - Premium Vehicles"
          className="hero-bg-image"
          loading="eager"
        />
        <div className="hero-dark-overlay" />
        <div className="hero-top-vignette" />
        <div className="hero-bottom-vignette" />
        <div className="hero-red-ambient-glow" />
      </div>

      <div className="hero-content-wrapper">
        <div className="hero-top-row">
          {/* Left Column: Headings & Conversion CTAs */}
          <div className="hero-text-block">
            {/* Main Heading */}
            <h1 className="hero-main-title">
              Premium Vehicles<br />
              Real <span className="text-auction-red">Opportunities</span>
            </h1>

            {/* Description */}
            <p className="hero-description">
              Discover used, damaged, salvage and auction vehicles from trusted sources
              through a transparent online bidding platform.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="hero-cta-group">
              <button
                type="button"
                className="btn-hero-primary"
                onClick={onSearchClick}
                id="hero-search-vehicles-btn"
              >
                <span>Search Vehicles</span>
                <ArrowRight size={18} className="btn-arrow" />
              </button>

              <button
                type="button"
                className="btn-hero-secondary"
                onClick={onLiveAuctionsClick}
                id="hero-view-live-btn"
              >
                <span className="hero-live-pill">
                  <span className="hero-live-pulse" />
                  LIVE
                </span>
                <span>View Live Auctions</span>
                <ArrowRight size={16} className="btn-arrow" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
