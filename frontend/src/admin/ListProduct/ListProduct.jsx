import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2, FiPlus, FiSearch, FiGrid, FiList, FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import "./ListProduct.css";

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const backendurl = import.meta.env.VITE_BACKENDURL;
  const navigate = useNavigate();

  const categories = ["All", "Necklace", "Earrings", "Ring", "Bangles", "Bracelet", "Payal"];

  const fetchProducts = () => {
    axios.get(backendurl + "/api/products")
      .then(res => { setProducts(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${backendurl}/api/products/${id}`);
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch {
      toast.error("Failed to delete product");
    }
  };

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || p.category === category)
  );

  return (
    <div className="lp-page">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <span className="logo-az">AtoZ</span>
          <span className="logo-sub">Admin</span>
        </div>
        <nav className="admin-nav">
          <Link to="/admin" className="admin-nav-item"><FiGrid /><span>Dashboard</span></Link>
          <Link to="/list" className="admin-nav-item active"><FiList /><span>All Products</span></Link>
          <Link to="/add-product" className="admin-nav-item"><FiPlus /><span>Add Product</span></Link>
        </nav>
        <div className="admin-sidebar-footer">
          <Link to="/" className="admin-nav-item" style={{ textDecoration: "none" }}>
            <FiArrowLeft /><span>View Store</span>
          </Link>
        </div>
      </aside>

      <main className="lp-main">
        <div className="lp-header">
          <div>
            <h1>All Products</h1>
            <p>{products.length} total products</p>
          </div>
          <Link to="/add-product" className="btn-primary"><FiPlus /> Add Product</Link>
        </div>

        <div className="lp-toolbar">
          <div className="lp-search">
            <FiSearch />
            <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="lp-cats">
            {categories.map(cat => (
              <button key={cat} className={`lp-cat-btn ${category === cat ? "active" : ""}`} onClick={() => setCategory(cat)}>{cat}</button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="lp-loading"><div className="spinner"></div></div>
        ) : filtered.length === 0 ? (
          <div className="lp-empty">
            <FiGrid size={48} color="var(--gold)" />
            <h3>No products found</h3>
            <Link to="/add-product" className="btn-primary"><FiPlus /> Add First Product</Link>
          </div>
        ) : (
          <div className="lp-table-wrap">
            <table className="lp-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr key={p._id} style={{ animationDelay: `${i * 0.04}s` }}>
                    <td>
                      <div className="lp-img-cell">
                        <img src={p.image} alt={p.name} />
                      </div>
                    </td>
                    <td>
                      <div className="lp-name-cell">
                        <strong>{p.name}</strong>
                        <span>{p.description?.slice(0, 50)}{p.description?.length > 50 ? "..." : ""}</span>
                      </div>
                    </td>
                    <td><span className="lp-cat-badge">{p.category}</span></td>
                    <td><strong className="lp-price">₹{p.price?.toLocaleString("en-IN")}</strong></td>
                    <td>
                      <span className={`lp-stock-badge ${p.stock > 0 ? "in" : "out"}`}>
                        {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
                      </span>
                    </td>
                    <td>
                      <div className="lp-actions">
                        <button className="lp-edit" onClick={() => navigate(`/add-product/${p._id}`, { state: p })}>
                          <FiEdit /> Edit
                        </button>
                        <button className="lp-delete" onClick={() => handleDelete(p._id)}>
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default ListProduct;
