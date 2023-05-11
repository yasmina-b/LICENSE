import "../styles/Widget.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import AuthContext from "../../context/AuthContext";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";

const Widget = ({ type, handleClick, className }) => {
  const { user } = React.useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [earnings, setEarnings] = useState("");
  const [mostBought, setMostBought] = useState("");
  const [products, setProducts] = useState([]);
  const [productsWomen, setProductsWomen] = useState("");
  const [productsMen, setProductsMen] = useState("");

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

  const getMostBoughtProduct = async () => {
    try {
      if (user?.token) {
        const response = await axios.get("http://localhost:3001/mostBought", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setMostBought(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getProductsWomen = async () => {
    try {
      const response = await axios.get("http://localhost:3001/productsW");
      setProductsWomen(response.data.totalWomenProducts);
    } catch (err) {
      console.error(err);
    }
  };

  const getProducstMen = async () => {
    try {
      const response = await axios.get("http://localhost:3001/productsM");
      setProductsMen(response.data.totalMenProducts);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCategories();
    getSubcategories();
    getEarnings();
    getProducts();
    getMostBoughtProduct();
    getProducstMen();
    getProductsWomen();
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
    case "mostBought":
      data = {
        title2: "MOST BOUGHT PRODUCT",
        name: mostBought.product ? mostBought.product.name : "",
        size: mostBought.productAttributeValues
          ? mostBought.productAttributeValues.map((value) => value.value)
          : [],
      };
      break;
    case "womenProducts":
      data = {
        title: "PRODUCTS WOMEN",
        amount: productsWomen,
        link: "See all women's products",
      };
      break;
    case "menProducts":
      data = {
        title: "PRODUCTS MEN",
        amount: productsMen,
        link: "See all men's products",
      };
      break;
    default:
      break;
  }

  return (
    <div className={`widget ${className}`} onClick={handleClick}>
      <div className="widget-left">
        <span className="widget-title">{data.title}</span>
        <span className="widget-title-product">{data.title2}</span>
        <span className="widget-product">
          {data.name} {data.size}
        </span>
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
