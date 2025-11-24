import Home from "./Component/Home";
import Todoapp from "./Component/Todoapp";
import Login from "./Component/Login";
import Signup from "./Component/Signup";
import Product from "./Component/Product";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Productlist from "./Component/Productlist";
import Productdetails from "./Component/Productdetails";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./Component/NavBar";
import NotFound from "./Component/NotFound";
import Newproduct from "./Component/Newproduct";
import Updateproduct from "./Component/Updateproduct";
import WishList from "./Component/WishList";
import Layout from "./Component/Layout";
import { SearchProvider } from "./Component/SearchContext";
import { AuthProvider } from "./Component/AuthContext";
import Checkout from "./Component/Checkout";
import Payment from "./Component/Payment";
// import About from "./Component/About";

// localStorage.setItem("cart ", JSON.stringify([{ id: 1 }]));
// let Webstore = JSON.parse(localStorage.getItem("cart"));

if (!localStorage.getItem("cart")) {
  localStorage.setItem("cart", JSON.stringify([]));
}

// localStorage.removeItem("cart");
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <AuthProvider>
          <SearchProvider>
            <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route element={<Layout />}>
              <Route path="/todoapp" element={<Todoapp />} />
              <Route path="/product" element={<Product />}>
                <Route index element={<Productlist />} />
                <Route path="list" element={<Productlist />} />
                <Route path="details" element={<Productdetails />} />
              </Route>
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/newproduct" element={<Newproduct />} />
              <Route path="/update/:id" element={<Updateproduct />} />
              <Route path="/wishlist" element={<WishList />} />
            </Route>
            <Route path="*" element={<NotFound />} />
            {/* <Route path="/about" element={<About/>}/> */}
          </Routes>
          </SearchProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
