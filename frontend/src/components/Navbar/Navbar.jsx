import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiUser, FiShoppingBag, FiHeart, FiSearch, FiMoon, FiSun } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import "./Navbar.css";

const Navbar = ({ darkMode, setDarkMode }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount, wishlist } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/collection", label: "Collection" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="navbar-topbar">
        <span>✦ Free Shipping on Orders Above ₹999 ✦ Authentic Artificial Jewellery ✦</span>
      </div>

      <nav className={`navbar-container ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <span className="logo-az">AtoZ</span>
            <span className="logo-jewellery">JEWELLERY</span>
          </Link>

          {/* Desktop Nav */}
          <div className="nav-links-desktop">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} className={`nav-link ${isActive(link.to) ? "active" : ""}`}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="nav-actions">
            <button className="nav-icon-btn" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search">
              <FiSearch />
            </button>
            <button className="nav-icon-btn" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle Dark Mode">
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>
            <Link to="/auth" className="nav-icon-btn" aria-label="Account">
              <FiUser />
            </Link>
            <Link to="/collection" className="nav-icon-btn wishlist-icon" aria-label="Wishlist">
              <FiHeart />
              {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
            </Link>
            <Link to="/cart" className="nav-icon-btn cart-icon" aria-label="Cart">
              <FiShoppingBag />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </Link>
            <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className={`search-bar ${searchOpen ? "open" : ""}`}>
          <div className="search-inner">
            <FiSearch />
            <input
              type="text"
              placeholder="Search for rings, necklaces, bangles..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && searchQuery) {
                  window.location.href = `/collection?search=${searchQuery}`;
                  setSearchOpen(false);
                }
              }}
              autoFocus={searchOpen}
            />
            <button onClick={() => setSearchOpen(false)}><FaTimes /></button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`nav-mobile-menu ${menuOpen ? "open" : ""}`}>
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)} className={isActive(link.to) ? "active" : ""}>
              {link.label}
            </Link>
          ))}
          <div className="mobile-divider"></div>
          <Link to="/auth" onClick={() => setMenuOpen(false)}>Login / Register</Link>
          <Link to="/track-order" onClick={() => setMenuOpen(false)}>Track Order</Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
