import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Trigger initial sequential homepage entrance animation after preloader exit
 */
export function triggerHomepageEntry() {
  if (typeof window === 'undefined') return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // 1. Navbar appears smoothly
  const navbar = document.querySelector('.salvex-master-navbar');
  if (navbar) {
    tl.fromTo(
      navbar,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.65 },
      0.05
    );
  }

  // 2. Hero eyebrow reveals
  const eyebrow = document.querySelector('.hero-eyebrow-row');
  if (eyebrow) {
    tl.fromTo(
      eyebrow,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.65 },
      0.15
    );
  }

  // 3. Hero heading reveals
  const heading = document.querySelector('.hero-main-title');
  if (heading) {
    tl.fromTo(
      heading,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.75 },
      0.25
    );
  }

  // 4. Hero description reveals
  const desc = document.querySelector('.hero-description');
  if (desc) {
    tl.fromTo(
      desc,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.65 },
      0.35
    );
  }

  // 5. CTA buttons reveal
  const ctas = document.querySelectorAll('.hero-cta-group button');
  if (ctas && ctas.length > 0) {
    tl.fromTo(
      ctas,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.65, stagger: 0.08 },
      0.45
    );
  }

  // 6. Hero vehicle / background image reveals
  const heroImgs = document.querySelectorAll('.hero-bg-desktop, .hero-bg-mobile');
  if (heroImgs && heroImgs.length > 0) {
    tl.fromTo(
      heroImgs,
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' },
      0.3
    );
  }

  // 7. Search panel reveals
  const searchPanel = document.querySelector('.salvex-search-section, .search-panel-container');
  if (searchPanel) {
    tl.fromTo(
      searchPanel,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.75 },
      0.55
    );
  }
}

/**
 * useScrollAnimations
 * Smooth, natural GSAP ScrollTrigger enhancements for Salvex Auction.
 *
 * Principles:
 * - Natural unpinned browser scrolling
 * - Subtle hero parallax depth (content y: 0 -> -80, vehicle y: 0 -> -35, background y: 0 -> -20)
 * - Controlled section reveals (headings y: 35 -> 0, desc y: 20 -> 0, cards y: 35 -> 0)
 * - Auction card image scale 1.04 -> 1 on enter
 * - Responsive via gsap.matchMedia() (desktop, tablet, mobile)
 * - Respects prefers-reduced-motion
 * - Strict transform & opacity only
 */
