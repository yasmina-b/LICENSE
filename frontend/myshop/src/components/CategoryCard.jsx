import React from "react";
import "../styles/CategoryCard.css";

const CategoryCard = () => {
  return (
    <React.Fragment>
      <div className="shop-by-title">
        <h1>SHOP BY CATEGORY</h1>
      </div>
      <div className="subcategory-subtitle">
        <h1>A luxury shopping experience</h1>
      </div>
      <div className="category-card">
        <div className="categories">
          <img
            class="category-image"
            src="https://www.fashiongonerogue.com/wp-content/uploads/2021/03/Massimo-Dutti-Limited-Edition-Spring-Summer-2021-Campaign02.jpg"
            alt=""
          />
          <h3>WOMEN</h3>
        </div>
        <div className="categories">
          <img
            className="category-image"
            src="https://www.malemodelscene.net/wp-content/uploads/2021/03/Massimo-Dutti-Limited-Edition-Man-SS21-02.jpg"
            alt=""
          />
          <h3>MEN</h3>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CategoryCard;
