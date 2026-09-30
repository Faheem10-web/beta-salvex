import React from 'react';
import { UserCheck, Building2, Globe, Sparkles } from 'lucide-react';

export default function PortalBar({
  currentRoute,
  onNavigateRoute,
  onOpenRegister,
  onOpenLogin
}) {
  return (
    <div className="salvex-portal-bar" role="region" aria-label="Commercial Environment Switcher">
      <div className="portal-bar-content">
        <div className="portal-bar-left">
          <span className="portal-badge-mode">
            <span className="portal-pulse-dot" />
            ENTERPRISE PLATFORM DEMO
          </span>
          <span className="portal-bar-divider" />
          <span className="portal-tagline">
            Salvex Commercial Automotive Auction Ecosystem
          </span>
        </div>

        <div className="portal-bar-links">
          {/* Public Portal */}
          <button
            type="button"
            className={`portal-nav-btn ${
              ['home', 'vehicles', 'vehicle-details', 'live-auctions', 'upcoming-auctions', 'recently-added', 'how-it-works', 'bidding-rules', 'about', 'contact', 'faq', 'legal'].includes(currentRoute)
                ? 'portal-nav-btn-active'
                : ''
            }`}
            onClick={() => onNavigateRoute('home')}
            title="Public marketplace, active auctions & vehicle listings"
          >
            <Globe size={13} />
            <span>Public Marketplace</span>
          </button>


          {/* Seller / Consignor Portal */}
          <button
            type="button"
            className={`portal-nav-btn ${
              ['seller-dashboard', 'list-your-vehicle'].includes(currentRoute) ? 'portal-nav-btn-active' : ''
            }`}
            onClick={() => onNavigateRoute('seller-dashboard')}
            title="Consignor & Institutional Seller Portal: Asset Submissions, Approval Queue & Settlements"
          >
            <Building2 size={13} />
            <span>Seller Portal</span>
            <span className="portal-pill-badge">NBFC / Fleet</span>
          </button>

        </div>
      </div>
    </div>
  );
}
