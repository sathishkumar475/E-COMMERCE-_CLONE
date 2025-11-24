import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { getOrderSummary } from "./api";
import "./OrderSummary.css";

const OrderSummary = ({ orderId }) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getOrderSummary(orderId);
        setSummary(data);
      } catch (error) {
        console.error("Failed to fetch order summary:", error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchSummary();
    }
  }, [orderId]);

  if (loading) {
    return <div>Loading order details...</div>;
  }

  if (!summary) {
    return <div>Failed to load order details</div>;
  }

  return (
    <Card className="order-summary-card">
      <Card.Header className="order-summary-header">
        <h5 className="mb-0">Order Summary</h5>
      </Card.Header>
      <Card.Body>
        <div className="customer-info">
          <h6>Customer Details</h6>
          <div className="info-row">
            <span className="label">Name:</span>
            <span className="value">{summary.customer?.name || "N/A"}</span>
          </div>
          {summary.customer?.email && (
            <div className="info-row">
              <span className="label">Email:</span>
              <span className="value">{summary.customer.email}</span>
            </div>
          )}
          {summary.customer?.upiId && (
            <div className="info-row">
              <span className="label">UPI ID:</span>
              <span className="value">{summary.customer.upiId}</span>
            </div>
          )}
        </div>

        <div className="order-info">
          <h6>Order Information</h6>
          <div className="info-row">
            <span className="label">Order ID:</span>
            <span className="value">{summary.orderId?.slice(-8)}</span>
          </div>
          <div className="info-row">
            <span className="label">Date:</span>
            <span className="value">
              {new Date(summary.orderDate).toLocaleString()}
            </span>
          </div>
          <div className="info-row">
            <span className="label">Status:</span>
            <span className={`status-badge status-${summary.status}`}>
              {summary.status?.toUpperCase()}
            </span>
          </div>
          <div className="info-row">
            <span className="label">Payment Method:</span>
            <span className="value">{summary.paymentMethod?.toUpperCase()}</span>
          </div>
        </div>

        <div className="products-section">
          <h6>Products ({summary.itemCount})</h6>
          <div className="products-list">
            {summary.items?.map((item, index) => (
              <div key={index} className="product-item">
                <div className="product-image">
                  {item.image ? (
                    <img src={item.image} alt={item.title} />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                </div>
                <div className="product-details">
                  <div className="product-title">{item.title}</div>
                  <div className="product-meta">
                    <span>Qty: {item.qty || 1}</span>
                    <span className="product-price">₹{item.price?.toFixed(2) || "0.00"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="total-section">
          <div className="total-row">
            <span className="total-label">Total Amount:</span>
            <span className="total-value">₹{summary.total?.toFixed(2) || "0.00"}</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default OrderSummary;

