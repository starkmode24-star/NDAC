import heroImg from "@/assets/hero-stadium.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Stadium at night"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, hsl(216 28% 7% / 0.3) 0%, hsl(213 60% 25% / 0.6) 40%, hsl(216 28% 7% / 0.95) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative container pb-16 pt-32">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8">
          {/* Left: Match Card */}
          <div className="animate-slide-left" style={{ animationDelay: "0.2s" }}>
            <MatchCard />
          </div>

          {/* Center: Hero Text */}
          <div className="flex-1 text-center lg:text-left lg:pl-8">
            <div className="mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/70">
              <span className="w-1 h-6 bg-primary rounded-full" />
              Official FIFA World Cup 2030 Streaming
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-live-red text-foreground animate-pulse-live">
                LIVE
              </span>
            </div>
            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold leading-[0.9] tracking-tight uppercase animate-fade-up">
              All Sports.
              <br />
              All Day.
              <br />
              <span className="text-gradient-gold">All in One</span>
              <br />
              <span className="text-gradient-gold">Place</span>
            </h1>
            <p className="mt-6 text-sm sm:text-base text-foreground/70 max-w-md uppercase tracking-wide font-medium animate-fade-up" style={{ animationDelay: "0.3s" }}>
              Breaking news, live scores, in-depth analysis—direct to your feed
            </p>
            <div className="mt-8 flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.5s" }}>
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

          {/* Right: News Cards */}
          <div className="hidden lg:flex flex-col gap-3 w-64 animate-slide-right" style={{ animationDelay: "0.4s" }}>
            <NewsCard
              title="Surprise Strategy: How The New Coach Sparked A Comeback"
              image="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=300&h=180&fit=crop"
            />
            <NewsCard
              title="Blockbuster Transfer: Star Player Joins Rival Club"
              image="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=300&h=180&fit=crop"
            />
            <NewsCard
              title="Derby Thriller: Last-Minute Winning Goal"
              image="https://images.unsplash.com/photo-1508098682722-e99c643e7f76?w=300&h=180&fit=crop"
            />
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
