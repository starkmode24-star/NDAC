import { useState, useEffect } from "react";
import { Menu, X, Bell, Search, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Info", path: "/information" },
  { label: "Stadium", path: "/infrastructure" },
  { label: "Honors", path: "/hall-of-fame" },
  { label: "Sponsors", path: "/sponsors" },
  { label: "Contact", path: "/contact" },
];

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
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="font-display font-black text-primary-foreground text-sm">N</span>
          </div>
          <span className="font-display text-xl font-black tracking-tighter text-foreground uppercase">
            NDCA
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="text-[10px] font-black text-foreground/70 hover:text-primary transition-colors duration-200 uppercase tracking-[0.2em]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-muted transition-colors text-foreground/70 hover:text-foreground">
            <Bell size={18} />
          </button>
          <button className="p-2 rounded-full hover:bg-muted transition-colors text-foreground/70 hover:text-foreground">
            <Search size={18} />
          </button>
          <Link 
            to="/login"
            className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-primary text-primary-foreground rounded-lg font-display text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-primary/10"
          >
            <LogIn size={14} />
            Sign In
          </Link>
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
          <div className="container py-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="text-sm font-black text-foreground/80 hover:text-primary uppercase tracking-[0.2em]"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link 
              to="/login"
              className="mt-2 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-display text-xs font-bold uppercase tracking-widest"
              onClick={() => setMobileOpen(false)}
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
