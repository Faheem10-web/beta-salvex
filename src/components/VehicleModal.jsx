import React from 'react';
import {
  X,
  ShieldCheck,
  Check,
  FileText,
  MapPin,
  Calendar,
  Fuel,
  Gauge,
  Sliders,
  Gavel,
  Heart,
  Share2,
  Building,
  CheckCircle2
} from 'lucide-react';

export default function VehicleModal({
  vehicle,
  isOpen,
  onClose,
  onPlaceBid,
  isSaved,
  onToggleSave
}) {
  if (!isOpen || !vehicle) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const specsList = [
    { label: 'Make & Model', value: `${vehicle.make} ${vehicle.model}` },
    { label: 'Year of Mfg', value: vehicle.yearMfg || vehicle.year },
    { label: 'Registration Year', value: vehicle.yearReg || vehicle.year },
    { label: 'Fuel Type', value: vehicle.fuel },
    { label: 'Transmission', value: vehicle.transmission },
    { label: 'Odometer (KM)', value: vehicle.kmDriven || vehicle.km },
    { label: 'RTO Location', value: vehicle.rto || 'Maharashtra (MH-01)' },
    { label: 'RC Status', value: vehicle.rcStatus || 'Original RC Available' },
    { label: 'Inspection Grade', value: vehicle.inspectionScore || '95/100 (Certified)' },
    { label: 'Origin Sourcing', value: vehicle.source || 'Institutional Bank Liquidation' },
    { label: 'Insurance Policy', value: vehicle.insuranceValid || 'Comprehensive valid till 2026' },
    { label: 'Current Location', value: vehicle.location }
  ];

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card modal-detail-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <div className="modal-lot-badge">LOT #{vehicle.id.toUpperCase()}</div>
            <h3 className="modal-title">{vehicle.make} {vehicle.model}</h3>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
            <X size={20} />
          </button>
        </div>

        <div className="modal-detail-scroll-body">
          {/* Main Vehicle Image Display */}
          <div className="detail-media-banner">
            <img src={vehicle.image} alt={vehicle.model} className="detail-hero-image" />
            <div className="detail-badge-strip">
              <span className="badge-live-pulse">
                <span className="pulse-indicator" />
                {vehicle.badge || 'LIVE LOT'}
              </span>
              <span className="badge-score-pill">
                <ShieldCheck size={14} />
                Inspection Score: {vehicle.inspectionScore || '96/100'}
              </span>
            </div>
          </div>

          {/* Pricing & Bidding Summary Bar */}
          <div className="detail-price-bar">
            <div>
              <span className="detail-price-label">Current Highest Bid</span>
              <div className="detail-price-value highlight-red">
                {formatCurrency(vehicle.currentBid || vehicle.startingBid)}
              </div>
            </div>
            <div className="detail-price-right">
              <span className="detail-start-label">Starting Bid: {formatCurrency(vehicle.startingBid)}</span>
              {vehicle.bidCount && (
                <span className="detail-bids-badge">{vehicle.bidCount} Bids Placed</span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="detail-section-block">
            <h4 className="detail-block-title">Vehicle Assessment & Overview</h4>
            <p className="detail-desc-text">
              {vehicle.description ||
                'Inspected by certified automotive engineers. Complete physical verification of chassis, electrical systems, engine compression, and documentation completed.'}
            </p>
          </div>

          {/* Specifications Matrix */}
          <div className="detail-section-block">
            <h4 className="detail-block-title">Key Specifications & Documents</h4>
            <div className="detail-specs-grid">
              {specsList.map((spec) => (
                <div key={spec.label} className="detail-spec-item">
                  <span className="spec-item-label">{spec.label}</span>
                  <span className="spec-item-val">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 150-Point Inspection Highlights */}
          <div className="detail-section-block">
            <h4 className="detail-block-title">150-Point Digital Inspection Audit</h4>
            <div className="inspection-checks-grid">
              <div className="check-item"><CheckCircle2 size={16} className="text-success" /><span>Engine Compression & Fluid Purity: PASS</span></div>
              <div className="check-item"><CheckCircle2 size={16} className="text-success" /><span>Transmission & Drivetrain Response: PASS</span></div>
              <div className="check-item"><CheckCircle2 size={16} className="text-success" /><span>Chassis & Frame Structural Geometry: INTACT</span></div>
              <div className="check-item"><CheckCircle2 size={16} className="text-success" /><span>Electrical & Computer Diagnostic Scan: CLEAR</span></div>
              <div className="check-item"><CheckCircle2 size={16} className="text-success" /><span>Airbags & SRS Module Integrity: VERIFIED</span></div>
              <div className="check-item"><CheckCircle2 size={16} className="text-success" /><span>National RTO Crime & Loan Registry: CLEARED</span></div>
            </div>
          </div>
        </div>

        {/* Modal Bottom CTA Bar */}
        <div className="modal-footer-bar">
          <button
            type="button"
            className={`btn-detail-save ${isSaved ? 'detail-saved-active' : ''}`}
            onClick={() => onToggleSave(vehicle.id)}
          >
            <Heart size={18} fill={isSaved ? '#DC2626' : 'none'} stroke={isSaved ? '#DC2626' : 'currentColor'} />
            <span>{isSaved ? 'Saved to Wishlist' : 'Save Vehicle'}</span>
          </button>

          <button
            type="button"
            className="btn-primary btn-large flex-1"
            onClick={() => {
              onClose();
              onPlaceBid(vehicle);
            }}
          >
            <Gavel size={18} />
            <span>Place Bid Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
