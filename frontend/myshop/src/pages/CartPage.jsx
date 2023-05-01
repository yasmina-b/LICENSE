import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Cart.css";
import { X } from "react-feather";
import ProductsPromo from "../components/ProductsPromo";
import AuthContext from "../context/AuthContext";

const CartPage = () => {
  const [cartEntries, setCartEntries] = useState([]);
  const [allProductVariants, setAllProductVariants] = useState([]);
  const [cartTotal, setCartTotal] = useState([]);
  const { user } = React.useContext(AuthContext);

  const cartId = user.user.cart.id;

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

  const deleteCartEntry = async (cartEntryId) => {
    try {
      const res = await axios.delete(
        `http://localhost:3001/cartEntry/${cartEntryId}`
      );
      if (res.status === 200) {
        const newProductVariants = allProductVariants.filter(
          (variant) => variant.cartEntry.id !== cartEntryId
        );
        setAllProductVariants(newProductVariants);
        setCartTotal(0);
      }
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
      <div className="cart-wrapper">
        {allProductVariants &&
          allProductVariants.map((item, index) => (
            <div className="cart-bottom" key={index}>
              <div className="cart-info">
                <div className="cart-product">
                  <div className="cart-details">
                    <img
                      className="cart-product-image"
                      src={item.product.firstImageURL}
                      alt=""
                    ></img>
                    <div className="cart-product-details">
                      <span className="cart-product-name">
                        {item.product.name}
                      </span>
                      <span className="cart-product-description">
                        {item.product.description}
                      </span>
                      <span>Size: {item.productAttributeValues[0].value}</span>
                      <span>Quantity: {item.cartEntry.quantityInCart}</span>
                      <span className="cart-product-name">
                        Total RON : {item.cartEntry.totalPriceEntry}
                      </span>
                    </div>
                    <div className="cart-amount-details">
                      <X
                        className="cart-close-button"
                        onClick={() => deleteCartEntry(item.cartEntry.id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

        <div className="cart-summary">
          <div className="cart-summary-title">ORDER SUMMARY</div>
          {allProductVariants &&
            allProductVariants.map((item, index) => (
              <div className="cart-summary-item" key={index}>
                <div>
                  {item.product.name} : {item.productAttributeValues[0].value} X{" "}
                  {item.cartEntry.quantityInCart}
                </div>
                <div>RON {item.cartEntry.totalPriceEntry}</div>
              </div>
            ))}
          <div className="cart-summary-item">
            <div className="cart-total">TOTAL : </div>
            <div className="cart-total-price">RON {cartTotal.totalSum}</div>
          </div>
          <a href="/checkout">
            <button className="cart-summary-button">PROCEED TO CHECKOUT</button>
          </a>
        </div>
      </div>
    </React.Fragment>
  );
};
export default CartPage;
