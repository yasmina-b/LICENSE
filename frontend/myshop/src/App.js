import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPage from "./admin/pages/AdminPage";
import Accountbar from "./components/Accountbar";
import Footer from "./components/Footer";
import Promo from "./components/Promo";
import Shopbar from "./components/Shopbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthContext from "./context/AuthContext";
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
import AdminCategories from "./admin/pages/AdminCategories";
import AdminProducts from "./admin/pages/AdminProducts";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";

function App() {
  const { user } = React.useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Promo />
              <Accountbar />
              <Shopbar />
              <HomePage />
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Promo />
              <Accountbar />
              <Shopbar />
              <LoginPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Promo />
              <Accountbar />
              <Shopbar />
              <RegisterPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/cart/:cartId"
          element={
            <>
              <Promo />
              <Accountbar />
              <Shopbar />
              <CartPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/productVariants/:productId"
          element={
            <>
              <Promo />
              <Accountbar />
              <Shopbar />
              <ProductDetail />
              <Footer />
            </>
          }
        />
        <Route
          path="/products/:subcategoryId"
          element={
            <>
              <Promo />
              <Accountbar />
              <Shopbar />
              <ProductsPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/productsCategory/:categoryId"
          element={
            <>
              <Promo />
              <Accountbar />
              <Shopbar />
              <ProductsCategoryPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/confirmation"
          element={
            <>
              <Promo />
              <Accountbar />
              <Shopbar />
              <OrderConfirmationPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/account"
          element={
            <>
              <Promo />
              <Accountbar />
              <Shopbar />
              <AccountPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <>
              <Promo />
              <Accountbar />
              <Shopbar />
              <CheckoutPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user} requiredRole="admin">
              <AdminPage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute user={user} requiredRole="admin">
              <AdminCategories />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute user={user} requiredRole="admin">
              <AdminProducts />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
