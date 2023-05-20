import express from "express";
import multer from "multer";
import { uploadImage } from "../services/ImageService";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("image"), async (req, res, next) => {
  try {
    const { path } = req.file;
    const result = await uploadImage(path);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Image upload failed" });
  }
});

module.exports = router;
