import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileEdit, 
  Save, 
  Eye, 
  History, 
  Settings, 
  Layout, 
  Globe,
  Search,
  CheckCircle,
  MoreVertical,
  ChevronRight,
  Monitor,
  Tablet,
  Smartphone
} from "lucide-react";
import { Input } from "@/components/ui/input";

const pages = [
  { name: "Constitution & By-Laws", path: "/information", lastEdit: "2 hrs ago", editor: "Admin (Santosh)", status: "Published" },
  { name: "League Rules: U-14", path: "/information/rules-u14", lastEdit: "1 day ago", editor: "Admin (Dhanpal)", status: "Published" },
  { name: "Hall of Fame Legends", path: "/hall-of-fame", lastEdit: "5 mins ago", editor: "System", status: "Draft" },
  { name: "Stadium Infrastructure", path: "/infrastructure", lastEdit: "3 days ago", editor: "Admin (Rajesh)", status: "Published" },
];

const PageEditor = () => {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-display font-black uppercase tracking-tight text-white">CMS / Page Editor</h1>
          <p className="text-[#9CA3AF] text-sm font-bold uppercase tracking-widest mt-1">
             Manage static content for the "General 8" portal pages.
          </p>
        </div>
        <div className="flex gap-4">
           <Button variant="outline" className="h-12 border-[#1F2937] text-white uppercase text-[10px] font-black px-6 rounded-xl gap-2">
              <History size={16}/> Versions
           </Button>
           <Button className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0B1220] font-black uppercase tracking-widest text-xs px-6 h-12 rounded-xl gap-2">
              <Save size={18} /> Update Live Site
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Page Selector Sidebar */}
         <div className="lg:col-span-1 space-y-4">
            <Card className="bg-[#111827] border-[#1F2937]">
               <CardHeader className="p-4 border-b border-[#1F2937]">
                  <div className="relative">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9CA3AF]" />
                     <Input placeholder="Search pages..." className="bg-[#0B1220] border-[#1F2937] h-9 text-xs pl-9" />
                  </div>
               </CardHeader>
               <CardContent className="p-2">
                  {pages.map((p) => (
                    <button 
                      key={p.name} 
                      className={`w-full p-4 rounded-xl flex flex-col items-start gap-1 text-left transition-all group ${
                        p.name.includes("Constitution") ? 'bg-[#FACC15]/10 border border-[#FACC15]/30' : 'hover:bg-white/5'
                      }`}
                    >
                       <div className="flex justify-between items-center w-full">
                          <p className={`text-[10px] font-black uppercase tracking-tight ${p.name.includes("Constitution") ? 'text-[#FACC15]' : 'text-white'}`}>{p.name}</p>
                          <ChevronRight size={14} className={p.name.includes("Constitution") ? 'text-[#FACC15]' : 'text-[#9CA3AF]'} />
                       </div>
                       <p className="text-[8px] font-bold text-[#9CA3AF] uppercase flex items-center gap-2">
                          {p.status === 'Published' ? <CheckCircle size={10} className="text-emerald-500" /> : <div className="w-2.5 h-2.5 rounded-full bg-[#FACC15]"/>}
                          Last edit {p.lastEdit}
                       </p>
                    </button>
                  ))}
               </CardContent>
            </Card>
         </div>

         {/* Editor Workspace */}
         <div className="lg:col-span-3 space-y-6">
            <Card className="bg-[#111827] border-[#1F2937] overflow-hidden">
               <div className="bg-[#0B1220] px-6 py-4 border-b border-[#1F2937] flex justify-between items-center">
                  <div className="flex items-center gap-4">
                     <div className="p-2 rounded bg-primary/10 text-primary">
                        <Layout size={18} />
                     </div>
                     <div>
                        <p className="text-sm font-black text-white uppercase italic">Constitution & By-Laws</p>
                        <p className="text-[9px] text-[#9CA3AF] font-bold uppercase tracking-widest">Route: {pages[0].path}</p>
                     </div>
                  </div>
                  <div className="flex gap-2 p-1 bg-[#111827] rounded-lg border border-[#1F2937]">
                     <Button variant="ghost" size="icon" className="h-8 w-8 text-[#FACC15] bg-[#FACC15]/10"><Monitor size={14}/></Button>
                     <Button variant="ghost" size="icon" className="h-8 w-8 text-[#9CA3AF]"><Tablet size={14}/></Button>
                     <Button variant="ghost" size="icon" className="h-8 w-8 text-[#9CA3AF]"><Smartphone size={14}/></Button>
                  </div>
               </div>

               {/* Mock Editor Body */}
               <CardContent className="p-0">
                  <div className="flex flex-col h-[600px] bg-[#0B1220]/20">
                     {/* Toolbar */}
                     <div className="px-6 py-3 border-b border-[#1F2937] flex gap-4 bg-[#0B1220]/40">
                         {["B", "I", "U", "H1", "H2", "List", "Link", "Img"].map(tool => (
                           <button key={tool} className="w-10 h-10 rounded bg-[#111827] border border-[#1F2937] text-xs font-black text-[#9CA3AF] hover:text-white transition-colors">{tool}</button>
                         ))}
                     </div>
                     {/* Canvas */}
                     <div className="flex-1 p-10 font-sans overflow-y-auto">
                        <div className="max-w-2xl mx-auto space-y-6 opacity-60">
                           <h1 className="text-4xl font-black text-white uppercase">Association Constitution</h1>
                           <div className="h-4 w-full bg-[#1F2937] rounded-full" />
                           <div className="h-4 w-[90%] bg-[#1F2937] rounded-full" />
                           <div className="h-4 w-[95%] bg-[#1F2937] rounded-full" />
                           
                           <h2 className="text-2xl font-black text-white uppercase pt-6">Article I: Identity</h2>
                           <div className="h-4 w-[85%] bg-[#1F2937] rounded-full" />
                           <div className="h-4 w-[92%] bg-[#1F2937] rounded-full" />
                           
                           <div className="p-8 rounded-2xl border-2 border-dashed border-[#1F2937] flex flex-col items-center justify-center text-[#9CA3AF] gap-3">
                              <Save size={32} className="opacity-20" />
                              <p className="text-[10px] font-black uppercase tracking-widest">Visual Blocks Editor Interface Active</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </CardContent>

               <div className="p-4 bg-[#0B1220]/30 border-t border-[#1F2937] flex justify-between items-center">
                  <p className="text-[9px] font-black uppercase tracking-widest text-[#9CA3AF]">Word Count: 1,420 Â· Read Time: 6m</p>
                  <div className="flex gap-4">
                     <Button variant="ghost" className="uppercase text-[9px] font-black text-[#9CA3AF]">Discard Changes</Button>
                     <Button className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase text-[9px] font-black px-6 h-10 rounded-xl gap-2">
                        <Globe size={14}/> Preview Live
                     </Button>
                  </div>
               </div>
            </Card>
         </div>
      </div>
    </AdminLayout>
  );
};

export default PageEditor;
