import PublicLayout from "@/components/PublicLayout";
import { Handshake, TrendingUp, BadgeCheck, Globe, Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { sponsorApi } from "@/lib/api";

const Sponsors = () => {
  const { data: sponsors, isLoading } = useQuery({
    queryKey: ['sponsors'],
    queryFn: async () => {
      const response = await sponsorApi.getAll();
      return response.data;
    }
  });

  const partners = sponsors?.filter((s: any) => s.tier === 'TITLE' || s.tier === 'ASSOCIATE') || [];
  const associateSponsors = sponsors?.filter((s: any) => s.tier !== 'TITLE' && s.tier !== 'ASSOCIATE') || [];

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
            {isLoading ? (
               <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={40} /></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {partners.length > 0 ? partners.map((p: any) => (
                     <div key={p.id} className="p-10 rounded-[3rem] bg-[#111827] border border-white/5 flex flex-col items-center text-center shadow-2xl hover:border-primary/50 transition-all duration-500 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <div className="w-28 h-28 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform duration-500 group-hover:rotate-3">
                           {p.logoUrl ? (
                             <img 
                               src={p.logoUrl} 
                               alt={p.name} 
                               className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500" 
                               onError={(e) => {
                                 (e.target as HTMLImageElement).style.display = 'none';
                                 (e.target as HTMLImageElement).parentElement!.classList.add('fallback-active');
                               }}
                             />
                           ) : null}
                           <div className="hidden absolute inset-0 items-center justify-center text-4xl font-display font-black text-primary opacity-40 group-hover:opacity-100 transition-opacity [.fallback-active_&]:flex">
                              {p.name.substring(0, 1)}
                           </div>
                        </div>

                        <div className="relative z-10">
                           <Badge className="bg-primary text-[#0B1220] font-black uppercase text-[9px] mb-4 px-4 py-1 rounded-full shadow-lg shadow-primary/20">{p.tier} PARTNER</Badge>
                           <h3 className="text-2xl font-display font-black uppercase text-white mb-2 tracking-tight">{p.name}</h3>
                           <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] opacity-70">{p.industry}</p>
                        </div>
                     </div>
                   )) : (
                     <div className="col-span-full text-center py-20 text-muted-foreground uppercase font-black tracking-widest text-xs">No title partners onboarded yet</div>
                   )}
                </div>
             )}
          </div>
       </section>

      {/* Associate Sponsors Grid */}
      <section className="py-24 bg-background">
         <div className="container text-center mb-16 space-y-4">
            <h2 className="text-4xl font-display font-black uppercase tracking-tight text-foreground">Associate <span className="text-primary italic">Sponsors</span></h2>
            <div className="h-1.5 w-24 bg-primary mx-auto rounded-full shadow-sm" />
         </div>
         <div className="container px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-center border border-border/50 p-12 rounded-[3.5rem] bg-muted/5">
               {associateSponsors.map((s: any) => (
                 <div key={s.id} className="flex flex-col items-center opacity-40 hover:opacity-100 transition-all duration-500 cursor-pointer group">
                    <div className="w-20 h-20 bg-white/5 border border-white/10 group-hover:border-primary/20 rounded-2xl mb-4 flex items-center justify-center transition-all group-hover:scale-110 group-hover:-rotate-3 overflow-hidden relative">
                       {s.logoUrl ? (
                         <img 
                           src={s.logoUrl} 
                           alt={s.name} 
                           className="w-full h-full object-contain p-4" 
                           onError={(e) => {
                             (e.target as HTMLImageElement).style.display = 'none';
                             (e.target as HTMLImageElement).parentElement!.classList.add('fallback-active-sm');
                           }}
                         />
                       ) : null}
                       <div className="hidden absolute inset-0 items-center justify-center text-3xl font-display font-black text-primary/40 [.fallback-active-sm_&]:flex">
                          {s.name.substring(0, 1)}
                       </div>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#9CA3AF] group-hover:text-primary transition-colors text-center">{s.name}</p>
                 </div>
               ))}
               {(!isLoading && associateSponsors.length === 0) && (
                 <div className="col-span-full text-center py-4 text-muted-foreground uppercase font-black tracking-widest text-xs opacity-50">More partners joining soon...</div>
               )}
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
