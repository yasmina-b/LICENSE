import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Account.css";
import TextField from "@mui/material/TextField";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ProductsPromo from "../components/ProductsPromo";

const AccountPage = () => {
  const [showOrders, setShowOrders] = useState(true);
  const [showAccount, setShowAccount] = useState(true);
  const [showBoughtProducts, setShowBoughtProducts] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [orders, setOrders] = useState([]);
  const { user } = React.useContext(AuthContext);

  const userId = user.user.id;
  const navigate = useNavigate();

  const getUserOrders = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/orders/${userId}`);
      setOrders(res.data);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  const updateAccountInfo = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/user/${userId}`, {
        firstName,
        lastName,
        phoneNumber,
      });
      alert("account updates succesffuly");
    } catch (err) {
      console.error(err);
    }
  };

  const handleOrdersClick = () => {
    setShowOrders(true);
    setShowAccount(false);
    setShowBoughtProducts(false);
  };

  const handleAccountClick = () => {
    setShowOrders(false);
    setShowAccount(true);
    setShowBoughtProducts(false);
  };

  const handleBoughtProducts = () => {
    setShowOrders(false);
    setShowAccount(false);
    setShowBoughtProducts(true);
  };

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <React.Fragment>
      <ProductsPromo />
      <h1 className="accountpage-title">HELLO, {user.user.firstName}</h1>
      {/* <h3 className="accountpage-subtitle">HELLO, {user.user.firstName}</h3> */}
      <div className="accountpage">
        <div className="accountpage-left">
          <div className="accountpage-menu">
            {/* <h3 onClick={handleAccountClick}>ACCOUNT INFO</h3> */}
            <h3 onClick={handleOrdersClick}>MY ORDERS</h3>
            <h3 onClick={handleBoughtProducts}>BOUGHT PRODUCTS</h3>
          </div>
        </div>
        {/* {showAccount ? (
          <div className="accountpage-right">
            <div className="accountpage-info">
              <TextField
                sx={{ width: 500 }}
                id="standard-basic"
                label={user.user.firstName}
                variant="standard"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="accountpage-info">
              <TextField
                sx={{ width: 500 }}
                id="standard-basic"
                label={user.user.lastName}
                variant="standard"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="accountpage-info">
              <TextField
                sx={{ width: 500 }}
                id="standard-basic"
                label={user.user.phoneNumber}
                variant="standard"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="accountpage-info">
              <button onClick={updateAccountInfo}>UPDATE MY INFO</button>
            </div>
          </div>
        ) : null} */}
        {showOrders ? (
          <div className="accountpage-right">
            {/* <h3 className="accountpage-order-title">PREVIOUS ORDERS</h3> */}
            <table className="myorders-table">
              <tbody>
                <tr>
                  <td className="order-table-row">Number</td>
                  <td className="order-table-row">Order date</td>
                  <td className="order-table-row">Total</td>
                </tr>
                {orders &&
                  orders.map((order, index) => (
                    <tr key={order.id}>
                      <td className="order-table-row">{index + 1}</td>
                      <td className="order-table-row">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </td>
                      <td className="order-table-row">
                        {" "}
                        RON {order.totalOrderSum}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : null}
        {showBoughtProducts ? (
          <div className="accountpage-right">
            {orders &&
              orders.map((order) => (
                <div key={order.id}>
                  <h2 className="order-date">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </h2>
                  <hr></hr>
                  <table className="myorders-table-products">
                    <tbody>
                      {order.cartEntries.map((entry, i) => (
                        <tr key={entry.id}>
                          <td>
                            {entry.productVariant && (
                              <img
                                className="orders-image"
                                src={entry.productVariant.product.firstImageURL}
                                alt=""
                              />
                            )}
                          </td>
                          <td>
                            {entry.productVariant &&
                              entry.productVariant.product.name}{" "}
                            {entry.productVariant &&
                              entry.productVariant.productAttributeValues &&
                              entry.productVariant.productAttributeValues.map(
                                (attrValue) => (
                                  <span key={attrValue.id}>
                                    {" "}
                                    {attrValue.value}
                                  </span>
                                )
                              )}{" "}
                            X {entry.quantityInCart}
                          </td>
                          <td> RON {entry.totalPriceEntry}</td>
                          <td>
                            <button
                              className="reorder-button"
                              onClick={() =>
                                navigate(
                                  `/productVariants/${entry.productVariant.product.id}`
                                )
                              }
                            >
                              REPURCHASE
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default AccountPage;
