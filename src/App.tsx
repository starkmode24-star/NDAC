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
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/players" element={<PlayerManagement />} />
          <Route path="/admin/clubs" element={<ClubManagement />} />
          <Route path="/admin/matches" element={<MatchManagement />} />
          <Route path="/admin/match-control" element={<MatchController />} />
          <Route path="/admin/users" element={<UserAccess />} />
          <Route path="/admin/leagues" element={<LeagueManagement />} />
          <Route path="/admin/news" element={<NewsContent />} />
          <Route path="/admin/selections" element={<SelectionProcess />} />
          <Route path="/admin/billing" element={<Billing />} />
          <Route path="/admin/gallery" element={<GalleryAdmin />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/events" element={<EventsManager />} />
          <Route path="/admin/broadcast" element={<BroadcastCenter />} />
          <Route path="/admin/page-editor" element={<PageEditor />} />
          <Route path="/admin/sponsors" element={<SponsorManager />} />
          <Route path="/admin/videos" element={<VideoManager />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
