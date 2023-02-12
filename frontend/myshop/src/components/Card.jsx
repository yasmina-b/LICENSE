import React from "react";
import "../styles/Card.css";

const Card = ({ item }) => {
  return (
    <React.Fragment>
      <div className="card">
        <div className="card-image">
          <img src={item.img} alt="" className="first-image" />
          <img src={item.img2} alt="" className="second-image" />
        </div>
        <h2 className="card-title">{item.title}</h2>
        <div className="prices">
          <h3>${item.price}</h3>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Card;
