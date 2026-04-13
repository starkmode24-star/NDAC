import { useState, useEffect, useRef, useCallback } from "react";
import heroImg from "@/assets/cricket-stadium.png";
import playerImg from "@/assets/Rohit Sharma ready for the game.png";

/* ─── Floating particles canvas ─── */
const ParticlesCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 0.5,
        a: Math.random() * 0.4 + 0.1,
      });
    }

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(48, 96%, 53%, ${p.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[2]" />;
};

/* ─── Hero Section ─── */
const HeroSection = () => {
  const [stage, setStage] = useState(0);

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
        className="absolute bottom-0 left-1/2 -translate-x-1/3 z-10 pointer-events-none"
        style={{
          opacity: stage >= 8 ? 1 : 0,
          transform: stage >= 8
            ? "translateX(-33%) scale(1) translateY(0)"
            : "translateX(-33%) scale(0.85) translateY(60px)",
          transition: "all 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <img
          src={playerImg}
          alt="Cricket player"
          className="h-[78vh] max-h-[780px] object-contain drop-shadow-[0_0_40px_rgba(0,0,0,0.5)]"
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
            <MatchCard />
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
<<<<<<< HEAD
              className="mt-8 flex flex-wrap gap-4"
=======
              className="mt-8 flex flex-wrap gap-5 transition-all duration-600"
>>>>>>> 8c50e00 (UI/UX Enhancements & Rebranding: Premium card system, live match indicators, enhanced CTA buttons, and NDAC branding transition. Fixed backend type errors and frontend rendering crashes.)
              style={{
                opacity: stage >= 10 ? 1 : 0,
                transform: stage >= 10 ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <a
                href="#watch"
<<<<<<< HEAD
                className="group inline-flex items-center px-8 py-3.5 bg-primary text-primary-foreground font-display text-sm font-bold uppercase tracking-wider rounded-lg hover:brightness-110 transition-all duration-300 shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:scale-105"
=======
                className="inline-flex items-center px-10 py-4 bg-primary text-primary-foreground font-display text-base font-black uppercase tracking-widest rounded-lg btn-premium animate-glow-pulse"
>>>>>>> 8c50e00 (UI/UX Enhancements & Rebranding: Premium card system, live match indicators, enhanced CTA buttons, and NDAC branding transition. Fixed backend type errors and frontend rendering crashes.)
              >
                <span className="mr-2">▶</span>
                Watch Live Scores
              </a>
              <a
                href="#updates"
<<<<<<< HEAD
                className="inline-flex items-center px-8 py-3.5 border-2 border-foreground/25 text-foreground font-display text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-foreground/10 hover:border-foreground/40 transition-all duration-300 hover:scale-105"
=======
                className="inline-flex items-center px-10 py-4 border-2 border-foreground/50 text-foreground font-display text-base font-black uppercase tracking-widest rounded-lg hover:bg-foreground/10 transition-all duration-300"
>>>>>>> 8c50e00 (UI/UX Enhancements & Rebranding: Premium card system, live match indicators, enhanced CTA buttons, and NDAC branding transition. Fixed backend type errors and frontend rendering crashes.)
              >
                Get Latest Updates
              </a>
            </div>
          </div>

<<<<<<< HEAD
          {/* Right: News Cards */}
          <div className="hidden lg:flex flex-col gap-5 w-80">
=======
          {/* Right: News Cards - staggered cascade */}
          <div className="hidden lg:flex flex-col gap-4 w-80 -mt-72 self-start lg:self-center">
>>>>>>> 8c50e00 (UI/UX Enhancements & Rebranding: Premium card system, live match indicators, enhanced CTA buttons, and NDAC branding transition. Fixed backend type errors and frontend rendering crashes.)
            {[
              {
                title: "Pitch Report: How the Dry Surface Will Impact Spinners",
                image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=300&h=180&fit=crop",
                delay: 0,
              },
              {
                title: "Star Player Sign-up: Regional Star Joins NDCA A-DIV",
                image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=300&h=180&fit=crop",
                delay: 150,
              },
              {
                title: "Derby Highlight: Last-Over Boundary Wins It",
                image: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=300&h=180&fit=crop",
                delay: 300,
              },
            ].map((card) => (
              <div
                key={card.title}
                style={{
                  opacity: stage >= 7 ? 1 : 0,
                  transform: stage >= 7 ? "translateX(0) rotateY(0deg)" : "translateX(60px) rotateY(-5deg)",
                  transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1)`,
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

/* ─── Match Card ─── */
const MatchCard = () => (
  <div className="glass rounded-xl p-5 w-72 glow-gold hover:glow-gold-strong transition-all duration-500">
    <div className="flex items-center gap-2 mb-4">
      <span className="text-xs font-bold uppercase text-primary tracking-wider bg-primary/10 px-2.5 py-1 rounded-md">
        Next Matches
      </span>
      <div className="flex-1 h-px bg-primary/30" />
    </div>
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <p className="font-display text-2xl font-bold uppercase tracking-tighter">Nashik Lions</p>
        </div>
        <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center text-lg font-black text-primary">NL</div>
      </div>
      <div className="flex items-center gap-2">
        <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase bg-live-red text-foreground rounded shadow-lg shadow-live-red/20">
          Versus
        </span>
        <span className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">T20 Bash</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <p className="font-display text-2xl font-bold uppercase tracking-tighter">Deolali Raiders</p>
        </div>
        <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center text-lg font-black text-primary">DR</div>
      </div>
      <div className="flex items-center gap-4 text-xs text-muted-foreground pt-3 border-t border-border/30">
        <span className="tracking-wider">GOLF CLUB GROUND</span>
        <span className="text-primary font-bold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-live-red animate-pulse-live" />
          LIVE NOW
        </span>
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