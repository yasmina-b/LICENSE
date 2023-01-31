import React from "react";
import "../styles/Navbar.css";
import { Menu, ShoppingBag } from "react-feather";

const Navbar = () => {
  return (
    <React.Fragment>
      <nav className="navbar">
        <Menu className="menu-bar"></Menu>
        <div className="logo">MINIMALIST STUDIO</div>
        <div className="navbar-items">
          <li className="navbar-item">
            <a className="navbar-item-style" href="/">
              LOG IN
            </a>
          </li>
          <li className="navbar-item">
            <ShoppingBag className="shopping-bag-style"></ShoppingBag>
          </li>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
