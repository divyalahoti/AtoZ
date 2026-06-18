import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FiPackage, FiShoppingBag, FiUsers, FiDollarSign,
  FiTrendingUp, FiPlus, FiList, FiSettings, FiLogOut,
  FiHome, FiBarChart2, FiTag, FiGrid
} from "react-icons/fi";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [activeNav, setActiveNav] = useState("dashboard");
  const backendurl = import.meta.env.VITE_BACKENDURL;

  useEffect(() => {
    axios.get(backendurl + "/api/products")
      .then(res => setProducts(res.data))
      .catch(() => {});
  }, []);

  const stats = [
    { label: "Total Products", value: products.length, icon: <FiPackage />, color: "#C9A84C", change: "+12%" },
    { label: "Total Orders", value: "248", icon: <FiShoppingBag />, color: "#4CAF50", change: "+8%" },
    { label: "Customers", value: "1,204", icon: <FiUsers />, color: "#2196F3", change: "+15%" },
    { label: "Revenue", value: "₹1,84,500", icon: <FiDollarSign />, color: "#9C27B0", change: "+23%" },
  ];

  const recentOrders = [
    { id: "ATZ-001", customer: "Priya Sharma", product: "Oxidised Necklace", amount: "₹649", status: "Delivered" },
    { id: "ATZ-002", customer: "Anjali Patel", product: "Kundan Earrings", amount: "₹399", status: "Shipped" },
    { id: "ATZ-003", customer: "Meera Joshi", product: "Bridal Set", amount: "₹2,199", status: "Processing" },
    { id: "ATZ-004", customer: "Rakhee Desai", product: "Stone Bangles", amount: "₹549", status: "Pending" },
    { id: "ATZ-005", customer: "Sunita Verma", product: "Payal Set", amount: "₹299", status: "Delivered" },
  ];

  const statusColors = {
    Delivered: "#4CAF50",
    Shipped: "#2196F3",
    Processing: "#FF9800",
    Pending: "#9E9E9E",
  };

  const categories = ["Necklace", "Earrings", "Ring", "Bangles", "Bracelet", "Payal"];
  const categoryStats = categories.map(cat => ({
    name: cat,
    count: products.filter(p => p.category === cat).length,
    percent: products.length ? Math.round((products.filter(p => p.category === cat).length / products.length) * 100) : 0,
  }));

  const navItems = [
    { id: "dashboard", icon: <FiGrid />, label: "Dashboard" },
    { id: "products", icon: <FiPackage />, label: "Products", link: "/list" },
    { id: "add", icon: <FiPlus />, label: "Add Product", link: "/add-product" },
    { id: "orders", icon: <FiShoppingBag />, label: "Orders" },
    { id: "customers", icon: <FiUsers />, label: "Customers" },
    { id: "analytics", icon: <FiBarChart2 />, label: "Analytics" },
  ];

  return (
    <div className="admin-page">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <span className="logo-az">AtoZ</span>
          <span className="logo-sub">Admin</span>
        </div>
        <nav className="admin-nav">
          {navItems.map(item => (
            item.link ? (
              <Link key={item.id} to={item.link} className={`admin-nav-item ${activeNav === item.id ? "active" : ""}`} onClick={() => setActiveNav(item.id)}>
                {item.icon}<span>{item.label}</span>
              </Link>
            ) : (
              <button key={item.id} className={`admin-nav-item ${activeNav === item.id ? "active" : ""}`} onClick={() => setActiveNav(item.id)}>
                {item.icon}<span>{item.label}</span>
              </button>
            )
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <Link to="/" className="admin-nav-item"><FiHome /><span>View Store</span></Link>
          <button className="admin-nav-item logout"><FiLogOut /><span>Logout</span></button>
        </div>
      </aside>

      {/* Main */}
      <main className="admin-main">
        {/* Header */}
        <div className="admin-header">
          <div>
            <h1>Dashboard Overview</h1>
            <p>Welcome back! Here's what's happening with AtoZ Jewellery.</p>
          </div>
          <div className="admin-header-actions">
            <Link to="/add-product" className="btn-primary"><FiPlus /> Add Product</Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="admin-stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="admin-stat-card">
              <div className="stat-card-left">
                <span className="stat-label">{s.label}</span>
                <span className="stat-value">{s.value}</span>
                <span className="stat-change" style={{ color: "#4CAF50" }}>
                  <FiTrendingUp /> {s.change} this month
                </span>
              </div>
              <div className="stat-card-icon" style={{ background: s.color + "20", color: s.color }}>
                {s.icon}
              </div>
            </div>
          ))}
        </div>

        <div className="admin-content-grid">
          {/* Recent Orders */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h3>Recent Orders</h3>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="orders-table">
              <div className="orders-table-header">
                <span>Order ID</span>
                <span>Customer</span>
                <span>Product</span>
                <span>Amount</span>
                <span>Status</span>
              </div>
              {recentOrders.map((order, i) => (
                <div key={i} className="orders-table-row">
                  <span className="order-id">#{order.id}</span>
                  <span>{order.customer}</span>
                  <span className="order-product">{order.product}</span>
                  <span className="order-amount">{order.amount}</span>
                  <span className="order-status" style={{ color: statusColors[order.status], background: statusColors[order.status] + "20" }}>
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h3>Products by Category</h3>
              <Link to="/list" className="view-all-btn">Manage</Link>
            </div>
            <div className="category-breakdown">
              {categoryStats.map((cat, i) => (
                <div key={i} className="cat-stat-row">
                  <div className="cat-stat-info">
                    <span>{cat.name}</span>
                    <span>{cat.count} items</span>
                  </div>
                  <div className="cat-stat-bar">
                    <div className="cat-stat-fill" style={{ width: `${cat.percent || 0}%` }}></div>
                  </div>
                  <span className="cat-stat-pct">{cat.percent}%</span>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="admin-quick-actions">
              <h4>Quick Actions</h4>
              <div className="quick-action-grid">
                <Link to="/add-product" className="quick-action"><FiPlus /><span>Add Product</span></Link>
                <Link to="/list" className="quick-action"><FiList /><span>All Products</span></Link>
                <button className="quick-action"><FiTag /><span>Categories</span></button>
                <button className="quick-action"><FiSettings /><span>Settings</span></button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Preview */}
        <div className="admin-card" style={{ marginTop: "1.5rem" }}>
          <div className="admin-card-header">
            <h3>Recent Products</h3>
            <Link to="/list" className="view-all-btn">View All</Link>
          </div>
          <div className="admin-products-grid">
            {products.slice(0, 6).map((p, i) => (
              <div key={i} className="admin-product-card">
                <img src={p.image} alt={p.name} />
                <div className="apc-info">
                  <span className="apc-cat">{p.category}</span>
                  <p className="apc-name">{p.name}</p>
                  <strong>₹{p.price?.toLocaleString("en-IN")}</strong>
                </div>
                <div className="apc-actions">
                  <Link to={`/add-product/${p._id}`} state={p} className="apc-edit">Edit</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
