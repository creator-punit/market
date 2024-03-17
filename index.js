import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnect } from "./src/db/db-connect.js";

dotenv.config({ path: "./.env" });

const app = express();
// app.use(
//   cors({
//     origin: "*",
//   })
// );

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World!");
});

dbConnect();

import {router as userRouter} from "./src/routes/user.route.js";
import { router as productRouter } from "./src/routes/product.route.js";
app.use("/api/v1", userRouter, productRouter);
// app.use("/api/v1", productRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
