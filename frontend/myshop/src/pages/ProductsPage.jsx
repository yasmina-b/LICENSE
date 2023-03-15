import React from "react";
import "../styles/ProductsPage.css";
import Subcategorybar from "../components/Subcategorybar";
import { productsItems } from "../assets/data";
import Card from "../components/Card";

const ProductsPage = () => {
  return (
    <React.Fragment>
      <Subcategorybar />
      <h3 className="category-name-products">WOMEN'S FASHION</h3>
      <h6 className="category-description-products">
        Preview our collection. With styles for every kind of look, from the
        most casual, to the most classic discover the MINIMALIST STUDIO
        selection for Women.
      </h6>
      <div className="products-page">
        <div className="left-part">
          <div>SORT BY</div>
          <div>FILTER</div>
          <div>ORDER BY</div>
        </div>
        <div className="right-part">
          <div className="products-list">
            {productsItems.map((item) => (
              <React.Fragment>
                <Card item={item} key={item.id} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductsPage;
