import PublicLayout from "@/components/PublicLayout";
import { Users, History, Trophy, Award, Building2 } from "lucide-react";

const committeeMembers = [
  { name: "Shri Dhanpal Mane", role: "President", club: "MCC" },
  { name: "Shri Santosh Mane", role: "Secretary", club: "NDCA" },
  { name: "Shri Rajesh Patil", role: "Joint Secretary", club: "Lions CC" },
  { name: "Shri Vinayak Deshmukh", role: "Treasurer", club: "Eagles" },
  { name: "Shri Amit Kulkarni", role: "Committee Member", club: "Warriors" },
  { name: "Shri Sagar Pawar", role: "Committee Member", club: "Strikers" },
];

const AboutUs = () => {
  return (
    <PublicLayout>
      {/* Hero Header */}
      <section className="relative py-24 bg-[#0B1220] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#FACC15]/20 to-transparent" />
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1540749303346-5b4fa416326c?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        </div>
        
        <div className="container relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter mb-4 animate-fade-down">
            About <span className="text-[#FACC15]">NDCA</span>
          </h1>
          <p className="max-w-2xl mx-auto text-[#9CA3AF] text-lg font-medium leading-relaxed font-sans">
            Guiding the spirit of cricket in Nashik since decades. Our mission is to nurture talent and uphold the integrity of the game.
          </p>
        </div>
      </section>

      {/* Association History */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                <History size={14} />
                Our Legacy
              </div>
              <h2 className="text-4xl font-display font-black text-foreground uppercase tracking-tight">
                A Journey of <span className="text-primary italic">Excellence</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed font-sans">
                <p>
                  The Nashik District Cricket Association (NDCA) was established with a vision to streamline cricket administration and provide a professional platform for local players. Over the years, we have grown from a small group of enthusiasts to a premier district body under the Maharashtra Cricket Association (MCA).
                </p>
                <p>
                  Our history is marked by the development of iconic infrastructure, including the state-of-the-art NDCA Stadium, and the success of players who have represented the district at state and national levels.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
                {[
                  { label: "Founded", value: "1972" },
                  { label: "Clubs", value: "140+" },
                  { label: "Success Rate", value: "85%" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-display font-black text-foreground">{stat.value}</p>
                    <p className="text-[10px] uppercase font-black tracking-widest text-[#9CA3AF]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/20 rounded-2xl blur-2xl group-hover:bg-primary/30 transition-all duration-500" />
              <img 
                src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80" 
                alt="Association History" 
                className="relative rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-6 -right-6 p-6 glass-strong rounded-2xl border border-border shadow-xl hidden md:block">
                 <Building2 className="text-primary mb-2" size={32} />
                 <p className="text-sm font-black uppercase tracking-widest">NDCA Head Quarters</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Committee Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
              <Users size={14} />
              Leadership
            </div>
            <h2 className="text-4xl font-display font-black text-foreground uppercase tracking-tight">Executive Committee</h2>
            <p className="max-w-xl mx-auto text-muted-foreground text-sm font-sans">
              The dedicated team driving the strategic development of cricket across Nashik district.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {committeeMembers.map((member, i) => (
              <div 
                key={member.name}
                className="group p-8 rounded-2xl bg-background border border-border hover:border-primary/50 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full group-hover:bg-primary/10 transition-colors" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                      <Award size={24} />
                  </div>
                  <h3 className="text-xl font-display font-black text-foreground uppercase group-hover:text-primary transition-colors">{member.name}</h3>
                  <p className="text-xs font-black uppercase tracking-wider text-primary mt-1">{member.role}</p>
                  <p className="text-[10px] font-bold uppercase text-[#9CA3AF] mt-4 flex items-center gap-2">
                    <Building2 size={12} />
                    Representative: {member.club}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default AboutUs;
