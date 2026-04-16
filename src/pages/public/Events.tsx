import PublicLayout from "@/components/PublicLayout";
import { useQuery } from "@tanstack/react-query";
import { eventApi } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Clock, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const EventsPage = () => {
  const { data: events, isLoading } = useQuery({
    queryKey: ['public-events'],
    queryFn: async () => {
      // In a real app, we'd have a public field in the API
      // For now, we use the available API
      const resp = await eventApi.getAll();
      return resp.data;
    }
  });

  const featuredEvent = events?.[0];
  const otherEvents = events?.slice(1) || [];

  return (
    <PublicLayout>
      <section className="py-24 bg-background overflow-hidden">
        <div className="container">
          <div className="flex flex-col gap-6 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest w-fit">
              <Sparkles size={14} />
              NDCA Official Calendar
            </div>
            <h1 className="text-6xl md:text-9xl font-display font-black text-foreground uppercase tracking-tighter leading-[0.8] italic">
              Major <span className="text-primary tracking-normal">Events</span>
            </h1>
            <p className="max-w-2xl text-muted-foreground text-lg font-bold uppercase tracking-widest opacity-70">
              Stay informed about selectors' trials, annual ceremonies, and association milestones.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-40">
              <Loader2 className="animate-spin text-primary" size={48} />
            </div>
          ) : (
            <div className="space-y-20">
              {/* Featured Event */}
              {featuredEvent && (
                <div className="relative group rounded-[3rem] overflow-hidden bg-[#0B1220] border border-white/5 shadow-2xl">
                   <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div className="relative aspect-video lg:aspect-auto">
                         <img 
                           src={featuredEvent.imageUrl || "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80"} 
                           className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
                           alt={featuredEvent.title}
                         />
                         <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220] via-transparent to-transparent hidden lg:block" />
                      </div>
                      <div className="p-12 md:p-20 flex flex-col justify-center space-y-8 relative z-10">
                         <Badge className="w-fit bg-primary text-[#0B1220] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">Coming Up Next</Badge>
                         <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tight leading-none italic">{featuredEvent.title}</h2>
                         <p className="text-gray-400 text-lg leading-relaxed">{featuredEvent.description}</p>
                         
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-8 border-b border-white/10">
                            <div className="flex items-center gap-3 text-white">
                               <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary"><Calendar size={20} /></div>
                               <span className="font-bold uppercase text-xs tracking-widest">{new Date(featuredEvent.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-3 text-white">
                               <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary"><MapPin size={20} /></div>
                               <span className="font-bold uppercase text-xs tracking-widest">{featuredEvent.venue}</span>
                            </div>
                         </div>
                         
                         <Button className="w-fit h-14 px-10 bg-primary hover:bg-white text-[#0B1220] font-black uppercase text-[10px] tracking-[0.2em] rounded-2xl transition-all gap-3">
                            Check Details <ArrowRight size={16} />
                         </Button>
                      </div>
                   </div>
                </div>
              )}

              {/* Grid Events */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {otherEvents.map((event: any) => (
                  <Card key={event.id} className="group rounded-[2.5rem] border-border bg-background hover:scale-[1.02] transition-all duration-500 overflow-hidden shadow-sm hover:shadow-2xl">
                    <div className="aspect-[4/3] overflow-hidden relative">
                       <img src={event.imageUrl || "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80"} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt={event.title} />
                       <div className="absolute top-6 left-6">
                          <Badge className="bg-white/90 backdrop-blur text-black font-black uppercase text-[8px] tracking-widest border-0">Association Event</Badge>
                       </div>
                    </div>
                    <CardContent className="p-8 space-y-6">
                       <h3 className="text-2xl font-display font-black uppercase text-foreground group-hover:text-primary transition-colors italic">{event.title}</h3>
                       <div className="space-y-3">
                          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                             <Calendar size={14} className="text-primary" />
                             {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                             <MapPin size={14} className="text-primary" />
                             {event.venue}
                          </div>
                       </div>
                       <Button variant="ghost" className="w-full h-12 border-border border-2 rounded-2xl font-black uppercase text-[8px] tracking-[0.2em] group-hover:bg-primary group-hover:border-primary group-hover:text-[#0B1220] transition-all">
                          Read More
                       </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
};

export default EventsPage;
