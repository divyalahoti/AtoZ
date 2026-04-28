import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Contact.css";
import axios from "axios";
import { toast } from "react-toastify";

const Contact = () => {

  const backendurl = import.meta.env.VITE_BACKENDURL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    try {
      await axios.post(backendurl + "/api/contact/contact", formData);

      toast.success("Message sent successfully 💌");
      e.target.reset();
    } catch (err) {
      toast.error("Something went wrong ❌");
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out-cubic",
      once: true,
      mirror: false,
      offset: 80,
      delay: 50,
    });
  }, []);

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="contact">

      {/* HERO */}
      <section className="contact-hero">
   
          <h1 data-aos="fade-down" data-aos-duration="1200">
            Contact Us
          </h1>
          <p data-aos="fade-up" data-aos-delay="300">
            We’d love to hear from you 💎
          </p>
        

      </section>

      {/* QUICK CONTACT CARDS */}
      <section className="quick-contact">
        <div className="contact-card" data-aos="fade-up" data-aos-delay="0">
          <h4>📞 Call Us</h4>
          <p>+91 98765 43210</p>
        </div>

        <div className="contact-card" data-aos="fade-up" data-aos-delay="150">
          <h4>📧 Email</h4>
          <p>jewellux@gmail.com</p>
        </div>

        <div className="contact-card" data-aos="fade-up" data-aos-delay="300">
          <h4>📍 Location</h4>
          <p>Idar, Gujarat</p>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="contact-container">

        {/* LEFT SIDE */}
        <div className="contact-info" data-aos="fade-right" data-aos-duration="1000">

          <h2>Get in Touch</h2>
          <p>We’re here to help and answer any question you might have.</p>

          <div className="info-cards">

            <div className="info-item" data-aos="fade-up" data-aos-delay="100">
              <span>📍</span>
              <div>
                <h5>Location</h5>
                <p>Idar, Gujarat, India</p>
              </div>
            </div>

            <div className="info-item" data-aos="fade-up" data-aos-delay="200">
              <span>📞</span>
              <div>
                <h5>Phone</h5>
                <p>+91 98765 43210</p>
              </div>
            </div>

            <div className="info-item" data-aos="fade-up" data-aos-delay="300">
              <span>📧</span>
              <div>
                <h5>Email</h5>
                <p>jewellux@gmail.com</p>
              </div>
            </div>

          </div>

          <button
            className="whatsapp-btn"
            data-aos="zoom-in-up"
            onClick={() => window.open("https://wa.me/919428380108", "_blank")}
          >
            💬 Chat on WhatsApp
          </button>


        </div>

        {/* RIGHT SIDE FORM */}
        <form className="contact-form" onSubmit={handleSubmit} data-aos="fade-left" data-aos-delay="200">
          <input name="name" type="text" placeholder="Your Name" required />
          <input name="email" type="email" placeholder="Your Email" required />
          <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>

      </section>

      {/* WORKING HOURS */}
      <section className="working-hours" data-aos="fade-up" data-aos-duration="900">
        <h2>Working Hours</h2>
        <p>Mon - Sat: 10:00 AM - 8:00 PM</p>
        <p>Sunday: Closed</p>
      </section>

      {/* MAP */}
      <section className="map-section" data-aos="fade-up" data-aos-delay="100">
        <iframe
          title="map"
          src="https://maps.google.com/maps?q=idar%20gujarat&t=&z=13&ie=UTF8&iwloc=&output=embed"
          allowFullScreen
        ></iframe>
      </section>

      {/* FAQ */}
      <section className="faq">
        <h2 >Frequently Asked Questions</h2>

        {[
          {
            q: "Do you offer custom jewellery?",
            a: "Yes, we create custom designs based on your requirements."
          },
          {
            q: "How long does delivery take?",
            a: "Delivery usually takes 3–5 working days across India."
          },
          {
            q: "Do you provide cash on delivery?",
            a: "Yes, COD is available for selected locations."
          },
          {
            q: "Are your products certified?",
            a: "Yes, all our jewellery is quality checked and certified."
          }
        ].map((item, index) => (
          <div
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            key={index}


            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <h4>{item.q}</h4>
              <span>{activeIndex === index ? "-" : "+"}</span>
            </div>

            <div className="faq-answer">
              <p>{item.a}</p>
            </div>
          </div>
        ))}

      </section>

      {/* SOCIAL LINKS */}
      <section className="social-links" data-aos="fade-up" data-aos-delay="200">
        <p>Follow Us</p>
        <div>
          <span>📸 Instagram</span>
          <span>👍 Facebook</span>
          <span>▶ YouTube</span>
        </div>
      </section>

    </div>
  );
};

export default Contact;