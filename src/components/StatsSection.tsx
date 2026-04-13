import { useEffect, useRef, useState, useCallback } from "react";

const stats = [
  { value: 45, suffix: "+", label: "Registered Clubs" },
  { value: 2500, suffix: "+", label: "Active Players" },
  { value: 1200, suffix: "+", label: "Matches / Season" },
  { value: 15, suffix: "+", label: "Tournaments" },
];

const AnimatedCounter = ({ target, suffix, visible }: { target: number; suffix: string; visible: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target]);

  const formatted = target >= 1000 ? `${(count / 1000).toFixed(count >= target ? 0 : 1).replace(/\.0$/, "")},${String(count % 1000).padStart(3, "0").replace(/0+$/, "") || "000"}` : String(count);
  const display = count >= target ? (target >= 1000 ? target.toLocaleString() : String(target)) : String(count);

  return (
    <span>{display}{suffix}</span>
  );
};

const StatsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Dramatic gradient backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, hsl(213 60% 20% / 0.4) 0%, hsl(216 28% 7%) 50%, hsl(213 60% 20% / 0.3) 100%)",
        }}
      />

      {/* Cinematic light sweep */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, hsl(var(--gold) / 0.08) 0%, transparent 60%)",
        }}
      />

      {/* Separator lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center group ${visible ? "animate-reveal-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <p className="font-display text-6xl sm:text-7xl lg:text-8xl font-extrabold text-gradient-gold text-shadow-glow transition-transform duration-300 group-hover:scale-110">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} visible={visible} />
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-3 uppercase tracking-[0.2em] font-bold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;