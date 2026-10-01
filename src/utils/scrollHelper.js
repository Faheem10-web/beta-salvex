/**
 * Global Scroll Reset Utility
 *
 * Ensures that on any route navigation or internal page change,
 * the scroll position is reliably and immediately reset to top (0, 0).
 * Handles CSS smooth-scrolling overrides, multi-frame rendering checks,
 * document/body scroll containers, and browser scroll restoration.
 */

import { getLenis } from './smoothScroll';

if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

export function resetScrollToTop() {
  if (typeof window === 'undefined') return;

  const html = document.documentElement;
  const body = document.body;

  // Temporarily bypass any smooth scrolling configured on html/body so
  // navigation resets immediately to the top rather than lagging or being aborted
  const prevHtmlBehavior = html?.style?.scrollBehavior;
  const prevBodyBehavior = body?.style?.scrollBehavior;

  if (html) html.style.scrollBehavior = 'auto';
  if (body) body.style.scrollBehavior = 'auto';

  const reset = () => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } catch {
      window.scrollTo(0, 0);
    }

    if (html && html.scrollTop !== 0) {
      html.scrollTop = 0;
    }
    if (body && body.scrollTop !== 0) {
      body.scrollTop = 0;
    }

    const lenis = getLenis();
    if (lenis) {
      try {
        lenis.scrollTo(0, { immediate: true });
      } catch {}
    }

    const mainOutlet = document.querySelector('.salvex-main-route-outlet') || document.getElementById('main-content');
    if (mainOutlet && mainOutlet.scrollTop !== 0) {
      mainOutlet.scrollTop = 0;
    }
  };

  // Immediate synchronous reset before paint
  reset();

  // Multi-frame reset to ensure position holds across React DOM reconciliation and layout
  requestAnimationFrame(() => {
    reset();
    requestAnimationFrame(() => {
      reset();
      // Restore previous inline styles
      if (html) html.style.scrollBehavior = prevHtmlBehavior || '';
      if (body) body.style.scrollBehavior = prevBodyBehavior || '';
    });
  });
}
