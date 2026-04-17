import { useState, useEffect } from 'react';
import { socket } from '@/lib/socket';
import { Bell, X, Zap, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

export const SystemAlertOverlay = () => {
  const [alert, setAlert] = useState<{ title: string; message: string; timestamp: Date } | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    socket.on('systemAlert', (data) => {
      setAlert({
        title: data.title,
        message: data.message,
        timestamp: new Date(data.timestamp)
      });
      setIsVisible(true);
      
      // Auto-hide after 15 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 15000);
    });

    return () => {
      socket.off('systemAlert');
    };
  }, []);

  if (!alert) return null;

  return (
    <div 
      className={cn(
        "fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-2xl px-4 transition-all duration-700 ease-out",
        isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-20 opacity-0 scale-95 pointer-events-none"
      )}
    >
      <div className="bg-[#0B1220] border-2 border-primary/30 rounded-[2.5rem] shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row">
        {/* Visual Pulse Side */}
        <div className="w-full md:w-32 bg-primary flex items-center justify-center p-6 md:p-0 relative overflow-hidden">
           <div className="absolute inset-0 bg-white/20 animate-pulse" />
           <Zap className="text-[#0B1220] relative z-10" size={40} />
        </div>

        {/* Content Side */}
        <div className="flex-1 p-8 relative">
           <button 
             onClick={() => setIsVisible(false)}
             className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
           >
              <X size={20} />
           </button>

           <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Live Broadcast</span>
              </div>

              <div>
                 <h3 className="text-2xl font-display font-black uppercase text-white italic leading-tight">{alert.title}</h3>
                 <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mt-2 leading-relaxed">
                   {alert.message}
                 </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                 <p className="text-[8px] font-black uppercase text-gray-600 tracking-widest">
                   Sent {alert.timestamp.toLocaleTimeString()}
                 </p>
                 <Button variant="link" className="text-primary p-0 h-auto font-black uppercase text-[10px] tracking-widest group">
                    Check Details <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                 </Button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
