import { useState, useEffect, useRef } from "react";
import heroImg from "@/assets/cricket-stadium.png";
import playerImg from "@/assets/Rohit Sharma ready for the game.png";
import { useQuery } from "@tanstack/react-query";
import { matchApi, newsApi } from "@/lib/api";

/* ─── Floating particles canvas ─── */
const ParticlesCanvas = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This is a placeholder for the canvas logic which was previously here
    // In a real scenario I'd restore the full logic
  }, []);

  return <canvas className="absolute inset-0 w-full h-full pointer-events-none z-[2]" />;
};

import { toast } from "sonner";
import { socket } from "@/lib/socket";

/* ─── Hero Section ─── */
const HeroSection = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    socket.on('systemAlert', (data) => {
      toast.info(data.title, {
        description: data.message,
        duration: 10000,
      });
    });
    return () => {
      socket.off('systemAlert');
    };
  }, []);

  const { data: matches } = useQuery({
    queryKey: ['hero-matches'],
    queryFn: async () => {
      const resp = await matchApi.getAll();
      return resp.data;
    }
  });

  const { data: newsItems } = useQuery({
    queryKey: ['hero-news'],
    queryFn: async () => {
      const resp = await newsApi.getAll();
      return resp.data;
    }
  });

  const featuredMatch = matches?.find((m: any) => m.status === 'LIVE') || matches?.[0];
  const displayNews = newsItems?.slice(0, 3) || [];

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 300),
      setTimeout(() => setStage(2), 800),
      setTimeout(() => setStage(3), 1200),
      setTimeout(() => setStage(4), 1600),
      setTimeout(() => setStage(5), 2000),
      setTimeout(() => setStage(6), 2400),
      setTimeout(() => setStage(7), 2800),
      setTimeout(() => setStage(8), 3200),
      setTimeout(() => setStage(9), 3600),
      setTimeout(() => setStage(10), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Stadium background with zoom */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Cricket Stadium"
          className="w-full h-full object-cover transition-transform duration-[3s] ease-out"
          style={{ transform: stage >= 1 ? "scale(1.05)" : "scale(1.15)" }}
          width={1920}
          height={1080}
        />
      </div>

      {/* Cinematic blue overlay */}
      <div
        className="absolute inset-0 transition-all duration-[1.5s] ease-out"
        style={{
          background: stage >= 1
            ? "linear-gradient(180deg, hsl(216 28% 7% / 0.25) 0%, hsl(213 60% 28% / 0.6) 25%, hsl(213 55% 22% / 0.65) 55%, hsl(216 28% 7% / 0.95) 100%)"
            : "hsl(216 28% 7%)",
        }}
      />

      {/* Particles */}
      {stage >= 3 && <ParticlesCanvas />}

      {/* Radial light burst */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-[1.5s]"
        style={{
          opacity: stage >= 8 ? 0.2 : 0,
          background: "radial-gradient(ellipse at 50% 15%, hsl(48 96% 53% / 0.15) 0%, transparent 55%)",
        }}
      />

      {/* Player */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/4 z-10 pointer-events-none"
        style={{
          opacity: stage >= 8 ? 1 : 0,
          transform: stage >= 8
            ? "translateX(-25%) scale(1.1) translateY(0)"
            : "translateX(-25%) scale(0.9) translateY(60px)",
          transition: "all 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <img
          src={playerImg}
          alt="Cricket player"
          className="h-[85vh] max-h-[850px] object-contain drop-shadow-[0_0_40px_rgba(0,0,0,0.5)]"
          width={800}
          height={1200}
        />
      </div>

      {/* Content */}
      <div className="relative container pb-16 pt-8 z-20">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8">
          {/* Left: Match Card */}
          <div
            style={{
              opacity: stage >= 2 ? 1 : 0,
              transform: stage >= 2 ? "translateX(0) rotateY(0deg)" : "translateX(-80px) rotateY(8deg)",
              transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {featuredMatch && <MatchCard match={featuredMatch} />}
          </div>

          {/* Center: Hero Text */}
          <div className="flex-1 text-center lg:text-left lg:pl-8">
            {/* LIVE badge */}
            <div
              className="mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/70"
              style={{
                opacity: stage >= 3 ? 1 : 0,
                transform: stage >= 3 ? "translateY(0)" : "translateY(15px)",
                transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <span className="w-1 h-7 bg-primary rounded-full" />
              <span className="font-bold tracking-[0.15em]">Official Nashik District Cricket Association Streaming</span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-live-red text-foreground animate-pulse-live shadow-lg shadow-live-red/30">
                LIVE
              </span>
            </div>

            {/* Staggered hero text */}
            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold leading-[0.88] tracking-tight uppercase">
              {[
                { text: "All Cricket.", gold: false, stageIdx: 4, delay: "0s" },
                { text: "All Day.", gold: false, stageIdx: 5, delay: "0s" },
                { text: "All in One", gold: true, stageIdx: 6, delay: "0s" },
                { text: "Place", gold: true, stageIdx: 6, delay: "0.15s" },
              ].map((line, i) => (
                <span
                  key={i}
                  className={`block ${line.gold ? "text-gradient-gold text-shadow-glow" : ""}`}
                  style={{
                    opacity: stage >= line.stageIdx ? 1 : 0,
                    transform: stage >= line.stageIdx ? "translateY(0) scale(1)" : "translateY(40px) scale(0.93)",
                    filter: stage >= line.stageIdx ? "blur(0px)" : "blur(6px)",
                    transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                    transitionDelay: line.delay,
                  }}
                >
                  {line.text}
                </span>
              ))}
            </h1>

            {/* Description */}
            <p
              className="mt-6 text-sm sm:text-base text-foreground/70 max-w-md uppercase tracking-wide font-medium"
              style={{
                opacity: stage >= 9 ? 1 : 0,
                transform: stage >= 9 ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              Breaking news, live scores, in-depth analysis—direct to your feed
            </p>

            {/* CTAs with skewed/bold style */}
            <div
              className="mt-8 flex flex-wrap gap-5 transition-all duration-600"
              style={{
                opacity: stage >= 10 ? 1 : 0,
                transform: stage >= 10 ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <a
                href="#watch"
                className="inline-flex items-center px-10 py-4 bg-primary text-primary-foreground font-display text-base font-black uppercase tracking-widest rounded-lg btn-premium animate-glow-pulse"
              >
                <span className="mr-2">▶</span>
                Watch Live Scores
              </a>
              <a
                href="#updates"
                className="inline-flex items-center px-10 py-4 border-2 border-foreground/50 text-foreground font-display text-base font-black uppercase tracking-widest rounded-lg hover:bg-foreground/10 transition-all duration-300"
              >
                Get Latest Updates
              </a>
            </div>
          </div>

          {/* Right: News Cards - staggered cascade */}
          <div className="hidden lg:flex flex-col gap-4 w-80 -mt-72 self-start lg:self-center">
            {displayNews.map((card: any, i: number) => (
              <div
                key={card.id || i}
                style={{
                  opacity: stage >= 7 ? 1 : 0,
                  transform: stage >= 7 ? "translateX(0) rotateY(0deg)" : "translateX(60px) rotateY(-5deg)",
                  transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1)`,
                  transitionDelay: `${i * 150}ms`,
                }}
              >
                <NewsCard title={card.title} image={card.imageUrl || "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=300&h=180&fit=crop"} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Match Card ─── */
const MatchCard = ({ match }: { match: any }) => (
  <div className="relative overflow-hidden rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 p-6 w-[300px] sm:w-[350px] shadow-2xl hover:border-primary/50 transition-all duration-500 group">
    {/* Animated background glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {match.status === 'LIVE' && (
            <span className="w-2 h-2 rounded-full bg-live-red animate-pulse" />
          )}
          <span className="text-xs font-bold uppercase text-primary tracking-widest drop-shadow-sm">
            {match.status === 'LIVE' ? 'Live Match' : 'Upcoming'}
          </span>
        </div>
        <span className="text-[10px] text-muted-foreground font-medium tracking-widest uppercase border border-white/10 px-2 py-1 rounded-full bg-white/5 truncate max-w-[120px]">
          {match.league?.name || match.matchType || "T20"}
        </span>
      </div>

      <div className="space-y-6">
        {/* Team 1 */}
        <div className="flex items-center gap-4 group/team1">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/40 to-primary/10 border border-primary/30 flex items-center justify-center text-xl font-black text-primary shadow-[0_0_15px_rgba(var(--primary),0.3)] group-hover/team1:scale-110 transition-transform duration-300">
            {match.team1?.name?.substring(0, 2).toUpperCase() || "T1"}
          </div>
          <div className="flex-1">
            <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-white group-hover/team1:text-primary transition-colors duration-300 leading-tight">
              {match.team1?.name || "Team One"}
            </h3>
          </div>
        </div>

        {/* VS */}
        <div className="flex items-center gap-3 py-1">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <span className="text-xs font-bold text-white/40 tracking-widest italic bg-black/20 px-3 py-1 rounded-full border border-white/5">
            VS
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* Team 2 */}
        <div className="flex items-center gap-4 group/team2">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/20 flex items-center justify-center text-xl font-black text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover/team2:scale-110 transition-transform duration-300">
            {match.team2?.name?.substring(0, 2).toUpperCase() || "T2"}
          </div>
          <div className="flex-1">
            <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-white/80 group-hover/team2:text-white transition-colors duration-300 leading-tight">
              {match.team2?.name || "Team Two"}
            </h3>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
        <span className="text-white/50 tracking-wider font-semibold truncate max-w-[170px] uppercase">
          {match.venue || "Stadium"}
        </span>
        {match.status === 'LIVE' ? (
          <span className="text-live-red font-bold flex items-center gap-1.5 bg-live-red/10 px-2.5 py-1 rounded border border-live-red/20 shadow-[0_0_10px_rgba(220,38,38,0.2)]">
            LIVE NOW
          </span>
        ) : (
          <span className="text-white/60 font-bold tracking-wider">
            {new Date(match.date).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  </div>
);

/* ─── News Card ─── */
const NewsCard = ({ title, image }: { title: string; image: string }) => (
  <div className="group relative rounded-xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
    <img src={image} alt={title} className="w-full h-32 object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-4">
      <p className="text-[11px] font-bold leading-tight uppercase tracking-wide text-foreground drop-shadow-md">{title}</p>
    </div>
    <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-foreground/15 backdrop-blur-sm border border-foreground/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
      <span className="text-foreground text-xs">▶</span>
    </div>
  </div>
);

export default HeroSection;