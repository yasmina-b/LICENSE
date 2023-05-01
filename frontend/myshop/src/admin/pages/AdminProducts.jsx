import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import Sidebar from "../components/Sidebar";
import ProductsTabel from "../components/ProductsTabel";
import Widget from "../components/Widget";

const AdminProducts = () => {
  return (
    <React.Fragment>
      <AdminNavbar />
      <Sidebar />
      <div className="widgets-position">
        <div className="widgets">
          <Widget type="products" />
        </div>
      </div>
      <ProductsTabel />
    </React.Fragment>
  );
};

export default AdminProducts;
