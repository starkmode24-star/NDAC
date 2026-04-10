import { useState } from "react";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { matchApi } from "@/lib/api";

const MatchController = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [score, setScore] = useState({ runs: 164, wickets: 4, overs: "18.2" });
  const [currentOver, setCurrentOver] = useState(["4", "0", "1w", "6", "W", ""]);

  const recordBallMutation = useMutation({
    mutationFn: (data: any) => matchApi.recordBall(id!, data),
    onSuccess: () => {
      // In a real app, we'd fetch the latest match state here
      // queryClient.invalidateQueries(['match', id]);
    }
  });

  const handleRecordBall = (runs: number, extra: string = "", wicket: boolean = false) => {
    // Current logic: update local state for immediate feedback
    // Real logic: call the API
    const ballData = {
      runs,
      extras: extra ? 1 : 0, // Simplified
      wicket,
      over: Math.floor(parseFloat(score.overs)),
      ball: (parseFloat(score.overs) % 1).toFixed(1) || 0,
      commentary: `${runs} runs scored.`
    };
    
    recordBallMutation.mutate(ballData);
  };
  
  const batsmen = [
    { name: "Rahul Dravid", runs: 74, balls: 45, fours: 8, sixes: 2, sr: 164.4, active: true },
    { name: "VVS Laxman", runs: 42, balls: 28, fours: 4, sixes: 0, sr: 150.0, active: false },
  ];

  const bowler = { name: "Sunil Joshi", overs: "3.2", runs: 28, wickets: 2, econ: 8.4 };


  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-display font-black uppercase tracking-tight text-white">Live Match Controller</h1>
          <p className="text-[#9CA3AF] text-sm font-bold uppercase tracking-widest mt-1">
            Real-time ball-by-ball scoring for Nashik Premier League.
          </p>
        </div>
        <div className="flex gap-4">
          <Badge variant="outline" className="bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20 font-black uppercase tracking-widest px-4 py-2 animate-pulse-live">
            Match Live
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
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-[#9CA3AF] mb-2">Nashik Lions vs Pune Warriors</p>
                  <h2 className="text-7xl font-display font-black text-white">
                    {score.runs} <span className="text-[#FACC15]">/ {score.wickets}</span>
                  </h2>
                  <div className="flex items-center gap-6 mt-4">
                    <p className="text-lg font-bold text-[#FACC15] font-sans">Overs: {score.overs}</p>
                    <p className="text-xs font-bold text-[#9CA3AF] uppercase">CRR: {(score.runs / 18.2).toFixed(2)}</p>
                  </div>
                </div>

                {/* Over Circles */}
                <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-center text-[#9CA3AF]">Current Over</p>
                    <div className="flex gap-3">
                        {currentOver.map((ball, i) => (
                            <div 
                                key={i} 
                                className={cn(
                                    "w-12 h-12 rounded-full border-2 flex items-center justify-center font-display font-black text-lg transition-all",
                                    ball === "W" ? "bg-[#EF4444] border-[#EF4444] text-white" :
                                    ball.includes("w") ? "bg-[#FACC15]/20 border-[#FACC15] text-[#FACC15]" :
                                    ball === "" ? "border-[#1F2937] text-transparent" :
                                    "bg-[#1F2937] border-[#1F2937] text-white"
                                )}
                            >
                                {ball}
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
                <Button variant="outline" className="w-full h-12 border-[#1F2937] text-[#9CA3AF] hover:text-white uppercase text-[10px] font-black justify-between px-6">
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
           {/* Batting Stats */}
           <Card className="bg-[#111827] border-[#1F2937]">
              <CardHeader className="pb-4">
                <CardTitle className="text-xs font-black uppercase text-[#FACC15] tracking-[0.2em]">Currently Batting</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {batsmen.map((b) => (
                  <div key={b.name} className={cn(
                    "p-4 rounded-xl border transition-all",
                    b.active ? "bg-[#FACC15]/5 border-[#FACC15]/30" : "bg-black/20 border-[#1F2937] opacity-60"
                  )}>
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm font-black text-white font-sans">{b.name} {b.active && <span className="text-[#FACC15] ml-1">*</span>}</p>
                      <p className="text-xs font-black text-white font-display text-lg">{b.runs}</p>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-[#9CA3AF] uppercase">
                      <span>Balls: {b.balls}</span>
                      <span>4s/6s: {b.fours}/{b.sixes}</span>
                      <span>SR: {b.sr}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
           </Card>

           {/* Bowling Stats */}
           <Card className="bg-[#111827] border-[#1F2937]">
              <CardHeader className="pb-4">
                <CardTitle className="text-xs font-black uppercase text-[#FACC15] tracking-[0.2em]">Current Bowler</CardTitle>
              </CardHeader>
              <CardContent>
                 <div className="p-4 rounded-xl bg-[#FACC15]/5 border border-[#FACC15]/30">
                    <p className="text-sm font-black text-white font-sans mb-3">{bowler.name}</p>
                    <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 rounded bg-black/20">
                            <p className="text-[9px] font-black text-[#9CA3AF] uppercase mb-1">Overs</p>
                            <p className="text-sm font-black text-white">{bowler.overs}</p>
                        </div>
                        <div className="p-2 rounded bg-black/20">
                            <p className="text-[9px] font-black text-[#9CA3AF] uppercase mb-1">Runs</p>
                            <p className="text-sm font-black text-white">{bowler.runs}</p>
                        </div>
                        <div className="p-2 rounded bg-black/20">
                            <p className="text-[9px] font-black text-[#9CA3AF] uppercase mb-1">Wkts</p>
                            <p className="text-sm font-black text-[#FACC15]">{bowler.wickets}</p>
                        </div>
                    </div>
                 </div>
              </CardContent>
           </Card>

           {/* Match Info */}
           <Card className="bg-[#111827] border-[#1F2937]">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 text-xs font-bold text-[#9CA3AF] uppercase mb-4">
                    <Timer size={16} className="text-[#FACC15]" />
                    <span>Time Elapsed: 02:45:12</span>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase text-[#9CA3AF]">
                        <span>Target score</span>
                        <span className="text-white">186</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-black uppercase text-[#9CA3AF]">
                        <span>Needed Runs</span>
                        <span className="text-white">22</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-black uppercase text-[#9CA3AF]">
                        <span>Req. Rate</span>
                        <span className="text-[#FACC15]">13.20</span>
                    </div>
                </div>
              </CardContent>
           </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default MatchController;
