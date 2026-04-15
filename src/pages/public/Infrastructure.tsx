import PublicLayout from "@/components/PublicLayout";
import { MapPin, Users, Zap, ShieldCheck, Camera, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { galleryApi } from "@/lib/api";

const stands = [
  { name: "Pavilion End Stand", capacity: "4,500", features: "VIP Lounges, Player Dugouts" },
  { name: "City End Gallery", capacity: "8,000", features: "Mass Seating, Electronic Replay Screen" },
  { name: "North Terrace", capacity: "3,200", features: "Family Zone, Concession Stands" },
  { name: "Membership Stand", capacity: "1,800", features: "Exclusive AC Lounge, Formal Seating" },
];

const highlights = [
  { title: "Floodlight System", desc: "6 High-mast LED floodlights meeting international Lux standards for D/N matches.", icon: Zap },
  { title: "Training Academy", desc: "12 Turf pitches and 8 cement nets with automated bowling machines.", icon: ShieldCheck },
  { title: "Media Center", desc: "Capacity for 100+ journalists with high-speed fiber connectivity for live broadcast.", icon: Camera },
];

const Infrastructure = () => {
  const { data: galleryItems } = useQuery({
    queryKey: ['gallery'],
    queryFn: async () => {
      const resp = await galleryApi.getAll();
      return resp.data;
    }
  });

  const displayImages = galleryItems && galleryItems.length >= 4 
    ? galleryItems.slice(0, 4) 
    : [
        { imageUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80", title: "Night Match Floodlights" },
        { imageUrl: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80", title: "International Pitch" },
        { imageUrl: "https://images.unsplash.com/photo-1562077772-3bd90403f7f0?w=800&q=80", title: "High-Tech Nets" },
        { imageUrl: "/vip-pavilion.png", title: "VIP Pavilion End" },
      ];

  return (
    <PublicLayout>
      {/* Immersive Stadium Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <video 
          autoPlay 
          muted 
          loop 
          className="absolute inset-0 w-full h-full object-cover opacity-60 brightness-50"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-cricket-match-in-a-stadium-at-night-31650-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-[#0B1220]/80" />
        
        <div className="container relative z-10 text-center space-y-6">
           <Badge className="bg-primary text-[#0B1220] font-black uppercase tracking-widest px-6 py-2 rounded-full mb-4">International Grade Venue</Badge>
           <h1 className="text-6xl md:text-9xl font-display font-black text-white uppercase tracking-tighter leading-none italic">
             NDCA <span className="text-primary tracking-normal">Stadium</span>
           </h1>
           <p className="max-w-xl mx-auto text-[#9CA3AF] text-lg font-bold uppercase tracking-widest leading-relaxed">
             The Pride of Nashik Cricket. Host to regional champions and future legends.
           </p>
           <div className="flex flex-wrap justify-center gap-8 pt-8">
              <div className="flex items-center gap-2">
                 <MapPin className="text-primary" size={20} />
                 <span className="text-white text-sm font-black uppercase">Golf Club, Nashik</span>
              </div>
              <div className="flex items-center gap-2">
                 <Users className="text-primary" size={20} />
                 <span className="text-white text-sm font-black uppercase">Capacity: 25,000</span>
              </div>
           </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-24 bg-background border-y border-border">
        <div className="container">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {highlights.map((item) => (
                <div key={item.title} className="space-y-4 text-center md:text-left">
                   <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-primary group hover:bg-primary hover:text-white transition-colors">
                      <item.icon size={32} />
                   </div>
                   <h3 className="text-2xl font-display font-black uppercase text-foreground">{item.title}</h3>
                   <p className="text-muted-foreground text-sm font-sans leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Seating Layout Section */}
      <section className="py-24 bg-muted/20 overflow-hidden">
        <div className="container">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-6">
                    <Layers size={14} />
                    Seating Chart & Facilities
                 </div>
                 <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight mb-8">Choose Your <span className="text-primary italic">Vantage Point</span></h2>
                 
                 <div className="space-y-6">
                    {stands.map((stand) => (
                      <div 
                        key={stand.name} 
                        className="p-6 rounded-2xl bg-background border border-border hover:border-primary transition-all group cursor-pointer"
                      >
                         <div className="flex justify-between items-start mb-2">
                            <h4 className="text-xl font-display font-black uppercase group-hover:text-primary transition-colors">{stand.name}</h4>
                            <Badge variant="outline" className="text-[10px] font-black uppercase border-primary/30 text-primary">{stand.capacity} seats</Badge>
                         </div>
                         <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest leading-loose">
                            Key Features: {stand.features}
                         </p>
                         <div className="mt-4 flex gap-2">
                            <div className="h-1 flex-1 bg-muted rounded-full overflow-hidden">
                               <div className="h-full bg-primary animate-pulse" style={{ width: '85%' }} />
                            </div>
                            <span className="text-[8px] font-black uppercase text-[#9CA3AF]">Occ. Rate</span>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Facility Gallery */}
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-4">
                    <div className="aspect-[4/5] rounded-[2rem] overflow-hidden group relative">
                       <img src={displayImages[0]?.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Stadium" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                          <p className="text-white font-black uppercase text-xs">{displayImages[0]?.title}</p>
                       </div>
                    </div>
                    <div className="aspect-square rounded-[2rem] overflow-hidden group relative">
                       <img src={displayImages[1]?.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Pitch" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                          <p className="text-white font-black uppercase text-xs">{displayImages[1]?.title}</p>
                       </div>
                    </div>
                 </div>
                 <div className="space-y-4 pt-12">
                    <div className="aspect-square rounded-[2rem] overflow-hidden group relative">
                       <img src={displayImages[2]?.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Nets" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                          <p className="text-white font-black uppercase text-xs">{displayImages[2]?.title}</p>
                       </div>
                    </div>
                    <div className="aspect-[4/5] rounded-[2rem] overflow-hidden group relative">
                       <img src={displayImages[3]?.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Stands" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                          <p className="text-white font-black uppercase text-xs">{displayImages[3]?.title}</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Infrastructure;
