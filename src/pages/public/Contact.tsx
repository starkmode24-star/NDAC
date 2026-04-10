import PublicLayout from "@/components/PublicLayout";
import { Mail, Phone, MapPin, Send, Globe, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <PublicLayout>
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-12">
               <div>
                  <h1 className="text-5xl md:text-7xl font-display font-black text-foreground uppercase tracking-tighter mb-4 animate-fade-right">
                    Get in <span className="text-primary italic">Touch</span>
                  </h1>
                  <p className="text-muted-foreground text-lg font-medium leading-relaxed font-sans">
                    Have a query regarding registrations, trials, or club affiliation? Our team is here to assist you.
                  </p>
               </div>

               <div className="space-y-8">
                  <div className="flex gap-6 items-start group">
                     <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                        <MapPin size={28} />
                     </div>
                     <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF]">Head Office Address</p>
                        <p className="text-lg font-bold text-foreground font-sans">
                           NDCA Pavilion, Golf Club Ground,<br />
                           Trimbak Road, Nashik - 422002.
                        </p>
                     </div>
                  </div>

                  <div className="flex gap-6 items-start group">
                     <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                        <Phone size={28} />
                     </div>
                     <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF]">Direct Contact</p>
                        <p className="text-lg font-bold text-foreground font-sans">+91 0253 2577788</p>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest italic">Office Hours: 10:00 AM - 06:00 PM</p>
                     </div>
                  </div>

                  <div className="flex gap-6 items-start group">
                     <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                        <Mail size={28} />
                     </div>
                     <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF]">Email Communications</p>
                        <p className="text-lg font-bold text-foreground font-sans underline decoration-primary/30 hover:decoration-primary transition-all underline-offset-4 cursor-pointer">info@ndcanashik.com</p>
                     </div>
                  </div>
               </div>

               <div className="pt-8 border-t border-border flex items-center gap-6">
                  <Globe className="text-primary opacity-50" size={32} />
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-foreground">Digital Presence</p>
                     <div className="flex gap-4 mt-2">
                        {["Facebook", "Instagram", "Twitter", "LinkedIn"].map(s => (
                           <span key={s} className="text-xs font-bold text-[#9CA3AF] hover:text-primary transition-colors cursor-pointer uppercase tracking-widest">{s}</span>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            <div className="relative">
               <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-3xl pointer-events-none" />
               <div className="relative p-10 bg-background border border-border rounded-[2.5rem] shadow-2xl">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <MessageSquare size={20} />
                    </div>
                    <h3 className="text-2xl font-display font-black uppercase tracking-tight text-foreground">Send Message</h3>
                  </div>

                  <form className="space-y-6">
                     <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF] ml-1">Full Name</label>
                           <Input placeholder="Enter your name" className="h-12 bg-muted/30 border-border rounded-xl focus:ring-primary focus:border-primary px-4" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF] ml-1">Email ID</label>
                           <Input type="email" placeholder="example@mail.com" className="h-12 bg-muted/30 border-border rounded-xl px-4" />
                        </div>
                     </div>
                     <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF] ml-1">Enquiry Type</label>
                         <Input placeholder="Registration / Trials / Other" className="h-12 bg-muted/30 border-border rounded-xl px-4" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF] ml-1">Your Message</label>
                        <Textarea placeholder="Type your query in detail..." className="bg-muted/30 border-border rounded-xl min-h-[140px] p-4 font-sans leading-relaxed" />
                     </div>
                     <Button className="w-full h-14 bg-primary hover:brightness-110 text-primary-foreground font-black uppercase tracking-[0.2em] text-xs transition-all shadow-xl shadow-primary/20 rounded-xl group">
                        <Send size={16} className="mr-2 group-hover:translate-x-1 transition-transform" />
                        Shoot Inquiry
                     </Button>
                  </form>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[450px] relative w-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 border-t border-border">
         <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.193266937418!2d73.766324376043!3d19.989895322960533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddec9e7987814b%3A0xe67f920f786c57f6!2sGolf%20Club%20Ground!5e0!3m2!1sen!2sin!4v1712752000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
         ></iframe>
         <div className="absolute inset-0 bg-primary/5 pointer-events-none mix-blend-multiply" />
      </section>
    </PublicLayout>
  );
};

export default Contact;
