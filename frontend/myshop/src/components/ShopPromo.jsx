import React from "react";
import "../styles/ShopPromo.css";

const ShopPromo = () => {
  return (
    <React.Fragment>
      <div className="shop-promo-container">
        <div className="shop-promo-title">DON'T MISS OUT</div>
        <div className="shop-promo-subtitle">NEW ARRIVALS</div>
        <div className="promo-description">
          Well-curated selection of items for a boutique-like shopping
          experience
        </div>
        <a href="/products">
          <button className="shop-promo-button">SHOP NOW</button>
        </a>
      </div>
    </React.Fragment>
  );
};

export default ShopPromo;
