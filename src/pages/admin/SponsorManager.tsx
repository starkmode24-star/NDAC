import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Upload, 
  Plus, 
  ArrowUp, 
  ArrowDown, 
  Settings, 
  Trash2, 
  Globe,
  ExternalLink,
  Lock,
  Star
} from "lucide-react";
import { Input } from "@/components/ui/input";

const partners = [
  { id: 1, name: "Global Sports", tier: "Title Sponsor", priority: 1, logo: "ðŸ”¥", status: "Active" },
  { id: 2, name: "Nashik Bank", tier: "Banking Partner", priority: 2, logo: "ðŸ’°", status: "Active" },
  { id: 3, name: "TechNova", tier: "Digital Partner", priority: 3, logo: "ðŸ’¡", status: "Active" },
  { id: 4, name: "Everest Water", tier: "Associate Sponsor", priority: 4, logo: "â „ï¸ ", status: "Paused" },
];

const SponsorManager = () => {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-display font-black uppercase tracking-tight text-white">Sponsorship Manager</h1>
          <p className="text-[#9CA3AF] text-sm font-bold uppercase tracking-widest mt-1">
             Manage partner logos, tiers, and global visibility priorities.
          </p>
        </div>
        <Button className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0B1220] font-black uppercase tracking-widest text-xs px-6 h-12 rounded-xl">
          <Plus size={18} className="mr-2" />
          Add New Partner
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
         {[
           { label: "Total Revenue", val: "$142k", icon: Building2 },
           { label: "Active Brands", val: "18", icon: Globe },
           { label: "Prime Slots", val: "04/05", icon: Star },
           { label: "Logo Clicks", val: "8.2k", icon: ArrowUp },
         ].map(s => (
           <Card key={s.label} className="bg-[#111827] border-[#1F2937]">
              <CardContent className="p-6">
                 <p className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF] mb-1">{s.label}</p>
                 <div className="flex items-center justify-between">
                    <p className="text-2xl font-display font-black text-white">{s.val}</p>
                    <s.icon size={20} className="text-[#FACC15] opacity-50" />
                 </div>
              </CardContent>
           </Card>
         ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-6 py-2">
           <p className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF]">Partner / Brand</p>
           <p className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF]">Tier & Priority</p>
        </div>
        
        {partners.map((p) => (
          <Card key={p.id} className="bg-[#111827] border-[#1F2937] hover:border-[#FACC15]/30 transition-all group">
             <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6 w-full md:w-auto">
                   <div className="w-16 h-16 rounded-2xl bg-[#0B1220] border border-[#1F2937] flex items-center justify-center text-4xl group-hover:bg-[#FACC15]/10 transition-colors">
                      {p.logo}
                   </div>
                   <div>
                      <h3 className="text-lg font-display font-black text-white uppercase">{p.name}</h3>
                      <div className="flex items-center gap-4 mt-1">
                         <Badge className={`text-[8px] font-black uppercase border-0 ${p.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-500/10 text-gray-400'}`}>
                           {p.status}
                         </Badge>
                         <p className="text-[9px] font-bold text-[#9CA3AF] flex items-center gap-1 uppercase tracking-widest">
                            <ExternalLink size={10} />
                            view kit
                         </p>
                      </div>
                   </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8 w-full md:w-auto">
                   <div className="text-center md:text-right space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white">{p.tier}</p>
                      <p className="text-[8px] font-bold text-[#9CA3AF] uppercase">Priority: {p.priority}</p>
                   </div>
                   
                   <div className="flex gap-2">
                      <div className="flex flex-col gap-1">
                         <Button variant="outline" size="icon" className="h-8 w-8 border-[#1F2937] text-[#9CA3AF] hover:text-[#FACC15]"><ArrowUp size={14}/></Button>
                         <Button variant="outline" size="icon" className="h-8 w-8 border-[#1F2937] text-[#9CA3AF] hover:text-[#FACC15]"><ArrowDown size={14}/></Button>
                      </div>
                      <div className="h-18 w-[1px] bg-[#1F2937] mx-2 hidden md:block" />
                      <div className="flex items-center gap-2">
                         <Button variant="ghost" size="icon" className="h-10 w-10 text-[#9CA3AF] hover:text-[#FACC15]"><Upload size={18}/></Button>
                         <Button variant="ghost" size="icon" className="h-10 w-10 text-[#9CA3AF] hover:text-[#EF4444]"><Trash2 size={18}/></Button>
                      </div>
                   </div>
                </div>
             </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 p-8 rounded-3xl bg-[#0B1220] border-2 border-dashed border-[#1F2937] flex flex-col items-center justify-center text-center">
         <Building2 size={48} className="text-[#9CA3AF] mb-4 opacity-20" />
         <h3 className="text-xl font-display font-black text-white uppercase">New Revenue Channel?</h3>
         <p className="text-sm text-[#9CA3AF] max-w-md mt-2 mb-8">Click 'Add New Partner' to upload assets for upcoming seasonal sponsorships or league partners.</p>
         <Button variant="outline" className="border-[#1F2937] text-[#9CA3AF] uppercase text-[10px] font-black px-10 h-12 hover:bg-[#FACC15]/10 hover:text-[#FACC15] hover:border-[#FACC15]/30">Media Kit Template</Button>
      </div>
    </AdminLayout>
  );
};

export default SponsorManager;
