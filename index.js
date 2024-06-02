import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnect } from "./src/db/db-connect.js";
import { Routing } from "./src/routes/routes.js";
import { swagger } from "./swaggerDoc.js";

dotenv.config({ path: "./.env" });

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

dbConnect();
Routing(app);
swagger(app)

// app.use("/api/v1",);
// app.use("/api/v1", productRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
