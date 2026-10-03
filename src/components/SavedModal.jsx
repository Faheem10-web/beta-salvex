import React from 'react';
import { X, Heart, Trash2, Gavel, ExternalLink, ArrowRight } from 'lucide-react';

export default function SavedModal({
  isOpen,
  onClose,
  savedVehicles,
  onRemoveSaved,
  onPlaceBid,
  onViewDetails
}) {
  if (!isOpen) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card modal-saved-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-row">
            <div className="modal-icon-bubble">
              <Heart size={20} fill="#DC2626" color="#DC2626" />
            </div>
            <div>
              <h3 className="modal-title">Saved Vehicles ({savedVehicles.length})</h3>
              <p className="modal-subtitle">Your shortlisted lots currently under watch</p>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
            <X size={20} />
          </button>
        </div>

        <div className="modal-saved-body">
          {savedVehicles.length === 0 ? (
            <div className="saved-empty-state">
              <Heart size={44} className="text-muted" />
              <h4 className="empty-title">No Saved Vehicles Yet</h4>
              <p className="empty-sub">
                Click the heart icon on any vehicle card to add it to your watchlist for quick access and live price tracking.
              </p>
            </div>
          ) : (
            <div className="saved-items-list">
              {savedVehicles.map((vehicle) => (
                <div key={vehicle.id} className="saved-item-row">
                  <img src={vehicle.image} alt={vehicle.model} className="saved-item-thumb" />

                  <div className="saved-item-info">
                    <h4 className="saved-item-title">{vehicle.make} {vehicle.model}</h4>
                    <div className="saved-item-meta">
                      <span>{vehicle.yearMfg || vehicle.year}</span> • <span>{vehicle.fuel}</span> • <span>{vehicle.location.split(' ')[0]}</span>
                    </div>
                    <div className="saved-item-price">
                      Current Bid: <strong>{formatCurrency(vehicle.currentBid || vehicle.startingBid)}</strong>
                    </div>
                  </div>

                  <div className="saved-item-actions">
                    <button
                      type="button"
                      className="btn-card-bid btn-compact"
                      onClick={() => {
                        onClose();
                        onPlaceBid(vehicle);
                      }}
                    >
                      <Gavel size={14} />
                      <span>Bid</span>
                    </button>

                    <button
                      type="button"
                      className="btn-card-details btn-compact"
                      onClick={() => {
                        onClose();
                        onViewDetails(vehicle);
                      }}
                    >
                      <span>Details</span>
                    </button>

                    <button
                      type="button"
                      className="btn-remove-saved"
                      onClick={() => onRemoveSaved(vehicle.id)}
                      title="Remove from saved"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
