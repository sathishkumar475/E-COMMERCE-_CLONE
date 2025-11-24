import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import { createOrder, markOrderPaid } from "./api";
import UPIScanner from "./UPIScanner";
import PaymentQR from "./PaymentQR";

const schema = yup.object({
  upiId: yup
    .string()
    .required("UPI ID is required")
    .matches(/^[\w.\-]+@[\w.\-]+$/, "Enter valid UPI ID (e.g., user@bank)"),
  name: yup.string().required("Name is required"),
});

const UPIForm = () => {
  const cartItems = useSelector((state) => state.cart || []);
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(schema) });
  const [orderDetails, setOrderDetails] = useState(null);
  const [paymentMode, setPaymentMode] = useState("form"); // "form" or "qr"
  
  const upiId = watch("upiId");

  const handleScanSuccess = (upiId) => {
    setValue("upiId", upiId, { shouldValidate: true });
  };

  const onSubmit = async (values) => {
    const total = cartItems.reduce((acc, i) => acc + (Number(i.price) || 0), 0);
    const order = await createOrder({ 
      items: cartItems, 
      total, 
      paymentMethod: "upi",
      customerName: values.name,
      upiId: values.upiId
    });
    setOrderDetails(order);
    setPaymentMode("qr");
  };

  const handlePaymentComplete = async () => {
    if (orderDetails?._id) {
      await markOrderPaid(orderDetails._id);
      alert(`Payment successful! Order ID: ${orderDetails._id}`);
      setOrderDetails(null);
      setPaymentMode("form");
    }
  };

  if (paymentMode === "qr" && orderDetails) {
    return (
      <div style={{ maxWidth: 420 }}>
        <PaymentQR
          orderDetails={orderDetails}
          upiId={upiId}
          customerName={watch("name")}
          onPaymentComplete={handlePaymentComplete}
        />
        <Button
          variant="outline-secondary"
          onClick={() => {
            setPaymentMode("form");
            setOrderDetails(null);
          }}
          style={{ width: "100%", marginTop: "10px" }}
        >
          Back to Form
        </Button>
      </div>
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 420 }}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control {...register("name")} placeholder="Full name" />
        {errors.name && <div style={{ color: "red" }}>{errors.name.message}</div>}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>UPI ID</Form.Label>
        <UPIScanner onScanSuccess={handleScanSuccess} />
        <Form.Control {...register("upiId")} placeholder="user@bank or scan QR code" />
        {errors.upiId && <div style={{ color: "red" }}>{errors.upiId.message}</div>}
      </Form.Group>
      <Button type="submit" disabled={isSubmitting} style={{ width: "100%", marginTop: "10px" }}>
        {isSubmitting ? "Processing..." : "Proceed to Payment"}
      </Button>
    </Form>
  );
};

export default UPIForm;


