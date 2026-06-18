import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FiUpload, FiX, FiSave, FiArrowLeft, FiPackage, FiPlus, FiList, FiGrid } from "react-icons/fi";
import { toast } from "react-toastify";
import "./AddProduct.css";

const AddProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editProduct = location.state;
  const backendurl = import.meta.env.VITE_BACKENDURL;

  const [form, setForm] = useState({
    name: editProduct?.name || "",
    category: editProduct?.category || "Necklace",
    price: editProduct?.price || "",
    stock: editProduct?.stock || "",
    description: editProduct?.description || "",
    material: editProduct?.material || "",
    occasion: editProduct?.occasion || "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(editProduct?.image || null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImage = e => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(form).forEach(key => formData.append(key, form[key]));
      if (image) formData.append("image", image);

      if (editProduct?._id) {
        await axios.put(`${backendurl}/api/products/${editProduct._id}`, formData);
        toast.success("Product updated successfully! ✏️");
      } else {
        await axios.post(`${backendurl}/api/products`, formData);
        toast.success("Product added successfully! ✨");
      }
      navigate("/list");
    } catch (err) {
      toast.error("Error saving product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const categories = ["Necklace", "Earrings", "Ring", "Bangles", "Bracelet", "Payal", "Set", "Maang Tikka", "Nose Ring", "Other"];
  const occasions = ["Daily Wear", "Wedding", "Festival", "Party", "Office", "Casual", "Bridal"];
  const materials = ["Oxidised Silver", "Kundan", "Meenakari", "Stone Work", "Pearl", "Beaded", "Gold Plated", "Antique"];

  return (
    <div className="ap-page">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <span className="logo-az">AtoZ</span>
          <span className="logo-sub">Admin</span>
        </div>
        <nav className="admin-nav">
          <Link to="/admin" className="admin-nav-item"><FiGrid /><span>Dashboard</span></Link>
          <Link to="/list" className="admin-nav-item"><FiList /><span>All Products</span></Link>
          <Link to="/add-product" className="admin-nav-item active"><FiPlus /><span>Add Product</span></Link>
        </nav>
        <div className="admin-sidebar-footer">
          <Link to="/" className="admin-nav-item" style={{ textDecoration: "none" }}>
            <FiArrowLeft /><span>View Store</span>
          </Link>
        </div>
      </aside>

      <main className="ap-main">
        <div className="ap-header">
          <button className="ap-back" onClick={() => navigate("/list")}><FiArrowLeft /> Back to Products</button>
          <h1>{editProduct ? "Edit Product" : "Add New Product"}</h1>
        </div>

        <form onSubmit={handleSubmit} className="ap-form">
          <div className="ap-form-grid">
            {/* Left — Image Upload */}
            <div className="ap-image-section">
              <div className="ap-img-card">
                <h3>Product Image</h3>
                <div className="ap-upload-area" onClick={() => document.getElementById("img-input").click()}>
                  {preview ? (
                    <div className="ap-preview-wrap">
                      <img src={preview} alt="Preview" />
                      <button type="button" className="ap-remove-img" onClick={e => { e.stopPropagation(); setImage(null); setPreview(null); }}>
                        <FiX />
                      </button>
                    </div>
                  ) : (
                    <div className="ap-upload-placeholder">
                      <FiUpload />
                      <p>Click to upload image</p>
                      <span>JPG, PNG up to 5MB</span>
                    </div>
                  )}
                  <input id="img-input" type="file" accept="image/*" onChange={handleImage} hidden />
                </div>
              </div>

              <div className="ap-img-card">
                <h3>Product Status</h3>
                <div className="ap-status-options">
                  <label className="ap-status-label active">
                    <input type="radio" name="status" value="active" defaultChecked />
                    <span>✓ Active</span>
                  </label>
                  <label className="ap-status-label">
                    <input type="radio" name="status" value="draft" />
                    <span>Draft</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right — Form Fields */}
            <div className="ap-fields-section">
              <div className="ap-fields-card">
                <h3>Product Details</h3>
                <div className="ap-field-grid">
                  <div className="ap-field full">
                    <label>Product Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Oxidised Peacock Necklace Set" required />
                  </div>
                  <div className="ap-field">
                    <label>Category *</label>
                    <select name="category" value={form.category} onChange={handleChange} required>
                      {categories.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="ap-field">
                    <label>Material</label>
                    <select name="material" value={form.material} onChange={handleChange}>
                      <option value="">Select material</option>
                      {materials.map(m => <option key={m}>{m}</option>)}
                    </select>
                  </div>
                  <div className="ap-field">
                    <label>Price (₹) *</label>
                    <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="e.g. 649" required min="1" />
                  </div>
                  <div className="ap-field">
                    <label>Stock Qty</label>
                    <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="e.g. 50" min="0" />
                  </div>
                  <div className="ap-field">
                    <label>Occasion</label>
                    <select name="occasion" value={form.occasion} onChange={handleChange}>
                      <option value="">Select occasion</option>
                      {occasions.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="ap-field full">
                    <label>Description</label>
                    <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe the product — material, design, size, care instructions..." rows={4}></textarea>
                  </div>
                </div>
              </div>

              <div className="ap-form-actions">
                <button type="button" className="btn-outline" onClick={() => navigate("/list")}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? <><span className="spinner" style={{ width: 16, height: 16 }}></span> Saving...</> : <><FiSave /> {editProduct ? "Update Product" : "Add Product"}</>}
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddProduct;
