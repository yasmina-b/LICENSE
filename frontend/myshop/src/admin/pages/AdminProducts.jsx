import React, { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import Sidebar from "../components/Sidebar";
import WomenProductsTabel from "../components/WomenProductsTabel";
import Widget from "../components/Widget";
import MenProductsTabel from "../components/MenProductsTabel";

const AdminProducts = () => {
  const [selectedWidget, setSelectedWidget] = useState("womenProducts");

  const handleWidgetClick = (widgetType) => {
    setSelectedWidget(widgetType);
  };
  return (
    <React.Fragment>
      <AdminNavbar />
      <Sidebar />
      <div className="widgets-position">
        <div className="widgets">
          <Widget type="products" />
          <Widget
            type="womenProducts"
            handleClick={() => handleWidgetClick("womenProducts")}
          />
          <Widget
            type="menProducts"
            handleClick={() => handleWidgetClick("menProducts")}
          />
        </div>
      </div>
      {selectedWidget === "womenProducts" && <WomenProductsTabel />}
      {selectedWidget === "menProducts" && <MenProductsTabel />}
    </React.Fragment>
  );
};

export default AdminProducts;
