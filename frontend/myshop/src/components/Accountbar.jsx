import React from "react";
import { ShoppingBag, User } from "react-feather";
import "../styles/Accountbar.css";
import "../styles/Navbar.css";

const Accountbar = () => {
  return (
    <React.Fragment>
      <nav className="accountbar">
        <div className="navbar-items">
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
            <a href="/cart">
              <ShoppingBag className="shopping-bag-style"></ShoppingBag>
              <span className="shopping-bag-item">0</span>
            </a>
          </li>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Accountbar;
