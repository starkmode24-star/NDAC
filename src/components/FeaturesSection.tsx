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
<<<<<<< HEAD
    <section id="features" className="py-28 relative overflow-hidden" ref={ref}>
      {/* Cinematic background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-navy-light/30 to-background" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-[100px] animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary/3 blur-[120px] animate-float" style={{ animationDelay: "1.5s" }} />

      <div className="container relative">
        {/* Section header with dramatic reveal */}
        <div className="text-center mb-20">
          <span
            className={`inline-block text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4 ${visible ? "animate-fade-up" : "opacity-0"}`}
          >
            Why Choose Us
          </span>
          <h2
            className={`font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold uppercase leading-[0.95] ${visible ? "animate-reveal-up" : "opacity-0"}`}
            style={{ animationDelay: "0.15s" }}
          >
            Everything You Need
          </h2>
          <div
            className={`w-24 h-1 bg-primary mx-auto mt-6 rounded-full ${visible ? "animate-fade-up" : "opacity-0"}`}
            style={{ animationDelay: "0.3s" }}
          />
          <p
            className={`text-muted-foreground mt-6 max-w-lg mx-auto text-sm leading-relaxed ${visible ? "animate-fade-up" : "opacity-0"}`}
            style={{ animationDelay: "0.4s" }}
          >
            One platform for all your sports entertainment needs—built for fans who never want to miss a moment.
          </p>
        </div>

        {/* Feature cards with 3D hover and staggered reveal */}
=======
    <section id="features" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-navy-light/10 to-background" />
      <div className="container relative">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-[0.3em] text-primary font-black">NDCA Ecosystem</span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase mt-4 tracking-tight">
            Comprehensive Management
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-base font-medium">
            Bridging the gap between players, clubs, and fans with high-performance digital tools.
          </p>
        </div>

>>>>>>> 8c50e00 (UI/UX Enhancements & Rebranding: Premium card system, live match indicators, enhanced CTA buttons, and NDAC branding transition. Fixed backend type errors and frontend rendering crashes.)
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={f.title}
<<<<<<< HEAD
              className={`group relative glass rounded-xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 animate-border-glow ${
                visible ? "animate-reveal-up" : "opacity-0"
=======
              className={`group card-premium card-interactive card-glow-gold rounded-2xl p-8 ${
                visible ? "animate-fade-up" : "opacity-0"
>>>>>>> 8c50e00 (UI/UX Enhancements & Rebranding: Premium card system, live match indicators, enhanced CTA buttons, and NDAC branding transition. Fixed backend type errors and frontend rendering crashes.)
              }`}
              style={{
                animationDelay: `${0.1 + i * 0.12}s`,
                perspective: "1000px",
              }}
            >
<<<<<<< HEAD
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon with animated border */}
              <div className="relative w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:glow-gold transition-all duration-500 group-hover:scale-110">
                <f.icon size={24} className="text-primary transition-transform duration-500 group-hover:scale-110" />
              </div>

              <h3 className="font-display text-xl font-bold uppercase mb-3 group-hover:text-primary transition-colors duration-300">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
=======
              <div className="icon-box-premium mb-6">
                <f.icon size={26} className={f.color} />
              </div>
              <h3 className="font-display text-xl font-bold uppercase mb-3 tracking-wide group-hover:text-primary transition-colors">{f.title}</h3>
              <p className="text-sm text-foreground/60 leading-relaxed font-medium">{f.desc}</p>
>>>>>>> 8c50e00 (UI/UX Enhancements & Rebranding: Premium card system, live match indicators, enhanced CTA buttons, and NDAC branding transition. Fixed backend type errors and frontend rendering crashes.)
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;