import PublicLayout from "@/components/PublicLayout";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, History, Target, ShieldCheck } from "lucide-react";

const champions = [
  { 
    year: "2024-25", 
    league: "NDCA District A-Division", 
    winner: "Samata Cricket Club", 
    runnerUp: "Golf Club Juniors", 
    mvp: "Rahul Deshmukh",
    stats: "Winner by 42 Runs",
    color: "from-amber-400 to-amber-600"
  },
  { 
    year: "2024", 
    league: "Nashik Premier League (NPL)", 
    winner: "Nashik Titans", 
    runnerUp: "Panchavati Warriors", 
    mvp: "Amit Shinde",
    stats: "Titans won by 4 wickets",
    color: "from-blue-400 to-blue-600"
  },
  { 
    year: "2023-24", 
    league: "District B-Division", 
    winner: "Yash Cricket Academy", 
    runnerUp: "Deolali Spartans", 
    mvp: "Sanket Patil",
    stats: "Clinched by NRR (+1.24)",
    color: "from-emerald-400 to-emerald-600"
  },
  { 
    year: "2023", 
    league: "U-19 District Selection League", 
    winner: "North Nashik Zone", 
    runnerUp: "Sinnar Strikers", 
    mvp: "Vivek More",
    stats: "Won by innings and 12 runs",
    color: "from-purple-400 to-purple-600"
  },
];

const ChampionsPage = () => {
  return (
    <PublicLayout>
      <section className="py-24 bg-[#0B1220] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[150px] -z-10 rounded-full" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 blur-[100px] -z-10 rounded-full" />
        
        <div className="container">
          <div className="flex flex-col items-center text-center space-y-6 mb-20">
             <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center text-[#0B1220] shadow-[0_0_50px_rgba(250,204,21,0.3)] rotate-3">
                <Trophy size={40} />
             </div>
             <h1 className="text-6xl md:text-9xl font-display font-black uppercase tracking-tighter leading-none italic">
               The <span className="text-primary tracking-normal">Champions</span>
             </h1>
             <p className="max-w-2xl text-gray-400 text-lg font-bold uppercase tracking-widest leading-relaxed">
               Honoring the clubs and athletes who have written their names in Nashik's cricket history.
             </p>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {champions.map((champ, i) => (
              <div 
                key={`${champ.year}-${champ.league}`}
                className="relative group flex flex-col lg:flex-row items-stretch rounded-[3rem] overflow-hidden bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-700 hover:shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
              >
                 {/* Year Section */}
                 <div className={`lg:w-64 p-12 flex flex-col justify-center items-center text-center bg-gradient-to-br ${champ.color} group-hover:scale-110 transition-transform duration-700`}>
                    <History size={32} className="mb-4 text-white/50" />
                    <p className="text-white/70 font-black uppercase text-[10px] tracking-widest mb-1">Season</p>
                    <h3 className="text-4xl font-display font-black text-white italic">{champ.year}</h3>
                 </div>

                 {/* Content Section */}
                 <div className="flex-1 p-12 md:p-16 flex flex-col md:flex-row justify-between gap-12">
                    <div className="space-y-6">
                       <div>
                          <p className="text-primary font-black uppercase text-[10px] tracking-[0.3em] mb-2">{champ.league}</p>
                          <h2 className="text-4xl md:text-5xl font-display font-black uppercase italic tracking-tight">{champ.winner}</h2>
                       </div>
                       
                       <div className="flex flex-wrap gap-8 pt-4">
                          <div className="flex flex-col">
                             <span className="text-gray-500 font-black uppercase text-[9px] tracking-widest mb-1">Runner Up</span>
                             <span className="font-bold text-white uppercase text-sm tracking-widest">{champ.runnerUp}</span>
                          </div>
                          <div className="flex flex-col">
                             <span className="text-gray-500 font-black uppercase text-[9px] tracking-widest mb-1">Final Result</span>
                             <span className="font-bold text-white uppercase text-sm tracking-widest italic">{champ.stats}</span>
                          </div>
                       </div>
                    </div>

                    <div className="md:w-64 p-8 rounded-3xl bg-black/40 border border-white/5 flex flex-col justify-center items-center text-center space-y-4">
                       <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
                          <Star size={24} />
                       </div>
                       <div>
                          <p className="text-gray-500 font-black uppercase text-[9px] tracking-widest mb-1">Season MVP</p>
                          <p className="text-xl font-display font-black text-white uppercase tracking-tight italic">{champ.mvp}</p>
                       </div>
                    </div>
                 </div>
              </div>
            ))}
          </div>

          <div className="mt-32 p-16 rounded-[4rem] bg-gradient-to-r from-primary/10 to-transparent border border-white/10 flex flex-col md:flex-row items-center justify-between gap-12">
             <div className="space-y-4">
                <div className="flex items-center gap-3 text-primary">
                   <Target size={32} />
                   <h2 className="text-3xl font-display font-black uppercase italic tracking-tight">Quest for Glory</h2>
                </div>
                <p className="text-gray-400 max-w-xl font-bold uppercase text-sm tracking-widest leading-relaxed">
                   Want to see your club on this list? Registration for the 2025-26 Season is now open for all affiliated district teams.
                </p>
             </div>
             <button className="h-16 px-10 bg-primary text-[#0B1220] rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:brightness-110 transition-all flex items-center gap-4">
                Apply for License <ShieldCheck size={20} />
             </button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default ChampionsPage;
