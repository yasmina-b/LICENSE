import React, { useState } from "react";
import "../styles/Navbar.css";
import { Menu, ShoppingBag } from "react-feather";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <React.Fragment>
      <nav className="navbar">
        <Menu className="menu-bar" onClick={() => setOpen(!isOpen)}></Menu>
        <a href="/">
          <div className="logo">MINIMALIST STUDIO</div>
        </a>
        <div className="navbar-items">
          <li className="navbar-item">
            <a className="navbar-item-style" href="/login">
              LOG IN
            </a>
          </li>
          <li className="navbar-item">
            <a href="/cart">
              <ShoppingBag className="shopping-bag-style"></ShoppingBag>
            </a>
          </li>
        </div>
      </nav>
      {isOpen && (
        <div className="sidebar">
          <div className="sidebar-categories">
            <div className="sidebar-categories-list">WOMEN</div>
            <div className="sidebar-categories-list">MEN</div>
          </div>
          <div className="sidebar-categories-items-container">
            <div className="sidebar-categories-items">NEW</div>
            <div className="sidebar-categories-items">BESTSELLER</div>
            <div className="sidebar-categories-items">COATS</div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Navbar;
