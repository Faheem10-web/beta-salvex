import React from 'react';
import {
  Heart,
  MapPin,
  Fuel,
  Gauge,
  FileCheck,
  Shield,
  ArrowRight,
  Settings2
} from 'lucide-react';
import VehicleCard from './VehicleCard';

export default function RecentlyAddedVehicles({
  vehicles = [],
  onViewDetails,
  savedIds = [],
  onToggleSave,
  onViewAll
}) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <section className="salvex-section salvex-recent-section" id="recently-added">
      <div className="section-container">
        {/* Section Header Centered */}
        <div className="section-header-centered">
          <h2 className="section-title">Recently Added Vehicles</h2>
        </div>

        {/* 3 Premium Vehicle Cards */}
        <div className="recent-cards-grid">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              isSaved={savedIds.includes(vehicle.id)}
              onToggleSave={onToggleSave}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>

        {/* Bottom Centered Action Button below cards */}
        <div className="live-bottom-action-wrap" style={{ marginTop: '36px' }}>
          <button
            type="button"
            className="btn-view-all-live-cta"
            onClick={onViewAll}
            id="btn-view-all-recently-added"
          >
            <span>View All Vehicles</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
