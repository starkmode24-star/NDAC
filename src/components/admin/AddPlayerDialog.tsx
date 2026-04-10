import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { playerApi, clubApi } from "@/lib/api";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export function AddPlayerDialog() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  // Fetch clubs for the dropdown
  const { data: clubs } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const resp = await clubApi.getAll();
      return resp.data;
    },
  });

  const mutation = useMutation({
    mutationFn: (data: any) => playerApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
      setOpen(false);
      toast.success("Player registered successfully!");
    },
    onError: () => {
      toast.error("Failed to register player.");
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
          Add New Player
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#111827] border-[#1F2937] text-white">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-black uppercase tracking-tight">Register Player</DialogTitle>
            <DialogDescription className="text-[#9CA3AF]">
              Fill in the details to add a new player to the database.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-xs font-bold uppercase">First Name</Label>
                <Input id="firstName" name="firstName" required className="bg-[#0B1220] border-[#1F2937]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-xs font-bold uppercase">Last Name</Label>
                <Input id="lastName" name="lastName" required className="bg-[#0B1220] border-[#1F2937]" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-bold uppercase">Email Address</Label>
              <Input id="email" name="email" type="email" required className="bg-[#0B1220] border-[#1F2937]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aadhaar" className="text-xs font-bold uppercase">Aadhaar Number</Label>
              <Input id="aadhaar" name="aadhaar" required className="bg-[#0B1220] border-[#1F2937]" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase">Registered Club</Label>
              <Select name="clubId" required>
                <SelectTrigger className="bg-[#0B1220] border-[#1F2937]">
                  <SelectValue placeholder="Select a club" />
                </SelectTrigger>
                <SelectContent className="bg-[#111827] border-[#1F2937] text-white">
                  {clubs?.map((club: any) => (
                    <SelectItem key={club.id} value={club.id}>{club.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="specialty" className="text-xs font-bold uppercase">Specialty</Label>
                <Select name="specialty">
                  <SelectTrigger className="bg-[#0B1220] border-[#1F2937]">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111827] border-[#1F2937] text-white">
                    <SelectItem value="BATSMAN">Batsman</SelectItem>
                    <SelectItem value="BOWLER">Bowler</SelectItem>
                    <SelectItem value="ALL_ROUNDER">All Rounder</SelectItem>
                    <SelectItem value="WK_BATSMAN">WK Batsman</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob" className="text-xs font-bold uppercase">DOB</Label>
                <Input id="dob" name="dob" type="date" required className="bg-[#0B1220] border-[#1F2937]" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
                type="submit" 
                disabled={mutation.isPending}
                className="w-full bg-[#FACC15] text-[#0B1220] font-black uppercase tracking-widest"
            >
              {mutation.isPending ? "Processing..." : "Confirm Registration"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
