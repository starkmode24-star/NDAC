import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Settings as SettingsIcon, 
  Bell, 
  Lock, 
  Globe, 
  Database, 
  ShieldCheck,
  User,
  Mail,
  Smartphone,
  CheckCircle2,
  Download,
  UploadCloud,
  RefreshCcw,
  Cloud
} from "lucide-react";

const Settings = () => {
  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-display font-black uppercase tracking-tight text-white">System Settings</h1>
        <p className="text-[#9CA3AF] text-sm font-bold uppercase tracking-widest mt-1">
          Configure association rules, notifications and platform preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="xl:col-span-1 space-y-2">
          {[
            { label: 'General Configuration', icon: Globe, active: true },
            { label: 'Notification Rules', icon: Bell, active: false },
            { label: 'Security & Access', icon: Lock, active: false },
            { label: 'Data Management', icon: Database, active: false },
            { label: 'Admin Profiles', icon: ShieldCheck, active: false },
          ].map((item) => (
            <button key={item.label} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
              item.active 
                ? 'bg-[#FACC15] text-[#0B1220] font-black' 
                : 'text-[#9CA3AF] hover:text-white hover:bg-white/5 border border-transparent'
            }`}>
              <item.icon size={18} />
              <span className="text-[10px] uppercase font-black tracking-widest leading-none">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="xl:col-span-3 space-y-8">
          {/* General Section */}
          <SectionCard title="Association Profile" description="Main branding and contact information for NDCA.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF]">Association Name</Label>
                <Input defaultValue="Nashik District Cricket Association" className="bg-[#0B1220] border-[#1F2937] text-white focus-visible:ring-[#FACC15]/20" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF]">Contact Email</Label>
                <Input defaultValue="admin@ndca.org.in" className="bg-[#0B1220] border-[#1F2937] text-white focus-visible:ring-[#FACC15]/20" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF]">Headquarters Address</Label>
                <Input defaultValue="Tennis Court, Nashik Golf Club, Nashik" className="bg-[#0B1220] border-[#1F2937] text-white focus-visible:ring-[#FACC15]/20" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF]">Registration Prefix</Label>
                <Input defaultValue="NDCA-REG-" className="bg-[#0B1220] border-[#1F2937] text-white focus-visible:ring-[#FACC15]/20" />
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <Button className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0B1220] font-black uppercase text-[10px] px-8 h-10 tracking-[0.2em] rounded-lg">Save Configuration</Button>
            </div>
          </SectionCard>

          {/* Preferences Section */}
          <SectionCard title="System Preferences" description="Global behavior and automated rules.">
            <div className="space-y-6 mt-6">
              {[
                { title: 'Auto-approve Registered Clubs', desc: 'Automatically approve clubs with verified local credentials.', checked: false },
                { title: 'Live Score Push Notifications', desc: 'Broadcast live match updates to the public mobile app.', checked: true },
                { title: 'Weekly Performance Reports', desc: 'Generate and email PDF reports to district leads every Monday.', checked: true },
                { title: 'Player Transfer Period', desc: 'Enable player transfers between clubs across the district.', checked: false },
              ].map((pref) => (
                <div key={pref.title} className="flex items-center justify-between p-4 rounded-xl border border-[#1F2937] bg-[#0B1220]/50">
                  <div>
                    <p className="text-xs font-black uppercase text-white tracking-widest mb-1">{pref.title}</p>
                    <p className="text-[10px] text-[#9CA3AF] font-medium">{pref.desc}</p>
                  </div>
                  <Switch checked={pref.checked} className="data-[state=checked]:bg-[#FACC15]" />
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Backup Section */}
          <SectionCard title="Data Continuity & Backups" description="AWS S3 Cloud backups and system snapshots.">
             <div className="mt-6 p-6 rounded-2xl bg-[#0B1220] border border-[#1F2937] space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                   <div className="flex gap-4 items-center">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                         <Cloud size={24} />
                      </div>
                      <div>
                         <p className="text-sm font-black text-white uppercase tracking-tight">Daily Automated Sync</p>
                         <p className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-widest">Target Path: s3://ndca-backups-mumbai/db-prod/</p>
                      </div>
                   </div>
                   <div className="text-left md:text-right">
                      <p className="text-[10px] font-black uppercase text-white mb-1">Last Backup Successful</p>
                      <p className="text-[9px] font-bold text-emerald-400 uppercase flex items-center justify-end gap-1"><CheckCircle2 size={10}/> 4 hours ago Â· 124.5 MB</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-[#1F2937]/50">
                    <Button variant="outline" className="border-[#1F2937] text-white font-black uppercase text-[10px] h-12 rounded-xl gap-2 hover:bg-white/5">
                       <Download size={16} className="text-[#9CA3AF]" />
                       Download Daily Snapshot
                    </Button>
                    <Button className="bg-[#FACC15] text-[#0B1220] font-black uppercase text-[10px] h-12 rounded-xl gap-2 hover:bg-[#FACC15]/90 shadow-lg shadow-[#FACC15]/10">
                       <RefreshCcw size={16} />
                       Trigger Manual Backup
                    </Button>
                </div>
             </div>
          </SectionCard>
        </div>
      </div>
    </AdminLayout>
  );
};

const SectionCard = ({ title, description, children }: { title: string, description: string, children: React.ReactNode }) => (
  <Card className="bg-[#111827] border-[#1F2937] overflow-hidden">
    <CardHeader className="bg-[#0B1220]/30 border-b border-[#1F2937] pb-4">
      <CardTitle className="text-lg font-display font-black uppercase text-white flex items-center gap-2">
        <CheckCircle2 size={18} className="text-[#FACC15]" />
        {title}
      </CardTitle>
      <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF]">{description}</CardDescription>
    </CardHeader>
    <CardContent className="p-8">
      {children}
    </CardContent>
  </Card>
);

export default Settings;
