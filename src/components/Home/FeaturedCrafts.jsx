import React from "react";
import "./Home.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const FeaturedCraft = () => {
  return (
    <>
      <div className="featured-craft-title">
        <h3 className="craft-month-title">Crafts of the Month</h3>
      </div>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="carousel-container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
            partialVisibilityGutter: 50,
          },
          desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            partialVisibilityGutter: 40,
          },
          smallDesktop: {
            breakpoint: { max: 1440, min: 1024 },
            items: 3,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
            partialVisibilityGutter: 30,
          },
          mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2,
            partialVisibilityGutter: 30,
          },
        }}
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        <div className="featured-craft-background">
          <img
            src="https://i0.wp.com/ohclary.com/wp-content/uploads/fall-wreath-2.jpg?resize=600%2C603&ssl=1"
            alt=""
            className="featured-craft-pic"
          />
        </div>
        <div className="featured-craft-background">
          <img
            src="https://m.media-amazon.com/images/I/81uZp9TmCpL.jpg"
            alt=""
            className="featured-craft-pic"
          />
        </div>
        <div className="featured-craft-background">
          <img
            src="https://content.prod.lovecrafts.co/lovecrafts/83e8adc2-81bf-4df7-ac58-89729f3cbdf7_Thanksgiving-Table-Paper-Pumpkins.webp?auto=compress,format&rect=0,0,749,498&w=635&h=422"
            alt=""
            className="featured-craft-pic"
          />
        </div>
        <div className="featured-craft-background">
          <img
            src="https://media.licdn.com/dms/image/D5612AQH4KOaS-wVWVw/article-cover_image-shrink_600_2000/0/1693632036481?e=2147483647&v=beta&t=D9GsPefKoFqXGA8BkQI21vKscZ0ncKY_oO2Wn7_xEz8"
            alt=""
            className="featured-craft-pic"
          />
        </div>
        <div className="featured-craft-background">
          <img
            src="https://rhythmsofplay.com/wp-content/uploads/2017/03/Flower-Nature-Crafts-sq-e1562004395393.jpg"
            alt=""
            className="featured-craft-pic"
          />
        </div>
        <div className="featured-craft-background">
          <img
            src="https://hips.hearstapps.com/hmg-prod/images/lavendar-soap-crafts-for-adults-1588272930.jpg?crop=0.668xw:1.00xh;0.179xw,0&resize=980:*"
            alt=""
            className="featured-craft-pic"
          />
        </div>
      </Carousel>
    </>
  );
};

export default FeaturedCraft;
