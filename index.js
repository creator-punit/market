import express from "express";

require("dotenv").config({ path: "./.env" });

const app = express();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000 || process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`);
});
