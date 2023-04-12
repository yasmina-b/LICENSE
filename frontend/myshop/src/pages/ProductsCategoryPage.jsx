import React, { useState, useEffect } from "react";
import "../styles/ProductsPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { Camera, Search } from "react-feather";
import axios from "axios";
import Card from "../components/Card";
import ProductsPromo from "../components/ProductsPromo";

const ProductsCategoryPage = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [productsOfCategory, setProductsOfCategory] = useState([]);
  const [category, setCategory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getCategoryByCategoryId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/category/${categoryId}`
      );

      setCategory(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getProductsOfCategory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/productsCategory/${categoryId}`
      );
      setProductsOfCategory(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProductsOfCategory();
    getCategoryByCategoryId();
  }, []);

  const filteredProducts = productsOfCategory.filter((product) => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <React.Fragment>
      {category &&
        category.map((item) => (
          <div key={item.id}>
            <h3 className="category-name-products">
              SHOP NOW {item.name}'S FASHION
            </h3>

            <h6 className="category-description-products">
              {item.description}
            </h6>
          </div>
        ))}
      <ProductsPromo />
      <nav className="navbar">
        <div className="navbar-items">
          <div className="navbar-item">
            <input
              className="input-with-icons"
              placeholder="Search for..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="icon-search"></Search>
            <Camera className="icon-camera"></Camera>
          </div>
        </div>
      </nav>
      <div className="products-page">
        <div className="right-part">
          <div className="products-list">
            {filteredProducts.map((product) => (
              <React.Fragment key={product.id}>
                <div onClick={() => navigate(`/productVariants/${product.id}`)}>
                  <Card item={product} />
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductsCategoryPage;
