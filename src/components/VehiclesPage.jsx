import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  X,
  ArrowRight,
  Heart,
  Fuel,
  Gauge,
  MapPin,
  Settings2,
  RotateCcw,
  IndianRupee
} from 'lucide-react';
import VehicleCard from './VehicleCard';

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

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const makesList = ['All', 'Land Rover', 'Porsche', 'Mercedes-Benz', 'BMW', 'Audi', 'Lexus', 'Toyota', 'Hyundai'];

  return (
    <div className="salvex-marketplace-page" style={{ paddingBottom: '60px' }}>
      {/* Breadcrumb */}
      <nav className="minimal-breadcrumb-nav" aria-label="Breadcrumb">
        <div className="minimal-page-container">
          <div className="breadcrumb-inner-row">
            <button type="button" onClick={onNavigateHome} className="crumb-btn">
              Home
            </button>
            <span className="crumb-slash">/</span>
            <span className="crumb-active">Find Your Next Vehicle</span>
          </div>
        </div>
      </nav>

      <div className="minimal-page-container" style={{ marginTop: '24px' }}>
        {/* Page Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '32px', lineHeight: '40px', fontWeight: '800', color: '#0B1220', margin: 0 }}>
              Find Your Next Vehicle
            </h1>
          </div>

          {/* Quick Stats Pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#0B1220', backgroundColor: '#FFFFFF', padding: '6px 14px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              Showing <strong>{filteredVehicles.length}</strong> of {vehicles.length} Vehicles
            </span>
            <button
              type="button"
              className="btn-outline-action mobile-filter-btn"
              onClick={() => setMobileFilterOpen(true)}
              style={{ display: 'none' }}
            >
              <Filter size={14} /> Filter ({activeFilterCount})
            </button>
          </div>
        </div>

        {/* Search Bar & Sort Row */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
          <div style={{ flex: 1, minWidth: '280px', position: 'relative' }}>
            <Search size={16} color="#64748B" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search by Make, Model, Location, or Fuel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                height: '44px',
                paddingLeft: '40px',
                paddingRight: '14px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                borderRadius: '8px',
                fontSize: '13.5px',
                color: '#0B1220',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12.5px', color: '#64748B', fontWeight: '500' }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                height: '44px',
                padding: '0 12px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                color: '#0B1220',
                outline: 'none',
                cursor: 'pointer'
              }}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: '600' }}>Active Filters:</span>
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
              style={{ background: 'none', border: 'none', color: '#DC2626', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <RotateCcw size={12} /> Clear All
            </button>
          </div>
        )}

        {/* Main Grid with Sidebar Filter */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px', alignItems: 'start' }}>
          
          {/* DESKTOP FILTER SIDEBAR */}
          <aside style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#0B1220', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Filter size={15} color="#DC2626" /> Filter Vehicles
              </span>
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={handleClearAllFilters}
                  style={{ background: 'none', border: 'none', fontSize: '11px', color: '#DC2626', fontWeight: '600', cursor: 'pointer' }}
                >
                  Reset
                </button>
              )}
            </div>

            {/* Auction Status Filter */}
            <div>
              <label style={{ fontSize: '11.5px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                Auction Status
              </label>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {['All', 'LIVE', 'NEW'].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setSelectedStatus(status)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      border: '1px solid',
                      borderColor: selectedStatus === status ? '#0B1220' : '#E2E8F0',
                      backgroundColor: selectedStatus === status ? '#0B1220' : '#F8FAFC',
                      color: selectedStatus === status ? '#FFFFFF' : '#334155',
                      fontSize: '11.5px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    {status === 'LIVE' ? '🔴 Live Auction' : status === 'NEW' ? '🔵 Recently Added' : 'All'}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget / Price Range Filter */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '11.5px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <IndianRupee size={12} color="#DC2626" /> Budget / Price
                </label>
                {selectedBudget !== 'All' && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedBudget('All');
                      setCustomMin('');
                      setCustomMax('');
                    }}
                    style={{ background: 'none', border: 'none', fontSize: '11px', color: '#DC2626', fontWeight: '600', cursor: 'pointer', padding: 0 }}
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Quick Pills */}
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '8px' }}>
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
                    style={{
                      padding: '3px 7px',
                      borderRadius: '5px',
                      border: '1px solid',
                      borderColor: selectedBudget === tier.id ? '#0B1220' : '#E2E8F0',
                      backgroundColor: selectedBudget === tier.id ? '#0B1220' : '#F8FAFC',
                      color: selectedBudget === tier.id ? '#FFFFFF' : '#334155',
                      fontSize: '11px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>

              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                style={{
                  width: '100%',
                  height: '36px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  padding: '0 8px',
                  fontSize: '12.5px',
                  color: '#0B1220',
                  backgroundColor: '#FFFFFF',
                  cursor: 'pointer'
                }}
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
                <div style={{ marginTop: '8px', padding: '10px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '4px' }}>
                    <div>
                      <span style={{ fontSize: '10.5px', fontWeight: '600', color: '#64748B', display: 'block', marginBottom: '3px' }}>Min Price (₹)</span>
                      <input
                        type="number"
                        placeholder="e.g. 1000000"
                        value={customMin}
                        onChange={(e) => setCustomMin(e.target.value)}
                        style={{
                          width: '100%',
                          height: '32px',
                          borderRadius: '6px',
                          border: '1px solid #CBD5E1',
                          padding: '0 6px',
                          fontSize: '11.5px',
                          backgroundColor: '#FFFFFF',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                    <div>
                      <span style={{ fontSize: '10.5px', fontWeight: '600', color: '#64748B', display: 'block', marginBottom: '3px' }}>Max Price (₹)</span>
                      <input
                        type="number"
                        placeholder="e.g. 5000000"
                        value={customMax}
                        onChange={(e) => setCustomMax(e.target.value)}
                        style={{
                          width: '100%',
                          height: '32px',
                          borderRadius: '6px',
                          border: '1px solid #CBD5E1',
                          padding: '0 6px',
                          fontSize: '11.5px',
                          backgroundColor: '#FFFFFF',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>
                  <span style={{ fontSize: '10.5px', color: '#94A3B8' }}>Filters in real-time by current/start bid</span>
                </div>
              )}
            </div>

            {/* Make Filter */}
            <div>
              <label style={{ fontSize: '11.5px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                Make / Manufacturer
              </label>
              <select
                value={selectedMake}
                onChange={(e) => setSelectedMake(e.target.value)}
                style={{ width: '100%', height: '36px', borderRadius: '6px', border: '1px solid #CBD5E1', padding: '0 8px', fontSize: '12.5px', color: '#0B1220' }}
              >
                {makesList.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Fuel Filter */}
            <div>
              <label style={{ fontSize: '11.5px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                Fuel Type
              </label>
              <select
                value={selectedFuel}
                onChange={(e) => setSelectedFuel(e.target.value)}
                style={{ width: '100%', height: '36px', borderRadius: '6px', border: '1px solid #CBD5E1', padding: '0 8px', fontSize: '12.5px', color: '#0B1220' }}
              >
                <option value="All">All Fuels</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
            </div>

            {/* Condition Filter */}
            <div>
              <label style={{ fontSize: '11.5px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                Condition &amp; Inspection
              </label>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                style={{ width: '100%', height: '36px', borderRadius: '6px', border: '1px solid #CBD5E1', padding: '0 8px', fontSize: '12.5px', color: '#0B1220' }}
              >
                <option value="All">All Conditions</option>
                <option value="Good">Good Condition</option>
                <option value="Inspected">Certified Inspected</option>
              </select>
            </div>
          </aside>

          {/* VEHICLE GRID (3-Column Desktop) */}
          <div>
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
    </div>
  );
}
