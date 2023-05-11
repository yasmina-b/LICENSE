import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Checkout.css";
import TextField from "@mui/material/TextField";
import AuthContext from "../context/AuthContext";
import ProductsPromo from "../components/ProductsPromo";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [cartEntries, setCartEntries] = useState([]);
  const [allProductVariants, setAllProductVariants] = useState([]);
  const [cartTotal, setCartTotal] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const { user } = React.useContext(AuthContext);
  const cartId = user.user.cart.id;
  const navigate = useNavigate();

  const getCartEntries = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/cartEntries/${cartId}`
      );
      setCartEntries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getProductVariantByCartEntryId = async (cartEntryId) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/productVariantInCart/${cartEntryId}`
      );
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  const getCartTotalSum = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/cartTotal/${cartId}`);
      setCartTotal(res.data);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  const placeOrder = async () => {
    try {
      const res = await axios.post("http://localhost:3001/order", {
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        city,
        postalCode,
        cartEntries: cartEntries,
        userId: user.user.id,
        cartId: user.user.cart.id,
      });

      if (res.status === 200) {
        navigate('/confirmation');
        console.log(res.data);
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    getCartEntries();
    getCartTotalSum();
  }, []);

  useEffect(() => {
    const fetchProductVariants = async () => {
      const productVariants = [];
      if (cartEntries.length > 0) {
        for (const entry of cartEntries) {
          const variant = await getProductVariantByCartEntryId(entry.id);
          productVariants.push(variant);
        }
        setAllProductVariants(productVariants);
      }
    };

    fetchProductVariants();
  }, [cartEntries]);

  useEffect(() => {
    if (allProductVariants.length > 0) {
      // console.log(allProductVariants);
    }
  }, [allProductVariants]);
  return (
    <React.Fragment>
      <ProductsPromo />
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
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="text-field-position">
            <TextField
              sx={{ width: 500 }}
              id="outlined-password-input"
              label="Last Name"
              size="small"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="text-field-position">
            <TextField
              sx={{ width: 500 }}
              id="outlined-password-input"
              label="Email"
              size="small"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="text-field-position">
            <TextField
              sx={{ width: 500 }}
              id="outlined-password-input"
              label="Phone Number"
              size="small"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="text-field-position">
            <TextField
              sx={{ width: 500 }}
              id="outlined-password-input"
              label="Address"
              size="small"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="text-field-position">
            <TextField
              sx={{ width: 500 }}
              id="outlined-password-input"
              label="Postal Code"
              size="small"
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
        </div>
        <div className="checkout-right">
          <h3 className="checkout-left-title">YOUR SHOPPING BAG</h3>
          {allProductVariants &&
            allProductVariants.map((item, index) => (
              <div key={item.product.id}>
                <div className="checkout-product-details">
                  <img
                    className="checkout-orders-image"
                    src={item.product.firstImageURL}
                    alt=""
                  />
                  <h3>
                    {item.product.name} size{" "}
                    {item.productAttributeValues[0].value} X{" "}
                    {item.cartEntry.quantityInCart}
                  </h3>
                  <h3>RON {item.cartEntry.totalPriceEntry}</h3>
                </div>
              </div>
            ))}
          <div className="total-checkout-container">
            <h3 className="cart-total">TOTAL</h3>
            <h3 className="cart-total">{cartTotal.totalSum}.00</h3>
          </div>

          <button className="order-now-button" onClick={placeOrder}>
            ORDER NOW
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CheckoutPage;
