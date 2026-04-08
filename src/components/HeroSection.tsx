import { useState, useEffect } from "react";
import heroImg from "@/assets/hero-stadium.jpg";
import playerImg from "@/assets/player-cutout.png";

const HeroSection = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 300),   // Blue overlay appears
      setTimeout(() => setStage(2), 800),   // Match card slides in
      setTimeout(() => setStage(3), 1200),  // "LIVE" badge + streaming text
      setTimeout(() => setStage(4), 1600),  // Line 1: "ALL SPORTS."
      setTimeout(() => setStage(5), 2000),  // Line 2: "ALL DAY."
      setTimeout(() => setStage(6), 2400),  // Line 3: "ALL IN ONE PLACE" (gold)
      setTimeout(() => setStage(7), 2800),  // News cards cascade in
      setTimeout(() => setStage(8), 3200),  // Player image fades in
      setTimeout(() => setStage(9), 3600),  // Description text
      setTimeout(() => setStage(10), 4000), // CTA buttons slide up
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-end overflow-hidden">
      {/* Stadium background */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Stadium at night"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
      </div>

      {/* Blue gradient overlay - curtain reveal */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{
          background: stage >= 1
            ? "linear-gradient(180deg, hsl(216 28% 7% / 0.3) 0%, hsl(213 60% 30% / 0.65) 30%, hsl(213 55% 25% / 0.7) 60%, hsl(216 28% 7% / 0.95) 100%)"
            : "hsl(216 28% 7%)",
        }}
      />

      {/* Light rays effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{
          opacity: stage >= 8 ? 0.15 : 0,
          background: "radial-gradient(ellipse at 50% 20%, hsl(210 60% 80% / 0.3) 0%, transparent 60%)",
        }}
      />

      {/* Player image - center/right */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/3 z-10 pointer-events-none transition-all duration-[1.2s] ease-out"
        style={{
          opacity: stage >= 8 ? 1 : 0,
          transform: stage >= 8
            ? "translateX(-33%) scale(1)"
            : "translateX(-33%) scale(0.9) translateY(40px)",
        }}
      >
        <img
          src={playerImg}
          alt="Football player"
          className="h-[70vh] max-h-[700px] object-contain drop-shadow-2xl"
          width={800}
          height={1200}
        />
      </div>

      {/* Content */}
      <div className="relative container pb-16 pt-32 z-20">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8">
          {/* Left: Match Card */}
          <div
            className="transition-all duration-700 ease-out"
            style={{
              opacity: stage >= 2 ? 1 : 0,
              transform: stage >= 2 ? "translateX(0)" : "translateX(-60px)",
            }}
          >
            <MatchCard />
          </div>

          {/* Center: Hero Text */}
          <div className="flex-1 text-center lg:text-left lg:pl-8">
            {/* LIVE badge */}
            <div
              className="mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/70 transition-all duration-500"
              style={{
                opacity: stage >= 3 ? 1 : 0,
                transform: stage >= 3 ? "translateY(0)" : "translateY(10px)",
              }}
            >
              <span className="w-1 h-6 bg-primary rounded-full" />
              Official FIFA World Cup 2030 Streaming
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-live-red text-foreground animate-pulse-live">
                LIVE
              </span>
            </div>

            {/* Staggered hero text lines */}
            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold leading-[0.9] tracking-tight uppercase">
              <span
                className="block transition-all duration-700 ease-out"
                style={{
                  opacity: stage >= 4 ? 1 : 0,
                  transform: stage >= 4 ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
                  filter: stage >= 4 ? "blur(0px)" : "blur(4px)",
                }}
              >
                All Sports.
              </span>
              <span
                className="block transition-all duration-700 ease-out"
                style={{
                  opacity: stage >= 5 ? 1 : 0,
                  transform: stage >= 5 ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
                  filter: stage >= 5 ? "blur(0px)" : "blur(4px)",
                }}
              >
                All Day.
              </span>
              <span
                className="block text-gradient-gold transition-all duration-700 ease-out"
                style={{
                  opacity: stage >= 6 ? 1 : 0,
                  transform: stage >= 6 ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
                  filter: stage >= 6 ? "blur(0px)" : "blur(4px)",
                }}
              >
                All in One
              </span>
              <span
                className="block text-gradient-gold transition-all duration-700 ease-out"
                style={{
                  opacity: stage >= 6 ? 1 : 0,
                  transform: stage >= 6 ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
                  filter: stage >= 6 ? "blur(0px)" : "blur(4px)",
                  transitionDelay: "0.15s",
                }}
              >
                Place
              </span>
            </h1>

            {/* Description */}
            <p
              className="mt-6 text-sm sm:text-base text-foreground/70 max-w-md uppercase tracking-wide font-medium transition-all duration-600"
              style={{
                opacity: stage >= 9 ? 1 : 0,
                transform: stage >= 9 ? "translateY(0)" : "translateY(20px)",
              }}
            >
              Breaking news, live scores, in-depth analysis—direct to your feed
            </p>

            {/* CTAs */}
            <div
              className="mt-8 flex flex-wrap gap-4 transition-all duration-600"
              style={{
                opacity: stage >= 10 ? 1 : 0,
                transform: stage >= 10 ? "translateY(0)" : "translateY(25px)",
              }}
            >
              <a
                href="#watch"
                className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground font-display text-sm font-bold uppercase tracking-wider rounded hover:brightness-110 transition-all duration-200 shadow-lg shadow-primary/20"
              >
                Watch Live Scores
              </a>
              <a
                href="#updates"
                className="inline-flex items-center px-8 py-3 border border-foreground/30 text-foreground font-display text-sm font-bold uppercase tracking-wider rounded hover:bg-foreground/10 transition-all duration-200"
              >
                Get Latest Updates
              </a>
            </div>
          </div>

          {/* Right: News Cards - staggered cascade */}
          <div className="hidden lg:flex flex-col gap-3 w-64">
            {[
              {
                title: "Surprise Strategy: How The New Coach Sparked A Comeback",
                image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=300&h=180&fit=crop",
                delay: 0,
              },
              {
                title: "Blockbuster Transfer: Star Player Joins Rival Club",
                image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=300&h=180&fit=crop",
                delay: 150,
              },
              {
                title: "Derby Thriller: Last-Minute Winning Goal",
                image: "https://images.unsplash.com/photo-1508098682722-e99c643e7f76?w=300&h=180&fit=crop",
                delay: 300,
              },
            ].map((card) => (
              <div
                key={card.title}
                className="transition-all duration-700 ease-out"
                style={{
                  opacity: stage >= 7 ? 1 : 0,
                  transform: stage >= 7 ? "translateX(0)" : "translateX(50px)",
                  transitionDelay: `${card.delay}ms`,
                }}
              >
                <NewsCard title={card.title} image={card.image} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const MatchCard = () => (
  <div className="glass rounded-lg p-5 w-72">
    <div className="flex items-center gap-2 mb-4">
      <span className="text-xs font-bold uppercase text-primary tracking-wider bg-primary/10 px-2 py-1 rounded">
        Next Matches
      </span>
      <div className="flex-1 h-px bg-primary/30" />
    </div>
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <p className="font-display text-2xl font-bold uppercase">Japan</p>
        </div>
        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-lg">🇯🇵</div>
      </div>
      <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase bg-live-red text-foreground rounded">
        Versus
      </span>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <p className="font-display text-2xl font-bold uppercase">France</p>
        </div>
        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-lg">🇫🇷</div>
      </div>
      <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border/30">
        <span>18 JAN 2025</span>
        <span className="text-primary font-semibold">22:00 WIB</span>
      </div>
    </div>
  </div>
);

const NewsCard = ({ title, image }: { title: string; image: string }) => (
  <div className="group relative rounded-lg overflow-hidden cursor-pointer">
    <img src={image} alt={title} className="w-full h-28 object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-3">
      <p className="text-[11px] font-semibold leading-tight uppercase tracking-wide">{title}</p>
    </div>
    <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-foreground/20 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
      <span className="text-foreground text-xs">▶</span>
    </div>
  </div>
);

export default HeroSection;
