import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Productdetails = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Product details</h2>
      <Button onClick={() => navigate("/checkout")}>Buy Now</Button>
    </div>
  );
};

export default Productdetails;
