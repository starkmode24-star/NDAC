import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, 
  UserPlus, 
  Search, 
  MoreVertical, 
  ShieldAlert, 
  Lock, 
  Eye, 
  Settings2,
  Check,
  X,
  Mail,
  Building
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const users = [
  { id: 1, name: "Prateek Mane", email: "prateek@ndca.org", role: "Super Admin", access: "Unrestricted", lastLogin: "2 hours ago", status: "Active" },
  { id: 2, name: "Suraj Kulkarni", email: "suraj.k@mcc.com", role: "Club Admin", access: "MCC Club Only", lastLogin: "1 day ago", status: "Active" },
  { id: 3, name: "Anita Deshmukh", email: "anita@reports.ndca", role: "Analyst", access: "Reports & Gallery", lastLogin: "5 mins ago", status: "Active" },
  { id: 4, name: "Rahul V.", email: "rahul.v@scorers.in", role: "Match Scorer", access: "Live Matches Only", lastLogin: "3 days ago", status: "Inactive" },
  { id: 5, name: "Milind S.", email: "milind@lions.cc", role: "Club Admin", access: "Nashik Lions Only", lastLogin: "1 week ago", status: "Active" },
];

const permissions = [
  { module: "Dashboard", super: true, club: true, scorer: false },
  { module: "Player Database", super: true, club: "Restricted", scorer: false },
  { module: "Live Scoring", super: true, club: true, scorer: true },
  { module: "Leagues/Tournaments", super: true, club: false, scorer: false },
  { module: "Billing & Receipts", super: true, club: false, scorer: false },
  { module: "System Settings", super: true, club: false, scorer: false },
];

const UserAccess = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-display font-black uppercase tracking-tight text-white">Access Management</h1>
          <p className="text-[#9CA3AF] text-sm font-bold uppercase tracking-widest mt-1">
            Manage administrative roles and system-wide permissions.
          </p>
        </div>
        <Button className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0B1220] font-black uppercase tracking-widest text-xs px-6 h-12 rounded-xl">
          <UserPlus size={18} className="mr-2" />
          Add Internal User
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* User List Table */}
        <div className="xl:col-span-2 space-y-6">
          <Card className="bg-[#111827] border-[#1F2937]">
            <CardHeader className="border-b border-[#1F2937] py-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-display font-black uppercase text-white">System Admins</CardTitle>
                <div className="relative group w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
                    <Input placeholder="Search users..." className="bg-[#0B1220] border-[#1F2937] pl-10 h-10 text-xs" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-[#0B1220]/50">
                  <TableRow className="border-[#1F2937]">
                    <TableHead className="text-[10px] uppercase font-black text-[#9CA3AF] tracking-widest">Admin User</TableHead>
                    <TableHead className="text-[10px] uppercase font-black text-[#9CA3AF] tracking-widest">Role</TableHead>
                    <TableHead className="text-[10px] uppercase font-black text-[#9CA3AF] tracking-widest">Access Level</TableHead>
                    <TableHead className="text-[10px] uppercase font-black text-[#9CA3AF] tracking-widest">Last Activity</TableHead>
                    <TableHead className="text-[10px] uppercase font-black text-[#9CA3AF] tracking-widest text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} className="border-[#1F2937] hover:bg-white/[0.02]">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 border border-[#1F2937]">
                            <AvatarFallback className="bg-[#0B1220] text-[#FACC15] font-black text-[10px]">{user.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-bold text-white font-sans leading-none mb-1">{user.name}</p>
                            <p className="text-[10px] text-[#9CA3AF] font-bold uppercase">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-[9px] uppercase font-black border-white/10 ${
                            user.role === 'Super Admin' ? 'bg-[#FACC15] text-[#0B1220]' : 'bg-[#0B1220] text-[#9CA3AF]'
                        }`}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                            {user.access === 'Unrestricted' ? <ShieldCheck size={12} className="text-emerald-400" /> : <Lock size={12} className="text-[#FACC15]" />}
                            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{user.access}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-[10px] text-[#9CA3AF] font-bold uppercase">{user.lastLogin}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#9CA3AF] transition-colors hover:text-[#FACC15]"><Settings2 size={16}/></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#9CA3AF] transition-colors hover:text-[#EF4444]"><ShieldAlert size={16}/></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Permissions Grid Sidebar */}
        <div className="space-y-6">
          <Card className="bg-[#111827] border-[#1F2937]">
            <CardHeader>
              <CardTitle className="text-sm font-black uppercase text-white flex items-center gap-2">
                  <ShieldAlert size={16} className="text-[#FACC15]" />
                  Global RBAC Matrix
              </CardTitle>
              <CardDescription className="text-[10px] uppercase font-bold text-[#9CA3AF]">Role-Based Access Control settings</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
               <Table>
                  <TableHeader className="bg-[#0B1220]/50">
                    <TableRow className="border-[#1F2937]">
                      <TableHead className="text-[9px] font-black text-[#9CA3AF] uppercase">Module</TableHead>
                      <TableHead className="text-[9px] font-black text-[#9CA3AF] uppercase text-center">Super</TableHead>
                      <TableHead className="text-[9px] font-black text-[#9CA3AF] uppercase text-center">Club</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {permissions.map((p) => (
                      <TableRow key={p.module} className="border-[#1F2937]">
                        <TableCell className="py-3 text-[10px] font-bold text-white uppercase tracking-tight">{p.module}</TableCell>
                        <TableCell className="text-center py-3">
                          <Check size={14} className="text-emerald-400 mx-auto" />
                        </TableCell>
                        <TableCell className="text-center py-3">
                          {p.club === true && <Check size={14} className="text-emerald-400 mx-auto" />}
                          {p.club === false && <X size={14} className="text-[#EF4444] mx-auto" />}
                          {p.club === "Restricted" && <Lock size={12} className="text-[#FACC15] mx-auto" />}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
               </Table>
            </CardContent>
          </Card>

          <Card className="bg-[#FACC15]/5 border border-[#FACC15]/20 p-6">
             <div className="flex gap-4 items-start">
               <div className="p-3 bg-[#FACC15] rounded-xl">
                  <ShieldCheck size={24} className="text-[#0B1220]" />
               </div>
               <div>
                  <p className="text-xs font-black uppercase text-white mb-1">Security Audit</p>
                  <p className="text-[11px] text-[#9CA3AF] font-medium leading-relaxed">
                    Last security audit was conducted on <b>Oct 12, 2025</b>. All role permissions are currently synchronized with NDCA bylaws.
                  </p>
                  <Button variant="link" className="p-0 h-auto text-[#FACC15] text-[10px] font-black uppercase mt-3">Run New Audit</Button>
               </div>
             </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserAccess;
