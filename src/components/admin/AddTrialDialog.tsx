import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { trialApi } from "@/lib/api";
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

export function AddTrialDialog() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: any) => trialApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trials"] });
      setOpen(false);
      toast.success("Selection trial created successfully!");
    },
    onError: () => {
      toast.error("Failed to create trial.");
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
          Create Trial Session
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#111827] border-[#1F2937] text-white">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-black uppercase tracking-tight">Schedule Selection Trial</DialogTitle>
            <DialogDescription className="text-[#9CA3AF]">
              Create a new talent identification program or district trial.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-xs font-bold uppercase">Trial Title</Label>
              <Input id="title" name="title" placeholder="e.g., U-16 District Selection" required className="bg-[#0B1220] border-[#1F2937]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ageGroup" className="text-xs font-bold uppercase">Age Group</Label>
              <Input id="ageGroup" name="ageGroup" placeholder="e.g., U-16, Senior" required className="bg-[#0B1220] border-[#1F2937]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-xs font-bold uppercase">Date</Label>
                <Input id="date" name="date" type="date" required className="bg-[#0B1220] border-[#1F2937]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="venue" className="text-xs font-bold uppercase">Venue</Label>
                <Input id="venue" name="venue" placeholder="Ground name" required className="bg-[#0B1220] border-[#1F2937]" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
                type="submit" 
                disabled={mutation.isPending}
                className="w-full bg-[#FACC15] text-[#0B1220] font-black uppercase tracking-widest"
            >
              {mutation.isPending ? "Scheduling..." : "Create Session"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
