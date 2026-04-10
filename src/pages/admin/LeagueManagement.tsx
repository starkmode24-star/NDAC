import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Calendar, Users, ArrowUpRight, Plus, MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { useQuery } from "@tanstack/react-query";
import { leagueApi } from "@/lib/api";

import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Calendar, Users, ArrowUpRight, Plus, MapPin, Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { leagueApi } from "@/lib/api";
import { toast } from "sonner";

const LeagueManagement = () => {
  const queryClient = useQueryClient();
  const [showAdd, setShowAdd] = useState(false);
  const [newLeague, setNewLeague] = useState({ name: '', season: '2025/26', startDate: '', endDate: '' });
  const [selectedLeagueId, setSelectedLeagueId] = useState<string | null>(null);

  const { data: leagues, isLoading } = useQuery({
    queryKey: ['leagues'],
    queryFn: async () => {
      const response = await leagueApi.getAll();
      const data = response.data;
      if (data.length > 0 && !selectedLeagueId) {
        setSelectedLeagueId(data[0].id);
      }
      return data;
    }
  });

  const { data: standings, isLoading: loadingStandings } = useQuery({
    queryKey: ['standings', selectedLeagueId],
    queryFn: async () => {
      if (!selectedLeagueId) return [];
      const response = await leagueApi.getStandings(selectedLeagueId);
      return response.data;
    },
    enabled: !!selectedLeagueId
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => leagueApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leagues'] });
      setShowAdd(false);
      toast.success("Tournament created!");
    }
  });

  if (isLoading) {
    return <AdminLayout><div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#FACC15]" size={40} /></div></AdminLayout>;
  }

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-display font-black uppercase tracking-tight text-white">Leagues & Tournaments</h1>
          <p className="text-[#9CA3AF] text-sm font-bold uppercase tracking-widest mt-1">
            Manage tournament schedules, registration and standings.
          </p>
        </div>
        <Button 
          onClick={() => setShowAdd(!showAdd)}
          className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0B1220] font-black uppercase tracking-widest text-xs px-6 h-12 rounded-xl"
        >
          {showAdd ? "Cancel" : <><Plus size={18} className="mr-2" /> Create Tournament</>}
        </Button>
      </div>

      {showAdd && (
        <Card className="bg-[#111827] border-[#FACC15]/30 mb-8 animate-fade-down">
          <CardContent className="p-6">
            <h3 className="text-white font-bold uppercase mb-4">New Tournament Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input 
                placeholder="Tournament Name" 
                className="bg-[#0B1220] border-[#1F2937] text-white" 
                value={newLeague.name}
                onChange={e => setNewLeague({...newLeague, name: e.target.value})}
              />
              <Input 
                type="date"
                placeholder="Start Date" 
                className="bg-[#0B1220] border-[#1F2937] text-white" 
                value={newLeague.startDate}
                onChange={e => setNewLeague({...newLeague, startDate: e.target.value})}
              />
              <Input 
                type="date"
                placeholder="End Date" 
                className="bg-[#0B1220] border-[#1F2937] text-white" 
                value={newLeague.endDate}
                onChange={e => setNewLeague({...newLeague, endDate: e.target.value})}
              />
              <Button 
                onClick={() => createMutation.mutate(newLeague)}
                className="bg-[#FACC15] text-[#0B1220] font-black uppercase"
              >
                Launch League
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Tournaments */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#FACC15] mb-4">Active Tournaments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leagues?.map((league: any) => (
              <Card 
                key={league.id} 
                onClick={() => setSelectedLeagueId(league.id)}
                className={`cursor-pointer bg-[#111827] border-[#1F2937] hover:border-[#FACC15]/30 transition-all group relative overflow-hidden ${selectedLeagueId === league.id ? 'ring-2 ring-[#FACC15]' : ''}`}
              >
                <div className="absolute top-0 right-0 p-4">
                  <Badge className={`uppercase text-[9px] font-black tracking-widest border-0 bg-[#FACC15] text-[#0B1220]`}>
                    Active
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-[#0B1220] border border-[#1F2937] flex items-center justify-center text-[#FACC15] mb-4">
                    <Trophy size={24} />
                  </div>
                  <h3 className="text-xl font-display font-black uppercase text-white mb-1 group-hover:text-[#FACC15] transition-colors">{league.name}</h3>
                  <p className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-widest mb-4">Season {league.season}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-[#9CA3AF]" />
                      <span className="text-xs text-white font-sans">{league.matches?.length || 0} Matches</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <Calendar size={14} className="text-[#9CA3AF]" />
                       <span className="text-xs text-white font-sans">{new Date(league.startDate).getFullYear()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#1F2937]">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-[#9CA3AF]">Status</p>
                      <p className="text-sm font-black text-white">Live Monitoring</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-[#9CA3AF] hover:text-[#FACC15] group-hover:bg-[#FACC15]/10 rounded-lg">
                      <ArrowUpRight size={18} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Standings Sidebar */}
        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#FACC15] mb-4">Dynamic Points Table</h2>
          <Card className="bg-[#111827] border-[#1F2937] overflow-hidden min-h-[400px]">
            {loadingStandings ? (
              <div className="flex items-center justify-center h-full py-20"><Loader2 className="animate-spin text-[#FACC15]" /></div>
            ) : (
              <Table>
                <TableHeader className="bg-[#0B1220]">
                  <TableRow className="border-[#1F2937]">
                    <TableHead className="w-10 text-[9px] font-black uppercase tracking-widest text-[#9CA3AF] text-center px-2">#</TableHead>
                    <TableHead className="text-[9px] font-black uppercase tracking-widest text-[#9CA3AF]">Team</TableHead>
                    <TableHead className="text-[9px] font-black uppercase tracking-widest text-[#9CA3AF] text-center px-2">P</TableHead>
                    <TableHead className="text-[9px] font-black uppercase tracking-widest text-[#9CA3AF] text-center px-2">W</TableHead>
                    <TableHead className="text-[9px] font-black uppercase tracking-widest text-[#9CA3AF] text-center px-2">PTS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {standings?.map((team: any, i: number) => (
                    <TableRow key={team.id} className={`border-[#1F2937] hover:bg-white/[0.02] ${i < 2 ? 'bg-[#FACC15]/5' : ''}`}>
                      <TableCell className="text-center font-black text-xs px-2 py-3 text-white">{i + 1}</TableCell>
                      <TableCell className="font-bold text-xs white-nowrap py-3 text-white uppercase">{team.name}</TableCell>
                      <TableCell className="text-center text-xs text-[#9CA3AF] px-2 py-3">{team.p}</TableCell>
                      <TableCell className="text-center text-xs text-[#9CA3AF] px-2 py-3">{team.w}</TableCell>
                      <TableCell className="text-center font-black text-xs text-[#FACC15] px-2 py-3">{team.pts}</TableCell>
                    </TableRow>
                  ))}
                  {(!standings || standings.length === 0) && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-20 text-[#9CA3AF] text-[10px] uppercase font-black tracking-widest">
                        Select a league with completed matches to see standings
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
            <div className="p-4 bg-[#0B1220]/50 text-center">
              <Button variant="ghost" className="text-[9px] font-black uppercase tracking-[0.2em] text-[#9CA3AF] hover:text-[#FACC15]">
                Download Standings PDF
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

const TrendingUp = ({ size, className }: { size: number, className: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
  </svg>
);

export default LeagueManagement;
