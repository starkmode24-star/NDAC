import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { eventApi } from "@/lib/api";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const AddEventDialog = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    venue: "",
    type: "Meeting",
  });

  const mutation = useMutation({
    mutationFn: (data: any) => eventApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      setOpen(false);
      toast.success("Event created successfully");
      setFormData({ title: "", date: "", time: "", venue: "", type: "Meeting" });
    },
    onError: () => toast.error("Failed to create event"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0B1220] font-black uppercase tracking-widest text-xs px-6 h-12 rounded-xl">
          <Plus size={18} className="mr-2" />
          Create New Event
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#0B1220] border-[#1F2937] text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display font-black uppercase tracking-tight">Create Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-[#9CA3AF]">Event Title</label>
            <Input
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-[#111827] border-[#1F2937]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-[#9CA3AF]">Date</label>
              <Input
                required
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="bg-[#111827] border-[#1F2937]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-[#9CA3AF]">Time</label>
              <Input
                required
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="bg-[#111827] border-[#1F2937]"
              />
            </div>
          </div>
          <div className="space-y-2">
             <label className="text-xs font-black uppercase tracking-widest text-[#9CA3AF]">Type</label>
             <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
                <SelectTrigger className="bg-[#111827] border-[#1F2937] text-white">
                   <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-[#111827] border-[#1F2937] text-white">
                   <SelectItem value="Meeting">Meeting</SelectItem>
                   <SelectItem value="Ceremony">Ceremony</SelectItem>
                   <SelectItem value="Trial">Trial / Clinic</SelectItem>
                   <SelectItem value="Training">Training</SelectItem>
                   <SelectItem value="Press">Press</SelectItem>
                </SelectContent>
             </Select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-[#9CA3AF]">Venue</label>
            <Input
              required
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              className="bg-[#111827] border-[#1F2937]"
            />
          </div>
          <Button 
            type="submit" 
            disabled={mutation.isPending}
            className="w-full bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0B1220] font-black uppercase tracking-widest h-12"
          >
            {mutation.isPending ? "Creating..." : "Save Event"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
