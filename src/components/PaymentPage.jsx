import React, { useState } from 'react';
import {
  CreditCard,
  Building2,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  ArrowRight,
  Download,
  Copy,
  Check,
  Truck
} from 'lucide-react';
import { wonAuctionsData } from '../data/mockVehicles';
import './PaymentPage.css';

export default function PaymentPage({
  lotId = 'won-101',
  onNavigateLifting,
  onNavigateDashboard,
  onShowToast
}) {
  const lot = wonAuctionsData.find((l) => l.id === lotId) || wonAuctionsData[0];
  const [paymentStatus, setPaymentStatus] = useState(lot.paymentStatus || 'Pending'); // 'Pending' | 'Processing' | 'Paid' | 'Failed'
  const [paymentMethod, setPaymentMethod] = useState('rtgs'); // 'rtgs' | 'netbanking'
  const [utrNumber, setUtrNumber] = useState('');
  const [copiedField, setCopiedField] = useState(null);

  const formatCurrency = (amt) => {
    return '₹' + Number(amt || 0).toLocaleString('en-IN');
  };

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    if (onShowToast) onShowToast(`${fieldName} copied to clipboard`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSimulatePayment = (e) => {
    e.preventDefault();
    setPaymentStatus('Processing');

    setTimeout(() => {
      setPaymentStatus('Paid');
      if (onShowToast) {
        onShowToast('Escrow payment verified! Digital Gate Pass has been issued.');
      }
    }, 1200);
  };

  return (
    <div className="salvex-payment-page">
      {/* 01 HEADER */}
      <section className="payment-hero">
        <div className="salvex-container">
          <div className="payment-hero-inner">
            <span className="payment-pill">
              <ShieldCheck size={14} />
              RESERVE BANK OF INDIA REGULATED ESCROW CONDUIT
            </span>
            <h1 className="payment-title">Escrow Settlement & Invoice Checkout</h1>
            <p className="payment-subtitle">
              Secure settlement portal for Lot #{lot.id.toUpperCase()} • {lot.yearMfg} {lot.make} {lot.model}.
            </p>
          </div>
        </div>
      </section>

      {/* 02 MAIN CHECKOUT CONTENT */}
      <section className="payment-body-section">
        <div className="salvex-container">
          <div className="payment-layout-grid">
            {/* LEFT COLUMN: INVOICE BREAKDOWN & VEHICLE SUMMARY */}
            <div className="invoice-left-col">
              {/* Vehicle Summary Card */}
              <div className="payment-vehicle-card">
                <img src={lot.image} alt={`${lot.make} ${lot.model}`} className="pv-thumb" />
                <div className="pv-info">
                  <span className="pv-badge">LOT WON</span>
                  <h3>{lot.yearMfg} {lot.make} {lot.model}</h3>
                  <p className="pv-yard">Holding Yard: {lot.yardLocation}</p>
                </div>
              </div>

              {/* Comprehensive Invoice Breakdown */}
              <div className="invoice-breakdown-card">
                <div className="ibc-header">
                  <FileText size={18} />
                  <h3>Official Commercial Invoice Breakdown</h3>
                  <span className="invoice-no">#SLX-INV-9901</span>
                </div>

                <div className="ibc-rows-list">
                  <div className="ibc-row">
                    <span className="row-label">Winning Hammer Bid Consideration</span>
                    <span className="row-value">{formatCurrency(lot.winningBid)}</span>
                  </div>

                  <div className="ibc-row">
                    <span className="row-label">
                      Buyer’s Premium (Platform Success Fee @ 2.5%)
                    </span>
                    <span className="row-value">{formatCurrency(lot.buyerPremium)}</span>
                  </div>

                  <div className="ibc-row">
                    <span className="row-label">Yard Logistics & RTO NOC Documentation</span>
                    <span className="row-value">{formatCurrency(lot.documentationCharges)}</span>
                  </div>

                  <div className="ibc-row">
                    <span className="row-label">Statutory Goods & Services Tax (GST 18% on Fees)</span>
                    <span className="row-value">{formatCurrency(lot.gstTaxes)}</span>
                  </div>

                  <div className="ibc-row discount-row">
                    <span className="row-label">Less: Pre-Bid Security Deposit (EMD Adjustment)</span>
                    <span className="row-value text-success">{formatCurrency(lot.securityDepositAdjustment)}</span>
                  </div>

                  <div className="ibc-divider" />

                  <div className="ibc-total-row">
                    <div>
                      <span className="total-title">Total Net Payable Consideration</span>
                      <span className="total-sub">Includes all platform, gate, and documentation fees</span>
                    </div>
                    <span className="total-amount-val text-red">
                      {formatCurrency(lot.totalPayable)}
                    </span>
                  </div>
                </div>

                <div className="payment-deadline-warning">
                  <Clock size={16} className="text-warning" />
                  <div>
                    <strong>Mandatory Settlement Deadline:</strong> {lot.paymentDeadline}
                    <p className="text-muted">Failure to settle within the designated window results in EMD forfeiture under Section 5.2 of the Auction Bylaws.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: ESCROW PAYMENT METHODS & PROCESSING STATES */}
            <div className="payment-right-col">
              {/* Payment State: PAID */}
              {paymentStatus === 'Paid' && (
                <div className="payment-status-card status-success-card">
                  <div className="icon-circ success-circ">
                    <CheckCircle2 size={44} className="text-success" />
                  </div>
                  <h2>Payment Cleared & Confirmed</h2>
                  <p className="status-desc">
                    The settlement consideration of <strong>{formatCurrency(lot.totalPayable)}</strong> has been verified by the Salvex Escrow Trust.
                  </p>

                  <div className="settlement-receipt-box">
                    <div className="srb-row">
                      <span>Receipt Number:</span>
                      <strong>REC-2026-BLR-8842</strong>
                    </div>
                    <div className="srb-row">
                      <span>Gate Pass Status:</span>
                      <strong className="text-success">Generated & Active</strong>
                    </div>
                    <div className="srb-row">
                      <span>Complimentary Storage:</span>
                      <strong>5 Business Days Remaining</strong>
                    </div>
                  </div>

                  <div className="status-actions">
                    <button
                      type="button"
                      className="salvex-btn salvex-btn-primary w-full"
                      onClick={() => onNavigateLifting(lot.id)}
                    >
                      <Truck size={16} />
                      <span>Proceed to Vehicle Lifting & Gate Pass</span>
                      <ArrowRight size={15} />
                    </button>

                    <button
                      type="button"
                      className="salvex-btn salvex-btn-outline w-full"
                      onClick={() => onShowToast('Tax invoice PDF downloaded.')}
                    >
                      <Download size={15} />
                      <span>Download Statutory Tax Invoice</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Payment State: PROCESSING */}
              {paymentStatus === 'Processing' && (
                <div className="payment-status-card status-processing-card">
                  <div className="spinner-large" />
                  <h2>Verifying RTGS / Escrow Clearance</h2>
                  <p className="status-desc">
                    Communicating with banking rails to match your transaction reference with incoming escrow credits...
                  </p>
                  <span className="stat-hint">Please do not close this browser window.</span>
                </div>
              )}

              {/* Payment State: PENDING (Default Form) */}
              {paymentStatus === 'Pending' && (
                <div className="payment-form-card">
                  <div className="pfc-header">
                    <Building2 size={20} />
                    <div>
                      <h3>Official Escrow Banking Details</h3>
                      <p>Remit funds via RTGS / NEFT to the dedicated virtual escrow account below.</p>
                    </div>
                  </div>

                  {/* Virtual Account Grid */}
                  <div className="virtual-account-table">
                    <div className="va-row">
                      <span className="va-lbl">Beneficiary Name</span>
                      <div className="va-val-wrap">
                        <strong>SALVEX AUCTION ESCROW TRUST</strong>
                        <button
                          type="button"
                          className="btn-copy"
                          onClick={() => handleCopy('SALVEX AUCTION ESCROW TRUST', 'Beneficiary Name')}
                        >
                          {copiedField === 'Beneficiary Name' ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>

                    <div className="va-row">
                      <span className="va-lbl">Bank Name</span>
                      <div className="va-val-wrap">
                        <span>HDFC Bank Limited (Corporate Wholesale Banking)</span>
                      </div>
                    </div>

                    <div className="va-row">
                      <span className="va-lbl">Virtual Account Number</span>
                      <div className="va-val-wrap">
                        <strong className="text-red">SLVXESC99018842</strong>
                        <button
                          type="button"
                          className="btn-copy"
                          onClick={() => handleCopy('SLVXESC99018842', 'Virtual Account Number')}
                        >
                          {copiedField === 'Virtual Account Number' ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>

                    <div className="va-row">
                      <span className="va-lbl">IFSC Code</span>
                      <div className="va-val-wrap">
                        <strong>HDFC0000128</strong>
                        <button
                          type="button"
                          className="btn-copy"
                          onClick={() => handleCopy('HDFC0000128', 'IFSC Code')}
                        >
                          {copiedField === 'IFSC Code' ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* UTR Submission Form */}
                  <form onSubmit={handleSimulatePayment} className="utr-submission-form">
                    <div className="form-field">
                      <label htmlFor="utr-input">16-Digit Bank UTR / Transaction Reference Number *</label>
                      <input
                        type="text"
                        id="utr-input"
                        required
                        placeholder="e.g. HDFCR520260930008819"
                        value={utrNumber}
                        onChange={(e) => setUtrNumber(e.target.value)}
                      />
                      <span className="utr-hint">
                        Enter the Unique Transaction Reference (UTR) provided by your bank post-transfer.
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="salvex-btn salvex-btn-primary btn-settle-action"
                    >
                      <CheckCircle2 size={16} />
                      <span>Confirm Escrow Remittance ({formatCurrency(lot.totalPayable)})</span>
                    </button>

                    <button
                      type="button"
                      className="salvex-btn salvex-btn-ghost w-full"
                      onClick={onNavigateDashboard}
                    >
                      <span>Return to Bidder Dashboard</span>
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
