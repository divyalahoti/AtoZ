import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { FiHeart, FiShoppingBag, FiArrowLeft, FiStar, FiShare2, FiCheck } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";
import "./ProductCard.css";

const ProductCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const backendurl = import.meta.env.VITE_BACKENDURL;
  const product = location.state;
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (product) {
      window.scrollTo(0, 0);
      axios.get(backendurl + `/api/products/related/${product.category}/${product._id}`)
        .then(res => setRelatedProducts(res.data))
        .catch(() => {});
    }
  }, [product]);

  if (!product) {
    return (
      <div className="pd-page">
        <Navbar />
        <div className="pd-empty">
          <h2>No Product Selected</h2>
          <button className="btn-primary" onClick={() => navigate("/collection")}>Browse Collection</button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAddedToCart(true);
    toast.success(`${qty} item(s) added to cart! 🛍️`);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const handleWhatsApp = () => {
    const msg = `Hi! I'm interested in ordering:\n*${product.name}*\nPrice: ₹${product.price}\nQuantity: ${qty}\n\nFrom AtoZ Jewellery`;
    window.open(`https://wa.me/919428380108?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: product.name, text: `Check out ${product.name} at AtoZ Jewellery!`, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.info("Link copied! 📋");
    }
  };

  const features = [
    { icon: "✦", text: "Premium artificial jewellery" },
    { icon: "🚚", text: "Free shipping on orders above ₹999" },
    { icon: "↩", text: "7-day easy returns" },
    { icon: "🔒", text: "100% secure checkout" },
  ];

  return (
    <div className="pd-page">
      <Navbar />

      {/* Breadcrumb */}
      <div className="pd-breadcrumb">
        <button onClick={() => navigate(-1)} className="pd-back"><FiArrowLeft /> Back</button>
        <span>Home / {product.category} / {product.name}</span>
      </div>

      <div className="pd-container">
        {/* Left - Images */}
        <div className="pd-images">
          <div className="pd-main-img">
            <img src={product.image} alt={product.name} />
            <button className={`pd-wishlist-btn ${isInWishlist(product._id) ? "active" : ""}`}
              onClick={() => { toggleWishlist(product); toast.info(isInWishlist(product._id) ? "Removed from wishlist" : "Added to wishlist ❤️"); }}>
              <FiHeart />
            </button>
            <div className="pd-zoom-hint">Hover to zoom</div>
          </div>
          {/* Thumbnail row */}
          <div className="pd-thumbnails">
            <img src={product.image} alt="" className="pd-thumb active" />
            <img src={product.image} alt="" className="pd-thumb" style={{ filter: "brightness(0.85)" }} />
            <img src={product.image} alt="" className="pd-thumb" style={{ filter: "sepia(0.3)" }} />
          </div>
        </div>

        {/* Right - Details */}
        <div className="pd-details">
          <span className="pd-cat">{product.category}</span>
          <h1 className="pd-name">{product.name}</h1>

          <div className="pd-rating">
            {[...Array(5)].map((_, i) => <FiStar key={i} className={i < 4 ? "filled" : ""} />)}
            <span>4.8 (127 reviews)</span>
          </div>

          <div className="pd-price-row">
            <span className="pd-price">₹{product.price?.toLocaleString("en-IN")}</span>
            <span className="pd-old-price">₹{Math.round(product.price * 1.3)?.toLocaleString("en-IN")}</span>
            <span className="pd-discount">23% OFF</span>
          </div>

          <p className="pd-desc">{product.description || "Beautifully handcrafted artificial jewellery piece. Perfect for festivals, weddings, and everyday wear. This piece is made with high-quality materials that maintain their lustre over time."}</p>

          {/* Features */}
          <div className="pd-features">
            {features.map((f, i) => (
              <div key={i} className="pd-feat"><span>{f.icon}</span><p>{f.text}</p></div>
            ))}
          </div>

          {/* Quantity */}
          <div className="pd-qty-row">
            <label>Quantity</label>
            <div className="pd-qty">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => q + 1)}>+</button>
            </div>
            <span className="pd-stock">✓ In Stock</span>
          </div>

          {/* Actions */}
          <div className="pd-actions">
            <button className={`pd-cart-btn ${addedToCart ? "added" : ""}`} onClick={handleAddToCart}>
              {addedToCart ? <><FiCheck /> Added!</> : <><FiShoppingBag /> Add to Cart</>}
            </button>
            <button className="pd-wa-btn" onClick={handleWhatsApp}>
              <FaWhatsapp /> Order via WhatsApp
            </button>
          </div>
          <div className="pd-secondary-actions">
            <button className={`pd-wish-text ${isInWishlist(product._id) ? "active" : ""}`}
              onClick={() => { toggleWishlist(product); }}>
              <FiHeart /> {isInWishlist(product._id) ? "In Wishlist" : "Add to Wishlist"}
            </button>
            <button className="pd-share" onClick={handleShare}><FiShare2 /> Share</button>
          </div>

          {/* Tabs */}
          <div className="pd-tabs">
            {["description", "details", "reviews"].map(tab => (
              <button key={tab} className={`pd-tab ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="pd-tab-content">
            {activeTab === "description" && (
              <p>This gorgeous {product.name} from AtoZ Jewellery is crafted to perfection using premium quality materials. Ideal for weddings, festivals, parties, and everyday wear. A perfect blend of traditional Indian artistry and contemporary design.</p>
            )}
            {activeTab === "details" && (
              <ul className="pd-detail-list">
                <li><strong>Material:</strong> Alloy with Oxidised/Antique Finish</li>
                <li><strong>Category:</strong> {product.category}</li>
                <li><strong>Occasion:</strong> Wedding, Festival, Party, Daily</li>
                <li><strong>Care:</strong> Wipe with soft dry cloth</li>
                <li><strong>Origin:</strong> Made in India 🇮🇳</li>
                <li><strong>Stock:</strong> {product.stock || "In Stock"}</li>
              </ul>
            )}
            {activeTab === "reviews" && (
              <div className="pd-reviews">
                {[{ name: "Priya S.", rating: 5, text: "Absolutely stunning! Exactly as shown." }, { name: "Anjali M.", rating: 4, text: "Beautiful quality, fast delivery." }].map((r, i) => (
                  <div key={i} className="review-item">
                    <div className="review-header">
                      <div className="review-avatar">{r.name[0]}</div>
                      <div>
                        <strong>{r.name}</strong>
                        <div className="review-stars">{[...Array(r.rating)].map((_, j) => <FiStar key={j} className="filled" />)}</div>
                      </div>
                    </div>
                    <p>{r.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="pd-related">
          <div className="section-header">
            <span className="section-label">You May Also Like</span>
            <h2 className="section-title">Related <em>Pieces</em></h2>
          </div>
          <div className="pd-related-grid">
            {relatedProducts.slice(0, 4).map((item) => (
              <div key={item._id} className="pd-related-card" onClick={() => { navigate("/productcard", { state: item }); window.scrollTo(0,0); }}>
                <div className="pd-rel-img"><img src={item.image} alt={item.name} /></div>
                <div className="pd-rel-info">
                  <span>{item.category}</span>
                  <h4>{item.name}</h4>
                  <p>₹{item.price?.toLocaleString("en-IN")}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ProductCard;
