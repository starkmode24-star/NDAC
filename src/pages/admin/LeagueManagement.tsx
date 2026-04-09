import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Calendar, Users, ArrowUpRight, Plus, MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const leagues = [
  { id: 1, name: "NDCA Premier League", season: "2025/26", teams: 12, startDate: "May 15", prize: "₹ 5,00,000", status: "Open" },
  { id: 2, name: "District U-19 Trophy", season: "2025", teams: 16, startDate: "Jun 02", prize: "₹ 1,50,000", status: "Ongoing" },
  { id: 3, name: "Corporate Cup", season: "2025", teams: 8, startDate: "Aug 10", prize: "₹ 2,00,000", status: "Upcoming" },
];

const standings = [
  { pos: 1, team: "Nashik Lions CC", p: 8, w: 6, l: 2, pts: 12, nrr: "+1.254" },
  { pos: 2, team: "MCC Club", p: 8, w: 5, l: 3, pts: 10, nrr: "+0.842" },
  { pos: 3, team: "Deolali Raiders", p: 8, w: 5, l: 3, pts: 10, nrr: "+0.120" },
  { pos: 4, team: "City CC", p: 8, w: 4, l: 4, pts: 8, nrr: "-0.450" },
];

const LeagueManagement = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-display font-black uppercase tracking-tight text-white">Leagues & Tournaments</h1>
          <p className="text-[#9CA3AF] text-sm font-bold uppercase tracking-widest mt-1">
            Manage tournament schedules, registration and standings.
          </p>
        </div>
        <Button className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0B1220] font-black uppercase tracking-widest text-xs px-6 h-12 rounded-xl">
          <Plus size={18} className="mr-2" />
          Create Tournament
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Tournaments */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#FACC15] mb-4">Active Tournaments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leagues.map((league) => (
              <Card key={league.id} className="bg-[#111827] border-[#1F2937] hover:border-[#FACC15]/30 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <Badge className={`uppercase text-[9px] font-black tracking-widest border-0 ${
                    league.status === 'Ongoing' ? 'bg-[#EF4444] text-white' : 'bg-[#FACC15] text-[#0B1220]'
                  }`}>
                    {league.status}
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
                      <span className="text-xs text-white font-sans">{league.teams} Teams</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-[#9CA3AF]" />
                      <span className="text-xs text-white font-sans">{league.startDate} Start</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#1F2937]">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-[#9CA3AF]">Prize Pool</p>
                      <p className="text-sm font-black text-white">{league.prize}</p>
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
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#FACC15] mb-4">Premier League Standings</h2>
          <Card className="bg-[#111827] border-[#1F2937] overflow-hidden">
            <Table>
              <TableHeader className="bg-[#0B1220]">
                <TableRow className="border-[#1F2937]">
                  <TableHead className="w-10 text-[9px] font-black uppercase tracking-widest text-[#9CA3AF] text-center px-2">#</TableHead>
                  <TableHead className="text-[9px] font-black uppercase tracking-widest text-[#9CA3AF]">Team</TableHead>
                  <TableHead className="text-[9px] font-black uppercase tracking-widest text-[#9CA3AF] text-center px-2">P</TableHead>
                  <TableHead className="text-[9px] font-black uppercase tracking-widest text-[#9CA3AF] text-center px-2">PTS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {standings.map((team) => (
                  <TableRow key={team.pos} className={`border-[#1F2937] hover:bg-white/[0.02] ${team.pos <= 2 ? 'bg-[#FACC15]/5' : ''}`}>
                    <TableCell className="text-center font-black text-xs px-2 py-3">
                      <span className={team.pos <= 2 ? "text-[#FACC15]" : "text-white"}>{team.pos}</span>
                    </TableCell>
                    <TableCell className="font-bold text-xs white-nowrap py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-sans">{team.team}</span>
                        {team.pos <= 2 && <TrendingUp size={10} className="text-[#FACC15]" />}
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-xs text-[#9CA3AF] font-medium px-2 py-3">{team.p}</TableCell>
                    <TableCell className="text-center font-black text-xs text-[#FACC15] px-2 py-3">{team.pts}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="p-4 bg-[#0B1220]/50 text-center">
              <Button variant="ghost" className="text-[9px] font-black uppercase tracking-[0.2em] text-[#9CA3AF] hover:text-[#FACC15]">
                View Full Standings
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
