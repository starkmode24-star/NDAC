import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Newspaper, Plus, Search, Edit2, Trash2, Calendar, Share2, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";

const newsItems = [
  { 
    id: 1, 
    title: "NDCA Announces New Selection Trials for U-16 District Team", 
    category: "Announcements", 
    date: "Apr 12, 2026", 
    author: "Admin", 
    status: "Published",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=800"
  },
  { 
    id: 2, 
    title: "Annual Awards Night Scheduled for Next Month at Golf Club", 
    category: "Events", 
    date: "Apr 15, 2026", 
    author: "Secretary", 
    status: "Draft",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800"
  },
  { 
    id: 3, 
    title: "Ground Maintenance Update: Police Ground Ready for Season", 
    category: "Maintenance", 
    date: "Apr 08, 2026", 
    author: "Ground Staff", 
    status: "Published",
    image: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?auto=format&fit=crop&q=80&w=800"
  },
];

const NewsContent = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-display font-black uppercase tracking-tight text-white">News & Content</h1>
          <p className="text-[#9CA3AF] text-sm font-bold uppercase tracking-widest mt-1">
            Publish announcements, articles and league updates.
          </p>
        </div>
        <Button className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0B1220] font-black uppercase tracking-widest text-xs px-6 h-12 rounded-xl">
          <Plus size={18} className="mr-2" />
          New Article
        </Button>
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* News List */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF] group-focus-within:text-[#FACC15] transition-colors" />
              <Input 
                placeholder="Search articles..." 
                className="bg-[#111827] border-[#1F2937] pl-12 h-12 text-white placeholder:text-[#9CA3AF]/40 rounded-xl"
              />
            </div>
            <Button variant="outline" className="h-12 border-[#1F2937] text-[#9CA3AF] font-black uppercase text-[10px]">Filter</Button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {newsItems.map((item) => (
              <Card key={item.id} className="bg-[#111827] border-[#1F2937] hover:border-[#FACC15]/30 transition-all group overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-64 h-48 md:h-auto overflow-hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[#0B1220]/80 backdrop-blur-md border border-white/10 text-[9px] font-black uppercase text-[#FACC15]">{item.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-display font-black uppercase text-white leading-tight group-hover:text-[#FACC15] transition-colors">{item.title}</h3>
                        <Button variant="ghost" size="icon" className="text-[#9CA3AF] hover:text-white shrink-0">
                          <MoreVertical size={18} />
                        </Button>
                      </div>
                      <div className="flex items-center gap-4 text-[10px] text-[#9CA3AF] font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><Calendar size={12} className="text-[#FACC15]" /> {item.date}</span>
                        <span>By {item.author}</span>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-between items-center">
                      <Badge className={`uppercase text-[9px] font-black tracking-widest border-0 ${
                        item.status === 'Published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {item.status}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 px-3 text-[10px] font-black uppercase text-[#9CA3AF] hover:text-white hover:bg-white/5">
                          <Edit2 size={14} className="mr-2" /> Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-3 text-[10px] font-black uppercase text-[#9CA3AF] hover:text-[#EF4444] hover:bg-[#EF4444]/10">
                          <Trash2 size={14} className="mr-2" /> Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="xl:w-80 space-y-6">
          <Card className="bg-[#111827] border-[#1F2937]">
            <CardHeader>
              <CardTitle className="text-sm font-black uppercase tracking-widest text-white">Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {['Announcements', 'Live Scores', 'Match Reports', 'Events', 'Ground Updates'].map((cat) => (
                <button key={cat} className="w-full flex justify-between items-center p-3 rounded-lg border border-[#1F2937] hover:border-[#FACC15]/30 hover:bg-[#FACC15]/5 transition-all text-left">
                  <span className="text-xs font-bold text-gray-300">{cat}</span>
                  <Badge className="bg-[#1F2937] text-[#9CA3AF] text-[9px] font-black">12</Badge>
                </button>
              ))}
              <Button variant="ghost" className="w-full text-[10px] font-black uppercase tracking-widest text-[#FACC15] mt-2">Manage Categories</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewsContent;
