import React, { useState, useEffect, useRef } from "react";
import "../styles/ImageSearch.css";
import axios from "axios";
import ProductsPromo from "../components/ProductsPromo";
import { Camera } from "react-feather";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

const ImageSearchPage = () => {
  const [productsSearchByImage, setProductsSearchByImage] = useState([]);
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadResponse, setUploadResponse] = useState([]);
  const [startImageSearch, setStartImageSearch] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileInputChange = (e) => {
    setStartImageSearch(true);
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setFile(file);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setStartImageSearch(true);

    if (!selectedImage) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://localhost:3001/upload",
        formData
      );
      console.log(response);
      setUploadResponse(response.data);

      const productSearchPromises = response.data.map(async (item) => {
        const searchString = item.replace(".png", ".JPG");

        try {
          const res = await axios.get("http://localhost:3001/findImage", {
            params: {
              searchString,
            },
          });

          console.log(res.data);
          return res.data;
        } catch (error) {
          console.error(error);
          return null;
        }
      });

      const products = await Promise.all(productSearchPromises);

      const filteredProducts = products.filter((product) => product !== null);

      setProductsSearchByImage(filteredProducts);
    } catch (error) {
      console.error(error);
    }

    setShowButton(false);
  };

  return (
    <React.Fragment>
      <ProductsPromo />
      {!startImageSearch && (
        <>
          <h2 className="looking-for-title">
            Ready to find what you're looking for? We've made it incredibly easy
            for you. Just follow these simple steps to get started:
          </h2>
          <h3 className="looking-for-subtitle">
            1. LOOK FOR THE CAMERA ICON: Locate the camera icon on the screen.
            It represents the option to upload your own picture.
          </h3>
          <h3 className="looking-for-subtitle">
            2.SELECT YOUR PICTURE: Click on the camera icon to open the file
            selection window. Browse through your computer's files and choose
            the image you want to use for the search.
          </h3>
          <h3 className="looking-for-subtitle">
            3. START THE IMAGE SEARCH: Once you have selected your picture, find
            the "START IMAGE SEARCH" button.
          </h3>
          <h3 className="looking-for-title">Happy searching!</h3>
          <div className="icon-camera-position">
            <Camera onClick={handleCameraClick} />
          </div>
          <input
            type="file"
            id="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileInputChange}
          />
        </>
      )}
      {startImageSearch && (
        <>
          <h2 className="looking-for-title">Happy shopping!</h2>
          <h3 className="looking-for-subtitle">
            Discover the MINIMALIST STUDIO selection of products that match the
            product you are searching for!
          </h3>
        </>
      )}
      <div className="icon-camera-position">
        {showButton && (
          <button className="image-search-button" onClick={handleClick}>
            START IMAGE SEARCH
          </button>
        )}
      </div>
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
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default ImageSearchPage;
