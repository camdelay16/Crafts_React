import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CraftList from "../Craft/CraftList";

const Navbar = (props) => {
  const { handleViewCraft, craftList } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCraftType, setSelectedCraftType] = useState("allcraft");
  const [crafts, setCrafts] = useState([]);
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const craftTypes = [
    {
      id: "allcraft",
      imgSrc: "https://i.imgur.com/3hUlZDt.png",
      text: "All Crafts",
    },
    {
      id: "paint-draw",
      imgSrc: "https://i.imgur.com/gaZQqSa.png",
      text: "Painting & Drawing",
    },
    {
      id: "sculpture",
      imgSrc: "https://i.imgur.com/T4051t7.png",
      text: "Sculpture",
    },
    {
      id: "textiles",
      imgSrc: "https://i.imgur.com/ZY07YCI.png",
      text: "Textiles",
    },
    {
      id: "paper",
      imgSrc: "https://i.imgur.com/nJL382r.png",
      text: "Paper Crafts",
    },
    {
      id: "jewelry",
      imgSrc: "https://i.imgur.com/XzLb99V.png",
      text: "Jewelry Making",
    },
    {
      id: "home-decor",
      imgSrc: "https://i.imgur.com/Jl3alm4.png",
      text: "Home Decor",
    },
    {
      id: "kids",
      imgSrc: "https://i.imgur.com/lhYYJOu.png",
      text: "Kid's Crafts",
    },
    {
      id: "witchcraft",
      imgSrc: "https://i.imgur.com/KA4OO5r.png",
      text: "Witchcraft",
    },
    {
      id: "premium",
      imgSrc: "https://i.imgur.com/kmqHa9h.png",
      text: "Premium Crafts",
    },
    {
      id: "addcraft",
      imgSrc: "https://i.imgur.com/pCKXE1d.png",
      text: "Add Your Own!",
    },
  ];

  const handlePrevClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? craftTypes.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
    setCurrentIndex((prevIndex) =>
      prevIndex === craftTypes.length - 1 ? 0 : prevIndex + 1
    );
  };

  const filterCraftList = (craftId) => {
    setSelectedCraftType(craftId);
  };

  const filteredCrafts = craftList.filter((craft) => {
    if (selectedCraftType === "allcraft") return true;
    if (selectedCraftType === "kids") return craft.forKids === true;
    if (selectedCraftType === "premium")
      return craft.premiumMembership === true;
    return craft.craftType_id === selectedCraftType;
  });

  return (
    <div>
      <div
        className="craft-types"
        id="craft-types-buttons"
      >
        <button
          id="left-btn"
          className="carousel-btn"
          onClick={handlePrevClick}
        >
          &#171;
        </button>
        <Slider
          ref={sliderRef}
          {...settings}
          beforeChange={(oldIndex, newIndex) => setCurrentIndex(newIndex)}
        >
          {craftTypes.map((craft) => (
            <div
              key={craft.id}
              id={craft.id}
              className="type-btn"
              onClick={() => filterCraftList(craft.id)}
            >
              <img
                src={craft.imgSrc}
                className="type-btn-img"
              />
              <span className="type-btn-text">{craft.text}</span>
            </div>
          ))}
        </Slider>
        <button
          id="right-btn"
          className="carousel-btn"
          onClick={handleNextClick}
        >
          &#187;
        </button>
      </div>
      <CraftList
        selectedCraftType={selectedCraftType}
        filteredCrafts={filteredCrafts}
        handleViewCraft={handleViewCraft}
        craftList={craftList}
      />
    </div>
  );
};

export default Navbar;
