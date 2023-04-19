import * as React from "react";
import { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AuthContext from "../../context/AuthContext";

export default function AddCategory() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState("");
  const [categoryCreated, setCategoryCreated] = useState(false);

  const { user } = React.useContext(AuthContext);

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3001/admin/category",
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
        setCategoryCreated(true);
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
    setCategoryCreated(false);
  };

  const handleClose = () => {
    setName("");
    setImageURL("");
    setDescription("");
    setOpen(false);
    setCategoryCreated(false);
  };

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
        Create Category
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
          Add a category
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ textAlign: "center", fontSize: 15, fontWeight: 600 }}
          >
            Example: Women, Men, Kids etc
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Category name"
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
            label="Category image"
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
            label="Category description"
            type="text"
            fullWidth
            variant="standard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          {categoryCreated ? (
            <p>Category created successfully!</p>
          ) : (
            <>
              <Button sx={{ color: "rgb(128, 38, 38)" }} onClick={handleClose}>
                Cancel
              </Button>
              <Button
                sx={{ color: "black" }}
                onClick={(e) => createCategory(e)}
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
