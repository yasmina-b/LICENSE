import React from "react";
import "../styles/Subcategorybar.css";

const Subcategorybar = () => {
  return (
    <React.Fragment>
      <div className="subcategorybar">
        <div className="subcategorybar-center">
          <div className="subcategorybar-items">COATS</div>
          <div className="subcategorybar-items">DRESSES</div>
          <div className="subcategorybar-items">TROUSERS</div>
          <div className="subcategorybar-items">JEANS</div>
          <div className="subcategorybar-items">TOPS</div>
          <div className="subcategorybar-items">T-SHIRTS</div>
          <div className="subcategorybar-items">SHIRTS</div>
          <div className="subcategorybar-items">SKIRTS</div>
          <div className="subcategorybar-items">BAGS</div>
          <div className="subcategorybar-items">ACCESSORIES</div>
          {/* <input className="input-style-nav"/> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Subcategorybar;
