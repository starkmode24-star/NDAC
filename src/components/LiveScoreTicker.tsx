import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { matchApi } from "@/lib/api";
import { socket, connectSocket } from "@/lib/socket";

const ScoreItem = ({ match }: { match: any }) => (
  <div className="flex items-center gap-4 px-6 py-2 border-r border-border/30 whitespace-nowrap">
    <div className="flex flex-col">
      <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter mb-0.5">{match.league?.name || 'Local'}</div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-foreground/90">{match.team1?.name}</span>
        <span className="text-[10px] text-muted-foreground font-medium">vs</span>
        <span className="text-sm font-bold text-foreground/90">{match.team2?.name}</span>
      </div>
    </div>
    <div className="flex flex-col items-end">
      <div className="text-sm font-black text-primary tracking-tight">{match.team1Score || '0'} - {match.team2Score || '0'}</div>
      <div className="text-[10px] text-muted-foreground font-semibold">({match.status})</div>
    </div>
    <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${match.status === 'LIVE' ? 'bg-live-red/20 text-live-red animate-pulse' : 'bg-muted text-muted-foreground'}`}>
      {match.status}
    </div>
  </div>
);

const LiveScoreTicker = () => {
  const { data: initialScores } = useQuery({
    queryKey: ['live-scores'],
    queryFn: async () => {
      const response = await matchApi.getAll();
      return response.data;
    }
  });

  const [liveScores, setLiveScores] = useState<any[]>([]);

  useEffect(() => {
    if (initialScores) {
      setLiveScores(initialScores);
    }
  }, [initialScores]);

  useEffect(() => {
    connectSocket();
    
    socket.on('scoreUpdate', (update: any) => {
      setLiveScores(prev => prev.map(m => m.id === update.matchId ? update.score : m));
    });

    return () => {
      socket.off('scoreUpdate');
    };
  }, []);

  return (
    <div className="glass-strong border-b border-border/20 overflow-hidden backdrop-blur-md">
      <div className="flex items-center">
        <div className="flex-shrink-0 px-5 py-2.5 border-r border-border/30 flex items-center gap-2 z-10 bg-background/50">
          <span className="inline-block w-2 h-2 rounded-full bg-live-red animate-pulse-live" />
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Match Centre</span>
        </div>
        <div className="overflow-hidden flex-1">
          <div className="flex animate-ticker-scroll">
            {liveScores && liveScores.length > 0 ? [...liveScores, ...liveScores].map((match, i) => (
              <ScoreItem key={i} match={match} />
            )) : (
              <div className="px-6 py-2 text-[10px] text-muted-foreground uppercase font-black">No Live Matches Currently</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveScoreTicker;

