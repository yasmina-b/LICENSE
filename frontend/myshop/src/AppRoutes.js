import React from "react";
import { Route, Routes } from "react-router-dom";
import AccountPage from "./pages/AccountPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductDetail from "./pages/ProductDetail";
import ProductsPage from "./pages/ProductsPage";
import RegisterPage from "./pages/RegisterPage";
import WishlistPage from "./pages/WishlistPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/cart" element={<CartPage />}></Route>
      <Route path="/details" element={<ProductDetail />}></Route>
      <Route path="/products/:subcategoryId" element={<ProductsPage />}></Route>
      <Route path="/wishlist" element={<WishlistPage />}></Route>
      <Route path="/account" element={<AccountPage />}></Route>
      <Route path="/checkout" element={<CheckoutPage />}></Route>
    </Routes>
  );
}

export default AppRoutes;
