import React, { useState, useEffect } from "react";
import "../styles/ProductsPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { Search } from "react-feather";
import axios from "axios";
import Card from "../components/Card";
import ProductsPromo from "../components/ProductsPromo";

const ProductsPage = () => {
  const navigate = useNavigate();
  const { subcategoryId } = useParams();
  const [productsOfSubcategory, setProductsOfSubcategory] = useState([]);
  const [subcategoryName, setSubcategoryName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [productSizes, setProductSizes] = useState([]);
  const [filteredBySize, setFilteredBySize] = useState([]);
  const [sortedFilteredProducts, setSortedFilteredProducts] = useState([]);

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

  const getProductsSizesOfSubcategory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/productSizes/${subcategoryId}`
      );
      setProductSizes(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getFilteredProductsBySize = async (productAttributeValueId) => {
    console.log(productAttributeValueId);
    try {
      const response = await axios.get(
        `http://localhost:3001/filteredBySize/${subcategoryId}?productAttributeValueId=${productAttributeValueId}`
      );
      setFilteredBySize(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProductsOfSubcategory();
    getProductsSizesOfSubcategory();
  }, [subcategoryId]);

  useEffect(() => {
    const filtered = productsOfSubcategory.filter((product) => {
      return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const sorted = filtered.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    setSortedProducts(sorted);
  }, [sortOrder, productsOfSubcategory, searchTerm]);

  useEffect(() => {
    const filtered = filteredBySize.filter((product) => {
      return product.product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });

    const sorted = filtered.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.product.price - b.product.price;
      } else {
        return b.product.price - a.product.price;
      }
    });

    setSortedFilteredProducts(sorted);
  }, [sortOrder, filteredBySize, searchTerm]);

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

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
            <label htmlFor="sort-order-select" className="price-select-label">
              FILTER BY SIZE:{" "}
            </label>
            <select
              id="sort-order-select"
              className="price-select"
              onChange={(e) => {
                const productAttributeValueId = e.target.value;
                getFilteredProductsBySize(productAttributeValueId);
              }}
            >
              <option>ALL</option>
              {productSizes &&
                productSizes.map((ps) => (
                  <option key={ps.id} value={ps.id}>
                    {ps.value}
                  </option>
                ))}
            </select>
          </div>
          <div className="navbar-item">
            <label htmlFor="sort-order-select" className="price-select-label">
              SORT BY PRICE:{" "}
            </label>
            <select
              id="sort-order-select"
              className="price-select"
              value={sortOrder}
              onChange={handleSortOrderChange}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <div className="navbar-item">
            <input
              className="input-with-icons"
              placeholder="Search for..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="icon-search"></Search>
          </div>
        </div>
      </nav>
      <div className="products-page">
        <div className="right-part">
          <div className="products-list">
            {sortedFilteredProducts.length > 0 ? (
              sortedFilteredProducts.map((product) => (
                <React.Fragment key={product.id}>
                  <div
                    onClick={() => navigate(`/productVariants/${product.product.id}`)}
                  >
                    <Card item={product.product} />
                  </div>
                </React.Fragment>
              ))
            ) : sortedProducts.length > 0 ? (
              sortedProducts.map((product) => (
                <React.Fragment key={product.id}>
                  <div
                    onClick={() => navigate(`/productVariants/${product.id}`)}
                  >
                    <Card item={product} />
                  </div>
                </React.Fragment>
              ))
            ) : (
              <p className="no-products">SORRY! No products match your search.</p>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductsPage;
