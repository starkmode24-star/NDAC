import { useState } from "react";
import { 
  Trophy, 
  Users, 
  Building2, 
  LayoutDashboard, 
  FileText, 
  Image as ImageIcon, 
  Bell, 
  Settings, 
  LogOut, 
  Menu,
  X,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreVertical,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const stats = [
    { label: "Active Tournaments", value: "12", icon: Trophy, color: "text-primary" },
    { label: "Total Players", value: "2,543", icon: Users, color: "text-blue-400" },
    { label: "Registered Clubs", value: "48", icon: Building2, color: "text-green-400" },
    { label: "Pending Approvals", value: "15", icon: Clock, color: "text-amber-400" },
  ];

  const pendingPlayers = [
    { name: "Rahul Dravid", club: "Nashik Lions", ageGroup: "U-19", date: "2 mins ago", status: "New" },
    { name: "Sunil Joshi", club: "MCC Club", ageGroup: "U-16", date: "1 hour ago", status: "Review" },
    { name: "Anil Kumble", club: "Deolali Raiders", ageGroup: "Senior", date: "4 hours ago", status: "New" },
    { name: "Javagal Srinath", club: "Nashik Lions", ageGroup: "U-16", date: "1 day ago", status: "New" },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-[#050810] text-foreground overflow-hidden font-sans">
      {/* Sidebar */}
      <aside 
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300 border-r border-white/5 bg-black/40 backdrop-blur-xl flex flex-col z-50`}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center flex-shrink-0">
            <span className="font-display font-black text-primary-foreground text-sm font-sans">N</span>
          </div>
          {sidebarOpen && (
            <span className="font-display text-xl font-black tracking-tighter uppercase whitespace-nowrap font-sans">
              NDCA ADMIN
            </span>
          )}
        </div>

        <nav className="flex-1 px-3 space-y-1">
          <SidebarLink icon={LayoutDashboard} label="Dashboard" active open={sidebarOpen} />
          <SidebarLink icon={Trophy} label="Leagues" open={sidebarOpen} />
          <SidebarLink icon={Users} label="Players" open={sidebarOpen} />
          <SidebarLink icon={Building2} label="Clubs" open={sidebarOpen} />
          <SidebarLink icon={ImageIcon} label="Gallery" open={sidebarOpen} />
          <SidebarLink icon={FileText} label="Reports" open={sidebarOpen} />
          <SidebarLink icon={Settings} label="Settings" open={sidebarOpen} />
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 text-muted-foreground hover:text-live-red transition-colors group"
          >
            <LogOut size={20} className="group-hover:translate-x-0.5 transition-transform" />
            {sidebarOpen && <span className="text-sm font-bold uppercase tracking-widest font-sans">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Header */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-black/20 backdrop-blur-md z-10">
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/5 rounded-lg text-muted-foreground"
            >
                {sidebarOpen ? <X size={20}/> : <Menu size={20}/>}
            </button>
            <div className="relative group w-64 hidden md:block">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search resources..."
                className="w-full bg-white/5 border border-white/5 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all font-sans"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-muted-foreground hover:text-foreground transition-all">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-live-red rounded-full border-2 border-[#050810]" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-white/5">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black uppercase tracking-widest font-sans leading-none">Super Admin</p>
                <p className="text-[10px] text-primary font-bold font-sans">Online</p>
              </div>
              <Avatar className="h-8 w-8 border border-primary/30">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold font-sans">AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8 relative scrollbar-hide">
          <div className="mb-8">
            <h1 className="text-3xl font-display font-black uppercase tracking-tight font-sans">Dashboard Overview</h1>
            <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold mt-1 font-sans">
                Welcome back, Admin. System Status: Optimal.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => (
              <Card key={stat.label} className="glass border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-2 rounded-lg bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                      <stat.icon size={20} />
                    </div>
                    <Badge variant="outline" className="text-[10px] border-white/10 uppercase tracking-tighter text-muted-foreground font-sans">+2.5%</Badge>
                  </div>
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider font-sans">{stat.label}</h3>
                  <p className="text-3xl font-display font-black font-sans mt-1">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Pending Approvals Section (2/3 width) */}
            <Card className="xl:col-span-2 glass border-white/5 bg-white/[0.02] overflow-hidden animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
                <div>
                  <CardTitle className="text-sm font-black uppercase tracking-widest font-sans">Registration Approvals</CardTitle>
                  <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground mt-1 font-sans">Pending validation for season 2025/26</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-[10px] font-bold uppercase font-sans">
                  View All
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-white/5">
                  {pendingPlayers.map((player) => (
                    <div key={player.name} className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary group-hover:bg-primary/20 transition-colors font-sans">
                          {player.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold font-sans">{player.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-muted-foreground uppercase font-sans font-bold">{player.club}</span>
                            <span className="text-[10px] text-muted-foreground opacity-30">•</span>
                            <span className="text-[10px] text-primary uppercase font-sans font-bold">{player.ageGroup}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase font-sans">{player.date}</p>
                          <Badge className={`text-[10px] uppercase font-sans font-bold ${player.status === 'New' ? 'bg-blue-500/10 text-blue-400' : 'bg-amber-500/10 text-amber-400'} border-0`}>
                            {player.status}
                          </Badge>
                        </div>
                        <Button variant="ghost" size="icon" className="text-muted-foreground">
                            <ChevronRight size={18} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions / Recent Activity (1/3 width) */}
            <Card className="glass border-white/5 bg-white/[0.02] animate-fade-up" style={{ animationDelay: '0.5s' }}>
                <CardHeader>
                    <CardTitle className="text-sm font-black uppercase tracking-widest font-sans">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3">
                    <ActionButton icon={Trophy} label="Create Match" />
                    <ActionButton icon={Users} label="Register Club" />
                    <ActionButton icon={ImageIcon} label="Upload Gallery" />
                    <ActionButton icon={FileText} label="Export Stats" />
                </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

const SidebarLink = ({ icon: Icon, label, active = false, open }: { icon: any, label: string, active?: boolean, open: boolean }) => (
  <a 
    href="#" 
    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all relative group ${
      active 
        ? "bg-primary/10 text-primary" 
        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
    }`}
  >
    <Icon size={20} />
    {open && <span className="text-xs font-bold uppercase tracking-wider font-sans leading-none">{label}</span>}
    {active && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-primary rounded-l-full shadow-[0_0_10px_rgba(255,184,0,0.5)]" />}
  </a>
);

const ActionButton = ({ icon: Icon, label }: { icon: any, label: string }) => (
    <button className="flex items-center justify-between w-full p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-primary/10 hover:border-primary/30 transition-all text-left group">
        <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                <Icon size={18} />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider font-sans group-hover:text-foreground">{label}</span>
        </div>
        <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
    </button>
);

const ArrowRight = ({ size, className }: { size: number, className: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
);

export default AdminDashboard;
