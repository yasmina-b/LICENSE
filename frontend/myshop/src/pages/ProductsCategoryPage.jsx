import React, { useState, useEffect } from "react";
import "../styles/ProductsPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { Camera, Search } from "react-feather";
import axios from "axios";
import Card from "../components/Card";
import ProductsPromo from "../components/ProductsPromo";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";

const ProductsCategoryPage = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [productsOfCategory, setProductsOfCategory] = useState([]);
  const [category, setCategory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedProducts, setSortedProducts] = useState([]);

  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    if (!file) {
      console.log("No file selected");
      return;
    }
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          console.log(downloadURL);
        });
      }
    );
  };

  console.log(file);

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

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
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
            <Camera className="icon-camera"></Camera>
          </div>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button onClick={handleClick}>SHOW THE PICTURE</button>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Uploaded file"
              style={{ maxWidth: "100%", marginTop: "10px" }}
            />
          )}
        </div>
      </nav>
      <div className="products-page">
        <div className="right-part">
          <div className="products-list">
            {sortedProducts.map((product) => (
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
