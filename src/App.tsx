import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Login from "./pages/Login.tsx";
import AboutUs from "./pages/public/AboutUs.tsx";
import Information from "./pages/public/Information.tsx";
import Infrastructure from "./pages/public/Infrastructure.tsx";
import HallOfFame from "./pages/public/HallOfFame.tsx";
import Sponsors from "./pages/public/Sponsors.tsx";
import Contact from "./pages/public/Contact.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import PlayerManagement from "./pages/admin/PlayerManagement.tsx";
import ClubManagement from "./pages/admin/ClubManagement.tsx";
import MatchManagement from "./pages/admin/MatchManagement.tsx";
import LeagueManagement from "./pages/admin/LeagueManagement.tsx";
import NewsContent from "./pages/admin/NewsContent.tsx";
import SelectionProcess from "./pages/admin/SelectionProcess.tsx";
import Billing from "./pages/admin/Billing.tsx";
import MatchController from "./pages/admin/MatchController.tsx";
import UserAccess from "./pages/admin/UserAccess.tsx";
import GalleryAdmin from "./pages/admin/GalleryAdmin.tsx";
import Reports from "./pages/admin/Reports.tsx";
import Settings from "./pages/admin/Settings.tsx";
import EventsManager from "./pages/admin/EventsManager.tsx";
import BroadcastCenter from "./pages/admin/BroadcastCenter.tsx";
import PageEditor from "./pages/admin/PageEditor.tsx";
import SponsorManager from "./pages/admin/SponsorManager.tsx";
import VideoManager from "./pages/admin/VideoManager.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('ndca_token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/information" element={<Information />} />
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/hall-of-fame" element={<HallOfFame />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
          <Route path="/admin/players" element={<AdminRoute><PlayerManagement /></AdminRoute>} />
          <Route path="/admin/clubs" element={<AdminRoute><ClubManagement /></AdminRoute>} />
          <Route path="/admin/matches" element={<AdminRoute><MatchManagement /></AdminRoute>} />
          <Route path="/admin/match-control" element={<AdminRoute><MatchController /></AdminRoute>} />
          <Route path="/admin/match-control/:id" element={<AdminRoute><MatchController /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><UserAccess /></AdminRoute>} />
          <Route path="/admin/leagues" element={<AdminRoute><LeagueManagement /></AdminRoute>} />
          <Route path="/admin/news" element={<AdminRoute><NewsContent /></AdminRoute>} />
          <Route path="/admin/selections" element={<AdminRoute><SelectionProcess /></AdminRoute>} />
          <Route path="/admin/billing" element={<AdminRoute><Billing /></AdminRoute>} />
          <Route path="/admin/gallery" element={<AdminRoute><GalleryAdmin /></AdminRoute>} />
          <Route path="/admin/reports" element={<AdminRoute><Reports /></AdminRoute>} />
          <Route path="/admin/settings" element={<AdminRoute><Settings /></AdminRoute>} />
          <Route path="/admin/events" element={<AdminRoute><EventsManager /></AdminRoute>} />
          <Route path="/admin/broadcast" element={<AdminRoute><BroadcastCenter /></AdminRoute>} />
          <Route path="/admin/page-editor" element={<AdminRoute><PageEditor /></AdminRoute>} />
          <Route path="/admin/sponsors" element={<AdminRoute><SponsorManager /></AdminRoute>} />
          <Route path="/admin/videos" element={<AdminRoute><VideoManager /></AdminRoute>} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
