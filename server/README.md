E-commerce API (Node.js + MongoDB)

Setup

1. Create .env in server/:

MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
JWT_SECRET=replace_me
PORT=5001

2. Install and run:

cd server
npm install
npm run dev

API at http://localhost:5001

Endpoints
- POST /api/auth/register { email, password, name }
- POST /api/auth/login { email, password }
- POST /api/orders { userId?, items, total, paymentMethod, customerName, customerEmail, upiId }
- GET /api/orders { userId?, status } (query params)
- GET /api/orders/:id
- GET /api/orders/:id/summary
- POST /api/orders/:id/pay

Note: Payment is mocked; integrate a gateway (Razorpay/Stripe) for production.

