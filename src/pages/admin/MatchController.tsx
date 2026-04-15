import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  Target, 
  RotateCcw, 
  CheckCircle2, 
  UserPlus, 
  Zap, 
  History,
  Timer,
  ChevronRight,
  MoreHorizontal
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { matchApi } from "@/lib/api";
import { toast } from "sonner";

const MatchController = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  
  // Fetch real match data
  const { data: match, isLoading } = useQuery({
    queryKey: ['match', id],
    queryFn: async () => {
      const resp = await matchApi.getAll(); // Ideally getById, but list works for demo
      return resp.data.find((m: any) => m.id === id);
    },
    enabled: !!id
  });

  const [score, setScore] = useState({ runs: 0, wickets: 0, overs: "0.0" });
  const [currentOver, setCurrentOver] = useState<string[]>([]);

  useEffect(() => {
    if (match) {
        // Parse score if available or use match defaults
        setScore({
            runs: parseInt(match.team1Score?.split('/')[0]) || 0,
            wickets: parseInt(match.team1Score?.split('/')[1]) || 0,
            overs: match.team1Score?.split('(')[1]?.split(')')[0] || "0.0"
        });
    }
  }, [match]);

  const updateScoreMutation = useMutation({
    mutationFn: (data: any) => matchApi.updateScore(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['match', id] });
      toast.success("Score updated on server");
    }
  });

  const recordBallMutation = useMutation({
    mutationFn: (data: any) => matchApi.recordBall(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['match', id] });
    }
  });

  const handleRecordBall = (runs: number, extra: string = "", wicket: boolean = false) => {
    // 1. Update local state for UI responsiveness
    let newRuns = score.runs + runs;
    let newWickets = score.wickets + (wicket ? 1 : 0);
    // Calculation of overs (simplified for 6 balls per over)
    const [over, ball] = score.overs.split('.').map(Number);
    let nextOver = over;
    let nextBall = ball + 1;
    if (nextBall >= 6) {
        nextOver++;
        nextBall = 0;
        setCurrentOver([]);
    } else {
        setCurrentOver([...currentOver, wicket ? "W" : extra ? extra : String(runs)]);
    }
    const newOvers = `${nextOver}.${nextBall}`;

    setScore({ runs: newRuns, wickets: newWickets, overs: newOvers });

    // 2. Sync with backend
    updateScoreMutation.mutate({
      team1Score: `${newRuns}/${newWickets} (${newOvers})`,
      status: 'LIVE'
    });

    recordBallMutation.mutate({
      runs,
      extras: extra ? 1 : 0,
      wicket,
      over: nextOver,
      ball: nextBall,
      commentary: `${wicket ? 'OUT! ' : ''}${runs} runs scored${extra ? ' (' + extra + ')' : ''}.`
    });
  };

  if (isLoading) return <AdminLayout>Loading match data...</AdminLayout>;
  if (!match) return <AdminLayout>Match not found.</AdminLayout>;

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-display font-black uppercase tracking-tight text-white">Live Match Controller</h1>
          <p className="text-[#9CA3AF] text-sm font-bold uppercase tracking-widest mt-1">
            Real-time ball-by-ball scoring for {match.league?.name || "NDCA League"}.
          </p>
        </div>
        <div className="flex gap-4">
          <Badge variant="outline" className="bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20 font-black uppercase tracking-widest px-4 py-2 animate-pulse-live">
            Match {match.status}
          </Badge>
          <Button variant="outline" className="h-12 border-[#1F2937] text-[#9CA3AF] font-black uppercase text-[10px]">
            <History size={16} className="mr-2" />
            Full Commentary
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Scoring Actions (2/3 width) */}
        <div className="xl:col-span-2 space-y-8">
          {/* Main Scoreboard Card */}
          <Card className="bg-[#111827] border-[#1F2937] overflow-hidden relative">
            <div className="absolute top-0 right-0 p-6 opacity-5">
                <Trophy size={160} />
            </div>
            <CardContent className="p-10 relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                <div className="text-center md:text-left">
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-[#9CA3AF] mb-2">{match.team1?.name} vs {match.team2?.name}</p>
                  <h2 className="text-7xl font-display font-black text-white">
                    {score.runs} <span className="text-[#FACC15]">/ {score.wickets}</span>
                  </h2>
                  <div className="flex items-center gap-6 mt-4">
                    <p className="text-lg font-bold text-[#FACC15] font-sans">Overs: {score.overs}</p>
                    <p className="text-xs font-bold text-[#9CA3AF] uppercase">CRR: {((score.runs / (parseFloat(score.overs) || 1)) || 0).toFixed(2)}</p>
                  </div>
                </div>

                {/* Over Circles */}
                <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-center text-[#9CA3AF]">Current Over</p>
                    <div className="flex gap-3">
                        {[...Array(6)].map((_, i) => (
                            <div 
                                key={i} 
                                className={cn(
                                    "w-12 h-12 rounded-full border-2 flex items-center justify-center font-display font-black text-lg transition-all",
                                    currentOver[i] === "W" ? "bg-[#EF4444] border-[#EF4444] text-white" :
                                    currentOver[i]?.includes("w") ? "bg-[#FACC15]/20 border-[#FACC15] text-[#FACC15]" :
                                    !currentOver[i] ? "border-[#1F2937] text-transparent" :
                                    "bg-[#1F2937] border-[#1F2937] text-white"
                                )}
                            >
                                {currentOver[i]}
                            </div>
                        ))}
                    </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Run Controls */}
            <Card className="bg-[#111827] border-[#1F2937]">
              <CardHeader className="border-b border-[#1F2937]">
                <CardTitle className="text-sm font-black uppercase text-white tracking-widest">Update Score</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-4 gap-3">
                  {["0", "1", "2", "3", "4", "6"].map((run) => (
                    <Button 
                      key={run}
                      onClick={() => handleRecordBall(parseInt(run))}
                      className="h-14 font-display font-black text-xl bg-[#0B1220] hover:bg-[#FACC15] hover:text-[#0B1220] border border-[#1F2937] transition-all"
                    >
                      {run}
                    </Button>
                  ))}
                  {["WD", "NB", "LB", "B"].map((extra) => (
                    <Button 
                      key={extra}
                      onClick={() => handleRecordBall(0, extra)}
                      className="h-14 font-black text-xs uppercase bg-[#0B1220]/50 text-[#FACC15] border border-[#FACC15]/20 hover:bg-[#FACC15] hover:text-[#0B1220] transition-all"
                    >
                      {extra}
                    </Button>
                  ))}
                </div>
                <Button 
                    onClick={() => handleRecordBall(0, "", true)}
                    className="w-full mt-6 h-14 bg-[#EF4444] hover:bg-[#EF4444]/90 text-white font-display font-black text-xl uppercase tracking-widest flex items-center justify-center gap-3"
                >
                    <Zap size={24} />
                    Wicket Out!
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-[#111827] border-[#1F2937]">
              <CardHeader className="border-b border-[#1F2937]">
                <CardTitle className="text-sm font-black uppercase text-white tracking-widest">Innings Control</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <Button variant="outline" className="w-full h-12 border-[#1F2937] text-[#9CA3AF] hover:text-white uppercase text-[10px] font-black justify-between px-6">
                    Change Batsman / Strike
                    <ChevronRight size={16} />
                </Button>
                <Button variant="outline" className="w-full h-12 border-[#1F2937] text-[#9CA3AF] hover:text-white uppercase text-[10px] font-black justify-between px-6">
                    Change Bowler
                    <ChevronRight size={16} />
                </Button>
                <Button 
                    onClick={() => {
                        updateScoreMutation.mutate({ status: 'COMPLETED', result: `${match.team1?.name} score ${score.runs}/${score.wickets}` });
                        toast.success("Match completed!");
                    }}
                    variant="outline" 
                    className="w-full h-12 border-[#1F2937] text-[#9CA3AF] hover:text-[#EF4444] uppercase text-[10px] font-black justify-between px-6"
                >
                    Declare / End Innings
                    <ChevronRight size={16} />
                </Button>
                <div className="pt-2">
                    <Button className="w-full h-12 bg-white/5 border border-white/10 text-white uppercase text-[10px] font-black hover:bg-white/10">
                        <RotateCcw size={16} className="mr-2" />
                        Undo Last Ball
                    </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Current Stats Sidebar */}
        <div className="space-y-6">
           {/* Match Info */}
           <Card className="bg-[#111827] border-[#1F2937]">
              <CardHeader>
                  <CardTitle className="text-xs font-black uppercase text-[#FACC15] tracking-[0.2em]">Match Info</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="flex items-center gap-4 text-xs font-bold text-[#9CA3AF] uppercase mb-4">
                    <Timer size={16} className="text-[#FACC15]" />
                    <span>Venue: {match.venue}</span>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase text-[#9CA3AF]">
                        <span>Match Type</span>
                        <span className="text-white">{match.matchType}</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-black uppercase text-[#9CA3AF]">
                        <span>Date</span>
                        <span className="text-white">{new Date(match.date).toLocaleDateString()}</span>
                    </div>
                </div>
              </CardContent>
           </Card>

           {/* Squads */}
           <Card className="bg-[#111827] border-[#1F2937]">
              <CardHeader className="pb-4">
                <CardTitle className="text-xs font-black uppercase text-[#FACC15] tracking-[0.2em]">Live Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div className="p-4 rounded-xl border bg-[#FACC15]/5 border-[#FACC15]/30">
                    <p className="text-sm font-black text-white font-sans uppercase">Currently Batting</p>
                    <p className="text-lg font-display font-black text-[#FACC15] mt-2">{match.team1?.name}</p>
                  </div>
                  <div className="p-4 rounded-xl border bg-black/20 border-[#1F2937]">
                    <p className="text-sm font-black text-white font-sans uppercase">Bowling</p>
                    <p className="text-lg font-display font-black text-white mt-1">{match.team2?.name}</p>
                  </div>
              </CardContent>
           </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default MatchController;
