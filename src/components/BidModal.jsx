import React, { useState } from 'react';
import { X, Gavel, ShieldCheck, AlertCircle, CheckCircle2, IndianRupee } from 'lucide-react';

export default function BidModal({ vehicle, isOpen, onClose, onConfirmBid }) {
  const currentBid = vehicle?.currentBid || vehicle?.startingBid || 0;
  const minIncrement = 25000;
  const [bidAmount, setBidAmount] = useState(currentBid + minIncrement);
  const [agreed, setAgreed] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || !vehicle) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleIncrement = (inc) => {
    setBidAmount(currentBid + inc);
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bidAmount <= currentBid) {
      setErrorMsg(`Your bid must be greater than current bid ${formatCurrency(currentBid)}`);
      return;
    }
    if (!agreed) {
      setErrorMsg('Please confirm agreement to Salvex auction bidding terms');
      return;
    }

    setIsSuccess(true);
    setTimeout(() => {
      onConfirmBid(vehicle.id, bidAmount);
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card modal-bid-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-row">
            <div className="modal-icon-bubble">
              <Gavel size={20} className="text-auction-red" />
            </div>
            <div>
              <h3 className="modal-title">Place Live Bid</h3>
              <p className="modal-subtitle">Lot #{vehicle.id.toUpperCase()} • {vehicle.make} {vehicle.model}</p>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
            <X size={20} />
          </button>
        </div>

        {isSuccess ? (
          <div className="bid-success-content">
            <CheckCircle2 size={52} className="text-success" />
            <h4 className="success-heading">Bid Placed Successfully!</h4>
            <p className="success-text">
              Your bid of <strong>{formatCurrency(bidAmount)}</strong> has been registered on the live blockchain ledger.
            </p>
          </div>
        ) : (
          <form className="modal-body-form" onSubmit={handleSubmit}>
            {/* Vehicle Mini Summary */}
            <div className="modal-vehicle-summary">
              <img src={vehicle.image} alt={vehicle.model} className="summary-thumb" />
              <div className="summary-info">
                <div className="summary-title">{vehicle.make} {vehicle.model}</div>
                <div className="summary-tags">
                  <span>{vehicle.yearMfg}</span> • <span>{vehicle.fuel}</span> • <span>{vehicle.kmDriven}</span>
                </div>
                <div className="summary-location">{vehicle.location}</div>
              </div>
            </div>

            {/* Current Price Box */}
            <div className="modal-prices-grid">
              <div className="modal-price-box">
                <span className="price-box-label">Starting Bid</span>
                <span className="price-box-value">{formatCurrency(vehicle.startingBid)}</span>
              </div>
              <div className="modal-price-box price-box-active">
                <span className="price-box-label">Current Highest Bid</span>
                <span className="price-box-value highlight-red">{formatCurrency(currentBid)}</span>
              </div>
            </div>

            {/* Quick Increment Buttons */}
            <div className="quick-increments-section">
              <label className="increment-label">Quick Bid Increments (+ over current bid):</label>
              <div className="increment-buttons-row">
                {[25000, 50000, 100000, 250000].map((inc) => (
                  <button
                    key={inc}
                    type="button"
                    className={`btn-increment-chip ${bidAmount === currentBid + inc ? 'chip-active' : ''}`}
                    onClick={() => handleIncrement(inc)}
                  >
                    +₹{(inc / 1000).toLocaleString('en-IN')}K
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Bid Input */}
            <div className="custom-bid-group">
              <label htmlFor="custom-bid-input" className="field-label">
                Enter Your Maximum Bid (INR)
              </label>
              <div className="currency-input-wrap">
                <span className="rupee-symbol">₹</span>
                <input
                  id="custom-bid-input"
                  type="number"
                  min={currentBid + 1000}
                  step={5000}
                  value={bidAmount}
                  onChange={(e) => {
                    setBidAmount(Number(e.target.value));
                    setErrorMsg('');
                  }}
                  className="bid-number-input"
                />
              </div>
              <span className="field-hint">
                Minimum valid increment is ₹10,000 above the highest live bid.
              </span>
            </div>

            {errorMsg && (
              <div className="modal-error-alert">
                <AlertCircle size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Terms checkbox */}
            <label className="modal-terms-checkbox">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span>
                I agree that this bid is legally binding under the Salvex Auction Buyer Agreement,
                and sufficient deposit balance is maintained.
              </span>
            </label>

            {/* Submit CTA */}
            <div className="modal-actions-row">
              <button type="button" className="btn-modal-cancel" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-primary flex-1 btn-large">
                <Gavel size={18} />
                <span>Submit Bid: {formatCurrency(bidAmount)}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
