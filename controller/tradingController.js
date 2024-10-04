import { buyCondition, sellCondition } from "../strategies/strategies.js";
import { config } from "../config/config.js";

let { stockSymbols, initialBalance, updateInterval } = config;

let balance = initialBalance;
let positions = {}; // Tracks the currently held stocks
let priceHistory = {}; // Tracks previous prices to detect changes
let tradeHistory = {}; // Logs trades (buy/sell)

// Mock stock prices (initialized)
let stockPrices = stockSymbols.reduce((acc, symbol) => {
  acc[symbol] = (Math.random() * 1000).toFixed(2); // Random initial price between 0 and 1000
  priceHistory[symbol] = acc[symbol]; // Initialize price history
  return acc;
}, {});

// Function to simulate stock price changes
const updateStockPrices = () => {
  stockSymbols.forEach((symbol) => {
    const priceChange = (Math.random() * 30 - 5).toFixed(2); // Price changes between -25 and +25
    stockPrices[symbol] = (
      parseFloat(stockPrices[symbol]) + parseFloat(priceChange)
    ).toFixed(2);
  });
  console.log("Updated stock prices:", stockPrices);
};

const tradeStocks = () => {
  stockSymbols.forEach((symbol) => {
    const currentPrice = parseFloat(stockPrices[symbol]);
    const previousPrice = parseFloat(priceHistory[symbol]); // Fetch the previous price from history

    // Store the price as the last known price for next comparison
    priceHistory[symbol] = currentPrice;

    console.log(
      `Checking ${symbol} - Current: $${currentPrice}, Previous: $${previousPrice}`
    );

    // Buy logic: if not holding stock and price drops by 2%
    if (
      !positions[symbol] &&
      previousPrice > currentPrice &&
      buyCondition(currentPrice, previousPrice, symbol)
    ) {
      const quantity = Math.floor(balance / currentPrice);
      if (quantity > 0) {
        positions[symbol] = { price: currentPrice, quantity }; // Track position
        balance -= quantity * currentPrice;
        tradeHistory[symbol] = tradeHistory[symbol] || [];
        tradeHistory[symbol].push({
          action: "BUY",
          price: currentPrice,
          quantity,
        });
        console.log(
          `Bought ${quantity} shares of ${symbol} at $${currentPrice}`
        );
      }
    }

    // Sell logic: if holding stock and price rises by 3%
    if (
      positions[symbol] &&
      currentPrice > positions[symbol].price &&
      sellCondition(currentPrice, positions[symbol].price, symbol)
    ) {
      const { quantity } = positions[symbol];
      balance = (balance + quantity * currentPrice).toFixed(2);
      tradeHistory[symbol].push({
        action: "SELL",
        price: currentPrice,
        quantity,
      });
      console.log(`Sold ${quantity} shares of ${symbol} at $${currentPrice}`);
      delete positions[symbol]; // Reset position after selling
    }
  });
  console.log(`Current Balance: $${balance}`);
  // console.log(tradeHistory + "j");
};

// Controller to handle price monitoring and trading logic
export const monitorPrices = (req, res) => {
  res.send("Monitoring stock prices... Check the console for updates.");
};

// Set up the interval to update stock prices and perform trades
setInterval(() => {
  updateStockPrices();
  tradeStocks();
}, updateInterval);

export default monitorPrices;
