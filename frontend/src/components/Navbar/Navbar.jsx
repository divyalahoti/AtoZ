import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar-container">
      <div className="navbar-content">

        {/* LEFT: LOGO */}
        <Link to="/" className="logo-section">
          <h2>Diya Creation</h2>

        </Link>

        {/* CENTER: LINKS (Desktop Only) */}
        <div className="nav-links-desktop">
          <Link to="/" className={location.pathname === "/" ? "active-link" : ""}>Home</Link>
          <Link to="/productlist" className={location.pathname === "/productlist" ? "active-link" : ""}>Collection</Link>
          <Link to="/about" className={location.pathname === "/about" ? "active-link" : ""}>About</Link>
          <Link to="/contact" className={location.pathname === "/contact" ? "active-link" : ""}>contact</Link>
        </div>

        {/* RIGHT: ICONS & TOGGLE */}
        <div className="nav-right">
          <Link to="/login" className="user-link">
            <FaUser />
          </Link>
          <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

      </div>

      {/* MOBILE MENU (Slide Down) */}
      <div className={`nav-links-mobile ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/productlist" onClick={() => setMenuOpen(false)}>Collection</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;