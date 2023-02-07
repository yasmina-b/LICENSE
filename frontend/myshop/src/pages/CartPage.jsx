import React from "react";
import "../styles/Cart.css";

const CartPage = () => {
  return <React.Fragment>
    <h2 className="empty-cart-title">YOUR SHOPPING BAG IS EMPTY...</h2>
    <div className="empty-cart-button-position">
        <button className="empty-cart-button">CONTINUE SHOPPING</button>
    </div>
  </React.Fragment>;
};
export default CartPage;
