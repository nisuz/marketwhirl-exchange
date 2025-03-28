
import React from 'react';
import { 
  CircleDollarSign, 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  ArrowDownRight,
  ArrowUpRight
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface MarketStatsProps {
  isLoading?: boolean;
  marketCap?: number;
  volume24h?: number;
  gainers?: { name: string; symbol: string; change: number }[];
  losers?: { name: string; symbol: string; change: number }[];
}

const MarketStats: React.FC<MarketStatsProps> = ({
  isLoading = false,
  marketCap = 0,
  volume24h = 0,
  gainers = [],
  losers = []
}) => {
  const formatCurrency = (value: number): string => {
    if (value >= 1_000_000_000_000) {
      return `$${(value / 1_000_000_000_000).toFixed(2)}T`;
    }
    if (value >= 1_000_000_000) {
      return `$${(value / 1_000_000_000).toFixed(2)}B`;
    }
    if (value >= 1_000_000) {
      return `$${(value / 1_000_000).toFixed(2)}M`;
    }
    return `$${value.toFixed(2)}`;
  };
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-muted-foreground text-sm mb-1">
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-7 w-24 mb-1" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="p-2 rounded-full bg-secondary text-primary">
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-muted-foreground text-sm mb-1">
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-7 w-24 mb-1" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="p-2 rounded-full bg-secondary text-primary">
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium">Trending</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs text-muted-foreground mb-2 flex items-center">
                  <TrendingUp size={14} className="mr-1" /> Top Gainers
                </h4>
                <div className="space-y-2">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-xs text-muted-foreground mb-2 flex items-center">
                  <TrendingDown size={14} className="mr-1" /> Top Losers
                </h4>
                <div className="space-y-2">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-muted-foreground text-sm mb-1">
                Market Capitalization
              </div>
              <div className="text-xl font-bold mb-1">{formatCurrency(marketCap)}</div>
              <div className="text-xs text-market-positive flex items-center">
                <ArrowUpRight size={12} className="mr-1" />
                2.4% (24h)
              </div>
            </div>
            <div className="p-2 rounded-full bg-secondary text-primary">
              <CircleDollarSign size={20} />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-muted-foreground text-sm mb-1">
                24h Trading Volume
              </div>
              <div className="text-xl font-bold mb-1">{formatCurrency(volume24h)}</div>
              <div className="text-xs text-market-negative flex items-center">
                <ArrowDownRight size={12} className="mr-1" />
                3.1% (24h)
              </div>
            </div>
            <div className="p-2 rounded-full bg-secondary text-primary">
              <BarChart3 size={20} />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium">Trending</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs text-muted-foreground mb-2 flex items-center">
                <TrendingUp size={14} className="mr-1" /> Top Gainers
              </h4>
              <div className="space-y-2">
                {gainers.map((coin) => (
                  <div key={coin.symbol} className="flex items-center justify-between">
                    <div className="text-sm">{coin.symbol}</div>
                    <div className="text-market-positive text-sm">+{coin.change.toFixed(2)}%</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-xs text-muted-foreground mb-2 flex items-center">
                <TrendingDown size={14} className="mr-1" /> Top Losers
              </h4>
              <div className="space-y-2">
                {losers.map((coin) => (
                  <div key={coin.symbol} className="flex items-center justify-between">
                    <div className="text-sm">{coin.symbol}</div>
                    <div className="text-market-negative text-sm">{coin.change.toFixed(2)}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketStats;
