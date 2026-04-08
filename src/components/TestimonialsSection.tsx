import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Marcus B.", role: "Football Fan", text: "Best sports platform I've ever used. The live scores are lightning fast and the UI is gorgeous.", rating: 5 },
  { name: "Sophie L.", role: "Basketball Enthusiast", text: "The analytics features are incredible. I can track every stat for my favorite teams in real-time.", rating: 5 },
  { name: "Ahmed K.", role: "Tennis Follower", text: "Global coverage is unmatched. I follow leagues from 5 different countries, all in one place.", rating: 5 },
];

const TestimonialsSection = () => {
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
    <section className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-navy-light/20 to-background" />
      <div className="container relative">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">Testimonials</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase mt-3">
            Loved By Fans
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`glass rounded-xl p-6 hover:border-primary/30 transition-all duration-300 ${
                visible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-display font-bold text-primary text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
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
