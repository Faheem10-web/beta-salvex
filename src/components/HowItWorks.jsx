import React from 'react';
import {
  UserPlus,
  ShieldCheck,
  Search,
  Gavel,
  Trophy,
  CreditCard,
  Truck
} from 'lucide-react';

export default function HowItWorks({ steps }) {
  const stepIcons = [
    UserPlus,     // 01 Register
    ShieldCheck,  // 02 Verify
    Search,       // 03 Find Vehicle
    Gavel,        // 04 Bid
    Trophy,       // 05 Win
    CreditCard,   // 06 Payment
    Truck         // 07 Vehicle Lifting
  ];

  return (
    <section className="salvex-section salvex-how-section" id="how-it-works">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-centered">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle centered-sub">
            A simple and transparent process from registration to vehicle lifting.
          </p>
        </div>

        {/* 7-Step Visual Process */}
        <div className="steps-process-container">
          <div className="steps-connecting-bar" aria-hidden="true" />

          <div className="steps-grid steps-grid-7">
            {steps.map((step, idx) => {
              const Icon = stepIcons[idx] || Search;
              return (
                <div key={step.number} className="step-card" id={`step-${step.number}`}>
                  <div className="step-icon-wrapper">
                    <div className="step-number-tag">{step.number}</div>
                    <div className="step-icon-circle">
                      <Icon size={19} strokeWidth={2} />
                    </div>
                  </div>

                  <div className="step-content">
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-description">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
