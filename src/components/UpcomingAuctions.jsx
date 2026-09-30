import React from 'react';
import { Calendar, Clock, MapPin, Car, ArrowRight } from 'lucide-react';

export default function UpcomingAuctions({ auctions, onRegisterInterest, onViewAuction }) {
  return (
    <section className="salvex-section salvex-upcoming-section" id="upcoming-auctions">
      <div className="section-container">
        {/* Section Header Centered */}
        <div className="section-header-centered">
          <h2 className="section-title">Upcoming Auctions</h2>
          <p className="section-subtitle centered-sub">
            Register early and prepare to participate in upcoming verified vehicle auctions.
          </p>
        </div>

        {/* Reference Image Grid Layout */}
        <div className="upcoming-reference-grid">
          {auctions.map((auc) => (
            <div key={auc.id} className="upcoming-ref-card" id={`upcoming-${auc.id}`}>
              {/* Left Column: Image Thumbnail */}
              <div className="upcoming-ref-img-wrap">
                <img
                  src={auc.image}
                  alt={auc.title}
                  className="upcoming-ref-img"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to local asset if network is offline
                    e.currentTarget.src = '/images/bmw-m4.jpg';
                  }}
                />
              </div>

              {/* Right Column: Content */}
              <div className="upcoming-ref-content">
                {/* Top Badge */}
                <div className="upcoming-ref-badge-row">
                  <span className="upcoming-ref-amber-badge">
                    {auc.statusBadge || 'UPCOMING'}
                  </span>
                </div>

                {/* Title */}
                <h3 className="upcoming-ref-title" title={auc.title}>
                  {auc.title}
                </h3>

                {/* 2x2 Meta Details Grid */}
                <div className="upcoming-ref-meta-grid">
                  <div className="upcoming-ref-meta-cell">
                    <Calendar size={13} className="upcoming-ref-red-icon" />
                    <span>{auc.date}</span>
                  </div>
                  <div className="upcoming-ref-meta-cell">
                    <Clock size={13} className="upcoming-ref-red-icon" />
                    <span>{auc.time}</span>
                  </div>
                  <div className="upcoming-ref-meta-cell">
                    <MapPin size={13} className="upcoming-ref-red-icon" />
                    <span className="truncate-text">{auc.location}</span>
                  </div>
                  <div className="upcoming-ref-meta-cell">
                    <Car size={13} className="upcoming-ref-red-icon" />
                    <span>{auc.vehiclesCount} Vehicles</span>
                  </div>
                </div>

                {/* Bottom Action: View Auction → */}
                <button
                  type="button"
                  className="btn-upcoming-ref-view"
                  onClick={() => {
                    if (onViewAuction) {
                      onViewAuction(auc);
                    } else if (onRegisterInterest) {
                      onRegisterInterest(auc);
                    }
                  }}
                >
                  <span>View Auction</span>
                  <ArrowRight size={14} className="btn-ref-arrow" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
