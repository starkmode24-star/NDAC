import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Marcus B.", role: "Cricket Fan", text: "Best sports platform I've ever used. The live scores are lightning fast and the UI is gorgeous.", rating: 5, color: "bg-destructive" },
  { name: "Sophie L.", role: "Cricket Analyst", text: "The analytics features are incredible. I can track every stat for my favorite teams in real-time.", rating: 5, color: "bg-primary" },
  { name: "Ahmed K.", role: "Local Player", text: "Global coverage is unmatched. I follow leagues from 5 different countries, all in one place.", rating: 5, color: "bg-accent" },
];

const TestimonialsSection = () => {
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
    <section className="py-28 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-navy-light/20 to-background" />
      
      {/* Decorative orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-[150px] pointer-events-none" />

      <div className="container relative">
        <div className="text-center mb-20">
          <span
            className={`inline-block text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4 ${visible ? "animate-fade-up" : "opacity-0"}`}
          >
            Testimonials
          </span>
          <h2
            className={`font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold uppercase leading-[0.95] ${visible ? "animate-reveal-up" : "opacity-0"}`}
            style={{ animationDelay: "0.15s" }}
          >
            Loved By Fans
          </h2>
          <div
            className={`w-24 h-1 bg-primary mx-auto mt-6 rounded-full ${visible ? "animate-fade-up" : "opacity-0"}`}
            style={{ animationDelay: "0.3s" }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`group relative glass rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 ${
                visible ? "animate-reveal-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${0.2 + i * 0.15}s` }}
            >
              {/* Top glow on hover */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={16} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed mb-8 italic">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${t.color} flex items-center justify-center font-display font-bold text-primary-foreground text-base shadow-lg`}>
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;