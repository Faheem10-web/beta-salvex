import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './PageLoader.css';

/**
 * Salvex Auction - Premium Branded Page Preloader
 * Minimal, corporate, cinematic 2026 automotive loading experience.
 * Features GSAP-powered micro-reveal, Salvex red progress line, and clean exit transition.
 */
export default function PageLoader({ onLoadingComplete }) {
  const overlayRef = useRef(null);
  const logoRef = useRef(null);
  const progressLineRef = useRef(null);
  const metaRef = useRef(null);
  const [progressVal, setProgressVal] = useState(0);
  const [isRendered, setIsRendered] = useState(true);

  useEffect(() => {
    // Lock page scroll during preloader presentation
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Respect user's accessibility reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Fast, accessible transition for reduced motion
        const tl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = originalOverflow;
            setIsRendered(false);
            if (onLoadingComplete) onLoadingComplete();
          }
        });

        tl.to(progressLineRef.current, { scaleX: 1, duration: 0.4, ease: 'linear' })
          .to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.inOut' });
        return;
      }

      // Standard cinematic luxury sequence
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = originalOverflow;
          setIsRendered(false);
          if (onLoadingComplete) onLoadingComplete();
        }
      });

      const progressObj = { value: 0 };

      tl.set(overlayRef.current, { opacity: 1, y: 0 })
        .set(logoRef.current, { opacity: 0, scale: 0.96 })
        .set(progressLineRef.current, { scaleX: 0 })
        .set(metaRef.current, { opacity: 0 })

        // 0.1s: Logo begins fading in with subtle scale
        .to(logoRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: 'power3.out',
          delay: 0.1
        })

        // Reveal progress meta information
        .to(metaRef.current, {
          opacity: 1,
          duration: 0.35,
          ease: 'power2.out'
        }, '-=0.3')

        // 0.5s - 1.4s: Red loading line progresses to 100%
        .to(progressLineRef.current, {
          scaleX: 1,
          duration: 0.9,
          ease: 'power2.inOut'
        }, '-=0.15')

        // Synchronized subtle progress percentage (0% -> 35% -> 72% -> 100%)
        .to(progressObj, {
          value: 100,
          duration: 0.9,
          ease: 'power2.inOut',
          onUpdate: () => {
            setProgressVal(Math.round(progressObj.value));
          }
        }, '<')

        // Micro-pause at 100%
        .to({}, { duration: 0.22 })

        // 8. EXIT ANIMATION: Smooth fade out with slight upward movement
        .to(overlayRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.55,
          ease: 'power3.inOut'
        });
    }, overlayRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = originalOverflow;
    };
  }, [onLoadingComplete]);

  if (!isRendered) return null;

  return (
    <div
      ref={overlayRef}
      className="salvex-page-loader"
      role="status"
      aria-live="polite"
      aria-label="Loading Salvex Auction"
    >
      <div className="loader-center-content">
        {/* Existing Salvex Auction brand logo */}
        <div className="loader-logo-wrapper" ref={logoRef}>
          <img
            src="/images/logo.png"
            alt="Salvex Auction"
            className="loader-salvex-logo"
            width={320}
            height={74}
          />
        </div>

        {/* Thin Salvex Red progress line */}
        <div className="loader-progress-track">
          <div ref={progressLineRef} className="loader-progress-bar" />
        </div>

        {/* Small loading text & subtle percentage indicator */}
        <div ref={metaRef} className="loader-meta-row">
          <span className="loader-sub-text">Preparing your auction experience</span>
          <span className="loader-percent-num">{progressVal}%</span>
        </div>
      </div>
    </div>
  );
}
