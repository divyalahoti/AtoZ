import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from './components/Home/Home';
import AddProduct from './admin/AddProduct/AddProduct';
import ProductList from './components/ProductList/ProductList';
import ListProduct from './admin/ListProduct/ListProduct';
import Contact from './components/Contact/Contact';
import About from './components/About/About';
import Testimonials from './components/Testimonials/Testimonials';
import ProductCard from './components/ProductCard/ProductCard';
import AdminDashboard from './admin/AdminDashboard/AdminDashboard';

import { ToastContainer } from "react-toastify";
import { FaWhatsapp } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import Layout from './admin/Layout';
import './App.css'
import Login from './admin/Login/Login';

const App = () => {
  return (
    <BrowserRouter>

      <Layout>

        {/* FLOAT BUTTON */}
        <a
          href="https://wa.me/919428380108"
          className="whatsapp-float"
          target="_blank"
          rel="noreferrer"
        >
          <FaWhatsapp />
        </a>

        <ToastContainer position="top-right" autoClose={3000} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/productcard" element={<ProductCard />} />

          {/* ADMIN */}
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="list" element={<ListProduct />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="add-product/:id" element={<AddProduct />} />
          <Route path="/login" element={<Login />} />
        </Routes>

      </Layout>

    </BrowserRouter>
  );
};

export default App;