import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Trophy, 
  Calendar, 
  FileText, 
  Image as ImageIcon, 
  Settings, 
  Bell,
  LogOut,
  ChevronRight,
  Newspaper,
  UserCheck,
  CreditCard,
  Zap,
  ShieldCheck,
  Radio,
  FileEdit,
  Handshake,
  Youtube
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

import customLogo from "@/assets/logo.jpg";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Users, label: "Players", path: "/admin/players" },
  { icon: Building2, label: "Clubs", path: "/admin/clubs" },
  { icon: ShieldCheck, label: "Admins", path: "/admin/users" },
  { icon: Calendar, label: "Events", path: "/admin/events" },
  { icon: Radio, label: "Broadcast", path: "/admin/broadcast" },
  { icon: FileEdit, label: "CMS Editor", path: "/admin/page-editor" },
  { icon: Trophy, label: "Matches", path: "/admin/matches" },
  { icon: Zap, label: "Live Scoring", path: "/admin/match-control" },
  { icon: Calendar, label: "Leagues", path: "/admin/leagues" },
  { icon: Handshake, label: "Sponsors", path: "/admin/sponsors" },
  { icon: Youtube, label: "Videos", path: "/admin/videos" },
  { icon: Newspaper, label: "News", path: "/admin/news" },
  { icon: UserCheck, label: "Selections", path: "/admin/selections" },
  { icon: CreditCard, label: "Billing", path: "/admin/billing" },
  { icon: ImageIcon, label: "Gallery", path: "/admin/gallery" },
  { icon: FileText, label: "Reports", path: "/admin/reports" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('ndca_token');
    localStorage.removeItem('ndca_user');
    navigate('/login');
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0B1220] border-r border-[#1F2937] flex flex-col z-50">
      <div className="p-6 flex items-center gap-3">
        <img src={customLogo} alt="NDCA Admin Logo" className="w-10 h-10 rounded-lg object-contain bg-[#1F2937]/50 p-1" />
        <div>
          <h1 className="text-xl font-display font-black tracking-tighter text-white uppercase leading-none">NDCA</h1>
          <p className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-widest mt-0.5">Admin Portal</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative",
                isActive 
                  ? "bg-[#FACC15]/10 text-[#FACC15]" 
                  : "text-[#9CA3AF] hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon size={20} className={cn("transition-transform duration-300", isActive ? "scale-110" : "group-hover:scale-110")} />
              <span className="text-sm font-bold uppercase tracking-wider font-sans">{item.label}</span>
              {isActive && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#FACC15] rounded-l-full shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
              )}
              {!isActive && (
                <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#1F2937]">
        <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-[#9CA3AF] hover:text-[#EF4444] transition-colors group">
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest font-sans">Logout System</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
