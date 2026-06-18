import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./About.css";

const About = () => {
  const team = [
    { name: "Aarav Shah", role: "Founder & Creative Director", initial: "A" },
    { name: "Priya Patel", role: "Head of Design", initial: "P" },
    { name: "Rohit Joshi", role: "Operations Manager", initial: "R" },
    { name: "Meera Desai", role: "Customer Relations", initial: "M" },
  ];
  const values = [
    { icon: "💎", title: "Quality First", desc: "Every piece is hand-inspected for quality before dispatch" },
    { icon: "🌸", title: "Artisan Crafted", desc: "Supporting traditional jewellery artisans from Gujarat" },
    { icon: "♻️", title: "Sustainable", desc: "Eco-conscious packaging and responsible sourcing" },
    { icon: "❤️", title: "Customer Love", desc: "10,000+ happy customers across India" },
  ];
  return (
    <div className="about-page">
      <Navbar />

      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="section-label">Est. 2015 — Himatnagar, Gujarat</span>
          <h1 className="section-title">Our <em>Story</em></h1>
          <p>From a small workshop to India's loved artificial jewellery brand</p>
        </div>
      </section>

      {/* Story */}
      <section className="about-story">
        <div className="about-story-grid">
          <div className="about-story-text">
            <span className="section-label">Who We Are</span>
            <h2 className="section-title">Crafting <em>Beauty</em><br />Since 2015</h2>
            <p>AtoZ Jewellery was born from a simple belief — every woman deserves to look and feel beautiful, without compromise. Started in a small workshop in Himatnagar, Gujarat, we began with a vision to make premium artificial jewellery accessible to all.</p>
            <p>Today, we are proud to offer over 500+ unique designs spanning necklaces, earrings, bangles, rings, payals, and complete bridal sets. Our collection celebrates India's rich jewellery heritage through oxidised silver work, kundan, meenakari, and stone-studded pieces.</p>
            <p>Each piece at AtoZ Jewellery is thoughtfully designed and quality-checked to ensure it brings joy and confidence to the wearer.</p>
            <Link to="/collection" className="btn-primary">Explore Collection <FiArrowRight /></Link>
          </div>
          <div className="about-story-images">
            <img src="https://images.unsplash.com/photo-1608042314453-ae338d80c427?w=600&q=80" alt="Our Story" className="story-img-1" />
            <img src="https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&q=80" alt="Jewellery" className="story-img-2" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        {[
          { num: "10,000+", label: "Happy Customers" },
          { num: "500+", label: "Unique Designs" },
          { num: "15+", label: "Categories" },
          { num: "9", label: "Years of Excellence" },
        ].map((s, i) => (
          <div key={i} className="about-stat">
            <strong>{s.num}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="about-values-inner">
          <div className="section-header">
            <span className="section-label">What We Stand For</span>
            <h2 className="section-title">Our <em>Values</em></h2>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <div key={i} className="value-card">
                <span className="value-icon">{v.icon}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-team">
        <div className="about-team-inner">
          <div className="section-header">
            <span className="section-label">The People</span>
            <h2 className="section-title">Meet Our <em>Team</em></h2>
          </div>
          <div className="team-grid">
            {team.map((m, i) => (
              <div key={i} className="team-card">
                <div className="team-avatar">{m.initial}</div>
                <h4>{m.name}</h4>
                <span>{m.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2>Ready to Find Your Perfect Piece?</h2>
        <p>Explore our handcrafted collections and discover jewellery made for you</p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/collection" className="btn-primary">Shop Now <FiArrowRight /></Link>
          <Link to="/contact" className="btn-outline" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.4)" }}>Contact Us</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
