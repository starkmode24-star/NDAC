import PublicLayout from "@/components/PublicLayout";
import { FileText, Download, Gavel, Scale, FileCheck, HelpCircle, Trophy, Users, ShieldAlert } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const docs = [
  { title: "Financial Report 2024-25", size: "2.4 MB", date: "Apr 01, 2025" },
  { title: "Annual General Meeting Minutes", size: "1.1 MB", date: "Jan 15, 2025" },
  { title: "NDCA Audit Statement", size: "3.8 MB", date: "Mar 10, 2025" },
  { title: "Member Directory 2025", size: "0.9 MB", date: "Feb 20, 2025" },
];

const Information = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'constitution';
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  const handleTabChange = (val: string) => {
    setActiveTab(val);
    setSearchParams({ tab: val });
  };

  return (
    <PublicLayout>
      <section className="py-20 bg-muted/20">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
            <div className="space-y-4">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                <FileCheck size={14} />
                Governance & Documentation
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-black text-foreground uppercase tracking-tighter">
                Association <span className="text-primary">Intel</span>
              </h1>
            </div>
            <p className="max-w-md text-muted-foreground text-sm font-sans italic border-l-4 border-primary pl-6 py-2">
              Transparency is our core value. Access the legal framework, rules, and reports that govern NDCA operations.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-12">
            <TabsList className="bg-background border border-border p-1 h-auto grid grid-cols-2 lg:grid-cols-4 rounded-xl shadow-sm">
                <TabsTrigger value="constitution" className="uppercase text-[10px] font-black py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Constitution</TabsTrigger>
                <TabsTrigger value="elections" className="uppercase text-[10px] font-black py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Elections</TabsTrigger>
                <TabsTrigger value="rules" className="uppercase text-[10px] font-black py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">League Rules</TabsTrigger>
                <TabsTrigger value="reports" className="uppercase text-[10px] font-black py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Annual Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="constitution" className="animate-fade-up">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="md:col-span-2 space-y-6">
                    <Card className="border-border/60 shadow-xl overflow-hidden">
                       <CardHeader className="bg-primary hover:brightness-105 transition-all text-primary-foreground p-8">
                          <Gavel size={40} className="mb-4" />
                          <CardTitle className="text-3xl font-display font-black uppercase tracking-tight">NDCA By-Laws & Constitution</CardTitle>
                          <p className="text-primary-foreground/70 text-sm font-bold uppercase tracking-widest">Effective Version 2026.04</p>
                       </CardHeader>
                       <CardContent className="p-8 space-y-4 font-sans leading-relaxed text-muted-foreground">
                          <p>
                             The Constitution of the Nashik District Cricket Association serves as the foundational legal document outlining the framework for administration, membership, and conduct of the game.
                          </p>
                          <ul className="space-y-2">
                             <li className="flex gap-3"><CheckIcon className="text-primary flex-shrink-0" /> Article I: Name and Objectives</li>
                             <li className="flex gap-3"><CheckIcon className="text-primary flex-shrink-0" /> Article IV: Membership Categories & Voting Rights</li>
                             <li className="flex gap-3"><CheckIcon className="text-primary flex-shrink-0" /> Article IX: Managing Committee Powers</li>
                             <li className="flex gap-3"><CheckIcon className="text-primary flex-shrink-0" /> Article XII: Disciplinary Procedures</li>
                          </ul>
                       </CardContent>
                    </Card>
                 </div>
                 <div className="space-y-6">
                    <div className="p-8 rounded-2xl bg-primary text-primary-foreground flex flex-col items-center text-center">
                        <Download size={48} className="mb-4 opacity-50" />
                        <h4 className="font-display font-black uppercase text-xl mb-2">Full PDF Access</h4>
                        <p className="text-xs font-bold opacity-70 mb-6 uppercase tracking-widest">Official Signed Copy (42 Pages)</p>
                        <Button className="w-full bg-white text-primary hover:bg-white/90 font-black uppercase text-[10px] tracking-widest">Download Now</Button>
                    </div>
                    <div className="p-6 rounded-2xl border border-dashed border-border flex items-start gap-4">
                        <HelpCircle size={24} className="text-primary" />
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-widest text-foreground">Need Clarification?</p>
                           <p className="text-xs text-muted-foreground mt-1">Contact our legal cell for interpretations regarding bylaws.</p>
                        </div>
                    </div>
                 </div>
              </div>
            </TabsContent>

            <TabsContent value="elections" className="animate-fade-up">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-6 text-foreground font-sans">
                     <h3 className="text-3xl font-display font-black uppercase tracking-tight">Democratic Governance</h3>
                     <p className="text-muted-foreground">NDCA holds elections every 4 years to select the Managing Committee. The process is conducted as per the guidelines laid by the Charity Commissioner and the Maharashtra Cricket Association.</p>
                     
                     <div className="space-y-4">
                        <div className="p-4 rounded-xl border border-border bg-background">
                           <p className="text-[10px] font-black uppercase text-primary mb-1">Last Election Date</p>
                           <p className="text-sm font-bold">September 12, 2024</p>
                        </div>
                        <div className="p-4 rounded-xl border border-border bg-background">
                           <p className="text-[10px] font-black uppercase text-primary mb-1">Next Expected Election</p>
                           <p className="text-sm font-bold">Aug - Sept 2028</p>
                        </div>
                     </div>
                  </div>
                  <div className="bg-muted p-8 rounded-3xl space-y-6">
                     <p className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF]">Observer Credentials</p>
                     <ul className="space-y-6">
                        {[
                          { title: "Voter List Verification", desc: "Clubs must be active for at least 2 consecutive years to gain voting rights." },
                          { title: "Nomination Process", desc: "Nominations must be seconded and submitted 30 days prior to polling." }
                        ].map((item) => (
                          <li key={item.title} className="flex gap-4">
                             <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0"><Scale size={18}/></div>
                             <div>
                                <p className="text-sm font-black uppercase text-foreground">{item.title}</p>
                                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                             </div>
                          </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </TabsContent>

            <TabsContent value="rules" className="animate-fade-up">
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: "Multi-Day Format", body: "Traditional white uniform, 90 overs per day, red ball protocol." },
                    { title: "One-Day League", body: "Colored clothing, 40/50 over formats as per ICC playing conditions." },
                    { title: "T20 Championship", body: "Explosive format rules, specialized powerplay & substitution laws." },
                    { title: "U-14/16 Specials", body: "Batting over limits, maximum bowling spells to prevent injury." },
                    { title: "Club Transfers", body: "Guidelines for players moving between affiliated clubs during window." },
                    { title: "Tournament Code", body: "Strict anti-corruption and code of conduct for all participants." },
                  ].map((rule) => (
                    <Card key={rule.title} className="border-border hover:border-primary transition-all group p-6">
                       <CardTitle className="text-lg font-display font-black uppercase mb-4 group-hover:text-primary transition-colors">{rule.title}</CardTitle>
                       <p className="text-sm text-muted-foreground leading-relaxed">{rule.body}</p>
                       <Button variant="link" className="p-0 text-[10px] font-black uppercase tracking-widest text-primary mt-6">View Specifics â†’</Button>
                    </Card>
                  ))}
               </div>
            </TabsContent>

            <TabsContent value="reports" className="animate-fade-up">
               <div className="max-w-4xl mx-auto py-12">
                  <div className="space-y-4">
                     {docs.map((doc) => (
                       <div key={doc.title} className="flex flex-col md:flex-row items-center justify-between p-8 rounded-3xl bg-[#111827] border border-[#1F2937] hover:border-primary/40 transition-all group gap-6">
                          <div className="flex items-center gap-6 w-full md:w-auto">
                             <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                <FileText size={28} />
                             </div>
                             <div>
                                <p className="text-lg font-display font-black uppercase text-white tracking-tight">{doc.title}</p>
                                <p className="text-[10px] font-black text-muted-foreground mt-1 uppercase tracking-widest">Released: {doc.date} · {doc.size}</p>
                             </div>
                          </div>
                          <Button className="w-full md:w-auto h-14 px-8 bg-transparent border-[#1F2937] border text-white hover:bg-primary hover:border-primary hover:text-white font-black uppercase text-[10px] tracking-[0.2em] gap-3 rounded-2xl transition-all">
                             <Download size={16} />
                             Download PDF
                          </Button>
                       </div>
                     ))}
                  </div>
               </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </PublicLayout>
  );
};

const CheckIcon = ({ className }: { className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 6 9 17l-5-5"/></svg>
);

export default Information;
