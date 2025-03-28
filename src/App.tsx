
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Market from "./pages/Market";
import Trade from "./pages/Trade";
import Portfolio from "./pages/Portfolio";
import QuickActions from "./pages/QuickActions";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./components/AuthContext";
import RequireAuth from "./components/RequireAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Auth routes - publicly accessible */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected routes - require authentication */}
            <Route path="/" element={<RequireAuth><Index /></RequireAuth>} />
            <Route path="/market" element={<RequireAuth><Market /></RequireAuth>} />
            <Route path="/trade" element={<RequireAuth><Trade /></RequireAuth>} />
            <Route path="/trade/:id" element={<RequireAuth><Trade /></RequireAuth>} />
            <Route path="/portfolio" element={<RequireAuth><Portfolio /></RequireAuth>} />
            <Route path="/quick-actions" element={<RequireAuth><QuickActions /></RequireAuth>} />
            
            {/* Fallback route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
