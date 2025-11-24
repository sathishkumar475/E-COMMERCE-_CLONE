import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import OrderSummary from "./OrderSummary";
import "./PaymentQR.css";

const PaymentQR = ({
  orderDetails,
  upiId,
  customerName,
  onPaymentComplete,
}) => {
  const [showQR, setShowQR] = useState(false);

  // Generate UPI payment string
  const generateUPIString = () => {
    const total = orderDetails?.total || 0;
    const merchantName = "My Store";
    const transactionId = orderDetails?._id || `TXN${Date.now()}`;

    // UPI payment URI format
    const upiString = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
      customerName || "Customer"
    )}&am=${total.toFixed(2)}&cu=INR&tn=${encodeURIComponent(
      `Payment for Order ${transactionId}`
    )}`;
    return upiString;
  };

  const upiPaymentString = generateUPIString();

  return (
    <div className="payment-qr-container">
      <Button
        variant="outline-primary"
        size="sm"
        onClick={() => setShowQR(!showQR)}
        className="qr-toggle-btn"
      >
        {showQR ? "Hide QR Code" : "Show Payment QR Code"}
      </Button>

      {showQR && (
        <Card className="qr-card">
          <Card.Header className="qr-header">
            <h6 className="mb-0">Scan to Pay</h6>
            <button
              type="button"
              className="close-btn"
              onClick={() => setShowQR(false)}
              aria-label="Close"
            >
              ✕
            </button>
          </Card.Header>
          <Card.Body className="qr-body">
            <div className="qr-code-wrapper">
              <QRCodeSVG
                value={upiPaymentString}
                size={250}
                level="H"
                includeMargin={true}
                className="qr-code"
              />
            </div>

            <div className="payment-details">
              <div className="detail-row">
                <span className="label">Amount:</span>
                <span className="value">
                  ₹{orderDetails?.total?.toFixed(2) || "0.00"}
                </span>
              </div>
              <div className="detail-row">
                <span className="label">Order ID:</span>
                <span className="value">
                  {orderDetails?._id?.slice(-8) || "N/A"}
                </span>
              </div>
              <div className="detail-row">
                <span className="label">Merchant:</span>
                <span className="value">My Store</span>
              </div>
            </div>

            <div className="instructions">
              <p>
                <strong>Instructions:</strong>
              </p>
              <ol>
                <li>Open your UPI app (GPay, PhonePe, Paytm, etc.)</li>
                <li>Scan this QR code</li>
                <li>Verify the amount and confirm payment</li>
                <li>Click "Payment Done" after completing the transaction</li>
              </ol>
            </div>

            <Button
              variant="success"
              className="payment-done-btn"
              onClick={onPaymentComplete}
            >
              Payment Done
            </Button>
          </Card.Body>
        </Card>
      )}

      {orderDetails?._id && <OrderSummary orderId={orderDetails._id} />}
    </div>
  );
};

export default PaymentQR;
