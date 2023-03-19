const express = require("express");
import cors = require("cors");
import { AppDataSource } from "./data-source";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();

import authRoutes = require("./controllers/AuthController");
import userRoutes = require("./controllers/UserController");
import categoryRoutes = require("./controllers/CategoryController");
import subcategoryRoutes = require("./controllers/SubcategoryController");
import productRoutes = require("./controllers/ProductController");
import productAttributeRoutes = require("./controllers/ProductAttributeController");
import productAttributeValueRoutes = require("./controllers/ProductAttributeValueController");
import productVariantRoutes = require("./controllers/ProductVariantController");

AppDataSource.initialize()
  .then(() => {
    app.use(express.json());
    app.use(cors({ origin: "*", optionSuccessStatus: 200 }));
    app.use(authRoutes);
    app.use(userRoutes);
    app.use(categoryRoutes);
    app.use(subcategoryRoutes);
    app.use(productRoutes);
    app.use(productAttributeRoutes);
    app.use(productAttributeValueRoutes);
    app.use(productVariantRoutes);

    app.listen(3001, function () {
      console.log(`Backend server running on port ${3001}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
