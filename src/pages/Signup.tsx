
import React from 'react';
import { SignupForm } from '@/components/AuthForms';

const Signup: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-market-navy">
      <div className="hidden lg:block lg:w-1/2 bg-gradient-to-r from-market-navy to-secondary relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
          <div className="w-full max-w-lg">
            <h1 className="text-4xl font-bold text-white mb-6">Join MarketWhirl Today</h1>
            <p className="text-lg text-white/80 mb-8">
              Create an account to start trading, track investments, and take control of your financial future.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="bg-accent rounded-full p-2 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Free Account</h3>
                  <p className="text-white/70">Get started with a free account and explore the platform</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-accent rounded-full p-2 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Easy Setup</h3>
                  <p className="text-white/70">Create your account in minutes and start trading immediately</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-accent rounded-full p-2 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Demo Trading</h3>
                  <p className="text-white/70">Practice with virtual funds before investing real money</p>
                </div>
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
            <h2 className="text-2xl font-semibold text-white mb-2">Create Your Account</h2>
            <p className="text-muted-foreground">Sign up to start your trading journey</p>
          </div>
          
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default Signup;
