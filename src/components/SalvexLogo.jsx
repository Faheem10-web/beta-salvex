import React from 'react';

export default function SalvexLogo({ variant = 'dark', className = '', height = 36 }) {
  if (variant === 'light' || variant === 'brand') {
    return (
      <img
        src="/images/logo.png"
        alt="Salvex Auction"
        className={`salvex-logo-img ${className}`}
        style={{
          height: `${height}px`,
          width: 'auto',
          maxHeight: '44px',
          objectFit: 'contain',
          display: 'block',
          userSelect: 'none'
        }}
      />
    );
  }

  // Dark variant for dark backgrounds (e.g. dark navbar & footer) -> whitelogo.png
  return (
    <img
      src="/images/whitelogo.png"
      alt="Salvex Auction"
      className={`salvex-logo-img salvex-logo-dark ${className}`}
      style={{
        height: `${height}px`,
        width: 'auto',
        maxHeight: '42px',
        objectFit: 'contain',
        display: 'block',
        userSelect: 'none'
      }}
    />
  );
}
