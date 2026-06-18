import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { FiUser, FiMail, FiLock, FiPhone, FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import "./AuthPage.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");       // ← added
  const [password, setPassword] = useState(""); // ← added
  const navigate = useNavigate();               // ← added

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Admin login check
    if (isLogin && email === "diyacreation@gmail.com" && password === "12345") {
      toast.success("Welcome Admin! 👑");
      navigate("/admin");
      return;
    }

    // Normal user flow
    toast.success(isLogin ? "Welcome back! 💎" : "Account created! Welcome to AtoZ Jewellery 🎉");
    navigate("/");
  };

  return (
    <div className="auth-page">
      <Navbar />
      <div className="auth-container">
        <div className="auth-visual">
          <div className="auth-visual-content">
            <h2>AtoZ Jewellery</h2>
            <p>Premium Artificial Jewellery for Every Occasion</p>
            <div className="auth-perks">
              {["Exclusive member offers", "Order tracking & history", "Early access to new collections", "Wishlist & saved items"].map((p, i) => (
                <div key={i} className="auth-perk"><span>✦</span><span>{p}</span></div>
              ))}
            </div>
          </div>
        </div>
        <div className="auth-form-side">
          <div className="auth-toggle">
            <button className={isLogin ? "active" : ""} onClick={() => setIsLogin(true)}>Login</button>
            <button className={!isLogin ? "active" : ""} onClick={() => setIsLogin(false)}>Register</button>
          </div>
          <h3>{isLogin ? "Welcome Back" : "Create Account"}</h3>
          <p className="auth-sub">{isLogin ? "Sign in to your AtoZ account" : "Join the AtoZ Jewellery family"}</p>
          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="auth-input-group">
                <FiUser />
                <input type="text" placeholder="Full Name" required />
              </div>
            )}
            <div className="auth-input-group">
              <FiMail />
              {/* ✅ value + onChange added */}
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {!isLogin && (
              <div className="auth-input-group">
                <FiPhone />
                <input type="tel" placeholder="Phone Number" required />
              </div>
            )}
            <div className="auth-input-group">
              <FiLock />
              {/* ✅ value + onChange added */}
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" className="show-pass" onClick={() => setShowPass(!showPass)}>
                {showPass ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {isLogin && <a href="#" className="forgot-pass">Forgot Password?</a>}
            <button type="submit" className="btn-primary auth-submit">
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>
          <div className="auth-divider"><span>or continue with</span></div>
          <div className="auth-social">
            <button className="social-btn google">G Google</button>
            <button className="social-btn phone">📱 OTP</button>
          </div>
          <p className="auth-switch">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Register" : "Login"}</button>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthPage;