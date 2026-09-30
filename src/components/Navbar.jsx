import React, { useState, useEffect } from 'react';
import SalvexLogo from './SalvexLogo';
import {
  Search,
  PlusCircle,
  User,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';
import './Navbar.css';

export default function Navbar({
  activeSection = 'home',
  onNavigate,
  onOpenBidderModal,
  onOpenSellerModal,
  onOpenSearchModal,
  onSearchSubmitQuery
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;

      // Scrolled styling (backdrop blur & shadow)
      setIsScrolled(currentY > 20);

      // Do not auto-hide if mobile menu is currently open
      if (mobileMenuOpen) {
        setIsVisible(true);
        return;
      }

      // Always show navbar near the top of the page
      if (currentY < 80) {
        setIsVisible(true);
      } else if (currentY > lastY + 8) {
        // Scrolling DOWN -> smoothly hide navbar
        setIsVisible(false);
      } else if (currentY < lastY - 8) {
        // Scrolling UP -> reveal navbar
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
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmitQuery) {
      onSearchSubmitQuery(searchQuery);
    } else if (onNavigate) {
      onNavigate('live-auctions');
    }
  };

  return (
    <>
      <header
        className={`salvex-two-row-navbar ${isScrolled ? 'navbar-scrolled' : ''} ${!isVisible ? 'navbar-hidden' : ''}`}
        id="main-navbar"
      >
        {/* Subtle red ambient glow toward the right side as in reference */}
        <div className="navbar-red-ambient" aria-hidden="true" />

        {/* ------------------------------------------------------------------
            ROW 1: BRAND + SEARCH + UTILITY / ACCOUNT ACTIONS (Dark Navy)
            ------------------------------------------------------------------ */}
        <div className="navbar-row navbar-row-primary">
          <div className="navbar-container">
            {/* LEFT: Logo */}
            <div
              className="navbar-brand-wrap"
              onClick={() => handleLinkClick('home')}
              role="button"
              tabIndex={0}
              title="Salvex Auction Home"
            >
              <SalvexLogo variant="dark" />
            </div>

            {/* Subtle vertical divider after the logo */}
            <div className="navbar-logo-divider" aria-hidden="true" />

            {/* CENTER: SEARCH AREA (White Search Box + Red Button) */}
            <form className="navbar-search-form" onSubmit={handleSearchSubmit}>
              <div className="navbar-search-field-wrap">
                <Search size={18} className="navbar-search-icon" />
                <input
                  type="text"
                  placeholder="Search by Make, Model, Damage, Color, VIN, and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="navbar-search-input"
                  id="nav-search-input"
                />
              </div>

              <button
                type="submit"
                className="btn-search-inventory"
                id="btn-search-inventory"
              >
                <Search size={16} strokeWidth={2.2} className="btn-search-icon" />
                <span>Search Inventory</span>
              </button>
            </form>

            {/* RIGHT SIDE: UTILITY CONTROLS */}
            <div className="navbar-utility-group">
              {/* List Your Vehicle: Outline button */}
              <button
                type="button"
                className="btn-nav-list-vehicle"
                onClick={onOpenSellerModal}
                id="nav-list-vehicle-btn"
              >
                <PlusCircle size={16} strokeWidth={2} />
                <span>List Your Vehicle</span>
              </button>

              {/* Vertical divider */}
              <div className="navbar-sub-divider" aria-hidden="true" />

              {/* Login: User outline + Login */}
              <button
                type="button"
                className="btn-nav-login"
                onClick={onOpenBidderModal}
                id="nav-login-btn"
              >
                <User size={16} strokeWidth={2} />
                <span>Login</span>
              </button>

              {/* Register as Bidder: Main CTA */}
              <button
                type="button"
                className="btn-nav-register-cta"
                onClick={onOpenBidderModal}
                id="nav-register-cta"
              >
                <span>Register as Bidder</span>
                <ArrowRight size={15} strokeWidth={2.2} className="btn-arrow" />
              </button>
            </div>

            {/* Mobile Top Row Icons (visible on mobile only) */}
            <div className="navbar-mobile-top-actions">
              <button
                type="button"
                className="mobile-icon-btn"
                onClick={onOpenSearchModal}
                aria-label="Search"
              >
                <Search size={19} />
              </button>

              <button
                type="button"
                className="navbar-hamburger-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                id="navbar-hamburger"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------
            ROW 2: MAIN NAVIGATION (52px height, Aligned to same container)
            ------------------------------------------------------------------ */}
        <div className="navbar-row navbar-row-secondary">
          <div className="navbar-container">
            <nav className="navbar-links-left" aria-label="Main Navigation">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleLinkClick(item.id)}
                    className={`nav-row2-link ${isActive ? 'nav-row2-active' : ''}`}
                    id={`nav-row2-${item.id}`}
                  >
                    <span>{item.label}</span>

                    {item.isLive && (
                      <span className="nav-live-capsule">LIVE</span>
                    )}

                    {/* Active Underline: 28-32px wide, 2px height, #DC2626 */}
                    {isActive && <span className="nav-active-underline" />}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------
          MOBILE SLIDE-OUT DRAWER
          ------------------------------------------------------------------ */}
      <div
        className={`mobile-menu-backdrop ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <aside
        className={`mobile-drawer ${mobileMenuOpen ? 'mobile-drawer-open' : ''}`}
        aria-label="Mobile Navigation"
      >
        <div className="mobile-drawer-header">
          <SalvexLogo variant="dark" height={32} />
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
          {/* Main Navigation Links */}
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

          {/* Divider */}
          <div className="mobile-drawer-divider" />

          {/* CTAs */}
          <div className="mobile-drawer-ctas">
            <button
              type="button"
              className="btn-nav-list-vehicle w-full"
              onClick={() => { setMobileMenuOpen(false); onOpenSellerModal(); }}
            >
              <PlusCircle size={15} />
              <span>List Your Vehicle</span>
            </button>

            <button
              type="button"
              className="btn-nav-login w-full"
              onClick={() => { setMobileMenuOpen(false); onOpenBidderModal(); }}
            >
              <User size={15} />
              <span>Login</span>
            </button>

            <button
              type="button"
              className="btn-nav-register-cta w-full"
              onClick={() => { setMobileMenuOpen(false); onOpenBidderModal(); }}
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
