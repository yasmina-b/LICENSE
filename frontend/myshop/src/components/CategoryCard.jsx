import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/CategoryCard.css";

const CategoryCard = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/categories");
      setCategories(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <React.Fragment>
      <div className="shop-by-title">
        <h1>SHOP BY CATEGORY</h1>
      </div>
      <div className="subcategory-subtitle">
        <h1>A luxury shopping experience</h1>
      </div>
      <div className="category-card">
        { categories && categories.map ((category) => (
        <div className="categories" key={category.id}>
          <img
            className="category-image"
            src={category.imageURL}
            alt=""
          />
          <h3 onClick={() => navigate(`/productsCategory/${category.id}`)}>{category.name}</h3>
        </div>
        ))}
        </div>
    </React.Fragment>
  );
};

export default CategoryCard;
