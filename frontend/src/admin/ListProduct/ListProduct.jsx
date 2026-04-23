import { useEffect, useState } from "react";
import axios from "axios";
import { FiTrash2, FiEdit3, FiEye, FiSearch, FiPlus } from "react-icons/fi";
import AOS from "aos";
import { useNavigate } from "react-router-dom";
import "./ListProduct.css";
import { toast } from "react-toastify";

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const backendurl = import.meta.env.VITE_BACKENDURL;

  const itemsPerPage = 10;

  const fetchData = async () => {
    const res = await axios.get(backendurl + "/api/products");
    setProducts(res.data);
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowDelete(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(backendurl + `/api/products/${selectedId}`);
      setShowDelete(false);
      fetchData();
      toast.success("Product Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    AOS.init({ duration: 800 });
  }, []);

  // FILTER + SEARCH
  const filteredProducts = products.filter((item) => {
    return (
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || item.category === category)
    );
  });

  // PAGINATION
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="list-container">

      {/* HEADER */}
      <div className="list-header">
        <h2>Collection Gallery</h2>

        <div className="header-actions">
          <div className="search-box">
            <FiSearch />
            <input
              type="text"
              placeholder="Search products..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select onChange={(e) => setCategory(e.target.value)}>
            <option>All</option>
            <option>Necklace</option>
            <option>Ring</option>
            <option>Bangles</option>
            <option>Payal</option>
            <option>Earrings</option>
            <option>Bracelet</option>
          </select>

          {/* <button className="btn-add" onClick={() => navigate('add-product')}>
            <FiPlus /> Add Product
          </button> */}
        </div>
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="premium-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item._id}>
                <td>
                  <img
                    src={item.image}
                    className="thumb"
                    alt="item.name"
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>₹{item.price}</td>
                <td className="actions">
                  {/* <FiEye /> */}
                  <FiEdit3 onClick={() => navigate(`/add-product/${item._id}`)} />
                  <FiTrash2 onClick={() => handleDeleteClick(item._id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        {[...Array(totalPages)].map((_, i) => (
          <button key={i} onClick={() => setCurrentPage(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>

      {showDelete && (
        <div className="delete-modal">
          <div className="delete-box">

            <div className="delete-icon">⚠️</div>

            <h3>Delete Product?</h3>
            <p>This action cannot be undone. Are you sure?</p>

            <div className="delete-actions">
              <button className="btn-cancel" onClick={() => setShowDelete(false)}>
                Cancel
              </button>

              <button className="btn-delete" onClick={confirmDelete}>
                Yes, Delete
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ListProduct;