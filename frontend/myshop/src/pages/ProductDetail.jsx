import React, { useState } from "react";
import Subcategorybar from "../components/Subcategorybar";
import "../styles/ProductDetail.css";

const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  const images = [
    "https://images.lvrcdn.com/BigRetina76I/5CK/130_5f111015-a5ef-42b9-a4dd-7f08c8c3b051.JPG",
    "https://images.lvrcdn.com/BigRetina76I/5CK/130_e327d582-2455-43c1-8dd8-e65fce9cd633.JPG",
  ];

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  return (
    <React.Fragment>
        <Subcategorybar/>
      <div className="product-details">
        <div className="left-container">
          <div className="images">
            {images.map((image, index) => (
              <img
                src={image}
                alt=""
                key={index}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>
          <div className="main-image">
            <img src={images[selectedImage]} alt="" />
          </div>
        </div>
        <div className="right-container">
          <h1>JAQUEMUS LEATHER BAG</h1>
          <div className="product-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
          <div className="product-price">$100</div>
          <label className="size-select-label">SELECT YOUR SIZE:</label>
          <select className="select-size">
            <option>S</option>
            <option>M</option>
            <option>L</option>
          </select>
          <div className="find-size-container">
            <div className="find-size">Find your size</div>
            <div className="size-guide">Size guide</div>
          </div>
          <div className="buttons-position">
            <button className="cart-button">ADD TO BAG</button>
            <button className="wishlist-button">ADD TO WISHLIST</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductDetail;
