import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Home.css";
import banner_img from '../../assets/home_banner.jpg';
import topselling_1 from '../../assets/topselling_1.jpg';
import topselling_2 from '../../assets/topselling_2.jpg';
import topselling_3 from '../../assets/topselling_3.jpg';
import hallmark from '../../assets/hallmark.jpg';
import diamond from '../../assets/diamond.jpg'
import trust from '../../assets/trust.jpg';
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out-cubic",
      once: true,
      mirror: false,
      offset: 80,
    });

    axios.get("http://localhost:5000/api/products")
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  // Filter Helper: Gets first 4 items of a specific category
  const getCategorizedProducts = (category) => {
    return products
      .filter(item => item.category.toLowerCase() === category.toLowerCase())
      .slice(0, 4);
  };

  const testimonials = [
    {
      name: "Rajiv Jain",
      text: "Well crafted and well designed jewels available here. They customize based on our need and give valuable suggestions. Specialists in diamond and stone crafted jewels.",
      rating: "100%"
    },
    {
      name: "Visruti Nair",
      text: "First time online shopping for jewellery. Really made every effort to meet my choice and budget. Outstanding customer experience!",
      rating: "100%"
    },
    {
      name: "Lakshmi Meka",
      text: "Unique and trendy jewelry collection. I end up buying something whenever I visit. Diamonds and gem stone jewelry is their speciality.",
      rating: "100%"
    }
  ];

  const contactOptions = [
    { title: "Write to Us", icon: "email-dark-50x50.png", link: "mailto:info@diyacreation.com" },
    { title: "Call Us", icon: "telephone-dark-50x50.png", link: "tel:9169160159" },
    { title: "Visit Us", icon: "location-dark-50x50.png", link: "https://maps.google.com" }
  ];

  // Component to render a product card
  const ProductCard = ({ item, index }) => (
    <div
      className="product-card"
      data-aos="fade-up"
      data-aos-delay={index * 100}
      data-aos-duration="800"
    >
      <div className="image-wrapper">
        <img src={item.image} alt={item.name} />
        <div className="card-overlay">
          <button className="quick-add">Quick View</button>
        </div>
      </div>
      <div className="product-details">
        <span className="p-category">{item.category}</span>
        <h3 className="p-name">{item.name}</h3>
        <div className="p-footer">
          <span className="p-price">₹{item.price.toLocaleString('en-IN')}</span>
          <button className="add-to-cart-icon">+</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="home-container">
      {/* <Navbar /> */}
      {/* HERO BANNER */}
      <div className="banner-wrapper" data-aos="zoom-in" data-aos-duration="1500">
        <img src={banner_img} alt="Main Banner" className="w-100" />
      </div>

      <section className="collection-section container py-5">
        <div className="section-header text-center mb-5">
          <h2 data-aos="fade-up" data-aos-delay="100">Curated Masterpieces</h2>
          <div className="line mx-auto" data-aos="zoom-in" data-aos-delay="200"></div>
        </div>

        {/* BRACELETS SECTION */}
        <div className="category-group mb-5">
          <h4
            className="category-title"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <u>Bracelets</u>
          </h4>
          <div className="product-grid">
            {getCategorizedProducts("Bracelet").map((item, index) => (
              <ProductCard key={item._id} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* RINGS SECTION */}
        <div className="category-group mb-5">
          <h4
            className="category-title"
            data-aos="fade-left"
            data-aos-delay="100"
          >
            <u>Rings</u>
          </h4>
          <div className="product-grid">
            {getCategorizedProducts("Ring").map((item, index) => (
              <ProductCard key={item._id} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* TRUST REASONS */}
        <div className="trust-section-custom">

          <h2 className="section-title" data-aos="fade-up">Why Diya Creation ?</h2>
          <div className="line mx-auto"></div>
          <div className="trust-container">

            <div className="trust-item" data-aos="zoom-in-up" data-aos-delay="100">
              <img src={hallmark} alt="" className="trust-icon" />
              <p>100% Hallmarked Jewellery</p>
            </div>

            <div className="trust-item" data-aos="zoom-in-up" data-aos-delay="200">
              <img src={trust} alt="" />
              <p>Trust of Diya Creation</p>
            </div>

            <div className="trust-item" data-aos="zoom-in-up" data-aos-delay="300">
              <img src={diamond} alt="" />
              <p>Certified Diamond Jewellery</p>
            </div>

          </div>
        </div>

        {/* TOP SELLING */}

        <div className="topselling-section text-center mb-5">
          <h2 className="section-title" data-aos="fade-up">Top Selling Jewellery Design</h2>
          <div className="line mx-auto"></div>
          {/* <h3 className="mb-4">Top Selling Jewellery Design</h3> */}
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <img src={topselling_1} alt="Top 1" className="img-fluid rounded shadow-sm" style={{ maxWidth: '300px' }} data-aos="flip-left" data-aos-delay="100" />
            <img src={topselling_2} alt="Top 2" className="img-fluid rounded shadow-sm" style={{ maxWidth: '300px' }} data-aos="flip-left" data-aos-delay="200" />
            <img src={topselling_3} alt="Top 3" className="img-fluid rounded shadow-sm" style={{ maxWidth: '300px' }} data-aos="flip-left" data-aos-delay="300" />
          </div>
        </div>

        {/* TESTIMONIALS */}
        <div className="testimonials text-center mb-5">
          <h2 className="section-title" data-aos="fade-up">What Our Clients Say</h2>
          <div className="line mx-auto"></div>

          {/* <h2 className="section-title">What Our Clients Say</h2> */}

          <div className="testimonial-grid">
            {testimonials.map((t, i) => (
              <div className="testimonial-card-new" key={i} data-aos="fade-up" data-aos-delay={i * 150}>
                <div className="user-info">
                  {t.img ? (
                    <img src={t.img} alt={t.name} />
                  ) : (
                    <div className="avatar">{t.name.charAt(0)}</div>
                  )}

                  <div>
                    <h4>{t.name}</h4>
                    <div className="stars">★★★★★</div>
                  </div>
                </div>

                <p>"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>


        {/* CONTACT */}
        <div className="contact-section  text-center mb-5" >

          <h2 className="section-title" data-aos="fade-up">Get In Touch With Us</h2>
          <div className="line mx-auto"></div>

          {/* <h2 className="section-title">Get In Touch With Us</h2> */}

          <div className="contact-grid">
            {contactOptions.map((opt, i) => (
              <a href={opt.link} key={i} className="contact-card" data-aos="zoom-in" data-aos-delay={i * 150}>
                <img
                  src={`https://mohanjewellery.com/wp-content/uploads/2024/04/${opt.icon}`}
                  alt={opt.title}
                />
                <h4>{opt.title}</h4>
              </a>
            ))}
          </div>
        </div>
      </section>
      {/* < Footer /> */}
    </div>
  );
};

export default Home;