import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Chatbot } from "@/components/Chatbot";
import Dashboard from "./pages/Dashboard";
import Goals from "./pages/Goals";
import Calendar from "./pages/Calendar";
import HowItWorks from "./pages/HowItWorks";
import NotFound from "./pages/NotFound";
import Social from "./pages/Social";
import Pomodoro from "./pages/Pomodoro";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/goals" element={<Goals />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/social" element={<Social />} />
                <Route path="/pomodoro" element={<Pomodoro />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Chatbot />
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
