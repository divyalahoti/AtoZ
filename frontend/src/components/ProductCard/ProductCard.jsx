import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const ProductCard = () => {
  const location = useLocation();
  const product = location.state;
  const [relatedProducts, setRelatedProducts] = useState([]);
  const backendurl = import.meta.env.VITE_BACKENDURL;
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      axios.get(backendurl + `/api/products/related/${product.category}/${product._id}`)
        .then((res) => setRelatedProducts(res.data))
        .catch((err) => console.log(err));
      console.log(relatedProducts)
    }
  }, [product]);

  const [selectedImage, setSelectedImage] = useState(product?.image);

  if (!product) {
    return <h2 style={{ textAlign: "center" }}>No Product Selected</h2>;
  }

  const handleWhatsApp = () => {
    const message = `Hi, I want to order: ${product.name} - ₹${product.price}`;
    const url = `https://wa.me/919428380108?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="product-page">

      {/* BACK */}
      <p className="back-btn" onClick={() => window.history.back()}>
        ← Back
      </p>

      <div className="product-container">

        {/* LEFT - IMAGE GALLERY */}
        <div className="image-section">
          <img
            className="main-image"
            src={selectedImage}
            alt={product.name}
          />
        </div>

        {/* RIGHT - DETAILS */}
        <div className="details-section">

          <div className="top-row">
            <h2>{product.name}</h2>
            {/* <span className="stock">In Stock</span> */}
          </div>

          <div className="rating">
            ⭐⭐⭐⭐⭐ <span>(1725 reviews)</span>
          </div>

          <h1 className="price">₹{product.price}</h1>

          <p className="category">{product.category}</p>

          <div className="info">
            <div className="info-item">
              <span>🚚</span>
              <p>Fast delivery in 3–5 days</p>
            </div>

            <div className="info-item">
              <span>✔</span>
              <p>Free shipping on all orders</p>
            </div>

            <div className="info-item">
              <span>💎</span>
              <p>Premium quality guaranteed</p>
            </div>
          </div>

          <button onClick={handleWhatsApp} className="whatsapp-btn">
            💬 Contact via WhatsApp for Purchase
          </button>

        </div>
      </div>

      {/* SUGGESTION SECTION */}
      <div className="suggestion">

        <div className="suggestion-header">
          <h2>You May Also Like</h2>
          <p>Discover similar products from our collection</p>
        </div>

        <div className="suggestion-grid">
          {relatedProducts.map((item) => (
            <div
              className="suggest-card"
              key={item._id}

            >
              <div className="img-box">
                <img src={item.image} alt={item.name} />
              </div>

              <div className="card-info">
                <h4>{item.name}</h4>
                <p className="price">₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProductCard;