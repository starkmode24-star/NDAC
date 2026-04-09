import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Calendar, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Search, 
  History, 
  Plus, 
  MapPin, 
  Clock,
  Filter,
  UserCheck
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

const trials = [
  { id: 1, category: "U-16 District", date: "Apr 25, 2026", venue: "Police Ground", applicants: 120, status: "Active" },
  { id: 2, category: "U-19 Selection", date: "May 02, 2026", venue: "Golf Club", applicants: 85, status: "Upcoming" },
  { id: 3, category: "Senior Women", date: "May 10, 2026", venue: "HPT College", applicants: 45, status: "Registration Closed" },
];

const applicants = [
  { id: 1, name: "Arjun Singh", ageGroup: "U-16", skill: "Fast Bowler", club: "Nashik Lions", status: "Pending" },
  { id: 2, name: "Ishan Sharma", ageGroup: "U-16", skill: "Opening Batsman", club: "MCC Club", status: "Approved" },
  { id: 3, name: "Vicky Raut", ageGroup: "U-16", skill: "Wicketkeeper", club: "City CC", status: "Rejected" },
  { id: 4, name: "Rohit Patil", ageGroup: "U-16", skill: "Leg Spinner", club: "Nashik Road CC", status: "Pending" },
];

const auditTrail = [
  { id: 1, action: "Applicant Approved", user: "Admin (S. Kulkarni)", target: "Ishan Sharma", time: "10 mins ago" },
  { id: 2, action: "Applicant Rejected", user: "Admin (S. Kulkarni)", target: "Vicky Raut", time: "1 hour ago" },
  { id: 3, action: "New Trial Created", user: "Super Admin", target: "U-19 Selection", time: "3 hours ago" },
];

