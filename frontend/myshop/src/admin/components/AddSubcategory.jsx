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

export default function AddSubcategory() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState("");
  const [subcategoryCreated, setSubcategoryCreated] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const { user } = React.useContext(AuthContext);

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/categories");
      setCategories(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createSubcategory = async (e, categoryId) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3001/admin/subcategory/${categoryId}`,
        {
          name,
          imageURL,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (res.status === 200) {
        console.log(res.data);
        setSubcategoryCreated(true);
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    setSubcategoryCreated(false);
  };

  const handleClose = () => {
    setName("");
    setImageURL("");
    setDescription("");
    setSelectedCategory("");
    setOpen(false);
    setSubcategoryCreated(false);
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
        Create Subcategory
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
          Add a subcategory
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ textAlign: "center", fontSize: 15, fontWeight: 600 }}
          >
            Create a subcategory for your categories
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Subcategory name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="image"
            label="Subcategory image"
            type="text"
            fullWidth
            variant="standard"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Subcategory description"
            type="text"
            fullWidth
            variant="standard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            select
            fullWidth
            variant="standard"
            label="Select a category"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            {categories &&
              categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          {subcategoryCreated ? (
            <p>Subcategory created successfully!</p>
          ) : (
            <>
              <Button sx={{ color: "rgb(128, 38, 38)" }} onClick={handleClose}>
                Cancel
              </Button>
              <Button
                sx={{ color: "black" }}
                onClick={(e) => createSubcategory(e, selectedCategory)}
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
