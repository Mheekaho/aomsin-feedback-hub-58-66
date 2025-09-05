import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AomsinLogin from "./pages/AomsinLogin";
import Dashboard from "./pages/Dashboard";
import MarketConduct from "./pages/MarketConduct";
import NotFound from "./pages/NotFound";
import Aichatbot from "./pages/Aichatbot";
import RegionalDashboard from "./pages/RegionalDashboard";
import StrongComplaints from "./pages/StrongComplaints";
import CustomerFeedback from "./pages/CustomerFeedback";
import ForbiddenPage from "./pages/ForbiddenPage";
import ReferenceTables from "./pages/ReferenceTables";
import UserManagement from "./pages/UserManagement";
import { AppAuthProvider } from "@/auth/AppAuthContext";
import PrivateRoute from "@/auth/PrivateRoute";
import AdminRoute from "@/auth/AdminRoute";
import { AppLayout } from "@/components/layout/AppLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppAuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public route - Login */}
            <Route path="/" element={<AomsinLogin />} />
            <Route path="/403" element={<ForbiddenPage />} />
            
            {/* Private routes with layout */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
              <Route path="/market-conduct" element={<AppLayout><MarketConduct /></AppLayout>} />
              <Route path="/regional" element={<AppLayout><RegionalDashboard /></AppLayout>} />
              <Route path="/strong-complaints" element={<AppLayout><StrongComplaints /></AppLayout>} />
              <Route path="/customer-feedback" element={<AppLayout><CustomerFeedback /></AppLayout>} />
              <Route path="/reference-tables" element={<AppLayout><ReferenceTables /></AppLayout>} />
              
              {/* Admin-only routes */}
              <Route element={<AdminRoute />}>
                <Route path="/ai-chatbot" element={<AppLayout><Aichatbot /></AppLayout>} />
                <Route path="/admin/user-management" element={<AppLayout><UserManagement /></AppLayout>} />
              </Route>
            </Route>
            
            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppAuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;