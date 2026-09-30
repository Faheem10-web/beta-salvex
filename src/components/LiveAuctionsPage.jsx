import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Flame,
  Clock,
  Heart,
  Gavel,
  ArrowRight,
  ShieldCheck,
  Fuel,
  Gauge,
  MapPin,
  AlertCircle
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
  const [selectedMake, setSelectedMake] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [sortBy, setSortBy] = useState('ending-soon');

  // Filter only LIVE vehicles or all active auction lots
  const liveVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      // Must be live or active
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          v.make?.toLowerCase().includes(q) ||
          v.model?.toLowerCase().includes(q) ||
          v.location?.toLowerCase().includes(q) ||
          v.condition?.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (selectedMake !== 'All' && v.make !== selectedMake) return false;
      if (selectedLocation !== 'All' && !v.location?.toLowerCase().includes(selectedLocation.toLowerCase())) return false;
      if (selectedCondition !== 'All') {
        if (selectedCondition === 'Minor Damage' && !v.condition?.toLowerCase().includes('minor')) return false;
        if (selectedCondition === 'Repossessed' && !v.condition?.toLowerCase().includes('repossessed')) return false;
        if (selectedCondition === 'Pristine' && !v.condition?.toLowerCase().includes('pristine')) return false;
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
  }, [vehicles, searchQuery, selectedMake, selectedLocation, selectedCondition, sortBy]);

  const makes = ['All', ...new Set(vehicles.map((v) => v.make))];
  const locations = ['All', 'Delhi NCR', 'Bengaluru', 'Mumbai', 'Chennai', 'Hyderabad'];

  const formatCurrency = (amt) => {
    return '₹' + Number(amt || 0).toLocaleString('en-IN');
  };

  const formatCountdown = (secs) => {
    if (!secs || secs <= 0) return 'Ending Soon';
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="salvex-live-auctions-page">
      {/* 01 COMPACT DARK NAVY HERO WITH PREMIUM BACKGROUND IMAGE */}
      <section className="live-auctions-hero">
        <div className="live-hero-backdrop" aria-hidden="true">
          <img
            src="https://i.pinimg.com/736x/77/eb/49/77eb4980f993e40c94d84a56cd0caf91.jpg"
            alt="Live Vehicle Auctions Fleet Studio"
            className="live-hero-bg-img"
          />
          <div className="live-hero-overlay" />
          <div className="live-hero-top-vignette" />
          <div className="live-hero-bottom-vignette" />
        </div>

        <div className="salvex-container live-hero-content">
          <div className="live-hero-inner">
            <div className="live-hero-left">
              <div className="live-realtime-pill">
                <span className="live-pulsing-circle" />
                <span>REAL-TIME BIDDING ACTIVE</span>
                <span className="live-pill-count">({liveVehicles.length} Lots Live)</span>
              </div>
              <h1 className="live-hero-title">Live Auctions</h1>
              <p className="live-hero-subtitle">
                Bid on salvage, damaged, and repossessed vehicles currently available in active, transparent online auctions.
              </p>
            </div>

            <div className="live-hero-stats">
              <div className="hero-stat-card">
                <span className="hero-stat-val">100%</span>
                <span className="hero-stat-lbl">Verified Inventory</span>
              </div>
              <div className="hero-stat-card">
                <span className="hero-stat-val">120s</span>
                <span className="hero-stat-lbl">Anti-Sniping Overtime</span>
              </div>
              <div className="hero-stat-card">
                <span className="hero-stat-val">Escrow</span>
                <span className="hero-stat-lbl">RBI Regulated Conduit</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 CONTROLS & FILTER BAR */}
      <section className="live-controls-bar">
        <div className="salvex-container">
          <div className="live-controls-wrap">
            {/* Search */}
            <div className="live-search-box">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search live lots by make, model, yard location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="live-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="live-filters-row">
              <div className="filter-select-wrap">
                <label>Make:</label>
                <select
                  value={selectedMake}
                  onChange={(e) => setSelectedMake(e.target.value)}
                  className="live-select"
                >
                  {makes.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-select-wrap">
                <label>Yard Hub:</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="live-select"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-select-wrap">
                <label>Condition:</label>
                <select
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="live-select"
                >
                  <option value="All">All Conditions</option>
                  <option value="Minor Damage">Minor Damage / Scratch</option>
                  <option value="Repossessed">Bank Repossessed</option>
                  <option value="Pristine">Certified / Inspected</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="filter-select-wrap sort-wrap">
                <label>Sort:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="live-select sort-select"
                >
                  <option value="ending-soon">Ending Soon</option>
                  <option value="most-bids">Most Active (Bids)</option>
                  <option value="lowest-bid">Lowest Current Bid</option>
                  <option value="highest-bid">Highest Current Bid</option>
                </select>
              </div>
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
              <h3>No Active Live Auctions Found</h3>
              <p>No vehicles currently match your filter selections. Try clearing your filters.</p>
              <button
                type="button"
                className="salvex-btn salvex-btn-primary"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedMake('All');
                  setSelectedLocation('All');
                  setSelectedCondition('All');
                }}
              >
                Reset All Filters
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

      {/* 04 AUCTION BIDDING TRANSPARENCY NOTICE */}
      <section className="live-rules-banner">
        <div className="salvex-container">
          <div className="rules-banner-inner">
            <div className="rules-banner-left">
              <ShieldCheck size={28} className="text-auction-red" />
              <div>
                <h4>Official Salvex Live Auction Protocols</h4>
                <p>All bids submitted are irrevocable legal contracts. Extended overtime applies if competitive bids are entered during the final 60 seconds.</p>
              </div>
            </div>
            <div className="rules-banner-actions">
              <span className="escrow-verified-pill">
                <span className="check-dot">✓</span> RBI Authorized Escrow
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
