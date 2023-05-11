import React from "react";
import ProductsPromo from "../components/ProductsPromo";

const OrderConfirmationPage = () => {
  return (
    <React.Fragment>
      <ProductsPromo />
      <h2 className="empty-cart-title">THANK YOU! YOUR ORDER HAS BEEN SUCCESSFULLY PLACED</h2>
          <div className="empty-cart-button-position">
            <a href="/">
              <button className="empty-cart-button">CONTINUE SHOPPING</button>
            </a>
          </div>
    </React.Fragment>
  );
};

export default OrderConfirmationPage;
