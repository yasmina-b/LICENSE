import React from "react";
import "../styles/Cart.css";
import { Plus, Minus, X } from "react-feather";

const CartPage = () => {
  return (
    <React.Fragment>
      {/* <h2 className="empty-cart-title">YOUR SHOPPING BAG IS EMPTY...</h2>
    <div className="empty-cart-button-position">
        <button className="empty-cart-button">CONTINUE SHOPPING</button>
    </div> */}
      <div className="cart-wrapper">
        <h1 className="cart-title">YOUR SHOPPING BAG (1)</h1>
        <div className="cart-top">
          <a href="/products">
            <button className="cart-top-buttons">CONTINUE SHOPPING</button>
          </a>
          <a href="/checkout">
            <button className="cart-top-buttons-checkout">
              PROCEED TO CHECKOUT
            </button>
          </a>
        </div>
        <div className="cart-bottom">
          <div className="cart-info">
            <div className="cart-product">
              <div className="cart-details">
                <img
                  className="cart-product-image"
                  src="https://images.lvrcdn.com/BigRetina77I/Y7H/014_4f2963f5-80c2-4f7a-8364-68d253eed7ef.JPG"
                  alt=""
                ></img>
                <div className="cart-product-details">
                  <span className="cart-product-name">
                    TEST SHOES PRODUCT CART
                  </span>
                  <span>CATEGORY</span>
                  <span>SUBCATEGORY</span>
                  <span>SIZE: 38</span>
                </div>
                <div className="cart-amount-details">
                  <X className="cart-close-button" />
                  <div className="cart-amount">
                    <Plus></Plus>
                    <div className="cart-product-amount">1</div>
                    <Minus></Minus>
                  </div>
                  <div className="cart-product-price">RON 10000.000</div>
                </div>
              </div>
            </div>
            <div className="cart-product">
              <div className="cart-details">
                <img
                  className="cart-product-image"
                  src="https://images.lvrcdn.com/BigRetina77I/Y7H/014_4f2963f5-80c2-4f7a-8364-68d253eed7ef.JPG"
                  alt=""
                ></img>
                <div className="cart-product-details">
                  <span className="cart-product-name">
                    TEST SHOES PRODUCT CART
                  </span>
                  <span>CATEGORY</span>
                  <span>SUBCATEGORY</span>
                  <span>SIZE: 38</span>
                </div>
                <div className="cart-amount-details">
                  <X className="cart-close-button" />
                  <div className="cart-amount">
                    <Plus></Plus>
                    <div className="cart-product-amount">1</div>
                    <Minus></Minus>
                  </div>
                  <div className="cart-product-price">RON 10000.000</div>
                </div>
              </div>
            </div>
          </div>
          <div className="cart-summary">
            <div className="cart-summary-title">ORDER SUMMARY</div>
            <div className="cart-summary-item">
              <div>TEST</div>
              <div>RON 1000.00</div>
            </div>
            {/* <div className="cart-summary-item">
              <div>ENTER PROMO CODE</div>
              <input className="input-code"></input>
              <button className="input-code-button">GO</button>
            </div> */}
            <div className="cart-summary-item">
              <div className="cart-total">TOTAL</div>
              <div className="cart-total-price">RON 1000.00</div>
            </div>
            <button className="cart-summary-button">ORDER NOW</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default CartPage;
