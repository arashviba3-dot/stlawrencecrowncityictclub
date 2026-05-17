import { useEffect, useMemo, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import {
  Loader2, Send, Paperclip, Users, MessageSquare, Plus, Download, ArrowLeft,
} from "lucide-react";

type Conversation = {
  id: string;
  name: string | null;
  is_group: boolean;
  created_by: string;
};

type Member = { user_id: string };
type Profile = { id: string; full_name: string | null; email: string | null; avatar_url: string | null };

type Message = {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string | null;
  file_url: string | null;
  file_name: string | null;
  created_at: string;
};

const Chat = () => {
  const { user, loading } = useAuth();
  const [convs, setConvs] = useState<Conversation[]>([]);
  const [members, setMembers] = useState<Record<string, string[]>>({}); // convId -> userIds
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [allUsers, setAllUsers] = useState<Profile[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load conversations and member lists
  const loadConversations = async () => {
    if (!user) return;
    const { data: mine } = await supabase
      .from("conversation_members")
      .select("conversation_id")
      .eq("user_id", user.id);
    const ids = (mine ?? []).map((m: any) => m.conversation_id);
    if (ids.length === 0) { setConvs([]); return; }
    const { data: cs } = await supabase
      .from("conversations").select("*").in("id", ids).order("created_at", { ascending: false });
    setConvs((cs ?? []) as Conversation[]);

    const { data: mems } = await supabase
      .from("conversation_members").select("conversation_id, user_id").in("conversation_id", ids);
    const map: Record<string, string[]> = {};
    (mems ?? []).forEach((m: any) => {
      map[m.conversation_id] = [...(map[m.conversation_id] || []), m.user_id];
    });
    setMembers(map);

    const userIds = Array.from(new Set((mems ?? []).map((m: any) => m.user_id)));
    if (userIds.length) {
      const { data: profs } = await supabase
        .from("public_profiles").select("id, full_name, avatar_url").in("id", userIds);
      const pmap: Record<string, Profile> = {};
      (profs ?? []).forEach((p: any) => { pmap[p.id] = { ...p, email: null } as Profile; });
      setProfiles(pmap);
    }
  };

  const loadAllUsers = async () => {
    const { data } = await supabase.from("public_profiles").select("id, full_name, avatar_url").limit(100);
    setAllUsers(((data ?? []) as any[]).map((p) => ({ ...p, email: null })) as Profile[]);
  };

  const loadMessages = async (convId: string) => {
    const { data } = await supabase
      .from("messages").select("*").eq("conversation_id", convId).order("created_at", { ascending: true });
    setMessages((data ?? []) as Message[]);
    setTimeout(() => scrollRef.current?.scrollTo({ top: 9e9, behavior: "smooth" }), 50);
  };

  useEffect(() => { if (user) { loadConversations(); loadAllUsers(); } }, [user]);
  useEffect(() => { if (activeId) loadMessages(activeId); }, [activeId]);

  // Realtime: messages + conversations + members
  useEffect(() => {
    if (!user) return;
    const ch = supabase
      .channel("chat-rt")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) => {
        const m = payload.new as Message;
        if (m.conversation_id === activeId) {
          setMessages((prev) => prev.some(x => x.id === m.id) ? prev : [...prev, m]);
          setTimeout(() => scrollRef.current?.scrollTo({ top: 9e9, behavior: "smooth" }), 30);
        }
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "conversation_members" }, () => {
        loadConversations();
      })
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [user, activeId]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
  if (!user) return <Navigate to="/auth" replace />;

  const active = convs.find(c => c.id === activeId) || null;
  const activeMembers = activeId ? (members[activeId] || []) : [];

  const convTitle = (c: Conversation) => {
    if (c.is_group) return c.name || "Group";
    const others = (members[c.id] || []).filter(id => id !== user.id);
    const other = others[0];
    return profiles[other]?.full_name || profiles[other]?.email || "Direct chat";
  };

  const send = async () => {
    if (!activeId || (!text.trim() && !fileRef.current?.files?.[0])) return;
    setSending(true);
    let file_url: string | null = null;
    let file_name: string | null = null;
    const file = fileRef.current?.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({ title: "File too large", description: "Max 10MB", variant: "destructive" });
        setSending(false); return;
      }
      const path = `${user.id}/${Date.now()}-${file.name}`;
      const { error: upErr } = await supabase.storage.from("chat-files").upload(path, file);
      if (upErr) { toast({ title: "Upload failed", description: upErr.message, variant: "destructive" }); setSending(false); return; }
      const { data: signed } = await supabase.storage.from("chat-files").createSignedUrl(path, 60 * 60 * 24 * 365);
      file_url = signed?.signedUrl ?? null;
      file_name = file.name;
    }
    const { error } = await supabase.from("messages").insert({
      conversation_id: activeId, sender_id: user.id, content: text.trim() || null, file_url, file_name,
    });
    setSending(false);
    if (error) { toast({ title: "Send failed", description: error.message, variant: "destructive" }); return; }
    setText("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const startDM = async (otherId: string) => {
    // Check existing 1:1
    const dmCandidates = convs.filter(c => !c.is_group);
    for (const c of dmCandidates) {
      const ms = members[c.id] || [];
      if (ms.length === 2 && ms.includes(otherId) && ms.includes(user.id)) {
        setActiveId(c.id); setShowNew(false); return;
      }
    }
    const { data: c, error } = await supabase
      .from("conversations").insert({ is_group: false, created_by: user.id }).select().single();
    if (error || !c) { toast({ title: "Failed", description: error?.message, variant: "destructive" }); return; }
    await supabase.from("conversation_members").insert([
      { conversation_id: c.id, user_id: user.id },
      { conversation_id: c.id, user_id: otherId },
    ]);
    await loadConversations();
    setActiveId(c.id); setShowNew(false);
  };

  const createGroup = async () => {
    const name = prompt("Group name (e.g. Form 1 ICT):");
    if (!name?.trim()) return;
    const { data: c, error } = await supabase
      .from("conversations").insert({ is_group: true, name: name.trim(), created_by: user.id }).select().single();
    if (error || !c) { toast({ title: "Failed", description: error?.message, variant: "destructive" }); return; }
    await supabase.from("conversation_members").insert({ conversation_id: c.id, user_id: user.id });
    await loadConversations();
    setActiveId(c.id);
    toast({ title: "Group created", description: "Invite members from the members panel." });
  };

  const addMember = async (uid: string) => {
    if (!activeId) return;
    const { error } = await supabase.from("conversation_members").insert({ conversation_id: activeId, user_id: uid });
    if (error) toast({ title: "Failed", description: error.message, variant: "destructive" });
    else { await loadConversations(); toast({ title: "Member added" }); }
  };

  const otherUsers = useMemo(() => allUsers.filter(u => u.id !== user.id), [allUsers, user.id]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-2 md:px-4 pt-20 pb-4 max-w-6xl">
        <div className="grid md:grid-cols-[280px_1fr] gap-4 h-[calc(100vh-6rem)]">
          {/* Sidebar */}
          <aside className={`glass-card rounded-2xl border border-primary/20 p-3 overflow-y-auto ${activeId ? "hidden md:block" : ""}`}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-heading font-bold text-lg flex items-center gap-2"><MessageSquare size={18} /> Chats</h2>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" title="New direct chat" onClick={() => setShowNew(true)}><Plus size={16} /></Button>
                <Button size="icon" variant="ghost" title="New group" onClick={createGroup}><Users size={16} /></Button>
              </div>
            </div>
            {convs.length === 0 && <p className="text-xs text-muted-foreground p-2">No chats yet. Tap + to start one.</p>}
            <ul className="space-y-1">
              {convs.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => setActiveId(c.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeId === c.id ? "bg-primary/20 text-foreground" : "hover:bg-primary/10 text-muted-foreground"}`}
                  >
                    <div className="flex items-center gap-2">
                      {c.is_group ? <Users size={14} /> : <MessageSquare size={14} />}
                      <span className="truncate font-medium">{convTitle(c)}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Main */}
          <section className={`glass-card rounded-2xl border border-primary/20 flex flex-col overflow-hidden ${!activeId ? "hidden md:flex" : "flex"}`}>
            {!active ? (
              <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm p-8 text-center">
                Select a chat or start a new one.
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between px-4 py-3 border-b border-primary/15">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setActiveId(null)} className="md:hidden"><ArrowLeft size={18} /></button>
                    <div>
                      <h3 className="font-semibold">{convTitle(active)}</h3>
                      <p className="text-xs text-muted-foreground">{activeMembers.length} member{activeMembers.length !== 1 && "s"}</p>
                    </div>
                  </div>
                  {active.is_group && (
                    <Button size="sm" variant="outline" onClick={() => setShowMembers(s => !s)}>
                      <Users size={14} className="mr-1" /> Members
                    </Button>
                  )}
                </div>

                {showMembers && active.is_group && (
                  <div className="border-b border-primary/15 p-3 max-h-48 overflow-y-auto bg-background/40">
                    <p className="text-xs font-semibold mb-2">Add members</p>
                    <div className="space-y-1">
                      {otherUsers.filter(u => !activeMembers.includes(u.id)).map(u => (
                        <button key={u.id} onClick={() => addMember(u.id)} className="w-full text-left text-xs px-2 py-1.5 rounded hover:bg-primary/15 flex justify-between items-center">
                          <span>{u.full_name || u.email}</span><Plus size={12} />
                        </button>
                      ))}
                      {otherUsers.filter(u => !activeMembers.includes(u.id)).length === 0 && (
                        <p className="text-xs text-muted-foreground">Everyone is already in.</p>
                      )}
                    </div>
                  </div>
                )}

                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((m) => {
                    const mine = m.sender_id === user.id;
                    const sender = profiles[m.sender_id];
                    return (
                      <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${mine ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                          {!mine && <p className="text-[10px] opacity-70 mb-0.5">{sender?.full_name || sender?.email || "Member"}</p>}
                          {m.content && <p className="whitespace-pre-wrap break-words">{m.content}</p>}
                          {m.file_url && (
                            <a href={m.file_url} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1 text-xs underline">
                              <Download size={12} /> {m.file_name || "file"}
                            </a>
                          )}
                          <p className="text-[10px] opacity-60 mt-0.5">{new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                        </div>
                      </div>
                    );
                  })}
                  {messages.length === 0 && <p className="text-center text-xs text-muted-foreground">No messages yet — say hi!</p>}
                </div>

                <div className="border-t border-primary/15 p-3 flex items-center gap-2">
                  <input ref={fileRef} type="file" className="hidden" id="chatfile" />
                  <Button size="icon" variant="ghost" type="button" onClick={() => fileRef.current?.click()} title="Attach file">
                    <Paperclip size={18} />
                  </Button>
                  <Input
                    placeholder="Type a message…"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                  />
                  <Button onClick={send} disabled={sending}>
                    {sending ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
                  </Button>
                </div>
                {fileRef.current?.files?.[0] && (
                  <p className="text-xs px-4 pb-2 text-muted-foreground">Attached: {fileRef.current.files[0].name}</p>
                )}
              </>
            )}
          </section>
        </div>
      </div>

      {/* New DM dialog */}
      {showNew && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setShowNew(false)}>
          <div className="glass-card rounded-2xl border border-primary/20 max-w-md w-full p-5" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-heading font-bold text-lg mb-3">Start a chat</h3>
            <div className="space-y-1 max-h-80 overflow-y-auto">
              {otherUsers.length === 0 && <p className="text-sm text-muted-foreground">No other members yet.</p>}
              {otherUsers.map(u => (
                <button key={u.id} onClick={() => startDM(u.id)} className="w-full text-left px-3 py-2 rounded-lg hover:bg-primary/15 flex items-center gap-3">
                  <img src={u.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(u.full_name || u.email || "u")}`} alt="" className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="text-sm font-medium">{u.full_name || "Member"}</p>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                  </div>
                </button>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-3" onClick={() => setShowNew(false)}>Cancel</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
