import React from "react";
import "../styles/AdminNavbar.css";

const AdminNavbar = () => {
  const logout = () => {
    localStorage.removeItem("user");
  };
  return (
    <React.Fragment>
      <nav className="navbar">
        <div className="admin-logo">MINIMALIST STUDIO ADMIN PAGE</div>
        <div className="navbar-items">
          <li className="navbar-item">
            <a className="navbar-item-style" href="/">
              GO BACK TO SHOP
            </a>
          </li>
          <li className="navbar-item">
            <a className="navbar-item-style" href="/" onClick={logout}>
              LOG OUT
            </a>
          </li>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default AdminNavbar;
