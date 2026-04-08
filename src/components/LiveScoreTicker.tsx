const scores = [
  { league: "EPL", home: "Arsenal", away: "Chelsea", homeScore: 1, awayScore: 4, time: "55'" },
  { league: "EPL", home: "Fulham", away: "Man United", homeScore: 0, awayScore: 2, time: "15'" },
  { league: "EPL", home: "Liverpool", away: "Tottenham", homeScore: 4, awayScore: 2, time: "15'" },
  { league: "EPL", home: "Reading", away: "Newcastle", homeScore: 1, awayScore: 2, time: "15'" },
  { league: "EPL", home: "Wolves", away: "Aston Villa", homeScore: 2, awayScore: 4, time: "15'" },
  { league: "EPL", home: "Man City", away: "Sunderland", homeScore: 3, awayScore: 1, time: "15'" },
  { league: "EPL", home: "Burnley", away: "Everton", homeScore: 2, awayScore: 1, time: "15'" },
];

const ScoreItem = ({ match }: { match: typeof scores[0] }) => (
  <div className="flex items-center gap-3 px-4 py-2 border-r border-border/30 whitespace-nowrap">
    <div className="text-xs text-muted-foreground font-medium">{match.league}</div>
    <div className="flex flex-col text-xs">
      <span className="text-foreground/90">{match.home}</span>
      <span className="text-foreground/90">{match.away}</span>
    </div>
    <div className="flex flex-col text-xs font-bold">
      <span>{match.homeScore}</span>
      <span>{match.awayScore}</span>
    </div>
    <div className="text-xs font-semibold text-primary">{match.time}</div>
  </div>
);

const LiveScoreTicker = () => {
  return (
    <div className="glass-strong border-b border-border/20 overflow-hidden">
      <div className="flex items-center">
        <div className="flex-shrink-0 px-4 py-2 border-r border-border/30 flex items-center gap-2 z-10">
          <span className="inline-block w-2 h-2 rounded-full bg-live-red animate-pulse-live" />
          <span className="text-xs font-bold text-primary uppercase tracking-wider">Live Score</span>
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
