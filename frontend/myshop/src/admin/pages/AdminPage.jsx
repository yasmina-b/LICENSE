import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import Sidebar from "../components/Sidebar";
import UsersTabel from "../components/UsersTabel";
import Widget from "../components/Widget";

const AdminPage = () => {
  return (
    <React.Fragment>
      <AdminNavbar />
      <Sidebar />
      <div className="widgets-position">
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
        </div>
      </div>
      <UsersTabel />
    </React.Fragment>
  );
};

export default AdminPage;
