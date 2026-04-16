import PublicLayout from "@/components/PublicLayout";
import { Badge } from "@/components/ui/badge";
import { User, Award, Quote, Zap, Camera, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stars = [
  {
    name: "Arjun Kulkarni",
    role: "Right Arm Fast",
    achievement: "Took 7 Wickets in 2024 Final",
    bio: "Arjun has been the backbone of Nashik's pace attack for 3 years. His ability to swing the ball at over 140kmph makes him a constant threat.",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80",
    stats: { matches: 45, wickets: 124, avg: 18.2 }
  },
  {
    name: "Sameer Deshpande",
    role: "Opening Batter",
    achievement: "Highest Scorer (Season 2024)",
    bio: "A technically sound batter with a wide range of strokes. Sameer holds the record for the highest individual score in the Nashik Premier League.",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80",
    stats: { matches: 38, runs: 2450, avg: 52.4 }
  },
  {
    name: "Ishan Pathak",
    role: "All Rounder (Off Spin)",
    achievement: "Young Player of the Year",
    bio: "The rising star of NDCA. Ishan recently made his debut in the state Under-23 team and has been a match-winner with both bat and ball.",
    image: "https://images.unsplash.com/photo-1562077772-3bd90403f7f0?w=800&q=80",
    stats: { matches: 22, wickets: 35, runs: 850 }
  }
];

const StarAttraction = () => {
  return (
    <PublicLayout>
      <section className="py-24 bg-background overflow-hidden">
        <div className="container">
          <div className="flex flex-col gap-6 mb-20 text-center items-center">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest w-fit">
              <Award size={14} />
              NDCA Featured Talents
            </div>
            <h1 className="text-6xl md:text-9xl font-display font-black text-foreground uppercase tracking-tighter leading-[0.8] italic">
              Star <span className="text-primary tracking-normal">Attractions</span>
            </h1>
            <p className="max-w-2xl text-muted-foreground text-lg font-bold uppercase tracking-widest opacity-70">
              Showcasing the athletes who redefine performance standards in Nashik's cricketing landscape.
            </p>
          </div>

          <div className="space-y-40">
             {stars.map((star, i) => (
                <div key={star.name} className={`flex flex-col lg:flex-row gap-20 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                   {/* Visual side */}
                   <div className="flex-1 relative group w-full lg:w-auto">
                      <div className="absolute inset-0 bg-primary/20 rounded-[4rem] rotate-3 group-hover:rotate-6 transition-transform duration-500" />
                      <div className="relative aspect-[3/4] rounded-[4rem] overflow-hidden border border-border shadow-2xl">
                         <img src={star.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={star.name} />
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                         <div className="absolute bottom-12 left-12 right-12 flex justify-between items-center text-white">
                            <div className="flex gap-4">
                               <div className="p-3 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-primary hover:text-black hover:border-primary transition-all cursor-pointer"><Camera size={18} /></div>
                               <div className="p-3 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-primary hover:text-black hover:border-primary transition-all cursor-pointer"><Play size={18} /></div>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Info side */}
                   <div className="flex-1 space-y-8 text-center lg:text-left">
                      <div className="space-y-4">
                         <Badge className="bg-primary/10 text-primary border-primary/30 font-black uppercase tracking-widest px-4 py-1.5 rounded-full">{star.role}</Badge>
                         <h2 className="text-5xl md:text-7xl font-display font-black text-foreground uppercase tracking-tighter italic">{star.name}</h2>
                         <div className="flex items-center gap-3 text-primary font-black uppercase text-xs tracking-widest justify-center lg:justify-start">
                            <Zap size={18} />
                            {star.achievement}
                         </div>
                      </div>

                      <div className="relative p-8 bg-muted/30 rounded-3xl border border-border">
                         <Quote className="absolute -top-4 -left-4 text-primary opacity-20" size={60} />
                         <p className="text-muted-foreground text-lg font-sans italic leading-relaxed pt-2">
                           {star.bio}
                         </p>
                      </div>

                      <div className="grid grid-cols-3 gap-6 pt-4">
                         {Object.entries(star.stats).map(([key, val]) => (
                            <div key={key} className="p-4 rounded-2xl bg-background border border-border text-center">
                               <p className="text-[10px] font-black uppercase text-muted-foreground mb-1 tracking-widest">{key}</p>
                               <p className="text-2xl font-display font-black text-foreground">{val}</p>
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
             ))}
          </div>

          <div className="mt-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {[
               { title: "Training Ground", count: "12+ Nets", icon: Camera },
               { title: "Regional Cups", count: "08 Titles", icon: Award },
               { title: "Active Scouts", count: "15+ Experts", icon: User },
               { title: "D/N Capability", count: "6 High-Mast", icon: Zap },
             ].map((stat) => (
                <Card key={stat.title} className="rounded-3xl border-border bg-muted/20 p-8 flex flex-col items-center text-center space-y-4">
                   <div className="w-12 h-12 rounded-2xl bg-background flex items-center justify-center text-primary shadow-sm border border-border">
                      <stat.icon size={24} />
                   </div>
                   <div>
                      <h4 className="font-display font-black uppercase text-lg italic text-foreground tracking-tight">{stat.title}</h4>
                      <p className="text-xs font-bold uppercase tracking-widest text-primary mt-1">{stat.count}</p>
                   </div>
                </Card>
             ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default StarAttraction;
