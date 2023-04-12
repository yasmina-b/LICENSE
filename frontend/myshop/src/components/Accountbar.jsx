import React, { useState, useEffect } from "react";
import { ShoppingBag, User } from "react-feather";
import AuthContext from "../context/AuthContext";
import "../styles/Accountbar.css";
import "../styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Accountbar = () => {
  const { user } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const cartId = user.user.cart.id;

  const [cartEntries, setCartEntries] = useState([]);

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
            <a className="navbar-item-style" href="/login">
              LOG IN
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
