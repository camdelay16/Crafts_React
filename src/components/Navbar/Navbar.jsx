import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CraftList from "../Craft/CraftList";
import AllCraft from "../../assets/NavButtons/AllCraft.svg";
import PaintingDrawing from "../../assets/NavButtons/Drawpaint.svg";
import Sculpture from "../../assets/NavButtons/Sculpture.svg";
import Textiles from "../../assets/NavButtons/Textile.svg";
import PaperCrafts from "../../assets/NavButtons/Paper.svg";
import JewelryMaking from "../../assets/NavButtons/JewelryMaking.svg";
import HomeDecor from "../../assets/NavButtons/HomeDecor.svg";
import KidsCrafts from "../../assets/NavButtons/Kids.svg";
import Witchcraft from "../../assets/NavButtons/witchcraft.svg";
import PremiumCrafts from "../../assets/NavButtons/premium.svg";
import AddCraft from "../../assets/NavButtons/addcraft.svg";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const { handleViewCraft, craftList, setCraftList, scrollToTop } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCraftType, setSelectedCraftType] = useState("allcraft");

  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
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
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const craftTypes = [
    {
      id: "allcraft",
      imgSrc: AllCraft,
      text: "All Crafts",
    },
    {
      id: "67159bf0c5f0b8a90eb3b0fb",
      imgSrc: PaintingDrawing,
      text: "Painting & Drawing",
    },
    {
      id: "67159bf0c5f0b8a90eb3b0fc",
      imgSrc: Sculpture,
      text: "Sculpture",
    },
    {
      id: "67159bf0c5f0b8a90eb3b0fd",
      imgSrc: Textiles,
      text: "Textiles",
    },
    {
      id: "67159bf0c5f0b8a90eb3b0fe",
      imgSrc: PaperCrafts,
      text: "Paper Crafts",
    },
    {
      id: "67159bf0c5f0b8a90eb3b0ff",
      imgSrc: JewelryMaking,
      text: "Jewelry Making",
    },
    {
      id: "67159bf0c5f0b8a90eb3b100",
      imgSrc: HomeDecor,
      text: "Home Decor",
    },
    {
      id: "kids",
      imgSrc: KidsCrafts,
      text: "Kid's Crafts",
    },
    {
      id: "67159bf0c5f0b8a90eb3b102",
      imgSrc: Witchcraft,
      text: "Witchcraft",
    },
    {
      id: "premium",
      imgSrc: PremiumCrafts,
      text: "Premium Crafts",
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
        scrollToTop={scrollToTop}
      />
    </div>
  );
};

export default Navbar;
