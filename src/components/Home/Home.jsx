import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-header">Welcome to Craftopia!</h1>
      <p className="home-subheader">Find your Craft.</p>
      <div className="home-buttons">
        <a
          href="/signin"
          className="home-button"
        >
          Sign In
        </a>
        <a
          href="/signup"
          className="home-button home-button-secondary"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default Home;
