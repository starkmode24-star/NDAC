import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newsApi } from "@/lib/api";
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export function AddNewsDialog() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: any) => newsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      setOpen(false);
      toast.success("Article published successfully!");
    },
    onError: () => {
      toast.error("Failed to publish article.");
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
          Create News Piece
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-[#111827] border-[#1F2937] text-white">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-black uppercase tracking-tight">Post New Article</DialogTitle>
            <DialogDescription className="text-[#9CA3AF]">
              Publish a new announcement, match report, or district update.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-xs font-bold uppercase">Article Headline</Label>
              <Input id="title" name="title" placeholder="e.g., Nashik Lions win T20 Championship" required className="bg-[#0B1220] border-[#1F2937]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-xs font-bold uppercase">Category</Label>
                <Input id="category" name="category" placeholder="Announcement, Match Report..." className="bg-[#0B1220] border-[#1F2937]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl" className="text-xs font-bold uppercase">Cover Image URL</Label>
                <Input id="imageUrl" name="imageUrl" placeholder="HTTPS image link" className="bg-[#0B1220] border-[#1F2937]" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="content" className="text-xs font-bold uppercase">Content (Rich Text / Markdown)</Label>
              <Textarea id="content" name="content" placeholder="Full article content goes here..." required className="bg-[#0B1220] border-[#1F2937] min-h-[200px]" />
            </div>
          </div>
          <DialogFooter>
            <Button 
                type="submit" 
                disabled={mutation.isPending}
                className="w-full bg-[#FACC15] text-[#0B1220] font-black uppercase tracking-widest"
            >
              {mutation.isPending ? "Publishing..." : "Launch Article"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
