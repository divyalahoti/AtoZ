import { useState } from "react";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

 if (form.email === "admin@gmail.com" && form.password === "12345") {
  navigate("/admin");
} else {
  alert("Invalid credentials ❌");
}

  console.log(form);
};

  return (
    <div className="login-container">

      <div className="login-card">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          {/* EMAIL */}
          <label>Email</label>
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="admin@elegance.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {/* PASSWORD */}
          <label>Password</label>
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* BUTTON */}
          <button type="submit" className="login-btn">
            Login
          </button>

        </form>
      </div>

    </div>
  );
};

export default Login;