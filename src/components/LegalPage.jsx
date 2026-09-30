import React, { useState } from 'react';
import {
  FileText,
  ShieldCheck,
  RotateCcw,
  Gavel,
  Calendar,
  Download,
  Printer
} from 'lucide-react';
import { legalPoliciesData } from '../data/mockVehicles';
import './LegalPage.css';

export default function LegalPage({ initialTab = 'terms' }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  const tabs = [
    { id: 'terms', label: 'Terms & Conditions', icon: FileText, data: legalPoliciesData.terms },
    { id: 'privacy', label: 'Privacy Policy', icon: ShieldCheck, data: legalPoliciesData.privacy },
    { id: 'refund', label: 'Refund & EMD Policy', icon: RotateCcw, data: legalPoliciesData.refund },
    { id: 'auction', label: 'Official Auction Policy', icon: Gavel, data: legalPoliciesData.auction }
  ];

  const currentPolicy = tabs.find((t) => t.id === activeTab)?.data || legalPoliciesData.terms;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="salvex-legal-page">

      {/* 02 TABS & DOCUMENT CONTENT */}
      <section className="legal-body-section">
        <div className="salvex-container">
          <div className="legal-layout-container">
            {/* Sidebar Tabs */}
            <aside className="legal-sidebar-nav">
              <div className="legal-nav-card">
                <span className="nav-group-label">LEGAL POLICIES</span>
                <nav className="legal-tab-list">
                  {tabs.map((tab) => {
                    const IconC = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        className={`legal-tab-btn ${isActive ? 'tab-btn-active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        <IconC size={16} />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>

                <div className="legal-actions-box">
                  <button
                    type="button"
                    className="legal-action-btn"
                    onClick={handlePrint}
                  >
                    <Printer size={14} />
                    <span>Print Document</span>
                  </button>
                </div>
              </div>
            </aside>

            {/* Document Content Panel */}
            <main className="legal-content-card">
              <div className="document-header">
                <h2>{currentPolicy.title}</h2>
                <span className="doc-version-tag">Version 2.4 · Official Publication</span>
              </div>

              <div className="document-body">
                <p className="doc-intro">
                  This document establishes the official regulatory and contractual framework between Salvex Auction (“the Platform”), registered bidders, and asset consignors. By accessing the platform or participating in active bidding, you agree to be bound by the terms outlined below.
                </p>

                {currentPolicy.sections?.map((sec, idx) => (
                  <article key={idx} className="doc-section">
                    <h3 className="section-heading">{sec.heading}</h3>
                    <p className="section-paragraph">{sec.content}</p>
                  </article>
                ))}

                <article className="doc-section">
                  <h3 className="section-heading">Applicable Jurisdiction & Arbitration</h3>
                  <p className="section-paragraph">
                    All transactions, disputes, and auction contracts executed via the Salvex Auction terminal are subject to the exclusive jurisdiction of the competent courts in Bengaluru, Karnataka, India. Any dispute arising out of or in connection with this contract shall be determined by arbitration in accordance with the Arbitration and Conciliation Act, 1996.
                  </p>
                </article>

                <div className="doc-signoff">
                  <p><strong>Salvex Auction Compliance & Legal Department</strong></p>
                  <p className="signoff-note">Issued for the governance of digital motor vehicle auctions across India.</p>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}
