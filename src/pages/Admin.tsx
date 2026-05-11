import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Loader2, ShieldCheck, ShieldOff, Users } from "lucide-react";

type Member = {
  id: string;
  full_name: string | null;
  email: string | null;
  class_name: string | null;
  avatar_url: string | null;
  created_at: string;
  is_admin: boolean;
};

const Admin = () => {
  const { user, isAdmin, loading } = useAuth();
  const [members, setMembers] = useState<Member[]>([]);
  const [fetching, setFetching] = useState(true);

  const load = async () => {
    setFetching(true);
    const [{ data: profs }, { data: roles }] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("user_roles").select("user_id, role"),
    ]);
    const adminSet = new Set((roles || []).filter(r => r.role === "admin").map(r => r.user_id));
    setMembers((profs || []).map(p => ({ ...p, is_admin: adminSet.has(p.id) }) as Member));
    setFetching(false);
  };

  useEffect(() => { if (isAdmin) load(); }, [isAdmin]);

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
      </div>
    </div>
  );
};

export default Admin;
