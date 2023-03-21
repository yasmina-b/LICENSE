import React from "react";
import Carousel from "../components/Carousel";
import CategoryCard from "../components/CategoryCard";
import MSubcategoryCarousel from "../components/MSubcategoryCarousel";
import Newsletter from "../components/Newsletter";
import ShopPromo from "../components/ShopPromo";
import ShopPromoLast from "../components/ShopPromoLast";
import WSubcategoryCarousel from "../components/WSubcategoryCarousel";

const HomePage = () => {
  return (
    <React.Fragment>
      <Carousel />
      <ShopPromo />
      <WSubcategoryCarousel />
      <CategoryCard />
      <ShopPromoLast />
      <MSubcategoryCarousel />
      <Newsletter />
    </React.Fragment>
  );
};

export default HomePage;
