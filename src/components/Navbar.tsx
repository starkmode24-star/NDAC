import { useState, useEffect } from "react";
import { Menu, X, Bell, Search } from "lucide-react";

const navItems = ["News", "Highlights", "Standings", "Schedule", "Leagues"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
            <span className="font-display font-bold text-primary-foreground text-sm">Z</span>
          </div>
          <span className="font-display text-xl font-bold tracking-wider text-foreground">
            ZPORTEX
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200 uppercase tracking-wide"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-muted transition-colors text-foreground/70 hover:text-foreground">
            <Bell size={18} />
          </button>
          <button className="p-2 rounded-full hover:bg-muted transition-colors text-foreground/70 hover:text-foreground">
            <Search size={18} />
          </button>
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-border/20 animate-fade-in">
          <div className="container py-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-foreground/80 hover:text-primary py-2 uppercase tracking-wide"
                onClick={() => setMobileOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
