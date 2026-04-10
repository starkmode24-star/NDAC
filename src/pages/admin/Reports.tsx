import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileBox, 
  Download, 
  Filter, 
  Calendar, 
  ChevronDown, 
  BarChart3, 
  PieChart as PieIcon, 
  LineChart as LineIcon,
  TrendingUp,
  ArrowDownRight,
  Printer,
  Users,
  FileDown
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { reportApi } from "@/lib/api";
import { toast } from "sonner";
import { useState } from "react";

const data = [
  { name: 'District A', players: 120, matches: 45 },
  { name: 'District B', players: 98, matches: 32 },
  { name: 'District C', players: 156, matches: 64 },
  { name: 'District D', players: 78, matches: 28 },
  { name: 'District E', players: 110, matches: 50 },
];

const pieData = [
  { name: 'Batsman', value: 400 },
  { name: 'Bowler', value: 300 },
  { name: 'All-Rounder', value: 300 },
];

const COLORS = ['#FACC15', '#3B82F6', '#EF4444'];

const Reports = () => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = (type: string) => {
    setIsExporting(true);
    const url = reportApi.getDownloadUrl(type);
    window.open(url, '_blank');
    toast.success(`${type} report requested`);
    setTimeout(() => setIsExporting(false), 2000);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-display font-black uppercase tracking-tight text-white">Analytics & Reports</h1>
          <p className="text-[#9CA3AF] text-sm font-bold uppercase tracking-widest mt-1">
            Data visualization and performance metrics for NDCA.
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="h-12 border-[#1F2937] text-white font-black uppercase tracking-widest text-[10px] bg-[#111827]">
            <Printer size={16} className="mr-2" />
            Print Status
          </Button>
          <div className="flex gap-2">
             <Button 
                onClick={() => handleExport('players')}
                disabled={isExporting}
                className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0B1220] font-black uppercase tracking-widest text-[10px] px-4 h-12 rounded-xl"
              >
              <Users size={16} className="mr-2" />
              Players CSV
            </Button>
            <Button 
                onClick={() => handleExport('matches')}
                disabled={isExporting}
                className="bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white font-black uppercase tracking-widest text-[10px] px-4 h-12 rounded-xl"
              >
              <FileDown size={16} className="mr-2" />
              Matches CSV
            </Button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="bg-[#111827] border-[#1F2937] mb-8">
        <CardContent className="p-4 flex flex-wrap gap-4 items-center">
          <Button variant="ghost" className="text-white font-bold h-10 px-4 hover:bg-white/5 border border-[#1F2937] flex items-center justify-between min-w-[180px]">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-[#FACC15]" />
              <span className="text-xs font-black uppercase">Season 2025/26</span>
            </div>
            <ChevronDown size={14} />
          </Button>
          <Button variant="ghost" className="text-white font-bold h-10 px-4 hover:bg-white/5 border border-[#1F2937] flex items-center justify-between min-w-[180px]">
            <div className="flex items-center gap-2">
              <FileBox size={14} className="text-[#FACC15]" />
              <span className="text-xs font-black uppercase">Tournament Stats</span>
            </div>
            <ChevronDown size={14} />
          </Button>
          <div className="ml-auto flex items-center gap-2">
            <Button size="icon" variant="ghost" className="h-10 w-10 text-[#FACC15] bg-[#FACC15]/10 rounded-lg"><BarChart3 size={18}/></Button>
            <Button size="icon" variant="ghost" className="h-10 w-10 text-[#9CA3AF] hover:text-white rounded-lg"><PieIcon size={18}/></Button>
            <Button size="icon" variant="ghost" className="h-10 w-10 text-[#9CA3AF] hover:text-white rounded-lg"><LineIcon size={18}/></Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Registration Chart */}
        <Card className="bg-[#111827] border-[#1F2937]">
          <CardHeader>
            <CardTitle className="text-lg font-display font-black uppercase text-white">Player Distribution</CardTitle>
            <CardDescription className="text-xs text-[#9CA3AF] font-bold uppercase">Registrations by district sub-association</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                <XAxis dataKey="name" stroke="#9CA3AF" fontSize={10} axisLine={false} tickLine={false} dy={10} />
                <YAxis stroke="#9CA3AF" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#FACC1510'}} contentStyle={{backgroundColor: '#111827', border: '1px solid #1F2937'}} />
                <Bar dataKey="players" fill="#FACC15" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Role Distribution */}
        <Card className="bg-[#111827] border-[#1F2937]">
          <CardHeader>
            <CardTitle className="text-lg font-display font-black uppercase text-white">Player Roles</CardTitle>
            <CardDescription className="text-xs text-[#9CA3AF] font-bold uppercase">Percentage distribution of player specialties</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{backgroundColor: '#111827', border: '1px solid #1F2937'}} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-display font-black text-white">1,000</span>
              <span className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-widest">Total Players</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Growth Rate', value: '24.5%', sub: 'vs last season', icon: TrendingUp, color: 'text-emerald-400' },
          { label: 'Dropout Rate', value: '2.1%', sub: 'Improved by 5%', icon: ArrowDownRight, color: 'text-[#EF4444]' },
          { label: 'Avg Match Attendance', value: '450', sub: 'Per weekend', icon: Users, color: 'text-[#FACC15]' },
        ].map((item, i) => (
          <Card key={item.label} className="bg-[#111827] border-[#1F2937]">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`p-4 rounded-xl bg-[#0B1220] ${item.color}`}>
                <item.icon size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF]">{item.label}</p>
                <p className="text-2xl font-display font-black text-white">{item.value}</p>
                <p className="text-[9px] text-[#9CA3AF] font-bold mt-1 uppercase">{item.sub}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
};

export default Reports;
