import React, { useState } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';

export default function SearchModal({
  isOpen,
  onClose,
  allVehicles = [],
  onSelectVehicle
}) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = allVehicles.filter((v) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      v.make.toLowerCase().includes(q) ||
      v.model.toLowerCase().includes(q) ||
      (v.category && v.category.toLowerCase().includes(q)) ||
      (v.condition && v.condition.toLowerCase().includes(q)) ||
      (v.location && v.location.toLowerCase().includes(q)) ||
      (v.source && v.source.toLowerCase().includes(q))
    );
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card modal-search-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-search-input-row">
          <Search size={22} className="text-auction-red search-input-icon" />
          <input
            type="text"
            autoFocus
            placeholder="Search make, model, category, location, or lot number (e.g. Porsche, Defender, Bank Repo)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-large-input"
          />
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close search">
            <X size={20} />
          </button>
        </div>

        <div className="search-results-summary">
          <span>Found {filtered.length} matching vehicle{filtered.length === 1 ? '' : 's'}</span>
          <span className="search-hint">Press ESC to exit</span>
        </div>

        <div className="search-results-scroll">
          {filtered.length === 0 ? (
            <div className="search-no-results">
              <p>No vehicles match &ldquo;{query}&rdquo;.</p>
              <p className="sub-hint">Try searching for &quot;Porsche&quot;, &quot;Mercedes&quot;, &quot;Defender&quot;, &quot;BMW&quot;, or &quot;Salvage&quot;.</p>
            </div>
          ) : (
            <div className="search-results-grid">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="search-result-item"
                  onClick={() => {
                    onClose();
                    onSelectVehicle(item);
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <img src={item.image} alt={item.model} className="search-result-thumb" />
                  <div className="search-result-content">
                    <div className="search-result-header">
                      <span className="search-result-title">{item.make} {item.model}</span>
                      <span className="search-result-price">{formatCurrency(item.currentBid || item.startingBid)}</span>
                    </div>
                    <div className="search-result-tags">
                      <span>{item.yearMfg || item.year}</span> • <span>{item.fuel}</span> • <span>{item.location.split(' ')[0]}</span>
                    </div>
                    <div className="search-result-source">{item.condition || item.source}</div>
                  </div>
                  <ArrowRight size={16} className="search-result-arrow" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
