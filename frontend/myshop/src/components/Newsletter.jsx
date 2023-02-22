import React from "react";
import "../styles/Newsletter.css";

const Newsletter = () => {
  return (
    <React.Fragment>
      <div className="newsletter-container">
        <div className="newsletter-title">NEWSLETTER</div>
        <h3 className="newsletter-description">
          GET TREND UPDATES, STYLE TIPS AND MORE
        </h3>
        <div className="input-container">
          <input placeholder="your email here..."></input>
          <button className="newsletter-button">SIGN UP</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Newsletter;
