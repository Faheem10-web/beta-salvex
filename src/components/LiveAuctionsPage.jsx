import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Flame,
  Heart,
  Gavel,
  ArrowRight,
  ShieldCheck,
  Fuel,
  Gauge,
  MapPin,
  AlertCircle,
  RotateCcw,
  CheckCircle2,
  Car,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  Zap,
  X
} from 'lucide-react';
import VehicleCard from './VehicleCard';

export default function LiveAuctionsPage({
  vehicles = [],
  savedIds = [],
  onToggleSave,
  onViewDetails,
  onPlaceBidQuick
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMake, setSelectedMake] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [sortBy, setSortBy] = useState('ending-soon');

  // Categories list
  const categories = [
    'All',
    'Luxury SUVs',
    'Exotics & Performance',
    'Executive Sedans',
    'Bank Repossessed'
  ];

  // Distinct makes from vehicles
  const makes = ['All', ...new Set(vehicles.map((v) => v.make).filter(Boolean))];
  const locations = ['All', 'Bengaluru', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Chennai', 'Kochi', 'Pune'];

  // Filter only LIVE vehicles or all active auction lots
  const liveVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          v.make?.toLowerCase().includes(q) ||
          v.model?.toLowerCase().includes(q) ||
          v.location?.toLowerCase().includes(q) ||
          v.condition?.toLowerCase().includes(q) ||
          v.category?.toLowerCase().includes(q) ||
          v.id?.toLowerCase().includes(q);
        if (!match) return false;
      }

      // Category Filter
      if (selectedCategory !== 'All') {
        if (selectedCategory === 'Bank Repossessed') {
          const isRepo =
            v.condition?.toLowerCase().includes('repo') ||
            v.source?.toLowerCase().includes('repo') ||
            v.source?.toLowerCase().includes('bank');
          if (!isRepo) return false;
        } else if (v.category !== selectedCategory) {
          return false;
        }
      }

      // Make Filter
      if (selectedMake !== 'All' && v.make !== selectedMake) return false;

      // Location Filter
      if (selectedLocation !== 'All' && !v.location?.toLowerCase().includes(selectedLocation.toLowerCase())) {
        return false;
      }

      // Condition Filter
      if (selectedCondition !== 'All') {
        if (selectedCondition === 'Run & Drive' && !v.condition?.toLowerCase().includes('run')) return false;
        if (selectedCondition === 'Minor Damage' && !v.condition?.toLowerCase().includes('minor') && !v.condition?.toLowerCase().includes('damage')) return false;
        if (selectedCondition === 'Repossessed' && !v.condition?.toLowerCase().includes('repo') && !v.source?.toLowerCase().includes('bank')) return false;
        if (selectedCondition === 'Certified' && !v.condition?.toLowerCase().includes('certified') && !v.condition?.toLowerCase().includes('grade a')) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'lowest-bid') {
        return (a.currentBid || a.startingBid) - (b.currentBid || b.startingBid);
      }
      if (sortBy === 'highest-bid') {
        return (b.currentBid || b.startingBid) - (a.currentBid || a.startingBid);
      }
      if (sortBy === 'most-bids') {
        return (b.bidCount || 0) - (a.bidCount || 0);
      }
      // Default: ending soon
      return (a.endsInSeconds || 999999) - (b.endsInSeconds || 999999);
    });
  }, [vehicles, searchQuery, selectedCategory, selectedMake, selectedLocation, selectedCondition, sortBy]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All' ||
    selectedMake !== 'All' ||
    selectedLocation !== 'All' ||
    selectedCondition !== 'All' ||
    sortBy !== 'ending-soon';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedMake('All');
    setSelectedLocation('All');
    setSelectedCondition('All');
    setSortBy('ending-soon');
  };

  return (
    <div className="salvex-live-auctions-page">
      {/* 01 LUXURY DARK HERO WITH REAL-TIME TELEMETRY */}
      <section className="live-auctions-hero">
        <div className="live-hero-backdrop" aria-hidden="true">
          <picture>
            <source
              media="(max-width: 480px)"
              srcSet="/images/mobile_hero_car.jpg"
            />
            <img
              src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1920&q=80"
              alt="Live Vehicle Auctions Fleet Studio"
              className="live-hero-bg-img"
            />
          </picture>
          <div className="live-hero-overlay" />
          <div className="live-hero-ambient-glow" />
          <div className="live-hero-top-vignette" />
          <div className="live-hero-bottom-vignette" />
        </div>

        <div className="salvex-container live-hero-content">
          <div className="live-hero-inner">
            <div className="live-hero-left">
              <h1 className="live-hero-title">Live Vehicle Auctions</h1>
              <p className="live-hero-subtitle">
                Place transparent bids on verified bank repossessions, insurance salvage, and corporate asset liquidations in live certified online auctions with instant escrow settlement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 02 ADVANCED FILTER & CONTROL CONSOLE */}
      <section className="live-controls-bar">
        <div className="salvex-container">
          <div className="live-controls-panel">
            {/* Quick Category Chips Row */}
            <div className="live-category-pills-row">
              <span className="category-label">Quick Filter:</span>
              <div className="category-pills-scroll">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`live-cat-pill ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat === 'All' ? 'All Lots' : cat}
                    {cat === 'All' && <span className="cat-count">({vehicles.length})</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Interactive Controls Bar */}
            <div className="live-controls-wrap">
              {/* Search Box */}
              <div className="live-search-box">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search live lots by make, model, yard city, VIN..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="live-search-input"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="search-clear-btn"
                    onClick={() => setSearchQuery('')}
                    title="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Dropdowns Console Row */}
              <div className="live-filters-row">
                {/* Make Selector */}
                <div className="filter-select-wrap">
                  <Car size={14} className="filter-inner-icon" />
                  <label htmlFor="filter-make">Make:</label>
                  <select
                    id="filter-make"
                    value={selectedMake}
                    onChange={(e) => setSelectedMake(e.target.value)}
                    className="live-select"
                  >
                    {makes.map((m) => (
                      <option key={m} value={m}>
                        {m === 'All' ? 'All Makes' : m}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Yard Location Selector */}
                <div className="filter-select-wrap">
                  <MapPin size={14} className="filter-inner-icon" />
                  <label htmlFor="filter-hub">Yard Hub:</label>
                  <select
                    id="filter-hub"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="live-select"
                  >
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc === 'All' ? 'All Yards' : loc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Condition Selector */}
                <div className="filter-select-wrap">
                  <ShieldCheck size={14} className="filter-inner-icon" />
                  <label htmlFor="filter-condition">Condition:</label>
                  <select
                    id="filter-condition"
                    value={selectedCondition}
                    onChange={(e) => setSelectedCondition(e.target.value)}
                    className="live-select"
                  >
                    <option value="All">All Conditions</option>
                    <option value="Run & Drive">Run & Drive</option>
                    <option value="Minor Damage">Minor Damage / Scratch</option>
                    <option value="Repossessed">Bank Repossessed</option>
                    <option value="Certified">Certified Grade A</option>
                  </select>
                </div>

                {/* Sort By Selector */}
                <div className="filter-select-wrap sort-wrap">
                  <SlidersHorizontal size={14} className="filter-inner-icon" />
                  <label htmlFor="filter-sort">Sort:</label>
                  <select
                    id="filter-sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="live-select sort-select"
                  >
                    <option value="ending-soon">Ending Soonest</option>
                    <option value="most-bids">Most Active (Bids)</option>
                    <option value="lowest-bid">Lowest Current Bid</option>
                    <option value="highest-bid">Highest Current Bid</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results count & Quick Reset Bar */}
            <div className="live-meta-bar">
              <div className="live-results-count">
                <span className="live-dot-indicator" />
                <span>Showing <strong>{liveVehicles.length}</strong> of <strong>{vehicles.length}</strong> live auction lots</span>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  className="live-reset-filters-btn"
                  onClick={handleResetFilters}
                >
                  <RotateCcw size={13} />
                  <span>Reset All Filters</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 03 ACTIVE LOTS GRID */}
      <section className="live-auction-grid-section">
        <div className="salvex-container">
          {liveVehicles.length === 0 ? (
            <div className="salvex-empty-state">
              <AlertCircle size={44} className="empty-icon text-muted" />
              <h3>No Live Auction Lots Match Your Criteria</h3>
              <p>We couldn't find any vehicles matching your active filters. Try clearing your search keywords or resetting filters.</p>
              <button
                type="button"
                className="salvex-btn salvex-btn-primary"
                onClick={handleResetFilters}
              >
                <RotateCcw size={15} />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            <div className="live-grid-container">
              {liveVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  isSaved={savedIds.includes(vehicle.id)}
                  onToggleSave={onToggleSave}
                  onViewDetails={onViewDetails}
                  onPlaceBid={onPlaceBidQuick || onViewDetails}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 04 INSTITUTIONAL BIDDING ASSURANCE & LEGAL PROTOCOLS */}
      <section className="live-rules-banner">
        <div className="salvex-container">
          <div className="rules-banner-header">
            <div className="rules-banner-title-area">
              <div className="rules-shield-icon-wrap">
                <ShieldCheck size={24} className="text-auction-red" />
              </div>
              <div>
                <h4>Official Salvex Live Auction Protocols & Institutional Assurance</h4>
                <p>All bids submitted are irrevocable legal contracts governed by the SARFAESI Act and Indian Contract Act 1872.</p>
              </div>
            </div>
            <div className="rules-banner-status">
              <span className="escrow-verified-pill">
                <span className="check-dot">✓</span> RBI Authorized Escrow Conduit
              </span>
            </div>
          </div>

          <div className="rules-pillars-grid">
            <div className="rule-pillar-card">
              <div className="pillar-num">01</div>
              <h5>120-Point Yard Verification</h5>
              <p>Every lot undergoes digital OBD diagnostic scans, engine compression check, chassis alignment verification, and flood-damage tests.</p>
            </div>

            <div className="rule-pillar-card">
              <div className="pillar-num">02</div>
              <h5>120s Soft-Snipe Overtime</h5>
              <p>Any competitive bid placed in the final 120 seconds auto-extends the auction clock by 2 minutes, preventing bot sniping and ensuring equal discovery.</p>
            </div>

            <div className="rule-pillar-card">
              <div className="pillar-num">03</div>
              <h5>100% Escrow Protection</h5>
              <p>Earnest Money Deposits (EMD) remain in institutional escrow accounts. Outbid participants receive immediate 100% deposit returns within 24 hours.</p>
            </div>

            <div className="rule-pillar-card">
              <div className="pillar-num">04</div>
              <h5>Clear Title & Interstate NOC</h5>
              <p>Complete documentation guarantee with bank release letters, Form 29/30 transfer sets, and expedited RTO clearance assistance across 28 states.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
