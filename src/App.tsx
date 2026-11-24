import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import DigitalPage from "./pages/DigitalPage";
import FinancePage from "./pages/FinancePage";
import SustainabilityPage from "./pages/SustainabilityPage";
import SolutionsPage from "./pages/SolutionsPage";
import DemoPage from "./pages/DemoPage";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";
import BeneficiaryPage from "./pages/users/BeneficiaryPage";
import ProviderPage from "./pages/users/ProviderPage";
import DonorPage from "./pages/users/DonorPage";
import ConsortiumPage from "./pages/ConsortiumPage";
import NotFound from "./pages/NotFound";
import { I18nProvider } from "./i18n";
import { ThemeProvider } from "./theme/ThemeProvider";
import CopperRing from "./components/ring/CopperRing";
import PageCylinder from "./components/ring/PageCylinder";
import PageMetrics from "./components/ring/PageMetrics";
import QuestPaths from "./components/background/QuestPaths";
import { PageNavProvider } from "./context/PageNavContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <I18nProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <PageNavProvider>
              <QuestPaths />
              <CopperRing />
              <PageCylinder>
                {(location) => (
                  <>
              <PageMetrics />
              <Routes location={location}>
                <Route path="/" element={<Index />} />
                <Route path="/solutions" element={<SolutionsPage />} />
                <Route path="/solutions/digital" element={<DigitalPage />} />
                <Route path="/solutions/finance" element={<FinancePage />} />
                <Route path="/solutions/sustainability" element={<SustainabilityPage />} />
                {/* Legacy aliases so existing links keep working */}
                <Route path="/digital" element={<DigitalPage />} />
                <Route path="/finance" element={<FinancePage />} />
                <Route path="/sustainability" element={<SustainabilityPage />} />
                <Route path="/demo" element={<DemoPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/users/beneficiary" element={<BeneficiaryPage />} />
                <Route path="/users/provider" element={<ProviderPage />} />
                <Route path="/users/donor" element={<DonorPage />} />
                {/* Legacy /login → /users */}
                <Route path="/login" element={<Navigate to="/users" replace />} />
                <Route path="/login-legacy" element={<LoginPage />} />
                <Route path="/consortium" element={<ConsortiumPage />} />
                {/* Retired routes — send to their new homes */}
                <Route path="/pager" element={<Navigate to="/demo" replace />} />
                <Route path="/report" element={<Navigate to="/solutions" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
                  </>
                )}
              </PageCylinder>
            </PageNavProvider>
          </BrowserRouter>
        </TooltipProvider>
      </I18nProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
