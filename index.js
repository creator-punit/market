import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./src/db/db-connect.js";

dotenv.config({ path: "./.env" });

const app = express();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

dbConnect();

import router from "./src/routes/user.route.js";
app.use("api/v1/", router)

const port = process.env.PORT;
app.listen(3000 || port, () => {
  console.log(`Example app listening on port ${port}`);
});
