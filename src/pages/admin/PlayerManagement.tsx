import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  CheckCircle2,
  XCircle,
  Clock,
  Building2,
  TrendingUp,
  ArrowDownRight,
  Printer,
  Users
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const players = [
  { id: 1, name: "Rahul Dravid", club: "Nashik Lions", role: "Batsman", status: "Approved", photo: "RD" },
  { id: 2, name: "Sunil Joshi", club: "MCC Club", role: "All-Rounder", status: "Pending", photo: "SJ" },
  { id: 3, name: "Anil Kumble", club: "Deolali Raiders", role: "Bowler", status: "Approved", photo: "AK" },
  { id: 4, name: "Sunil Gavaskar", club: "Nashik Lions", role: "Batsman", status: "Rejected", photo: "SG" },
  { id: 5, name: "Kapil Dev", club: "City CC", role: "All-Rounder", status: "Approved", photo: "KD" },
];

const PlayerManagement = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-display font-black uppercase tracking-tight text-white">Player Database</h1>
          <p className="text-[#9CA3AF] text-sm font-bold uppercase tracking-widest mt-1">
            Manage association player registrations and profiles.
          </p>
        </div>
        <Button className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0B1220] font-black uppercase tracking-widest text-xs px-6 h-12 rounded-xl shadow-[0_0_20px_rgba(250,204,21,0.2)] group">
          <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform" />
          Add New Player
        </Button>
      </div>

      <Card className="bg-[#111827] border-[#1F2937] overflow-hidden">
        <CardHeader className="border-b border-[#1F2937] px-6 py-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF] group-focus-within:text-[#FACC15] transition-colors" />
              <Input 
                placeholder="Search by name, club or role..." 
                className="bg-[#0B1220] border-[#1F2937] pl-10 h-10 text-white focus-visible:ring-[#FACC15]/30 placeholder:text-[#9CA3AF]/40 rounded-lg font-sans text-sm"
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Button variant="outline" className="border-[#1F2937] bg-[#0B1220] text-[#9CA3AF] hover:text-white uppercase text-[10px] font-black h-10 px-4">
                <Filter size={14} className="mr-2" />
                Filter
              </Button>
              <Button variant="outline" className="border-[#1F2937] bg-[#0B1220] text-[#9CA3AF] hover:text-white uppercase text-[10px] font-black h-10 px-4">
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-[#0B1220]/50">
              <TableRow className="border-[#1F2937] hover:bg-transparent">
                <TableHead className="text-[#9CA3AF] uppercase text-[10px] font-black tracking-widest h-12">Player Details</TableHead>
                <TableHead className="text-[#9CA3AF] uppercase text-[10px] font-black tracking-widest h-12">Registered Club</TableHead>
                <TableHead className="text-[#9CA3AF] uppercase text-[10px] font-black tracking-widest h-12">Playing Role</TableHead>
                <TableHead className="text-[#9CA3AF] uppercase text-[10px] font-black tracking-widest h-12">Status</TableHead>
                <TableHead className="text-[#9CA3AF] uppercase text-[10px] font-black tracking-widest h-12 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((player) => (
                <TableRow key={player.id} className="border-[#1F2937] hover:bg-white/[0.02] transition-colors group">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10 border border-[#FACC15]/20 group-hover:border-[#FACC15]/50 transition-colors">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-[#0B1220] text-[#FACC15] font-bold text-xs">{player.photo}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-bold text-white font-sans">{player.name}</p>
                        <p className="text-[10px] text-[#9CA3AF] uppercase font-bold tracking-widest">ID: NDCA-2025-{player.id.toString().padStart(3, '0')}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 size={14} className="text-[#FACC15]" />
                      <span className="text-sm text-gray-300 font-sans">{player.club}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-[#1F2937] text-[#9CA3AF] bg-[#0B1220] text-[10px] uppercase font-black">
                      {player.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {player.status === "Approved" && (
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <CheckCircle2 size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest font-sans">Approved</span>
                      </div>
                    )}
                    {player.status === "Pending" && (
                      <div className="flex items-center gap-1.5 text-[#FACC15]">
                        <Clock size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest font-sans">Pending</span>
                      </div>
                    )}
                    {player.status === "Rejected" && (
                      <div className="flex items-center gap-1.5 text-[#EF4444]">
                        <XCircle size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest font-sans">Rejected</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-[#9CA3AF] hover:text-[#FACC15] hover:bg-[#FACC15]/10 rounded-lg">
                        <Edit size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-[#9CA3AF] hover:text-[#EF4444] hover:bg-[#EF4444]/10 rounded-lg">
                        <Trash2 size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-[#9CA3AF] hover:text-white hover:bg-white/5 rounded-lg">
                        <MoreVertical size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default PlayerManagement;
