import React from 'react';

export default function SalvexLogo({ variant = 'dark', className = '', height = 62, maxHeight, src, style = {} }) {
  const effectiveMaxHeight = maxHeight || (typeof height === 'number' ? `${height + 12}px` : '80px');
  const logoSrc = src || (variant === 'light' || variant === 'brand' ? '/images/lg.png' : '/images/whitelogo.png');

  return (
    <img
      src={logoSrc}
      alt="Salvex Auction"
      className={`salvex-logo-img ${variant === 'dark' && !src ? 'salvex-logo-dark' : ''} ${className}`}
      style={{
        height: typeof height === 'number' ? `${height}px` : height,
        width: 'auto',
        maxHeight: effectiveMaxHeight,
        objectFit: 'contain',
        display: 'block',
        userSelect: 'none',
        ...style
      }}
    />
  );
}
