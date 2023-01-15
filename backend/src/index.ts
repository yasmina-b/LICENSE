const express = require("express");
import cors = require("cors");
import { AppDataSource } from "./data-source";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();

AppDataSource.initialize()
  .then(() => {
    app.use(express.json());
    app.use(cors({ origin: "*", optionSuccessStatus: 200 }));

    app.listen(3001, function () {
      console.log(`Backend server running on port ${3001}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
