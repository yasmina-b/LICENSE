import React, { useState, useEffect, useRef } from "react";
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
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [startImageSearch, setStartImageSearch] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [productSizesCategory, setProductSizesCategory] = useState([]);
  const [filteredBySize, setFilteredBySize] = useState([]);
  const [sortedFilteredProducts, setSortedFilteredProducts] = useState([]);

  const [productsSearchByImage, setProductsSearchByImage] = useState([]);

  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadResponse, setUploadResponse] = useState([]);

  const fileInputRef = useRef(null);

  const getProductsSizesOfCategory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/productSizesCategory/${categoryId}`
      );
      setProductSizesCategory(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getFilteredProductsOfCategoryBySize = async (
    productAttributeValueId
  ) => {
    console.log(productAttributeValueId);
    try {
      const response = await axios.get(
        `http://localhost:3001/filteredBySizeCategory/${categoryId}?productAttributeValueId=${productAttributeValueId}`
      );
      setFilteredBySize(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setStartImageSearch(true);
    setButtonClicked(true);
    if (!selectedImage) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    await axios
      .post("http://localhost:3001/upload", formData)
      .then((response) => {
        console.log(response);
        setUploadResponse(response.data);

        response.data.forEach(async (item) => {
          const searchString = item.replace(".png", ".JPG");

          try {
            const res = await axios.get("http://localhost:3001/findImage", {
              params: {
                searchString,
              },
            });

            console.log(res.data);
            setProductsSearchByImage((prevProducts) => [
              ...prevProducts,
              res.data,
            ]);
          } catch (error) {
            console.error(error);
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setFile(file);
    }
  };

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
    getProductsSizesOfCategory();
  }, []);

  useEffect(() => {
    const filtered = productsOfCategory.filter((product) => {
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
  }, [sortOrder, productsOfCategory, searchTerm]);

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

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

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
            <label htmlFor="sort-order-select" className="price-select-label">
              FILTER BY SIZE:{" "}
            </label>
            <select
              id="sort-order-select"
              className="price-select"
              onChange={(e) => {
                const productAttributeValueId = e.target.value;
                getFilteredProductsOfCategoryBySize(productAttributeValueId);
              }}
            >
              <option>ALL</option>
              {productSizesCategory &&
                productSizesCategory.map((ps) => (
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
            <Camera className="icon-camera" onClick={handleCameraClick} />
            <input
              type="file"
              id="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileInputChange}
            />
          </div>
          {!buttonClicked && (
            <button className="image-search-button" onClick={handleClick}>
              START IMAGE SEARCH
            </button>
          )}
        </div>
      </nav>
      <div className="products-page">
        {startImageSearch && (
          <div className="left-part">
            {selectedImage && (
              <img
                className="card-image-search"
                src={selectedImage}
                alt="Uploaded file"
              />
            )}
          </div>
        )}
        {startImageSearch ? (
          <div className="right-part">
            {/* Render the productsSearchByImage */}
            <div className="products-list">
              {productsSearchByImage.map((product) => (
                <React.Fragment key={product.id}>
                  <div
                    onClick={() => navigate(`/productVariants/${product.id}`)}
                  >
                    <Card item={product} />
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        ) : (
          <div className="right-part">
            <div className="products-list">
              {sortedFilteredProducts.length > 0
                ? sortedFilteredProducts.map((product) => (
                    <React.Fragment key={product.id}>
                      <div
                        onClick={() =>
                          navigate(`/productVariants/${product.id}`)
                        }
                      >
                        <Card item={product.product} />
                      </div>
                    </React.Fragment>
                  ))
                : sortedProducts.map((product) => (
                    <React.Fragment key={product.id}>
                      <div
                        onClick={() =>
                          navigate(`/productVariants/${product.id}`)
                        }
                      >
                        <Card item={product} />
                      </div>
                    </React.Fragment>
                  ))}
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default ProductsCategoryPage;
