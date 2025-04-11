export const mockPriceData = Array.from({ length: 100 }, (_, i) => ({
  timestamp: new Date(Date.now() - (99 - i) * 24 * 60 * 60 * 1000),
  price: 100 + Math.random() * 100,
  volume: Math.random() * 1000,
  high: 100 + Math.random() * 50,
  low: 100 - Math.random() * 50,
  open: 100 + Math.random() * 25,
  close: 100 + Math.random() * 25,
}));

export const mockPortfolioData = Array.from({ length: 30 }, (_, i) => ({
  timestamp: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
  value: 10000 + Math.random() * 5000,
  returns: Math.random() * 0.05 - 0.025,
  volatility: Math.random() * 0.05,
}));
