import { useState, useEffect } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "./AddProduct.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { FiUploadCloud, FiShoppingBag, FiDollarSign, FiLayers } from "react-icons/fi";

const AddProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const backendurl=import.meta.env.VITE_BACKENDURL;


  const [data, setData] = useState({
    name: "",
    price: "",
    category: ""
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    if (id) {
      axios.get(backendurl+`/api/products/${id}`)
        .then(res => {
          setData({
            name: res.data.name,
            price: res.data.price,
            category: res.data.category
          });
          setPreview(res.data.image);
        })
        .catch(() => toast.error("Failed to load product ❌"));
    }
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const submit = async () => {
    if (!data.name || !data.price || !data.category) {
      toast.warn("Please fill all fields 💎");
      return;
    }

    try {
      const form = new FormData();
      Object.keys(data).forEach(key => form.append(key, data[key]));

      if (image) form.append("image", image);

      if (id) {
        await axios.put(backendurl+`/api/products/${id}`, form);
        toast.success("Product Updated ✨");
      } else {
        if (!image) {
          toast.warn("Please upload image 💎");
          return;
        }
        await axios.post(backendurl+"/api/products/add", form);
        toast.success("Product Added ✨");
      }

      setTimeout(() => navigate("/list"), 1500);
    } catch {
      toast.error("Operation failed ❌");
    }
  };

  return (
    <div className="admin-page-wrapper">
      <div className="glass-container" data-aos="zoom-in-up">

        {/* LEFT */}
        <div className="form-section">

          <span className="back-btn" onClick={() => navigate(-1)}>← Back</span>

          <div className="header-meta">
            <span className="subtitle">{id ? "Edit Product" : "Inventory Management"}</span>
            <h2>{id ? "Update Product" : "Curate New Arrival"}</h2>
          </div>

          {/* NAME */}
          <label>Product Title</label>
          <div className="input-box">
            <FiShoppingBag className="input-icon" />
            <input
              type="text"
              placeholder="Product Name"
              value={data.name}
              onChange={e => setData({ ...data, name: e.target.value })}
            />
          </div>

          {/* PRICE */}
          <label>Price</label>
          <div className="input-box">
            <FiDollarSign className="input-icon" />
            <input
              type="number"
              placeholder="Enter price"
              value={data.price}
              onChange={e => setData({ ...data, price: e.target.value })}
            />
          </div>

          {/* CATEGORY */}
          <label>Category</label>
          <div className="input-box select-box">
            <FiLayers className="input-icon" />
            <select
              value={data.category}
              onChange={e => setData({ ...data, category: e.target.value })}
            >
              <option value="">Select Category</option>
              <option>Necklace</option>
              <option>Ring</option>
              <option>Bangles</option>
              <option>Payal</option>
              <option>Earrings</option>
              <option>Bracelet</option>
            </select>
          </div>

          {/* IMAGE */}
          <div className="upload-zone">
            <input type="file" id="file-upload" onChange={handleImageChange} hidden />
            <label htmlFor="file-upload" className="upload-label">
              <FiUploadCloud className="upload-icon" />
              <span>{image ? image.name : "Upload / Change Image"}</span>
            </label>
          </div>

          <button className="premium-btn" onClick={submit}>
            {id ? "Update Product" : "Publish Product"}
          </button>
        </div>

        {/* RIGHT PREVIEW */}
        <div className="preview-section">
          <div className="preview-card">

            <div className="preview-img-container">
              {preview
                ? <img src={preview} alt="preview" />
                : <div className="placeholder-img">Image Preview</div>}
            </div>

            <div className="preview-details">
              <p className="p-cat">{data.category}</p>
              <h3>{data.name || "Product Name"}</h3>
              <p className="p-price">₹{data.price || "0.00"}</p>
            </div>

          </div>
        </div>

      </div>

      <ToastContainer position="bottom-center" theme="dark" />
    </div>
  );
};

export default AddProduct;