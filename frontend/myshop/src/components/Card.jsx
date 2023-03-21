import React from "react";
import "../styles/Card.css";

const Card = ({ item }) => {
  return (
    <React.Fragment>
      <div className="card">
        <div className="card-image">
          <img src={item.firstImageURL} alt="" className="first-image" />
          <img src={item.secondImageURL} alt="" className="second-image" />
        </div>
        <h2 className="card-subcategory">{item.name}</h2>
        <h2 className="card-title">{item.description}</h2>
        <h2 className="card-price">RON {item.price}</h2>
      </div>
    </React.Fragment>
  );
};

export default Card;
