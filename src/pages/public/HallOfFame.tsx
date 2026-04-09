import PublicLayout from "@/components/PublicLayout";
import { Star, Trophy, Award, Landmark, History, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const legends = [
  { name: "Vijay Merchant", year: "1980", specialty: "Batsman", stats: "10,240 Runs", img: "https://images.unsplash.com/photo-1540749303346-5b4fa416326c?auto=format&fit=crop&q=80" },
  { name: "Vinod Kambli", year: "1994", specialty: "Batsman", stats: "High Score: 224", img: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80" },
  { name: "Zaheer Khan", year: "2011", specialty: "Bowler", stats: "21 Wkts (World Cup)", img: "https://images.unsplash.com/photo-1540749303346-5b4fa416326c?auto=format&fit=crop&q=80" },
];

const champions = [
  { team: "Nashik Lions CC", title: "A-Division League", year: "2024", captain: "Rahul Deshmukh" },
  { team: "Eagles Academy", title: "U-19 District Cup", year: "2023", captain: "Samar Mane" },
  { team: "MCC Reds", title: "T20 Bash", year: "2023", captain: "Aniket Pawar" },
  { team: "Warriors XI", title: "Weekend League", year: "2022", captain: "Sohan K." },
];

const HallOfFame = () => {
  return (
    <PublicLayout>
      {/* Visual Header */}
      <section className="py-24 bg-[#0B1220] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/30 rounded-full blur-[120px]" />
        </div>
        <div className="container relative z-10 text-center space-y-4">
          <Landmark className="mx-auto text-primary mb-6" size={64} />
          <h1 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter italic">
            Legacy <span className="text-primary">&</span> Honor
          </h1>
          <p className="max-w-xl mx-auto text-[#9CA3AF] text-sm font-bold uppercase tracking-[0.3em]">
            Celebrating the greats who paved the way for Nashik Cricket.
          </p>
        </div>
      </section>

      {/* Hall of Fame - Legends */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
            <h2 className="text-4xl font-display font-black uppercase flex items-center gap-4">
               <Star className="text-primary fill-primary" size={32} />
               The Hall of Fame
            </h2>
            <div className="relative w-full md:w-80 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
              <Input placeholder="Search legends..." className="bg-muted/50 border-border pl-10 h-12 uppercase text-[10px] font-black tracking-widest" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {legends.map((legend) => (
              <div key={legend.name} className="group relative">
                 <div className="aspect-[3/4] rounded-3xl overflow-hidden mb-6 relative border-4 border-muted group-hover:border-primary transition-all duration-500">
                    <img src={legend.img} alt={legend.name} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 grayscale group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
                    <div className="absolute bottom-6 left-6 right-6">
                       <Badge className="bg-primary text-[#0B1220] font-black uppercase text-[10px] mb-2">{legend.year} Inductee</Badge>
                       <p className="text-white text-2xl font-display font-black uppercase tracking-tight">{legend.name}</p>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase text-primary tracking-[0.2em]">{legend.specialty}</p>
                    <p className="text-muted-foreground text-sm font-sans leading-relaxed">
                      Legendary performance and contribution that defined the association's standard for excellence.
                    </p>
                    <p className="pt-4 text-xs font-black text-foreground uppercase border-t border-border mt-4">{legend.stats}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Champions Gallery */}
      <section className="py-24 bg-muted/30">
        <div className="container">
           <div className="text-center mb-16 space-y-4">
              <History className="mx-auto text-primary opacity-40" size={48} />
              <h2 className="text-4xl font-display font-black uppercase tracking-tight">Champions Gallery</h2>
              <p className="text-muted-foreground uppercase text-[10px] font-bold tracking-[0.3em]">Recent Title Winners & Trophy Holders</p>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {champions.map((champ) => (
                <div key={champ.team + champ.year} className="p-8 rounded-3xl bg-background border border-border shadow-sm hover:translate-y-[-8px] transition-all duration-300 relative group text-center">
                   <div className="w-16 h-16 rounded-full bg-primary/5 border border-primary/20 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                      <Trophy size={28} />
                   </div>
                   <h4 className="text-lg font-display font-black uppercase tracking-tight mb-2">{champ.team}</h4>
                   <p className="text-xs font-black text-primary uppercase tracking-widest">{champ.title}</p>
                   <div className="mt-8 pt-6 border-t border-border flex justify-between items-center text-[10px] uppercase font-bold text-[#9CA3AF]">
                      <span>{champ.year} Season</span>
                      <span className="text-foreground">Capt: {champ.captain.split(' ')[0]}</span>
                   </div>
                   {/* Golden Overlay on hover */}
                   <div className="absolute inset-0 border-2 border-primary rounded-3xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all pointer-events-none" />
                </div>
              ))}
           </div>
           
           <div className="mt-20 text-center">
              <Award className="inline-block text-primary mb-6" size={32} />
              <h3 className="text-2xl font-display font-black uppercase italic mb-8">Looking for older records?</h3>
              <div className="flex justify-center gap-4">
                 {[2022, 2021, 2020, 2019, 2018].map(y => (
                    <button key={y} className="w-14 h-14 rounded-xl font-display font-black text-sm border border-border hover:bg-primary hover:text-white transition-all shadow-sm">
                       {y}
                    </button>
                 ))}
              </div>
           </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default HallOfFame;
