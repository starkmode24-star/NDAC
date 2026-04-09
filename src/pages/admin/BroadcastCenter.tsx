import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Send, 
  Bell, 
  Smartphone, 
  Mail, 
  Users, 
  Zap, 
  Clock, 
  Target,
  History,
  AlertCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const logs = [
  { id: 1, title: "Trial Selection List Published", sentTo: "All Players", method: "Push + Email", time: "1 hour ago", status: "Delivered" },
  { id: 2, title: "NPL Player Auction Reminder", sentTo: "Club Admins", method: "Push", time: "2 days ago", status: "Delivered" },
  { id: 3, title: "Weather Alert - Match Delayed", sentTo: "Public Fans", method: "System Alert", time: "1 week ago", status: "Archived" },
];

const BroadcastCenter = () => {
  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-display font-black uppercase tracking-tight text-white">Broadcast Center</h1>
        <p className="text-[#9CA3AF] text-sm font-bold uppercase tracking-widest mt-1">
          Compose and deploy system-wide alerts via Firebase Cloud Messaging (FCM).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Composer */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-[#111827] border-[#1F2937]">
            <CardHeader className="border-b border-[#1F2937]">
              <CardTitle className="text-sm font-black uppercase text-white tracking-widest flex items-center gap-2">
                 <Zap className="text-[#FACC15]" size={16} />
                 New Broadcast Message
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF]">Target Audience</p>
                      <div className="grid grid-cols-2 gap-3">
                         {["All Users", "Players Only", "Clubs Only", "Trial Candidates"].map(target => (
                           <button key={target} className="h-12 rounded-xl bg-[#0B1220] border border-[#1F2937] text-[10px] font-black uppercase hover:border-[#FACC15] transition-all text-white">{target}</button>
                         ))}
                      </div>
                   </div>
                   <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF]">Channel priority</p>
                      <div className="grid grid-cols-2 gap-3">
                         <button className="h-12 rounded-xl bg-[#FACC15]/10 border border-[#FACC15] text-[10px] font-black uppercase text-[#FACC15] flex items-center justify-center gap-2"><Smartphone size={14}/> Push (FCM)</button>
                         <button className="h-12 rounded-xl bg-[#0B1220] border border-[#1F2937] text-[10px] font-black uppercase text-[#9CA3AF] flex items-center justify-center gap-2"><Mail size={14}/> Email API</button>
                      </div>
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF]">Broadcast Title</label>
                   <Input placeholder="Enter high-level title..." className="bg-[#0B1220] border-[#1F2937] text-sm h-12" />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF]">Message Content (Short & Impactful)</label>
                    <Textarea placeholder="Type your message here (max 160 chars for push)..." className="bg-[#0B1220] border-[#1F2937] min-h-[120px]" />
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-[#1F2937]">
                   <div className="flex items-center gap-2 text-emerald-400">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-widest">FCM Gateway Online</span>
                   </div>
                   <Button className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0B1220] font-black uppercase tracking-[0.2em] text-xs px-10 h-14 rounded-2xl shadow-[0_10px_40px_rgba(250,204,21,0.2)]">
                      <Send size={18} className="mr-2" />
                      Deploy Now
                   </Button>
                </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar logs */}
        <div className="space-y-6">
           <Card className="bg-[#111827] border-[#1F2937]">
              <CardHeader>
                 <CardTitle className="text-sm font-black uppercase text-white flex items-center gap-2">
                    <History size={16} className="text-[#9CA3AF]" />
                    Deployment History
                 </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                 {logs.map((log) => (
                   <div key={log.id} className="p-5 border-t border-[#1F2937] hover:bg-white/[0.02] transition-colors relative group">
                      <div className="flex justify-between items-start mb-2">
                         <h4 className="text-xs font-bold text-white uppercase">{log.title}</h4>
                         <Badge className="bg-emerald-500/10 text-emerald-400 text-[8px] font-black uppercase border-0">{log.status}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[9px] font-bold text-[#9CA3AF] uppercase">
                         <span className="flex items-center gap-1"><Users size={10}/> {log.sentTo}</span>
                         <span className="flex items-center gap-1"><Zap size={10}/> {log.method}</span>
                      </div>
                      <p className="text-[8px] text-gray-600 mt-2 font-black uppercase tracking-widest flex items-center gap-1"><Clock size={8}/> {log.time}</p>
                   </div>
                 ))}
                 <Button variant="ghost" className="w-full h-12 uppercase text-[10px] font-black text-[#9CA3AF]">View Full Audit Logs</Button>
              </CardContent>
           </Card>

           <Card className="bg-[#EF4444]/10 border border-[#EF4444]/20 p-6">
              <div className="flex gap-4 items-start">
                 <AlertCircle className="text-[#EF4444]" size={24} />
                 <div>
                    <p className="text-xs font-black uppercase text-white mb-1">System Restriction</p>
                    <p className="text-[10px] text-[#9CA3AF] leading-relaxed font-medium">Broadcasts are limited to 2 per 24 hours for "Public Fans" to prevent spam reports on FCM gateway.</p>
                 </div>
              </div>
           </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BroadcastCenter;
