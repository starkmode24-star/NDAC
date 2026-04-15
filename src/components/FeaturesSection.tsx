import { Zap, TrendingUp, Trophy, Tv, BarChart3, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const features = [
  { icon: Trophy, title: "League Management", desc: "Complete tools for creating tournaments, fixtures, and automatic points tables.", color: "text-[#FACC15]" },
  { icon: Zap, title: "Live Scoring", desc: "Ball-by-ball updates for local matches with instant sync to public apps.", color: "text-[#22C55E]" },
  { icon: TrendingUp, title: "Player Stats", desc: "Detailed performance tracking, career records, and selection trials management.", color: "text-[#3B82F6]" },
  { icon: BarChart3, title: "Audit & Compliance", desc: "Secure Aadhaar masking and full audit trails for player document approvals.", color: "text-[#A855F7]" },
  { icon: Tv, title: "Media Centre", desc: "A dedicated space for match highlights, gallery albums, and official news.", color: "text-[#F97316]" },
  { icon: Globe, title: "Unified Platform", desc: "One system connecting Super Admin, Clubs, and Players across web and mobile.", color: "text-[#06B6D4]" },
];

const FeaturesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="py-28 relative overflow-hidden" ref={ref}>
      {/* Cinematic background and floating orbs */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-navy-light/10 to-background" />
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-[100px] animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary/3 blur-[120px] animate-float" style={{ animationDelay: "1.5s" }} />

      <div className="container relative">
        <div className="text-center mb-20">
          <span className={`inline-block text-xs uppercase tracking-[0.3em] text-primary font-black mb-4 ${visible ? "animate-fade-up" : "opacity-0"}`}>
            NDCA Ecosystem
          </span>
          <h2 className={`font-display text-4xl sm:text-5xl lg:text-7xl font-black uppercase mt-4 tracking-tight leading-[0.95] ${visible ? "animate-reveal-up" : "opacity-0"}`}>
            Comprehensive Management
          </h2>
          <div className={`w-24 h-1 bg-primary mx-auto mt-6 rounded-full ${visible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.3s" }} />
          <p className={`text-muted-foreground mt-6 max-w-2xl mx-auto text-base font-medium leading-relaxed ${visible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.4s" }}>
            Bridging the gap between players, clubs, and fans with high-performance digital tools.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`group card-premium card-interactive card-glow-gold rounded-2xl p-8 ${visible ? "animate-reveal-up" : "opacity-0"}`}
              style={{
                animationDelay: `${0.1 + i * 0.12}s`,
                perspective: "1000px",
              }}
            >
              <div className="icon-box-premium mb-6">
                <f.icon size={26} className={f.color} />
              </div>
              <h3 className="font-display text-xl font-bold uppercase mb-3 tracking-wide group-hover:text-primary transition-colors">
                {f.title}
              </h3>
              <p className="text-sm text-foreground/60 leading-relaxed font-medium">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;