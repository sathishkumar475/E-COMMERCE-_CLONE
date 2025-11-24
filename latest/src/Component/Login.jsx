import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import loginImage from "../assets/login.jpg";
import "./AuthPages.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    // Get existing users from localStorage
    let users = JSON.parse(localStorage.getItem("Users")) || [];

    // Check if user exists
    let foundUser = users.find(
      (user) => user.email === data.email && user.password === data.password
    );

    if (foundUser) {
      // Store user in context
      login({
        email: foundUser.email,
        name: foundUser.name || foundUser.email?.split("@")[0],
      });
      alert("Login Successful!");
      navigate("/home");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="auth-container">
      {/* Form Section */}
      <div className="auth-form-section">
        <div className="auth-form-wrapper">
          <div className="auth-logo">
            <span>🚀</span>
            <span>SathSoftware</span>
          </div>

          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to continue to your account</p>

          <form className="auth-form" onSubmit={handleSubmit(handleLogin)}>
            <button type="button" className="social-login-button">
              <div className="google-icon">G</div>
              <span>Login with Google</span>
            </button>

            <div className="divider">or</div>

            <div className="form-field">
              <label htmlFor="email">Email*</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="password">Password*</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <span className="error-message">{errors.password.message}</span>
              )}
            </div>

            <button type="submit" className="auth-button">
              Login
            </button>

            <div className="auth-link">
              Already have an account?{" "}
              <Link to="/signup">Create new account</Link>
            </div>
          </form>
        </div>
      </div>

      {/* Image Section */}
      <div
        className="auth-image-section"
        style={{ backgroundImage: `url(${loginImage})` }}
      >
        <div className="image-overlay">
          <div className="image-content">
            <h2 className="image-title">
              Discovering the Best Software Solutions
            </h2>
            <p className="image-description">
              Our practice is Designing Complete Environments with exceptional
              features, communities and places in special situations.
            </p>
          </div>

          <div className="feature-badges">
            <div className="feature-badge">
              <div className="badge-icon">✓</div>
              <span>100% Guarantee</span>
            </div>
            <div className="feature-badge">
              <div className="badge-icon">🚚</div>
              <span>Free Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
