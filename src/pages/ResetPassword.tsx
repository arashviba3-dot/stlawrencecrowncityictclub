import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Supabase puts a recovery session in the URL hash
    const hash = window.location.hash;
    if (hash.includes("type=recovery") || hash.includes("access_token")) {
      setReady(true);
    } else {
      supabase.auth.getSession().then(({ data }) => setReady(!!data.session));
    }
  }, []);

  const handle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const password = String(fd.get("password") || "");
    if (password.length < 8) {
      toast({ title: "Too short", description: "Use at least 8 characters", variant: "destructive" });
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) toast({ title: "Reset failed", description: error.message, variant: "destructive" });
    else {
      toast({ title: "Password updated" });
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-background to-primary/10">
      <form onSubmit={handle} className="glass-card rounded-2xl p-8 max-w-md w-full space-y-4 border border-primary/20">
        <h1 className="font-heading font-bold text-2xl">Set new password</h1>
        {!ready && <p className="text-sm text-muted-foreground">Open this page from the password reset email.</p>}
        <div>
          <Label htmlFor="pw">New password</Label>
          <Input id="pw" name="password" type="password" required minLength={8} disabled={!ready} />
        </div>
        <Button type="submit" disabled={!ready || busy} className="w-full">Update password</Button>
      </form>
    </div>
  );
};

export default ResetPassword;
