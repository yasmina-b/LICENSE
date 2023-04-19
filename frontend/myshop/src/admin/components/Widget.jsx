import "../styles/Widget.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import AuthContext from "../../context/AuthContext";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";

const Widget = ({ type }) => {
  const { user } = React.useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        if (user?.token) {
          const response = await axios.get(
            "http://localhost:3001/admin/users",
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setUsers(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getUsers();
  }, [user]);

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/categories");
      setCategories(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getSubcategories = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/subcategories`);
      setSubcategories(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCategories();
    getSubcategories();
  }, []);

  let data;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        link: "See all users",
        amount: users.length,
        icon: <PersonOutlinedIcon className="widget-icon" />,
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        link: "View all orders",
        amount: 200,
        icon: <ShoppingCartOutlinedIcon className="widget-icon" />,
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        icon: <MonetizationOnOutlinedIcon className="widget-icon" />,
      };
      break;
    case "categories":
      data = {
        title: "CATEGORIES",
        amount: categories.length,
        icon: <CategoryOutlinedIcon className="widget-icon" />,
      };
      break;
    case "subcategories":
      data = {
        title: "SUBCATEGORIES",
        amount: subcategories.length,
        icon: <ClassOutlinedIcon className="widget-icon" />,
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="widget-left">
        <span className="widget-title">{data.title}</span>
        <span className="widget-counter">
          {data.isMoney && "RON"} {data.amount}
        </span>
        <span className="widget-link">{data.link}</span>
      </div>
      <div className="widget-right">
        <div className="widget-icon">{data.icon}</div>
      </div>
    </div>
  );
};

export default Widget;
