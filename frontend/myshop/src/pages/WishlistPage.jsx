import React from "react";
import "../styles/WishlistPage.css";
import { X } from "react-feather";

const WishlistPage = () => {
  return (
    <React.Fragment>
      <h1 className="wishlist-title">MY WISHLIST</h1>
      <h3 className="wishlist-subtitle">SAVE NOW, BUY LATER</h3>
      <table className="wishlist-table">
        <tbody>
          <tr>
            <td>
              <img
                className="wishlist-image"
                src="https://images.lvrcdn.com/BigRetina77I/Y7H/014_4f2963f5-80c2-4f7a-8364-68d253eed7ef.JPG"
                alt=""
              ></img>
            </td>
            <td className="wishlist-product-name">SHOES TEST PRODUCT NAME</td>
            <td>
              <button className="wishlist-page-button">ADD TO CART</button>
            </td>
            <td>
              <X></X>
            </td>
          </tr>
          <tr>
            <td>
              <img
                className="wishlist-image"
                src="https://images.lvrcdn.com/BigRetina77I/Y7H/014_4f2963f5-80c2-4f7a-8364-68d253eed7ef.JPG"
                alt=""
              ></img>
            </td>
            <td className="wishlist-product-name">SHOES TEST PRODUCT NAME</td>
            <td>
              <button className="wishlist-page-button">ADD TO CART</button>
            </td>
            <td>
              <X></X>
            </td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default WishlistPage;
