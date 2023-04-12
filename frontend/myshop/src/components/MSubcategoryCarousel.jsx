import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/SubcategoryCarousel.css";
import { useNavigate } from "react-router-dom";

const WSubcategoryCarousel = () => {
  const [subcategoriesList, setSubcategoriesList] = useState([]);
  const navigate = useNavigate();

  const getSubcategories = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/subcategoriesLast`
      );
      setSubcategoriesList(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getSubcategories();
  }, []);

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
        <h1>MEN'S FASHION</h1>
      </div>
      <div className="subcategory-subtitle">
        <h1>Discover the MINIMALIST STUDIO selection for MEN</h1>
      </div>
      <div className="slider-container">
        <Slider {...settings}>
          {subcategoriesList &&
            subcategoriesList.map((subcategory) => (
              <div className="slider-card" key={subcategory.id}>
                <div className="slider-card-container">
                  <div
                    className="slider-image-container"
                    onClick={() => navigate(`/products/${subcategory.id}`)}
                  >
                    <img src={subcategory.imageURL} alt=""></img>
                  </div>
                  <div className="slider-bottom">
                    <div className="slider-bottom-title">
                      {subcategory.name}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </React.Fragment>
  );
};

export default WSubcategoryCarousel;
