import React, { useState, useEffect } from "react";
import "../styles/Carousel.css";
import { carouselItems } from "../assets/data";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 2 : (prev) => prev - 1);
  };
  const nextSlide = () => {
    setCurrentSlide(currentSlide === 2 ? 0 : (prev) => prev + 1);
  };
  return (
    <React.Fragment>
      <div className="carousel">
        <div className="arrow arrow-left" onClick={prevSlide}>
          <ChevronLeftIcon></ChevronLeftIcon>
        </div>
        <div
          className="wrapper"
          style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
        >
          {carouselItems.map((slide, index) => (
            <div className="slide" key={index}>
              <div className="image-container">
                <img className="carousel-image" src={slide.img} alt=""></img>
              </div>
              <div className="carousel-info">
                <div className="carousel-slide-title">{slide.title}</div>
                <div className="carousel-slide-description">{slide.desc}</div>
                <a href="/">
                  <button className="carousel-button">{slide.button}</button>
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="arrow arrow-right" onClick={nextSlide}>
          <ChevronRightIcon></ChevronRightIcon>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Carousel;
