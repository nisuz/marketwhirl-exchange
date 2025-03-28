
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPortfolio } from '@/services/marketService';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUp, ArrowDown } from 'lucide-react';

const PortfolioSummary: React.FC = () => {
  const { data: portfolio, isLoading } = useQuery({
    queryKey: ['portfolio'],
    queryFn: getPortfolio
  });
  
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };
  
  const colors = [
    '#0052FE', '#16C784', '#F2A900', '#FF007A', '#E84142', '#627EEA', '#8C8C8C', '#26A17B'
  ];
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card p-3 border border-border rounded-md shadow-md">
          <p className="text-sm font-medium">{data.name} ({data.symbol})</p>
          <p className="text-sm text-muted-foreground">Amount: {data.amount} {data.symbol}</p>
          <p className="text-sm">Value: {formatCurrency(data.value)}</p>
          <p className="text-sm text-accent">Allocation: {data.allocation.toFixed(2)}%</p>
        </div>
      );
    }
    return null;
  };
  
  if (isLoading) {
    return (
      <div className="market-card">
        <h2 className="text-lg font-semibold mb-4">Portfolio Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-[200px] w-full" />
          </div>
          <div>
            <Skeleton className="h-[250px] w-full" />
          </div>
        </div>
      </div>
    );
  }
  
  if (!portfolio) {
    return <div className="market-card">Failed to load portfolio data</div>;
  }
  
  return (
    <div className="market-card">
      <h2 className="text-lg font-semibold mb-4">Portfolio Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-2xl font-bold">{formatCurrency(portfolio.totalValue)}</h3>
          <div className={`flex items-center mt-1 ${portfolio.change24h >= 0 ? 'price-up' : 'price-down'}`}>
            {portfolio.change24h >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            <span className="ml-1">{Math.abs(portfolio.change24h).toFixed(2)}%</span>
            <span className="text-muted-foreground ml-2">24h</span>
          </div>
          
          <div className="mt-6 space-y-3">
            {portfolio.assets.map((asset, index) => (
              <div key={asset.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colors[index % colors.length] }} />
                  <span>{asset.name}</span>
                </div>
                <span className="text-sm">{asset.allocation.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="h-[250px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={portfolio.assets}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
                nameKey="name"
                paddingAngle={2}
                labelLine={false}
              >
                {portfolio.assets.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={colors[index % colors.length]} 
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;
