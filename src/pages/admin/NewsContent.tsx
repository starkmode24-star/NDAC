import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Newspaper, Plus, Search, Edit2, Trash2, Calendar, Share2, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { newsApi } from "@/lib/api";
import { AddNewsDialog } from "@/components/admin/AddNewsDialog";
import { toast } from "sonner";

const NewsContent = () => {
  const queryClient = useQueryClient();
  const { data: newsItems, isLoading } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const resp = await newsApi.getAll();
      return resp.data;
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => newsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
      toast.success("Article deleted.");
    }
  });

  if (isLoading) return <AdminLayout>Loading Articles...</AdminLayout>;

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-display font-black uppercase tracking-tight text-white">News & Content</h1>
          <p className="text-[#9CA3AF] text-sm font-bold uppercase tracking-widest mt-1">
            Publish announcements, articles and league updates.
          </p>
        </div>
        <AddNewsDialog />
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* News List */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF] group-focus-within:text-[#FACC15] transition-colors" />
              <Input 
                placeholder="Search articles..." 
                className="bg-[#111827] border-[#1F2937] pl-12 h-12 text-white placeholder:text-[#9CA3AF]/40 rounded-xl"
              />
            </div>
            <Button variant="outline" className="h-12 border-[#1F2937] text-[#9CA3AF] font-black uppercase text-[10px]">Filter</Button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {newsItems?.map((item: any) => (
              <Card key={item.id} className="bg-[#111827] border-[#1F2937] hover:border-[#FACC15]/30 transition-all group overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-64 h-48 md:h-auto overflow-hidden relative">
                    <img 
                      src={item.imageUrl || "https://placehold.co/600x400?text=No+Image"} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[#0B1220]/80 backdrop-blur-md border border-white/10 text-[9px] font-black uppercase text-[#FACC15]">{item.category || "General"}</Badge>
                    </div>
                  </div>
                  <CardContent className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-display font-black uppercase text-white leading-tight group-hover:text-[#FACC15] transition-colors">{item.title}</h3>
                      </div>
                      <div className="flex items-center gap-4 text-[10px] text-[#9CA3AF] font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><Calendar size={12} className="text-[#FACC15]" /> {new Date(item.publishedAt).toLocaleDateString()}</span>
                        <span>By Admin</span>
                      </div>
                      <p className="mt-4 text-xs text-gray-400 line-clamp-2 font-sans">{item.content}</p>
                    </div>
                    <div className="mt-6 flex justify-between items-center">
                      <Badge className="uppercase text-[9px] font-black tracking-widest border-0 bg-emerald-500/10 text-emerald-400">
                        Published
                      </Badge>
                      <div className="flex items-center gap-2">
                        <Button 
                          onClick={() => deleteMutation.mutate(item.id)}
                          variant="ghost" size="sm" className="h-8 px-3 text-[10px] font-black uppercase text-[#9CA3AF] hover:text-[#EF4444] hover:bg-[#EF4444]/10">
                          <Trash2 size={14} className="mr-2" /> Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="xl:w-80 space-y-6">
          <Card className="bg-[#111827] border-[#1F2937]">
            <CardHeader>
              <CardTitle className="text-sm font-black uppercase tracking-widest text-white">Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {['Announcements', 'Live Scores', 'Match Reports', 'Events', 'Ground Updates'].map((cat) => (
                <button key={cat} className="w-full flex justify-between items-center p-3 rounded-lg border border-[#1F2937] hover:border-[#FACC15]/30 hover:bg-[#FACC15]/5 transition-all text-left">
                  <span className="text-xs font-bold text-gray-300">{cat}</span>
                  <Badge className="bg-[#1F2937] text-[#9CA3AF] text-[9px] font-black">12</Badge>
                </button>
              ))}
              <Button variant="ghost" className="w-full text-[10px] font-black uppercase tracking-widest text-[#FACC15] mt-2">Manage Categories</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewsContent;
