import React, { useState } from "react";
import "../styles/Sidebar.css";
import AddAttributeValues from "./AddAttributeValue";
import AddCategory from "./AddCategory";
import AddProduct from "./AddProduct";
import AddProductAttribute from "./AddProductAttribute";
import AddSubcategory from "./AddSubcategory";
import AddVariant from "./AddVariant";

export default function Sidebar() {
  const [activeTitle, setActiveTitle] = useState(null);

  const handleTitleClick = (e, title) => {
    e.preventDefault();
    setActiveTitle(title);
  };
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle-first">MENU</h3>
          <ul className="sidebarList">
            <li
              className={
                activeTitle === "users" ? "sidebarTitle active" : "sidebarTitle"
              }
              onClick={() => handleTitleClick("users")}
            >
              <a href="/admin">USERS & USER ORDERS</a>
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <a href="/admin/categories">
            <h3 className="sidebarTitle">CATEGORIES & SUBCATEGORIES</h3>
          </a>
          <ul className="sidebarList">
            <li>
              <AddCategory />
            </li>
            <li>
              <AddSubcategory />
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <a href="/admin/products">
            <h3 className="sidebarTitle">PRODUCTS & PRODUCT CONFIGURATION</h3>
          </a>
          <ul className="sidebarList">
            <li>
              <AddProduct />
            </li>
            <li>
              <AddVariant />
            </li>
            <li>
              <AddProductAttribute />
            </li>
            <li>
              <AddAttributeValues />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
