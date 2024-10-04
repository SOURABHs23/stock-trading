import express from "express";
import dotenv from "dotenv";
import tradingBot from "./controllers/tradingController.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use("/trade", tradingBot);

app.listen(PORT, () => {
  console.log(`Trading bot listening on port ${PORT}`);
});
