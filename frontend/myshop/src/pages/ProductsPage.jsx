import React, { useState, useEffect } from "react";
import "../styles/ProductsPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { Camera, Search } from "react-feather";
import axios from "axios";
import Card from "../components/Card";
import ProductsPromo from "../components/ProductsPromo";

const ProductsPage = () => {
  const navigate = useNavigate();
  const { subcategoryId } = useParams();
  const [productsOfSubcategory, setProductsOfSubcategory] = useState([]);
  const [subcategoryName, setSubcategoryName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const getProductsOfSubcategory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/products/${subcategoryId}`
      );
      setProductsOfSubcategory(response.data);
      setSubcategoryName(
        response.data.length > 0 ? response.data[0].subcategory.name : ""
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProductsOfSubcategory();
  }, [subcategoryId]);

  const filteredProducts = productsOfSubcategory.filter((product) => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <React.Fragment>
      <h3 className="category-name-products">
        {subcategoryName && `SELECTION OF OUR ${subcategoryName}`}
      </h3>
      <h6 className="category-description-products">
        Preview our collection. With styles for every kind of look, from the
        most casual, to the most classic discover the MINIMALIST STUDIO
        selection.
      </h6>
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
        {/* <div className="left-part">
          <div>SORT BY</div>
          <div>FILTER</div>
          <div>ORDER BY</div>
        </div> */}
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

export default ProductsPage;
