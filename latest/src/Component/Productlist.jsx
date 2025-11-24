import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { LifeLine } from "react-loading-indicators";
import useFetch from "./Custom -hooks/useFetch";
import { MdAddShoppingCart } from "react-icons/md";
import { LiaEdit } from "react-icons/lia";
import { GrTrash } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/cardSlice";
import { useSearch } from "./SearchContext";
import "./ProductPage.css";

const Productlist = () => {
  let navigat = useNavigate();
  const { searchQuery } = useSearch();

  let { products, error, isloading, setProducts } = useFetch(
    "https://fakestoreapi.com/products# "
  );
  ///http://localhost:5000/product   -jSON  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  let handledelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        axios.delete(`http://localhost:5000/product/${id}`);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        let productlist = products.filter((product) => product.id !== id);
        setProducts(productlist);
      } catch {
        error(error);
      }
    }
  };

  let dispatch = useDispatch();
  let productstore = useSelector((state) => {
    return state.cart;
  });
  let addtoItemcard = (product) => {
    let checkproduct = productstore.some(
      (cartproduct) => cartproduct.id === product.id
    );
    console.log(checkproduct);

    if (!checkproduct) {
      dispatch(addItem(product));
      Swal.fire({
        title: "success",
        text: "Product added successfully🎇",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Oops!",
        text: "Product already added",
        icon: "error",
        footer: "<p>Add some others product!</P>",
      });
    }
  };

  if (isloading) {
    return (
      <div className="product-page-container">
        <div className="loading-container">
          <LifeLine color="#2563eb" size="medium" text="" textColor="" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="product-page-container">
        <div className="product-page-header">
          <h1 className="product-page-title">Product List</h1>
          <div className="create-product-section">
            <span>Create a new product</span>
            <button
              className="create-product-btn"
              onClick={() => {
                navigat("/newproduct");
              }}
            >
              Click me!
            </button>
          </div>
        </div>

        <div className="products-container">
          {filteredProducts.length !== 0 && (
            <div className="products-grid">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="product-card-animated"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="product-image-container">
                    <div className="product-badge">New</div>
                    <img
                      src={product.image}
                      alt={product.title}
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300x400?text=Product";
                      }}
                    />
                    <div className="product-image-overlay"></div>
                  </div>

                  <div className="product-info-container">
                    <h3 className="product-title-text">{product.title}</h3>
                    <div className="product-price-text">${product.price}</div>
                  </div>

                  <div className="product-actions">
                    <button
                      className="action-btn add-to-cart-btn"
                      onClick={() => {
                        addtoItemcard(product);
                      }}
                      title="Add to Cart"
                    >
                      <MdAddShoppingCart />
                    </button>
                    <button
                      className="action-btn edit-btn"
                      onClick={() => {
                        navigat(`/update/${product.id}`);
                      }}
                      title="Edit Product"
                    >
                      <LiaEdit />
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => {
                        handledelete(product.id);
                      }}
                      title="Delete Product"
                    >
                      <GrTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredProducts.length === 0 && searchQuery && (
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <h3>No products found</h3>
              <p>Try searching with a different keyword</p>
            </div>
          )}

          {filteredProducts.length === 0 &&
            !searchQuery &&
            products.length === 0 && (
              <div className="empty-state">
                <div className="empty-state-icon">📦</div>
                <h3>No products available</h3>
                <p>Start by creating your first product</p>
              </div>
            )}
        </div>

        {error && (
          <div className="empty-state">
            <div className="empty-state-icon">⚠️</div>
            <h3>Error loading products</h3>
            <p>{error}</p>
          </div>
        )}
      </div>
    );
  }
};

export default Productlist;
