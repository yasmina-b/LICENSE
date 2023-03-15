import React, { useState } from "react";
import "../styles/Account.css";
import TextField from "@mui/material/TextField";

const AccountPage = () => {
  const [showOrders, setShowOrders] = useState(false);
  const [showAccount, setShowAccount] = useState(true);
  const [showBoughtProducts, setShowBoughtProducts] = useState(false);

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
  return (
    <React.Fragment>
      <h1 className="accountpage-title">MY ACCOUNT</h1>
      <h3 className="accountpage-subtitle">HELLO, USER</h3>
      <div className="accountpage">
        <div className="accountpage-left">
          <div className="accountpage-menu">
            <h3 onClick={handleAccountClick}>ACCOUNT INFO</h3>
            <h3 onClick={handleOrdersClick}>MY ORDERS</h3>
            <h3 onClick={handleBoughtProducts}>BOUGHT PRODUCTS</h3>
          </div>
        </div>
        {showAccount ? (
          <div className="accountpage-right">
            <div className="accountpage-info">
              <TextField
                sx={{ width: 500 }}
                id="standard-basic"
                label="First Name"
                variant="standard"
              />
            </div>
            <div className="accountpage-info">
              <TextField
                sx={{ width: 500 }}
                id="standard-basic"
                label="Last Name"
                variant="standard"
              />
            </div>
            <div className="accountpage-info">
              <TextField
                sx={{ width: 500 }}
                id="standard-basic"
                label="Phone number"
                variant="standard"
              />
            </div>
            <div className="accountpage-info">
              <TextField
                sx={{ width: 500 }}
                id="standard-basic"
                label="Address"
                variant="standard"
              />
            </div>
            <div className="accountpage-info">
              <TextField
                sx={{ width: 500 }}
                id="standard-basic"
                label="Town"
                variant="standard"
              />
            </div>
            <div className="accountpage-info">
              <button>SAVE MY INFO</button>
            </div>
          </div>
        ) : null}
        {showOrders ? (
          <div className="accountpage-right">
            <h3 className="accountpage-order-title">PREVIOUS ORDERS</h3>
            <table className="myorders-table">
              <tbody>
                <tr>
                  <td className="order-table-row">Number</td>
                  <td className="order-table-row">Order date</td>
                  <td className="order-table-row">Total</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>2023-08-15</td>
                  <td>RON 250</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : null}
        {showBoughtProducts ? (
          <div className="accountpage-right">
            <h2 className="order-date">2023-11-08(order id)</h2>
            <hr></hr>
            <table className="myorders-table-products">
              <tbody>
                <tr>
                  <td>
                    <img
                      className="orders-image"
                      src="https://images.lvrcdn.com/BigRetina77I/Y7H/014_4f2963f5-80c2-4f7a-8364-68d253eed7ef.JPG"
                      alt=""
                    ></img>
                  </td>
                  <td>TEST PRODUCT</td>
                  <td>RON 250</td>
                  <td>
                    <button className="reorder-button">REPURCHASE</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default AccountPage;
