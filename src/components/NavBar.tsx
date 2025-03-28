
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Menu, X, User, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from '@/hooks/use-mobile';

const NavBar: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

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
          
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
            <Bell size={20} />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full bg-secondary h-9 w-9">
                <User size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Help</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex items-center">
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
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
