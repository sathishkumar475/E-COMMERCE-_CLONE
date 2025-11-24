import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Checkout = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart || []);

  const { subtotal, itemCount } = useMemo(() => {
    const count = cartItems.length;
    const total = cartItems.reduce((acc, item) => acc + (Number(item.price) || 0), 0);
    return { subtotal: total, itemCount: count };
  }, [cartItems]);

  return (
    <div>
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart. <Link to="/product">Go to products</Link></p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
          <div>
            {cartItems.map((p) => (
              <Card key={p.id} style={{ marginBottom: "10px" }}>
                <Card.Body style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <img src={p.image} alt={p.title} width={60} height={80} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{p.title}</div>
                    <div>${p.price}</div>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
          <Card>
            <Card.Body>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Items</span>
                <span>{itemCount}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                <strong>Subtotal</strong>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>
              <Button style={{ marginTop: 16 }} onClick={() => navigate("/payment")}>Continue to Payment</Button>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Checkout;


