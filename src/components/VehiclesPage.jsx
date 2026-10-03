import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Filter,
  X,
  RotateCcw,
  IndianRupee
} from 'lucide-react';
import VehicleCard from './VehicleCard';
import './VehiclesPage.css';

export default function VehiclesPage({
  vehicles = [],
  savedIds = [],
  onToggleSave,
  onViewDetails,
  onNavigateHome,
  _onPlaceBidQuick
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedMake, setSelectedMake] = useState('All');
  const [selectedFuel, setSelectedFuel] = useState('All');
  const [selectedTransmission, setSelectedTransmission] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedBudget, setSelectedBudget] = useState('All');
  const [customMin, setCustomMin] = useState('');
  const [customMax, setCustomMax] = useState('');
  const [sortBy, setSortBy] = useState('ending-soon');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Prevent background scrolling when mobile filter sheet is open
  useEffect(() => {
    if (mobileFilterOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setMobileFilterOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileFilterOpen]);

  // Filter logic
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      // Query match (make, model, location, source)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const textMatch =
          v.make?.toLowerCase().includes(q) ||
          v.model?.toLowerCase().includes(q) ||
          v.location?.toLowerCase().includes(q) ||
          v.fuel?.toLowerCase().includes(q);
        if (!textMatch) return false;
      }

      // Type / Category
      if (selectedType !== 'All') {
        if (selectedType === 'Luxury' && !v.category?.includes('Luxury') && !v.category?.includes('Exotics')) return false;
        if (selectedType === 'SUVs' && !v.category?.includes('SUV')) return false;
        if (selectedType === 'Sedans' && !v.category?.includes('Sedan')) return false;
      }

      // Make
      if (selectedMake !== 'All' && v.make !== selectedMake) return false;

      // Fuel
      if (selectedFuel !== 'All' && !v.fuel?.toLowerCase().includes(selectedFuel.toLowerCase())) return false;

      // Transmission
      if (selectedTransmission !== 'All' && !v.transmission?.toLowerCase().includes(selectedTransmission.toLowerCase())) return false;

      // Condition
      if (selectedCondition !== 'All') {
        if (selectedCondition === 'Good' && !v.condition?.includes('Good')) return false;
        if (selectedCondition === 'Inspected' && !v.condition?.includes('Inspected')) return false;
      }

      // Status
      if (selectedStatus !== 'All') {
        if (selectedStatus === 'LIVE' && v.badge !== 'LIVE') return false;
        if (selectedStatus === 'NEW' && v.badge !== 'NEW') return false;
      }

      // Budget / Price Range
      if (selectedBudget !== 'All') {
        const price = v.currentBid || v.startingBid || 0;
        if (selectedBudget === 'under-15' && price > 1500000) return false;
        if (selectedBudget === '15-35' && (price < 1500000 || price > 3500000)) return false;
        if (selectedBudget === '35-75' && (price < 3500000 || price > 7500000)) return false;
        if (selectedBudget === '75-150' && (price < 7500000 || price > 15000000)) return false;
        if (selectedBudget === 'above-150' && price < 15000000) return false;
        if (selectedBudget === 'custom') {
          const min = customMin !== '' ? parseFloat(customMin) : 0;
          const max = customMax !== '' ? parseFloat(customMax) : Infinity;
          if (!isNaN(min) && price < min) return false;
          if (!isNaN(max) && price > max) return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'lowest-bid') {
        return (a.currentBid || a.startingBid) - (b.currentBid || b.startingBid);
      }
      if (sortBy === 'highest-bid') {
        return (b.currentBid || b.startingBid) - (a.currentBid || a.startingBid);
      }
      if (sortBy === 'recently-added') {
        return b.yearMfg - a.yearMfg;
      }
      // default: ending soon (lowest remaining seconds first)
      return (a.endsInSeconds || 999999) - (b.endsInSeconds || 999999);
    });
  }, [vehicles, searchQuery, selectedType, selectedMake, selectedFuel, selectedTransmission, selectedCondition, selectedStatus, selectedBudget, customMin, customMax, sortBy]);

  const activeFilterCount = [
    selectedType !== 'All',
    selectedMake !== 'All',
    selectedFuel !== 'All',
    selectedTransmission !== 'All',
    selectedCondition !== 'All',
    selectedStatus !== 'All',
    selectedBudget !== 'All'
  ].filter(Boolean).length;

  const handleClearAllFilters = () => {
    setSearchQuery('');
    setSelectedType('All');
    setSelectedMake('All');
    setSelectedFuel('All');
    setSelectedTransmission('All');
    setSelectedCondition('All');
    setSelectedStatus('All');
    setSelectedBudget('All');
    setCustomMin('');
    setCustomMax('');
    setSortBy('ending-soon');
  };

  const makesList = ['All', 'Land Rover', 'Porsche', 'Mercedes-Benz', 'BMW', 'Audi', 'Lexus', 'Toyota', 'Hyundai'];

  // Reusable filter content controls
  const renderFilterContent = () => (
    <>
      <div className="filter-card-header">
        <span className="filter-card-title">
          <Filter size={15} color="#075BFF" /> Filter Vehicles
        </span>
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={handleClearAllFilters}
            className="filter-card-reset-btn"
          >
            Reset All
          </button>
        )}
      </div>

      {/* Auction Status Filter */}
      <div className="filter-group-block">
        <label className="filter-group-label">
          Auction Status
        </label>
        <div className="filter-status-pills">
          {['All', 'LIVE', 'NEW'].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setSelectedStatus(status)}
              className={`filter-status-pill ${selectedStatus === status ? 'active' : ''}`}
            >
              {status === 'LIVE' ? '🔴 Live Auction' : status === 'NEW' ? '🔵 Recently Added' : 'All'}
            </button>
          ))}
        </div>
      </div>

      {/* Budget / Price Range Filter */}
      <div className="filter-group-block">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <label className="filter-group-label" style={{ display: 'flex', alignItems: 'center', gap: '4px', margin: 0 }}>
            <IndianRupee size={12} color="#075BFF" /> Budget / Price
          </label>
          {selectedBudget !== 'All' && (
            <button
              type="button"
              onClick={() => {
                setSelectedBudget('All');
                setCustomMin('');
                setCustomMax('');
              }}
              className="filter-card-reset-btn"
            >
              Reset
            </button>
          )}
        </div>

        {/* Quick Pills */}
        <div className="filter-budget-pills">
          {[
            { id: 'All', label: 'All' },
            { id: 'under-15', label: '< ₹15L' },
            { id: '15-35', label: '₹15-35L' },
            { id: '35-75', label: '₹35-75L' },
            { id: '75-150', label: '₹75L-1.5Cr' },
            { id: 'above-150', label: '> ₹1.5Cr' },
            { id: 'custom', label: 'Custom' }
          ].map((tier) => (
            <button
              key={tier.id}
              type="button"
              onClick={() => setSelectedBudget(tier.id)}
              className={`filter-budget-pill ${selectedBudget === tier.id ? 'active' : ''}`}
            >
              {tier.label}
            </button>
          ))}
        </div>

        <select
          value={selectedBudget}
          onChange={(e) => setSelectedBudget(e.target.value)}
          className="filter-select-input"
        >
          <option value="All">All Budgets (Any Price)</option>
          <option value="under-15">Under ₹15 Lakhs</option>
          <option value="15-35">₹15 Lakhs – ₹35 Lakhs</option>
          <option value="35-75">₹35 Lakhs – ₹75 Lakhs</option>
          <option value="75-150">₹75 Lakhs – ₹1.50 Crore</option>
          <option value="above-150">Above ₹1.50 Crore</option>
          <option value="custom">Custom Range (Enter ₹)</option>
        </select>

        {/* Custom Min / Max Input Fields */}
        {selectedBudget === 'custom' && (
          <div className="filter-custom-range-box">
            <div className="filter-custom-range-inputs">
              <div>
                <span className="filter-custom-input-label">Min Price (₹)</span>
                <input
                  type="number"
                  placeholder="e.g. 1000000"
                  value={customMin}
                  onChange={(e) => setCustomMin(e.target.value)}
                  className="filter-custom-input"
                />
              </div>
              <div>
                <span className="filter-custom-input-label">Max Price (₹)</span>
                <input
                  type="number"
                  placeholder="e.g. 5000000"
                  value={customMax}
                  onChange={(e) => setCustomMax(e.target.value)}
                  className="filter-custom-input"
                />
              </div>
            </div>
            <span className="filter-custom-hint">Filters in real-time by current/start bid</span>
          </div>
        )}
      </div>

      {/* Make Filter */}
      <div className="filter-group-block">
        <label className="filter-group-label">
          Make / Manufacturer
        </label>
        <select
          value={selectedMake}
          onChange={(e) => setSelectedMake(e.target.value)}
          className="filter-select-input"
        >
          {makesList.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Fuel Filter */}
      <div className="filter-group-block">
        <label className="filter-group-label">
          Fuel Type
        </label>
        <select
          value={selectedFuel}
          onChange={(e) => setSelectedFuel(e.target.value)}
          className="filter-select-input"
        >
          <option value="All">All Fuels</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Electric">Electric</option>
        </select>
      </div>

      {/* Condition Filter */}
      <div className="filter-group-block">
        <label className="filter-group-label">
          Condition &amp; Inspection
        </label>
        <select
          value={selectedCondition}
          onChange={(e) => setSelectedCondition(e.target.value)}
          className="filter-select-input"
        >
          <option value="All">All Conditions</option>
          <option value="Good">Good Condition</option>
          <option value="Inspected">Certified Inspected</option>
        </select>
      </div>
    </>
  );

  return (
    <div className="salvex-marketplace-page">
      {/* Breadcrumb */}
      <nav className="minimal-breadcrumb-nav" aria-label="Breadcrumb">
        <div className="vehicles-page-container">
          <div className="breadcrumb-inner-row">
            <button type="button" onClick={onNavigateHome} className="crumb-btn">
              Home
            </button>
            <span className="crumb-slash">/</span>
            <span className="crumb-active">Find Your Next Vehicle</span>
          </div>
        </div>
      </nav>

      <div className="vehicles-page-container">
        {/* Page Header */}
        <div className="vehicles-header-row">
          <div>
            <h1 className="vehicles-page-title">
              Find Your Next Vehicle
            </h1>
          </div>

          {/* Quick Stats Pill & Mobile Filter Trigger */}
          <div className="vehicles-header-actions">
            <span className="vehicles-stats-pill">
              Showing <strong>{filteredVehicles.length}</strong> of {vehicles.length} Vehicles
            </span>
            <button
              type="button"
              className={`mobile-filter-trigger-btn ${activeFilterCount > 0 ? 'has-filters' : ''}`}
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
        </div>

        {/* Search Bar & Sort Row */}
        <div className="vehicles-search-sort-bar">
          <div className="vehicles-search-field-wrap">
            <Search size={16} className="vehicles-search-icon" />
            <input
              type="text"
              placeholder="Search by Make, Model, Location, or Fuel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="vehicles-search-input"
            />
          </div>

          <div className="vehicles-sort-wrap">
            <span className="vehicles-sort-label">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="vehicles-sort-select"
            >
              <option value="ending-soon">Ending Soon</option>
              <option value="recently-added">Recently Added</option>
              <option value="lowest-bid">Lowest Starting Bid</option>
              <option value="highest-bid">Highest Starting Bid</option>
            </select>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFilterCount > 0 && (
          <div className="vehicles-chips-row">
            <span className="vehicles-chips-label">Active Filters:</span>
            {selectedBudget !== 'All' && (
              <span
                className="filter-chip"
                onClick={() => {
                  setSelectedBudget('All');
                  setCustomMin('');
                  setCustomMax('');
                }}
              >
                Budget: {
                  selectedBudget === 'under-15' ? 'Under ₹15 Lakh' :
                  selectedBudget === '15-35' ? '₹15L – ₹35 Lakh' :
                  selectedBudget === '35-75' ? '₹35L – ₹75 Lakh' :
                  selectedBudget === '75-150' ? '₹75L – ₹1.5 Cr' :
                  selectedBudget === 'above-150' ? 'Above ₹1.5 Cr' :
                  `₹${customMin ? Number(customMin).toLocaleString('en-IN') : '0'} – ${customMax ? '₹' + Number(customMax).toLocaleString('en-IN') : 'Any'}`
                } <X size={12} />
              </span>
            )}
            {selectedMake !== 'All' && (
              <span className="filter-chip" onClick={() => setSelectedMake('All')}>
                Make: {selectedMake} <X size={12} />
              </span>
            )}
            {selectedFuel !== 'All' && (
              <span className="filter-chip" onClick={() => setSelectedFuel('All')}>
                Fuel: {selectedFuel} <X size={12} />
              </span>
            )}
            {selectedStatus !== 'All' && (
              <span className="filter-chip" onClick={() => setSelectedStatus('All')}>
                Status: {selectedStatus} <X size={12} />
              </span>
            )}
            {selectedCondition !== 'All' && (
              <span className="filter-chip" onClick={() => setSelectedCondition('All')}>
                Condition: {selectedCondition} <X size={12} />
              </span>
            )}
            <button
              type="button"
              onClick={handleClearAllFilters}
              className="filter-clear-all-btn"
            >
              <RotateCcw size={12} /> Clear All
            </button>
          </div>
        )}

        {/* Main Grid with Sidebar Filter */}
        <div className="vehicles-main-layout">
          {/* DESKTOP FILTER SIDEBAR (Hidden on mobile <= 992px) */}
          <aside className="vehicles-desktop-sidebar">
            {renderFilterContent()}
          </aside>

          {/* VEHICLE GRID */}
          <div style={{ width: '100%', minWidth: 0 }}>
            {filteredVehicles.length === 0 ? (
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '60px 24px', textAlign: 'center' }}>
                <Search size={40} color="#94A3B8" style={{ margin: '0 auto 12px auto' }} />
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0B1220', margin: '0 0 6px 0' }}>
                  No vehicles match your current filters.
                </h3>
                <p style={{ fontSize: '13.5px', color: '#64748B', maxWidth: '380px', margin: '0 auto 20px auto' }}>
                  Try adjusting your search criteria, clearing selected make/fuel filters, or exploring all active inventory.
                </p>
                <button
                  type="button"
                  className="btn-outline-action"
                  onClick={handleClearAllFilters}
                >
                  <RotateCcw size={14} /> Clear All Filters
                </button>
              </div>
            ) : (
              <div className="vehicles-page-grid">
                {filteredVehicles.map((car) => (
                  <VehicleCard
                    key={car.id}
                    vehicle={car}
                    isSaved={savedIds.includes(car.id)}
                    onToggleSave={onToggleSave}
                    onViewDetails={onViewDetails}
                    onPlaceBid={_onPlaceBidQuick || onViewDetails}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE FILTER BOTTOM SHEET / DRAWER */}
      {mobileFilterOpen && (
        <div className="mobile-filter-overlay" onClick={() => setMobileFilterOpen(false)}>
          <div
            className="mobile-filter-sheet"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="mobile-sheet-drag-handle" />
            <div className="mobile-sheet-header">
              <span className="mobile-sheet-title">
                <Filter size={16} color="#075BFF" /> Filter Vehicles
                {activeFilterCount > 0 && (
                  <span className="filter-badge-count" style={{ backgroundColor: '#075BFF', color: '#FFFFFF' }}>
                    {activeFilterCount}
                  </span>
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
              {renderFilterContent()}
            </div>

            <div className="mobile-sheet-footer">
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={handleClearAllFilters}
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
                Show {filteredVehicles.length} {filteredVehicles.length === 1 ? 'Vehicle' : 'Vehicles'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
