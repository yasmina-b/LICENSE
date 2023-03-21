import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ProductDetail.css";

const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [productVariants, setProductVariants] = useState([]);
  const [productAttributeValues, setProductAttributeValues] = useState([]);
  const [product, setProduct] = useState([]);

  const { productId } = useParams();

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

  const getProductByProductId = async (productId) => {
    try {
      const res = await axios.get(`http://localhost:3001/product/${productId}`);
      const productWithImages = res.data.map((item) => {
        const firstImageURL = item.firstImageURL;
        const secondImageURL = item.secondImageURL;
        return {
          ...item,
          images: [firstImageURL, secondImageURL],
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

  console.log(product[selectedImage]?.images);

  useEffect(() => {
    //getProductVariantsOfProduct(productId);
    getProductAttributeValuesOfProduct(productId);
    getProductByProductId(productId);
  }, [productId]);

  return (
    <React.Fragment>
      <div className="product-details">
        <div className="left-container">
          <div className="images">
            {product[selectedImage]?.images?.map((image, index) => (
              <img
                src={image}
                alt=""
                key={index}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>
          <div className="main-image">
            <img src={product[selectedImage]?.images?.[selectedImage]} alt="" />
          </div>
        </div>
        <div className="right-container">
          {/* {productVariants &&
            productVariants.map((productVariant) => (
              <div key={productVariant.id}>
                <h1>{productVariant.product.name}</h1>
                <div className="product-description">
                  {productVariant.product.description}
                </div>
                <div>Quantity: {productVariant.quantity}</div>
                <div className="product-price">
                  {" "}
                  RON {productVariant.product.price}
                </div>
                <label className="size-select-label">SIZES AVAILABLE:</label>
                <ul>
                  {productVariant.productAttributeValues.map(
                    (attributeValue) => (
                      <select className="select-size" key={attributeValue.id}>
                        <option>{attributeValue.value}</option>
                      </select>
                    )
                  )}
                </ul>
              </div>
            ))} */}

          {product &&
            product.map((item) => (
              <div key={item.id}>
                <h1 className="product-name">{item.name}</h1>
                <div className="product-description">{item.description}</div>
                <div className="product-price">RON {item.price}.00</div>
              </div>
            ))}
          <div className="size-select-label">SELECT YOUR SIZE:</div>
          <div className="select-size-container">
            {productAttributeValues.map((productAttributeValue) => (
              <div key={productAttributeValue.id}>
                <option className="select-size">
                  {productAttributeValue.value}
                </option>
              </div>
            ))}
          </div>
          <div className="buttons-position">
            <button className="cart-button">ADD TO BAG</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductDetail;
