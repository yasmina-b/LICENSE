import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/SubcategoryCarousel.css";

const WSubcategoryCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <React.Fragment>
      <div className="shop-by-title">
        <h1>WOMEN'S FASHION</h1>
      </div>
      <div className="subcategory-subtitle">
        <h1>Discover the MINIMALIST STUDIO selection for women</h1>
      </div>
      <div className="slider-container">
        <Slider {...settings}>
          <div className="slider-card">
            <div className="slider-card-container">
              <div className="slider-image-container">
                <img
                  src="https://img.mytheresa.com/420/475/95/jpeg/catalog/product/04/P00623855.jpg"
                  alt=""
                ></img>
              </div>
              <div className="slider-bottom">
                <div className="slider-bottom-title">DRESSES</div>
              </div>
            </div>
          </div>
          <div className="slider-card">
            <div className="slider-card-container">
              <div className="slider-image-container">
                <img
                  src="https://img.mytheresa.com/420/475/95/jpeg/catalog/product/9b/P00709633.jpg"
                  alt=""
                ></img>
              </div>
              <div className="slider-bottom">
                <div className="slider-bottom-title">DRESSES</div>
              </div>
            </div>
          </div>
          <div className="slider-card">
            <div className="slider-card-container">
              <div className="slider-image-container">
                <img
                  src="https://img.mytheresa.com/420/475/95/jpeg/catalog/product/d6/P00440221.jpg"
                  alt=""
                ></img>
              </div>
              <div className="slider-bottom">
                <div className="slider-bottom-title">DRESSES</div>
              </div>
            </div>
          </div>
          <div className="slider-card">
            <div className="slider-card-container">
              <div className="slider-image-container">
                <img
                  src="https://img.mytheresa.com/420/475/95/jpeg/catalog/product/ef/P00751726.jpg"
                  alt=""
                ></img>
              </div>
              <div className="slider-bottom">
                <div className="slider-bottom-title">DRESSES</div>
              </div>
            </div>
          </div>
          <div className="slider-card">
            <div className="slider-card-container">
              <div className="slider-image-container">
                <img
                  src="https://img.mytheresa.com/420/475/95/jpeg/catalog/product/cd/P00759258.jpg"
                  alt=""
                ></img>
              </div>
              <div className="slider-bottom">
                <div className="slider-bottom-title">DRESSES</div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </React.Fragment>
  );
};

export default WSubcategoryCarousel;
