import React from "react";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-info">
        <span className="footer-text">About</span>
      </div>
      <div className="footer-info">
        <span className="footer-text">Contact Us</span>
      </div>
      <div className="footer-info">
        <span className="footer-text">Privacy</span>
      </div>
      <div
        className="footer-info"
        id="app-text"
      >
        <span className="footer-text">Get The App</span>
      </div>
    </div>
  );
};

export default Footer;
