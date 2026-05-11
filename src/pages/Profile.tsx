import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Loader2, Upload, ShieldCheck } from "lucide-react";

const Profile = () => {
  const { user, profile, loading, isAdmin, refreshProfile, signOut } = useAuth();
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ full_name: "", class_name: "", bio: "" });

  useEffect(() => {
    if (profile) {
      setForm({
        full_name: profile.full_name ?? "",
        class_name: profile.class_name ?? "",
        bio: profile.bio ?? "",
      });
    }
  }, [profile]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
  if (!user) return <Navigate to="/auth" replace />;

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: form.full_name.trim().slice(0, 80), class_name: form.class_name.trim().slice(0, 40), bio: form.bio.trim().slice(0, 500) })
      .eq("id", user.id);
    setBusy(false);
    if (error) toast({ title: "Update failed", description: error.message, variant: "destructive" });
    else { toast({ title: "Profile saved" }); refreshProfile(); }
  };

  const uploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max 2MB", variant: "destructive" });
      return;
    }
    setBusy(true);
    const ext = file.name.split(".").pop();
    const path = `${user.id}/avatar.${ext}`;
    const { error: upErr } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
    if (upErr) { setBusy(false); toast({ title: "Upload failed", description: upErr.message, variant: "destructive" }); return; }
    const { data: pub } = supabase.storage.from("avatars").getPublicUrl(path);
    const url = `${pub.publicUrl}?t=${Date.now()}`;
    const { error } = await supabase.from("profiles").update({ avatar_url: url }).eq("id", user.id);
    setBusy(false);
    if (error) toast({ title: "Save failed", description: error.message, variant: "destructive" });
    else { toast({ title: "Avatar updated" }); refreshProfile(); }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-24 max-w-2xl">
        <div className="glass-card rounded-2xl p-6 md:p-8 border border-primary/20">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={profile?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(profile?.full_name || user.email || "user")}`}
                  alt="avatar"
                  className="w-20 h-20 rounded-full object-cover border-2 border-primary/40"
                />
                <label className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-1.5 cursor-pointer hover:scale-110 transition-transform">
                  <Upload size={14} />
                  <input type="file" accept="image/*" onChange={uploadAvatar} className="hidden" disabled={busy} />
                </label>
              </div>
              <div>
                <h1 className="font-heading font-bold text-xl">{profile?.full_name || "Member"}</h1>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                {isAdmin && (
                  <span className="inline-flex items-center gap-1 text-xs mt-1 px-2 py-0.5 rounded-full bg-yellow-pop/15 text-yellow-pop">
                    <ShieldCheck size={12} /> Admin
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              {isAdmin && <a href="/admin"><Button variant="outline" size="sm">Admin</Button></a>}
              <Button variant="outline" size="sm" onClick={signOut}>Sign out</Button>
            </div>
          </div>

          <form onSubmit={save} className="space-y-4">
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input id="name" value={form.full_name} maxLength={80} onChange={(e) => setForm(f => ({ ...f, full_name: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="class">Class</Label>
              <Input id="class" value={form.class_name} maxLength={40} onChange={(e) => setForm(f => ({ ...f, class_name: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" rows={4} maxLength={500} value={form.bio} onChange={(e) => setForm(f => ({ ...f, bio: e.target.value }))} />
            </div>
            <Button type="submit" disabled={busy}>{busy ? <Loader2 className="animate-spin" size={16} /> : "Save changes"}</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
