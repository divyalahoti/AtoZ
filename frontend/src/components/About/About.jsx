import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./About.css";
import { useNavigate } from "react-router-dom";

const About = () => {

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out-cubic",
      once: true,
      mirror: false,
      offset: 80,
      delay: 50,
    });
  }, []);

  return (
    <div className="about">

      {/* HERO */}
      <section className="about-hero">
        <div className="hero-overlay">
          <h1 data-aos="fade-down" data-aos-duration="1200">
            About Diya Creation
          </h1>

          <p data-aos="fade-up" data-aos-delay="300">
            Timeless Jewellery. Crafted with Passion.
          </p>


        </div>
      </section>

      {/* STORY */}
      <section className="about-section">

        <div className="about-img" data-aos="fade-right" data-aos-duration="1200">
          <img
            src="https://images.unsplash.com/photo-1608042314453-ae338d80c427"
            alt="Jewellery"
          />
        </div>

        <div className="about-text" data-aos="fade-left" data-aos-delay="200">
          <h2>Our Story</h2>
          <p>
            At Diya Creation, we believe jewellery is more than just an accessory —
            it is an expression of identity, elegance, and emotion.
          </p>
          <p>
            Every piece is thoughtfully designed to blend tradition with modern luxury,
            ensuring timeless beauty for every occasion.
          </p>
        </div>

      </section>

      {/* FEATURES */}
      <section className="features">

        <div className="feature-card" data-aos="zoom-in-up" data-aos-delay="0">
          <div className="icon">💎</div>
          <h3>Premium Quality</h3>
          <p>Crafted using the finest materials and expert craftsmanship.</p>
        </div>

        <div className="feature-card" data-aos="zoom-in-up" data-aos-delay="150">
          <div className="icon">✨</div>
          <h3>Elegant Designs</h3>
          <p>Luxury styles for every occasion.</p>
        </div>

        <div className="feature-card" data-aos="zoom-in-up" data-aos-delay="300">
          <div className="icon">🚚</div>
          <h3>Fast Delivery</h3>
          <p>Secure and reliable delivery across India.</p>
        </div>

      </section>

      {/* VISION & MISSION */}
      <section className="vision-section">

        <div className="vision-box" data-aos="fade-up-right" data-aos-delay="100">
          <h3>Our Vision</h3>
          <p>
            To become a trusted jewellery brand known for elegance,
            quality, and timeless craftsmanship.
          </p>
        </div>

        <div className="vision-box" data-aos="fade-up-left" data-aos-delay="200">
          <h3>Our Mission</h3>
          <p>
            To create beautiful jewellery that celebrates every moment
            and makes every woman feel confident and special.
          </p>
        </div>

      </section>

      {/* STATS */}
      <section className="stats">

        <div data-aos="zoom-in" data-aos-delay="0">
          <h2>500+</h2>
          <p>Happy Customers</p>
        </div>

        <div data-aos="zoom-in" data-aos-delay="150">
          <h2>1000+</h2>
          <p>Jewellery Designs</p>
        </div>

        <div data-aos="zoom-in" data-aos-delay="300">
          <h2>5+</h2>
          <p>Years Experience</p>
        </div>

      </section>

      {/* PROCESS */}
      <section className="process">

        <h2 data-aos="fade-up">Our Process</h2>

        <div className="process-steps">

          <div data-aos="fade-up" data-aos-delay="100">
            <h4>Design</h4>
            <p>Creative and unique ideas.</p>
          </div>

         <div data-aos="fade-up" data-aos-delay="200">
            <h4>Craft</h4>
            <p>Handcrafted with precision.</p>
          </div>

          <div data-aos="fade-up" data-aos-delay="300">
            <h4>Deliver</h4>
            <p>Carefully packed & delivered.</p>
          </div>

        </div>

      </section>

      {/* BRAND (WHY CHOOSE US) */}
      <section className="brand-section" data-aos="fade-up" data-aos-duration="1000">
        <h2>Why Choose Us</h2>
        <p>
          Trusted by thousands, Diya Creation is committed to delivering excellence,
          authenticity, and unmatched customer experience.
        </p>
      </section>

      {/* CTA */}
      <section className="cta" data-aos="zoom-in" data-aos-duration="1200">
        <h2>Explore Our Collection</h2>
        <p>Find the perfect jewellery for every occasion.</p>

        <button 
  onClick={() => navigate("/productlist")}
  data-aos="fade-up"
  data-aos-delay="300"
>
  Shop Now
</button>
      </section>

    </div>
  );
};

export default About;