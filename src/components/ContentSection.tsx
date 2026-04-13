import { useEffect, useRef, useState } from "react";

const sections = [
  {
    label: "Discover",
    title: "Never Miss A Moment",
    desc: "Get instant notifications for wickets, boundaries, and game-changing plays. Our real-time engine delivers updates faster than any competitor.",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=400&fit=crop",
    reverse: false,
  },
  {
    label: "Discover",
    title: "Deep Dive Analytics",
    desc: "From heat maps to win probability, explore advanced statistics that reveal the story behind every match. Powered by AI-driven insights.",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&h=400&fit=crop",
    reverse: true,
  },
];

const ContentSection = () => {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="container relative space-y-32">
        {sections.map((s, i) => (
          <ContentBlock key={i} {...s} index={i} />
        ))}
      </div>
    </section>
  );
};

const ContentBlock = ({
  label,
  title,
  desc,
  image,
  reverse,
  index,
}: {
  label: string;
  title: string;
  desc: string;
  image: string;
  reverse: boolean;
  index: number;
}) => {
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
    <div
      ref={ref}
      className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-16`}
      style={{ perspective: "1200px" }}
    >
      {/* Image with parallax-style 3D reveal */}
      <div
        className={`flex-1 ${visible ? (reverse ? "animate-reveal-right" : "animate-reveal-left") : "opacity-0"}`}
      >
        <div className="relative group rounded-2xl overflow-hidden shadow-2xl shadow-primary/5">
          <img
            src={image}
            alt={title}
            className="w-full h-72 sm:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          {/* Image overlay shimmer on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {/* Corner accent */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/50 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/50 rounded-br-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
        </div>
      </div>

      {/* Text with dramatic entrance */}
      <div
        className={`flex-1 ${visible ? (reverse ? "animate-reveal-left" : "animate-reveal-right") : "opacity-0"}`}
        style={{ animationDelay: "0.2s" }}
      >
        <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold">{label}</span>
        <h2 className="font-display text-4xl sm:text-5xl font-extrabold uppercase mt-3 mb-5 leading-[0.95]">{title}</h2>
        <p className="text-muted-foreground leading-relaxed text-base">{desc}</p>
        <a
          href="#learn"
          className="group/link inline-flex items-center mt-8 text-sm font-bold text-primary hover:text-primary/80 uppercase tracking-wider transition-colors"
        >
          Learn More
          <span className="ml-2 transition-transform duration-300 group-hover/link:translate-x-1">→</span>
        </a>
      </div>
    </div>
  );
};

export default ContentSection;