export function useScrollAnimations(currentRoute) {
  useEffect(() => {
    // Accessibility check: disable animations if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const mm = gsap.matchMedia();

    // 01. DESKTOP & LAPTOP (> 768px)
    mm.add('(min-width: 769px)', () => {
      // A. HERO SECTION: Subtle natural parallax scrub (NO PINNING)
      const hero = document.querySelector('.salvex-hero-section');
      if (hero) {
        const bgImg = hero.querySelector('.hero-bg-image');
        const heroContent = hero.querySelector('.hero-content-wrapper');

        // Background moves slower (y: 0 -> -20)
        if (bgImg) {
          gsap.to(bgImg, {
            y: -20,
            ease: 'none',
            scrollTrigger: {
              trigger: hero,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true
            }
          });
        }

        // Hero content moves upward slightly (y: 0 -> -80)
        if (heroContent) {
          gsap.to(heroContent, {
            y: -80,
            opacity: 0.9,
            ease: 'none',
            scrollTrigger: {
              trigger: hero,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true
            }
          });
        }
      }

      // B. SECTION HEADINGS: Subtle upward fade reveal (y: 35 -> 0)
      const sectionHeadings = gsap.utils.toArray(
        '.section-title, .section-header-centered h2, .about-heading, .page-header-title, .about-eyebrow-tag'
      );
      sectionHeadings.forEach((heading) => {
        gsap.from(heading, {
          opacity: 0,
          y: 35,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 88%',
            once: true
          }
        });
      });

      // C. SECTION SUBTITLES / DESCRIPTIONS: (y: 20 -> 0)
      const sectionDescriptions = gsap.utils.toArray(
        '.section-subtitle, .about-paragraph-text, .page-header-subtitle'
      );
      sectionDescriptions.forEach((desc) => {
        gsap.from(desc, {
          opacity: 0,
          y: 20,
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: desc,
            start: 'top 88%',
            once: true
          }
        });
      });

      // D. LIVE AUCTION CARDS: Reveal with y: 30 -> 0 and image scale 1.04 -> 1
      const liveSection = document.querySelector('.salvex-live-section');
      if (liveSection) {
        const cards = liveSection.querySelectorAll('.live-slider-card');
        if (cards.length > 0) {
          gsap.from(cards, {
            opacity: 0,
            y: 30,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: liveSection,
              start: 'top 85%',
              once: true
            }
          });

          const images = liveSection.querySelectorAll('.live-card-image');
          if (images.length > 0) {
            gsap.from(images, {
              scale: 1.04,
              duration: 0.85,
              stagger: 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: liveSection,
                start: 'top 85%',
                once: true
              }
            });
          }
        }
      }

      // E. UPCOMING AUCTIONS & VEHICLE GRIDS: Staggered reveal
      const cardSections = [
        {
          trigger: '.salvex-upcoming-section',
          items: '.salvex-upcoming-section .upcoming-ref-card'
        },
        {
          trigger: '.salvex-recent-section',
          items: '.salvex-recent-section .salvex-vehicle-card'
        },
        {
          trigger: '.salvex-trust-section',
          items: '.salvex-trust-section .why-feature-card'
        },
        {
          trigger: '.vehicles-results-grid',
          items: '.salvex-vehicle-card, .vehicle-card-wrapper'
        },
        {
          trigger: '.upcoming-auctions-grid',
          items: '.upcoming-card-wrapper, .upcoming-ref-card'
        }
      ];

      cardSections.forEach(({ trigger, items }) => {
        const triggerEl = document.querySelector(trigger);
        if (triggerEl) {
          const elements = triggerEl.querySelectorAll(items);
          if (elements.length > 0) {
            gsap.from(elements, {
              opacity: 0,
              y: 32,
              duration: 0.65,
              stagger: 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: triggerEl,
                start: 'top 85%',
                once: true
              }
            });
          }
        }
      });

      // F. HOW IT WORKS: Sequential steps & connecting bar
      const howSection = document.querySelector('.salvex-how-section');
      if (howSection) {
        const steps = howSection.querySelectorAll('.step-card');
        const bar = howSection.querySelector('.steps-connecting-bar');

        if (bar) {
          gsap.from(bar, {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: howSection,
              start: 'top 82%',
              once: true
            }
          });
        }

        if (steps.length > 0) {
          gsap.from(steps, {
            opacity: 0,
            y: 30,
            duration: 0.65,
            stagger: 0.09,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: howSection,
              start: 'top 82%',
              once: true
            }
          });
        }
      }

      // G. ABOUT SECTION: Sequential dual-column reveal
      const aboutSection = document.querySelector('.salvex-about-section');
      if (aboutSection) {
        const aboutImg = aboutSection.querySelector('.about-facility-image');
        const aboutContent = aboutSection.querySelector('.about-content-column');

        if (aboutImg) {
          gsap.from(aboutImg, {
            opacity: 0,
            scale: 1.06,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: aboutSection,
              start: 'top 85%',
              once: true
            }
          });
        }

        if (aboutContent) {
          gsap.from(aboutContent.children, {
            opacity: 0,
            y: 22,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: aboutSection,
              start: 'top 85%',
              once: true
            }
          });
        }
      }

      // H. STATS & TRUST NUMBERS: Gentle reveal
      const statsElements = gsap.utils.toArray('.about-stat-item, .trust-col');
      if (statsElements.length > 0) {
        gsap.from(statsElements, {
          opacity: 0,
          y: 24,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsElements[0],
            start: 'top 88%',
            once: true
          }
        });
      }

      // I. LARGE IMAGE REVEAL (Facility, About showcase, Vehicle Detail Gallery)
      const largeImages = gsap.utils.toArray(
        '.about-single-img, .gallery-active-image, .about-facility-image'
      );
      largeImages.forEach((img) => {
        gsap.from(img, {
          opacity: 0,
          scale: 1.05,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: img,
            start: 'top 88%',
            once: true
          }
        });
      });

      // J. FINAL CTA & FOOTER: Smooth elevated reveals
      const finalCta = document.querySelector('.salvex-final-cta-section, .buyer-cta-section');
      if (finalCta) {
        gsap.from(finalCta, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: finalCta,
            start: 'top 85%',
            once: true
          }
        });
      }

      const footer = document.querySelector('.salvex-commercial-footer');
      if (footer) {
        gsap.from(footer, {
          opacity: 0,
          y: 25,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 92%',
            once: true
          }
        });
      }
    });

    // 02. MOBILE & SMALL TOUCH SCREENS (<= 768px down to 320px)
    mm.add('(max-width: 768px)', () => {
      // Reduced movement distances, no heavy parallax, fast and fluid
      const mobileHeadings = gsap.utils.toArray('.section-title, .about-heading, .page-header-title');
      mobileHeadings.forEach((heading) => {
        gsap.from(heading, {
          opacity: 0,
          y: 16,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 90%',
            once: true
          }
        });
      });

      const mobileCards = gsap.utils.toArray('.live-slider-card, .salvex-vehicle-card, .why-feature-card, .step-card');
      if (mobileCards.length > 0) {
        gsap.from(mobileCards, {
          opacity: 0,
          y: 18,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: mobileCards[0],
            start: 'top 90%',
            once: true
          }
        });
      }
    });

    // 03. Refresh ScrollTrigger after DOM has settled
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    // 04. Cleanup on route change or unmount
    return () => {
      clearTimeout(refreshTimer);
      mm.revert();
    };
  }, [currentRoute]);
}
