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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Settings, Trash2 } from "lucide-react";

export function ManageClubDialog({ club }: { club: any }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(club.status || "ACTIVE");
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (data: any) => clubApi.update(club.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clubs"] });
      setOpen(false);
      toast.success("Club updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update club.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => clubApi.delete(club.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clubs"] });
      setOpen(false);
      toast.success("Club deleted successfully!");
    },
    onError: () => {
      toast.error("Failed to delete club. It might have associated players or matches.");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    updateMutation.mutate({ ...data, status });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-[#1F2937] bg-transparent text-[#9CA3AF] hover:text-white hover:bg-white/5 uppercase text-[10px] font-black tracking-widest h-8">
          <Settings size={14} className="mr-1.5" />
          Manage Academy
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#111827] border-[#1F2937] text-white">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-black uppercase tracking-tight">Manage {club.name}</DialogTitle>
            <DialogDescription className="text-[#9CA3AF]">
              Update details or manage the status of this academy.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-bold uppercase">Club Name</Label>
              <Input id="name" name="name" defaultValue={club.name} required className="bg-[#0B1220] border-[#1F2937]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="text-xs font-bold uppercase">Location / Area</Label>
              <Input id="location" name="location" defaultValue={club.location} className="bg-[#0B1220] border-[#1F2937]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status" className="text-xs font-bold uppercase">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="bg-[#0B1220] border-[#1F2937]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-[#111827] border-[#1F2937] text-white">
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="SUSPENDED">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="flex sm:justify-between items-center sm:items-center">
            <Button 
                type="button" 
                variant="destructive"
                onClick={() => {
                  if (confirm("Are you sure you want to delete this club? This action cannot be undone.")) {
                    deleteMutation.mutate();
                  }
                }}
                disabled={deleteMutation.isPending || updateMutation.isPending}
                className="bg-red-500/10 text-red-500 hover:bg-red-500/20 font-black uppercase tracking-widest text-xs h-10 px-4"
            >
              <Trash2 size={16} className="mr-2" />
              Delete Club
            </Button>
            <Button 
                type="submit" 
                disabled={updateMutation.isPending || deleteMutation.isPending}
                className="bg-[#FACC15] text-[#0B1220] font-black uppercase tracking-widest text-xs h-10 px-6"
            >
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
