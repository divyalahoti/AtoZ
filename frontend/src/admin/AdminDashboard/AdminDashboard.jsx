import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, NavLink } from "react-router-dom";
import { FiBox, FiPlus } from "react-icons/fi";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const backendurl = import.meta.env.VITE_BACKENDURL;

  useEffect(() => {
    axios.get(backendurl + "/api/products")
      .then(res => setProducts(res.data));
  }, []);

  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2 className="logo">Diya Creation</h2>

        <NavLink to="/list" className="nav-link">
          <FiBox /> Products
        </NavLink>

        <NavLink to="/add-product" className="nav-link">
          <FiPlus /> Add Product
        </NavLink>
      </div>

      {/* RIGHT SIDE */}
      <div className="main-wrapper">

        {/* HEADER */}
        <div className="admin-header">
          <h2>Admin Panel</h2>
        </div>

        {/* CARDS */}
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

        {/* CHILD ROUTES */}
        <div className="page-content">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;