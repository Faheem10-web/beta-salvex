import React from 'react';
import { ArrowRight, Building2, TrendingUp, Users, CheckSquare, Sparkles } from 'lucide-react';

export default function SellerCta({ onListClick }) {
  return (
    <section className="salvex-seller-cta-section" id="seller-cta">
      <div className="section-container">
        <div className="seller-cta-card">
          <div className="seller-cta-grid">
            <div className="seller-cta-left">
              <div className="seller-eyebrow">
                <Sparkles size={14} className="seller-sparkle" />
                <span>FOR FINANCIAL INSTITUTIONS, CORPORATES & INDIVIDUAL SELLERS</span>
              </div>

              <h2 className="seller-heading">Have a Vehicle to Sell?</h2>

              <p className="seller-text">
                List your vehicle and reach verified buyers through the Salvex Auction platform.
                Maximize liquidation values with transparent competitive bidding and rapid settlement cycles.
              </p>

              <div className="seller-metrics-row">
                <div className="seller-metric-item">
                  <div className="seller-metric-val">72h</div>
                  <div className="seller-metric-label">Average Listing to Auction</div>
                </div>
                <div className="seller-metric-item">
                  <div className="seller-metric-val">94%</div>
                  <div className="seller-metric-label">Liquidation Clearance Rate</div>
                </div>
                <div className="seller-metric-item">
                  <div className="seller-metric-val">25K+</div>
                  <div className="seller-metric-label">Active Verified Bidders</div>
                </div>
              </div>

              <div className="seller-action-wrap">
                <button
                  type="button"
                  className="btn-primary btn-large"
                  onClick={onListClick}
                  id="btn-seller-list"
                >
                  <span>List Your Vehicle</span>
                  <ArrowRight size={18} className="btn-arrow" />
                </button>
              </div>
            </div>

            <div className="seller-cta-right">
              <div className="seller-types-box">
                <h4 className="seller-types-title">Consignment Categories Welcomed:</h4>
                <ul className="seller-types-list">
                  <li>
                    <span className="seller-dot" />
                    <div>
                      <strong>Banks & NBFCs:</strong> Repossessed assets, NPA loan recoveries, fleet liquidations.
                    </div>
                  </li>
                  <li>
                    <span className="seller-dot" />
                    <div>
                      <strong>Insurance Companies:</strong> Total loss, constructive total loss, salvage & repairable vehicles.
                    </div>
                  </li>
                  <li>
                    <span className="seller-dot" />
                    <div>
                      <strong>Corporate & Lease Fleets:</strong> Off-lease executive sedans, utility SUVs, commercial haulers.
                    </div>
                  </li>
                  <li>
                    <span className="seller-dot" />
                    <div>
                      <strong>Individual Sellers & Dealers:</strong> Premium & exotic vehicles with verified titles.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
