
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Menu, X, User, Search, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from './AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const NavBar: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/market', label: 'Market' },
    { path: '/trade', label: 'Trade' },
    { path: '/portfolio', label: 'Portfolio' }
  ];

  return (
    <nav className="bg-market-navy border-b border-border h-16 px-4 flex items-center justify-between fixed top-0 w-full z-50">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <span className="text-accent font-bold text-2xl mr-2">Market</span>
          <span className="text-white font-bold text-2xl">Whirl</span>
        </Link>
        
        {!isMobile && (
          <div className="ml-8 space-x-1">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  location.pathname === item.path
                    ? 'bg-secondary text-white'
                    : 'text-muted-foreground hover:text-white hover:bg-secondary/50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
      
      {!isMobile ? (
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-secondary/50 rounded-full h-9 pl-9 pr-4 w-64 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
          
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
                <Bell size={20} />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 p-0 overflow-hidden">
                    <Avatar>
                      <AvatarImage src={user?.avatar} alt={user?.name || "User"} />
                      <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-market-charcoal border-border">
                  <div className="flex items-center justify-start p-2 border-b border-border">
                    <Avatar className="h-9 w-9 mr-2">
                      <AvatarImage src={user?.avatar} alt={user?.name || "User"} />
                      <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{user?.name || "User"}</span>
                      <span className="text-xs text-muted-foreground">{user?.email || user?.phone || ""}</span>
                    </div>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link to="/portfolio" className="cursor-pointer">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/quick-actions" className="cursor-pointer">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex space-x-2">
              <Button variant="ghost" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center">
          {isAuthenticated && (
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white mr-2">
              <Bell size={20} />
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
          
          {isMobileMenuOpen && (
            <div className="absolute top-16 left-0 right-0 bg-market-navy border-b border-border p-4 flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-3 rounded-md text-sm font-medium ${
                    location.pathname === item.path
                      ? 'bg-secondary text-white'
                      : 'text-muted-foreground hover:text-white hover:bg-secondary/50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {isAuthenticated ? (
                <Button variant="destructive" className="mt-2" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </Button>
              ) : (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Button variant="outline" asChild>
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
