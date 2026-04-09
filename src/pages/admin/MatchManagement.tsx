import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Calendar, Plus, Clock, MapPin, ArrowRight, Share2, MoreHorizontal } from "lucide-react";

const matches = [
  { 
    id: 1, 
    type: 'Live', 
    league: 'A-Division League', 
    team1: 'Nashik Lions', 
    score1: '164/4 (18.2)', 
    team2: 'Pune Warriors', 
    score2: '162/8 (20)', 
    status: 'In Progress', 
    venue: 'Golf Club Ground' 
  },
  { 
    id: 2, 
    type: 'Upcoming', 
    league: 'U-19 District Trophy', 
    team1: 'Deolali CC', 
    team2: 'Malegaon Raiders', 
    date: 'Apr 10, 2026', 
    time: '09:30 AM', 
    venue: 'HPT College Ground' 
  },
  { 
    id: 3, 
    type: 'Result', 
    league: 'T20 Championship', 
    team1: 'City CC', 
    score1: '145/10 (19.4)', 
    team2: 'MCC Club', 
    score2: '146/2 (15.2)', 
    status: 'MCC won by 8 wickets', 
    venue: 'Police Ground' 
  },
];

const MatchManagement = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-display font-black uppercase tracking-tight text-white">Match Center</h1>
          <p className="text-[#9CA3AF] text-sm font-bold uppercase tracking-widest mt-1">
            Schedule and manage all association matches and live scores.
          </p>
        </div>
        <Button className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0B1220] font-black uppercase tracking-widest text-xs px-6 h-12 rounded-xl">
          <Plus size={18} className="mr-2" />
          Schedule New Match
        </Button>
      </div>

      <Tabs defaultValue="live" className="w-full">
        <TabsList className="bg-[#111827] border border-[#1F2937] p-1 h-14 rounded-2xl mb-8">
          <TabsTrigger 
            value="live" 
            className="rounded-xl px-8 data-[state=active]:bg-[#EF4444] data-[state=active]:text-white font-black uppercase tracking-widest text-[10px]"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" />
              Live Matches
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="upcoming" 
            className="rounded-xl px-8 data-[state=active]:bg-[#FACC15] data-[state=active]:text-[#0B1220] font-black uppercase tracking-widest text-[10px]"
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger 
            value="results" 
            className="rounded-xl px-8 data-[state=active]:bg-[#1F2937] data-[state=active]:text-white font-black uppercase tracking-widest text-[10px]"
          >
            Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-6">
          {matches.filter(m => m.type === 'Live').map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </TabsContent>
        <TabsContent value="upcoming" className="space-y-6">
          {matches.filter(m => m.type === 'Upcoming').map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </TabsContent>
        <TabsContent value="results" className="space-y-6">
          {matches.filter(m => m.type === 'Result').map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

const MatchCard = ({ match }: { match: any }) => (
  <Card className="bg-[#111827] border-[#1F2937] hover:border-[#FACC15]/30 transition-all overflow-hidden group">
    <div className="p-1 px-4 bg-[#0B1220]/50 border-b border-[#1F2937] flex justify-between items-center h-10">
      <div className="flex items-center gap-2">
        <Trophy size={14} className="text-[#FACC15]" />
        <span className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF]">{match.league}</span>
      </div>
      <Badge variant="outline" className="border-0 bg-white/5 text-[9px] font-black uppercase tracking-tighter text-[#9CA3AF]">
        {match.venue}
      </Badge>
    </div>
    <CardContent className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8">
        <div className="text-center md:text-right order-1">
          <p className="text-xl font-display font-black uppercase text-white mb-2">{match.team1}</p>
          {match.score1 && <p className="text-3xl font-display font-black text-[#FACC15]">{match.score1}</p>}
        </div>
        
        <div className="flex flex-col items-center order-2">
          {match.type === 'Live' ? (
            <div className="text-center">
              <Badge className="bg-[#EF4444] text-white text-[10px] font-black uppercase mb-4 px-4 py-1">Live</Badge>
              <p className="text-[#EF4444] text-[10px] font-black uppercase tracking-[0.2em]">{match.status}</p>
            </div>
          ) : match.type === 'Upcoming' ? (
            <div className="text-center">
              <p className="text-white text-lg font-black font-sans mb-1">{match.time}</p>
              <p className="text-[#9CA3AF] text-[10px] font-bold uppercase tracking-widest">{match.date}</p>
            </div>
          ) : (
            <div className="text-center">
              <Badge className="bg-[#1F2937] text-[#9CA3AF] text-[10px] font-black uppercase mb-4 px-4 py-1">Final</Badge>
              <p className="text-[#FACC15] text-[10px] font-black uppercase tracking-widest">{match.status}</p>
            </div>
          )}
        </div>

        <div className="text-center md:text-left order-3">
          <p className="text-xl font-display font-black uppercase text-white mb-2">{match.team2}</p>
          {match.score2 && <p className="text-3xl font-display font-black text-[#FACC15]">{match.score2}</p>}
        </div>
      </div>
    </CardContent>
    <div className="p-4 bg-[#0B1220]/30 border-t border-[#1F2937] flex justify-between items-center group-hover:bg-[#FACC15]/5 transition-colors">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase text-[#9CA3AF] hover:text-white px-0 h-auto">
          View Detail Scorecard
          <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#9CA3AF] hover:text-white hover:bg-white/5 rounded-lg">
          <Share2 size={16} />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#9CA3AF] hover:text-white hover:bg-white/5 rounded-lg">
          <MoreHorizontal size={16} />
        </Button>
      </div>
    </div>
  </Card>
);

export default MatchManagement;
