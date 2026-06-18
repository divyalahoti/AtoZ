import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { FiSearch, FiPackage, FiTruck, FiCheck, FiClock } from "react-icons/fi";
import "./OrderTracking.css";

const OrderTracking = () => {
  const [orderId, setOrderId] = useState("");
  const [tracked, setTracked] = useState(false);

  const demoOrder = {
    id: "ATZ-2025-00128",
    status: "shipped",
    product: "Oxidised Peacock Necklace Set",
    date: "26 May 2025",
    estimated: "30 May 2025",
    steps: [
      { label: "Order Placed", desc: "Your order has been confirmed", date: "26 May, 10:30 AM", done: true },
      { label: "Processing", desc: "Order is being prepared", date: "26 May, 02:00 PM", done: true },
      { label: "Shipped", desc: "Order picked up by courier", date: "27 May, 09:15 AM", done: true },
      { label: "Out for Delivery", desc: "Your order is on the way", date: "30 May", done: false },
      { label: "Delivered", desc: "Successfully delivered", date: "Est. 30 May", done: false },
    ],
  };

  const handleTrack = () => {
    if (orderId.trim()) setTracked(true);
  };

  return (
    <div className="track-page">
      <Navbar />
      <div className="track-hero">
        <span className="section-label">AtoZ Jewellery</span>
        <h1 className="section-title">Track Your <em>Order</em></h1>
        <p>Enter your order ID to get real-time updates</p>
      </div>

      <div className="track-container">
        <div className="track-search">
          <input
            type="text"
            placeholder="Enter Order ID (e.g. ATZ-2025-00128)"
            value={orderId}
            onChange={e => setOrderId(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleTrack()}
          />
          <button className="btn-primary" onClick={handleTrack}>
            <FiSearch /> Track Order
          </button>
        </div>
        <p className="track-demo-hint">Try demo: <button onClick={() => { setOrderId("ATZ-2025-00128"); setTracked(true); }}>ATZ-2025-00128</button></p>

        {tracked && (
          <div className="track-result">
            <div className="track-result-header">
              <div>
                <h3>Order #{demoOrder.id}</h3>
                <p>{demoOrder.product}</p>
                <p className="track-dates">Placed: {demoOrder.date} &nbsp;|&nbsp; Expected: {demoOrder.estimated}</p>
              </div>
              <span className="track-status-badge">{demoOrder.status.toUpperCase()}</span>
            </div>

            <div className="track-timeline">
              {demoOrder.steps.map((step, i) => (
                <div key={i} className={`track-step ${step.done ? "done" : i === demoOrder.steps.findIndex(s => !s.done) ? "current" : ""}`}>
                  <div className="track-step-icon">
                    {step.done ? <FiCheck /> : i === 3 ? <FiTruck /> : i === 4 ? <FiPackage /> : <FiClock />}
                  </div>
                  {i < demoOrder.steps.length - 1 && <div className="track-connector"></div>}
                  <div className="track-step-info">
                    <h4>{step.label}</h4>
                    <p>{step.desc}</p>
                    <span>{step.date}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="track-help">
              <p>Need help? <a href="https://wa.me/919428380108" target="_blank" rel="noreferrer">Chat on WhatsApp</a> or <a href="/contact">Contact Us</a></p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrderTracking;
