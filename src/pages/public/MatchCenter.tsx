import PublicLayout from "@/components/PublicLayout";
import { useQuery } from "@tanstack/react-query";
import { matchApi, leagueApi } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Calendar, MapPin, Loader2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const MatchCenter = () => {
  const [activeTab, setActiveTab] = useState("matches");

  const { data: matches, isLoading: loadingMatches } = useQuery({
    queryKey: ['public-matches'],
    queryFn: async () => {
      const response = await matchApi.getAll();
      return response.data;
    }
  });

  const { data: leagues, isLoading: loadingLeagues } = useQuery({
    queryKey: ['public-leagues'],
    queryFn: async () => {
      const response = await leagueApi.getAll();
      return response.data;
    }
  });

  const [selectedLeagueId, setSelectedLeagueId] = useState<string | null>(null);

  const { data: standings, isLoading: loadingStandings } = useQuery({
    queryKey: ['public-standings', selectedLeagueId],
    queryFn: async () => {
      if (!selectedLeagueId) return [];
      const response = await leagueApi.getStandings(selectedLeagueId);
      return response.data;
    },
    enabled: !!selectedLeagueId
  });

  // Automatically select first league for standings if none selected
  if (leagues && leagues.length > 0 && !selectedLeagueId) {
      setSelectedLeagueId(leagues[0].id);
  }

  const liveMatches = matches?.filter((m: any) => m.status === 'LIVE') || [];
  const upcomingMatches = matches?.filter((m: any) => m.status === 'UPCOMING') || [];
  const results = matches?.filter((m: any) => m.status === 'COMPLETED') || [];

  return (
    <PublicLayout>
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container relative z-10">
          <div className="flex flex-col gap-8 mb-16">
            <h1 className="text-5xl md:text-8xl font-display font-black text-foreground uppercase tracking-tighter leading-[0.85]">
              Match <span className="text-primary italic">Center</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl font-bold uppercase tracking-widest opacity-70">
              Live scores, upcoming fixtures, and integrated league standings for all NDCA sanctioned tournaments.
            </p>
          </div>

          <Tabs defaultValue="matches" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="bg-muted/50 p-1 rounded-2xl h-16 mb-12 border border-border">
              <TabsTrigger value="matches" className="rounded-xl px-8 h-full data-[state=active]:bg-[#0B1220] data-[state=active]:text-white font-black uppercase text-xs tracking-widest">
                Fixtures & Live
              </TabsTrigger>
              <TabsTrigger value="results" className="rounded-xl px-8 h-full data-[state=active]:bg-[#0B1220] data-[state=active]:text-white font-black uppercase text-xs tracking-widest">
                Results
              </TabsTrigger>
              <TabsTrigger value="standings" className="rounded-xl px-8 h-full data-[state=active]:bg-[#0B1220] data-[state=active]:text-white font-black uppercase text-xs tracking-widest">
                Standings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="matches" className="space-y-12 animate-fade-up">
              {/* Live Matches Section */}
              {liveMatches.length > 0 && (
                <div>
                  <div className="flex items-center gap-4 mb-8">
                     <span className="w-1 h-8 bg-live-red rounded-full" />
                     <h2 className="text-2xl font-display font-black uppercase italic text-live-red animate-pulse">Live Matches</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {liveMatches.map((match: any) => (
                      <MatchCard key={match.id} match={match} isLive />
                    ))}
                  </div>
                </div>
              )}

              {/* Upcoming Section */}
              <div>
                <div className="flex items-center gap-4 mb-8">
                   <span className="w-1 h-8 bg-primary rounded-full" />
                   <h2 className="text-2xl font-display font-black uppercase italic">Upcoming Fixtures</h2>
                </div>
                {loadingMatches ? (
                   <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={40} /></div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {upcomingMatches.length > 0 ? upcomingMatches.map((match: any) => (
                      <MatchCard key={match.id} match={match} />
                    )) : (
                      <p className="col-span-full text-center py-20 text-muted-foreground uppercase font-black tracking-widest text-xs">No upcoming matches scheduled</p>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="results" className="animate-fade-up">
               <div className="flex items-center gap-4 mb-8">
                  <span className="w-1 h-8 bg-[#9CA3AF] rounded-full" />
                  <h2 className="text-2xl font-display font-black uppercase italic">Match Results</h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {results.length > 0 ? results.map((match: any) => (
                    <MatchCard key={match.id} match={match} isCompleted />
                  )) : (
                    <p className="col-span-full text-center py-20 text-muted-foreground uppercase font-black tracking-widest text-xs">No match results available yet</p>
                  )}
               </div>
            </TabsContent>

            <TabsContent value="standings" className="animate-fade-up">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                   {/* League Selector */}
                   <div className="space-y-4">
                      <h3 className="text-xs font-black uppercase tracking-widest text-primary">Select League</h3>
                      <div className="flex flex-col gap-2">
                         {leagues?.map((l: any) => (
                           <button
                             key={l.id}
                             onClick={() => setSelectedLeagueId(l.id)}
                             className={`p-4 rounded-xl border text-left transition-all font-display font-black uppercase text-xs tracking-wider ${selectedLeagueId === l.id ? 'bg-[#0B1220] text-white border-transparent' : 'bg-muted/30 border-border hover:border-primary'}`}
                           >
                             {l.name}
                           </button>
                         ))}
                      </div>
                   </div>

                   {/* Standings Table */}
                   <div className="lg:col-span-3">
                      <Card className="rounded-[2rem] border-border bg-background shadow-2xl overflow-hidden">
                         <CardContent className="p-0">
                            {loadingStandings ? (
                              <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={40} /></div>
                            ) : (
                               <Table>
                                  <TableHeader className="bg-muted/50 h-16">
                                     <TableRow className="border-border">
                                        <TableHead className="w-16 text-center font-black uppercase text-[10px] tracking-widest">#</TableHead>
                                        <TableHead className="font-black uppercase text-[10px] tracking-widest">Team Name</TableHead>
                                        <TableHead className="text-center font-black uppercase text-[10px] tracking-widest">Played</TableHead>
                                        <TableHead className="text-center font-black uppercase text-[10px] tracking-widest">Won</TableHead>
                                        <TableHead className="text-center font-black uppercase text-[10px] tracking-widest">NRR</TableHead>
                                        <TableHead className="text-center font-black uppercase text-[10px] tracking-widest text-primary">Points</TableHead>
                                     </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                     {standings?.map((team: any, i: number) => (
                                       <TableRow key={team.id} className={`border-border h-16 ${i < 4 ? 'bg-primary/[0.02]' : ''}`}>
                                          <TableCell className="text-center font-black text-xs">{i + 1}</TableCell>
                                          <TableCell className="font-black text-xs uppercase text-foreground">{team.name}</TableCell>
                                          <TableCell className="text-center text-xs font-sans">{team.played}</TableCell>
                                          <TableCell className="text-center text-xs font-sans">{team.won}</TableCell>
                                          <TableCell className="text-center text-xs font-mono">{team.nrr >= 0 ? '+' : ''}{team.nrr?.toFixed(3) || '0.000'}</TableCell>
                                          <TableCell className="text-center font-black text-sm text-primary">{team.points}</TableCell>
                                       </TableRow>
                                     ))}
                                     {(!standings || standings.length === 0) && (
                                       <TableRow>
                                          <TableCell colSpan={6} className="text-center py-20 text-muted-foreground uppercase font-black tracking-widest text-[10px]">No data for this league</TableCell>
                                       </TableRow>
                                     )}
                                  </TableBody>
                               </Table>
                            )}
                         </CardContent>
                      </Card>
                   </div>
                </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </PublicLayout>
  );
};

const MatchCard = ({ match, isLive, isCompleted }: { match: any, isLive?: boolean, isCompleted?: boolean }) => (
    <Card className={`group rounded-[2rem] border-border bg-background hover:border-primary/50 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-2xl relative ${isLive ? 'ring-2 ring-live-red/50' : ''}`}>
       <CardContent className="p-8">
          <div className="flex justify-between items-start mb-8">
             <Badge className={`uppercase text-[9px] font-black tracking-widest border-0 ${isLive ? 'bg-live-red animate-pulse text-white' : isCompleted ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'}`}>
                {isLive ? 'Live Now' : isCompleted ? 'Completed' : 'Upcoming'}
             </Badge>
             <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                <Trophy size={14} className="text-primary" /> {match.league?.name || match.matchType}
             </span>
          </div>

          <div className="space-y-6">
             <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center font-black text-primary text-xl border border-border group-hover:bg-primary/10 transition-colors">
                   {match.team1?.name?.substring(0,2).toUpperCase()}
                </div>
                <div className="flex-1">
                   <p className="font-display font-black uppercase text-xl text-foreground truncate">{match.team1?.name}</p>
                   {isCompleted && <p className="text-sm font-sans font-bold text-primary mt-0.5">{match.team1Score || '0/0'}</p>}
                </div>
             </div>

             <div className="relative flex items-center justify-center py-2">
                <div className="absolute inset-x-0 h-px bg-border" />
                <span className="relative z-10 px-4 bg-background text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground italic">VS</span>
             </div>

             <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center font-black text-primary text-xl border border-border group-hover:bg-primary/10 transition-colors">
                   {match.team2?.name?.substring(0,2).toUpperCase()}
                </div>
                <div className="flex-1">
                   <p className="font-display font-black uppercase text-xl text-foreground truncate">{match.team2?.name}</p>
                   {isCompleted && <p className="text-sm font-sans font-bold text-primary mt-0.5">{match.team2Score || '0/0'}</p>}
                </div>
             </div>
          </div>

          <div className="mt-10 pt-6 border-t border-border space-y-3">
             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                <Calendar size={14} className="text-primary" />
                {new Date(match.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
             </div>
             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                <MapPin size={14} className="text-primary" />
                {match.venue}
             </div>
             {isCompleted && match.result && (
                <div className="mt-4 p-3 rounded-xl bg-primary/5 border border-primary/20">
                   <p className="text-[10px] font-black uppercase tracking-widest text-primary text-center italic">{match.result}</p>
                </div>
              )}
              {isLive && (
                <button className="w-full mt-4 h-12 bg-[#0B1220] hover:bg-[#111827] text-white rounded-xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-2 transition-all">
                    Center Stage <ArrowRight size={14} />
                </button>
              )}
          </div>
       </CardContent>
    </Card>
);

export default MatchCenter;
