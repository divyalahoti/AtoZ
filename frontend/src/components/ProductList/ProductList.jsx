import { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "./ProductList.css";
import { useNavigate } from "react-router-dom";


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();
  const backendurl=import.meta.env.VITE_BACKENDURL;

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    axios
      .get(backendurl+"/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const filteredProducts = products.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || item.category === category)
  );

  const slides = [
    {
      img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e",
      title: "The Eternal",
      span: "Glow",
      subtitle: "Handcrafted diamonds for timeless moments.",
    },
    {
      img: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed",
      title: "Royal",
      span: "Heritage",
      subtitle: "Experience the opulence of gold artistry.",
    },
    {
      img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338",
      title: "Modern",
      span: "Minimalism",
      subtitle: "Designed for the contemporary woman.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // change every 3 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="product-page">

      {/* 🎯 AUTO SLIDER HERO */}
      <div className="hero-slider">

        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.img})` }}
          >
            <div className="overlay"></div>

            <div className="hero-content">
              <span>New Arrival</span>
              <h1>
                {slide.title} <br /> <span>{slide.span}</span>
              </h1>
              <p>{slide.subtitle}</p>

              
            </div>
          </div>
        ))}

      </div>

      {/* 🔍 search BAR */}
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search jewellery..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All</option>
          <option value="Necklace">Necklace</option>
          <option value="Ring">Ring</option>
          <option value="Bangles">Bangles</option>
          <option value="Payal">Payal</option>
          <option value="Earrings">Earrings</option>
          <option value="Bracelet">Bracelet</option>
        </select>
      </div>

      {/* 🛍 PRODUCT GRID */}
      <div className="grid">
        {filteredProducts.map((item) => (
          <div className="card" key={item._id} data-aos="zoom-in">

            <div className="img-box">
              <img
                src={item.image}
                alt={item.name}
              />
            </div>

            <div className="info">
              <h3>{item.name}</h3>
              <p className="category">{item.category}</p>
              <p className="price">₹{item.price}</p>
              <button
                className="btn"
                onClick={() => navigate("/productcard", { state: item })}
              >
                Add to Cart
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;