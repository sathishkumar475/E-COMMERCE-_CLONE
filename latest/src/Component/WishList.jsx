import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { GrTrash } from "react-icons/gr";
import { removeItem } from "../store/cardSlice";
import { useNavigate } from "react-router-dom";

const WishList = () => {
  const cardproduct = useSelector((state) => {
    return state.cart;
  });
  const navigate = useNavigate();

  let dispatch = useDispatch();

  let handledelete = (removeItemid) => {
    dispatch(removeItem(removeItemid));
  };
  return (
    <div>
      {cardproduct.length !== 0 ? (
        <section className=" products">
          <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
            <Button onClick={() => navigate("/checkout")}>Proceed to Checkout</Button>
          </div>
          {cardproduct.map((product) => (
            <Card
              key={product.id}
              style={{ width: "18rem" }}
              className="product"
            >
              <center>
                <Card.Img
                  variant="top"
                  src={product.image}
                  style={{ width: "9rem", height: "12rem" }}
                />
              </center>

              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text style={{ textAlign: "center" }}>
                  ${product.price}
                </Card.Text>
              </Card.Body>

              <Card.Footer
                style={{
                  display: "flex",
                  justifyContent: "center",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="danger"
                  onClick={() => {
                    handledelete(product.id);
                  }}
                >
                  <GrTrash />
                </Button>
              </Card.Footer>
            </Card>
          ))}
        </section>
      ) : (
        <h1>Please purchas something</h1>
      )}
    </div>
  );
};

export default WishList;
