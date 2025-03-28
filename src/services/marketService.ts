
import { 
  CryptoCurrency, 
  CandlestickData, 
  Portfolio, 
  Order,
  generateCryptocurrencies,
  generateCandlestickData,
  generatePortfolio,
  generateOrders
} from '../data/mockData';

// This would normally be fetched from an API, but for demo purposes we'll use mock data
export const getMarketData = async (): Promise<CryptoCurrency[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateCryptocurrencies());
    }, 500);
  });
};

export const getCandlestickData = async (cryptoId: string, timeframe: string): Promise<CandlestickData[]> => {
  // Find the crypto to get the base price
  const cryptos = generateCryptocurrencies();
  const crypto = cryptos.find(c => c.id === cryptoId);
  const basePrice = crypto?.price || 30000;
  
  // Determine number of days based on timeframe
  let days = 30;
  if (timeframe === '1d') days = 24;
  if (timeframe === '1w') days = 7;
  if (timeframe === '1m') days = 30;
  if (timeframe === '3m') days = 90;
  if (timeframe === '1y') days = 365;
  
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateCandlestickData(basePrice, days));
    }, 700);
  });
};

export const getPortfolio = async (): Promise<Portfolio> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generatePortfolio());
    }, 600);
  });
};

export const getOrders = async (): Promise<Order[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateOrders());
    }, 600);
  });
};

export const placeOrder = async (order: Omit<Order, 'id' | 'status' | 'timestamp'>): Promise<Order> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newOrder: Order = {
        ...order,
        id: Math.random().toString(36).substring(2, 8),
        status: 'pending',
        timestamp: new Date().toISOString()
      };
      resolve(newOrder);
    }, 800);
  });
};
