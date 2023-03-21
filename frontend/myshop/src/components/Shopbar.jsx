import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Shopbar.css";
import "../styles/Subcategorybar.css";
import { useNavigate } from "react-router";

const Shopbar = () => {
  const [categories, setCategories] = useState([]);
  const [subcategoriesList, setSubcategoriesList] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState("");

  const navigate = useNavigate();

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/categories");
      setCategories(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getSubcategoriesByCategoryId = async (categoryId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/subcategories/${categoryId}`
      );
      setSubcategoriesList(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getDefaultSubcategories = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/subcategoriesFirst`
      );
      setSubcategoriesList(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCategoryClick = async (categoryId) => {
    try {
      getSubcategoriesByCategoryId(categoryId);
      setActiveCategoryId(categoryId);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getCategories();
    getDefaultSubcategories();
  }, []);

  return (
    <React.Fragment>
      <nav className="titlebar">
        <div className="left-bar">
          {categories &&
            categories.map((category, index) => (
              <div
                className={`category-title-bar ${
                  activeCategoryId === category.id ||
                  (!activeCategoryId && index === 0)
                    ? "active"
                    : ""
                }`}
                key={index}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </div>
            ))}
        </div>
        <div className="center-bar">
          <a href="/">
            <div className="logo-title-bar">MINIMALIST STUDIO</div>
          </a>
        </div>
      </nav>
      <div className="subcategorybar">
        <div className="subcategorybar-center">
          {subcategoriesList &&
            subcategoriesList.map((subcategory) => (
              <div
                className="subcategorybar-items"
                key={subcategory.id}
                onClick={() => navigate(`/products/${subcategory.id}`)}
              >
                {subcategory.name}
              </div>
            ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Shopbar;
