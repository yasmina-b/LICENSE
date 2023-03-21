import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Accountbar from "./components/Accountbar";
import Footer from "./components/Footer";
import Promo from "./components/Promo";
import Shopbar from "./components/Shopbar";
import "./index.css";
import AccountPage from "./pages/AccountPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductDetail from "./pages/ProductDetail";
import ProductsCategoryPage from "./pages/ProductsCategoryPage";
import ProductsPage from "./pages/ProductsPage";
import RegisterPage from "./pages/RegisterPage";
import WishlistPage from "./pages/WishlistPage";

function App() {
  return (
    <Router>
      <Promo />
      <Accountbar />
      <Shopbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/productVariants/:productId" element={<ProductDetail />}></Route>
        <Route
          path="/products/:subcategoryId"
          element={<ProductsPage />}
        ></Route>
        <Route
          path="/productsCategory/:categoryId"
          element={<ProductsCategoryPage />}
        ></Route>
        <Route path="/wishlist" element={<WishlistPage />}></Route>
        <Route path="/account" element={<AccountPage />}></Route>
        <Route path="/checkout" element={<CheckoutPage />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
