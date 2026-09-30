import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AboutSection({ onAboutClick }) {
  const sources = [
    'Banks',
    'NBFCs',
    'Consumer',
    'Insurance Companies'
  ];

  const categories = [
    'Salvage',
    'Damaged',
    'Used',
    'Auction Vehicles'
  ];

  return (
    <section className="salvex-section salvex-about-section" id="about">
      <div className="section-container">
        <div className="about-compact-grid">
          {/* Left: Professional Automotive Image */}
          <div className="about-image-column">
            <div className="about-image-wrapper">
              <img
                src="/images/about-facility.jpg"
                alt="Salvex Auction Logistics and Inspection Facility"
                className="about-facility-image"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: Short About Content */}
          <div className="about-content-column">
            <div className="about-eyebrow-tag">ABOUT SALVEX AUCTION</div>

            <h2 className="about-heading">
              A Simpler Way to Participate in Vehicle Auctions
            </h2>

            <div className="about-paragraphs">
              <p className="about-paragraph-text">
                Salvex Auction is an online vehicle auction platform designed to make the process of discovering, bidding, and purchasing vehicles simple, transparent, and convenient.
              </p>

              <p className="about-paragraph-text">
                We connect vehicle owners, dealers, buyers, and bidders through a digital auction platform.
              </p>

              <div className="about-inventory-sources">
                <span className="sources-heading">We provide inventory from:</span>
                <div className="sources-pill-row">
                  {sources.map((src) => (
                    <div key={src} className="source-pill-badge">
                      <CheckCircle2 size={13} className="text-auction-red" />
                      <span>{src}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="about-vehicle-categories">
                <span className="categories-heading">Inventory Categories:</span>
                <div className="categories-chips-row">
                  {categories.map((cat) => (
                    <span key={cat} className="category-text-chip">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn-about-link"
              onClick={onAboutClick}
            >
              <span>About Salvex</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
