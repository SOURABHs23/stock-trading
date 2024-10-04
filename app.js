import express from "express";
import dotenv from "dotenv";
import monitorPrices from "./controller/tradingController.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("welcome");
});

app.get("/monitor", monitorPrices);

app.get("*", (req, res) => {
  res.send('Please go to "/monitor" to see stock price monitoring.');
});

app.listen(PORT, () => {
  console.log(`Trading bot listening on port ${PORT}`);
});
