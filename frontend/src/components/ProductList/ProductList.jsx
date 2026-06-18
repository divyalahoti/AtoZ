import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { FiSearch, FiHeart, FiShoppingBag, FiFilter, FiX, FiStar, FiChevronDown } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const backendurl = import.meta.env.VITE_BACKENDURL;

  const categories = ["All", "Necklace", "Earrings", "Ring", "Bangles", "Bracelet", "Payal"];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("category");
    const q = params.get("search");
    if (cat) setCategory(cat);
    if (q) setSearch(q);
    axios.get(backendurl + "/api/products")
      .then(res => { setProducts(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let result = products.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || p.category === category) &&
      p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    if (sort === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "name") result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [products, search, category, sort, priceRange]);

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product);
    toast.success("Added to cart! 🛍️");
  };

  const handleWishlist = (product, e) => {
    e.stopPropagation();
    toggleWishlist(product);
    toast.info(isInWishlist(product._id) ? "Removed from wishlist" : "Added to wishlist ❤️");
  };

  const SkeletonCard = () => (
    <div className="pl-card skeleton-card">
      <div className="skeleton" style={{ height: 280 }}></div>
      <div style={{ padding: "1rem" }}>
        <div className="skeleton" style={{ height: 10, width: "50%", marginBottom: 8 }}></div>
        <div className="skeleton" style={{ height: 18, marginBottom: 8 }}></div>
        <div className="skeleton" style={{ height: 14, width: "35%" }}></div>
      </div>
    </div>
  );

  return (
    <div className="pl-page">
      <Navbar />
      {/* Hero */}
      <div className="pl-hero">
        <div className="pl-hero-content">
          <span className="section-label">AtoZ Jewellery</span>
          <h1>Our <em>Collections</em></h1>
          <p>Discover handcrafted artificial jewellery for every occasion</p>
        </div>
      </div>

      <div className="pl-container">
        {/* Toolbar */}
        <div className="pl-toolbar">
          <div className="pl-search-box">
            <FiSearch />
            <input
              type="text"
              placeholder="Search jewellery..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && <button onClick={() => setSearch("")}><FiX /></button>}
          </div>
          <div className="pl-toolbar-right">
            <span className="pl-count">{filtered.length} products</span>
            <div className="pl-sort-wrap">
              <select value={sort} onChange={e => setSort(e.target.value)} className="pl-sort">
                <option value="default">Sort: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name: A-Z</option>
              </select>
              <FiChevronDown className="sort-icon" />
            </div>
            <button className="pl-filter-btn" onClick={() => setFilterOpen(!filterOpen)}>
              <FiFilter /> Filters
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="pl-category-tabs">
          {categories.map(cat => (
            <button key={cat} className={`cat-tab ${category === cat ? "active" : ""}`} onClick={() => setCategory(cat)}>
              {cat}
            </button>
          ))}
        </div>

        <div className="pl-layout">
          {/* Sidebar Filter */}
          <aside className={`pl-sidebar ${filterOpen ? "open" : ""}`}>
            <div className="sidebar-header">
              <h3>Filters</h3>
              <button onClick={() => setFilterOpen(false)}><FiX /></button>
            </div>
            <div className="filter-group">
              <h4>Category</h4>
              {categories.map(cat => (
                <label key={cat} className="filter-label">
                  <input type="radio" name="category" checked={category === cat} onChange={() => setCategory(cat)} />
                  {cat}
                </label>
              ))}
            </div>
            <div className="filter-group">
              <h4>Price Range</h4>
              <div className="price-range">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
              <input type="range" min={0} max={10000} step={100} value={priceRange[1]}
                onChange={e => setPriceRange([priceRange[0], +e.target.value])}
                className="range-slider"
              />
            </div>
            <button className="filter-reset" onClick={() => { setCategory("All"); setSearch(""); setPriceRange([0, 10000]); setSort("default"); }}>
              Reset All
            </button>
          </aside>

          {/* Product Grid */}
          <main className="pl-main">
            {loading ? (
              <div className="pl-grid">
                {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="pl-empty">
                <span>💎</span>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search term</p>
                <button className="btn-primary" onClick={() => { setCategory("All"); setSearch(""); }}>Clear Filters</button>
              </div>
            ) : (
              <div className="pl-grid">
                {filtered.map((item, i) => (
                  <div key={item._id} className="pl-card" onClick={() => navigate("/productcard", { state: item })} style={{ animationDelay: `${(i % 8) * 0.07}s` }}>
                    <div className="pl-card-img">
                      <img src={item.image} alt={item.name} loading="lazy" />
                      <div className="pl-card-overlay">
                        <button className="pl-quick-view" onClick={e => { e.stopPropagation(); navigate("/productcard", { state: item }); }}>Quick View</button>
                      </div>
                      <button className={`pl-wishlist ${isInWishlist(item._id) ? "active" : ""}`} onClick={e => handleWishlist(item, e)}>
                        <FiHeart />
                      </button>
                      {i < 4 && <span className="pl-badge">New</span>}
                    </div>
                    <div className="pl-card-info">
                      <span className="pl-cat">{item.category}</span>
                      <h3 className="pl-name">{item.name}</h3>
                      <div className="pl-stars">
                        {[...Array(5)].map((_, j) => <FiStar key={j} className={j < 4 ? "filled" : ""} />)}
                        <span>(32)</span>
                      </div>
                      <div className="pl-footer">
                        <span className="pl-price">₹{item.price?.toLocaleString("en-IN")}</span>
                        <button className="pl-add-btn" onClick={e => handleAddToCart(item, e)}>
                          <FiShoppingBag /> Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductList;
