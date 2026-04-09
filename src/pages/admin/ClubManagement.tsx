import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Users, MapPin, Plus, CheckCircle2, MoreVertical, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const clubs = [
  { id: 1, name: "Nashik Lions CC", location: "Nashik City", players: 42, founded: "1992", status: "Active" },
  { id: 2, name: "MCC Cricket Academy", location: "Deolali", players: 128, founded: "2005", status: "Active" },
  { id: 3, name: "City Warriors", location: "Nashik Road", players: 35, founded: "2015", status: "Pending" },
  { id: 4, name: "Eagle Sports Club", location: "Malegaon", players: 56, founded: "1998", status: "Active" },
];

const ClubManagement = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-display font-black uppercase tracking-tight text-white">Club Directory</h1>
          <p className="text-[#9CA3AF] text-sm font-bold uppercase tracking-widest mt-1">
            Manage all affiliated cricket clubs and training academies.
          </p>
        </div>
        <Button className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0B1220] font-black uppercase tracking-widest text-xs px-6 h-12 rounded-xl">
          <Plus size={18} className="mr-2" />
          Register New Club
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF] group-focus-within:text-[#FACC15] transition-colors" />
          <Input 
            placeholder="Search clubs by name or location..." 
            className="bg-[#111827] border-[#1F2937] pl-12 h-12 text-white focus-visible:ring-[#FACC15]/30 rounded-xl"
          />
        </div>
        <Button variant="outline" className="h-12 border-[#1F2937] text-[#9CA3AF] font-black uppercase tracking-widest text-[10px]">
          Filter Results
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <Card key={club.id} className="bg-[#111827] border-[#1F2937] hover:border-[#FACC15]/30 transition-all group">
            <CardHeader className="p-6 pb-0 flex flex-row justify-between items-start">
              <div className="w-16 h-16 rounded-2xl bg-[#0B1220] border border-[#1F2937] flex items-center justify-center text-[#FACC15] group-hover:scale-110 transition-transform">
                <Building2 size={32} />
              </div>
              <Button variant="ghost" size="icon" className="text-[#9CA3AF] hover:text-white rounded-lg">
                <MoreVertical size={20} />
              </Button>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="text-xl font-display font-black uppercase text-white mb-1">{club.name}</h3>
                <p className="flex items-center gap-1.5 text-[10px] text-[#9CA3AF] font-bold uppercase tracking-widest">
                  <MapPin size={12} className="text-[#FACC15]" />
                  {club.location}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#1F2937]">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-tighter text-[#9CA3AF] mb-1">Players</p>
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-[#FACC15]" />
                    <span className="text-sm font-bold text-white font-sans">{club.players}</span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-tighter text-[#9CA3AF] mb-1">Founded</p>
                  <p className="text-sm font-bold text-white font-sans">{club.founded}</p>
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <Badge variant="outline" className={`border-0 uppercase text-[10px] font-black tracking-widest h-7 px-3 ${
                  club.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                }`}>
                  {club.status}
                </Badge>
                <Button variant="outline" className="border-[#1F2937] bg-transparent text-[#9CA3AF] hover:text-white hover:bg-white/5 uppercase text-[10px] font-black tracking-widest h-8">
                  Manage Academy
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
};

export default ClubManagement;
