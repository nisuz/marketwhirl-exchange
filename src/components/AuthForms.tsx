
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Apple, Facebook, Google, Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const emailSchema = z.string().email({ message: "Please enter a valid email address" });
const phoneSchema = z.string().min(10, { message: "Phone number must be at least 10 digits" });
const passwordSchema = z.string().min(8, { message: "Password must be at least 8 characters" });

export const LoginForm = () => {
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{identifier?: string, password?: string}>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: {identifier?: string, password?: string} = {};
    
    if (loginMethod === 'email') {
      try {
        emailSchema.parse(identifier);
      } catch (error) {
        if (error instanceof z.ZodError) {
          newErrors.identifier = error.errors[0]?.message;
        }
      }
    } else {
      try {
        phoneSchema.parse(identifier);
      } catch (error) {
        if (error instanceof z.ZodError) {
          newErrors.identifier = error.errors[0]?.message;
        }
      }
    }
    
    try {
      passwordSchema.parse(password);
    } catch (error) {
      if (error instanceof z.ZodError) {
        newErrors.password = error.errors[0]?.message;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate successful login
      toast({
        title: "Login successful",
        description: "Welcome back to MarketWhirl!",
      });
      navigate('/');
    }
  };
  
  const handleSocialLogin = (provider: string) => {
    toast({
      title: `${provider} login initiated`,
      description: `Logging in with ${provider}...`,
    });
    // In a real app, we would handle the social login here
    // For now, just simulate a successful login
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <Tabs defaultValue="credentials" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="credentials">Credentials</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
        </TabsList>
        
        <TabsContent value="credentials" className="space-y-4">
          <div className="space-y-2">
            <Tabs value={loginMethod} onValueChange={(v) => setLoginMethod(v as 'email' | 'phone')} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email" className="flex items-center gap-2">
                  <Mail size={16} /> Email
                </TabsTrigger>
                <TabsTrigger value="phone" className="flex items-center gap-2">
                  <Phone size={16} /> Phone
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identifier">
                {loginMethod === 'email' ? 'Email Address' : 'Phone Number'}
              </Label>
              <Input
                id="identifier"
                type={loginMethod === 'email' ? 'email' : 'tel'}
                placeholder={loginMethod === 'email' ? 'name@example.com' : '(123) 456-7890'}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
              {errors.identifier && (
                <p className="text-sm text-destructive">{errors.identifier}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-accent hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remember-me" 
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember-me" className="text-sm font-normal">
                Remember me
              </Label>
            </div>
            
            <Button type="submit" className="w-full">Sign In</Button>
          </form>
        </TabsContent>
        
        <TabsContent value="social" className="space-y-4">
          <div className="grid gap-4">
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={() => handleSocialLogin('Google')}
            >
              <Google className="mr-2 h-4 w-4" />
              Sign in with Google
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={() => handleSocialLogin('Facebook')}
            >
              <Facebook className="mr-2 h-4 w-4" />
              Sign in with Facebook
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={() => handleSocialLogin('Apple')}
            >
              <Apple className="mr-2 h-4 w-4" />
              Sign in with Apple
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">Don't have an account?</span>{" "}
        <a href="/signup" className="text-accent hover:underline">
          Sign up
        </a>
      </div>
    </div>
  );
};

export const SignupForm = () => {
  const [signupMethod, setSignupMethod] = useState<'email' | 'phone'>('email');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState<{identifier?: string, password?: string, confirmPassword?: string, terms?: string}>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: {identifier?: string, password?: string, confirmPassword?: string, terms?: string} = {};
    
    if (signupMethod === 'email') {
      try {
        emailSchema.parse(identifier);
      } catch (error) {
        if (error instanceof z.ZodError) {
          newErrors.identifier = error.errors[0]?.message;
        }
      }
    } else {
      try {
        phoneSchema.parse(identifier);
      } catch (error) {
        if (error instanceof z.ZodError) {
          newErrors.identifier = error.errors[0]?.message;
        }
      }
    }
    
    try {
      passwordSchema.parse(password);
    } catch (error) {
      if (error instanceof z.ZodError) {
        newErrors.password = error.errors[0]?.message;
      }
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }
    
    if (!agreeTerms) {
      newErrors.terms = "You must agree to the terms and conditions";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate successful signup
      toast({
        title: "Account created",
        description: "Welcome to MarketWhirl!",
      });
      navigate('/');
    }
  };
  
  const handleSocialSignup = (provider: string) => {
    toast({
      title: `${provider} signup initiated`,
      description: `Creating account with ${provider}...`,
    });
    // In a real app, we would handle the social signup here
    // For now, just simulate a successful signup
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <Tabs defaultValue="credentials" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="credentials">Credentials</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
        </TabsList>
        
        <TabsContent value="credentials" className="space-y-4">
          <div className="space-y-2">
            <Tabs value={signupMethod} onValueChange={(v) => setSignupMethod(v as 'email' | 'phone')} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email" className="flex items-center gap-2">
                  <Mail size={16} /> Email
                </TabsTrigger>
                <TabsTrigger value="phone" className="flex items-center gap-2">
                  <Phone size={16} /> Phone
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signup-identifier">
                {signupMethod === 'email' ? 'Email Address' : 'Phone Number'}
              </Label>
              <Input
                id="signup-identifier"
                type={signupMethod === 'email' ? 'email' : 'tel'}
                placeholder={signupMethod === 'email' ? 'name@example.com' : '(123) 456-7890'}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
              {errors.identifier && (
                <p className="text-sm text-destructive">{errors.identifier}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword}</p>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="agree-terms" 
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
              />
              <Label htmlFor="agree-terms" className="text-sm font-normal">
                I agree to the <a href="#" className="text-accent hover:underline">Terms of Service</a> and <a href="#" className="text-accent hover:underline">Privacy Policy</a>
              </Label>
            </div>
            {errors.terms && (
              <p className="text-sm text-destructive">{errors.terms}</p>
            )}
            
            <Button type="submit" className="w-full">Create Account</Button>
          </form>
        </TabsContent>
        
        <TabsContent value="social" className="space-y-4">
          <div className="grid gap-4">
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={() => handleSocialSignup('Google')}
            >
              <Google className="mr-2 h-4 w-4" />
              Sign up with Google
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={() => handleSocialSignup('Facebook')}
            >
              <Facebook className="mr-2 h-4 w-4" />
              Sign up with Facebook
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={() => handleSocialSignup('Apple')}
            >
              <Apple className="mr-2 h-4 w-4" />
              Sign up with Apple
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">Already have an account?</span>{" "}
        <a href="/login" className="text-accent hover:underline">
          Sign in
        </a>
      </div>
    </div>
  );
};
