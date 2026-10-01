import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Fuel,
  Gauge,
  MapPin,
  Heart,
  ArrowRight,
  ShieldCheck,
  Search,
  Filter,
  X,
  RotateCcw
} from 'lucide-react';
import VehicleCard from './VehicleCard';

export default function RecentlyAddedPage({
  vehicles = [],
  savedIds = [],
  onToggleSave,
  onViewDetails
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMake, setSelectedMake] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const activeFilterCount = [
    selectedMake !== 'All',
    sortBy !== 'newest',
    searchQuery.trim().length > 0
  ].filter(Boolean).length;

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedMake('All');
    setSortBy('newest');
  };

  const filtered = useMemo(() => {
    return vehicles.filter((v) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          v.make?.toLowerCase().includes(q) ||
          v.model?.toLowerCase().includes(q) ||
          v.location?.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (selectedMake !== 'All' && v.make !== selectedMake) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'lowest-price') {
        return (a.startingBid || 0) - (b.startingBid || 0);
      }
      if (sortBy === 'highest-price') {
        return (b.startingBid || 0) - (a.startingBid || 0);
      }
      return (b.yearMfg || 0) - (a.yearMfg || 0);
    });
  }, [vehicles, searchQuery, selectedMake, sortBy]);

  const makes = ['All', ...new Set(vehicles.map((v) => v.make))];

  const formatCurrency = (amt) => {
    return '₹' + Number(amt || 0).toLocaleString('en-IN');
  };

  return (
    <div className="salvex-recently-added-page">
      {/* 01 HEADER WITH BACKGROUND IMAGE */}
      <section className="recently-hero">
        <div className="recently-hero-backdrop" aria-hidden="true">
          <img
            src="https://i.pinimg.com/1200x/1a/33/2f/1a332f7bcb1bc2721aaa5bf3c4e977e1.jpg"
            alt="Recently Added Vehicles Fleet Background"
            className="recently-hero-bg-img"
            loading="eager"
          />
          <div className="recently-hero-overlay" />
        </div>
        <div className="salvex-container">
          <div className="recently-hero-inner">
            <h1 className="recently-title">Recently Added Vehicles</h1>
            <p className="recently-subtitle">
              Newly catalogued inventory verified and prepared for upcoming and scheduled live auctions across India.
            </p>
          </div>
        </div>
      </section>

      {/* 02 CONTROLS */}
      <section className="recently-controls">
        <div className="salvex-container">
          {/* Quick Stats Pill & Mobile Filter Trigger */}
          <div className="card-page-header-actions">
            <span className="card-page-stats-pill">
              Showing <strong>{filtered.length}</strong> of {vehicles.length} Vehicles
            </span>
            <button
              type="button"
              className={`card-page-filter-btn ${activeFilterCount > 0 ? 'has-filters' : ''}`}
              onClick={() => setMobileFilterOpen(true)}
              aria-label="Open Filters"
            >
              <Filter size={14} />
              <span>Filter</span>
              {activeFilterCount > 0 && (
                <span className="filter-badge-count">{activeFilterCount}</span>
              )}
            </button>
          </div>

          <div className="recently-controls-wrap">
            <div className="recently-search">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search new arrivals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="recently-filters">
              <div className="filter-item">
                <label>Make:</label>
                <select
                  value={selectedMake}
                  onChange={(e) => setSelectedMake(e.target.value)}
                >
                  {makes.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div className="filter-item">
                <label>Sort By:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Recently Catalogued</option>
                  <option value="lowest-price">Lowest Starting Bid</option>
                  <option value="highest-price">Highest Starting Bid</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 GRID */}
      <section className="recently-grid-section">
        <div className="salvex-container">
          <div className="recently-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {filtered.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                isSaved={savedIds.includes(vehicle.id)}
                onToggleSave={onToggleSave}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        </div>
      </section>

      {/* MOBILE FILTER MODAL SHEET */}
      {mobileFilterOpen && (
        <div className="mobile-filter-modal" role="dialog" aria-modal="true">
          <div
            className="mobile-filter-backdrop"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="mobile-filter-sheet">
            <div className="mobile-sheet-drag-handle" />
            <div className="mobile-sheet-header">
              <span className="mobile-sheet-title">
                <Filter size={16} color="#DC2626" />
                Filter Recently Added
                {activeFilterCount > 0 && (
                  <span className="filter-badge-count">{activeFilterCount}</span>
                )}
              </span>
              <button
                type="button"
                className="mobile-sheet-close-btn"
                onClick={() => setMobileFilterOpen(false)}
                aria-label="Close filters"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mobile-sheet-content">
              {/* Make */}
              <div className="filter-group-block">
                <label className="filter-group-label" style={{ fontWeight: 600, fontSize: '13px', marginBottom: '6px', display: 'block' }}>Make</label>
                <select
                  value={selectedMake}
                  onChange={(e) => setSelectedMake(e.target.value)}
                  className="live-select"
                  style={{ width: '100%', height: '42px' }}
                >
                  {makes.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div className="filter-group-block">
                <label className="filter-group-label" style={{ fontWeight: 600, fontSize: '13px', marginBottom: '6px', display: 'block' }}>Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="live-select"
                  style={{ width: '100%', height: '42px' }}
                >
                  <option value="newest">Recently Catalogued</option>
                  <option value="lowest-price">Lowest Starting Bid</option>
                  <option value="highest-price">Highest Starting Bid</option>
                </select>
              </div>
            </div>

            <div className="mobile-sheet-footer">
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="filter-clear-all-btn"
                  style={{ padding: '0 14px', height: '46px', border: '1px solid #CBD5E1', borderRadius: '10px' }}
                >
                  <RotateCcw size={13} /> Reset
                </button>
              )}
              <button
                type="button"
                className="mobile-apply-btn"
                onClick={() => setMobileFilterOpen(false)}
              >
                Show {filtered.length} {filtered.length === 1 ? 'Vehicle' : 'Vehicles'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
