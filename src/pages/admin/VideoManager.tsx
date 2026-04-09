import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Youtube, 
  Play, 
  Plus, 
  Trash2, 
  Edit2, 
  Eye, 
  Share2, 
  Clock, 
  Search,
  CheckCircle2
} from "lucide-react";
import { Input } from "@/components/ui/input";

const videos = [
  { id: 1, title: "District Final 2024: Lions vs Eagles Highlights", url: "https://youtu.be/...", views: "12.4k", date: "2 days ago", duration: "12:40", thumbnail: "https://images.unsplash.com/photo-1540749303346-5b4fa416326c?auto=format&fit=crop&q=80" },
  { id: 2, title: "Inside NDCA: Academy Training Sessions", url: "https://youtu.be/...", views: "5.2k", date: "1 week ago", duration: "08:15", thumbnail: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80" },
  { id: 3, title: "Interview: Secretary Santosh Mane on Future vision", url: "https://youtu.be/...", views: "3.1k", date: "2 weeks ago", duration: "05:22", thumbnail: "https://images.unsplash.com/photo-1540749303346-5b4fa416326c?auto=format&fit=crop&q=80" },
];

const VideoManager = () => {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-display font-black uppercase tracking-tight text-white">Video Manager</h1>
          <p className="text-[#9CA3AF] text-sm font-bold uppercase tracking-widest mt-1">
             Sync Highlights, interviews, and official matches from YouTube.
          </p>
        </div>
        <Button className="bg-[#EF4444] hover:bg-[#EF4444]/90 text-white font-black uppercase tracking-widest text-xs px-6 h-12 rounded-xl">
          <Youtube size={18} className="mr-2" />
          Add YouTube Link
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((vid) => (
          <Card key={vid.id} className="bg-[#111827] border-[#1F2937] overflow-hidden group">
             <div className="aspect-video relative overflow-hidden">
                <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-100" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform duration-500">
                      <Play size={32} />
                   </div>
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 rounded text-[10px] font-black text-white">{vid.duration}</div>
                <div className="absolute top-3 left-3">
                   <Badge className="bg-[#EF4444] text-white uppercase text-[8px] font-black border-0">YT Link Sync</Badge>
                </div>
             </div>
             <CardHeader className="p-6">
                 <h3 className="text-sm font-black text-white uppercase leading-tight line-clamp-2">{vid.title}</h3>
                 <div className="flex items-center gap-4 mt-4">
                    <p className="text-[10px] font-bold text-[#9CA3AF] uppercase flex items-center gap-1"><Eye size={12}/> {vid.views}</p>
                    <p className="text-[10px] font-bold text-[#9CA3AF] uppercase flex items-center gap-1"><Clock size={12}/> {vid.date}</p>
                 </div>
             </CardHeader>
             <div className="px-6 pb-6 pt-0 flex justify-between items-center border-t border-[#1F2937]/50 mt-2">
                <Button variant="ghost" size="sm" className="h-10 text-[#9CA3AF] hover:text-white uppercase text-[10px] font-black px-0 flex gap-2">
                   <Share2 size={14} /> Share
                </Button>
                <div className="flex gap-2">
                   <Button variant="ghost" size="icon" className="h-10 w-10 text-[#9CA3AF] hover:text-[#FACC15]"><Edit2 size={16}/></Button>
                   <Button variant="ghost" size="icon" className="h-10 w-10 text-[#9CA3AF] hover:text-[#EF4444]"><Trash2 size={16}/></Button>
                </div>
             </div>
          </Card>
        ))}

        {/* Upload Placeholder */}
        <div className="aspect-video rounded-3xl border-2 border-dashed border-[#1F2937] bg-[#0B1220]/50 flex flex-col items-center justify-center p-12 text-center group cursor-pointer hover:bg-[#EF4444]/5 hover:border-[#EF4444]/30 transition-all">
           <div className="w-20 h-20 rounded-full bg-[#111827] border border-[#1F2937] flex items-center justify-center text-[#9CA3AF] mb-6 group-hover:text-[#EF4444] group-hover:scale-110 transition-all">
              <Plus size={32} />
           </div>
           <p className="text-xs font-black uppercase tracking-widest text-[#9CA3AF] group-hover:text-white transition-colors">Queue New Content</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default VideoManager;
