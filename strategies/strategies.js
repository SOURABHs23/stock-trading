// Example buy condition: Price has dropped by 2% from the previous price
export const buyCondition = (currentPrice, previousPrice, symbol) => {
  const percentageDrop = (
    ((previousPrice - currentPrice) / previousPrice) *
    100
  ).toFixed(2);
  console.log(
    `Buy Condition for ${symbol} - Current Price: $${currentPrice}, Previous Price: $${previousPrice}, Percentage Drop: - ${percentageDrop}%`
  );
  return percentageDrop >= 2; // Buy if price dropped by 2% or more
};

// Example sell condition: Price has risen by 3% from the buy price
export const sellCondition = (currentPrice, buyPrice, symbol) => {
  const percentageRise = (((currentPrice - buyPrice) / buyPrice) * 100).toFixed(
    2
  );
  console.log(
    `Sell Condition for ${symbol} - Current Price: $${currentPrice}, Buy Price: $${buyPrice}, Percentage Rise: ${percentageRise}%`
  );
  return percentageRise >= 3; // Sell if price increased by 3% or more
};
