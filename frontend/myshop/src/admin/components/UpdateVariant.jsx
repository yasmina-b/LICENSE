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

export default function UpdateVariant() {
  const [open, setOpen] = React.useState(false);
  const [productVariants, setProductVariants] = useState(false);
  const [productVariantSelected, setProductVariantSelected] = useState("");
  const [quantityInStock, setQuantityInStock] = useState([]);
  const [quantityUpdated, setQuantityUpdated] = useState(false);

  const { user } = React.useContext(AuthContext);

  const getProductVariants = async () => {
    try {
      const response = await axios.get("http://localhost:3001/productVariants");
      setProductVariants(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateVariant = async (e, productVariantId) => {
    try {
      if (user?.token) {
        const res = await axios.put(
          `http://localhost:3001/updateProductVariant/${productVariantId}`,
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
          setQuantityUpdated(true);
        }
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
    setQuantityUpdated(false);
  };

  const handleClose = () => {
    setQuantityInStock("");
    setProductVariantSelected("");
    setOpen(false);
    setQuantityUpdated(false);
  };

  useEffect(() => {
    getProductVariants();
  }, []);

  return (
    <div>
      <Button
        sx={{
          width: 400,
          color: "black",
          fontSize: 14,
          backgroundColor: "white",
          fontFamily:
            "Futura-Medium, Century Gothic, Gill Sans, Helvetica, Arial, sans-serif",
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
        Update quantity in stock
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
          Update quantity in stock
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ textAlign: "center", fontSize: 15, fontWeight: 600 }}
          >
            Choose the size you want to add more items to
          </DialogContentText>
          <TextField
            select
            margin="dense"
            id="name"
            label="Size"
            type="text"
            fullWidth
            variant="standard"
            value={productVariantSelected}
            onChange={(event) => setProductVariantSelected(event.target.value)}
          >
            {productVariants &&
              productVariants.map((productVariant) => (
                <MenuItem key={productVariant.id} value={productVariant.id}>
                  {productVariant.product.name} : {productVariant.productAttributeValues[0].value}
                </MenuItem>
              ))}
          </TextField>
          <TextField
            autoFocus
            margin="dense"
            id="image"
            label="Number of items in stock"
            type="text"
            fullWidth
            variant="standard"
            value={quantityInStock}
            onChange={(e) => setQuantityInStock(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          {quantityUpdated ? (
            <p>You added more items successfully!</p>
          ) : (
            <>
              <Button sx={{ color: "rgb(128, 38, 38)" }} onClick={handleClose}>
                Cancel
              </Button>
              <Button sx={{ color: "black" }} onClick={(e) => updateVariant(e, productVariantSelected)}>
                Update Variant
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
