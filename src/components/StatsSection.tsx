import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "45+", label: "Registered Clubs" },
  { value: "2,500+", label: "Active Players" },
  { value: "1,200+", label: "Matches / Season" },
  { value: "15+", label: "Tournaments" },
];

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
    <section className="py-20 relative overflow-hidden" ref={ref}>
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, hsl(213 60% 25% / 0.3), hsl(216 28% 7%) 70%)",
        }}
      />
      <div className="container relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center ${visible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <p className="font-display text-5xl sm:text-6xl font-extrabold text-gradient-gold">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground mt-2 uppercase tracking-wider font-medium">
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
