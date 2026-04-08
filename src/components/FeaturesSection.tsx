import { Zap, TrendingUp, Trophy, Tv, BarChart3, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const features = [
  { icon: Trophy, title: "League Management", desc: "Complete tools for creating tournaments, fixtures, and automatic points tables." },
  { icon: Zap, title: "Live Scoring", desc: "Ball-by-ball updates for local matches with instant sync to public apps." },
  { icon: TrendingUp, title: "Player Stats", desc: "Detailed performance tracking, career records, and selection trials management." },
  { icon: BarChart3, title: "Audit & Compliance", desc: "Secure Aadhaar masking and full audit trails for player document approvals." },
  { icon: Tv, title: "Media Centre", desc: "A dedicated space for match highlights, gallery albums, and official news." },
  { icon: Globe, title: "Unified Platform", desc: "One system connecting Super Admin, Clubs, and Players across web and mobile." },
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
