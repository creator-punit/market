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

import router from "./src/routes/user.route.js";
app.use("/api/v1", router);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
