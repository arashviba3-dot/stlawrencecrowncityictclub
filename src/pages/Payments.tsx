import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Wallet, Smartphone, CheckCircle2, Loader2, ArrowLeft, Receipt, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const NORMAL_FEE = 5000;
const LATE_FEE = 5000; // surcharge → total 10,000 after 10th
const NUMBERS = {
  mtn: "0772 000 000",
  airtel: "0700 000 000",
};

const schema = z.object({
  full_name: z.string().trim().min(2).max(80),
  student_id: z.string().trim().min(2).max(40),
  phone: z.string().trim().regex(/^(\+?256|0)?7\d{8}$/, "Use a valid Ugandan mobile number"),
  method: z.enum(["mtn", "airtel"]),
});

type Receipt = {
  id: string;
  reference: string;
  total: number;
  base_fee: number;
  late_fee: number;
  full_name: string;
  student_id: string;
  method: string;
  created_at: string;
  status: string;
};

const Payments = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [method, setMethod] = useState<"mtn" | "airtel">("mtn");
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [history, setHistory] = useState<Receipt[]>([]);

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { replace: true });
  }, [user, loading, navigate]);

  const today = new Date();
  const isLate = today.getDate() > 10;
  const baseFee = NORMAL_FEE;
  const lateFee = isLate ? LATE_FEE : 0;
  const total = baseFee + lateFee;

  const fetchHistory = async () => {
    if (!user) return;
    const { data } = await supabase.from("payments").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
    setHistory((data as Receipt[]) ?? []);
  };

  useEffect(() => { fetchHistory(); }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      full_name: fd.get("full_name"),
      student_id: fd.get("student_id"),
      phone: fd.get("phone"),
      method,
    });
    if (!parsed.success) {
      toast({ title: "Check the form", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setBusy(true);
    const reference = `SLC-${Date.now().toString(36).toUpperCase()}`;
    const { data, error } = await supabase.from("payments").insert({
      user_id: user.id,
      ...parsed.data,
      base_fee: baseFee,
      late_fee: lateFee,
      total,
      reference,
    }).select("*").single();
    setBusy(false);
    if (error) {
      toast({ title: "Submission failed", description: error.message, variant: "destructive" });
      return;
    }
    setReceipt(data as Receipt);
    fetchHistory();
    toast({ title: "Payment submitted!", description: "Waiting for admin to confirm your transaction." });
  };

  if (loading || !user) return <div className="min-h-screen grid place-items-center text-muted-foreground">Loading…</div>;

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ background: "radial-gradient(ellipse at top, hsl(220 40% 8%) 0%, hsl(150 18% 5%) 60%)" }}>
      <div className="max-w-4xl mx-auto">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft size={16} /> Back to dashboard
        </Link>

        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-purple-pop">Membership Payment</p>
          <h1 className="font-heading font-bold text-3xl md:text-4xl mt-1">
            Pay your <span className="text-gradient">ICT Club fees</span>
          </h1>
        </div>

        {receipt ? (
          <ReceiptCard r={receipt} onAnother={() => setReceipt(null)} />
        ) : (
          <form onSubmit={handleSubmit} className="grid md:grid-cols-[1fr_320px] gap-5">
            <div className="glass-card rounded-3xl p-6 md:p-8 border border-primary/20 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="full_name">Full name</Label>
                  <Input id="full_name" name="full_name" defaultValue={profile?.full_name ?? ""} required maxLength={80} />
                </div>
                <div>
                  <Label htmlFor="student_id">Student ID</Label>
                  <Input id="student_id" name="student_id" required maxLength={40} placeholder="e.g. SLC-2024-031" />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Mobile money number</Label>
                <Input id="phone" name="phone" required placeholder="07XX XXX XXX" inputMode="tel" />
              </div>

              <div>
                <Label className="mb-2 block">Payment method</Label>
                <div className="grid grid-cols-2 gap-3">
                  <MethodCard active={method === "mtn"} onClick={() => setMethod("mtn")} label="MTN MoMo" color="yellow-pop" />
                  <MethodCard active={method === "airtel"} onClick={() => setMethod("airtel")} label="Airtel Money" color="pink-pop" />
                </div>
              </div>

              <div className="rounded-xl p-4 border border-primary/20 bg-muted/30 text-sm space-y-1">
                <div className="flex items-center gap-2 font-semibold">
                  <Smartphone size={16} className="text-primary" />
                  Send to: <span className="text-glow">{NUMBERS[method]}</span>
                </div>
                <div className="text-muted-foreground text-xs">
                  After paying, click <b>Submit</b> below. An admin will confirm your transaction within 24h.
                </div>
              </div>

              <Button type="submit" disabled={busy} size="lg" className="w-full">
                {busy ? <Loader2 className="animate-spin" /> : <><Wallet className="mr-2" size={18} /> Submit payment · {total.toLocaleString()} UGX</>}
              </Button>
            </div>

            <aside className="glass-card rounded-3xl p-6 border border-primary/20 h-fit space-y-4">
              <h3 className="font-heading font-bold flex items-center gap-2"><Receipt size={18} className="text-primary" /> Fee summary</h3>
              <Row label="Membership" value={`${baseFee.toLocaleString()} UGX`} />
              {isLate ? (
                <Row label={<span className="text-orange-pop flex items-center gap-1"><AlertTriangle size={12} /> Late fee</span>} value={`+${lateFee.toLocaleString()} UGX`} />
              ) : (
                <Row label={<span className="text-emerald-400 flex items-center gap-1"><Clock size={12} /> On-time discount</span>} value="0 UGX" />
              )}
              <div className="border-t border-primary/15 pt-3 flex justify-between">
                <span className="font-heading font-bold">Total</span>
                <span className="font-heading font-bold text-xl text-glow">{total.toLocaleString()} UGX</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Payments before the 10th: <b>5,000 UGX</b>. After the 10th: <b>10,000 UGX</b>.
              </p>
            </aside>
          </form>
        )}

        {history.length > 0 && (
          <section className="mt-10">
            <h2 className="font-heading font-bold text-xl mb-4">Your payment history</h2>
            <div className="overflow-x-auto rounded-2xl glass-card border border-primary/15">
              <table className="w-full text-sm">
                <thead className="text-left text-muted-foreground text-xs uppercase tracking-widest">
                  <tr><th className="px-4 py-3">Reference</th><th>Method</th><th>Amount</th><th>Date</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {history.map((h) => (
                    <tr key={h.id} className="border-t border-primary/10">
                      <td className="px-4 py-3 font-mono text-xs">{h.reference}</td>
                      <td className="uppercase">{h.method}</td>
                      <td>{h.total.toLocaleString()} UGX</td>
                      <td className="text-muted-foreground">{new Date(h.created_at).toLocaleDateString()}</td>
                      <td>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          h.status === "approved" ? "bg-emerald-500/20 text-emerald-400" :
                          h.status === "rejected" ? "bg-destructive/20 text-destructive" :
                          "bg-yellow-pop/20 text-yellow-pop"
                        }`}>{h.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

const Row = ({ label, value }: { label: any; value: any }) => (
  <div className="flex justify-between text-sm"><span className="text-muted-foreground">{label}</span><span>{value}</span></div>
);

const MethodCard = ({ active, onClick, label, color }: any) => (
  <button type="button" onClick={onClick}
    className={`p-4 rounded-xl border-2 transition-all text-left ${active ? "" : "border-primary/15 hover:border-primary/30"}`}
    style={active ? { borderColor: `hsl(var(--${color}))`, boxShadow: `0 0 24px hsl(var(--${color}) / 0.4)`, background: `hsl(var(--${color}) / 0.1)` } : {}}>
    <Smartphone size={20} style={{ color: `hsl(var(--${color}))` }} />
    <div className="font-semibold text-sm mt-2">{label}</div>
  </button>
);

const ReceiptCard = ({ r, onAnother }: { r: Receipt; onAnother: () => void }) => (
  <div className="glass-card rounded-3xl p-8 border border-primary/30 text-center max-w-xl mx-auto"
    style={{ boxShadow: "0 0 60px hsl(var(--primary) / 0.3)" }}>
    <div className="w-16 h-16 mx-auto rounded-full grid place-items-center bg-emerald-500/20 mb-4">
      <CheckCircle2 className="text-emerald-400" size={32} />
    </div>
    <h2 className="font-heading font-bold text-2xl mb-1">Payment submitted!</h2>
    <p className="text-muted-foreground text-sm mb-6">Awaiting admin confirmation.</p>
    <div className="text-left bg-muted/30 rounded-2xl p-5 space-y-2 text-sm">
      <Row label="Reference" value={<span className="font-mono">{r.reference}</span>} />
      <Row label="Name" value={r.full_name} />
      <Row label="Student ID" value={r.student_id} />
      <Row label="Method" value={<span className="uppercase">{r.method}</span>} />
      <Row label="Membership" value={`${r.base_fee.toLocaleString()} UGX`} />
      {r.late_fee > 0 && <Row label="Late fee" value={`${r.late_fee.toLocaleString()} UGX`} />}
      <div className="border-t border-primary/15 pt-2 flex justify-between font-bold">
        <span>Total paid</span><span className="text-glow">{r.total.toLocaleString()} UGX</span>
      </div>
    </div>
    <div className="flex gap-3 justify-center mt-6">
      <Button onClick={() => window.print()} variant="outline">Print receipt</Button>
      <Button onClick={onAnother}>Make another payment</Button>
    </div>
  </div>
);

export default Payments;
