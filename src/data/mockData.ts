
// Mock data for our trading platform

export type CryptoCurrency = {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  image: string;
  sparkline?: number[];
}

export type CandlestickData = {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type Order = {
  id: string;
  type: 'buy' | 'sell';
  crypto: string;
  price: number;
  amount: number;
  total: number;
  status: 'pending' | 'completed' | 'canceled';
  timestamp: string;
}

export type Portfolio = {
  totalValue: number;
  change24h: number;
  assets: {
    id: string;
    name: string;
    symbol: string;
    amount: number;
    value: number;
    allocation: number;
  }[];
}

// Generate mock cryptocurrency data
export const generateCryptocurrencies = (): CryptoCurrency[] => {
  const cryptos: CryptoCurrency[] = [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 42650.75,
      change24h: 2.34,
      volume24h: 28500000000,
      marketCap: 827500000000,
      image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
      sparkline: generateSparkline(42000, 43000, 24),
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      price: 2250.50,
      change24h: -1.27,
      volume24h: 15700000000,
      marketCap: 267300000000,
      image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
      sparkline: generateSparkline(2230, 2280, 24),
    },
    {
      id: 'binancecoin',
      name: 'Binance Coin',
      symbol: 'BNB',
      price: 320.45,
      change24h: 0.89,
      volume24h: 980000000,
      marketCap: 48750000000,
      image: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
      sparkline: generateSparkline(317, 323, 24),
    },
    {
      id: 'ripple',
      name: 'XRP',
      symbol: 'XRP',
      price: 0.52,
      change24h: 5.12,
      volume24h: 2400000000,
      marketCap: 25600000000,
      image: 'https://cryptologos.cc/logos/xrp-xrp-logo.png',
      sparkline: generateSparkline(0.49, 0.54, 24),
    },
    {
      id: 'cardano',
      name: 'Cardano',
      symbol: 'ADA',
      price: 0.48,
      change24h: -2.15,
      volume24h: 850000000,
      marketCap: 15900000000,
      image: 'https://cryptologos.cc/logos/cardano-ada-logo.png',
      sparkline: generateSparkline(0.47, 0.51, 24),
    },
    {
      id: 'solana',
      name: 'Solana',
      symbol: 'SOL',
      price: 132.75,
      change24h: 4.65,
      volume24h: 3700000000,
      marketCap: 54300000000,
      image: 'https://cryptologos.cc/logos/solana-sol-logo.png',
      sparkline: generateSparkline(128, 134, 24),
    },
    {
      id: 'polkadot',
      name: 'Polkadot',
      symbol: 'DOT',
      price: 6.85,
      change24h: -0.76,
      volume24h: 520000000,
      marketCap: 8700000000,
      image: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png',
      sparkline: generateSparkline(6.7, 7.0, 24),
    },
    {
      id: 'dogecoin',
      name: 'Dogecoin',
      symbol: 'DOGE',
      price: 0.085,
      change24h: 1.35,
      volume24h: 790000000,
      marketCap: 11200000000,
      image: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png',
      sparkline: generateSparkline(0.083, 0.087, 24),
    }
  ];
  
  return cryptos;
};

// Helper function to generate random sparkline data
function generateSparkline(min: number, max: number, points: number): number[] {
  const result: number[] = [];
  for (let i = 0; i < points; i++) {
    result.push(min + Math.random() * (max - min));
  }
  return result;
}

// Generate mock candlestick data for chart
export const generateCandlestickData = (basePrice: number, days: number = 30): CandlestickData[] => {
  const data: CandlestickData[] = [];
  let currentPrice = basePrice;
  
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(now.getDate() - i);
    
    // Generate random price movements
    const volatility = basePrice * 0.03; // 3% volatility
    const changePercent = (Math.random() - 0.5) * 2 * 0.015; // -1.5% to +1.5%
    currentPrice = currentPrice * (1 + changePercent);
    
    const open = currentPrice;
    const close = open * (1 + (Math.random() - 0.5) * 0.01); // -0.5% to +0.5% from open
    const high = Math.max(open, close) * (1 + Math.random() * 0.01); // 0% to 1% higher than max(open, close)
    const low = Math.min(open, close) * (1 - Math.random() * 0.01); // 0% to 1% lower than min(open, close)
    const volume = Math.random() * basePrice * 100000 + basePrice * 50000;
    
    data.push({
      time: date.toISOString().split('T')[0],
      open,
      high,
      low,
      close,
      volume
    });
  }
  
  return data;
};

// Generate mock portfolio data
export const generatePortfolio = (): Portfolio => {
  const assets = [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      amount: 0.45,
      value: 0.45 * 42650.75,
      allocation: 58.3
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      amount: 3.2,
      value: 3.2 * 2250.50,
      allocation: 21.9
    },
    {
      id: 'solana',
      name: 'Solana',
      symbol: 'SOL',
      amount: 18.5,
      value: 18.5 * 132.75,
      allocation: 7.5
    },
    {
      id: 'binancecoin',
      name: 'Binance Coin',
      symbol: 'BNB',
      amount: 5.7,
      value: 5.7 * 320.45,
      allocation: 5.6
    },
    {
      id: 'dogecoin',
      name: 'Dogecoin',
      symbol: 'DOGE',
      amount: 12500,
      value: 12500 * 0.085,
      allocation: 3.2
    },
    {
      id: 'cardano',
      name: 'Cardano',
      symbol: 'ADA',
      amount: 7500,
      value: 7500 * 0.48,
      allocation: 1.1
    }
  ];
  
  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  
  return {
    totalValue,
    change24h: 1.67,
    assets
  };
};

// Generate mock orders
export const generateOrders = (): Order[] => {
  return [
    {
      id: '1001',
      type: 'buy',
      crypto: 'Bitcoin',
      price: 42350.75,
      amount: 0.15,
      total: 42350.75 * 0.15,
      status: 'completed',
      timestamp: '2023-05-12T09:23:17Z'
    },
    {
      id: '1002',
      type: 'sell',
      crypto: 'Ethereum',
      price: 2280.30,
      amount: 0.75,
      total: 2280.30 * 0.75,
      status: 'completed',
      timestamp: '2023-05-10T14:45:22Z'
    },
    {
      id: '1003',
      type: 'buy',
      crypto: 'Solana',
      price: 128.45,
      amount: 3.2,
      total: 128.45 * 3.2,
      status: 'completed',
      timestamp: '2023-05-08T11:12:09Z'
    },
    {
      id: '1004',
      type: 'buy',
      crypto: 'Bitcoin',
      price: 43100.50,
      amount: 0.08,
      total: 43100.50 * 0.08,
      status: 'pending',
      timestamp: '2023-05-15T08:34:51Z'
    },
    {
      id: '1005',
      type: 'sell',
      crypto: 'Cardano',
      price: 0.49,
      amount: 1200,
      total: 0.49 * 1200,
      status: 'canceled',
      timestamp: '2023-05-09T16:27:33Z'
    }
  ];
};
