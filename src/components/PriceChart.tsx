
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCandlestickData } from '@/services/marketService';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { CandlestickData } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

interface PriceChartProps {
  cryptoId: string;
  currentPrice: number;
  priceChange24h: number;
}

const PriceChart: React.FC<PriceChartProps> = ({ 
  cryptoId, 
  currentPrice,
  priceChange24h 
}) => {
  const [timeframe, setTimeframe] = React.useState('1m');
  
  const { data: chartData, isLoading } = useQuery({
    queryKey: ['candlestick', cryptoId, timeframe],
    queryFn: () => getCandlestickData(cryptoId, timeframe)
  });
  
  const formatData = (data: CandlestickData[]) => {
    return data.map(item => ({
      date: item.time,
      price: item.close
    }));
  };
  
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: value < 1 ? 4 : 2,
      maximumFractionDigits: value < 1 ? 6 : 2,
    }).format(value);
  };
  
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 border border-border rounded-md shadow-md">
          <p className="text-sm font-medium">{formatDate(label)}</p>
          <p className="text-sm text-accent">
            Price: <span className="font-medium">{formatCurrency(payload[0].value)}</span>
          </p>
        </div>
      );
    }
    return null;
  };
  
  if (isLoading) {
    return (
      <div className="market-card">
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }
  
  const formattedData = chartData ? formatData(chartData) : [];
  const isPositive = priceChange24h >= 0;
  const gradientColor = isPositive ? '#16C784' : '#EA3943';
  
  return (
    <div className="market-card">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold">{formatCurrency(currentPrice)}</h2>
          <div className={`flex items-center mt-1 ${isPositive ? 'price-up' : 'price-down'}`}>
            <span>{isPositive ? '▲' : '▼'}</span>
            <span className="ml-1">{Math.abs(priceChange24h).toFixed(2)}%</span>
            <span className="text-muted-foreground ml-2">24h</span>
          </div>
        </div>
        
        <Tabs defaultValue="1m" value={timeframe} onValueChange={setTimeframe} className="mt-4 md:mt-0">
          <TabsList className="bg-market-charcoal">
            <TabsTrigger value="1d">1D</TabsTrigger>
            <TabsTrigger value="1w">1W</TabsTrigger>
            <TabsTrigger value="1m">1M</TabsTrigger>
            <TabsTrigger value="3m">3M</TabsTrigger>
            <TabsTrigger value="1y">1Y</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={formattedData}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={gradientColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={gradientColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#222531" vertical={false} />
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#808A9D', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#222531' }}
              tickFormatter={formatDate}
              minTickGap={30}
            />
            <YAxis 
              tick={{ fill: '#808A9D', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              domain={['auto', 'auto']}
              tickFormatter={(value) => formatCurrency(value)}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={currentPrice} stroke="#FFFFFF" strokeDasharray="3 3" />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke={gradientColor}
              fillOpacity={1}
              fill="url(#colorPrice)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceChart;
