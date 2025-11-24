import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import { createOrder, markOrderPaid } from "./api";

const schema = yup.object({
  name: yup.string().required("Name on card is required"),
  cardNumber: yup
    .string()
    .required("Card number is required")
    .matches(/^\d{16}$/, "Enter 16 digit card number"),
  expiry: yup
    .string()
    .required("Expiry is required")
    .matches(/^(0[1-9]|1[0-2])\/(\d{2})$/, "Use MM/YY format"),
  cvv: yup.string().required("CVV is required").matches(/^\d{3}$/, "3 digits"),
});

const CardForm = () => {
  const cartItems = useSelector((state) => state.cart || []);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (values) => {
    const total = cartItems.reduce((acc, i) => acc + (Number(i.price) || 0), 0);
    const order = await createOrder({ items: cartItems, total, paymentMethod: "card" });
    await markOrderPaid(order._id);
    alert(`Card payment success for ${values.name}`);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 420 }}>
      <Form.Group className="mb-3">
        <Form.Label>Name on card</Form.Label>
        <Form.Control {...register("name")} placeholder="Full name" />
        {errors.name && <div style={{ color: "red" }}>{errors.name.message}</div>}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Card number</Form.Label>
        <Form.Control {...register("cardNumber")} placeholder="1111222233334444" inputMode="numeric" />
        {errors.cardNumber && <div style={{ color: "red" }}>{errors.cardNumber.message}</div>}
      </Form.Group>
      <div style={{ display: "flex", gap: 12 }}>
        <Form.Group className="mb-3" style={{ flex: 1 }}>
          <Form.Label>Expiry</Form.Label>
          <Form.Control {...register("expiry")} placeholder="MM/YY" />
          {errors.expiry && <div style={{ color: "red" }}>{errors.expiry.message}</div>}
        </Form.Group>
        <Form.Group className="mb-3" style={{ width: 120 }}>
          <Form.Label>CVV</Form.Label>
          <Form.Control {...register("cvv")} placeholder="123" inputMode="numeric" />
          {errors.cvv && <div style={{ color: "red" }}>{errors.cvv.message}</div>}
        </Form.Group>
      </div>
      <Button type="submit" disabled={isSubmitting}>Pay with Card</Button>
    </Form>
  );
};

export default CardForm;


