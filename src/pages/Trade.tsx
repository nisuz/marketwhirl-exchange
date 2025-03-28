
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMarketData } from '@/services/marketService';
import NavBar from '@/components/NavBar';
import PriceChart from '@/components/PriceChart';
import TradingForm from '@/components/TradingForm';
import OrderHistory from '@/components/OrderHistory';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const Trade: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const defaultCryptoId = 'bitcoin';
  const cryptoId = id || defaultCryptoId;
  
  const { data: cryptos, isLoading } = useQuery({
    queryKey: ['market-data'],
    queryFn: getMarketData
  });
  
  const crypto = React.useMemo(() => {
    if (!cryptos) return null;
    return cryptos.find(c => c.id === cryptoId) || cryptos[0];
  }, [cryptos, cryptoId]);
  
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-1 px-4 py-6 max-w-7xl mx-auto mt-16 w-full">
          <div className="flex items-center gap-2 mb-6">
            <Link to="/market" className="text-muted-foreground hover:text-white">
              <ChevronLeft size={20} />
            </Link>
            <Skeleton className="h-8 w-48" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <Skeleton className="h-[400px] w-full" />
            </div>
            <div>
              <Skeleton className="h-[400px] w-full" />
            </div>
          </div>
          
          <Skeleton className="h-[300px] w-full" />
        </main>
      </div>
    );
  }
  
  if (!crypto) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-1 px-4 py-6 max-w-7xl mx-auto mt-16 w-full">
          <div className="market-card">
            <h2 className="text-xl font-bold mb-4">Cryptocurrency not found</h2>
            <p className="mb-4">The cryptocurrency you are looking for does not exist or could not be loaded.</p>
            <Link 
              to="/market" 
              className="inline-flex items-center text-accent hover:text-accent/80"
            >
              <ChevronLeft size={16} className="mr-1" />
              Back to Market
            </Link>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-1 px-4 py-6 max-w-7xl mx-auto mt-16 w-full">
        <div className="flex items-center gap-2 mb-6">
          <Link to="/market" className="text-muted-foreground hover:text-white">
            <ChevronLeft size={20} />
          </Link>
          <div className="flex items-center gap-2">
            <img src={crypto.image} alt={crypto.name} className="w-8 h-8" />
            <h1 className="text-2xl font-bold">{crypto.name}</h1>
            <span className="text-muted-foreground">{crypto.symbol}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <PriceChart 
              cryptoId={crypto.id} 
              currentPrice={crypto.price} 
              priceChange24h={crypto.change24h} 
            />
          </div>
          
          <div>
            <TradingForm 
              cryptoName={crypto.name}
              cryptoSymbol={crypto.symbol}
              currentPrice={crypto.price}
            />
          </div>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <Tabs defaultValue="orders">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                  value="orders"
                  className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Order History
                </TabsTrigger>
                <TabsTrigger
                  value="market-data"
                  className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Market Data
                </TabsTrigger>
                <TabsTrigger
                  value="news"
                  className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  News & Updates
                </TabsTrigger>
              </TabsList>
              <TabsContent value="orders" className="p-0">
                <OrderHistory />
              </TabsContent>
              <TabsContent value="market-data" className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Market Cap</h3>
                    <p className="text-lg font-bold">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        notation: 'compact',
                        compactDisplay: 'short',
                        maximumFractionDigits: 2
                      }).format(crypto.marketCap)}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Volume (24h)</h3>
                    <p className="text-lg font-bold">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        notation: 'compact',
                        compactDisplay: 'short',
                        maximumFractionDigits: 2
                      }).format(crypto.volume24h)}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Price Change (24h)</h3>
                    <p className={`text-lg font-bold ${crypto.change24h >= 0 ? 'text-market-positive' : 'text-market-negative'}`}>
                      {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="news" className="p-4">
                <div className="text-center py-8 text-muted-foreground">
                  No recent news available
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Trade;
