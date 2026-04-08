import { useEffect, useRef, useState } from "react";

const sections = [
  {
    title: "Never Miss A Moment",
    desc: "Get instant notifications for goals, red cards, and game-changing plays. Our real-time engine delivers updates faster than any competitor.",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&h=400&fit=crop",
    reverse: false,
  },
  {
    title: "Deep Dive Analytics",
    desc: "From heat maps to expected goals, explore advanced statistics that reveal the story behind every match. Powered by AI-driven insights.",
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=600&h=400&fit=crop",
    reverse: true,
  },
];

const ContentSection = () => {
  return (
    <section className="py-24">
      <div className="container space-y-24">
        {sections.map((s, i) => (
          <ContentBlock key={i} {...s} />
        ))}
      </div>
    </section>
  );
};

const ContentBlock = ({
  title,
  desc,
  image,
  reverse,
}: {
  title: string;
  desc: string;
  image: string;
  reverse: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12`}
    >
      <div
        className={`flex-1 ${visible ? (reverse ? "animate-slide-right" : "animate-slide-left") : "opacity-0"}`}
      >
        <div className="rounded-xl overflow-hidden shadow-2xl shadow-primary/5">
          <img src={image} alt={title} className="w-full h-64 sm:h-80 object-cover" loading="lazy" />
        </div>
      </div>
      <div
        className={`flex-1 ${visible ? (reverse ? "animate-slide-left" : "animate-slide-right") : "opacity-0"}`}
        style={{ animationDelay: "0.2s" }}
      >
        <span className="text-xs uppercase tracking-widest text-primary font-semibold">Discover</span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase mt-2 mb-4">{title}</h2>
        <p className="text-muted-foreground leading-relaxed">{desc}</p>
        <a
          href="#learn"
          className="inline-flex items-center mt-6 text-sm font-semibold text-primary hover:underline uppercase tracking-wider"
        >
          Learn More →
        </a>
      </div>
    </div>
  );
};

export default ContentSection;
