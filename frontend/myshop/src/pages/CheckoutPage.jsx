import React from "react";
import "../styles/Checkout.css";
import TextField from "@mui/material/TextField";

const CheckoutPage = () => {
  return (
    <React.Fragment>
      <h1 className="checkout-title">CHECKOUT DETAILS</h1>
      <div className="checkout">
        <div className="checkout-left">
          <h3 className="checkout-left-title">YOUR INFORMATION</h3>
          <div className="text-field-position">
            <TextField
              sx={{ width: 500 }}
              id="outlined-password-input"
              label="First Name"
              size="small"
              type="text"
            />
          </div>
          <div className="text-field-position">
            <TextField
              sx={{ width: 500 }}
              id="outlined-password-input"
              label="Last Name"
              size="small"
              type="text"
            />
          </div>
          <div className="text-field-position">
            <TextField
              sx={{ width: 500 }}
              id="outlined-password-input"
              label="Email"
              size="small"
              type="email"
            />
          </div>
          <div className="text-field-position">
            <TextField
              sx={{ width: 500 }}
              id="outlined-password-input"
              label="Phone Number"
              size="small"
              type="text"
            />
          </div>
          <h3 className="checkout-left-title">ADDRESS</h3>
          <div className="text-field-position">
            <TextField
              sx={{ width: 500 }}
              id="outlined-password-input"
              label="City"
              size="small"
              type="text"
            />
          </div>
          <div className="text-field-position">
            <TextField
              sx={{ width: 500 }}
              id="outlined-password-input"
              label="Address"
              size="small"
              type="text"
            />
          </div>
          <div className="text-field-position">
            <TextField
              sx={{ width: 500 }}
              id="outlined-password-input"
              label="Postal Code"
              size="small"
              type="text"
            />
          </div>
          <h3 className="checkout-left-title">PAYMENT</h3>
        </div>
        <div className="checkout-right">
          <h3 className="checkout-left-title">YOUR SHOPPING BAG</h3>
          <div className="checkout-product-details">
            <img
              className="checkout-orders-image"
              src="https://images.lvrcdn.com/BigRetina77I/Y7H/014_4f2963f5-80c2-4f7a-8364-68d253eed7ef.JPG"
              alt=""
            />
            <h3>PRODUCT NAME</h3>
            <h3>RON 250</h3>
          </div>
          <div className="total-checkout-container">
            <h3>TOTAL</h3>
            <h3>RON 250</h3>
          </div>
          <button className="order-now-button">ORDER NOW</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CheckoutPage;