const SelectionProcess = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-display font-black uppercase tracking-tight text-white">Selection & Scouting</h1>
          <p className="text-[#9CA3AF] text-sm font-bold uppercase tracking-widest mt-1">
            Manage age-group trials and talent identification programs.
          </p>
        </div>
        <Button className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0B1220] font-black uppercase tracking-widest text-xs px-6 h-12 rounded-xl">
          <Plus size={18} className="mr-2" />
          Create Trial Session
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Main Content Areas */}
        <div className="xl:col-span-3 space-y-8">
          <Tabs defaultValue="applicants" className="w-full">
            <TabsList className="bg-[#111827] border border-[#1F2937] p-1 h-12 rounded-xl mb-6">
              <TabsTrigger value="applicants" className="px-6 rounded-lg data-[state=active]:bg-[#FACC15] data-[state=active]:text-[#0B1220] uppercase text-[10px] font-black tracking-widest">
                Applicant Manager
              </TabsTrigger>
              <TabsTrigger value="sessions" className="px-6 rounded-lg data-[state=active]:bg-[#FACC15] data-[state=active]:text-[#0B1220] uppercase text-[10px] font-black tracking-widest">
                Trial Sessions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="applicants">
              <Card className="bg-[#111827] border-[#1F2937]">
                <CardHeader className="border-b border-[#1F2937] flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-display font-black uppercase text-white">Trial Candidates</CardTitle>
                    <CardDescription className="text-xs text-[#9CA3AF] uppercase font-bold">U-16 District Selection (Apr 2026)</CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative group w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9CA3AF]" />
                      <Input placeholder="Search name or club..." className="bg-[#0B1220] border-[#1F2937] h-9 text-xs pl-9" />
                    </div>
                    <Button variant="outline" size="icon" className="h-9 w-9 border-[#1F2937] text-[#9CA3AF]">
                      <Filter size={16} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-[#0B1220]/50">
                      <TableRow className="border-[#1F2937]">
                        <TableHead className="text-[10px] uppercase font-black tracking-widest text-[#9CA3AF]">Candidate</TableHead>
                        <TableHead className="text-[10px] uppercase font-black tracking-widest text-[#9CA3AF]">Specialization</TableHead>
                        <TableHead className="text-[10px] uppercase font-black tracking-widest text-[#9CA3AF]">Club</TableHead>
                        <TableHead className="text-[10px] uppercase font-black tracking-widest text-[#9CA3AF]">Status</TableHead>
                        <TableHead className="text-[10px] uppercase font-black tracking-widest text-[#9CA3AF] text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {applicants.map((app) => (
                        <TableRow key={app.id} className="border-[#1F2937] hover:bg-white/[0.02]">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-[#FACC15]/10 flex items-center justify-center text-[#FACC15]">
                                <UserCheck size={16} />
                              </div>
                              <span className="text-sm font-bold text-white font-sans">{app.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-[#1F2937] text-[#9CA3AF] text-[9px] uppercase font-black">
                              {app.skill}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-gray-300 font-sans">{app.club}</TableCell>
                          <TableCell>
                            <Badge className={`uppercase text-[9px] font-black border-0 ${
                              app.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400' :
                              app.status === 'Rejected' ? 'bg-[#EF4444]/10 text-[#EF4444]' :
                              'bg-[#FACC15]/10 text-[#FACC15]'
                            }`}>
                              {app.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button size="sm" className="h-8 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 uppercase text-[9px] font-black tracking-widest px-3 border-0">
                                <CheckCircle2 size={12} className="mr-1.5" /> Approve
                              </Button>
                              <Button size="sm" className="h-8 bg-[#EF4444]/10 text-[#EF4444] hover:bg-[#EF4444]/20 uppercase text-[9px] font-black tracking-widest px-3 border-0">
                                <XCircle size={12} className="mr-1.5" /> Reject
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sessions">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trials.map((trial) => (
                  <Card key={trial.id} className="bg-[#111827] border-[#1F2937] overflow-hidden group">
                    <CardHeader className="bg-[#0B1220]/50 border-b border-[#1F2937] p-4 flex flex-row items-center justify-between">
                      <Badge className={`uppercase text-[9px] font-black ${
                        trial.status === 'Active' ? 'bg-emerald-500 text-white' : 'bg-[#1F2937] text-[#9CA3AF]'
                      }`}>
                        {trial.status}
                      </Badge>
                      <span className="text-[10px] font-black text-[#FACC15] uppercase tracking-widest">Trial ID: TR-{trial.id}</span>
                    </CardHeader>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-display font-black uppercase text-white mb-4 group-hover:text-[#FACC15] transition-colors">{trial.category}</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-xs text-[#9CA3AF] font-bold uppercase tracking-widest">
                          <Calendar size={14} className="text-[#FACC15]" />
                          {trial.date}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-[#9CA3AF] font-bold uppercase tracking-widest">
                          <MapPin size={14} className="text-[#FACC15]" />
                          {trial.venue}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-[#9CA3AF] font-bold uppercase tracking-widest">
                          <Users size={14} className="text-[#FACC15]" />
                          {trial.applicants} Registered
                        </div>
                      </div>
                      <Button variant="outline" className="w-full mt-6 border-[#1F2937] text-white uppercase text-[10px] font-black h-10 hover:bg-[#FACC15] hover:text-[#0B1220] transition-all">
                        Edit Session Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Audit Trail Sidebar */}
        <div className="xl:col-span-1">
          <Card className="bg-[#111827] border-[#1F2937] sticky top-28">
            <CardHeader className="border-b border-[#1F2937]">
              <CardTitle className="text-sm font-black uppercase tracking-tighter text-white flex items-center gap-2">
                <History size={16} className="text-[#FACC15]" />
                Selection Audit Trail
              </CardTitle>
              <CardDescription className="text-[10px] font-bold uppercase text-[#9CA3AF]">Recent selection logs</CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-6">
              {auditTrail.map((log) => (
                <div key={log.id} className="relative group">
                  <div className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FACC15] mt-1.5 shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                    <div>
                      <p className="text-[11px] font-black text-white uppercase tracking-tight">{log.action}</p>
                      <p className="text-[10px] text-[#9CA3AF] mt-0.5"><span className="text-white font-bold">{log.target}</span> by {log.user}</p>
                      <p className="text-[9px] text-[#9CA3AF] italic mt-1 flex items-center gap-1">
                        <Clock size={10} />
                        {log.time}
                      </p>
                    </div>
                  </div>
                  {log.id !== auditTrail.length && (
                    <div className="absolute left-[2.5px] top-6 bottom-[-24px] w-[1px] bg-[#1F2937]" />
                  )}
                </div>
              ))}
              <Button variant="ghost" className="w-full text-[10px] font-black uppercase tracking-widest text-[#9CA3AF] hover:text-white pt-4">
                View Full Logs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SelectionProcess;
