import { Tabs, Tab } from "react-bootstrap";
import UPIForm from "./UPIForm";
import CardForm from "./CardForm";

const Payment = () => {
  return (
    <div>
      <h2>Payment</h2>
      <Tabs defaultActiveKey="upi" id="payment-tabs" className="mb-3">
        <Tab eventKey="upi" title="UPI">
          <UPIForm />
        </Tab>
        <Tab eventKey="card" title="Card">
          <CardForm />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Payment;
