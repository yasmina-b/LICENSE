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

export default function AddProductAttribute() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [subcategories, setSubcategories] = useState("");
  const [productAttributeCreated, setProductAttributeCreated] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const getSubcategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/subcategories");
      setSubcategories(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createProductAttribute = async (e, subcategoryId) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3001/admin/productAttribute/${subcategoryId}`,
        {
          name,
        }
      );

      if (res.status === 200) {
        console.log(res.data);
        setProductAttributeCreated(true);
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    getSubcategories();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    setProductAttributeCreated(false);
  };

  const handleClose = () => {
    setName("");
    setSelectedSubcategory("");
    setOpen(false);
    setProductAttributeCreated(false);
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
        Add attributes for products
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
          Add a product attribute
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ textAlign: "center", fontSize: 15, fontWeight: 600 }}
          >
            Create attributes for products (ex: size, color, ..)
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Product attribute name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            select
            fullWidth
            variant="standard"
            label="Select a subcategory"
            value={selectedSubcategory}
            onChange={(event) => setSelectedSubcategory(event.target.value)}
          >
            {subcategories &&
              subcategories.map((subcategory) => (
                <MenuItem key={subcategory.id} value={subcategory.id}>
                  {subcategory.category.name} - {subcategory.name}
                </MenuItem>
              ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          {productAttributeCreated ? (
            <p>Product attribute created successfully!</p>
          ) : (
            <>
              <Button sx={{ color: "rgb(128, 38, 38)" }} onClick={handleClose}>
                Cancel
              </Button>
              <Button
                sx={{ color: "black" }}
                onClick={(e) => createProductAttribute(e, selectedSubcategory)}
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
