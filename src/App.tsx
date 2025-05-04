
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { ClerkLoaded } from '@clerk/clerk-react';
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Preferences from "./pages/Preferences";
import Barbers from "./pages/Barbers";
import HairAnalysis from "./pages/HairAnalysis";
import BarberProfile from "./pages/BarberProfile";
import BarberRegistration from "./pages/BarberRegistration";
import BarberDashboard from "./pages/BarberDashboard";
import UserProfile from "./pages/UserProfile";
import Bookings from "./pages/Bookings";
import NotFound from "./pages/NotFound";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCanceled from "./pages/PaymentCanceled";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSetup from "./pages/AdminSetup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ClerkLoaded>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/hair-analysis" element={<HairAnalysis />} />
            <Route path="/preferences" element={
              <ProtectedRoute>
                <Preferences />
              </ProtectedRoute>
            } />
            <Route path="/barbers" element={<Barbers />} />
            <Route path="/barbers/:id" element={<BarberProfile />} />
            <Route path="/user-profile" element={
              <ProtectedRoute requiredRole="customer">
                <UserProfile />
              </ProtectedRoute>
            } />
            <Route path="/bookings" element={
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            } />
            <Route path="/barber-registration" element={
              <ProtectedRoute>
                <BarberRegistration />
              </ProtectedRoute>
            } />
            <Route path="/barber-dashboard" element={
              <ProtectedRoute requiredRole="barber">
                <BarberDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin-dashboard" element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin-setup" element={<AdminSetup />} />
            <Route path="/payment-success" element={
              <ProtectedRoute>
                <PaymentSuccess />
              </ProtectedRoute>
            } />
            <Route path="/payment-canceled" element={
              <ProtectedRoute>
                <PaymentCanceled />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ClerkLoaded>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
