import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutDashboard, BookOpen, Newspaper, Calendar, Gamepad2, MessageSquare,
  Code2, FolderKanban, Trophy, Settings, LogOut, Search, Bell, Wallet,
  Sparkles, Rocket, Zap, GraduationCap, Users, Activity, Crown, KeyRound, ShieldCheck,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import clubLogo from "@/assets/club-logo.png";
import p1 from "@/assets/student-photo-1.jpg";
import p3 from "@/assets/student-photo-3.jpg";
import p5 from "@/assets/student-photo-5.jpg";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/dashboard?tab=learning", icon: BookOpen, label: "Learning Hub" },
  { to: "/dashboard?tab=news", icon: Newspaper, label: "ICT News" },
  { to: "/dashboard?tab=events", icon: Calendar, label: "Events" },
  { to: "/dashboard?tab=games", icon: Gamepad2, label: "Games" },
  { to: "/dashboard?tab=chat", icon: MessageSquare, label: "Chat Rooms" },
  { to: "/dashboard?tab=challenges", icon: Code2, label: "Coding Challenges" },
  { to: "/dashboard?tab=projects", icon: FolderKanban, label: "Project Showcase" },
  { to: "/dashboard?tab=leaderboard", icon: Trophy, label: "Leaderboard" },
  { to: "/payments", icon: Wallet, label: "Payments" },
  { to: "/profile", icon: Settings, label: "Settings" },
];

const quotes = [
  "The world rewards success, not efforts.",
  "Code is poetry written in logic.",
  "Innovation distinguishes a leader from a follower.",
  "The best way to predict the future is to build it.",
  "Stay curious. Build often. Ship boldly.",
];

const news = [
  { tag: "AI", title: "Gemini 3 launches with multimodal reasoning", time: "2h ago", color: "purple-pop" },
  { tag: "Cybersec", title: "New phishing techniques target students — stay alert", time: "5h ago", color: "pink-pop" },
  { tag: "Cloud", title: "AWS announces free tier expansion for African students", time: "1d ago", color: "blue-pop" },
  { tag: "DevOps", title: "GitHub Copilot now free for verified school accounts", time: "2d ago", color: "teal-pop" },
];

const events = [
  { date: "MAY 18", title: "Hackathon: Build a school app", where: "Computer Lab A" },
  { date: "MAY 25", title: "Cybersecurity workshop", where: "Smart Classroom" },
  { date: "JUN 02", title: "AI Demo Day", where: "Main Hall" },
];

const projects = [
  { title: "School Library App", author: "Ssemakula J.", img: p1 },
  { title: "Attendance Bot", author: "Nakato M.", img: p3 },
  { title: "Crown City Quiz", author: "Mukasa P.", img: p5 },
];

