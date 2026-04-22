import { useEffect } from "react";
import "./Footer.css";
import  AOS  from 'aos';


const Footer = () => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-in-out-cubic",
      once: true,
      offset: 60,
    });
  }, []);
  return (


    <footer className="footer" data-aos="fade-up" data-aos-duration="1000">

      {/* TOP */}
      <div className="footer-top">
        <div className="footer-brand" data-aos="fade-right" data-aos-delay="100">
          <h2>DIYA CREATION</h2>
          <p>
            Crafting timeless elegance with premium jewellery designs.
            Luxury that speaks your style.
          </p>
        </div>

        {/* LINKS */}
        <div className="footer-links">
          <div data-aos="fade-up" data-aos-delay="150">

            <h4>Shop</h4>
            <p>Necklace</p>
            <p>Rings</p>
            <p>Bangles</p>
            <p>Earrings</p>
          </div>

          <div data-aos="fade-up" data-aos-delay="250">
            <h4>Company</h4>
            <p>About Us</p>
            <p>Careers</p>
            <p>Contact</p>
            <p>Blog</p>
          </div>

          <div data-aos="fade-up" data-aos-delay="350">
            <h4>Support</h4>
            <p>Help Center</p>
            <p>Shipping</p>
            <p>Returns</p>
            <p>Privacy Policy</p>
          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="footer-newsletter" data-aos="fade-left" data-aos-delay="200">
          <h4>Subscribe</h4>
          <p>Get latest offers & updates</p>
          <div className="newsletter-box" data-aos="zoom-in" data-aos-delay="300">
            <input type="email" placeholder="Enter your email" />
            <button>→</button>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom" data-aos="fade-up" data-aos-delay="200">
        <p>© 2026 DIYA CREATION. All rights reserved.</p>
        <div className="socials">
          <span data-aos="fade-up" data-aos-delay="300">Instagram</span>
          <span data-aos="fade-up" data-aos-delay="350">Facebook</span>
          <span data-aos="fade-up" data-aos-delay="400">Twitter</span>
        </div>
      </div>

    </footer>
  );
};

export default Footer;