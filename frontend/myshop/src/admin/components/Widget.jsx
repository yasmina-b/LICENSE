import "../styles/Widget.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import AuthContext from "../../context/AuthContext";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";

const Widget = ({ type, handleClick }) => {
  const { user } = React.useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [earnings, setEarnings] = useState("");
  const [products, setProducts] = useState([]);

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

  useEffect(() => {
    const getOrders = async () => {
      try {
        if (user?.token) {
          const response = await axios.get("http://localhost:3001/orders", {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          setOrders(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getOrders();
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

  const getProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/products`);
      setProducts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getEarnings = async () => {
    try {
      if (user?.token) {
        const response = await axios.get("http://localhost:3001/earnings", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setEarnings(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCategories();
    getSubcategories();
    getEarnings();
    getProducts();
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
        amount: orders.length,
        icon: <ShoppingCartOutlinedIcon className="widget-icon" />,
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        amount: earnings,
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
      case "products":
        data = {
          title: "PRODUCTS",
          amount: products.length,
          icon: <ClassOutlinedIcon className="widget-icon" />,
        };
        break;
    default:
      break;
  }

  return (
    <div className="widget" onClick={handleClick}>
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
