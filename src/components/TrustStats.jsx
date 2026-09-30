import React from 'react';

export default function TrustStats({ stats }) {
  return (
    <section className="salvex-compact-stats-section" id="compact-trust-stats">
      <div className="section-container">
        <div className="compact-stats-bar">
          {stats.map((item, idx) => (
            <React.Fragment key={item.label}>
              <div className="compact-stat-cell">
                <div className="compact-stat-number">{item.value}</div>
                <div className="compact-stat-label">{item.label}</div>
              </div>
              {idx < stats.length - 1 && (
                <div className="compact-stat-divider" aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
