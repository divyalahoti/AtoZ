import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { FiHeart, FiShoppingBag, FiArrowRight, FiStar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaQuoteLeft, FaInstagram } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";
import "./Home.css";

const Home = ({ darkMode, setDarkMode }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const backendurl = import.meta.env.VITE_BACKENDURL;
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const heroSlides = [
    {
      bg: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=1600&q=80",
      label: "New Collection 2025",
      title: "Oxidised Silver",
      titleItalic: "Elegance",
      subtitle: "Handcrafted artificial jewellery that tells your story",
      cta: "Shop Collection",
      ctaLink: "/collection?category=Necklace",
    },
    {
      bg: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1600&q=80",
      label: "Trending Now",
      title: "Kundan &",
      titleItalic: "Meenakari",
      subtitle: "Traditional artistry meets contemporary design",
      cta: "Explore Now",
      ctaLink: "/collection?category=Earrings",
    },
    {
      bg: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1600&q=80",
      label: "Bridal Special",
      title: "Royal Bridal",
      titleItalic: "Sets",
      subtitle: "Complete bridal jewellery sets for your special day",
      cta: "View Bridal",
      ctaLink: "/collection",
    },
  ];

  const categories = [
    { name: "Necklaces", img: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&q=80", count: "48+ Designs" },
    { name: "Earrings", img: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=600&q=80", count: "60+ Designs" },
    { name: "Bangles", img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80", count: "35+ Designs" },
    { name: "Rings", img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80", count: "42+ Designs" },
    { name: "Bracelets", img: "https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=600&q=80", count: "28+ Designs" },
    { name: "Payal", img: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600&q=80", count: "20+ Designs" },
  ];

  const testimonials = [
    { name: "Priya Sharma", location: "Mumbai", rating: 5, text: "Absolutely stunning quality! The oxidised necklace I ordered looks exactly like the photos and the packaging was beautiful. Will definitely order again.", product: "Oxidised Peacock Necklace" },
    { name: "Anjali Patel", location: "Ahmedabad", rating: 5, text: "I was skeptical about buying artificial jewellery online, but AtoZ completely changed my mind. The kundan earrings are exquisite and very reasonable.", product: "Kundan Chandbali Earrings" },
    { name: "Meera Joshi", location: "Delhi", rating: 5, text: "Ordered for my sister's wedding. The entire bridal set was gorgeous and received so many compliments. Fast delivery and secure packaging!", product: "Bridal Jewellery Set" },
    { name: "Rakhee Desai", location: "Surat", rating: 5, text: "The stone work on the bangles is incredible. You wouldn't believe it's artificial at first glance. Perfect for festivals and special occasions.", product: "Stone Work Bangles" },
  ];

  const features = [
    { icon: "✦", title: "Premium Quality", desc: "Handpicked materials for lasting shine" },
    { icon: "🚚", title: "Free Shipping", desc: "On all orders above ₹999" },
    { icon: "↩", title: "Easy Returns", desc: "7-day hassle-free returns" },
    { icon: "🔒", title: "Secure Payment", desc: "100% safe & encrypted checkout" },
  ];

  useEffect(() => {
    axios.get(backendurl + "/api/products")
      .then(res => { setProducts(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveSlide(p => (p + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 4000);
    return () => clearInterval(t);
  }, []);

  const featuredProducts = products.slice(0, 8);
  const trendingProducts = products.slice(0, 4);

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

  const ProductCard = ({ item, index }) => (
    <div
      className="home-product-card"
      onClick={() => navigate("/productcard", { state: item })}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="hpc-image-wrap">
        <img src={item.image} alt={item.name} loading="lazy" />
        <div className="hpc-overlay">
          <button className="hpc-quick-view" onClick={(e) => { e.stopPropagation(); navigate("/productcard", { state: item }); }}>
            Quick View
          </button>
        </div>
        <button className={`hpc-wishlist ${isInWishlist(item._id) ? "active" : ""}`} onClick={(e) => handleWishlist(item, e)}>
          <FiHeart />
        </button>
        {index < 3 && <span className="hpc-badge">Trending</span>}
      </div>
      <div className="hpc-info">
        <span className="hpc-cat">{item.category}</span>
        <h3 className="hpc-name">{item.name}</h3>
        <div className="hpc-footer">
          <span className="hpc-price">₹{item.price?.toLocaleString("en-IN")}</span>
          <button className="hpc-add-btn" onClick={(e) => handleAddToCart(item, e)}>
            <FiShoppingBag />
          </button>
        </div>
        <div className="hpc-stars">
          {[...Array(5)].map((_, i) => <FiStar key={i} className={i < 4 ? "filled" : ""} />)}
          <span>(48)</span>
        </div>
      </div>
    </div>
  );

  const SkeletonCard = () => (
    <div className="home-product-card skeleton-card">
      <div className="skeleton" style={{ height: 280 }}></div>
      <div style={{ padding: "1rem" }}>
        <div className="skeleton" style={{ height: 12, width: "60%", marginBottom: 8 }}></div>
        <div className="skeleton" style={{ height: 18, marginBottom: 8 }}></div>
        <div className="skeleton" style={{ height: 14, width: "40%" }}></div>
      </div>
    </div>
  );

  return (
    <div className="home-page">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* ===== HERO SLIDER ===== */}
      <section className="hero-section">
        {heroSlides.map((slide, i) => (
          <div key={i} className={`hero-slide ${i === activeSlide ? "active" : ""}`}>
            <div className="hero-bg" style={{ backgroundImage: `url(${slide.bg})` }}></div>
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <span className="hero-label">{slide.label}</span>
              <h1 className="hero-title">
                {slide.title} <br />
                <em>{slide.titleItalic}</em>
              </h1>
              <p className="hero-subtitle">{slide.subtitle}</p>
              <div className="hero-ctas">
                <Link to={slide.ctaLink} className="btn-primary">{slide.cta} <FiArrowRight /></Link>
                <Link to="/about" className="hero-secondary-cta">Our Story <FiArrowRight /></Link>
              </div>
            </div>
          </div>
        ))}
        {/* Dots */}
        <div className="hero-dots">
          {heroSlides.map((_, i) => (
            <button key={i} className={`dot ${i === activeSlide ? "active" : ""}`} onClick={() => setActiveSlide(i)} />
          ))}
        </div>
        {/* Arrows */}
        <button className="hero-arrow left" onClick={() => setActiveSlide(p => (p - 1 + heroSlides.length) % heroSlides.length)}><FiChevronLeft /></button>
        <button className="hero-arrow right" onClick={() => setActiveSlide(p => (p + 1) % heroSlides.length)}><FiChevronRight /></button>

        <div className="hero-scroll-indicator">
          <div className="scroll-line"></div>
          <span>Scroll</span>
        </div>
      </section>

      {/* ===== FEATURES STRIP ===== */}
      <section className="features-strip">
        {features.map((f, i) => (
          <div key={i} className="feature-item">
            <span className="feature-icon">{f.icon}</span>
            <div>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="categories-section">
        <div className="section-header">
          <span className="section-label">Browse By</span>
          <h2 className="section-title">Our <em>Collections</em></h2>
          <p className="section-desc">Explore our wide range of handcrafted artificial jewellery</p>
        </div>
        <div className="categories-grid">
          {categories.map((cat, i) => (
            <Link to={`/collection?category=${cat.name}`} key={i} className="category-card">
              <div className="cat-img-wrap">
                <img src={cat.img} alt={cat.name} loading="lazy" />
                <div className="cat-overlay"></div>
              </div>
              <div className="cat-info">
                <h3>{cat.name}</h3>
                <span>{cat.count}</span>
              </div>
              <div className="cat-hover-line"></div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="products-section">
        <div className="section-header">
          <span className="section-label">Handpicked For You</span>
          <h2 className="section-title">Featured <em>Pieces</em></h2>
        </div>
        <div className="products-grid">
          {loading
            ? [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
            : featuredProducts.map((item, i) => <ProductCard key={item._id} item={item} index={i} />)
          }
        </div>
        <div className="section-cta">
          <Link to="/collection" className="btn-outline">View All Products <FiArrowRight /></Link>
        </div>
      </section>

      {/* ===== BRAND STORY BANNER ===== */}
      <section className="brand-story-section">
        <div className="brand-story-grid">
          <div className="brand-story-image">
            <img src="https://images.unsplash.com/photo-1608042314453-ae338d80c427?w=800&q=80" alt="Our Story" />
            <div className="story-img-badge">
              <span>Since</span>
              <strong>2015</strong>
            </div>
          </div>
          <div className="brand-story-content">
            <span className="section-label">Our Heritage</span>
            <h2 className="section-title">Crafted with <em>Passion</em></h2>
            <p>At AtoZ Jewellery, we believe that every woman deserves to feel like royalty — without breaking the bank. Our collection of premium artificial jewellery blends traditional Indian craftsmanship with modern design sensibilities.</p>
            <p>From oxidised silver pieces to vibrant kundan sets, each item in our collection is thoughtfully curated to celebrate India's rich jewellery heritage while keeping pace with contemporary fashion.</p>
            <div className="story-stats">
              <div className="stat"><strong>10,000+</strong><span>Happy Customers</span></div>
              <div className="stat"><strong>500+</strong><span>Unique Designs</span></div>
              <div className="stat"><strong>15+</strong><span>Categories</span></div>
            </div>
            <Link to="/about" className="btn-primary">Know Our Story <FiArrowRight /></Link>
          </div>
        </div>
      </section>

      {/* ===== TRENDING ===== */}
      <section className="trending-section">
        <div className="section-header">
          <span className="section-label">Hot Right Now</span>
          <h2 className="section-title">Trending <em>Today</em></h2>
        </div>
        <div className="trending-layout">
          {!loading && trendingProducts.length > 0 && (
            <>
              <div className="trending-main" onClick={() => navigate("/productcard", { state: trendingProducts[0] })}>
                <img src={trendingProducts[0]?.image} alt={trendingProducts[0]?.name} />
                <div className="trending-info">
                  <span>{trendingProducts[0]?.category}</span>
                  <h3>{trendingProducts[0]?.name}</h3>
                  <p>₹{trendingProducts[0]?.price?.toLocaleString("en-IN")}</p>
                  <button className="btn-primary" onClick={(e) => handleAddToCart(trendingProducts[0], e)}>Add to Cart</button>
                </div>
              </div>
              <div className="trending-side">
                {trendingProducts.slice(1, 4).map((item, i) => (
                  <div key={i} className="trending-mini" onClick={() => navigate("/productcard", { state: item })}>
                    <img src={item.image} alt={item.name} />
                    <div>
                      <span>{item.category}</span>
                      <h4>{item.name}</h4>
                      <p>₹{item.price?.toLocaleString("en-IN")}</p>
                    </div>
                    <button onClick={(e) => handleAddToCart(item, e)}><FiShoppingBag /></button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials-section">
        <div className="section-header light">
          <span className="section-label">Happy Customers</span>
          <h2 className="section-title">What Our <em>Clients Say</em></h2>
        </div>
        <div className="testimonials-carousel">
          {testimonials.map((t, i) => (
            <div key={i} className={`testimonial-card ${i === activeTestimonial ? "active" : i === (activeTestimonial + 1) % testimonials.length ? "next" : ""}`}>
              <FaQuoteLeft className="quote-icon" />
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-stars">
                {[...Array(t.rating)].map((_, j) => <FiStar key={j} className="filled" />)}
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">{t.name[0]}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.location}</span>
                </div>
              </div>
              <span className="testimonial-product">Purchased: {t.product}</span>
            </div>
          ))}
        </div>
        <div className="testimonial-dots">
          {testimonials.map((_, i) => (
            <button key={i} className={`dot ${i === activeTestimonial ? "active" : ""}`} onClick={() => setActiveTestimonial(i)} />
          ))}
        </div>
      </section>

      {/* ===== INSTAGRAM SHOWCASE ===== */}
      <section className="instagram-section">
        <div className="section-header">
          <span className="section-label">Follow Us</span>
          <h2 className="section-title"><em>@AtoZJewellery</em> on Instagram</h2>
          <p>Tag us in your photos for a chance to be featured!</p>
        </div>
        <div className="instagram-grid">
          {[
            "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=400&q=80",
            "https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=400&q=80",
            "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&q=80",
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80",
            "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&q=80",
            "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=400&q=80",
          ].map((img, i) => (
            <a key={i} href="https://instagram.com" target="_blank" rel="noreferrer" className="insta-item">
              <img src={img} alt={`Instagram ${i + 1}`} loading="lazy" />
              <div className="insta-overlay"><FaInstagram /></div>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
