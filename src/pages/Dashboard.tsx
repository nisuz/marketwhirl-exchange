
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMarketData } from '@/services/marketService';
import CryptoTable from '@/components/CryptoTable';
import PortfolioSummary from '@/components/PortfolioSummary';
import MarketStats from '@/components/MarketStats';
import NavBar from '@/components/NavBar';

const Dashboard: React.FC = () => {
  const { data: cryptos, isLoading } = useQuery({
    queryKey: ['market-data'],
    queryFn: getMarketData
  });
  
  // Calculate total market cap and 24h volume
  const totalMarketCap = React.useMemo(() => {
    if (!cryptos) return 0;
    return cryptos.reduce((sum, crypto) => sum + crypto.marketCap, 0);
  }, [cryptos]);
  
  const totalVolume24h = React.useMemo(() => {
    if (!cryptos) return 0;
    return cryptos.reduce((sum, crypto) => sum + crypto.volume24h, 0);
  }, [cryptos]);
  
  // Get top gainers and losers
  const topGainersAndLosers = React.useMemo(() => {
    if (!cryptos) {
      return { gainers: [], losers: [] };
    }
    
    const sorted = [...cryptos].sort((a, b) => b.change24h - a.change24h);
    return {
      gainers: sorted.slice(0, 3).map(c => ({ name: c.name, symbol: c.symbol, change: c.change24h })),
      losers: sorted.slice(-3).reverse().map(c => ({ name: c.name, symbol: c.symbol, change: c.change24h }))
    };
  }, [cryptos]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-1 px-4 py-6 max-w-7xl mx-auto mt-16 w-full">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        <MarketStats
          isLoading={isLoading}
          marketCap={totalMarketCap}
          volume24h={totalVolume24h}
          gainers={topGainersAndLosers.gainers}
          losers={topGainersAndLosers.losers}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <CryptoTable />
          </div>
          
          <div>
            <PortfolioSummary />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
