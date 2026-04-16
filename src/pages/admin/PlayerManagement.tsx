import { useState } from "react";
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
  Users,
  Loader2
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { playerApi } from "@/lib/api";
import { toast } from "sonner";

import { AddPlayerDialog } from "@/components/admin/AddPlayerDialog";

const PlayerManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();

  const { data: players, isLoading } = useQuery({
    queryKey: ['players', searchTerm],
    queryFn: async () => {
      const resp = await playerApi.getAll(searchTerm ? { search: searchTerm } : undefined);
      return resp.data;
    }
  });

  const approveMutation = useMutation({
    mutationFn: (id: string) => playerApi.approve(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
      toast.success("Player approved successfully!");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => playerApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
      toast.success("Player data removed.");
    }
  });

  const handleExportCSV = () => {
    if (!players || players.length === 0) {
      toast.error("No players to export");
      return;
    }
    const headers = ["ID", "Name", "Club", "Specialty", "Status", "DOB"];
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + players.map((p: any) => `${p.id},${p.firstName} ${p.lastName},${p.club?.name || 'Unassigned'},${p.specialty || 'General'},${p.status},${new Date(p.dob).toLocaleDateString()}`).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "ndca_players.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Player database exported!");
  };

  if (isLoading && !searchTerm) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="animate-spin text-primary h-8 w-8" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-display font-black uppercase tracking-tight text-white">Player Database</h1>
          <p className="text-[#9CA3AF] text-sm font-bold uppercase tracking-widest mt-1">
            Manage association player registrations and profiles.
          </p>
        </div>
        <AddPlayerDialog />
      </div>

      <Card className="bg-[#111827] border-[#1F2937] overflow-hidden">
        <CardHeader className="border-b border-[#1F2937] px-6 py-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF] group-focus-within:text-[#FACC15] transition-colors" />
              <Input 
                placeholder="Search by name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#0B1220] border-[#1F2937] pl-10 h-10 text-white focus-visible:ring-[#FACC15]/30 placeholder:text-[#9CA3AF]/40 rounded-lg font-sans text-sm"
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Button variant="outline" className="border-[#1F2937] bg-[#0B1220] text-[#9CA3AF] hover:text-white uppercase text-[10px] font-black h-10 px-4">
                <Filter size={14} className="mr-2" />
                Filter
              </Button>
              <Button onClick={handleExportCSV} variant="outline" className="border-[#1F2937] bg-[#0B1220] text-[#9CA3AF] hover:text-white uppercase text-[10px] font-black h-10 px-4">
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
              {players?.map((player: any) => (
                <TableRow key={player.id} className="border-[#1F2937] hover:bg-white/[0.02] transition-colors group">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10 border border-[#FACC15]/20 group-hover:border-[#FACC15]/50 transition-colors">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-[#0B1220] text-[#FACC15] font-bold text-xs">
                          {(player.firstName?.[0] || 'U')}
                          {(player.lastName?.[0] || '')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-bold text-white font-sans">{player.firstName || 'Unknown'} {player.lastName || ''}</p>
                        <p className="text-[10px] text-[#9CA3AF] uppercase font-bold tracking-widest">
                          ID: NDCA-2025-{player.id?.toString().slice(-3) || 'XXX'}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                       <Building2 size={14} className="text-[#FACC15]" />
                       <span className="text-sm text-gray-300 font-sans">{player.club?.name || 'Unassigned'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-[#1F2937] text-[#9CA3AF] bg-[#0B1220] text-[10px] uppercase font-black">
                      {player.specialty || 'General'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {player.status === "APPROVED" && (
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <CheckCircle2 size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest font-sans">Approved</span>
                      </div>
                    )}
                    {player.status === "PENDING" && (
                      <div className="flex items-center gap-1.5 text-[#FACC15]">
                        <Clock size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest font-sans">Pending</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {player.status === "PENDING" && (
                        <Button 
                            onClick={() => approveMutation.mutate(player.id)}
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-[#9CA3AF] hover:text-emerald-400 hover:bg-emerald-400/10 rounded-lg"
                        >
                            <CheckCircle2 size={16} />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-[#9CA3AF] hover:text-[#FACC15] hover:bg-[#FACC15]/10 rounded-lg">
                        <Edit size={16} />
                      </Button>
                      <Button 
                        onClick={() => deleteMutation.mutate(player.id)}
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-[#9CA3AF] hover:text-[#EF4444] hover:bg-[#EF4444]/10 rounded-lg"
                      >
                        <Trash2 size={16} />
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
