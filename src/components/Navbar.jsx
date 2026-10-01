import React, { useState, useEffect } from 'react';
import SalvexLogo from './SalvexLogo';
import {
  Search,
  User,
  Heart,
  ArrowRight,
  ChevronDown,
  Truck,
  Headphones,
  Menu,
  X,
  PlusCircle
} from 'lucide-react';
import './Navbar.css';

export default function Navbar({
  activeSection = 'home',
  onNavigate,
  onOpenBidderModal,
  onOpenSellerModal,
  onOpenSearchModal,
  onSearchSubmitQuery,
  savedCount = 0,
  onOpenSavedModal
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('INR ₹');
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const currencies = [
    { code: 'INR', label: 'INR ₹' },
    { code: 'USD', label: 'USD $' },
    { code: 'AED', label: 'AED د.إ' },
    { code: 'EUR', label: 'EUR €' }
  ];

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 20);

      if (mobileMenuOpen) {
        setIsVisible(true);
        return;
      }

      if (currentY < 80) {
        setIsVisible(true);
      } else if (currentY > lastY + 12) {
        setIsVisible(false);
      } else if (currentY < lastY - 12) {
        setIsVisible(true);
      }

      lastY = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'live-auctions', label: 'Live Auctions', isLive: true },
    { id: 'upcoming-auctions', label: 'Upcoming Auctions' },
    { id: 'vehicles', label: 'Vehicles' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleLinkClick = (id) => {
    setIsScrolled(false);
    setIsVisible(true);
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmitQuery) {
      onSearchSubmitQuery(searchQuery);
    } else if (onNavigate) {
      onNavigate('vehicles');
    }
  };

  return (
    <>
      <header
        className={`salvex-master-navbar ${isScrolled ? 'navbar-scrolled' : ''} ${!isVisible ? 'navbar-hidden' : ''}`}
        id="main-navbar"
      >
        {/* ==================================================================
            TIER 0: CRIMSON RED ANNOUNCEMENT BAR
            ================================================================== */}
        <div className="navbar-announcement-bar">
          <div className="salvex-nav-container announcement-container">
            <div className="announcement-left" />

            <div className="announcement-center">
              <Truck size={13} className="announcement-icon" />
              <span>New Arrivals Added Daily &nbsp;|&nbsp; <strong>Register Now to Start Bidding</strong></span>
            </div>

            <div className="announcement-right">
              <Headphones size={13} className="announcement-icon" />
              <span>Need Help? <strong>+91 98765 43210</strong></span>
            </div>
          </div>
        </div>

        {/* ==================================================================
            TIER 1: MAIN BRAND HEADER (WHITE)
            ================================================================== */}
        <div className="navbar-middle-row">
          <div className="salvex-nav-container middle-row-container">
            {/* LEFT: Currency Selector + Search Icon Button */}
            <div className="navbar-left-actions">
              <div className="navbar-currency-wrap">
                <button
                  type="button"
                  className="navbar-currency-btn"
                  onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                  aria-label="Select currency"
                >
                  <span>{selectedCurrency}</span>
                  <ChevronDown size={14} className={`currency-chevron ${currencyDropdownOpen ? 'open' : ''}`} />
                </button>

                {currencyDropdownOpen && (
                  <div className="navbar-currency-dropdown">
                    {currencies.map((curr) => (
                      <button
                        key={curr.code}
                        type="button"
                        className={`currency-option ${selectedCurrency === curr.label ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedCurrency(curr.label);
                          setCurrencyDropdownOpen(false);
                        }}
                      >
                        {curr.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Vertical divider */}
              <div className="navbar-left-divider" aria-hidden="true" />

              {/* Left Search Icon Button (White rounded square with red search icon) */}
              <button
                type="button"
                className="btn-navbar-search-icon"
                onClick={onOpenSearchModal}
                title="Search Vehicles & Inventory"
                aria-label="Search"
                id="navbar-search-btn-left"
              >
                <Search size={18} strokeWidth={2.4} className="navbar-search-red-icon" />
              </button>
            </div>

            {/* CENTER: Salvex Auction Brand Logo */}
            <div
              className="navbar-center-brand"
              onClick={() => handleLinkClick('home')}
              role="button"
              tabIndex={0}
              title="Salvex Auction Home"
            >
              <SalvexLogo variant="light" height={38} />
            </div>

            {/* RIGHT: List Your Vehicle + Wishlist + Login + Register CTA */}
            <div className="navbar-middle-actions">
              {/* List Your Vehicle Button */}
              <button
                type="button"
                className="btn-nav-list-vehicle"
                onClick={onOpenSellerModal}
                id="nav-list-vehicle-btn"
                title="List Your Vehicle for Auction"
              >
                <PlusCircle size={15} strokeWidth={2} />
                <span>List Your Vehicle</span>
              </button>

              {/* Wishlist / Saved Heart Icon */}
              <button
                type="button"
                className="navbar-action-icon-btn"
                onClick={onOpenSavedModal}
                title="Saved Vehicles"
                aria-label="Saved vehicles"
              >
                <Heart size={20} strokeWidth={1.8} />
                {savedCount > 0 && (
                  <span className="navbar-action-badge">{savedCount}</span>
                )}
              </button>

              {/* User Login Icon */}
              <button
                type="button"
                className="navbar-action-icon-btn"
                onClick={onOpenBidderModal}
                title="Account Login"
                aria-label="Account Login"
              >
                <User size={20} strokeWidth={1.8} />
              </button>

              {/* Register as Bidder Red Button */}
              <button
                type="button"
                className="btn-register-red"
                onClick={onOpenBidderModal}
                id="nav-register-cta"
              >
                <span>Register as Bidder</span>
                <ArrowRight size={15} strokeWidth={2.2} />
              </button>
            </div>

            {/* Mobile Top Actions (visible only on mobile) */}
            <div className="navbar-mobile-controls">
              <button
                type="button"
                className="mobile-control-icon"
                onClick={onOpenSearchModal}
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              <button
                type="button"
                className="mobile-control-icon"
                onClick={onOpenSavedModal}
                aria-label="Saved"
              >
                <Heart size={20} />
                {savedCount > 0 && <span className="mobile-badge">{savedCount}</span>}
              </button>

              <button
                type="button"
                className="mobile-control-icon"
                onClick={onOpenBidderModal}
                aria-label="Account Login"
              >
                <User size={20} />
              </button>

              <button
                type="button"
                className="navbar-hamburger-red"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                id="navbar-hamburger"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* ==================================================================
            TIER 2: NAVIGATION LINKS BAR (WHITE WITH BOTTOM BORDER)
            ================================================================== */}
        <div className="navbar-links-row">
          <div className="salvex-nav-container links-row-container">
            <nav className="navbar-links-center" aria-label="Main Navigation">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleLinkClick(item.id)}
                    className={`nav-link-btn ${isActive ? 'nav-link-active' : ''}`}
                    id={`nav-link-${item.id}`}
                  >
                    <span>{item.label}</span>
                    {item.isLive && (
                      <span className="nav-live-capsule">LIVE</span>
                    )}
                    {isActive && <span className="nav-bottom-indicator" />}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* ==================================================================
          MOBILE SLIDE-OUT DRAWER
          ================================================================== */}
      <div
        className={`mobile-menu-backdrop ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <aside
        className={`mobile-drawer ${mobileMenuOpen ? 'mobile-drawer-open' : ''}`}
        aria-label="Mobile Navigation"
      >
        <div className="mobile-drawer-header">
          <SalvexLogo variant="light" height={34} />
          <button
            type="button"
            className="mobile-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mobile-drawer-body">
          <nav className="mobile-nav-list">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`mobile-nav-item ${activeSection === item.id ? 'mobile-nav-active' : ''}`}
              >
                <span className="mobile-nav-label-wrap">
                  <span>{item.label}</span>
                  {item.isLive && <span className="nav-live-capsule">LIVE</span>}
                </span>
                <ArrowRight size={14} className="mobile-nav-chevron" />
              </button>
            ))}
          </nav>

          <div className="mobile-drawer-divider" />

          <div className="mobile-drawer-ctas">
            <button
              type="button"
              className="btn-drawer-outline"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenSellerModal) onOpenSellerModal();
              }}
            >
              <PlusCircle size={15} />
              <span>List Your Vehicle</span>
            </button>

            <button
              type="button"
              className="btn-drawer-outline"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenBidderModal) onOpenBidderModal();
              }}
            >
              <User size={15} />
              <span>Login</span>
            </button>

            <button
              type="button"
              className="btn-register-red w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenBidderModal) onOpenBidderModal();
              }}
            >
              <span>Register as Bidder</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
