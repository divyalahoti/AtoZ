import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { FiCheck, FiArrowRight } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";
import "./Checkout.css";

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name:"", email:"", phone:"", address:"", city:"", state:"", pincode:"", payment:"upi" });

  const shipping = cartTotal > 999 ? 0 : 99;
  const total = cartTotal + shipping;

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePlaceOrder = () => {
    toast.success("🎉 Order placed successfully! You will receive a confirmation shortly.");
    clearCart();
    setTimeout(() => navigate("/track-order"), 2000);
  };

  return (
    <div className="checkout-page">
      <Navbar />
      <div className="checkout-hero">
        <span className="section-label">Secure Checkout</span>
        <h1 className="section-title">Complete Your <em>Order</em></h1>
      </div>

      {/* Steps */}
      <div className="checkout-steps">
        {["Shipping", "Payment", "Confirm"].map((s, i) => (
          <div key={i} className={`step ${step > i + 1 ? "done" : step === i + 1 ? "active" : ""}`}>
            <div className="step-num">{step > i + 1 ? <FiCheck /> : i + 1}</div>
            <span>{s}</span>
            {i < 2 && <div className="step-line"></div>}
          </div>
        ))}
      </div>

      <div className="checkout-container">
        <div className="checkout-form">
          {step === 1 && (
            <div className="form-section">
              <h3>Shipping Details</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
                </div>
                <div className="form-group">
                  <label>Phone *</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 00000 00000" />
                </div>
                <div className="form-group full">
                  <label>Address *</label>
                  <input name="address" value={form.address} onChange={handleChange} placeholder="House/Flat, Street, Area" />
                </div>
                <div className="form-group">
                  <label>City *</label>
                  <input name="city" value={form.city} onChange={handleChange} placeholder="City" />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input name="state" value={form.state} onChange={handleChange} placeholder="State" />
                </div>
                <div className="form-group">
                  <label>PIN Code *</label>
                  <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="PIN Code" />
                </div>
              </div>
              <button className="btn-primary next-btn" onClick={() => {
                if (!form.name || !form.email || !form.phone || !form.address || !form.city || !form.pincode) {
                  toast.warn("Please fill all required fields"); return;
                }
                setStep(2);
              }}>Continue to Payment <FiArrowRight /></button>
            </div>
          )}

          {step === 2 && (
            <div className="form-section">
              <h3>Payment Method</h3>
              <div className="payment-options">
                {[
                  { val: "upi", label: "UPI / Google Pay / PhonePe", icon: "💳" },
                  { val: "cod", label: "Cash on Delivery", icon: "💵" },
                  { val: "card", label: "Credit / Debit Card", icon: "🏦" },
                  { val: "netbanking", label: "Net Banking", icon: "🌐" },
                ].map(opt => (
                  <label key={opt.val} className={`payment-option ${form.payment === opt.val ? "selected" : ""}`}>
                    <input type="radio" name="payment" value={opt.val} checked={form.payment === opt.val} onChange={handleChange} />
                    <span>{opt.icon}</span>
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
              {form.payment === "card" && (
                <div className="form-grid" style={{ marginTop: "1.5rem" }}>
                  <div className="form-group full"><label>Card Number</label><input placeholder="0000 0000 0000 0000" /></div>
                  <div className="form-group"><label>Expiry</label><input placeholder="MM/YY" /></div>
                  <div className="form-group"><label>CVV</label><input placeholder="000" type="password" /></div>
                </div>
              )}
              <div className="step-nav">
                <button className="btn-outline" onClick={() => setStep(1)}>← Back</button>
                <button className="btn-primary next-btn" onClick={() => setStep(3)}>Review Order <FiArrowRight /></button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-section">
              <h3>Review Your Order</h3>
              <div className="review-address">
                <h4>Delivering to:</h4>
                <p>{form.name}</p>
                <p>{form.address}, {form.city}, {form.state} - {form.pincode}</p>
                <p>{form.phone} | {form.email}</p>
              </div>
              <div className="review-items">
                {cart.map(item => (
                  <div key={item._id} className="review-item-row">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <p>{item.name}</p>
                      <span>Qty: {item.qty}</span>
                    </div>
                    <strong>₹{(item.price * item.qty)?.toLocaleString("en-IN")}</strong>
                  </div>
                ))}
              </div>
              <div className="step-nav">
                <button className="btn-outline" onClick={() => setStep(2)}>← Back</button>
                <button className="btn-primary next-btn place-order" onClick={handlePlaceOrder}>
                  <FiCheck /> Place Order — ₹{total?.toLocaleString("en-IN")}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="checkout-summary">
          <h3>Order Summary</h3>
          {cart.map(item => (
            <div key={item._id} className="cs-item">
              <img src={item.image} alt={item.name} />
              <div>
                <p>{item.name}</p>
                <span>Qty: {item.qty}</span>
              </div>
              <strong>₹{(item.price * item.qty)?.toLocaleString("en-IN")}</strong>
            </div>
          ))}
          <div className="cs-total-lines">
            <div className="cs-line"><span>Subtotal</span><span>₹{cartTotal?.toLocaleString("en-IN")}</span></div>
            <div className="cs-line"><span>Shipping</span><span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span></div>
            <div className="cs-line total"><span>Total</span><span>₹{total?.toLocaleString("en-IN")}</span></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
