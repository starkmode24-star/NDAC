import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Users, Building2, Clock, ArrowUpRight, TrendingUp, Loader2 } from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "@/lib/api";

const Dashboard = () => {
  const { data: statsData, isLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const response = await dashboardApi.getStats();
      return response.data;
    }
  });

  if (isLoading) {
    return <AdminLayout><div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#FACC15]" size={40} /></div></AdminLayout>;
  }

  const statsList = [
    { label: "Total Players", value: statsData?.totalPlayers || 0, icon: Users, trend: "Overall", color: "text-[#FACC15]" },
    { label: "Active Clubs", value: statsData?.activeClubs || 0, icon: Building2, trend: "Approved", color: "text-blue-400" },
    { label: "Matches Today", value: statsData?.matchesToday || 0, icon: Trophy, trend: "Today", color: "text-[#EF4444]" },
    { label: "Pending Approvals", value: statsData?.pendingApprovals || 0, icon: Clock, trend: "Action Required", color: "text-amber-400" },
  ];

  const recentLogs = statsData?.recentActivity || [];
  const chartData = statsData?.trafficData || [];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-display font-black uppercase tracking-tight text-white">Dashboard Overview</h1>
        <p className="text-[#9CA3AF] text-sm font-bold uppercase tracking-widest mt-1">
          Welcome back, Admin. System monitoring active. Direct Database Sync Enabled.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsList.map((stat, i) => (
          <Card key={stat.label} className="bg-[#111827] border-[#1F2937] hover:border-[#FACC15]/30 transition-all group animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-[#0B1220] ${stat.color} group-hover:scale-110 transition-transform shadow-lg`}>
                  <stat.icon size={24} />
                </div>
                <Badge variant="outline" className="text-[10px] border-[#FACC15]/20 text-[#FACC15] uppercase tracking-tighter bg-[#FACC15]/5">
                  {stat.trend}
                </Badge>
              </div>
              <h3 className="text-sm font-bold text-[#9CA3AF] uppercase tracking-wider font-sans">{stat.label}</h3>
              <p className="text-3xl font-display font-black text-white mt-1">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Charts Section */}
        <Card className="xl:col-span-2 bg-[#111827] border-[#1F2937]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg font-display font-black uppercase text-white">System Traffic</CardTitle>
              <CardDescription className="text-xs text-[#9CA3AF] font-bold uppercase">Daily user activity overview</CardDescription>
            </div>
            <div className="flex items-center gap-2 text-[#FACC15]">
              <TrendingUp size={16} />
              <span className="text-xs font-bold font-sans">15.4% increase</span>
            </div>
          </CardHeader>
          <CardContent className="pt-4 h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FACC15" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FACC15" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#9CA3AF" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="#9CA3AF" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px' }}
                  itemStyle={{ color: '#FACC15', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#FACC15" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorScore)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-[#111827] border-[#1F2937]">
          <CardHeader>
            <CardTitle className="text-lg font-display font-black uppercase text-white">Recent Logs</CardTitle>
            <CardDescription className="text-xs text-[#9CA3AF] font-bold uppercase">System-wide event tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {recentLogs.length === 0 && (
              <p className="text-[#9CA3AF] text-xs font-bold uppercase py-4">No recent activity.</p>
            )}
            {recentLogs.map((activity: any, i: number) => (
              <div key={activity.id} className="flex gap-4 group animate-fade-in" style={{ animationDelay: `${i * 0.15 + 0.5}s` }}>
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#0B1220] border border-[#1F2937] flex items-center justify-center text-[#FACC15] group-hover:border-[#FACC15]/50 transition-colors">
                    <ArrowUpRight size={18} />
                  </div>
                  {i !== recentLogs.length - 1 && (
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-[#1F2937]" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-white font-sans">{activity.title}</p>
                  <p className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-widest mt-0.5">{new Date(activity.time).toLocaleString()} • {activity.type}</p>
                  <Badge className="mt-2 bg-[#FACC15]/10 text-[#FACC15] border-0 text-[10px] font-black uppercase">
                    {activity.status}
                  </Badge>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4 border-[#1F2937] bg-transparent text-[#9CA3AF] hover:text-white hover:bg-white/5 uppercase text-[10px] font-black tracking-widest">
              View All Logs
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
