import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#0B1220] text-white selection:bg-[#FACC15] selection:text-[#0B1220]">
      {/* Sidebar background layer */}
      <Sidebar />
      
      <div className="pl-64 flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1 p-8 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FACC15]/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FACC15]/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative z-10 animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
