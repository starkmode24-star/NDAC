import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Calendar, Plus, Clock, MapPin, ArrowRight, Share2, MoreHorizontal } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { matchApi } from "@/lib/api";
import { useNavigate } from "react-router-dom";

const MatchManagement = () => {
  const navigate = useNavigate();
  const { data: matches, isLoading } = useQuery({
    queryKey: ['admin-matches'],
    queryFn: async () => {
      const resp = await matchApi.getAll();
      return resp.data;
    }
  });

  if (isLoading) return <AdminLayout>Loading matches...</AdminLayout>;

  const liveMatches = matches?.filter((m: any) => m.status === 'LIVE') || [];
  const upcomingMatches = matches?.filter((m: any) => m.status === 'UPCOMING') || [];
  const completedMatches = matches?.filter((m: any) => m.status === 'COMPLETED') || [];

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
              Live ({liveMatches.length})
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="upcoming" 
            className="rounded-xl px-8 data-[state=active]:bg-[#FACC15] data-[state=active]:text-[#0B1220] font-black uppercase tracking-widest text-[10px]"
          >
            Upcoming ({upcomingMatches.length})
          </TabsTrigger>
          <TabsTrigger 
            value="results" 
            className="rounded-xl px-8 data-[state=active]:bg-[#1F2937] data-[state=active]:text-white font-black uppercase tracking-widest text-[10px]"
          >
            Results ({completedMatches.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-6">
          {liveMatches.length > 0 ? liveMatches.map((match: any) => (
            <MatchCard key={match.id} match={match} onManage={() => navigate(`/admin/match-control/${match.id}`)} />
          )) : <div className="text-center py-12 text-[#9CA3AF]">No matches currently live.</div>}
        </TabsContent>
        <TabsContent value="upcoming" className="space-y-6">
          {upcomingMatches.length > 0 ? upcomingMatches.map((match: any) => (
            <MatchCard key={match.id} match={match} onManage={() => navigate(`/admin/match-control/${match.id}`)} />
          )) : <div className="text-center py-12 text-[#9CA3AF]">No upcoming matches.</div>}
        </TabsContent>
        <TabsContent value="results" className="space-y-6">
          {completedMatches.length > 0 ? completedMatches.map((match: any) => (
            <MatchCard key={match.id} match={match} onManage={() => {}} />
          )) : <div className="text-center py-12 text-[#9CA3AF]">No match results found.</div>}
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

const MatchCard = ({ match, onManage }: { match: any, onManage: () => void }) => (
  <Card className="bg-[#111827] border-[#1F2937] hover:border-[#FACC15]/30 transition-all overflow-hidden group">
    <div className="p-1 px-4 bg-[#0B1220]/50 border-b border-[#1F2937] flex justify-between items-center h-10">
      <div className="flex items-center gap-2">
        <Trophy size={14} className="text-[#FACC15]" />
        <span className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF]">{match.league?.name || 'Friendly'}</span>
      </div>
      <Badge variant="outline" className="border-0 bg-white/5 text-[9px] font-black uppercase tracking-tighter text-[#9CA3AF]">
        {match.venue}
      </Badge>
    </div>
    <CardContent className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8">
        <div className="text-center md:text-right order-1">
          <p className="text-xl font-display font-black uppercase text-white mb-2">{match.team1?.name}</p>
          <p className="text-3xl font-display font-black text-[#FACC15]">{match.team1Score || '0/0'}</p>
        </div>
        
        <div className="flex flex-col items-center order-2">
            <div className="text-center">
              <Badge className={cn("text-white text-[10px] font-black uppercase mb-4 px-4 py-1", match.status === 'LIVE' ? 'bg-[#EF4444]' : 'bg-[#1F2937]')}>
                {match.status}
              </Badge>
              <p className="text-[#9CA3AF] text-[10px] font-black uppercase tracking-[0.2em]">{match.result || 'Match in progress'}</p>
            </div>
        </div>

        <div className="text-center md:text-left order-3">
          <p className="text-xl font-display font-black uppercase text-white mb-2">{match.team2?.name}</p>
          <p className="text-3xl font-display font-black text-[#FACC15]">{match.team2Score || '0/0'}</p>
        </div>
      </div>
    </CardContent>
    <div className="p-4 bg-[#0B1220]/30 border-t border-[#1F2937] flex justify-between items-center group-hover:bg-[#FACC15]/5 transition-colors">
      <div className="flex items-center gap-4">
        <Button 
            variant="ghost" 
            size="sm" 
            onClick={onManage}
            className="text-[10px] font-black uppercase text-[#9CA3AF] hover:text-white px-0 h-auto"
        >
          {match.status === 'COMPLETED' ? 'View Final Scorecard' : 'Open Match Controller'}
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

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export default MatchManagement;
