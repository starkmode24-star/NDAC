import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clubApi } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export function AddClubDialog() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: any) => clubApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clubs"] });
      setOpen(false);
      toast.success("Club registered successfully!");
    },
    onError: () => {
      toast.error("Failed to register club.");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0B1220] font-black uppercase tracking-widest text-xs px-6 h-12 rounded-xl shadow-[0_0_20px_rgba(250,204,21,0.2)] group">
          <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform" />
          Register New Club
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#111827] border-[#1F2937] text-white">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-black uppercase tracking-tight">Register New Club</DialogTitle>
            <DialogDescription className="text-[#9CA3AF]">
              Add a new cricket club or academy to the association.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-bold uppercase">Club Name</Label>
              <Input id="name" name="name" placeholder="e.g., Nashik Lions CC" required className="bg-[#0B1220] border-[#1F2937]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="text-xs font-bold uppercase">Location / Area</Label>
              <Input id="location" name="location" placeholder="e.g., Nashik City" required className="bg-[#0B1220] border-[#1F2937]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminEmail" className="text-xs font-bold uppercase">Admin Email (Login)</Label>
              <Input id="adminEmail" name="adminEmail" type="email" placeholder="admin@club.com" required className="bg-[#0B1220] border-[#1F2937]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminPassword" className="text-xs font-bold uppercase">Admin Password</Label>
              <Input id="adminPassword" name="adminPassword" type="password" required className="bg-[#0B1220] border-[#1F2937]" />
            </div>
          </div>
          <DialogFooter>
            <Button 
                type="submit" 
                disabled={mutation.isPending}
                className="w-full bg-[#FACC15] text-[#0B1220] font-black uppercase tracking-widest"
            >
              {mutation.isPending ? "Registering..." : "Confirm Club Registration"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
