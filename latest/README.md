# E-Shop – MERN E-Commerce App

E-Shop is a simple **MERN** (MongoDB, Express, React, Node) e-commerce application.

Frontend:

- React + Vite
- React Router, Redux Toolkit, Context API
- Axios, Bootstrap

Backend:

- Node.js + Express
- MongoDB (with Mongoose models)
- Auth & Order APIs

The app supports **CRUD operations on products and orders**, user authentication,
cart & wishlist, and a basic checkout + payment UI.

---

## ✨ Features

- Browse all products with search and filters
- View product details
- Cart and wishlist management
- User signup / login
- Checkout & order placement
- Basic payment UI (UPI, Card, QR)
- Admin-style product CRUD (Create / Read / Update / Delete)
- Protected routes on backend for authenticated users

---

## 🧱 Tech Stack

**Frontend**

- React, Vite
- React Router
- Redux Toolkit
- React Context API
- Axios
- Bootstrap, custom CSS

**Backend**

- Node.js
- Express.js
- MongoDB + Mongoose
- dotenv for environment variables

---

## 🔄 Frontend Architecture (Short)

- **Routing (React Router)**

  - Pages: `Home`, `ProductList`, `Productdetails`, `Newproduct`, `Updateproduct`,
    `WishList`, `Checkout`, `Payment`, `Login`, `Signup`, `UserProfile`,
    `About`, `NotFound`, wrapped by `Layout` + `NavBar`.

- **State Management (Redux Toolkit + Context API)**

  - `store.js`, `cartSlice.js` manage cart, wishlist, totals and some product data.
  - `AuthContext.jsx` handles logged-in user and auth actions.
  - `SearchContext.jsx` shares search text/filter between `NavBar` and product list.

- **Utilities**
  - `api.js` – Axios instance with base URL and interceptors.
  - `useFetch.jsx` – custom hook that returns `{ data, loading, error }` for API calls.

---

## 🖥 Backend Architecture

(Refers to your backend diagram.)

### 1. Express Application

- Entry file (for example `server.js` or `index.js`).
- Creates the Express app, applies middlewares (`express.json()`, CORS, etc.),
  connects to MongoDB, and mounts all routes.

2. Config

MongoDB Connection

A separate module (e.g. config/db.js) that connects to MongoDB using Mongoose.

Called from the main Express file during startup.

Environment Variables

Using dotenv to load values from .env:

MONGODB_URI

PORT

JWT_SECRET

Models

User Model

Defines user schema (name, email, password hash, role, etc.).

Used by Auth routes to register/login users.

Passwords are usually hashed (e.g. with bcrypt).

Order Model

Stores each order: user reference, products, quantities, total price, status, timestamps.

Used by Order routes for CRUD on orders. 4. Routes

Auth Routes (/api/auth)

POST /register – create a new user in User model.

POST /login – check credentials, return JWT token.

(Optionally) GET /me – return current user from token.

Order Routes (/api/orders)

Protected using middleware that verifies JWT.

POST / – create a new order for the logged-in user.

GET / – get all orders for the user (or all orders for admin).

GET /:id – get single order.

PUT /:id – update order status or items.

DELETE /:id – delete/cancel order.

📁 Example Folder Structure

> This is a simplified view – adjust to match your actual structure.
front-end Folder Structure
```bash
src/
  components/
    NavBar.jsx
    UPIForm.jsx
    CardForm.jsx
    PaymentQR.jsx
    OrderSummary.jsx
  pages/
    Home.jsx
    ProductList.jsx
    Product.jsx
    Productdetails.jsx
    Newproduct.jsx
    Updateproduct.jsx
    WishList.jsx
    Checkout.jsx
    Payment.jsx
    Login.jsx
    Signup.jsx
    UserProfile.jsx
    About.jsx
    NotFound.jsx
    Layout.jsx
  context/
    AuthContext.jsx
    SearchContext.jsx
  store/
    store.js
    cartSlice.js
  utils/
    api.js
    useFetch.jsx
  main.jsx
  App.jsx
vite.config.js

Backend Folder Structure
backend/
config/
db.js
models/
User.js
Order.js
routes/
authRoutes.js
orderRoutes.js
middleware/
authMiddleware.js
server.js
.env
