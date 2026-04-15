import { useState, useEffect } from "react";
import { Menu, X, Bell, Search, LogIn, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import customLogo from "@/assets/logo.jpg";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showInfoDropdown, setShowInfoDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Matches", path: "/match-center" },
    { label: "News", path: "/news" },
    { 
      label: "Association", 
      path: "/information", 
      dropdown: [
        { label: "Constitution", path: "/information?tab=constitution" },
        { label: "League Rules", path: "/information?tab=rules" },
        { label: "Elections", path: "/information?tab=elections" },
        { label: "Annual Reports", path: "/information?tab=reports" },
      ]
    },
    { label: "Stadium", path: "/infrastructure" },
    { label: "Honors", path: "/hall-of-fame" },
    { label: "Sponsors", path: "/sponsors" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3 cursor-pointer">
          <img src={customLogo} alt="NDCA Logo" className="w-10 h-10 object-contain rounded drop-shadow-md" />
          <span className="font-display text-xl font-black tracking-tighter text-foreground uppercase pt-1">
            NDCA
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <div 
              key={item.label} 
              className="relative group h-16 flex items-center"
              onMouseEnter={() => item.dropdown && setShowInfoDropdown(true)}
              onMouseLeave={() => item.dropdown && setShowInfoDropdown(false)}
            >
              <Link
                to={item.path}
                className="text-[10px] font-black text-foreground/70 hover:text-primary transition-colors duration-200 uppercase tracking-[0.2em] flex items-center gap-1"
              >
                {item.label}
                {item.dropdown && <ChevronDown size={10} className={`transition-transform duration-300 ${showInfoDropdown ? 'rotate-180' : ''}`} />}
              </Link>

              {item.dropdown && (
                <div className={`absolute top-full left-0 w-48 glass-strong border border-border/20 rounded-xl py-4 flex flex-col gap-1 transition-all duration-300 origin-top shadow-2xl ${
                  showInfoDropdown ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                }`}>
                  {item.dropdown.map((sub) => (
                    <Link
                      key={sub.label}
                      to={sub.path}
                      className="px-6 py-2 text-[10px] font-black text-foreground/60 hover:text-primary hover:bg-primary/5 uppercase tracking-widest transition-colors"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
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
            className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-primary text-primary-foreground rounded-lg font-display text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-primary/10"
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
          <div className="container py-6 flex flex-col gap-2">
            {navItems.map((item) => (
              <div key={item.label} className="flex flex-col">
                <Link
                  to={item.path}
                  className="text-sm font-black text-foreground/80 hover:text-primary uppercase tracking-[0.2em] py-2"
                  onClick={() => !item.dropdown && setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.dropdown && (
                  <div className="flex flex-col pl-4 gap-2 border-l border-primary/20 ml-2 mb-2">
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.label}
                        to={sub.path}
                        className="text-[10px] font-bold text-foreground/50 hover:text-primary uppercase tracking-widest py-1"
                        onClick={() => setMobileOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link 
              to="/login"
              className="mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-display text-xs font-bold uppercase tracking-widest"
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
