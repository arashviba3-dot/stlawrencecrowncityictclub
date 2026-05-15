import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Lock, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }: { children: ReactNode; adminOnly?: boolean }) => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-background via-background to-primary/10">
        <div className="w-full max-w-md text-center glass-card rounded-2xl p-8 border border-primary/30 shadow-[0_0_60px_hsl(var(--primary)/0.25)] animate-fade-in">
          <div className="mx-auto w-20 h-20 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center mb-6 shadow-[0_0_30px_hsl(var(--primary)/0.4)] animate-pulse">
            <Lock className="text-primary" size={36} />
          </div>
          <h1 className="font-heading font-bold text-2xl mb-3 text-glow">
            Members-Only Zone
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Please sign in to continue to <span className="text-primary font-semibold">ST LAWRENCE CROWN CITY ICT CLUB</span>.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              to="/auth"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-[0_0_24px_hsl(var(--primary)/0.5)]"
            >
              <LogIn size={16} /> Sign in
            </Link>
            <Link
              to="/auth"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary/10 border border-primary/30 text-foreground font-medium hover:bg-primary/20 transition-colors"
            >
              <UserPlus size={16} /> Create an account
            </Link>
            <Link to="/" className="text-xs text-muted-foreground hover:text-primary mt-2">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (adminOnly && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-background">
        <div className="text-center max-w-md glass-card p-8 rounded-2xl border border-destructive/30">
          <Lock className="mx-auto text-destructive mb-4" size={36} />
          <h2 className="font-heading font-bold text-xl mb-2">Admin only</h2>
          <p className="text-muted-foreground text-sm mb-4">You don't have permission to view this page.</p>
          <Link to="/dashboard" className="text-primary hover:underline text-sm">Go to dashboard</Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
