import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import AuthContext from "../../context/AuthContext";

export default function AddVariant() {
  const [open, setOpen] = React.useState(false);
  const [quantityInStock, setQuantityInStock] = useState("");
  const [variantCreated, setVariantCreated] = useState(false);
  const [products, setProducts] = useState([]);
  const [productAttributeValues, setProductAttributeValues] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedAttributeValue, setSelectedAttributeValue] = useState("");

  const { user } = React.useContext(AuthContext);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/products");
      setProducts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getProductAttributeValues = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/productAttributeValues"
      );
      setProductAttributeValues(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createVariant = async (e, productId) => {
    e.preventDefault();
    try {
      if (user?.token) {
        const res = await axios.post(
          `http://localhost:3001/admin/productVariant/${productId}`,
          {
            quantityInStock,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (res.status === 200) {
          console.log(res.data);
          setVariantCreated(true);
        }
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    getProducts();
    getProductAttributeValues();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    setVariantCreated(false);
  };

  const handleClose = () => {
    setQuantityInStock("");
    setSelectedProduct("");
    setSelectedAttributeValue("");
    setOpen(false);
    setVariantCreated(false);
  };

  return (
    <div>
      <Button
        sx={{
          width: 400,
          color: "black",
          fontSize: 14,
          fontFamily:
            "Futura-Medium, Century Gothic, Gill Sans, Helvetica, Arial, sans-serif",
          backgroundColor: "white",
          border: "black",
          "&:hover": {
            backgroundColor: "#d8d1d1",
            color: "black",
            border: "black",
          },
        }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Create a variant for a product
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          sx={{
            textAlign: "center",
            textTransform: "uppercase",
            fontFamily: "Forum , cursive",
            fontWeight: 900,
          }}
        >
          Add a product variant
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ textAlign: "center", fontSize: 15, fontWeight: 600 }}
          >
            Configure your products
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="quantity"
            label="Variant quantity in stock"
            type="text"
            fullWidth
            variant="standard"
            value={quantityInStock}
            onChange={(e) => setQuantityInStock(e.target.value)}
          />
          <TextField
            select
            fullWidth
            variant="standard"
            label="Select a product"
            value={selectedProduct}
            onChange={(event) => setSelectedProduct(event.target.value)}
          >
            {products &&
              products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name}
                </MenuItem>
              ))}
          </TextField>
          <TextField
            select
            fullWidth
            id="selectedAttributeValue"
            variant="standard"
            label="Select a product attribute value"
            value={selectedAttributeValue}
            onChange={(event) => setSelectedAttributeValue(event.target.value)}
          >
            {productAttributeValues &&
              productAttributeValues.map((productAttributeValue) => (
                <MenuItem
                  key={productAttributeValue.id}
                  value={productAttributeValue.id}
                >
                  {productAttributeValue.productAttribute.name} -{" "}
                  {productAttributeValue.value}
                </MenuItem>
              ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          {variantCreated ? (
            <p>Variant created successfully!</p>
          ) : (
            <>
              <Button sx={{ color: "rgb(128, 38, 38)" }} onClick={handleClose}>
                Cancel
              </Button>
              <Button
                sx={{ color: "black" }}
                onClick={(e) => createVariant(e, selectedProduct)}
              >
                Create
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
