import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import signupImage from "../assets/sign-up.jpg";
import "./AuthPages.css";

const Schema = Yup.object().shape({
  name: Yup.string()
    .required("Name is Required")
    .matches(/^[A-Z][a-z]+ [A-Z][a-z]+$/, " Enter your Fullname"),
  email: Yup.string()
    .email()
    .required("Email is Required")
    .matches(/^[a-z0-9]+@[a-z]{3,6}\.[a-z]{2,4}$/, " Enter a valid email"),
  age: Yup.number()
    .integer()
    .positive()
    .required("Enter your age")
    .min(18, "Enter age between 18 to 30")
    .max(30, "Enter age between 18 to 30"),

  password: Yup.string().required("Password is required "),
  Cpassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "password must match"
  ),
});

const Signup = () => {
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  });

  const handledata = (data) => {
    let existingData = JSON.parse(localStorage.getItem("Users")) || [];
    let userExists = existingData.some((user) => user.email === data.email);

    if (userExists) {
      alert("User already exists! Please login.");
      navigate("/login");
      return;
    }

    existingData.push(data);
    localStorage.setItem("Users", JSON.stringify(existingData));
    alert("Signup Successful!");
    navigate("/login");
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

          <h1 className="auth-title">Create your account</h1>
          {/* <p className="auth-subtitle">
            Let's get started with your 30 days free trial
          </p> */}

          <form className="auth-form" onSubmit={handleSubmit(handledata)}>
            <button type="button" className="social-login-button">
              <div className="google-icon">G</div>
              <span>Login with Google</span>
            </button>

            <div className="divider">or</div>

            <div className="form-field">
              <label htmlFor="name">Name*</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                {...register("name")}
              />
              {errors.name && (
                <span className="error-message">{errors.name.message}</span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="email">Email*</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="age">Age*</label>
              <input
                id="age"
                type="number"
                placeholder="Enter your age"
                {...register("age")}
              />
              {errors.age && (
                <span className="error-message">{errors.age.message}</span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="password">Password*</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && (
                <span className="error-message">{errors.password.message}</span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="Cpassword">Confirm Password*</label>
              <input
                id="Cpassword"
                type="password"
                placeholder="Confirm your password"
                {...register("Cpassword")}
              />
              {errors.Cpassword && (
                <span className="error-message">
                  {errors.Cpassword.message}
                </span>
              )}
            </div>

            <div className="checkbox-wrapper">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                I agree to all Term, Privacy Policy and Fees
              </label>
            </div>

            <button type="submit" className="auth-button">
              Sign Up
            </button>

            <div className="auth-link">
              Already have an account? <Link to="/login">Log in</Link>
            </div>
          </form>
        </div>
      </div>

      {/* Image Section */}
      <div
        className="auth-image-section"
        style={{ backgroundImage: `url(${signupImage})` }}
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

export default Signup;
//  <Nav.Link as={Link} to="/home">
//             Home
//           </Nav.Link>
