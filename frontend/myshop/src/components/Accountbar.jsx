import React, { useState, useEffect } from "react";
import { ShoppingBag, User } from "react-feather";
import AuthContext from "../context/AuthContext";
import "../styles/Accountbar.css";
import "../styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { Camera } from "react-feather";

const Accountbar = () => {
  const { user } = React.useContext(AuthContext);
  const navigate = useNavigate();

  let cartId = null;
  if (user && user.user && user.user.cart) {
    cartId = user.user.cart.id;
  }

  const [cartEntries, setCartEntries] = useState([]);

  const logout = () => {
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    setCartEntries(cartItems);
  }, []);

  return (
    <React.Fragment>
      <nav className="accountbar">
        <div className="navbar-items">
          {user && user.user.isAdmin ? (
            <li className="navbar-item">
              <Link className="navbar-item-style" to="/admin">
                ADMIN
              </Link>
            </li>
          ) : (
            ""
          )}
          <li className="navbar-item">
            {user && user ? (
              <a className="navbar-item-style" href="/" onClick={logout}>
                LOG OUT
              </a>
            ) : (
              <a className="navbar-item-style" href="/login">
                LOG IN
              </a>
            )}
          </li>

          <li className="navbar-item">
            <a href="/searchByImage">
              <Camera />
            </a>
          </li>

          <li className="navbar-item">
            <a href="/account">
              <User></User>
            </a>
          </li>
         
          <li className="navbar-item">
            <ShoppingBag
              className="shopping-bag-style"
              onClick={() => navigate(`/cart/${cartId}`)}
            ></ShoppingBag>
            {/* <span className="shopping-bag-item">{ cartEntries && cartEntries.length}</span> */}
          </li>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Accountbar;
