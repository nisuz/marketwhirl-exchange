
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMarketData } from '@/services/marketService';
import CryptoTable from '@/components/CryptoTable';
import MarketStats from '@/components/MarketStats';
import NavBar from '@/components/NavBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

const Market: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [category, setCategory] = React.useState('all');
  
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
        <h1 className="text-2xl font-bold mb-6">Market</h1>
        
        <MarketStats
          isLoading={isLoading}
          marketCap={totalMarketCap}
          volume24h={totalVolume24h}
          gainers={topGainersAndLosers.gainers}
          losers={topGainersAndLosers.losers}
        />
        
        <div className="market-card mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <Tabs defaultValue="all" value={category} onValueChange={setCategory}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="gainers">Gainers</TabsTrigger>
                <TabsTrigger value="losers">Losers</TabsTrigger>
                <TabsTrigger value="volume">Volume</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search cryptocurrency..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-secondary/50 pl-9"
              />
            </div>
          </div>
          
          <CryptoTable />
        </div>
      </main>
    </div>
  );
};

export default Market;
