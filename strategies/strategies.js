export const buyCondition = (price, previousPrice) =>
  price <= previousPrice * 0.98;

export const sellCondition = (price, previousPrice) =>
  price >= previousPrice * 1.03;
