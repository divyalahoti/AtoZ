import { NavLink } from "react-router-dom";
import { FiHome, FiBox, FiPlus } from "react-icons/fi";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">DIYA</h2>

      <nav>
        <NavLink to="/admin" className="nav-link">
          <FiHome /> Dashboard
        </NavLink>

        <NavLink to="/admin/products" className="nav-link">
          <FiBox /> Products
        </NavLink>

        <NavLink to="/admin/add-product" className="nav-link">
          <FiPlus /> Add Product
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;