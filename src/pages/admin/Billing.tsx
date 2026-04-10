import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  Download, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Receipt,
  Wallet,
  ArrowUpRight,
  FileSearch
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { billingApi } from "@/lib/api";

const Billing = () => {
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data: transactions, isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const response = await billingApi.getAll();
      return response.data;
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: string }) => billingApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      setSelectedReceipt(null);
    }
  });

  if (isLoading) {
    return <AdminLayout><div className="text-white text-center py-20">Loading Transactions...</div></AdminLayout>;
  }

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-display font-black uppercase tracking-tight text-white">Financials & Billing</h1>
          <p className="text-[#9CA3AF] text-sm font-bold uppercase tracking-widest mt-1">
            Track registration fees, trial payments and verify candidate receipts.
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="h-12 border-[#1F2937] text-white font-black uppercase tracking-widest text-[10px] bg-[#111827]">
            <Download size={16} className="mr-2" />
            Financial Report
          </Button>
          <Button className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0B1220] font-black uppercase tracking-widest text-xs px-6 h-12 rounded-xl">
            <PlusIcon size={18} className="mr-2" />
            Manual Entry
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Revenue", value: "₹ 1,45,200", icon: Wallet, color: "text-[#FACC15]", trend: "+12%" },
          { label: "Pending Verification", value: "24", icon: FileSearch, color: "text-blue-400", trend: "High Priority" },
          { label: "Trial Fees Collected", value: "₹ 42,500", icon: Receipt, color: "text-emerald-400", trend: "Apr 2026" },
          { label: "Flagged Issues", value: "03", icon: AlertCircle, color: "text-[#EF4444]", trend: "Immediate Action" },
        ].map((stat, i) => (
          <Card key={stat.label} className="bg-[#111827] border-[#1F2937] animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-[#0B1220] ${stat.color}`}>
                  <stat.icon size={22} />
                </div>
                <Badge className="bg-white/5 border-0 text-[9px] font-black uppercase text-[#9CA3AF]">
                  {stat.trend}
                </Badge>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF]">{stat.label}</p>
              <p className="text-2xl font-display font-black text-white mt-1">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Transaction Table */}
      <Card className="bg-[#111827] border-[#1F2937] overflow-hidden">
        <CardHeader className="border-b border-[#1F2937] bg-[#0B1220]/30 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <CardTitle className="text-lg font-display font-black uppercase text-white">Recent Transactions</CardTitle>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9CA3AF]" />
                <Input placeholder="Search player..." className="bg-[#0B1220] border-[#1F2937] h-9 text-xs pl-9" />
              </div>
              <Button variant="outline" size="icon" className="h-9 w-9 border-[#1F2937] text-[#9CA3AF]"><Filter size={14}/></Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-[#0B1220]/50">
              <TableRow className="border-[#1F2937]">
                <TableHead className="text-[10px] uppercase font-black tracking-widest text-[#9CA3AF]">Payer / Player</TableHead>
                <TableHead className="text-[10px] uppercase font-black tracking-widest text-[#9CA3AF]">Fee Type</TableHead>
                <TableHead className="text-[10px] uppercase font-black tracking-widest text-[#9CA3AF]">Amount</TableHead>
                <TableHead className="text-[10px] uppercase font-black tracking-widest text-[#9CA3AF]">Date</TableHead>
                <TableHead className="text-[10px] uppercase font-black tracking-widest text-[#9CA3AF]">Status</TableHead>
                <TableHead className="text-[10px] uppercase font-black tracking-widest text-[#9CA3AF] text-right">Receipt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions?.map((tx: any) => (
                <TableRow key={tx.id} className="border-[#1F2937] hover:bg-white/[0.02] transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1F2937] flex items-center justify-center text-[10px] font-black text-[#FACC15]">
                        {tx.payerName?.split(' ').map((n: string) => n[0]).join('') || 'NA'}
                      </div>
                      <span className="text-sm font-bold text-white font-sans">{tx.payerName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF]">{tx.type}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-black text-[#FACC15]">₹ {tx.amount.toFixed(2)}</span>
                  </TableCell>
                  <TableCell className="text-xs text-gray-400 font-sans">{new Date(tx.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge className={`uppercase text-[9px] font-black border-0 ${
                      tx.status === 'VERIFIED' ? 'bg-emerald-500/10 text-emerald-400' :
                      tx.status === 'FLAGGED' ? 'bg-[#EF4444]/10 text-[#EF4444]' :
                      'bg-[#FACC15]/10 text-[#FACC15]'
                    }`}>
                      {tx.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      onClick={() => setSelectedReceipt(tx)}
                      className="h-8 group hover:bg-[#FACC15]/10 hover:text-[#FACC15] text-[#9CA3AF] rounded-lg border border-transparent hover:border-[#FACC15]/20"
                    >
                      <Eye size={16} className="mr-2 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Verify View</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Receipt Verification Modal */}
      <Dialog open={!!selectedReceipt} onOpenChange={() => setSelectedReceipt(null)}>
        <DialogContent className="bg-[#111827] border-[#1F2937] text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-display font-black uppercase">Receipt Verification</DialogTitle>
            <DialogDescription className="text-[#9CA3AF] text-xs font-bold uppercase">
              Verifying payment for {selectedReceipt?.payerName}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-6">
            <div className="aspect-[4/3] rounded-xl bg-[#0B1220] border border-[#1F2937] flex items-center justify-center overflow-hidden relative group">
              {/* Mock Receipt Image */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FACC15]/5 to-transparent opacity-50" />
              <div className="relative text-center p-8">
                <Receipt size={64} className="text-[#FACC15] mx-auto mb-4 opacity-20" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#9CA3AF]">Bank Receipt Preview</p>
                <div className="mt-4 p-4 border border-dashed border-[#1F2937] rounded-lg">
                   <p className="text-xs font-bold text-gray-400">Transaction ID: {selectedReceipt?.transactionId || 'N/A'}</p>
                   <p className="text-sm font-black text-white mt-1">Amount Verified: ₹ {selectedReceipt?.amount}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-3 bg-[#0B1220] border border-[#1F2937] rounded-lg">
                <p className="text-[9px] font-black uppercase text-[#9CA3AF] mb-1">Payment Method</p>
                <p className="text-xs font-bold text-white uppercase tracking-widest">{selectedReceipt?.method}</p>
              </div>
              <div className="p-3 bg-[#0B1220] border border-[#1F2937] rounded-lg">
                <p className="text-[9px] font-black uppercase text-[#9CA3AF] mb-1">Submitted On</p>
                <p className="text-xs font-bold text-white uppercase tracking-widest">{selectedReceipt?.date ? new Date(selectedReceipt.date).toLocaleDateString() : ''}</p>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="ghost" onClick={() => setSelectedReceipt(null)} className="uppercase text-[10px] font-black text-[#9CA3AF] hover:text-white">Cancel</Button>
            <div className="flex gap-2">
              <Button 
                onClick={() => selectedReceipt && updateStatusMutation.mutate({ id: selectedReceipt.id, status: 'FLAGGED' })}
                disabled={updateStatusMutation.isPending}
                className="bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444] hover:bg-[#EF4444] hover:text-white uppercase font-black text-[10px] tracking-widest h-10 px-6 rounded-lg"
              >
                Flag Issue
              </Button>
              <Button 
                onClick={() => selectedReceipt && updateStatusMutation.mutate({ id: selectedReceipt.id, status: 'VERIFIED' })}
                disabled={updateStatusMutation.isPending}
                className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0B1220] uppercase font-black text-[10px] tracking-widest h-10 px-8 rounded-lg shadow-[0_0_20px_rgba(250,204,21,0.2)]"
              >
                Confirm & Verify
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

const PlusIcon = ({ size, className }: { size: number, className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="M12 5v14"/></svg>
);

const AlertCircle = ({ size, className }: { size: number, className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
);

export default Billing;
