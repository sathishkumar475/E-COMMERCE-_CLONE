import React from "react";
import "./About.css";

const About = () => {
  return (
    <section className="about-section">
      <h2 className="about-title">About Our Store</h2>
      <p className="about-text">
        Welcome to our e-commerce store! We are passionate about offering
        high-quality products at affordable prices. Our mission is to make
        online shopping simple, safe, and enjoyable for everyone.
      </p>

      <br />
      <p className="about-text">
        We listen closely to our customers and use your feedback to improve our
        services every day. If something doesn’t meet your expectations, our
        support team is ready to help with quick responses and simple solutions.
        We believe that trust is built through transparency, reliability, and
        respectful communication
      </p>

      <p className="about-text">
        Our goal is for every customer to feel confident and happy with their
        purchase. Whether it’s your first order or your tenth, we want you to
        enjoy shopping with us and come back again. Your satisfaction is not
        just a target—it is the promise that guides everything we do.
      </p>
    </section>
  );
};

export default About;
