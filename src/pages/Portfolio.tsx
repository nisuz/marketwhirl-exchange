
import React from 'react';
import NavBar from '@/components/NavBar';
import PortfolioSummary from '@/components/PortfolioSummary';
import OrderHistory from '@/components/OrderHistory';
import { useQuery } from '@tanstack/react-query';
import { getMarketData } from '@/services/marketService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Portfolio: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-1 px-4 py-6 max-w-7xl mx-auto mt-16 w-full">
        <h1 className="text-2xl font-bold mb-6">Portfolio</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <PortfolioSummary />
          </div>
          
          <div className="market-card">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-market-charcoal p-4 rounded-md text-center hover:bg-market-charcoal/80 transition-colors cursor-pointer">
                <div className="text-3xl mb-2">💰</div>
                <div className="font-medium">Deposit</div>
              </div>
              <div className="bg-market-charcoal p-4 rounded-md text-center hover:bg-market-charcoal/80 transition-colors cursor-pointer">
                <div className="text-3xl mb-2">💸</div>
                <div className="font-medium">Withdraw</div>
              </div>
              <div className="bg-market-charcoal p-4 rounded-md text-center hover:bg-market-charcoal/80 transition-colors cursor-pointer">
                <div className="text-3xl mb-2">🔄</div>
                <div className="font-medium">Trade</div>
              </div>
              <div className="bg-market-charcoal p-4 rounded-md text-center hover:bg-market-charcoal/80 transition-colors cursor-pointer">
                <div className="text-3xl mb-2">📊</div>
                <div className="font-medium">Analytics</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Order History</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <OrderHistory />
            </TabsContent>
            <TabsContent value="transactions">
              <div className="market-card">
                <div className="text-center py-8 text-muted-foreground">
                  No recent transactions
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reports">
              <div className="market-card">
                <div className="text-center py-8 text-muted-foreground">
                  No reports available
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Portfolio;
