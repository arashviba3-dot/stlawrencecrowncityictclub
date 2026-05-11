import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Loader2, GraduationCap } from "lucide-react";
import clubLogo from "@/assets/club-logo.png";

const signupSchema = z.object({
  full_name: z.string().trim().min(2, "Name too short").max(80),
  email: z.string().trim().email("Invalid email").max(255),
  class_name: z.string().trim().min(1, "Class is required").max(40),
  password: z.string().min(8, "Min 8 characters").max(72),
});

const loginSchema = z.object({
  email: z.string().trim().email("Invalid email").max(255),
  password: z.string().min(1, "Password required").max(72),
});

const Auth = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate("/", { replace: true });
  }, [user, loading, navigate]);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = signupSchema.safeParse({
      full_name: fd.get("full_name"),
      email: fd.get("email"),
      class_name: fd.get("class_name"),
      password: fd.get("password"),
    });
    if (!parsed.success) {
      toast({ title: "Check the form", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: { full_name: parsed.data.full_name, class_name: parsed.data.class_name },
      },
    });
    setBusy(false);
    if (error) {
      toast({ title: "Signup failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Welcome aboard!", description: "Check your email to verify your account." });
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = loginSchema.safeParse({ email: fd.get("email"), password: fd.get("password") });
    if (!parsed.success) {
      toast({ title: "Check the form", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email: parsed.data.email, password: parsed.data.password });
    setBusy(false);
    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
    } else {
      navigate("/", { replace: true });
    }
  };

  const handleReset = async () => {
    const email = prompt("Enter your email to receive a reset link:");
    if (!email) return;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) toast({ title: "Reset failed", description: error.message, variant: "destructive" });
    else toast({ title: "Check your email", description: "Reset link sent." });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-background via-background to-primary/10">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-3 mb-8">
          <img src={clubLogo} alt="SLC ICT Club" className="w-14 h-14 object-contain" />
          <div className="text-center">
            <h1 className="font-heading font-bold text-xl">
              <span className="text-blue-pop">S</span><span className="text-yellow-pop">L</span><span className="text-pink-pop">C</span> <span className="text-glow">ICT</span> Club
            </h1>
            <p className="text-xs text-muted-foreground">For a Bright Future</p>
          </div>
        </Link>

        <div className="glass-card rounded-2xl p-6 md:p-8 border border-primary/20">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6 w-full">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="login-email">Email</Label>
                  <Input id="login-email" name="email" type="email" required autoComplete="email" />
                </div>
                <div>
                  <Label htmlFor="login-password">Password</Label>
                  <Input id="login-password" name="password" type="password" required autoComplete="current-password" />
                </div>
                <Button type="submit" disabled={busy} className="w-full">
                  {busy ? <Loader2 className="animate-spin" size={18} /> : "Login"}
                </Button>
                <button type="button" onClick={handleReset} className="text-xs text-muted-foreground hover:text-primary block mx-auto">
                  Forgot password?
                </button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <Label htmlFor="su-name">Full name</Label>
                  <Input id="su-name" name="full_name" required maxLength={80} />
                </div>
                <div>
                  <Label htmlFor="su-email">Email</Label>
                  <Input id="su-email" name="email" type="email" required autoComplete="email" />
                </div>
                <div>
                  <Label htmlFor="su-class">Class</Label>
                  <Input id="su-class" name="class_name" required placeholder="e.g. Senior 3" maxLength={40} />
                </div>
                <div>
                  <Label htmlFor="su-pw">Password</Label>
                  <Input id="su-pw" name="password" type="password" required minLength={8} autoComplete="new-password" />
                </div>
                <Button type="submit" disabled={busy} className="w-full">
                  {busy ? <Loader2 className="animate-spin" size={18} /> : <><GraduationCap size={16} className="mr-2" />Join the Club</>}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          <Link to="/" className="hover:text-primary">← Back to home</Link>
        </p>
      </div>
    </div>
  );
};

export default Auth;
