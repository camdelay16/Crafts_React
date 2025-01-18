import React, { useState } from "react";
import Logo from "../../assets/Logo/Craftopia.svg";
import { Link } from "react-router-dom";

const Search = (props) => {
  const {
    craftList,
    searchCrafts,
    searchText,
    setSearchText,
    clearSearch,
    setSearchCraft,
    searchCraft,
    handleViewCraft,
  } = props;

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

  const searchResults = searchCraft.map((craftItem) => (
    <div key={craftItem._id}>
      <div className="resultBackground">
        <div className="resultImgContainer">
          <img
            src={craftItem.craftImg || ""}
            alt="Craft Image"
            id="resultImg"
          />
        </div>
        <div className="resultListDetailsContainer">
          <h3 className="resultName">{craftItem.craftName}</h3>
          <div id="result-difficulty">
            <p>Difficulty: {craftItem.difficulty}</p>
          </div>
          <p id="tagline">{craftItem.tagline}</p>
          <Link to={`/crafts/${craftItem._id}`}>
            <button onClick={() => handleViewCraft(craftItem)}>View</button>
          </Link>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <br />
      <br />
      <br />
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
      <br />
      <br />
      <br />
      <br />
      {searchCraft.length > 0 && (
        <div className="searchContainer">
          <div>
            <h2 id="craftHeader">Search Results</h2>
          </div>
          <ul>{searchResults}</ul>
        </div>
      )}
    </>
  );
};

export default Search;
