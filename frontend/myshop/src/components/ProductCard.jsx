import React from "react";
import "../styles/ProductCard.css";
import { productsItems } from "../assets/data";
import Card from "./Card";

const ProductCard = () => {
  return (
    <React.Fragment>
      <div className="product-card">
        <div className="product-card-title">
          <h1>GREET SS23 WITH THE SEASON'S NEWEST ARRIVALS</h1>
        </div>
        <div className="product-card-container">
          {productsItems.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductCard;
