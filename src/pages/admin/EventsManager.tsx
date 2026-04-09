import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Plus, 
  MoreVertical, 
  Edit2, 
  Users, 
  Trash2,
  Filter,
  Search,
  Award,
  Video
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const events = [
  { id: 1, title: "Annual General Meeting 2026", date: "Apr 25, 2026", time: "10:30 AM", venue: "NDCA Conference Hall", type: "Meeting", status: "Upcoming" },
  { id: 2, title: "U-16 Player Award Ceremony", date: "Apr 28, 2026", time: "05:00 PM", venue: "Main Pavilion", type: "Ceremony", status: "Upcoming" },
  { id: 3, title: "Scouting Clinic - North Zone", date: "May 02, 2026", time: "08:00 AM", venue: "Academy Grounds", type: "Trial/Clinic", status: "Draft" },
  { id: 4, title: "Press Briefing: NPL Season 5", date: "Apr 12, 2026", time: "11:00 AM", venue: "Media Center", type: "Press", status: "Upcoming" },
  { id: 5, title: "Coach Certification Workshop", date: "Mar 20, 2026", time: "09:00 AM", venue: "Lecture Hall B", type: "Training", status: "Completed" },
];

const EventsManager = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-display font-black uppercase tracking-tight text-white">Events Management</h1>
          <p className="text-[#9CA3AF] text-sm font-bold uppercase tracking-widest mt-1">
            Schedule association meetings, awards, and certification programs.
          </p>
        </div>
        <Button className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0B1220] font-black uppercase tracking-widest text-xs px-6 h-12 rounded-xl">
          <Plus size={18} className="mr-2" />
          Create New Event
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
         {[
           { label: "Active Events", val: "12", icon: Calendar, color: "text-blue-400" },
           { label: "Total Registrations", val: "450", icon: Users, color: "text-[#FACC15]" },
           { label: "Pending Awards", val: "08", icon: Award, color: "text-emerald-400" },
           { label: "Venue Bookings", val: "05", icon: MapPin, color: "text-orange-400" },
         ].map(s => (
           <Card key={s.label} className="bg-[#111827] border-[#1F2937]">
              <CardContent className="p-6">
                 <div className={`p-3 w-fit rounded-xl bg-[#0B1220] mb-4 ${s.color}`}>
                    <s.icon size={20} />
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF]">{s.label}</p>
                 <p className="text-2xl font-display font-black text-white mt-1">{s.val}</p>
              </CardContent>
           </Card>
         ))}
      </div>

      {/* Main Events Table */}
      <Card className="bg-[#111827] border-[#1F2937] overflow-hidden">
        <CardHeader className="border-b border-[#1F2937] py-4 bg-[#0B1220]/30 mr-0">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-0">
            <CardTitle className="text-lg font-display font-black uppercase text-white">Association Calendar</CardTitle>
            <div className="flex gap-3 w-full md:w-auto">
               <div className="relative flex-1 group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9CA3AF]" />
                  <Input placeholder="Search event title..." className="bg-[#0B1220] border-[#1F2937] h-9 text-xs pl-9" />
               </div>
               <Button variant="outline" size="icon" className="h-9 w-9 border-[#1F2937] text-[#9CA3AF]"><Filter size={14}/></Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-[#0B1220]/50">
              <TableRow className="border-[#1F2937]">
                <TableHead className="text-[10px] uppercase font-black tracking-widest text-[#9CA3AF]">Event Title</TableHead>
                <TableHead className="text-[10px] uppercase font-black tracking-widest text-[#9CA3AF]">Type</TableHead>
                <TableHead className="text-[10px] uppercase font-black tracking-widest text-[#9CA3AF]">Datetime</TableHead>
                <TableHead className="text-[10px] uppercase font-black tracking-widest text-[#9CA3AF]">Venue</TableHead>
                <TableHead className="text-[10px] uppercase font-black tracking-widest text-[#9CA3AF]">Status</TableHead>
                <TableHead className="text-[10px] uppercase font-black tracking-widest text-[#9CA3AF] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((e) => (
                <TableRow key={e.id} className="border-[#1F2937] hover:bg-white/[0.02] transition-colors">
                  <TableCell>
                    <span className="text-sm font-bold text-white font-sans">{e.title}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[9px] uppercase font-black border-white/10 text-gray-400">
                      {e.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                       <p className="text-xs font-bold text-white uppercase">{e.date}</p>
                       <p className="text-[10px] text-[#9CA3AF] font-medium flex items-center gap-1"><Clock size={10}/> {e.time}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-xs text-gray-400 font-sans">{e.venue}</p>
                  </TableCell>
                  <TableCell>
                    <Badge className={`uppercase text-[9px] font-black border-0 ${
                      e.status === 'Upcoming' ? 'bg-blue-500/10 text-blue-400' :
                      e.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' :
                      'bg-gray-500/10 text-gray-400'
                    }`}>
                      {e.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                       <Button variant="ghost" size="icon" className="h-8 w-8 text-[#9CA3AF] hover:text-[#FACC15]"><Edit2 size={14}/></Button>
                       <Button variant="ghost" size="icon" className="h-8 w-8 text-[#9CA3AF] hover:text-[#EF4444]"><Trash2 size={14}/></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default EventsManager;
