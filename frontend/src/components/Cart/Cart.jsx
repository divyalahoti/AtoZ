import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { FiTrash2, FiPlus, FiMinus, FiArrowRight, FiShoppingBag } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";
import "./Cart.css";

const Cart = () => {
  const { cart, updateQty, removeFromCart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const shipping = cartTotal > 999 ? 0 : 99;
  const total = cartTotal + shipping;

  if (cart.length === 0) return (
    <div className="cart-page">
      <Navbar />
      <div className="cart-empty">
        <FiShoppingBag />
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added any jewellery yet.</p>
        <Link to="/collection" className="btn-primary">Explore Collection <FiArrowRight /></Link>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="cart-page">
      <Navbar />
      <div className="cart-hero">
        <span className="section-label">Your Selection</span>
        <h1 className="section-title">Shopping <em>Cart</em></h1>
      </div>
      <div className="cart-container">
        <div className="cart-items">
          <div className="cart-header-row">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
            <span></span>
          </div>
          {cart.map(item => (
            <div key={item._id} className="cart-item">
              <div className="cart-item-product" onClick={() => navigate("/productcard", { state: item })}>
                <img src={item.image} alt={item.name} />
                <div>
                  <span className="ci-cat">{item.category}</span>
                  <h4>{item.name}</h4>
                </div>
              </div>
              <span className="ci-price">₹{item.price?.toLocaleString("en-IN")}</span>
              <div className="ci-qty">
                <button onClick={() => updateQty(item._id, item.qty - 1)}><FiMinus /></button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item._id, item.qty + 1)}><FiPlus /></button>
              </div>
              <span className="ci-total">₹{(item.price * item.qty)?.toLocaleString("en-IN")}</span>
              <button className="ci-remove" onClick={() => { removeFromCart(item._id); toast.info("Removed from cart"); }}>
                <FiTrash2 />
              </button>
            </div>
          ))}
          <div className="cart-actions">
            <Link to="/collection" className="btn-outline">Continue Shopping</Link>
            <button className="cart-clear" onClick={() => { clearCart(); toast.info("Cart cleared"); }}>Clear Cart</button>
          </div>
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-line"><span>Subtotal ({cart.length} items)</span><span>₹{cartTotal?.toLocaleString("en-IN")}</span></div>
          <div className="summary-line"><span>Shipping</span><span>{shipping === 0 ? <span className="free">FREE</span> : `₹${shipping}`}</span></div>
          {shipping > 0 && <p className="free-ship-hint">Add ₹{(999 - cartTotal).toLocaleString("en-IN")} more for free shipping!</p>}
          <div className="summary-line total"><span>Total</span><span>₹{total?.toLocaleString("en-IN")}</span></div>
          <div className="promo-box">
            <input type="text" placeholder="Enter promo code" />
            <button>Apply</button>
          </div>
          <button className="btn-primary checkout-btn" onClick={() => navigate("/checkout")}>
            Proceed to Checkout <FiArrowRight />
          </button>
          <div className="secure-badge">🔒 Secure Checkout • 100% Safe & Encrypted</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
