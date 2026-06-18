import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import ProductList from './components/ProductList/ProductList';
import ProductCard from './components/ProductCard/ProductCard';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import AuthPage from './components/Auth/AuthPage';
import OrderTracking from './components/OrderTracking/OrderTracking';
import AdminDashboard from './admin/AdminDashboard/AdminDashboard';
import AddProduct from './admin/AddProduct/AddProduct';
import ListProduct from './admin/ListProduct/ListProduct';
import Layout from './admin/Layout';
import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import BackToTop from './components/BackToTop/BackToTop';
import { ToastContainer } from "react-toastify";
import { FaWhatsapp } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import { CartProvider } from './context/CartContext';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <CartProvider>
      <BrowserRouter>
        <LoadingScreen visible={loading} />
        <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
          <a
            href="https://wa.me/919428380108"
            className="whatsapp-float"
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp />
          </a>
          <BackToTop />
          <ToastContainer position="top-right" autoClose={3000} />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/collection" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductCard />} />
            <Route path="/productcard" element={<ProductCard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/track-order" element={<OrderTracking />} />
            {/* Admin */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/list" element={<ListProduct />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/add-product/:id" element={<AddProduct />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
