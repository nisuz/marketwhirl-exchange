
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMarketData } from '@/services/marketService';
import { ChevronUp, ChevronDown, ArrowUpDown } from 'lucide-react';
import { CryptoCurrency } from '@/data/mockData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

type SortField = 'price' | 'change24h' | 'volume24h' | 'marketCap';
type SortDirection = 'asc' | 'desc';

const CryptoTable: React.FC = () => {
  const [sortField, setSortField] = React.useState<SortField>('marketCap');
  const [sortDirection, setSortDirection] = React.useState<SortDirection>('desc');
  
  const { data: cryptos, isLoading } = useQuery({
    queryKey: ['market-data'],
    queryFn: getMarketData
  });
  
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  const sortedCryptos = React.useMemo(() => {
    if (!cryptos) return [];
    
    return [...cryptos].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      const comparison = aValue > bValue ? 1 : -1;
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [cryptos, sortField, sortDirection]);
  
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: value < 1 ? 4 : 2,
      maximumFractionDigits: value < 1 ? 6 : 2,
    }).format(value);
  };
  
  const formatLargeNumber = (value: number): string => {
    if (value >= 1_000_000_000) {
      return `$${(value / 1_000_000_000).toFixed(2)}B`;
    }
    if (value >= 1_000_000) {
      return `$${(value / 1_000_000).toFixed(2)}M`;
    }
    return formatCurrency(value);
  };
  
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown size={14} />;
    return sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };
  
  if (isLoading) {
    return (
      <div className="market-card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Market Overview</h2>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>24h %</TableHead>
                <TableHead>Volume (24h)</TableHead>
                <TableHead>Market Cap</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array(8).fill(0).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Skeleton className="h-8 w-8 rounded-full mr-2" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </TableCell>
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
  
  return (
    <div className="market-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Market Overview</h2>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead 
                className="cursor-pointer hover:text-accent transition-colors"
                onClick={() => handleSort('price')}
              >
                <div className="flex items-center space-x-1">
                  <span>Price</span>
                  {renderSortIcon('price')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:text-accent transition-colors"
                onClick={() => handleSort('change24h')}
              >
                <div className="flex items-center space-x-1">
                  <span>24h %</span>
                  {renderSortIcon('change24h')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:text-accent transition-colors"
                onClick={() => handleSort('volume24h')}
              >
                <div className="flex items-center space-x-1">
                  <span>Volume (24h)</span>
                  {renderSortIcon('volume24h')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:text-accent transition-colors"
                onClick={() => handleSort('marketCap')}
              >
                <div className="flex items-center space-x-1">
                  <span>Market Cap</span>
                  {renderSortIcon('marketCap')}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCryptos.map((crypto: CryptoCurrency, index: number) => (
              <TableRow key={crypto.id} className="hover:bg-secondary/20">
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <Link to={`/trade/${crypto.id}`} className="flex items-center">
                    <img src={crypto.image} alt={crypto.name} className="w-6 h-6 mr-2" />
                    <span className="font-medium">{crypto.name}</span>
                    <span className="text-muted-foreground ml-2">{crypto.symbol}</span>
                  </Link>
                </TableCell>
                <TableCell>{formatCurrency(crypto.price)}</TableCell>
                <TableCell>
                  <div className={crypto.change24h >= 0 ? 'price-up' : 'price-down'} style={{ display: 'flex', alignItems: 'center' }}>
                    {crypto.change24h >= 0 ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    {Math.abs(crypto.change24h).toFixed(2)}%
                  </div>
                </TableCell>
                <TableCell>{formatLargeNumber(crypto.volume24h)}</TableCell>
                <TableCell>{formatLargeNumber(crypto.marketCap)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CryptoTable;
