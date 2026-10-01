import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Bell,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Filter,
  Car
} from 'lucide-react';

export default function UpcomingAuctionsPage({
  auctions = [],
  onSetReminder,
  onViewVehicle
}) {
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedMake, setSelectedMake] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [remindedIds, setRemindedIds] = useState([]);

  const filteredAuctions = useMemo(() => {
    return auctions.filter((auc) => {
      if (selectedLocation !== 'All' && !auc.location?.toLowerCase().includes(selectedLocation.toLowerCase())) {
        return false;
      }
      if (selectedMake !== 'All' && !auc.title?.toLowerCase().includes(selectedMake.toLowerCase())) {
        return false;
      }
      if (selectedCategory !== 'All' && !auc.category?.toLowerCase().includes(selectedCategory.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [auctions, selectedLocation, selectedMake, selectedCategory]);

  const handleReminderToggle = (auc) => {
    const isReminded = remindedIds.includes(auc.id);
    if (isReminded) {
      setRemindedIds((prev) => prev.filter((id) => id !== auc.id));
      if (onSetReminder) onSetReminder(`Reminder removed for ${auc.title}`);
    } else {
      setRemindedIds((prev) => [...prev, auc.id]);
      if (onSetReminder) onSetReminder(`SMS & Email reminder set for ${auc.title} on ${auc.auctionDate}`);
    }
  };

  const formatCurrency = (amt) => {
    return '₹' + Number(amt || 0).toLocaleString('en-IN');
  };

  return (
    <div className="salvex-upcoming-auctions-page">
      {/* 01 HERO SECTION WITH BACKGROUND IMAGE */}
      <section className="upcoming-hero">
        <div className="upcoming-hero-backdrop" aria-hidden="true">
          <div className="upcoming-hero-ambient-glow" />
          <img
            src="https://i.pinimg.com/736x/cd/5e/64/cd5e646feb3b79cc1777857873fa18f6.jpg"
            alt="Upcoming Auctions Luxury Wheel"
            className="upcoming-hero-bg-img"
          />
          <div className="upcoming-hero-overlay" />
          <div className="upcoming-hero-top-vignette" />
          <div className="upcoming-hero-bottom-vignette" />
        </div>

        <div className="salvex-container upcoming-hero-content">
          <div className="upcoming-hero-inner">
            <div className="upcoming-hero-text">
              <span className="upcoming-tagline">
                <Calendar size={14} />
                PRE-AUCTION CATALOGUE
              </span>
              <h1 className="upcoming-title">Upcoming Auctions</h1>
              <p className="upcoming-desc">
                Explore scheduled vehicle lots from banks, insurance corporations, and fleet consignors. Register early to inspect in-yard and participate in bidding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 02 FILTERS BAR */}
      <section className="upcoming-filters-bar">
        <div className="salvex-container">
          <div className="upcoming-filters-wrap">
            <div className="filter-group">
              <label>Location / Stockyard:</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="upcoming-select"
              >
                <option value="All">All Yard Hubs</option>
                <option value="Delhi">Delhi NCR Hub</option>
                <option value="Bengaluru">Bengaluru Hub</option>
                <option value="Mumbai">Mumbai Yard</option>
                <option value="Chennai">Chennai Hub</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Make:</label>
              <select
                value={selectedMake}
                onChange={(e) => setSelectedMake(e.target.value)}
                className="upcoming-select"
              >
                <option value="All">All Makes</option>
                <option value="Mercedes">Mercedes-Benz</option>
                <option value="BMW">BMW</option>
                <option value="Audi">Audi</option>
                <option value="Porsche">Porsche</option>
                <option value="Land Rover">Land Rover</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="upcoming-select"
              >
                <option value="All">All Categories</option>
                <option value="Luxury SUVs">Luxury SUVs</option>
                <option value="Luxury Sedans">Luxury Sedans</option>
                <option value="Bank Repossession">Bank Repossession</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* 03 UPCOMING LOTS GRID (SAME UI AS HOME PAGE) */}
      <section className="upcoming-grid-section">
        <div className="salvex-container">
          <div className="upcoming-reference-grid">
            {filteredAuctions.map((auc) => {
              const isReminded = remindedIds.includes(auc.id);
              return (
                <div key={auc.id} className="upcoming-ref-card" id={`upcoming-${auc.id}`}>
                  {/* Left Column: Image Thumbnail */}
                  <div className="upcoming-ref-img-wrap">
                    <img
                      src={auc.image || '/images/bmw-m4.jpg'}
                      alt={auc.title}
                      className="upcoming-ref-img"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = '/images/defender-110.jpg';
                      }}
                    />
                  </div>

                  {/* Right Column: Content */}
                  <div className="upcoming-ref-content">
                    {/* Top Badge */}
                    <div className="upcoming-ref-badge-row">
                      <span className="upcoming-ref-amber-badge">
                        {auc.statusBadge || 'UPCOMING'}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="upcoming-ref-title" title={auc.title}>
                      {auc.title}
                    </h3>

                    {/* 2x2 Meta Details Grid */}
                    <div className="upcoming-ref-meta-grid">
                      <div className="upcoming-ref-meta-cell">
                        <Calendar size={13} className="upcoming-ref-red-icon" />
                        <span>{auc.date || auc.auctionDate || 'Scheduled'}</span>
                      </div>
                      <div className="upcoming-ref-meta-cell">
                        <Clock size={13} className="upcoming-ref-red-icon" />
                        <span>{auc.time || auc.auctionTime || '11:00 AM IST'}</span>
                      </div>
                      <div className="upcoming-ref-meta-cell">
                        <MapPin size={13} className="upcoming-ref-red-icon" />
                        <span className="truncate-text">{auc.location || 'Pan-India Yard'}</span>
                      </div>
                      <div className="upcoming-ref-meta-cell">
                        <Car size={13} className="upcoming-ref-red-icon" />
                        <span>{auc.vehiclesCount || 85} Vehicles</span>
                      </div>
                    </div>

                    {/* Bottom Action: View Auction → & Reminder */}
                    <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', alignItems: 'center' }}>
                      <button
                        type="button"
                        className="btn-upcoming-ref-view"
                        style={{ flex: 1 }}
                        onClick={() => onViewVehicle ? onViewVehicle(auc) : onSetReminder && onSetReminder(`Viewing details for ${auc.title}`)}
                      >
                        <span>View Auction</span>
                        <ArrowRight size={14} className="btn-ref-arrow" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleReminderToggle(auc)}
                        style={{
                          height: '40px',
                          padding: '0 12px',
                          borderRadius: '8px',
                          border: isReminded ? '1px solid #2563EB' : '1px solid #CBD5E1',
                          backgroundColor: isReminded ? '#EFF6FF' : '#FFFFFF',
                          color: isReminded ? '#2563EB' : '#475569',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '12.5px',
                          fontWeight: 600,
                          transition: 'all 0.15s ease',
                          marginTop: '4px'
                        }}
                        title={isReminded ? 'Reminder set' : 'Set reminder'}
                      >
                        {isReminded ? <CheckCircle2 size={14} color="#2563EB" /> : <Bell size={14} />}
                        <span>{isReminded ? 'Set' : 'Alert'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
