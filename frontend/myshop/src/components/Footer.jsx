import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-row">
            <div className="footer-column">
              <div className="footer-column-title-logo">MINIMALIST STUDIO</div>
              <h3 className="footer-column-title-description">
                Maximize your style
              </h3>
              <div className="footer-column-list">
                <div className="footer-column-list-item">
                  MINIMALISTSTUDIO@2023
                </div>
              </div>
            </div>
            <div className="footer-column">
              <div className="footer-column-title">CONTACT</div>
              <div className="footer-column-list">
                <div className="footer-column-list-item">
                  contact@minimaliststudio.com
                </div>
                <div className="footer-column-list-item">0356789432</div>
              </div>
            </div>
            <div className="footer-column">
              <div className="footer-column-title">SOCIAL</div>
              <div className="footer-column-list">
                <a href="https://www.instagram.com/">
                  <div className="footer-column-list-item">Instagram</div>
                </a>
                <a href="https://ro-ro.facebook.com/in">
                  <div className="footer-column-list-item">Facebook</div>
                </a>
                <a href="https://www.tiktok.com/en/">
                  <div className="footer-column-list-item">TikTok</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
