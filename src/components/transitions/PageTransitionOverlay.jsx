import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SalvexLogo from '../SalvexLogo';
import './PageTransitionOverlay.css';

/**
 * Salvex Auction - Premium Branded Page Transition Overlay
 * 
 * Provides a fast (400-550ms total), cinematic branded curtain transition
 * between internal routes.
 * 
 * Sequence:
 * 1. Overlay fades & scales in (0.2s)
 * 2. Route state updates at apex (midpoint) & scroll resets immediately
 * 3. Overlay exits smoothly upward (0.24s)
 * 4. Completion callback fires
 */
export default function PageTransitionOverlay({
  isActive,
  onMidpoint,
  onComplete
}) {
  const overlayRef = useRef(null);
  const logoRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        if (onMidpoint) onMidpoint();
        if (onComplete) setTimeout(onComplete, 100);
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' }
      });

      // Apex / mid-point callback trigger
      let midpointCalled = false;
      const callMidpointOnce = () => {
        if (!midpointCalled && onMidpoint) {
          midpointCalled = true;
          onMidpoint();
        }
      };

      // Initial state
      tl.set(overlayRef.current, {
        opacity: 0,
        y: 0,
        pointerEvents: 'all'
      })
      .set(logoRef.current, {
        opacity: 0,
        scale: 0.94
      })
      .set(barRef.current, {
        scaleX: 0
      })

      // 1. Enter: Overlay fades in quickly (180ms)
      .to(overlayRef.current, {
        opacity: 1,
        duration: 0.18,
        ease: 'power2.out'
      })

      // 2. Logo & accent bar reveal
      .to(logoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.18,
        ease: 'power2.out'
      }, '-=0.1')
      .to(barRef.current, {
        scaleX: 1,
        duration: 0.2,
        ease: 'power2.inOut'
      }, '-=0.15')

      // 3. APEX: Switch route & reset scroll
      .call(callMidpointOnce)

      // Short micro-hold (80ms)
      .to({}, { duration: 0.08 })

      // 4. Exit: Fade & slide up out of view (220ms)
      .to(logoRef.current, {
        opacity: 0,
        scale: 0.97,
        duration: 0.14,
        ease: 'power2.in'
      })
      .to(overlayRef.current, {
        opacity: 0,
        y: -18,
        duration: 0.22,
        ease: 'power3.out',
        onComplete: () => {
          if (onComplete) onComplete();
        }
      }, '-=0.08');
    }, overlayRef);

    return () => {
      ctx.revert();
    };
  }, [isActive, onMidpoint, onComplete]);

  if (!isActive) return null;

  return (
    <div
      ref={overlayRef}
      className="salvex-route-transition-overlay"
      aria-hidden="true"
    >
      <div className="transition-overlay-backdrop" />
      <div className="transition-center-badge">
        <div ref={logoRef}>
          <SalvexLogo variant="dark" height={36} />
        </div>
        <div ref={barRef} className="transition-accent-bar" />
      </div>
    </div>
  );
}
