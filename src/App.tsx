import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DigitalPage from "./pages/DigitalPage";
import FinancePage from "./pages/FinancePage";
import SustainabilityPage from "./pages/SustainabilityPage";
import PagerPage from "./pages/PagerPage";
import ReportPage from "./pages/ReportPage";
import NotFound from "./pages/NotFound";
import { I18nProvider } from "./i18n";
import { ThemeProvider } from "./theme/ThemeProvider";
import CopperRing from "./components/ring/CopperRing";
import QuestPaths from "./components/background/QuestPaths";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <I18nProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <QuestPaths />
            <CopperRing />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/digital" element={<DigitalPage />} />
              <Route path="/finance" element={<FinancePage />} />
              <Route path="/sustainability" element={<SustainabilityPage />} />
              <Route path="/pager" element={<PagerPage />} />
              <Route path="/report" element={<ReportPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>

        </TooltipProvider>
      </I18nProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
