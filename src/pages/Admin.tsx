import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Loader2, ShieldCheck, ShieldOff, Users, Wallet, Search, Check, X, KeyRound, Copy, Crown } from "lucide-react";
import { Input } from "@/components/ui/input";

type Member = {
  id: string;
  full_name: string | null;
  email: string | null;
  class_name: string | null;
  avatar_url: string | null;
  created_at: string;
  is_admin: boolean;
};

type Payment = {
  id: string; user_id: string; full_name: string; student_id: string; phone: string;
  method: string; base_fee: number; late_fee: number; total: number; reference: string;
  status: string; created_at: string;
};

type ActivationCode = {
  id: string; code: string; duration_days: number; created_at: string;
  redeemed_by: string | null; redeemed_at: string | null; note: string | null;
};

const Admin = () => {
  const { user, isAdmin, loading } = useAuth();
  const [members, setMembers] = useState<Member[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [search, setSearch] = useState("");
  const [fetching, setFetching] = useState(true);
  const [codes, setCodes] = useState<ActivationCode[]>([]);
  const [codeDays, setCodeDays] = useState(30);
  const [codeNote, setCodeNote] = useState("");

  const load = async () => {
    setFetching(true);
    const [{ data: profs }, { data: roles }, { data: pays }, { data: cds }] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("user_roles").select("user_id, role"),
      supabase.from("payments").select("*").order("created_at", { ascending: false }),
      supabase.from("activation_codes" as any).select("*").order("created_at", { ascending: false }),
    ]);
    const adminSet = new Set((roles || []).filter(r => r.role === "admin").map(r => r.user_id));
    setMembers((profs || []).map(p => ({ ...p, is_admin: adminSet.has(p.id) }) as Member));
    setPayments((pays as Payment[]) || []);
    setCodes((cds as ActivationCode[]) || []);
    setFetching(false);
  };

  useEffect(() => { if (isAdmin) load(); }, [isAdmin]);

  const generateCode = async () => {
    const random = Array.from({ length: 10 }, () =>
      "ABCDEFGHJKMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 31)]
    ).join("");
    const newCode = `SLC-${random}`;
    const { error } = await supabase.from("activation_codes" as any).insert({
      code: newCode,
      duration_days: codeDays,
      created_by: user!.id,
      note: codeNote || null,
    });
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    toast({ title: "Code generated", description: newCode });
    setCodeNote("");
    load();
  };

  const copyCode = (c: string) => {
    navigator.clipboard.writeText(c);
    toast({ title: "Copied", description: c });
  };

  const setStatus = async (p: Payment, status: "approved" | "rejected") => {
    const { error } = await supabase.from("payments").update({ status, paid_at: status === "approved" ? new Date().toISOString() : null }).eq("id", p.id);
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    toast({ title: `Payment ${status}` });
    load();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin) return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="font-heading font-bold text-2xl mb-2">Admin only</h1>
        <p className="text-muted-foreground">You need admin privileges to view this page.</p>
      </div>
    </div>
  );

  const toggleAdmin = async (m: Member) => {
    if (m.is_admin) {
      const { error } = await supabase.from("user_roles").delete().eq("user_id", m.id).eq("role", "admin");
      if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    } else {
      const { error } = await supabase.from("user_roles").insert({ user_id: m.id, role: "admin" });
      if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    }
    toast({ title: "Role updated" });
    load();
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-24 max-w-5xl">
        <div className="flex items-center gap-3 mb-6">
          <Users className="text-primary" />
          <h1 className="font-heading font-bold text-2xl">Member Management</h1>
          <span className="ml-auto text-sm text-muted-foreground">{members.length} member{members.length === 1 ? "" : "s"}</span>
        </div>

        {fetching ? (
          <div className="flex justify-center py-12"><Loader2 className="animate-spin" /></div>
        ) : (
          <div className="glass-card rounded-2xl border border-primary/20 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="p-3">Member</th>
                  <th className="p-3 hidden md:table-cell">Class</th>
                  <th className="p-3 hidden md:table-cell">Joined</th>
                  <th className="p-3 text-right">Role</th>
                </tr>
              </thead>
              <tbody>
                {members.map(m => (
                  <tr key={m.id} className="border-t border-border hover:bg-muted/20">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={m.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(m.full_name || m.email || "u")}`}
                          alt=""
                          className="w-9 h-9 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium">{m.full_name || "—"}</div>
                          <div className="text-xs text-muted-foreground">{m.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 hidden md:table-cell">{m.class_name || "—"}</td>
                    <td className="p-3 hidden md:table-cell text-muted-foreground">{new Date(m.created_at).toLocaleDateString()}</td>
                    <td className="p-3 text-right">
                      <Button
                        size="sm"
                        variant={m.is_admin ? "default" : "outline"}
                        onClick={() => toggleAdmin(m)}
                        disabled={m.id === user.id}
                        title={m.id === user.id ? "You can't change your own role" : ""}
                      >
                        {m.is_admin ? <><ShieldCheck size={14} className="mr-1" /> Admin</> : <><ShieldOff size={14} className="mr-1" /> Member</>}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="text-xs text-muted-foreground mt-4">
          Tip: To make the very first admin, sign up, then open Backend → user_roles → set your role to "admin".
        </p>

        {/* Payments management */}
        <div className="flex items-center gap-3 mt-12 mb-4">
          <Wallet className="text-purple-pop" />
          <h2 className="font-heading font-bold text-2xl">Payments</h2>
          <span className="ml-auto text-sm text-muted-foreground">
            {payments.filter(p => p.status === "pending").length} pending · {payments.length} total
          </span>
        </div>
        <div className="relative mb-3 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or student ID" className="pl-9" />
        </div>
        <div className="glass-card rounded-2xl border border-primary/20 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-3">Student</th>
                <th className="p-3 hidden md:table-cell">Reference</th>
                <th className="p-3">Method</th>
                <th className="p-3">Total</th>
                <th className="p-3 hidden md:table-cell">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments
                .filter(p => !search || p.full_name.toLowerCase().includes(search.toLowerCase()) || p.student_id.toLowerCase().includes(search.toLowerCase()))
                .map(p => (
                <tr key={p.id} className="border-t border-border hover:bg-muted/20">
                  <td className="p-3">
                    <div className="font-medium">{p.full_name}</div>
                    <div className="text-xs text-muted-foreground">{p.student_id} · {p.phone}</div>
                  </td>
                  <td className="p-3 hidden md:table-cell font-mono text-xs">{p.reference}</td>
                  <td className="p-3 uppercase text-xs">{p.method}</td>
                  <td className="p-3 font-semibold">
                    {p.total.toLocaleString()} UGX
                    {p.late_fee > 0 && <div className="text-[10px] text-orange-pop">+late</div>}
                  </td>
                  <td className="p-3 hidden md:table-cell text-muted-foreground text-xs">{new Date(p.created_at).toLocaleDateString()}</td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      p.status === "approved" ? "bg-emerald-500/20 text-emerald-400" :
                      p.status === "rejected" ? "bg-destructive/20 text-destructive" :
                      "bg-yellow-pop/20 text-yellow-pop"
                    }`}>{p.status}</span>
                  </td>
                  <td className="p-3 text-right">
                    {p.status === "pending" && (
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="default" onClick={() => setStatus(p, "approved")}>
                          <Check size={14} />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setStatus(p, "rejected")}>
                          <X size={14} />
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {payments.length === 0 && (
                <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">No payments yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
