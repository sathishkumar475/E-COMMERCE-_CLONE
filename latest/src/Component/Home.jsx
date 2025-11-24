import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { addItem } from "../store/cardSlice";
import UserProfile from "./UserProfile";
import "./EcommerceHome.css";
import About from "./About";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [useabout, setUseabout] = useState(false);

  const cartItems = useSelector((state) => state.cart || []);
  const cartCount = cartItems.length;

  const featuredProducts = [
    { id: 1, name: "T-Shirt", price: 20.0, emoji: "👕" },
    { id: 2, name: "Jeans", price: 40.0, emoji: "👖" },
    { id: 3, name: "Sneakers", price: 60.0, emoji: "👟" },
    { id: 4, name: "Backpack", price: 80.0, emoji: "🎒" },
  ];

  const handleAddToCart = (product) => {
    dispatch(
      addItem({
        id: product.id,
        title: product.name,
        price: product.price,
        image: product.emoji,
      })
    );
    navigate("/product");
  };

  return (
    <div className="ecommerce-home">
      {/* Header */}
      <header className="ecommerce-header">
        <div className="header-content">
          {/* LEFT: MENU */}
          <div
            className="header-left"
            style={{ position: "relative" }} // parent for absolute dropdown
          >
            <div
              className="menu-toggle"
              onClick={() => setShowMenu((prev) => !prev)}
            >
              <div className="hamburger">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span>MENU</span>
            </div>

            {/* Dropdown – inline styles only */}
            {showMenu && (
              <ul
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  marginTop: "8px",
                  listStyle: "none",
                  padding: "6px 0",
                  background: "#ffffff",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                  minWidth: "160px",
                  zIndex: 999,
                }}
              >
                <li
                  style={{
                    padding: "6px 12px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                  onClick={() => {
                    setActiveSection("home");
                    setUseabout(false);
                    setShowMenu(false);
                    navigate("/home");
                  }}
                >
                  🏠 Home
                </li>

                <li
                  style={{
                    padding: "6px 12px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                  onClick={() => {
                    setActiveSection("products");
                    setUseabout(false);
                    setShowMenu(false);
                    navigate("/product");
                  }}
                >
                  🛍️ Products
                </li>

                <li
                  style={{
                    padding: "6px 12px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                  onClick={() => {
                    setActiveSection("about");
                    setUseabout(true);
                    setShowMenu(false);
                  }}
                >
                  ℹ️ About
                </li>

                <li
                  style={{
                    padding: "6px 12px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                  onClick={() => {
                    setActiveSection("contact");
                    setUseabout(false);
                    setShowMenu(false);
                    // navigate("/contact");
                  }}
                >
                  📞 Contact
                </li>
              </ul>
            )}
          </div>

          {/* CENTER: LOGO + NAV */}
          <div className="header-logo">
            <Link
              to="/home"
              style={{ textDecoration: "none", color: "#06100dff" }}
            >
              <h2 style={{ marginLeft: "500px" }}>E-SHOP</h2>
            </Link>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
            <nav className="header-nav">
              <Link
                to="/home"
                onClick={() => {
                  setActiveSection("home");
                  setUseabout(false);
                }}
              >
                Home
              </Link>

              <Link
                to="/product"
                onClick={() => {
                  setActiveSection("products");
                  setUseabout(false);
                }}
              >
                Products
              </Link>

              <button
                type="button"
                onClick={() => {
                  setUseabout((prev) => !prev);
                  setActiveSection("about");
                }}
                className="about-btn"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                About
              </button>

              <Link
                to="/home"
                onClick={() => {
                  setActiveSection("contact");
                  setUseabout(false);
                }}
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* RIGHT: PROFILE + CART */}
          <div className="header-right">
            <div style={{ position: "relative" }}>
              <UserProfile />
            </div>

            <div style={{ position: "relative" }}>
              <FaShoppingCart
                className="header-icon"
                onClick={() => navigate("/checkout")}
              />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      {activeSection !== "about" && (
        <>
          {/* Hero Banner Section */}
          <section className="hero-banner">
            <div className="hero-content-left">
              <div className="hero-sale-text">SUPER SALE</div>
              <div className="hero-discount-text">50% OFF</div>
              <Link to="/product">
                <button className="shop-now-btn-blue">SHOP NOW</button>
              </Link>
            </div>
            <div className="hero-image-right">
              <div className="watch-image">⌚</div>
            </div>
          </section>

          {/* Featured Products Section */}
          <section className="featured-section">
            <h2 className="section-heading">Featured Products</h2>
            <div className="featured-products-grid">
              {featuredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image">{product.emoji}</div>
                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                    <div className="product-price">
                      ${product.price.toFixed(2)}
                    </div>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* About Section */}
      {useabout && (
        <div className="about-dropdown">
          <About />
        </div>
      )}
    </div>
  );
};

export default Home;
