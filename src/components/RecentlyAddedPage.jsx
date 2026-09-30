import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Fuel,
  Gauge,
  MapPin,
  Heart,
  ArrowRight,
  ShieldCheck,
  Search
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
    </div>
  );
}
