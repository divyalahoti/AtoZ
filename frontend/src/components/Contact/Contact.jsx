import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { FiMail, FiPhone, FiMapPin, FiSend, FiInstagram, FiFacebook } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { toast } from "react-toastify";
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    toast.success("Message sent! We'll reply within 24 hours 💌");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="contact-page">
      <Navbar />
      <div className="contact-hero">
        <span className="section-label">Get In Touch</span>
        <h1 className="section-title">Contact <em>Us</em></h1>
        <p>We'd love to hear from you. We're here to help!</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h3>Let's Talk</h3>
          <p>Have a question about our jewellery? Want to place a bulk order? Or just want to say hello? We're always happy to hear from you.</p>
          <div className="contact-cards">
            <a href="mailto:info@atozjewellery.com" className="contact-card">
              <FiMail /><div><strong>Email Us</strong><span>info@atozjewellery.com</span></div>
            </a>
            <a href="tel:+919428380108" className="contact-card">
              <FiPhone /><div><strong>Call Us</strong><span>+91 94283 80108</span></div>
            </a>
            <div className="contact-card">
              <FiMapPin /><div><strong>Visit Us</strong><span>Himatnagar, Gujarat, India</span></div>
            </div>
            <a href="https://wa.me/919428380108" target="_blank" rel="noreferrer" className="contact-card whatsapp">
              <FaWhatsapp /><div><strong>WhatsApp</strong><span>Chat directly with us</span></div>
            </a>
          </div>
          <div className="contact-hours">
            <h4>Business Hours</h4>
            <p>Monday – Saturday: 10 AM – 7 PM</p>
            <p>Sunday: 11 AM – 5 PM</p>
          </div>
          <div className="contact-social">
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FiInstagram /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FiFacebook /></a>
            <a href="https://wa.me/919428380108" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Send a Message</h3>
          <div className="cf-grid">
            <div className="cf-group">
              <label>Your Name *</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" required />
            </div>
            <div className="cf-group">
              <label>Email Address *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
            </div>
            <div className="cf-group full">
              <label>Subject</label>
              <input name="subject" value={form.subject} onChange={handleChange} placeholder="How can we help?" />
            </div>
            <div className="cf-group full">
              <label>Message *</label>
              <textarea name="message" value={form.message} onChange={handleChange} placeholder="Write your message here..." rows={5} required></textarea>
            </div>
          </div>
          <button type="submit" className="btn-primary">
            <FiSend /> Send Message
          </button>
        </form>
      </div>

      <div className="contact-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29471.12!2d72.9729!3d23.5998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e802a8e2a9b2b%3A0x7a1c7c3a3f9e8c0!2sHimatnagar%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          allowFullScreen="" loading="lazy" title="AtoZ Location"
        ></iframe>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