const Dashboard = () => {
  const { user, profile, isAdmin, loading, signOut, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [memberCount, setMemberCount] = useState<number | null>(null);
  const [onlineCount, setOnlineCount] = useState<number>(1);
  const [openMobile, setOpenMobile] = useState(false);
  const [quote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);
  const [code, setCode] = useState("");
  const [redeeming, setRedeeming] = useState(false);

  const isPremium = !!(profile as any)?.is_premium;
  const premiumExpires = (profile as any)?.premium_expires_at as string | null | undefined;
  const xp = ((profile as any)?.xp as number) ?? 0;
  const xpForNext = 1000;

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { replace: true });
  }, [user, loading, navigate]);

  useEffect(() => {
    supabase.from("profiles").select("id", { count: "exact", head: true }).then(({ count }) => setMemberCount(count ?? 0));
  }, []);

  // Realtime presence: counts online dashboard users
  useEffect(() => {
    if (!user) return;
    const channel = supabase.channel("dashboard-presence", { config: { presence: { key: user.id } } });
    channel
      .on("presence", { event: "sync" }, () => {
        setOnlineCount(Object.keys(channel.presenceState()).length);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") await channel.track({ online_at: new Date().toISOString() });
      });
    return () => { supabase.removeChannel(channel); };
  }, [user]);

  const redeemCode = async () => {
    if (!code.trim()) return;
    setRedeeming(true);
    const { data, error } = await supabase.rpc("redeem_activation_code" as any, { _code: code.trim() });
    setRedeeming(false);
    const res = data as { success?: boolean; error?: string } | null;
    if (error || !res?.success) {
      toast({ title: "Activation failed", description: res?.error ?? error?.message ?? "Invalid code", variant: "destructive" });
      return;
    }
    toast({ title: "Premium unlocked!", description: "Welcome to Premium. Enjoy exclusive access." });
    setCode("");
    await refreshProfile();
  };

  const firstName = profile?.full_name?.split(" ")[0] ?? "Student";

  const Sidebar = () => (
    <aside className="h-full w-64 shrink-0 flex flex-col border-r border-primary/15"
      style={{ background: "linear-gradient(180deg, hsl(150 20% 6%) 0%, hsl(220 35% 8%) 100%)" }}>
      <div className="p-5 flex items-center gap-3 border-b border-primary/10">
        <img src={clubLogo} alt="" className="w-10 h-10" />
        <div>
          <div className="font-heading font-bold text-sm leading-tight">SLC ICT</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Club Portal</div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((it) => (
          <NavLink
            key={it.label}
            to={it.to}
            end={it.to === "/dashboard"}
            onClick={() => setOpenMobile(false)}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary/20 text-foreground shadow-[0_0_20px_hsl(var(--primary)/0.4)] border border-primary/40"
                  : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
              }`
            }
          >
            <it.icon size={18} className="group-hover:scale-110 transition" />
            {it.label}
          </NavLink>
        ))}
        {isAdmin && (
          <NavLink to="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-foreground bg-purple-pop/15 border border-purple-pop/40">
            <Sparkles size={18} /> Admin
          </NavLink>
        )}
      </nav>
      <div className="p-3 border-t border-primary/10">
        <button onClick={async () => { await signOut(); navigate("/"); }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );

  if (loading || !user) {
    return <div className="min-h-screen grid place-items-center text-muted-foreground">Loading…</div>;
  }

  return (
    <div className="min-h-screen flex" style={{ background: "radial-gradient(ellipse at top, hsl(220 40% 8%) 0%, hsl(150 18% 5%) 60%)" }}>
      {/* Desktop sidebar */}
      <div className="hidden md:block sticky top-0 h-screen"><Sidebar /></div>
      {/* Mobile drawer */}
      {openMobile && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={() => setOpenMobile(false)} />
          <div className="relative h-full"><Sidebar /></div>
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 border-b border-primary/10 backdrop-blur-xl"
          style={{ background: "hsl(150 18% 6% / 0.8)" }}>
          <div className="flex items-center gap-3 px-4 md:px-6 h-16">
            <button className="md:hidden p-2" onClick={() => setOpenMobile(true)} aria-label="Menu">
              <LayoutDashboard size={20} />
            </button>
            <Link to="/" className="hidden md:flex items-center gap-2">
              <img src={clubLogo} alt="" className="w-9 h-9" />
            </Link>
            <div className="flex-1 max-w-md relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search learning, projects, members…"
                className="w-full h-10 pl-9 pr-4 rounded-full bg-muted/40 border border-primary/15 focus:border-primary/50 focus:outline-none text-sm"
              />
            </div>
            <button className="relative p-2 rounded-full hover:bg-primary/10" aria-label="Notifications">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: "hsl(var(--pink-pop))", boxShadow: "0 0 8px hsl(var(--pink-pop))" }} />
            </button>
            <Link to="/profile" className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-primary/15 border border-primary/30 hover:bg-primary/25 transition">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="" className="w-7 h-7 rounded-full object-cover" />
              ) : (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-purple-pop grid place-items-center text-xs font-bold">
                  {firstName[0]}
                </div>
              )}
              <span className="hidden sm:inline text-sm font-medium">{firstName}</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 space-y-6 max-w-[1400px] w-full mx-auto">
          {/* Welcome */}
          <section className="relative overflow-hidden rounded-3xl glass-card p-6 md:p-10 border border-primary/20">
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl" style={{ background: "hsl(var(--purple-pop) / 0.3)" }} />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full blur-3xl" style={{ background: "hsl(var(--blue-pop) / 0.25)" }} />
            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-primary mb-2">Welcome back</p>
                <h1 className="font-heading font-bold text-3xl md:text-5xl">
                  Hello, <span className="text-gradient">{firstName}</span> 👋
                </h1>
                <p className="text-muted-foreground mt-3 max-w-xl">
                  {profile?.class_name ? `${profile.class_name} • ` : ""}Crown City ICT Club member portal.
                  Build, learn, and ship today.
                </p>
                <div className="flex flex-wrap gap-3 mt-5">
                  <Link to="/payments" className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:scale-105 transition shadow-[0_0_24px_hsl(var(--primary)/0.5)]">
                    Pay membership
                  </Link>
                  <a href="#challenge" className="px-5 py-2.5 rounded-full glass-card border border-primary/30 text-sm font-semibold hover:border-primary transition">
                    Today's challenge
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 md:w-80">
                <Stat icon={Users} label="Members" value={memberCount ?? "—"} color="blue-pop" />
                <Stat icon={Trophy} label="Your rank" value="#7" color="yellow-pop" />
                <Stat icon={Activity} label="Streak" value="5d" color="pink-pop" />
                <Stat icon={Zap} label="XP" value="1,240" color="purple-pop" />
              </div>
            </div>
          </section>

          {/* Quote + Quick actions */}
          <section className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2 glass-card rounded-2xl p-6 border border-primary/15">
              <p className="text-xs uppercase tracking-widest text-purple-pop mb-2 flex items-center gap-2">
                <Sparkles size={14} /> Daily motivation
              </p>
              <p className="font-heading text-xl md:text-2xl italic">"{quote}"</p>
            </div>
            <QuickAction icon={Rocket} label="Start lesson" color="blue-pop" href="#learning" />
          </section>

          {/* Quick action grid */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <QuickAction icon={Code2} label="Coding Challenge" color="purple-pop" href="#challenge" />
            <QuickAction icon={Gamepad2} label="Play a Game" color="pink-pop" href="/#games" />
            <QuickAction icon={MessageSquare} label="Chat Rooms" color="teal-pop" href="#chat" />
            <QuickAction icon={GraduationCap} label="Certificates" color="yellow-pop" href="#certificates" />
          </section>

          {/* Announcements + Events */}
          <section className="grid md:grid-cols-2 gap-4">
            <Card title="📢 Announcements" accent="orange-pop">
              <ul className="space-y-3 text-sm">
                <li className="flex gap-3"><span className="w-2 h-2 mt-1.5 rounded-full bg-orange-pop shrink-0" />Late membership fees increase to 10,000 UGX after the 10th — pay early.</li>
                <li className="flex gap-3"><span className="w-2 h-2 mt-1.5 rounded-full bg-orange-pop shrink-0" />New smart-board installed in Lab B — coding practicals start Friday.</li>
                <li className="flex gap-3"><span className="w-2 h-2 mt-1.5 rounded-full bg-orange-pop shrink-0" />Club is currently full (20/20). Join the waitlist via Contact.</li>
              </ul>
            </Card>
            <Card title="📅 Upcoming Events" accent="teal-pop">
              <ul className="space-y-3">
                {events.map((e) => (
                  <li key={e.title} className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition">
                    <div className="w-14 text-center px-2 py-1.5 rounded-lg bg-primary/15 border border-primary/30">
                      <div className="text-[10px] text-muted-foreground">{e.date.split(" ")[0]}</div>
                      <div className="font-heading font-bold text-lg leading-none">{e.date.split(" ")[1]}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{e.title}</div>
                      <div className="text-xs text-muted-foreground">{e.where}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </section>

          {/* News + Coding challenge */}
          <section className="grid md:grid-cols-2 gap-4">
            <Card title="🌐 ICT News" accent="blue-pop">
              <ul className="space-y-3">
                {news.map((n) => (
                  <li key={n.title} className="flex items-start gap-3 group cursor-pointer">
                    <span className="text-[10px] font-bold uppercase px-2 py-1 rounded-md mt-0.5"
                      style={{ background: `hsl(var(--${n.color}) / 0.15)`, color: `hsl(var(--${n.color}))` }}>{n.tag}</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium group-hover:text-glow transition">{n.title}</div>
                      <div className="text-xs text-muted-foreground">{n.time}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
            <Card title="💻 Coding Challenge of the Day" accent="purple-pop" id="challenge">
              <div className="p-4 rounded-xl bg-muted/40 border border-primary/15">
                <div className="text-xs uppercase tracking-widest text-purple-pop mb-1">Difficulty: Easy</div>
                <div className="font-heading font-bold text-lg mb-2">FizzBuzz with a twist</div>
                <p className="text-sm text-muted-foreground mb-3">
                  Print numbers 1–100. For multiples of 3 print "Crown", for 5 print "City", for both print "Crown City".
                </p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:scale-105 transition">Solve</button>
                  <button className="px-4 py-2 rounded-full border border-primary/30 text-sm font-semibold">View hints</button>
                </div>
              </div>
            </Card>
          </section>

          {/* Leaderboard + Recent activity */}
          <section className="grid md:grid-cols-2 gap-4">
            <Card title="🏆 Leaderboard" accent="yellow-pop">
              <ol className="space-y-2">
                {[
                  { n: "Ssemakula J.", xp: 2410 },
                  { n: "Nakato M.", xp: 2180 },
                  { n: "Mukasa P.", xp: 1990 },
                  { n: "Achieng L.", xp: 1745 },
                  { n: "Wasswa T.", xp: 1610 },
                ].map((u, idx) => (
                  <li key={u.n} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/30 transition">
                    <span className={`w-7 h-7 rounded-full grid place-items-center text-xs font-bold ${
                      idx === 0 ? "bg-yellow-pop text-black" : idx === 1 ? "bg-muted" : idx === 2 ? "bg-orange-pop/70" : "bg-muted/50"
                    }`}>{idx + 1}</span>
                    <span className="flex-1 text-sm font-medium">{u.n}</span>
                    <span className="text-xs text-muted-foreground">{u.xp} XP</span>
                  </li>
                ))}
              </ol>
            </Card>
            <Card title="⚡ Recent Activity" accent="pink-pop">
              <ul className="space-y-3 text-sm">
                <li>✅ You completed <b>HTML Basics</b> · +50 XP</li>
                <li>💬 New message in <b>#general</b></li>
                <li>📤 You uploaded a project: <b>Library App</b></li>
                <li>🔓 Unlocked badge: <b>First Commit</b></li>
              </ul>
            </Card>
          </section>

          {/* Featured projects */}
          <section>
            <h2 className="font-heading font-bold text-2xl mb-4 flex items-center gap-2">
              <FolderKanban className="text-primary" /> Featured Student Projects
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((p) => (
                <div key={p.title} className="glass-card rounded-2xl overflow-hidden border border-primary/15 hover:border-primary/40 hover:-translate-y-1 transition-all group">
                  <div className="aspect-video overflow-hidden">
                    <img src={p.img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  </div>
                  <div className="p-4">
                    <div className="font-heading font-bold">{p.title}</div>
                    <div className="text-xs text-muted-foreground">by {p.author}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

const Stat = ({ icon: Icon, label, value, color }: { icon: any; label: string; value: any; color: string }) => (
  <div className="rounded-2xl p-3 border glass-card" style={{ borderColor: `hsl(var(--${color}) / 0.4)` }}>
    <div className="flex items-center justify-between">
      <Icon size={16} style={{ color: `hsl(var(--${color}))` }} />
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
    <div className="font-heading font-bold text-2xl mt-1">{value}</div>
  </div>
);

const QuickAction = ({ icon: Icon, label, color, href }: { icon: any; label: string; color: string; href: string }) => (
  <a href={href} className="group glass-card rounded-2xl p-5 border transition-all hover:-translate-y-1 hover:scale-[1.02] flex items-center gap-3"
    style={{ borderColor: `hsl(var(--${color}) / 0.3)` }}>
    <div className="w-11 h-11 rounded-xl grid place-items-center transition group-hover:scale-110"
      style={{ background: `hsl(var(--${color}) / 0.15)`, color: `hsl(var(--${color}))`, boxShadow: `0 0 20px hsl(var(--${color}) / 0.25)` }}>
      <Icon size={20} />
    </div>
    <span className="font-semibold text-sm">{label}</span>
  </a>
);

const Card = ({ title, accent, children, id }: { title: string; accent: string; children: React.ReactNode; id?: string }) => (
  <div id={id} className="glass-card rounded-2xl p-5 border border-primary/15 hover:border-primary/30 transition">
    <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2"
      style={{ borderLeft: `3px solid hsl(var(--${accent}))`, paddingLeft: 10 }}>
      {title}
    </h3>
    {children}
  </div>
);

export default Dashboard;
