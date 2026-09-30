import React from 'react';
import {
  Car,
  LayoutGrid,
  MapPin,
  Calendar,
  Tag,
  ArrowRight,
  ChevronDown
} from 'lucide-react';

export default function SearchPanel({
  onSearch,
  activeTab = 'search',
  onTabChange,
  filters,
  onFilterChange
}) {
  const tabs = [
    { id: 'search', label: 'Search Vehicles' },
    { id: 'live', label: 'Live Auctions' },
    { id: 'upcoming', label: 'Upcoming Auctions' }
  ];

  const makes = [
    'All Makes',
    'Porsche',
    'Mercedes-Benz',
    'Land Rover',
    'BMW',
    'Audi',
    'Toyota',
    'Volvo'
  ];

  const vehicleTypes = [
    'All Types',
    'Luxury & Exotics',
    'SUVs & 4x4',
    'Executive Sedans',
    'Insurance Salvage',
    'Bank Repossessed'
  ];

  const locations = [
    'All Locations',
    'Mumbai Central',
    'Delhi NCR',
    'Bengaluru South',
    'Hyderabad Hub',
    'Chennai Harbour',
    'Pune Regional'
  ];

  const years = [
    'Any Year',
    '2024',
    '2023',
    '2022',
    '2021',
    '2020 & Older'
  ];

  const priceRanges = [
    'Any Price',
    'Under ₹25 Lakh',
    '₹25L - ₹50 Lakh',
    '₹50L - ₹1 Crore',
    '₹1 Crore - ₹2 Crore',
    'Above ₹2 Crore'
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(filters, activeTab);
    }
  };

  return (
    <div className="search-panel-anchor-wrapper" id="auction-search-panel">
      <div className="search-panel-container search-panel-white">
        {/* Top Tabs Bar */}
        <div className="search-panel-tabs-bar" role="tablist">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onTabChange && onTabChange(tab.id)}
                className={`search-tab-pill-btn ${isActive ? 'search-tab-pill-active' : ''}`}
                id={`search-tab-${tab.id}`}
              >
                <span>{tab.label}</span>
                {isActive && <span className="search-tab-pill-underline" />}
              </button>
            );
          })}
        </div>

        {/* Search Controls Form */}
        <form className="search-panel-white-form" onSubmit={handleFormSubmit}>
          <div className="search-white-grid">
            {/* 1. Make / Model */}
            <div className="search-white-card">
              <Car size={18} className="search-white-icon" />
              <div className="search-white-content">
                <span className="search-white-label">Make / Model</span>
                <span className="search-white-value">{filters.make || 'All Makes'}</span>
              </div>
              <ChevronDown size={14} className="search-white-chevron" />
              <select
                id="select-make"
                value={filters.make || 'All Makes'}
                onChange={(e) => onFilterChange('make', e.target.value)}
                className="search-white-native-select"
                aria-label="Make / Model"
              >
                {makes.map((mk) => (
                  <option key={mk} value={mk}>
                    {mk}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Vehicle Type */}
            <div className="search-white-card">
              <LayoutGrid size={18} className="search-white-icon" />
              <div className="search-white-content">
                <span className="search-white-label">Vehicle Type</span>
                <span className="search-white-value">{filters.vehicleType || 'All Types'}</span>
              </div>
              <ChevronDown size={14} className="search-white-chevron" />
              <select
                id="select-vehicle-type"
                value={filters.vehicleType || 'All Types'}
                onChange={(e) => onFilterChange('vehicleType', e.target.value)}
                className="search-white-native-select"
                aria-label="Vehicle Type"
              >
                {vehicleTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Location */}
            <div className="search-white-card">
              <MapPin size={18} className="search-white-icon" />
              <div className="search-white-content">
                <span className="search-white-label">Location</span>
                <span className="search-white-value">{filters.location || 'All Locations'}</span>
              </div>
              <ChevronDown size={14} className="search-white-chevron" />
              <select
                id="select-location"
                value={filters.location || 'All Locations'}
                onChange={(e) => onFilterChange('location', e.target.value)}
                className="search-white-native-select"
                aria-label="Location"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Year */}
            <div className="search-white-card">
              <Calendar size={18} className="search-white-icon" />
              <div className="search-white-content">
                <span className="search-white-label">Year</span>
                <span className="search-white-value">{filters.year || 'Any Year'}</span>
              </div>
              <ChevronDown size={14} className="search-white-chevron" />
              <select
                id="select-year"
                value={filters.year || 'Any Year'}
                onChange={(e) => onFilterChange('year', e.target.value)}
                className="search-white-native-select"
                aria-label="Year"
              >
                {years.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            </div>

            {/* 5. Price Range */}
            <div className="search-white-card">
              <Tag size={18} className="search-white-icon" />
              <div className="search-white-content">
                <span className="search-white-label">Price Range</span>
                <span className="search-white-value">{filters.priceRange || 'Any Price'}</span>
              </div>
              <ChevronDown size={14} className="search-white-chevron" />
              <select
                id="select-price"
                value={filters.priceRange || 'Any Price'}
                onChange={(e) => onFilterChange('priceRange', e.target.value)}
                className="search-white-native-select"
                aria-label="Price Range"
              >
                {priceRanges.map((pr) => (
                  <option key={pr} value={pr}>
                    {pr}
                  </option>
                ))}
              </select>
            </div>

            {/* 6. Primary Action Button */}
            <button
              type="submit"
              className="btn-search-white-submit"
              id="search-panel-submit-btn"
            >
              <span>Search Vehicles</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
