import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ComparisonProvider } from "@/contexts/ComparisonContext";
import Index from "./pages/Index";
import VehicleListingPage from "./pages/VehicleListingPage";
import VehicleDetailPage from "./pages/VehicleDetailPage";
import ComparisonPage from "./pages/ComparisonPage";
import EMICalculatorPage from "./pages/EMICalculatorPage";
import FuelCalculatorPage from "./pages/FuelCalculatorPage";
import UpcomingLaunchesPage from "./pages/UpcomingLaunchesPage";
import DealerLocatorPage from "./pages/DealerLocatorPage";
import TestRideBookingPage from "./pages/TestRideBookingPage";
import UsedVehiclesPage from "./pages/UsedVehiclesPage";
import SellVehiclePage from "./pages/SellVehiclePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ComparisonProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/vehicles" element={<VehicleListingPage />} />
          <Route path="/vehicle/:id/:slug?" element={<VehicleDetailPage />} />
          <Route path="/compare" element={<ComparisonPage />} />
          <Route path="/emi-calculator" element={<EMICalculatorPage />} />
          <Route path="/fuel-calculator" element={<FuelCalculatorPage />} />
          <Route path="/upcoming" element={<UpcomingLaunchesPage />} />
          <Route path="/dealers" element={<DealerLocatorPage />} />
          <Route path="/test-ride" element={<TestRideBookingPage />} />
          <Route path="/used" element={<UsedVehiclesPage />} />
          <Route path="/sell" element={<SellVehiclePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<UserDashboardPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </ComparisonProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
