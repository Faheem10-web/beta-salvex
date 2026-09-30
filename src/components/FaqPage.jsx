import React, { useState, useMemo } from 'react';
import {
  Search,
  ChevronDown,
  HelpCircle,
  FileQuestion,
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import { faqData } from '../data/mockVehicles';
import './FaqPage.css';

export default function FaqPage({ onContactClick, onRegisterClick }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openFaqId, setOpenFaqId] = useState('faq-1');

  const categories = ['All', 'Registration & KYC', 'Bidding Process', 'Payment & Settlement', 'Vehicle Lifting', 'Selling Vehicles'];

  const filteredFaqs = useMemo(() => {
    return faqData.filter((faq) => {
      if (selectedCategory !== 'All' && faq.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          faq.question.toLowerCase().includes(q) ||
          faq.answer.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="salvex-faq-page">
      {/* 01 HERO */}
      <section className="faq-hero">
        <div className="salvex-container">
          <div className="faq-hero-inner">
            <span className="faq-pill">KNOWLEDGE BASE & GUIDELINES</span>
            <h1 className="faq-title">Frequently Asked Questions</h1>
            <p className="faq-subtitle">
              Find instant answers to common questions regarding bidder verification, live bidding procedures, escrow payments, and post-auction vehicle lifting.
            </p>

            {/* Instant Search Bar */}
            <div className="faq-search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search questions (e.g., cancel bid, payment deadline, required KYC, lifting)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="faq-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 02 CATEGORY PILLS */}
      <section className="faq-categories-bar">
        <div className="salvex-container">
          <div className="faq-cats-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`faq-cat-pill ${selectedCategory === cat ? 'cat-active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 03 ACCORDION LIST */}
      <section className="faq-list-section">
        <div className="salvex-container">
          <div className="faq-accordion-container">
            {filteredFaqs.length === 0 ? (
              <div className="faq-empty-state">
                <FileQuestion size={40} className="text-muted" />
                <h3>No Matching Questions Found</h3>
                <p>We couldn't find an answer matching "{searchQuery}". Please contact our support desk.</p>
                <button
                  type="button"
                  className="salvex-btn salvex-btn-outline"
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                >
                  Clear Search Filter
                </button>
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`faq-accordion-item ${isOpen ? 'item-open' : ''}`}
                  >
                    <button
                      type="button"
                      className="faq-question-btn"
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      aria-expanded={isOpen}
                    >
                      <span className="faq-q-text">
                        <span className="faq-category-tag">{faq.category}</span>
                        <span className="question-string">{faq.question}</span>
                      </span>
                      <ChevronDown
                        size={20}
                        className={`faq-chevron ${isOpen ? 'chevron-rotated' : ''}`}
                      />
                    </button>

                    {isOpen && (
                      <div className="faq-answer-panel">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Still Have Questions CTA */}
          <div className="faq-bottom-cta-card">
            <div className="cta-left">
              <MessageCircle size={28} className="text-auction-red" />
              <div>
                <h4>Still have questions or need auction assistance?</h4>
                <p>Our dedicated operations team is available Monday through Saturday to assist you.</p>
              </div>
            </div>
            <div className="cta-right">
              <button
                type="button"
                className="salvex-btn salvex-btn-primary"
                onClick={onContactClick}
              >
                <span>Contact Operations Desk</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
