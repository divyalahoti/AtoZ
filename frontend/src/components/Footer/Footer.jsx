import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaYoutube, FaWhatsapp, FaPinterest } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Newsletter Strip */}
      <div className="footer-newsletter-strip">
        <div className="newsletter-inner">
          <div>
            <span className="section-label">Stay Connected</span>
            <h3>Join Our Jewellery Circle</h3>
          </div>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email address" />
            <button className="btn-primary">Subscribe</button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-az">AtoZ</span>
              <span className="logo-jewellery">JEWELLERY</span>
            </div>
            <p>Premium artificial jewellery crafted with finesse. Oxidised collections, stone work, and contemporary designs for every occasion.</p>
            <div className="footer-social">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebook /></a>
              <a href="https://wa.me/919428380108" target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><FaYoutube /></a>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer" aria-label="Pinterest"><FaPinterest /></a>
            </div>
          </div>

          {/* Collections */}
          <div className="footer-col">
            <h4>Collections</h4>
            <ul>
              <li><Link to="/collection?category=Necklace">Necklaces</Link></li>
              <li><Link to="/collection?category=Ring">Rings</Link></li>
              <li><Link to="/collection?category=Bangles">Bangles & Kadas</Link></li>
              <li><Link to="/collection?category=Earrings">Earrings & Jhumkas</Link></li>
              <li><Link to="/collection?category=Payal">Payals & Anklets</Link></li>
              <li><Link to="/collection?category=Bracelet">Bracelets</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/track-order">Track Order</Link></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Wholesale</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Shipping Policy</a></li>
              <li><a href="#">Returns & Exchange</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">FAQ</a></li>
              <li><Link to="/auth">My Account</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Contact</h4>
            <ul className="contact-list">
              <li><FiMail /><a href="mailto:info@atozjewellery.com">info@atozjewellery.com</a></li>
              <li><FiPhone /><a href="tel:+919428380108">+91 94283 80108</a></li>
              <li><FiMapPin /><span>Himatnagar, Gujarat, India</span></li>
            </ul>
            <div className="footer-trust">
              <div className="trust-badge">🔒 Secure Payments</div>
              <div className="trust-badge">✨ Quality Assured</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>© {currentYear} AtoZ Jewellery. All rights reserved.</p>
          <div className="payment-icons">
            <span>💳 UPI</span>
            <span>💳 Visa</span>
            <span>💳 Mastercard</span>
            <span>💳 Razorpay</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
