const scores = [
  { league: "IPL 2025", home: "RCB", away: "CSK", score: "182/4", overs: "18.2", status: "LIVE" },
  { league: "WPL", home: "MI", away: "UPW", score: "145/8", overs: "20.0", status: "RESULT" },
  { league: "NDCA T20", home: "Nashik Lions", away: "Deolali Raiders", score: "56/2", overs: "6.4", status: "LIVE" },
  { league: "NDCA A-DIV", home: "FCC Nashik", away: "MCC Club", score: "210/3", overs: "35.0", status: "TEA" },
  { league: "IPL 2025", home: "GT", away: "MI", score: "92/1", overs: "10.1", status: "LIVE" },
  { league: "RANJI", home: "MAH", away: "MUM", score: "342/6", overs: "88.0", status: "DAY 2" },
];

const ScoreItem = ({ match }: { match: typeof scores[0] }) => (
  <div className="flex items-center gap-4 px-6 py-2 border-r border-border/30 whitespace-nowrap">
    <div className="flex flex-col">
      <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter mb-0.5">{match.league}</div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-foreground/90">{match.home}</span>
        <span className="text-[10px] text-muted-foreground font-medium">vs</span>
        <span className="text-sm font-bold text-foreground/90">{match.away}</span>
      </div>
    </div>
    <div className="flex flex-col items-end">
      <div className="text-sm font-black text-primary tracking-tight">{match.score}</div>
      <div className="text-[10px] text-muted-foreground font-semibold">({match.overs} ov)</div>
    </div>
    <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${match.status === 'LIVE' ? 'bg-live-red/20 text-live-red animate-pulse' : 'bg-muted text-muted-foreground'}`}>
      {match.status}
    </div>
  </div>
);

const LiveScoreTicker = () => {
  return (
    <div className="glass-strong border-b border-border/20 overflow-hidden backdrop-blur-md">
      <div className="flex items-center">
        <div className="flex-shrink-0 px-5 py-2.5 border-r border-border/30 flex items-center gap-2 z-10 bg-background/50">
          <span className="inline-block w-2 h-2 rounded-full bg-live-red animate-pulse-live" />
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Match Centre</span>
        </div>
        <div className="overflow-hidden flex-1">
          <div className="flex animate-ticker-scroll">
            {[...scores, ...scores].map((match, i) => (
              <ScoreItem key={i} match={match} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveScoreTicker;

