export const USD_TO_INR = 90;

export const usdToInr = (price: number): number => {
  return Math.round(price * USD_TO_INR);
};

export const formatINR = (price: number): string => {
  return `₹${usdToInr(price).toLocaleString('en-IN')}`;
};