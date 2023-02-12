import React from "react";
import Carousel from "../components/Carousel";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  return (
    <React.Fragment>
      <Carousel />
      <CategoryCard />
      <ProductCard />
    </React.Fragment>
  );
};

export default HomePage;
