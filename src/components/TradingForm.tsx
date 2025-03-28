
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from '@tanstack/react-query';
import { placeOrder } from '@/services/marketService';
import { useIsMobile } from '@/hooks/use-mobile';

interface TradingFormProps {
  cryptoName: string;
  cryptoSymbol: string;
  currentPrice: number;
}

const TradingForm: React.FC<TradingFormProps> = ({ 
  cryptoName, 
  cryptoSymbol, 
  currentPrice 
}) => {
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState<string>('');
  const [total, setTotal] = useState<string>('');
  const [sliderValue, setSliderValue] = useState<number[]>([0]);
  
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const balances = {
    crypto: 2.5, // Example balance in crypto units
    fiat: 50000, // Example balance in USD
  };
  
  // Reset form when order type changes
  React.useEffect(() => {
    setAmount('');
    setTotal('');
    setSliderValue([0]);
  }, [orderType]);
  
  // Update total when amount changes
  React.useEffect(() => {
    if (amount) {
      setTotal((parseFloat(amount) * currentPrice).toFixed(2));
    }
  }, [amount, currentPrice]);
  
  // Update amount when total changes
  React.useEffect(() => {
    if (total) {
      setAmount((parseFloat(total) / currentPrice).toFixed(8));
    }
  }, [total, currentPrice]);
  
  const handleAmountChange = (value: string) => {
    setAmount(value);
    const parsedValue = parseFloat(value) || 0;
    const maxBalance = orderType === 'buy' ? balances.fiat / currentPrice : balances.crypto;
    const percentage = (parsedValue / maxBalance) * 100;
    setSliderValue([Math.min(100, percentage)]);
  };
  
  const handleTotalChange = (value: string) => {
    setTotal(value);
    const parsedValue = parseFloat(value) || 0;
    const maxBalance = orderType === 'buy' ? balances.fiat : balances.crypto * currentPrice;
    const percentage = (parsedValue / maxBalance) * 100;
    setSliderValue([Math.min(100, percentage)]);
  };
  
  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    const percentage = value[0];
    
    if (orderType === 'buy') {
      const maxFiat = balances.fiat;
      const newTotal = (maxFiat * percentage / 100).toFixed(2);
      setTotal(newTotal);
      setAmount((parseFloat(newTotal) / currentPrice).toFixed(8));
    } else {
      const maxCrypto = balances.crypto;
      const newAmount = (maxCrypto * percentage / 100).toFixed(8);
      setAmount(newAmount);
      setTotal((parseFloat(newAmount) * currentPrice).toFixed(2));
    }
  };
  
  const orderMutation = useMutation({
    mutationFn: placeOrder,
    onSuccess: () => {
      toast({
        title: "Order Placed",
        description: `Successfully placed ${orderType} order for ${amount} ${cryptoSymbol}`,
      });
      
      // Reset form
      setAmount('');
      setTotal('');
      setSliderValue([0]);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const parsedAmount = parseFloat(amount);
    const parsedTotal = parseFloat(total);
    
    if (!parsedAmount || !parsedTotal) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid amount and total",
        variant: "destructive",
      });
      return;
    }
    
    if (orderType === 'buy' && parsedTotal > balances.fiat) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough balance to place this order",
        variant: "destructive",
      });
      return;
    }
    
    if (orderType === 'sell' && parsedAmount > balances.crypto) {
      toast({
        title: "Insufficient Balance",
        description: `You don't have enough ${cryptoSymbol} to place this order`,
        variant: "destructive",
      });
      return;
    }
    
    orderMutation.mutate({
      type: orderType,
      crypto: cryptoName,
      price: currentPrice,
      amount: parsedAmount,
      total: parsedTotal,
    });
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
    <div className="market-card">
      <Tabs defaultValue="buy" onValueChange={(value) => setOrderType(value as 'buy' | 'sell')}>
        <TabsList className="w-full grid grid-cols-2 mb-4">
          <TabsTrigger value="buy" className="text-sm">Buy {cryptoSymbol}</TabsTrigger>
          <TabsTrigger value="sell" className="text-sm">Sell {cryptoSymbol}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="buy" className="pt-2">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm text-muted-foreground">Available Balance</label>
                <span className="text-sm font-medium">{formatCurrency(balances.fiat)}</span>
              </div>
              
              <div className="bg-market-charcoal p-4 rounded-md mb-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-muted-foreground">Current Price</div>
                  <div className="font-medium">{formatCurrency(currentPrice)}</div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground block mb-1">
                      Amount ({cryptoSymbol})
                    </label>
                    <Input
                      type="number"
                      placeholder={`0.00 ${cryptoSymbol}`}
                      value={amount}
                      onChange={(e) => handleAmountChange(e.target.value)}
                      className="bg-secondary/50"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground block mb-1">
                      Total (USD)
                    </label>
                    <Input
                      type="number"
                      placeholder="0.00 USD"
                      value={total}
                      onChange={(e) => handleTotalChange(e.target.value)}
                      className="bg-secondary/50"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-2">
                      <span>0%</span>
                      <span>25%</span>
                      <span>50%</span>
                      <span>75%</span>
                      <span>100%</span>
                    </div>
                    <Slider
                      value={sliderValue}
                      onValueChange={handleSliderChange}
                      max={100}
                      step={1}
                      className="mb-2"
                    />
                    <div className="grid grid-cols-4 gap-2">
                      {[25, 50, 75, 100].map((percentage) => (
                        <Button
                          key={percentage}
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => handleSliderChange([percentage])}
                        >
                          {percentage}%
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-market-positive hover:bg-market-positive/90 text-white"
                disabled={orderMutation.isPending || !amount || !total}
              >
                {orderMutation.isPending ? "Processing..." : `Buy ${cryptoSymbol}`}
              </Button>
            </div>
          </form>
        </TabsContent>
        
        <TabsContent value="sell" className="pt-2">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm text-muted-foreground">Available {cryptoSymbol}</label>
                <span className="text-sm font-medium">{balances.crypto} {cryptoSymbol}</span>
              </div>
              
              <div className="bg-market-charcoal p-4 rounded-md mb-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-muted-foreground">Current Price</div>
                  <div className="font-medium">{formatCurrency(currentPrice)}</div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground block mb-1">
                      Amount ({cryptoSymbol})
                    </label>
                    <Input
                      type="number"
                      placeholder={`0.00 ${cryptoSymbol}`}
                      value={amount}
                      onChange={(e) => handleAmountChange(e.target.value)}
                      className="bg-secondary/50"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground block mb-1">
                      Total (USD)
                    </label>
                    <Input
                      type="number"
                      placeholder="0.00 USD"
                      value={total}
                      onChange={(e) => handleTotalChange(e.target.value)}
                      className="bg-secondary/50"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-2">
                      <span>0%</span>
                      <span>25%</span>
                      <span>50%</span>
                      <span>75%</span>
                      <span>100%</span>
                    </div>
                    <Slider
                      value={sliderValue}
                      onValueChange={handleSliderChange}
                      max={100}
                      step={1}
                      className="mb-2"
                    />
                    <div className="grid grid-cols-4 gap-2">
                      {[25, 50, 75, 100].map((percentage) => (
                        <Button
                          key={percentage}
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => handleSliderChange([percentage])}
                        >
                          {percentage}%
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-market-negative hover:bg-market-negative/90 text-white"
                disabled={orderMutation.isPending || !amount || !total}
              >
                {orderMutation.isPending ? "Processing..." : `Sell ${cryptoSymbol}`}
              </Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TradingForm;
