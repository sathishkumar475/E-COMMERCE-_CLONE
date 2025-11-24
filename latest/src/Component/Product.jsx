import {} from "react";
import { Outlet, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Product = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Product;
