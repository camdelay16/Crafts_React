import React from "react";
import "./Home.css";
import FeaturedCraft from "./FeaturedCrafts";

const Home = () => {
  return (
    <>
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
          <a
            href="/crafts"
            className="home-button home-button-third"
          >
            Explore
          </a>
        </div>
      </div>
      <FeaturedCraft />
    </>
  );
};

export default Home;
