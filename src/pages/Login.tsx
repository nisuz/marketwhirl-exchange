
import React from 'react';
import { LoginForm } from '@/components/AuthForms';

const Login: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-market-navy">
      <div className="hidden lg:block lg:w-1/2 bg-gradient-to-r from-market-navy to-secondary relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
          <div className="w-full max-w-lg">
            <h1 className="text-4xl font-bold text-white mb-6">Welcome Back to MarketWhirl</h1>
            <p className="text-lg text-white/80 mb-8">
              Sign in to access your portfolio, track your investments, and trade with confidence.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-accent text-xl font-bold mb-2">Real-time Trading</div>
                <p className="text-white/70">Access live market data and execute trades instantly</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-accent text-xl font-bold mb-2">Portfolio Tracking</div>
                <p className="text-white/70">Monitor your investments and performance in real-time</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-accent text-xl font-bold mb-2">Advanced Analytics</div>
                <p className="text-white/70">Get insights with powerful trading tools and charts</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-accent text-xl font-bold mb-2">Secure Platform</div>
                <p className="text-white/70">Trade with confidence on our secure platform</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <span className="text-accent font-bold text-3xl mr-2">Market</span>
              <span className="text-white font-bold text-3xl">Whirl</span>
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">Sign In to Your Account</h2>
            <p className="text-muted-foreground">Enter your credentials to access your account</p>
          </div>
          
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
