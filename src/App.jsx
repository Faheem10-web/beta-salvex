import React, { useState, useLayoutEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchPanel from './components/SearchPanel';
import LiveAuctions from './components/LiveAuctions';
import UpcomingAuctions from './components/UpcomingAuctions';
import HowItWorks from './components/HowItWorks';
import RecentlyAddedVehicles from './components/RecentlyAddedVehicles';
import WhySalvex from './components/WhySalvex';
import AboutSection from './components/AboutSection';
import BuyerCta from './components/BuyerCta';
import Footer from './components/Footer';

// Dedicated Standalone Pages
import VehiclesPage from './components/VehiclesPage';
import VehicleDetailsPage from './components/VehicleDetailsPage';
import LiveAuctionsPage from './components/LiveAuctionsPage';
import UpcomingAuctionsPage from './components/UpcomingAuctionsPage';
import RecentlyAddedPage from './components/RecentlyAddedPage';
import HowItWorksPage from './components/HowItWorksPage';
import BiddingRulesPage from './components/BiddingRulesPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import FaqPage from './components/FaqPage';
import LegalPage from './components/LegalPage';

// Authentication & Seller Onboarding Pages
import LoginPage from './components/LoginPage';
import ListVehiclePage from './components/ListVehiclePage';

// Operational & User Workflow Portals
import BidderDashboard from './components/BidderDashboard';
import PaymentPage from './components/PaymentPage';
import VehicleLiftingPage from './components/VehicleLiftingPage';
import SellerDashboard from './components/SellerDashboard';
import AdminPanel from './components/AdminPanel';

// Interactive Modals
import BidModal from './components/BidModal';
import VehicleModal from './components/VehicleModal';
import RegisterModal from './components/RegisterModal';
import ListVehicleModal from './components/ListVehicleModal';
import SavedModal from './components/SavedModal';
import SearchModal from './components/SearchModal';

// Mock Data
import {
  liveVehiclesData,
  upcomingAuctionsData,
  recentlyAddedVehiclesData,
  howItWorksSteps,
  whySalvexFeatures
} from './data/mockVehicles';

import './App.css';
import './components/SalvexAppComponents.css';
import { useScrollAnimations, triggerHomepageEntry } from './hooks/useScrollAnimations';
import PageLoader from './components/ui/PageLoader';
import PageTransitionOverlay from './components/transitions/PageTransitionOverlay';
import { resetScrollToTop } from './utils/scrollHelper';
import { scrollToTarget } from './utils/smoothScroll';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const [pendingRoute, setPendingRoute] = useState(null);
  const [pendingParams, setPendingParams] = useState(null);
  const [liveVehicles, setLiveVehicles] = useState(liveVehiclesData);
  const [savedIds, setSavedIds] = useState(['salvex-101', 'salvex-103']);

  // Active Routing state
  // Supported routes: 'home' | 'vehicles' | 'vehicle-details' | 'live-auctions' | 'upcoming-auctions' | 'recently-added' | 'how-it-works' | 'bidding-rules' | 'about' | 'contact' | 'faq' | 'privacy-policy' | 'terms-and-conditions' | 'refund-policy' | 'auction-policy' | 'login' | 'register' | 'list-your-vehicle' | 'dashboard' | 'payment' | 'lifting' | 'seller-dashboard' | 'admin'
  const [currentRoute, setCurrentRoute] = useState('home');
  const [activeSection, setActiveSection] = useState('home');
  const [navKey, setNavKey] = useState(0);

  // GSAP ScrollTrigger smooth premium scroll enhancements
  useScrollAnimations(currentRoute);

  // Browser Back / Forward button navigation synchronization
  React.useEffect(() => {
    const handlePopState = (e) => {
      const stateRoute = e.state?.route || window.location.hash.replace('#', '') || 'home';
      if (e.state?.params?.vehicle) {
        setActiveVehicle(e.state.params.vehicle);
      }
      if (e.state?.params?.lotId) {
        setActiveLotId(e.state.params.lotId);
      }
      setCurrentRoute(stateRoute);
      setActiveSection(stateRoute);
      resetScrollToTop();
      setNavKey((k) => k + 1);
      setTimeout(() => ScrollTrigger.refresh(), 100);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Currently viewed vehicle for /vehicles/:id details page
  const defaultVehicle = liveVehicles.find((v) => v.id === 'salvex-103') || liveVehicles[0];
  const [activeVehicle, setActiveVehicle] = useState(defaultVehicle);

  // Workflow context params (e.g. which lot is being settled or lifted)
  const [activeLotId, setActiveLotId] = useState('won-101');

  // Global Route Navigation Scroll-to-Top:
  // Automatically reset the scroll position to the very top (0, 0) on every route/page navigation
  useLayoutEffect(() => {
    resetScrollToTop();
  }, [currentRoute, activeVehicle?.id, activeLotId, navKey]);

  // Search Filter state for home quick panel
  const [searchTab, setSearchTab] = useState('search');
  const [searchFilters, setSearchFilters] = useState({
    make: 'All Makes',
    vehicleType: 'All Types',
    location: 'All Locations',
    year: 'Any Year',
    priceRange: 'Any Price'
  });

  // Modal visibility states
  const [selectedBidVehicle, setSelectedBidVehicle] = useState(null);
  const [selectedDetailVehicle, setSelectedDetailVehicle] = useState(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSellerOpen, setIsSellerOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Immediate state update helper
  const applyNavigation = (route, params = null) => {
    if (params?.vehicle) {
      setActiveVehicle(params.vehicle);
    }
    if (params?.lotId) {
      setActiveLotId(params.lotId);
    }

    const actualRoute = route === 'register' ? 'login' : route;
    setCurrentRoute(actualRoute);
    setActiveSection(actualRoute);

    // Reset scroll position immediately on navigation
    resetScrollToTop();
    setNavKey((k) => k + 1);

    // Synchronize browser history for natural back / forward navigation
    try {
      if (typeof window !== 'undefined') {
        const hash = actualRoute === 'home' ? '' : `#${actualRoute}`;
        window.history.pushState({ route: actualRoute, params }, '', window.location.pathname + hash);
      }
    } catch {}
  };

  // Central Router Dispatcher with Branded Page-to-Page Transition
  const navigateTo = (route, params = null) => {
    // If user clicked home while already on home, smooth scroll to top
    if (route === 'home' && currentRoute === 'home') {
      scrollToTarget(0);
      return;
    }

    // Bypass transition overlay during initial preloader display
    if (showPreloader) {
      applyNavigation(route, params);
      return;
    }

    // Trigger fast, cinematic branded curtain transition (400-550ms total)
    setPendingRoute(route);
    setPendingParams(params);
    setIsPageTransitioning(true);

    // Fade and elevate current outlet content slightly (y: 0 -> -14px)
    gsap.to('.salvex-main-route-outlet', {
      opacity: 0.35,
      y: -14,
      duration: 0.18,
      ease: 'power2.inOut'
    });
  };

  const handleTransitionMidpoint = () => {
    if (pendingRoute) {
      applyNavigation(pendingRoute, pendingParams);
    }
  };

  const handleTransitionComplete = () => {
    setIsPageTransitioning(false);
    setPendingRoute(null);
    setPendingParams(null);

    // Reveal new page content smoothly upward (y: 16px -> 0)
    gsap.fromTo(
      '.salvex-main-route-outlet',
      { opacity: 0.35, y: 16 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' }
    );

    ScrollTrigger.refresh();
  };

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    requestAnimationFrame(() => {
      triggerHomepageEntry();
    });
  };

  // Watchlist Toggle
  const handleToggleSave = (vehicleId) => {
    setSavedIds((prev) => {
      const exists = prev.includes(vehicleId);
      if (exists) {
        showToast('Vehicle removed from watchlist');
        return prev.filter((id) => id !== vehicleId);
      } else {
        showToast('Vehicle saved to your watchlist');
        return [...prev, vehicleId];
      }
    });
  };

  // Live Bid Execution
  const handleConfirmBid = (vehicleId, newBidAmount) => {
    setLiveVehicles((prev) =>
      prev.map((v) => {
        if (v.id === vehicleId) {
          return {
            ...v,
            currentBid: newBidAmount,
            bidCount: (v.bidCount || 0) + 1
          };
        }
        return v;
      })
    );
    showToast(`Bid confirmed: ₹${newBidAmount.toLocaleString('en-IN')}`);
  };

  // Open Vehicle Details View
  const handleViewVehicleDetails = (vehicle) => {
    setActiveVehicle(vehicle);
    navigateTo('vehicle-details', { vehicle });
  };

  const savedVehiclesList = liveVehicles.filter((v) => savedIds.includes(v.id));

  return (
    <div className="salvex-app-root">
      {/* 00 PREMIUM BRANDED PRELOADER */}
      {showPreloader && (
        <PageLoader onLoadingComplete={handlePreloaderComplete} />
      )}

      {/* 00B BRANDED PAGE-TO-PAGE ROUTE TRANSITION CURTAIN */}
      <PageTransitionOverlay
        isActive={isPageTransitioning}
        onMidpoint={handleTransitionMidpoint}
        onComplete={handleTransitionComplete}
      />

      {/* 01 MAIN TWO-ROW NAVBAR */}
      <Navbar
        activeSection={activeSection}
        onNavigate={(routeId) => navigateTo(routeId)}
        onOpenBidderModal={() => navigateTo('login')}
        onOpenSellerModal={() => navigateTo('list-your-vehicle')}
        onOpenSearchModal={() => setIsSearchOpen(true)}
        onSearchSubmitQuery={(query) => {
          navigateTo('vehicles');
          showToast(`Searching marketplace for: "${query || 'All inventory'}"`);
        }}
        savedCount={savedIds.length}
        onOpenSavedModal={() => setIsSavedOpen(true)}
      />

      {/* 02 ROUTING VIEW CONTAINER */}
      <main className="salvex-main-route-outlet" id="main-content">
        {/* ROUTE 01: HOME PAGE */}
        {currentRoute === 'home' && (
          <div className="salvex-home-view">
            <Hero
              onSearchClick={() => {
                scrollToTarget('#auction-search-panel');
              }}
              onLiveAuctionsClick={() => navigateTo('live-auctions')}
            />

            <SearchPanel
              activeTab={searchTab}
              onTabChange={setSearchTab}
              filters={searchFilters}
              onFilterChange={(k, v) => setSearchFilters((prev) => ({ ...prev, [k]: v }))}
              onSearch={(filters, tab) => {
                if (tab === 'upcoming') {
                  navigateTo('upcoming-auctions');
                } else {
                  navigateTo('live-auctions');
                }
                showToast(`Filtering inventory for ${filters.vehicleType}...`);
              }}
            />

            <LiveAuctions
              vehicles={liveVehicles}
              onPlaceBid={(v) => setSelectedBidVehicle(v)}
              onViewDetails={(v) => handleViewVehicleDetails(v)}
              savedIds={savedIds}
              onToggleSave={handleToggleSave}
              onViewAllLive={() => navigateTo('live-auctions')}
            />

            <UpcomingAuctions
              auctions={upcomingAuctionsData}
              onViewAuction={() => navigateTo('upcoming-auctions')}
              onRegisterInterest={(auc) => {
                showToast(`Sign in or register to bid on ${auc.title}`);
                navigateTo('login');
              }}
            />

            <RecentlyAddedVehicles
              vehicles={recentlyAddedVehiclesData}
              onViewDetails={(v) => handleViewVehicleDetails(v)}
              savedIds={savedIds}
              onToggleSave={handleToggleSave}
              onViewAll={() => navigateTo('recently-added')}
            />

            <HowItWorks steps={howItWorksSteps} />
            <WhySalvex features={whySalvexFeatures} />
            <AboutSection onAboutClick={() => navigateTo('about')} />
            <BuyerCta
              onRegisterClick={() => navigateTo('login')}
              onExploreClick={() => navigateTo('vehicles')}
            />
          </div>
        )}

        {/* ROUTE 02: VEHICLES MARKETPLACE (/vehicles) */}
        {currentRoute === 'vehicles' && (
          <VehiclesPage
            vehicles={liveVehicles}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onViewDetails={(v) => handleViewVehicleDetails(v)}
            onNavigateHome={() => navigateTo('home')}
            onPlaceBidQuick={(v) => setSelectedBidVehicle(v)}
          />
        )}

        {/* ROUTE 03: VEHICLE DETAILS (/vehicles/:id) */}
        {currentRoute === 'vehicle-details' && (
          <VehicleDetailsPage
            vehicle={activeVehicle || defaultVehicle}
            onNavigateHome={() => navigateTo('home')}
            onNavigateLiveAuctions={() => navigateTo('live-auctions')}
            onOpenBidModal={(v) => setSelectedBidVehicle(v)}
            onOpenRegisterModal={() => navigateTo('login')}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onViewVehicleDetails={(v) => handleViewVehicleDetails(v)}
            similarVehicles={liveVehicles.filter(
              (v) => v.id !== (activeVehicle?.id || 'salvex-103')
            )}
          />
        )}

        {/* ROUTE 04: LIVE AUCTIONS (/auctions/live) */}
        {currentRoute === 'live-auctions' && (
          <LiveAuctionsPage
            vehicles={liveVehicles}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onViewDetails={(v) => handleViewVehicleDetails(v)}
            onPlaceBidQuick={(v) => setSelectedBidVehicle(v)}
          />
        )}

        {/* ROUTE 05: UPCOMING AUCTIONS (/auctions/upcoming) */}
        {currentRoute === 'upcoming-auctions' && (
          <UpcomingAuctionsPage
            auctions={upcomingAuctionsData}
            onSetReminder={(msg) => showToast(msg)}
            onViewVehicle={(auc) => {
              const matched = liveVehicles.find((v) => v.make === auc.title.split(' ')[1]) || defaultVehicle;
              handleViewVehicleDetails(matched);
            }}
          />
        )}

        {/* ROUTE 06: RECENTLY ADDED (/vehicles/recent) */}
        {currentRoute === 'recently-added' && (
          <RecentlyAddedPage
            vehicles={recentlyAddedVehiclesData}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onViewDetails={(v) => handleViewVehicleDetails(v)}
          />
        )}

        {/* ROUTE 07: HOW IT WORKS (/how-it-works) */}
        {currentRoute === 'how-it-works' && (
          <HowItWorksPage
            onRegisterClick={() => navigateTo('login')}
            onExploreClick={() => navigateTo('vehicles')}
          />
        )}

        {/* ROUTE 08: BIDDING RULES (/bidding-rules) */}
        {currentRoute === 'bidding-rules' && (
          <BiddingRulesPage onRegisterClick={() => navigateTo('login')} />
        )}

        {/* ROUTE 10: LOGIN (/login) */}
        {currentRoute === 'login' && (
          <LoginPage
            onLoginSuccess={(role) => {
              if (role === 'admin') navigateTo('admin');
              else if (role === 'seller') navigateTo('seller-dashboard');
              else navigateTo('dashboard');
            }}
            onNavigateRegister={() => navigateTo('login')}
            onShowToast={showToast}
          />
        )}

        {/* ROUTE 11: LIST YOUR VEHICLE (/list-your-vehicle) */}
        {currentRoute === 'list-your-vehicle' && (
          <ListVehiclePage
            onSubmitSuccess={() => navigateTo('seller-dashboard')}
            onNavigateSellerDashboard={() => navigateTo('seller-dashboard')}
            onShowToast={showToast}
          />
        )}

        {/* ROUTE 12: ABOUT SALVEX (/about) */}
        {currentRoute === 'about' && (
          <AboutPage
            onExploreClick={() => navigateTo('vehicles')}
            onRegisterClick={() => navigateTo('login')}
          />
        )}

        {/* ROUTE 13: CONTACT (/contact) */}
        {currentRoute === 'contact' && (
          <ContactPage
            onShowToast={showToast}
            onNavigate={(route) => navigateTo(route)}
            onOpenRegister={() => navigateTo('login')}
          />
        )}

        {/* ROUTE 14: FAQ (/faq) */}
        {currentRoute === 'faq' && (
          <FaqPage
            onContactClick={() => navigateTo('contact')}
            onRegisterClick={() => navigateTo('login')}
          />
        )}

        {/* ROUTE 15-18: LEGAL POLICIES */}
        {(currentRoute === 'privacy-policy' ||
          currentRoute === 'terms-and-conditions' ||
          currentRoute === 'refund-policy' ||
          currentRoute === 'auction-policy' ||
          currentRoute === 'legal') && (
          <LegalPage
            key={currentRoute}
            initialTab={
              currentRoute === 'privacy-policy'
                ? 'privacy'
                : currentRoute === 'refund-policy'
                ? 'refund'
                : currentRoute === 'auction-policy'
                ? 'auction'
                : 'terms'
            }
          />
        )}

        {/* ROUTE 20: BIDDER DASHBOARD (/dashboard) */}
        {currentRoute === 'dashboard' && (
          <BidderDashboard
            onNavigateHome={() => navigateTo('home')}
            onNavigateVehicleDetails={(v) => handleViewVehicleDetails(v)}
            onNavigatePayment={(lotId) => navigateTo('payment', { lotId })}
            onNavigateLifting={(lotId) => navigateTo('lifting', { lotId })}
            onShowToast={showToast}
          />
        )}

        {/* ROUTE 25: PAYMENT CHECKOUT (/payment/:id) */}
        {currentRoute === 'payment' && (
          <PaymentPage
            lotId={activeLotId}
            onNavigateLifting={(lotId) => navigateTo('lifting', { lotId })}
            onNavigateDashboard={() => navigateTo('home')}
            onShowToast={showToast}
          />
        )}

        {/* ROUTE 26: VEHICLE LIFTING & GATE PASS (/lifting/:id) */}
        {currentRoute === 'lifting' && (
          <VehicleLiftingPage
            lotId={activeLotId}
            onNavigateDashboard={() => navigateTo('home')}
            onShowToast={showToast}
          />
        )}

        {/* ROUTE 28: SELLER DASHBOARD (/seller/dashboard) */}
        {currentRoute === 'seller-dashboard' && (
          <SellerDashboard
            onNavigateListVehicle={() => navigateTo('list-your-vehicle')}
            onNavigateVehicleDetails={(v) => handleViewVehicleDetails(v)}
            onShowToast={showToast}
          />
        )}

        {/* ROUTE 33: ADMIN COMMAND CENTER (/admin) */}
        {currentRoute === 'admin' && (
          <AdminPanel
            onShowToast={showToast}
            onNavigateVehicleDetails={(v) => handleViewVehicleDetails(v)}
          />
        )}
      </main>

      {/* 03 GLOBAL COMMERCIAL FOOTER */}
      <Footer
        onNavigate={(routeId) => navigateTo(routeId)}
        onOpenBidderModal={() => navigateTo('login')}
        onOpenSellerModal={() => navigateTo('list-your-vehicle')}
        onOpenSavedModal={() => setIsSavedOpen(true)}
      />

      {/* 04 INTERACTIVE DIALOG MODALS */}
      <BidModal
        vehicle={selectedBidVehicle}
        isOpen={Boolean(selectedBidVehicle)}
        onClose={() => setSelectedBidVehicle(null)}
        onConfirmBid={handleConfirmBid}
      />

      <VehicleModal
        vehicle={selectedDetailVehicle}
        isOpen={Boolean(selectedDetailVehicle)}
        onClose={() => setSelectedDetailVehicle(null)}
        onPlaceBid={(v) => setSelectedBidVehicle(v)}
        isSaved={selectedDetailVehicle ? savedIds.includes(selectedDetailVehicle.id) : false}
        onToggleSave={handleToggleSave}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />

      <ListVehicleModal
        isOpen={isSellerOpen}
        onClose={() => setIsSellerOpen(false)}
      />

      <SavedModal
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        savedVehicles={savedVehiclesList}
        onRemoveSaved={handleToggleSave}
        onPlaceBid={(v) => setSelectedBidVehicle(v)}
        onViewDetails={(v) => handleViewVehicleDetails(v)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        allVehicles={liveVehicles}
        onSelectVehicle={(v) => handleViewVehicleDetails(v)}
      />

      {/* 05 REAL-TIME TOAST FEEDBACK NOTIFICATION */}
      {toastMessage && (
        <div className="salvex-toast-notification" role="status" aria-live="polite">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
