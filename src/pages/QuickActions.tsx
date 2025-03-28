
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, BarChart3, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPortfolio } from "@/services/marketService";

const QuickActions: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [depositAmount, setDepositAmount] = useState<string>('');
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  
  // Get portfolio data to show current balance
  const { data: portfolio, isLoading } = useQuery({
    queryKey: ['portfolio'],
    queryFn: getPortfolio
  });
  
  const handleDeposit = () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to deposit.",
        variant: "destructive",
      });
      return;
    }
    
    // This would normally call an API endpoint to process the deposit
    toast({
      title: "Deposit initiated",
      description: `$${depositAmount} is being deposited into your account.`,
    });
    setDepositAmount('');
  };
  
  const handleWithdraw = () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to withdraw.",
        variant: "destructive",
      });
      return;
    }
    
    // This would normally call an API endpoint to process the withdrawal
    toast({
      title: "Withdrawal initiated",
      description: `$${withdrawAmount} is being withdrawn from your account.`,
    });
    setWithdrawAmount('');
  };
  
  const handleNavigateToTrade = () => {
    navigate('/trade');
  };
  
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-1 px-4 py-6 max-w-7xl mx-auto mt-16 w-full">
        <h1 className="text-2xl font-bold mb-6">Quick Actions</h1>
        
        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <h2 className="text-lg font-medium mb-2">Available Balance</h2>
          {isLoading ? (
            <div className="animate-pulse h-8 w-32 bg-muted rounded-md"></div>
          ) : (
            <p className="text-2xl font-bold">{formatCurrency(portfolio?.totalValue || 0)}</p>
          )}
        </div>
        
        <Tabs defaultValue="deposit" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="deposit">Deposit</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
            <TabsTrigger value="trade">Trade</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="deposit">
            <Card>
              <CardHeader>
                <CardTitle>Deposit Funds</CardTitle>
                <CardDescription>Add money to your trading account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="deposit-amount">Amount</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 bg-secondary text-foreground border border-r-0 border-input rounded-l-md">
                        $
                      </span>
                      <Input
                        id="deposit-amount"
                        type="number"
                        placeholder="Enter amount"
                        className="rounded-l-none"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="payment-method">Payment Method</Label>
                    <select
                      id="payment-method"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    >
                      <option value="bank">Bank Transfer</option>
                      <option value="card">Credit/Debit Card</option>
                      <option value="paypal">PayPal</option>
                    </select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleDeposit} className="w-full">
                  <ArrowDown className="mr-2 h-4 w-4" />
                  Deposit Funds
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="withdraw">
            <Card>
              <CardHeader>
                <CardTitle>Withdraw Funds</CardTitle>
                <CardDescription>Withdraw money from your trading account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="withdraw-amount">Amount</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 bg-secondary text-foreground border border-r-0 border-input rounded-l-md">
                        $
                      </span>
                      <Input
                        id="withdraw-amount"
                        type="number"
                        placeholder="Enter amount"
                        className="rounded-l-none"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="withdraw-method">Withdrawal Method</Label>
                    <select
                      id="withdraw-method"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    >
                      <option value="bank">Bank Account</option>
                      <option value="paypal">PayPal</option>
                    </select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleWithdraw} className="w-full">
                  <ArrowUp className="mr-2 h-4 w-4" />
                  Withdraw Funds
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="trade">
            <Card>
              <CardHeader>
                <CardTitle>Quick Trade</CardTitle>
                <CardDescription>Start trading cryptocurrencies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Access our full trading interface with real-time charts, order books, and advanced trading tools.</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
                  <div className="bg-market-charcoal p-4 rounded-md text-center hover:bg-market-charcoal/80 transition-colors cursor-pointer">
                    <div className="text-3xl mb-2">₿</div>
                    <div className="font-medium">Bitcoin</div>
                  </div>
                  <div className="bg-market-charcoal p-4 rounded-md text-center hover:bg-market-charcoal/80 transition-colors cursor-pointer">
                    <div className="text-3xl mb-2">Ξ</div>
                    <div className="font-medium">Ethereum</div>
                  </div>
                  <div className="bg-market-charcoal p-4 rounded-md text-center hover:bg-market-charcoal/80 transition-colors cursor-pointer">
                    <div className="text-3xl mb-2">◎</div>
                    <div className="font-medium">Solana</div>
                  </div>
                  <div className="bg-market-charcoal p-4 rounded-md text-center hover:bg-market-charcoal/80 transition-colors cursor-pointer">
                    <div className="text-3xl mb-2">Ð</div>
                    <div className="font-medium">Dogecoin</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleNavigateToTrade} className="w-full">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Go to Trading Platform
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Analytics</CardTitle>
                <CardDescription>Analyze your trading performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-market-charcoal p-4 rounded-md">
                      <div className="text-muted-foreground text-sm mb-1">Total Gain/Loss</div>
                      <div className="text-xl font-bold text-market-positive">+$1,245.32</div>
                      <div className="text-xs text-market-positive">+12.4%</div>
                    </div>
                    <div className="bg-market-charcoal p-4 rounded-md">
                      <div className="text-muted-foreground text-sm mb-1">Total Trades</div>
                      <div className="text-xl font-bold">24</div>
                      <div className="text-xs text-muted-foreground">Last 30 days</div>
                    </div>
                    <div className="bg-market-charcoal p-4 rounded-md">
                      <div className="text-muted-foreground text-sm mb-1">Win Rate</div>
                      <div className="text-xl font-bold">68%</div>
                      <div className="text-xs text-muted-foreground">16/24 trades</div>
                    </div>
                  </div>
                  
                  <div className="h-64 bg-market-charcoal rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                      <p>Portfolio performance chart will be displayed here</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Detailed Analytics
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default QuickActions;
