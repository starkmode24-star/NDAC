import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Image as ImageIcon, Plus, Trash2, Eye, Calendar, Tag, MoreHorizontal } from "lucide-react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { galleryApi } from "@/lib/api";
import { AddMediaDialog } from "@/components/admin/AddMediaDialog";
import { toast } from "sonner";

const GalleryAdmin = () => {
  const queryClient = useQueryClient();
  const { data: mediaItems, isLoading } = useQuery({
    queryKey: ['gallery'],
    queryFn: async () => {
      const resp = await galleryApi.getAll();
      return resp.data;
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => galleryApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      toast.success("Media deleted.");
    }
  });

  if (isLoading) return <AdminLayout>Loading Media...</AdminLayout>;

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-display font-black uppercase tracking-tight text-white">Media Gallery</h1>
          <p className="text-[#9CA3AF] text-sm font-bold uppercase tracking-widest mt-1">
            Manage association media assets and event photographs.
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="h-12 border-[#1F2937] text-[#9CA3AF] font-black uppercase text-[10px]">Manage Folders</Button>
          <AddMediaDialog />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mediaItems?.map((img: any) => (
          <Card key={img.id} className="bg-[#111827] border-[#1F2937] overflow-hidden group hover:border-[#FACC15]/40 transition-all duration-500">
            <CardContent className="p-0">
              <div className="aspect-square relative overflow-hidden bg-black/40">
                {img.type === 'VIDEO' ? (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-[#EF4444]/20 flex items-center justify-center text-[#EF4444]">
                        <ImageIcon size={24} />
                    </div>
                    <span className="text-[10px] font-black text-white/40 uppercase">YouTube Content</span>
                  </div>
                ) : (
                  <img 
                    src={img.url} 
                    alt={img.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                )}
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <a href={img.url} target="_blank" rel="noreferrer">
                    <Button size="icon" className="h-10 w-10 bg-white/10 hover:bg-[#FACC15] hover:text-[#0B1220] backdrop-blur-md rounded-full border border-white/20 transition-all scale-75 group-hover:scale-100 duration-300">
                      <Eye size={18} />
                    </Button>
                  </a>
                  <Button 
                    onClick={() => deleteMutation.mutate(img.id)}
                    size="icon" className="h-10 w-10 bg-white/10 hover:bg-[#EF4444] text-white backdrop-blur-md rounded-full border border-white/20 transition-all scale-75 group-hover:scale-100 duration-300 delay-75">
                    <Trash2 size={18} />
                  </Button>
                </div>

                <div className="absolute top-4 left-4">
                  <Badge className="bg-[#0B1220]/80 backdrop-blur-md border border-white/10 text-[8px] font-black uppercase text-[#FACC15]">
                    {img.category || img.type}
                  </Badge>
                </div>
              </div>
              <div className="p-4 bg-[#111827]">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-sm font-bold text-white uppercase tracking-tight truncate">{img.title}</h3>
                </div>
                <div className="flex items-center gap-3 text-[9px] text-[#9CA3AF] font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Calendar size={10} className="text-[#FACC15]" /> {new Date(img.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {/* Empty Upload Square */}
        <button className="aspect-square rounded-2xl border-2 border-dashed border-[#1F2937] flex flex-col items-center justify-center gap-4 text-[#9CA3AF] hover:border-[#FACC15]/50 hover:bg-[#FACC15]/5 hover:text-[#FACC15] transition-all group">
          <div className="w-16 h-16 rounded-full bg-[#111827] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Plus size={32} />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em]">Add New Image</p>
        </button>
      </div>
    </AdminLayout>
  );
};

export default GalleryAdmin;
