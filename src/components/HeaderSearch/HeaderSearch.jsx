import React, { useState } from "react";

const HeaderSearch = (props) => {
  const { craftList, searchCrafts, searchText, setSearchText, clearSearch } =
    props;

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchClick = async () => {
    await searchCrafts();
    clearSearch();
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      await searchCrafts();
      clearSearch();
    }
  };

  return (
    <header>
      <div id="logo-container">
        <img
          src="https://i.imgur.com/VC7hlta.png"
          alt="logo"
          className="logo"
        />
      </div>
      <div id="title-byline">
        <h2 id="page-title">Craftopia</h2>
        <h4 id="page-byline">Find Your Craft</h4>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Crafts"
          id="search"
          autoComplete="on"
          value={searchText}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
        <button
          id="search-btn"
          onClick={handleSearchClick}
        >
          Get Craftin'
        </button>
      </div>
    </header>
  );
};

export default HeaderSearch;
