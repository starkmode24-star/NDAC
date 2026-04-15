import PublicLayout from "@/components/PublicLayout";
import { useQuery } from "@tanstack/react-query";
import { newsApi } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Tag, ChevronRight, Loader2, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const NewsCenter = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: newsItems, isLoading } = useQuery({
    queryKey: ['public-news'],
    queryFn: async () => {
      const resp = await newsApi.getAll();
      return resp.data;
    }
  });

  const filteredNews = newsItems?.filter((n: any) => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.category?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <PublicLayout>
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16">
            <div className="space-y-4">
               <h1 className="text-5xl md:text-8xl font-display font-black text-foreground uppercase tracking-tighter leading-[0.85]">
                Latest <span className="text-primary italic">Inside</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl font-bold uppercase tracking-widest opacity-70">
                Official announcements, tournament highlights, and association updates directly from the NDCA press desk.
              </p>
            </div>
            
            <div className="relative w-full lg:w-96">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
               <Input 
                 placeholder="Search news articles..." 
                 className="h-14 pl-12 bg-muted/30 border-border rounded-2xl font-bold text-xs uppercase tracking-widest"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={40} /></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {filteredNews.length > 0 ? filteredNews.map((news: any, i: number) => (
                 <NewsCard key={news.id} news={news} index={i} />
               )) : (
                 <p className="col-span-full text-center py-20 text-muted-foreground uppercase font-black tracking-widest text-xs">No news articles found matching your criteria</p>
               )}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Placeholder */}
      <section className="py-24 bg-muted/30">
        <div className="container">
           <Card className="rounded-[3rem] border-primary/20 bg-[#0B1220] p-12 overflow-hidden relative shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                 <div className="text-center lg:text-left space-y-4">
                    <h2 className="text-4xl font-display font-black uppercase text-white tracking-tight italic">Stay In The Loop</h2>
                    <p className="text-[#9CA3AF] font-bold uppercase tracking-widest text-xs">Join 5,000+ cricket fans receiving weekly district updates.</p>
                 </div>
                 <div className="flex w-full lg:w-auto gap-3">
                    <Input placeholder="Your Email Address" className="h-14 bg-white/5 border-white/10 text-white min-w-[300px]" />
                    <button className="h-14 px-8 bg-primary text-primary-foreground rounded-xl font-black uppercase text-xs tracking-widest shadow-xl">Join</button>
                 </div>
              </div>
           </Card>
        </div>
      </section>
    </PublicLayout>
  );
};

const NewsCard = ({ news, index }: { news: any, index: number }) => (
  <Card className="group rounded-[2rem] border-border bg-background hover:border-primary/50 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-2xl flex flex-col animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
     <div className="aspect-video relative overflow-hidden">
        <img 
          src={news.imageUrl || 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600'} 
          alt={news.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-background/80 backdrop-blur-md border border-border text-primary font-black uppercase text-[9px] tracking-widest">
             {news.category || 'General'}
          </Badge>
        </div>
     </div>
     <CardContent className="p-8 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
           <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              <Calendar size={14} className="text-primary" />
              {new Date(news.publishedAt || news.createdAt).toLocaleDateString()}
           </div>
           <h3 className="text-2xl font-display font-black uppercase text-foreground leading-tight group-hover:text-primary transition-colors">{news.title}</h3>
           <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">{news.content}</p>
        </div>
        
        <button className="mt-8 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:gap-4 transition-all">
           Read Full Article <ChevronRight size={14} />
        </button>
     </CardContent>
  </Card>
);

export default NewsCenter;
