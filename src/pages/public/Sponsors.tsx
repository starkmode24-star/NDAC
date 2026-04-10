import PublicLayout from "@/components/PublicLayout";
import { Handshake, TrendingUp, BadgeCheck, Globe, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const partners = [
  { name: "Global Sports", tier: "Title Sponsor", logo: "🔥", industry: "Sporting Goods" },
  { name: "Nashik Bank", tier: "Banking Partner", logo: "💰", industry: "Financial Services" },
  { name: "TechNova", tier: "Digital Partner", logo: "💡", industry: "Information Technology" },
  { name: "Everest Water", tier: "Hydration Partner", logo: "❄️", industry: "FMCG" },
];

const sponsors = [
  { name: "Local Hero", logo: "🌟" },
  { name: "City Pulse", logo: "✨" },
  { name: "Green Field", logo: "🌱" },
  { name: "Future Star", logo: "🚀" },
  { name: "Pro League", logo: "🏆" },
  { name: "Sportly", logo: "⚽" },
  { name: "CricZone", logo: "🏏" },
  { name: "Fitness First", logo: "💪" },
];

const Sponsors = () => {
  return (
    <PublicLayout>
      {/* Dynamic Header */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
            <div className="space-y-6 text-center lg:text-left max-w-2xl">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                  <Handshake size={14} />
                  Partnership Ecosystem
               </div>
               <h1 className="text-5xl md:text-8xl font-display font-black text-foreground uppercase tracking-tighter leading-[0.9]">
                 Empowering <br /> 
                 <span className="text-primary italic">The Future</span>
               </h1>
               <p className="text-muted-foreground text-lg leading-relaxed font-sans">
                 Our partners share our passion for cricket and community development. Join the leading district association in Maharashtra as an official sponsor.
               </p>
               <Button className="h-14 px-10 bg-[#0B1220] hover:bg-[#111827] text-white font-black uppercase text-xs tracking-widest rounded-2xl shadow-xl">
                  Become a Partner
               </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:gap-8 w-full max-w-lg">
               {[
                 { label: "Reach", val: "500k+", icon: Globe },
                 { label: "Growth", val: "24% YoY", icon: TrendingUp },
                 { label: "Trust", val: "Official", icon: BadgeCheck },
                 { label: "Events", val: "30+", icon: Star },
               ].map((item) => (
                 <div key={item.label} className="p-6 rounded-3xl bg-muted/50 border border-border flex flex-col items-center text-center group hover:bg-primary/5 transition-all">
                    <item.icon size={24} className="text-primary mb-3 group-hover:scale-110 transition-transform" />
                    <p className="text-xl font-display font-black uppercase text-foreground">{item.val}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF] mt-1">{item.label}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Partners Section */}
      <section className="py-24 bg-muted/30 border-y border-border">
         <div className="container text-center mb-16">
            <h2 className="text-3xl font-display font-black uppercase tracking-tight italic">Global Partners</h2>
         </div>
         <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {partners.map((p) => (
                 <div key={p.name} className="p-10 rounded-[3rem] bg-background border border-border flex flex-col items-center text-center shadow-sm hover:shadow-2xl hover:border-primary transition-all duration-500 group relative">
                    <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-5xl mb-6 grayscale group-hover:grayscale-0 transition-all group-hover:scale-110">
                       {p.logo}
                    </div>
                    <Badge className="bg-primary/10 text-primary border-primary/20 font-black uppercase text-[10px] mb-4">{p.tier}</Badge>
                    <h3 className="text-xl font-display font-black uppercase text-foreground mb-1">{p.name}</h3>
                    <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">{p.industry}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Associate Sponsors Grid */}
      <section className="py-24 bg-background">
         <div className="container text-center mb-16 space-y-4">
            <h2 className="text-3xl font-display font-black uppercase tracking-tight">Associate Sponsors</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
         </div>
         <div className="container px-4 lg:px-24">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-16 items-center">
               {sponsors.map((s) => (
                 <div key={s.name} className="flex flex-col items-center opacity-40 hover:opacity-100 transition-opacity duration-500 cursor-pointer group">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{s.logo}</div>
                    <p className="text-sm font-black uppercase tracking-widest text-[#9CA3AF] group-hover:text-foreground">{s.name}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
         <div className="container">
            <div className="p-12 md:p-20 rounded-[4rem] bg-primary text-primary-foreground relative overflow-hidden shadow-[0_40px_100px_rgba(212,160,23,0.3)]">
               <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
               <div className="relative z-10 max-w-3xl space-y-8">
                  <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none italic">
                    Fuel the <br /> Next Inning
                  </h2>
                  <p className="text-lg font-bold uppercase tracking-widest opacity-80">
                    Reach out today to discuss custom sponsorship packages tailored for your brand's growth and visibility.
                  </p>
                  <div className="flex flex-wrap gap-4">
                     <Button className="h-14 px-10 bg-white text-primary font-black uppercase text-xs tracking-widest rounded-2xl shadow-xl hover:bg-white/90">
                        Request Proposal
                     </Button>
                     <Button variant="outline" className="h-14 px-8 border-white/40 text-white font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-white/10">
                        View Media Kit
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </PublicLayout>
  );
};

export default Sponsors;
