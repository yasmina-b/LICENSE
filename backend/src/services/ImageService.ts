import axios from "axios";
import FormData from "form-data";
import fs from "fs";

export const uploadImage = async (file) => {
  try {
    const url = "http://localhost:81/upload";
    const formData = new FormData();
    formData.append("image", fs.createReadStream(file));

    const response = await axios.post(url, formData);

    return response.data;
  } catch (error) {
    throw new Error("Image upload failed");
  }
};

module.exports = { uploadImage };
