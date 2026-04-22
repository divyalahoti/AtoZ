import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Testimonials.css";

const testimonials = [
  {
    name: "Priya Sharma",
    review: "Absolutely stunning jewellery! The quality is amazing and delivery was super fast.",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Riya Patel",
    review: "Elegant designs and premium feel. I loved the necklace I ordered!",
    image: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    name: "Anjali Mehta",
    review: "Best jewellery store online. Highly recommended 💎",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    name: "Neha Verma",
    review: "Perfect for gifting. Beautiful packaging and classy designs.",
    image: "https://randomuser.me/api/portraits/women/32.jpg"
  }
];

const Testimonials = () => {

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="testimonials">

      {/* HERO */}
      <div className="testimonials-hero">
        <div className="overlay">
          <h1 data-aos="fade-up">What Our Clients Say</h1>
          <p data-aos="fade-up" data-aos-delay="200">
            Trusted by thousands of happy customers 💎
          </p>
        </div>
      </div>

      {/* TESTIMONIAL GRID */}
      <div className="testimonial-container">

        {testimonials.map((item, index) => (
          <div 
            className="testimonial-card" 
            key={index} 
            data-aos="zoom-in"
          >

            <img src={item.image} alt={item.name} />

            <h3>{item.name}</h3>

            <p className="review">"{item.review}"</p>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Testimonials;