# Stock Trading Bot

A basic stock trading bot built with Node.js

## Features

- Mock stock price monitoring
- Simple trading strategy: buy when price drops by 2%, sell when it rises by 3%
- Tracks balance, profit/loss, and trade history

## Setup

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following content:
   ```bash
   PORT=3000
   ```
4. Run the application:
   ```bash
   npm start
   ```

## API Endpoints

-**Get /monitor** : if you hit this route then bot will active and keep checking the buy and sell possiblity

-**Note**: i didnt have any api for fecting data, i have made 4 sample data and updating it , you can see that in config/config.js , later Mock stock prices (initialized) in controller/tradingController.js file
