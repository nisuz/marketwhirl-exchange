
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getOrders } from '@/services/marketService';
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const OrderHistory: React.FC = () => {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders
  });
  
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };
  
  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  if (isLoading) {
    return (
      <div className="market-card">
        <h2 className="text-lg font-semibold mb-4">Order History</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Cryptocurrency</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array(5).fill(0).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
  
  if (!orders || orders.length === 0) {
    return (
      <div className="market-card">
        <h2 className="text-lg font-semibold mb-4">Order History</h2>
        <div className="text-center py-8 text-muted-foreground">
          No orders found
        </div>
      </div>
    );
  }
  
  return (
    <div className="market-card">
      <h2 className="text-lg font-semibold mb-4">Order History</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Cryptocurrency</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${
                      order.type === 'buy' ? 'border-market-positive text-market-positive' : 'border-market-negative text-market-negative'
                    }`}
                  >
                    {order.type.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>{order.crypto}</TableCell>
                <TableCell>{formatCurrency(order.price)}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>{formatCurrency(order.total)}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`
                      ${order.status === 'completed' ? 'border-market-positive text-market-positive' : ''}
                      ${order.status === 'pending' ? 'border-market-blue text-market-blue' : ''}
                      ${order.status === 'canceled' ? 'border-market-neutral text-market-neutral' : ''}
                    `}
                  >
                    {order.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(order.timestamp)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrderHistory;
