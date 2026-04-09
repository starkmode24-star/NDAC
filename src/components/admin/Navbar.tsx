import { Search, Bell, Menu, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="sticky top-0 h-20 border-b border-[#1F2937] bg-[#0B1220]/80 backdrop-blur-xl z-40 px-8 flex items-center justify-between">
      <div className="flex items-center gap-6 flex-1">
        <button className="lg:hidden p-2 text-[#9CA3AF] hover:text-white">
          <Menu size={24} />
        </button>
        <div className="relative group w-full max-w-md hidden md:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF] group-focus-within:text-[#FACC15] transition-colors" />
          <input 
            type="text" 
            placeholder="Search players, matches, or clubs..."
            className="w-full bg-[#111827] border border-[#1F2937] rounded-xl py-2.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#FACC15]/50 transition-all font-sans placeholder:text-[#9CA3AF]/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Live Match Indicator */}
        <div className="hidden xl:flex items-center gap-3 bg-[#EF4444]/10 px-4 py-2 rounded-full border border-[#EF4444]/20 animate-pulse-live">
          <div className="w-2 h-2 bg-[#EF4444] rounded-full" />
          <span className="text-[10px] font-black uppercase tracking-widest text-[#EF4444]">Live Match: Nashik vs Pune</span>
        </div>

        <button className="relative p-2 text-[#9CA3AF] hover:text-white transition-all group">
          <Bell size={22} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#EF4444] rounded-full border-2 border-[#0B1220]" />
          <div className="absolute top-full right-0 mt-2 w-64 bg-[#111827] border border-[#1F2937] rounded-xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-2xl">
            <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-2 border-b border-[#1F2937] pb-2">Recent Notifications</p>
            <p className="text-xs text-white">New player registration: Rahul Dravid</p>
          </div>
        </button>

        <div className="flex items-center gap-4 pl-6 border-l border-[#1F2937]">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-black uppercase tracking-widest text-white leading-none">Super Admin</p>
            <p className="text-[10px] text-[#FACC15] font-bold mt-1">Verified Account</p>
          </div>
          <Avatar className="h-10 w-10 border border-[#FACC15]/30 p-0.5">
            <AvatarImage src="" />
            <AvatarFallback className="bg-[#111827] text-[#FACC15] text-xs font-bold font-sans">AD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
