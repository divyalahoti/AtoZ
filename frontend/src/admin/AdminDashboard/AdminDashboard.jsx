import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, NavLink } from "react-router-dom";
import { FiBox, FiPlus } from "react-icons/fi";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const backendurl = import.meta.env.VITE_BACKENDURL;

  useEffect(() => {
    axios.get(backendurl + "/api/products")
      .then(res => setProducts(res.data));
  }, []);

  return (
    <div className="admin-layout">

      {/* OVERLAY */}
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}

      {/* SIDEBAR */}
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <h2 className="logo">Diya Creation</h2>

        <NavLink to="/list" className="nav-link" onClick={() => setMenuOpen(false)}>
          <FiBox /> Products
        </NavLink>

        <NavLink to="/add-product" className="nav-link" onClick={() => setMenuOpen(false)}>
          <FiPlus /> Add Product
        </NavLink>
      </div>

      {/* MAIN */}
      <div className="main-wrapper">

        <div className="admin-header">
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
          <h2>Admin Panel</h2>
        </div>

        <div className="cards">
          <div className="card">
            <h4>Total Products</h4>
            <p>{products.length}</p>
          </div>

          <div className="card">
            <h4>Total Value</h4>
            <p>₹{products.reduce((a, b) => a + b.price, 0)}</p>
          </div>

          <div className="card">
            <h4>Categories</h4>
            <p>{[...new Set(products.map(p => p.category))].length}</p>
          </div>
        </div>

        <div className="page-content">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;