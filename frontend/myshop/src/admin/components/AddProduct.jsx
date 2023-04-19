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

export default function AddProduct() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [firstImageURL, setFirstImageURL] = useState("");
  const [secondImageURL, setSecondImageURL] = useState("");
  const [subcategories, setSubcategories] = useState("");
  const [productCreated, setProductCreated] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const { user } = React.useContext(AuthContext);

  const getSubcategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/subcategories");
      setSubcategories(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createProduct = async (e, subcategoryId) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3001/admin/product/${subcategoryId}`,
        {
          name,
          description,
          price,
          firstImageURL,
          secondImageURL,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (res.status === 200) {
        console.log(res.data);
        setProductCreated(true);
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
    setProductCreated(false);
  };

  const handleClose = () => {
    setName("");
    setDescription("");
    setPrice("");
    setFirstImageURL("");
    setSecondImageURL("");
    setSelectedSubcategory("");
    setOpen(false);
    setProductCreated(false);
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
        Create base product
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
          Add a base product
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ textAlign: "center", fontSize: 15, fontWeight: 600 }}
          >
            Create a product based on a subcategory
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Product name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Product description"
            type="text"
            fullWidth
            variant="standard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Product price"
            type="text"
            fullWidth
            variant="standard"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Product main image"
            type="text"
            fullWidth
            variant="standard"
            value={firstImageURL}
            onChange={(e) => setFirstImageURL(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Product second image"
            type="text"
            fullWidth
            variant="standard"
            value={secondImageURL}
            onChange={(e) => setSecondImageURL(e.target.value)}
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
          {productCreated ? (
            <p>Product created successfully!</p>
          ) : (
            <>
              <Button sx={{ color: "rgb(128, 38, 38)" }} onClick={handleClose}>
                Cancel
              </Button>
              <Button
                sx={{ color: "black" }}
                onClick={(e) => createProduct(e, selectedSubcategory)}
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
