const footerLinks = {
  Product: ["Live Scores", "Highlights", "Analytics", "Mobile App"],
  Company: ["About Us", "Careers", "Press", "Contact"],
  Legal: ["Privacy", "Terms", "Cookie Policy"],
};

const Footer = () => {
  return (
    <footer className="border-t border-border/30 pt-16 pb-8" style={{ background: "hsl(216 35% 4%)" }}>
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                <span className="font-display font-bold text-primary-foreground text-sm">Z</span>
              </div>
              <span className="font-display text-lg font-bold tracking-wider">ZPORTEX</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your ultimate sports companion. All sports, all day, all in one place.
            </p>
            <div className="flex gap-3 mt-4">
              {["X", "IG", "YT", "FB"].map((s) => (
                <div
                  key={s}
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider mb-4 text-foreground/90">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border/20 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © 2025 ZPORTEX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
