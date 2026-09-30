import React from 'react';
import { Fuel, Gauge, MapPin, ArrowRight, Sparkles, ChevronRight, Eye } from 'lucide-react';

export default function RecentlyAdded({ vehicles, onViewVehicle }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <section className="salvex-section salvex-recent-section" id="vehicles">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-row">
          <div className="section-header-left">
            <div className="section-eyebrow eyebrow-blue">
              <span className="blue-dot" />
              <span>FRESH INVENTORY INTAKE</span>
            </div>
            <h2 className="section-title">Recently Added</h2>
            <p className="section-subtitle">
              Newly inspected vehicles listed this week from insurance settlements, bank portfolios, and corporate fleets.
            </p>
          </div>
        </div>

        {/* Recently Added Cards Grid */}
        <div className="recent-cards-grid">
          {vehicles.map((v) => (
            <article key={v.id} className="recent-vehicle-card" id={`recent-${v.id}`}>
              <div className="recent-media-wrap">
                <img
                  src={v.image}
                  alt={`${v.year} ${v.make} ${v.model}`}
                  className="recent-img"
                  loading="lazy"
                />
                <div className="recent-badge-new">
                  <Sparkles size={12} className="sparkle-icon" />
                  <span>NEW</span>
                </div>
                <div className="recent-condition-tag">{v.condition}</div>
              </div>

              <div className="recent-card-body">
                <div className="recent-year-make">
                  <span className="recent-year">{v.year}</span>
                  <span className="recent-dot">•</span>
                  <span className="recent-make">{v.make}</span>
                </div>

                <h3 className="recent-model-title">{v.model}</h3>

                <div className="recent-specs-line">
                  <div className="recent-spec-item">
                    <Fuel size={13} className="spec-icon" />
                    <span>{v.fuel}</span>
                  </div>
                  <div className="recent-spec-item">
                    <Gauge size={13} className="spec-icon" />
                    <span>{v.km}</span>
                  </div>
                  <div className="recent-spec-item">
                    <MapPin size={13} className="spec-icon" />
                    <span>{v.location.split(' ')[0]}</span>
                  </div>
                </div>

                <div className="recent-card-footer">
                  <div className="recent-price-wrap">
                    <span className="recent-price-label">Starting Bid</span>
                    <span className="recent-price-val">{formatCurrency(v.startingBid)}</span>
                  </div>

                  <button
                    type="button"
                    className="btn-recent-view"
                    onClick={() => onViewVehicle(v)}
                    id={`btn-view-${v.id}`}
                  >
                    <span>View Vehicle</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
