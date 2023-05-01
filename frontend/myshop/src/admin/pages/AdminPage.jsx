import React, { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import Sidebar from "../components/Sidebar";
import UsersTabel from "../components/UsersTabel";
import Widget from "../components/Widget";
import OrdersTabel from "../components/OrdersTabel";

const AdminPage = () => {
  const [selectedWidget, setSelectedWidget] = useState("order");

  const handleWidgetClick = (widgetType) => {
    setSelectedWidget(widgetType);
  };

  return (
    <React.Fragment>
      <AdminNavbar />
      <Sidebar />
      <div className="widgets-position">
        <div className="widgets">
          <Widget type="user" handleClick={() => handleWidgetClick("user")} />
          <Widget type="order" handleClick={() => handleWidgetClick("order")} />
          <Widget type="earning" />
        </div>
      </div>
      {selectedWidget === "user" && <UsersTabel />}
      {selectedWidget === "order" && <OrdersTabel />}
    </React.Fragment>
  );
};

export default AdminPage;
