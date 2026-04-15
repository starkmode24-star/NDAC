import { useEffect, useRef, useState } from "react";

const footerLinks = {
  Product: ["Live Scores", "Highlights", "Analytics", "Mobile App"],
  Company: ["About Us", "Careers", "Press", "Contact"],
  Legal: ["Privacy", "Terms", "Cookie Policy"],
};

const Footer = () => {
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
    <footer ref={ref} className="relative border-t border-border/20 pt-20 pb-8" style={{ background: "linear-gradient(180deg, hsl(var(--navy-deep)) 0%, hsl(221 50% 4%) 100%)" }}>
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div
            className={`col-span-2 md:col-span-1 ${visible ? "animate-reveal-up" : "opacity-0"}`}
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center glow-gold">
                <span className="font-display font-bold text-primary-foreground text-sm">N</span>
              </div>
              <span className="font-display text-xl font-extrabold tracking-wider uppercase">NDAC</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your ultimate sports companion. Bridging the gap between players, clubs, and fans with high-performance digital tools.
            </p>
            <div className="flex gap-3 mt-5">
              {["X", "IG", "YT", "FB"].map((s) => (
                <div
                  key={s}
                  className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links], i) => (
            <div
              key={title}
              className={`${visible ? "animate-reveal-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <h4 className="font-display text-sm font-bold uppercase tracking-[0.2em] mb-5 text-foreground/90">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border/20 pt-8 text-center">
          <p className="text-xs text-muted-foreground/60">
            © 2025 NDAC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;