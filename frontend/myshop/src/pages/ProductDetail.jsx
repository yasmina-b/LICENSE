import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ProductDetail.css";
import ProductsPromo from "../components/ProductsPromo";
import Card from "../components/Card";
import { Plus, Minus } from "react-feather";
import Alert from "@mui/material/Alert";
import AuthContext from "../context/AuthContext";

const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [productVariants, setProductVariants] = useState([]);
  const [productAttributeValues, setProductAttributeValues] = useState([]);
  const [product, setProduct] = useState([]);
  const [selectedProductAttributeValue, setSelectedProductAttributeValue] =
    useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantityInCart, setQuantityInCart] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const [itemOutOfStock, setItemOutOfStock] = useState(false);

  const { productId } = useParams();
  const navigate = useNavigate();
  const { user } = React.useContext(AuthContext);

  const getProductVariantsOfProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/productVariants/${productId}`
      );
      const variantsWithImages = response.data.map((variant) => {
        const firstImageURL = variant.product.firstImageURL;
        const secondImageURL = variant.product.secondImageURL;
        return {
          ...variant,
          images: [firstImageURL, secondImageURL],
        };
      });
      setProductVariants(variantsWithImages);
    } catch (err) {
      console.error(err);
    }
  };

  const getProductAttributeValuesOfProduct = async (productId) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/productAttributeValues/${productId}`
      );
      setProductAttributeValues(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getRelatedProducts = async (productId, subcategoryId) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/relatedProducts/${productId}/${subcategoryId}`
      );
      setRelatedProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getProductByProductId = async (productId) => {
    try {
      const res = await axios.get(`http://localhost:3001/product/${productId}`);
      const productWithImages = res.data.map((item) => {
        const firstImageURL = item.firstImageURL;
        const secondImageURL = item.secondImageURL;
        const subcategoryId = item.subcategory.id;
        return {
          ...item,
          images: [firstImageURL, secondImageURL],
          subcategoryId: subcategoryId,
        };
      });
      setProduct(productWithImages);
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  useEffect(() => {
    getProductVariantsOfProduct(productId);
    getProductAttributeValuesOfProduct(productId);
    getProductByProductId(productId);
  }, [productId]);

  useEffect(() => {
    if (selectedProductAttributeValue) {
      const selectedVariant = productVariants.find((variant) =>
        variant.productAttributeValues.some(
          (value) => value.id === selectedProductAttributeValue.id
        )
      );
      setSelectedVariant(selectedVariant);
    }
  }, [selectedProductAttributeValue, productVariants]);

  useEffect(() => {
    if (product.length > 0) {
      const subcategoryId = product[0].subcategory.id;
      getRelatedProducts(productId, subcategoryId);
    }
  }, [product]);

  useEffect(() => {
    setIsButtonDisabled(!selectedProductAttributeValue);
  }, [selectedProductAttributeValue]);

  // const handleAddToBag = () => {
  //   if (selectedVariant) {
  //     const cart = JSON.parse(localStorage.getItem("cart")) || [];
  //     const isVariantAlreadyInCart = cart.some(
  //       (variant) => variant.id === selectedVariant.id
  //     );
  //     if (!isVariantAlreadyInCart) {
  //       cart.push(selectedVariant);
  //       localStorage.setItem("cart", JSON.stringify(cart));
  //       alert("Product added to cart!");
  //     } else {
  //       alert("Product is already in cart!");
  //     }
  //   }
  // };

  const handleAddToBag = async () => {
    if (selectedVariant) {
      if (selectedVariant.quantityInStock === 0) {
        setItemOutOfStock(true);
        return;
      }

      try {
        const res = await axios.post("http://localhost:3001/cartEntries", {
          quantityInCart,
          pricePerEntry: selectedVariant.product.price,
          totalPriceEntry: quantityInCart * selectedVariant.product.price,
          productVariant: selectedVariant.id,
          cartId: user.user.cart.id,
        });

        if (res.status === 200) {
          setAddedToCart(true);
        }
      } catch (err) {
        console.log(err.response.data);
      }
    }
  };

  return (
    <React.Fragment>
      <ProductsPromo />
      <div className="product-details">
        <div className="left-container">
          <div className="images">
            {product.length > 0 &&
              product[0]?.images?.map((image, index) => (
                <img
                  src={image}
                  alt=""
                  key={index}
                  onClick={() => handleImageClick(index)}
                />
              ))}
          </div>
          <div className="main-image">
            <img src={product[0]?.images[selectedImage]} alt="" />
          </div>
        </div>

        <div className="right-container">
          {product &&
            product.map((item) => (
              <div key={item.id}>
                <h1 className="product-name">{item.name}</h1>
                <div className="product-description">{item.description}</div>

                <div className="product-info-title">QUANTITY</div>
                <div className="cart-amount">
                  <Plus
                    onClick={() => setQuantityInCart((prev) => prev + 1)}
                  ></Plus>
                  <div className="cart-product-amount">{quantityInCart}</div>
                  <Minus
                    onClick={() =>
                      setQuantityInCart((prev) => (prev === 1 ? 1 : prev - 1))
                    }
                  ></Minus>
                </div>
                <div className="product-price">
                  RON {item.price * quantityInCart}.00
                </div>
                <div className="product-info-title">DETAILS</div>
                <div className="product-info">{item.info}</div>
              </div>
            ))}
          <div className="size-select-label">SELECT YOUR SIZE:</div>
          <div className="select-size-container">
            {productAttributeValues.map((productAttributeValue) => (
              <div key={productAttributeValue.id}>
                <option
                  className="select-size"
                  onClick={(e) => {
                    setSelectedProductAttributeValue(productAttributeValue);
                    e.target.classList.add("selected");
                  }}
                >
                  {productAttributeValue.value}
                </option>
              </div>
            ))}
          </div>
          {addedToCart && (
            <Alert
              sx={{ backgroundColor: "white", marginTop: "50px" }}
              severity="success"
              onClose={() => {
                setAddedToCart(false);
              }}
            >
              Product added to cart!
            </Alert>
          )}

          {itemOutOfStock && (
            <Alert
              sx={{ backgroundColor: "white", marginTop: "50px" }}
              severity="error"
              onClose={() => {
                setItemOutOfStock(false);
              }}
            >
              Sorry, this size is out of stock!
            </Alert>
          )}
          <div className="buttons-position">
            <button
              id="myButton"
              className="cart-button"
              onClick={handleAddToBag}
              disabled={isButtonDisabled}
            >
              ADD TO BAG
            </button>
          </div>
        </div>
      </div>
      <div className="related-products">YOU MIGHT ALSO LIKE</div>
      <div className="related-products-list">
        {relatedProducts.map((relatedProduct) => (
          <React.Fragment key={relatedProduct.id}>
            <div
              onClick={() => navigate(`/productVariants/${relatedProduct.id}`)}
            >
              <Card item={relatedProduct} />
            </div>
          </React.Fragment>
        ))}
      </div>
    </React.Fragment>
  );
};

export default ProductDetail;
