import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import CategoriesTabel from "../components/CategoriesTabel";
import Sidebar from "../components/Sidebar";
import Widget from "../components/Widget";

const AdminCategories = () => {
  return (
    <React.Fragment>
      <AdminNavbar />
      <Sidebar />
      <div className="widgets-position">
        <div className="widgets">
          <Widget type="categories" />
          <Widget type="subcategories" />
        </div>
      </div>
      <CategoriesTabel />
    </React.Fragment>
  );
};

export default AdminCategories;
