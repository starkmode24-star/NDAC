import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { galleryApi } from "@/lib/api";
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

export function AddMediaDialog() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: any) => galleryApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      setOpen(false);
      toast.success("Media added to gallery!");
    },
    onError: () => {
      toast.error("Failed to add media.");
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
          Upload Media
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#111827] border-[#1F2937] text-white">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-black uppercase tracking-tight">Add Media Asset</DialogTitle>
            <DialogDescription className="text-[#9CA3AF]">
              Upload a new image URL or YouTube video link to the gallery.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-xs font-bold uppercase">Asset Title</Label>
              <Input id="title" name="title" placeholder="e.g., U-16 District Finals" required className="bg-[#0B1220] border-[#1F2937]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type" className="text-xs font-bold uppercase">Media Type</Label>
                <Select name="type" defaultValue="IMAGE">
                  <SelectTrigger className="bg-[#0B1220] border-[#1F2937]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111827] border-[#1F2937] text-white">
                    <SelectItem value="IMAGE">Image</SelectItem>
                    <SelectItem value="VIDEO">YouTube Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-xs font-bold uppercase">Category</Label>
                <Input id="category" name="category" placeholder="Matches, Camp..." className="bg-[#0B1220] border-[#1F2937]" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="url" className="text-xs font-bold uppercase">Media URL</Label>
              <Input id="url" name="url" placeholder="Direct link to image or YT video" required className="bg-[#0B1220] border-[#1F2937]" />
            </div>
          </div>
          <DialogFooter>
            <Button 
                type="submit" 
                disabled={mutation.isPending}
                className="w-full bg-[#FACC15] text-[#0B1220] font-black uppercase tracking-widest"
            >
              {mutation.isPending ? "Adding..." : "Confirm Upload"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
