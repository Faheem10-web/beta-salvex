import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function BuyerCta({ onRegisterClick, onExploreClick }) {
  return (
    <section className="salvex-final-cta-section" id="final-cta">
      <div className="section-container">
        <div className="final-cta-card">
          <div className="final-cta-inner">
            <h2 className="final-cta-heading">Ready to Start Bidding?</h2>

            <p className="final-cta-description">
              Register as a bidder, discover vehicles and participate in upcoming auctions.
            </p>

            <div className="final-cta-buttons">
              <button
                type="button"
                className="btn-cta-primary"
                onClick={onRegisterClick}
                id="btn-final-register"
              >
                <span>Register as Bidder</span>
                <ArrowRight size={17} className="btn-arrow" />
              </button>

              <button
                type="button"
                className="btn-cta-secondary"
                onClick={onExploreClick}
                id="btn-final-explore"
              >
                <span>Explore Vehicles</span>
                <ArrowRight size={16} className="btn-arrow" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
