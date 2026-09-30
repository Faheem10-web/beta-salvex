import React from 'react';

// 01: Premium Verified Shield Icon
function PremiumVerifiedIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shieldGrad" x1="4" y1="2" x2="24" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#34D399" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>
      </defs>
      <path
        d="M14 2L4 6.5V13.5C4 19.6 8.3 25.2 14 26.5C19.7 25.2 24 19.6 24 13.5V6.5L14 2Z"
        fill="url(#shieldGrad)"
      />
      <path
        d="M14 3.5L5.5 7.3V13.5C5.5 18.6 9.1 23.5 14 24.8V3.5Z"
        fill="#FFFFFF"
        fillOpacity="0.22"
      />
      <path
        d="M9.5 14L12.5 17L18.5 10.5"
        stroke="#FFFFFF"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 02: Premium Auction Gavel Icon
function PremiumGavelIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gavelHeadGrad" x1="8" y1="2" x2="26" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F87171" />
          <stop offset="1" stopColor="#DC2626" />
        </linearGradient>
        <linearGradient id="gavelShaftGrad" x1="6" y1="22" x2="16" y2="12" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#FCA5A5" />
        </linearGradient>
      </defs>
      <rect
        x="13"
        y="3"
        width="11"
        height="6"
        rx="2"
        transform="rotate(45 13 3)"
        fill="url(#gavelHeadGrad)"
      />
      <rect
        x="14.4"
        y="4.4"
        width="2"
        height="6"
        transform="rotate(45 14.4 4.4)"
        fill="#FFFFFF"
        fillOpacity="0.8"
      />
      <rect
        x="18.6"
        y="8.6"
        width="2"
        height="6"
        transform="rotate(45 18.6 8.6)"
        fill="#FFFFFF"
        fillOpacity="0.8"
      />
      <path
        d="M14.5 15.5L6 24"
        stroke="url(#gavelShaftGrad)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M17 23H24"
        stroke="#FFFFFF"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeOpacity="0.95"
      />
      <path
        d="M19 25.5H22"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.65"
      />
    </svg>
  );
}

// 03: Premium Bank Vault Padlock Icon
function PremiumLockIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lockVaultGrad" x1="5" y1="10" x2="23" y2="25" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60A5FA" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      <path
        d="M8.5 11V7.5C8.5 4.46 10.96 2 14 2C17.04 2 19.5 4.46 19.5 7.5V11"
        stroke="#FFFFFF"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <rect
        x="5.5"
        y="11"
        width="17"
        height="14"
        rx="3.5"
        fill="url(#lockVaultGrad)"
      />
      <rect
        x="7"
        y="12.5"
        width="14"
        height="11"
        rx="2.5"
        fill="#FFFFFF"
        fillOpacity="0.18"
      />
      <circle cx="14" cy="16.5" r="2" fill="#FFFFFF" />
      <path
        d="M14 18.5V21.5"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 04: Premium VIP Concierge Headset Icon
function PremiumSupportIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="headsetGrad" x1="4" y1="3" x2="24" y2="25" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" />
          <stop offset="1" stopColor="#0284C7" />
        </linearGradient>
      </defs>
      <path
        d="M5 13.5C5 8.25 9.03 4 14 4C18.97 4 23 8.25 23 13.5"
        stroke="#FFFFFF"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <rect
        x="4"
        y="12.5"
        width="4"
        height="8"
        rx="2"
        fill="url(#headsetGrad)"
        stroke="#FFFFFF"
        strokeWidth="1.2"
      />
      <rect
        x="20"
        y="12.5"
        width="4"
        height="8"
        rx="2"
        fill="url(#headsetGrad)"
        stroke="#FFFFFF"
        strokeWidth="1.2"
      />
      <path
        d="M22 17.5V20.5C22 22.16 20.66 23.5 19 23.5H15"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="13.5" cy="23.5" r="2" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1.2" />
    </svg>
  );
}

export default function WhySalvex({ features }) {
  const premiumIcons = [
    {
      Component: PremiumVerifiedIcon,
      bg: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      shadow: '0 8px 24px -2px rgba(16, 185, 129, 0.40)',
      accentColor: '#10B981'
    },
    {
      Component: PremiumGavelIcon,
      bg: 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)',
      shadow: '0 8px 24px -2px rgba(220, 38, 38, 0.40)',
      accentColor: '#DC2626'
    },
    {
      Component: PremiumLockIcon,
      bg: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
      shadow: '0 8px 24px -2px rgba(59, 130, 246, 0.40)',
      accentColor: '#2563EB'
    },
    {
      Component: PremiumSupportIcon,
      bg: 'linear-gradient(135deg, #0EA5E9 0%, #0369A1 100%)',
      shadow: '0 8px 24px -2px rgba(14, 165, 233, 0.40)',
      accentColor: '#0284C7'
    }
  ];

  return (
    <section className="salvex-section salvex-trust-section" id="why-salvex">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-centered">
          <h2 className="section-title">Built for Transparent Vehicle Auctions</h2>
          <p className="section-subtitle centered-sub">
            Everything you need to participate in vehicle auctions with clarity and confidence.
          </p>
        </div>

        {/* Exactly 4 Premium Feature Cards */}
        <div className="why-features-grid">
          {features.map((item, idx) => {
            const config = premiumIcons[idx] || premiumIcons[0];
            const IconComp = config.Component;
            return (
              <div
                key={item.number}
                className="why-feature-card"
                id={`feature-${item.number}`}
              >
                <div className="why-card-top">
                  <div
                    className="why-icon-bubble"
                    style={{
                      background: config.bg,
                      boxShadow: config.shadow,
                      border: 'none'
                    }}
                  >
                    <IconComp />
                  </div>

                  <span
                    className="why-step-num"
                    style={{
                      color: config.accentColor,
                      backgroundColor: `${config.accentColor}12`,
                      borderColor: `${config.accentColor}28`
                    }}
                  >
                    {item.number}
                  </span>
                </div>

                <h3 className="why-feature-title">{item.title}</h3>
                <p className="why-feature-desc">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
