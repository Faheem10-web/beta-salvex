import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;
let gsapTickerCallback = null;

/**
 * Initialize the global singleton Lenis smooth scrolling instance
 * and synchronize it with the GSAP ticker and ScrollTrigger.
 */
export function initSmoothScroll() {
  if (typeof window === 'undefined') return null;

  // If already initialized, return existing instance
  if (lenisInstance) {
    return lenisInstance;
  }

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  lenisInstance = new Lenis({
    duration: prefersReducedMotion ? 0.01 : 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: !prefersReducedMotion,
    touchMultiplier: 1.25,
    wheelMultiplier: 1.0,
    infinite: false,
    autoRaf: false // Controlled via GSAP ticker
  });

  // Synchronize Lenis scroll updates with ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  // Link Lenis RAF to GSAP ticker for 120Hz/60Hz synchronized precision
  gsapTickerCallback = (time) => {
    if (lenisInstance) {
      lenisInstance.raf(time * 1000);
    }
  };

  gsap.ticker.add(gsapTickerCallback);
  gsap.ticker.lagSmoothing(0);

  // Re-sync ScrollTrigger on resize
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  }, { passive: true });

  return lenisInstance;
}

/**
 * Get current global Lenis instance
 */
export function getLenis() {
  return lenisInstance;
}

/**
 * Smooth scroll to target element or position with navbar offset compensation
 * Desktop sticky navbar height: ~168px (tiers 0, 1, 2)
 * Mobile sticky navbar height: ~108px
 */
export function scrollToTarget(target, customOptions = {}) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const defaultOffset = isMobile ? -108 : -168;

  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset: customOptions.offset !== undefined ? customOptions.offset : defaultOffset,
      duration: customOptions.duration || 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      immediate: customOptions.immediate || false,
      lock: customOptions.lock || false,
      ...customOptions
    });
  } else if (typeof window !== 'undefined') {
    if (typeof target === 'number') {
      window.scrollTo({
        top: target,
        behavior: customOptions.immediate ? 'instant' : 'smooth'
      });
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY + defaultOffset;
        window.scrollTo({
          top,
          behavior: customOptions.immediate ? 'instant' : 'smooth'
        });
      }
    }
  }
}

/**
 * Destroy global Lenis instance and remove ticker
 */
export function destroySmoothScroll() {
  if (gsapTickerCallback) {
    gsap.ticker.remove(gsapTickerCallback);
    gsapTickerCallback = null;
  }
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}
