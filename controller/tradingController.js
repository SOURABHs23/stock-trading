import axios from "axios";
import { buyCondition, sellCondition } from "../strategies/strategies.js";
import { config } from "../config/config.js";

let { stockSymbols, initialBalance } = config;
let balance = initialBalance;
let positions = {}; // Track stock positions
let tradeHistory = [];

// Mock API call to fetch stock prices
const getStockPrices = async () => {
  try {
    const prices = stockSymbols.reduce((acc, symbol) => {
      acc[symbol] = (Math.random() * 1000).toFixed(2); // Mock prices between 0 and 1000
      return acc;
    }, {});
    return prices;
  } catch (error) {
    console.error("Error fetching stock prices:", error);
    return {};
  }
};

const tradingBot = async (req, res) => {
  try {
    const stockPrices = await getStockPrices();
    for (const symbol in stockPrices) {
      const price = parseFloat(stockPrices[symbol]);
      const previousPrice = positions[symbol]?.price || price;

      // Buy logic
      if (!positions[symbol] && buyCondition(price, previousPrice)) {
        const quantity = Math.floor(balance / price);
        positions[symbol] = { price, quantity };
        balance -= quantity * price;
        tradeHistory.push({ action: "BUY", symbol, price, quantity });
      }

      // Sell logic
      if (positions[symbol] && sellCondition(price, positions[symbol].price)) {
        balance += positions[symbol].quantity * price;
        tradeHistory.push({
          action: "SELL",
          symbol,
          price,
          quantity: positions[symbol].quantity,
        });
        delete positions[symbol];
      }
    }

    res.json({ balance, positions, tradeHistory });
  } catch (error) {
    console.error("Error running the trading bot:", error);
    res.status(500).send("Error running the trading bot");
  }
};

export default tradingBot;
