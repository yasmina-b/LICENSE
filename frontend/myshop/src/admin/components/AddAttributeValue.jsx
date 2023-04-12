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

export default function AddAttributeValue() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState("");
  const [productAttributes, setProductAttributes] = useState("");
  const [attributeValueCreated, setAttributeValueCreated] = useState(false);
  const [selectedProductAttribute, setSelectedProductAttribute] = useState("");

  const getProductAttributes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/productAttributes"
      );
      setProductAttributes(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createAttributeValue = async (e, productAttributeId) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3001/admin/productAttributeValue/${productAttributeId}`,
        {
          value,
        }
      );

      if (res.status === 200) {
        console.log(res.data);
        setAttributeValueCreated(true);
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    getProductAttributes();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    setAttributeValueCreated(false);
  };

  const handleClose = () => {
    setValue("");
    setSelectedProductAttribute("");
    setOpen(false);
    setAttributeValueCreated(false);
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
        Add attribute values
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
          Add attribute values for product attributes
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ textAlign: "center", fontSize: 15, fontWeight: 600 }}
          >
            Create values for product attributes (ex: S, M, red ..)
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="value"
            label="Attribute value"
            type="text"
            fullWidth
            variant="standard"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <TextField
            select
            fullWidth
            variant="standard"
            label="Select a product attribute"
            value={selectedProductAttribute}
            onChange={(event) =>
              setSelectedProductAttribute(event.target.value)
            }
          >
            {productAttributes &&
              productAttributes.map((productAttribute) => (
                <MenuItem key={productAttribute.id} value={productAttribute.id}>
                  {productAttribute.name}
                </MenuItem>
              ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          {attributeValueCreated ? (
            <p>Attribute value created successfully!</p>
          ) : (
            <>
              <Button sx={{ color: "rgb(128, 38, 38)" }} onClick={handleClose}>
                Cancel
              </Button>
              <Button
                sx={{ color: "black" }}
                onClick={(e) =>
                  createAttributeValue(e, selectedProductAttribute)
                }
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
