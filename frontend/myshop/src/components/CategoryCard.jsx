import React from "react";
import "../styles/CategoryCard.css";

const CategoryCard = () => {
  return (
    <React.Fragment>
        <div className="shop-by-title">
            <h1>SHOP BY CATEGORY</h1>
        </div>
      <div className="category-card">
        <div className="categories">
          <img
            class="category-image"
            src="https://i.pinimg.com/564x/91/d4/e6/91d4e6b5b41c31e52f395bac2fc058a3.jpg"
            alt=""
          />
          <h3>WOMEN</h3>
        </div>
        <div className="categories">
          <img
            className="category-image"
            src="https://i.pinimg.com/564x/c6/90/4b/c6904b6cd45f502a4925f803c4028d92.jpg"
            alt=""
          />
          <h3>MEN</h3>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CategoryCard;
