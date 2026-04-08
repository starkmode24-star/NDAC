import { Zap, TrendingUp, Trophy, Tv, BarChart3, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const features = [
  { icon: Tv, title: "Live Streaming", desc: "Watch every game in HD with zero lag, available across all your devices." },
  { icon: Zap, title: "Real-Time Scores", desc: "Instant score updates with detailed match statistics and play-by-play." },
  { icon: TrendingUp, title: "In-Depth Analysis", desc: "Expert commentary and tactical breakdowns from top sports analysts." },
  { icon: Trophy, title: "All Leagues", desc: "Coverage of 200+ leagues from football, basketball, tennis, and more." },
  { icon: BarChart3, title: "Stats & Data", desc: "Advanced analytics, player comparisons, and predictive insights." },
  { icon: Globe, title: "Global Coverage", desc: "Sports events from every continent, 24/7 without geographic limits." },
];

const FeaturesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-navy-light/30 to-background" />
      <div className="container relative">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">Why Choose Us</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase mt-3">
            Everything You Need
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto text-sm">
            One platform for all your sports entertainment needs—built for fans who never want to miss a moment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`group glass rounded-xl p-6 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 ${
                visible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon size={22} className="text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold uppercase mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
