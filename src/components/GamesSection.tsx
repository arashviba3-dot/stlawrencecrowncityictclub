import { useEffect, useState } from "react";
import { Gamepad2, Trophy, RefreshCw, Check, X as XIcon, Sparkles, Brain, Shuffle, Timer } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

type Question = {
  q: string;
  options: string[];
  answer: number;
  fact: string;
};

const QUESTIONS: Question[] = [
  { q: "What does 'ICT' stand for?", options: ["International Computer Tech", "Information & Communication Technology", "Internet Cloud Tools", "Integrated Coding Team"], answer: 1, fact: "ICT empowers learning, business, and innovation worldwide." },
  { q: "Which language is used to style web pages?", options: ["HTML", "Python", "CSS", "C++"], answer: 2, fact: "CSS gives websites their colours, layouts, and animations." },
  { q: "What is the brain of a computer?", options: ["RAM", "GPU", "Motherboard", "CPU"], answer: 3, fact: "The CPU executes instructions that make everything happen." },
  { q: "Which company makes the Android operating system?", options: ["Apple", "Microsoft", "Google", "Samsung"], answer: 2, fact: "Android powers more than 70% of the world's smartphones." },
  { q: "What does 'AI' commonly stand for?", options: ["Automated Internet", "Artificial Intelligence", "Application Interface", "Advanced Iteration"], answer: 1, fact: "AI helps computers learn patterns and make smart decisions." },
  { q: "Which of these is a programming language?", options: ["HTTP", "JPEG", "Python", "Wi-Fi"], answer: 2, fact: "Python is beginner-friendly and used by NASA, Google & more." },
  { q: "What does 'URL' stand for?", options: ["Universal Resource Locator", "Uniform Resource Locator", "United Routing Link", "User Reference Line"], answer: 1, fact: "Every web address you type is a URL." },
  { q: "Which device stores data permanently?", options: ["RAM", "Cache", "Hard Drive", "CPU"], answer: 2, fact: "Hard drives and SSDs keep data even when the power is off." },
  { q: "Who is known as the father of computers?", options: ["Bill Gates", "Charles Babbage", "Steve Jobs", "Alan Turing"], answer: 1, fact: "Charles Babbage designed the first mechanical computer." },
  { q: "What does 'HTTPS' provide that 'HTTP' does not?", options: ["Speed", "Security", "Storage", "Style"], answer: 1, fact: "The 'S' stands for Secure — it encrypts the connection." },
];

const accents = [
  "from-blue-pop/20 to-primary/20 border-blue-pop/40",
  "from-pink-pop/20 to-primary/20 border-pink-pop/40",
  "from-yellow-pop/20 to-primary/20 border-yellow-pop/40",
  "from-purple-pop/20 to-primary/20 border-purple-pop/40",
  "from-orange-pop/20 to-primary/20 border-orange-pop/40",
  "from-teal-pop/20 to-primary/20 border-teal-pop/40",
];

const SCRAMBLE_WORDS: { word: string; hint: string }[] = [
  { word: "INTERNET", hint: "Global network of networks" },
  { word: "PYTHON", hint: "Beginner-friendly programming language" },
  { word: "ROBOTICS", hint: "Building machines that move and think" },
  { word: "KEYBOARD", hint: "You type with this device" },
  { word: "BROWSER", hint: "Chrome, Firefox, Edge…" },
  { word: "ALGORITHM", hint: "A step-by-step set of instructions" },
  { word: "DATABASE", hint: "Where structured data is stored" },
  { word: "MONITOR", hint: "The screen you look at" },
];

const shuffle = (s: string) => {
  const a = s.split("");
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  const r = a.join("");
  return r === s ? shuffle(s) : r;
};

const TriviaGame = () => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const current = QUESTIONS[index];

  const choose = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === current.answer) setScore((s) => s + 1);
  };
  const next = () => {
    if (index + 1 >= QUESTIONS.length) setDone(true);
    else { setIndex((n) => n + 1); setSelected(null); }
  };
  const reset = () => { setIndex(0); setSelected(null); setScore(0); setDone(false); };

  return (
    <div className={`relative rounded-3xl border bg-gradient-to-br ${accents[index % accents.length]} backdrop-blur-sm p-6 md:p-10 shadow-2xl shadow-primary/10`}>
      <div className="flex items-center justify-between mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/60 border border-border">
          <Trophy size={14} className="text-yellow-pop" />
          <span className="text-xs font-heading font-semibold text-foreground">Score: {score}/{QUESTIONS.length}</span>
        </div>
        <span className="text-xs font-heading font-semibold text-muted-foreground tracking-wider uppercase">
          Q {Math.min(index + 1, QUESTIONS.length)} / {QUESTIONS.length}
        </span>
      </div>
      <div className="h-1.5 bg-background/60 rounded-full overflow-hidden mb-8">
        <div className="h-full bg-gradient-to-r from-blue-pop via-pink-pop to-yellow-pop transition-all duration-500" style={{ width: `${((done ? QUESTIONS.length : index) / QUESTIONS.length) * 100}%` }} />
      </div>

      {!done ? (
        <>
          <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-6 leading-snug">{current.q}</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {current.options.map((opt, i) => {
              const isCorrect = i === current.answer;
              const isPicked = selected === i;
              const reveal = selected !== null;
              return (
                <button key={i} onClick={() => choose(i)} disabled={reveal}
                  className={`group text-left px-4 py-3.5 rounded-xl border transition-all duration-300 font-medium text-sm md:text-base flex items-center justify-between gap-3
                    ${reveal && isCorrect ? "bg-primary/20 border-primary text-foreground"
                      : reveal && isPicked && !isCorrect ? "bg-destructive/15 border-destructive text-foreground"
                      : "bg-background/60 border-border text-foreground hover:border-primary/60 hover:bg-background/80 hover:scale-[1.02]"}
                    ${reveal ? "cursor-default" : "cursor-pointer"}`}>
                  <span>{opt}</span>
                  {reveal && isCorrect && <Check size={18} className="text-primary" />}
                  {reveal && isPicked && !isCorrect && <XIcon size={18} className="text-destructive" />}
                </button>
              );
            })}
          </div>
          {selected !== null && (
            <div className="mt-6 p-4 rounded-xl bg-background/60 border border-border animate-fade-in">
              <p className="text-sm text-muted-foreground flex items-start gap-2">
                <Sparkles size={14} className="text-yellow-pop mt-0.5 shrink-0" />
                <span><span className="text-foreground font-semibold">Did you know?</span> {current.fact}</span>
              </p>
              <button onClick={next} className="mt-4 w-full sm:w-auto px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-sm hover:bg-primary/90 transition-all hover:scale-105">
                {index + 1 >= QUESTIONS.length ? "See Results" : "Next Question →"}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-6 animate-fade-in">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-yellow-pop to-pink-pop flex items-center justify-center mb-5 shadow-xl shadow-pink-pop/30">
            <Trophy size={36} className="text-background" />
          </div>
          <h3 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-2">
            {score === QUESTIONS.length ? "Perfect Score! 🏆" : score >= QUESTIONS.length / 2 ? "Well Played! 🎉" : "Keep Learning! 💪"}
          </h3>
          <p className="text-muted-foreground mb-6">You scored <span className="text-glow font-bold">{score}</span> out of {QUESTIONS.length}.</p>
          <button onClick={reset} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-heading font-semibold hover:bg-primary/90 transition-all hover:scale-105">
            <RefreshCw size={16} /> Play Again
          </button>
        </div>
      )}
    </div>
  );
};

const ScrambleGame = () => {
  const [idx, setIdx] = useState(0);
  const [scrambled, setScrambled] = useState(() => shuffle(SCRAMBLE_WORDS[0].word));
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"ok" | "no" | null>(null);
  const [time, setTime] = useState(45);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    if (time <= 0) { setDone(true); return; }
    const t = setTimeout(() => setTime((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [time, done]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guess.trim().toUpperCase() === SCRAMBLE_WORDS[idx].word) {
      setScore((s) => s + 1);
      setFeedback("ok");
      setTimeout(nextWord, 500);
    } else {
      setFeedback("no");
      setTimeout(() => setFeedback(null), 700);
    }
  };
  const nextWord = () => {
    const n = (idx + 1) % SCRAMBLE_WORDS.length;
    setIdx(n);
    setScrambled(shuffle(SCRAMBLE_WORDS[n].word));
    setGuess("");
    setFeedback(null);
  };
  const reset = () => { setIdx(0); setScrambled(shuffle(SCRAMBLE_WORDS[0].word)); setGuess(""); setScore(0); setTime(45); setDone(false); setFeedback(null); };

  return (
    <div className="relative rounded-3xl border bg-gradient-to-br from-purple-pop/20 to-orange-pop/20 border-purple-pop/40 backdrop-blur-sm p-6 md:p-10 shadow-2xl shadow-purple-pop/10">
      <div className="flex items-center justify-between mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/60 border border-border">
          <Trophy size={14} className="text-orange-pop" />
          <span className="text-xs font-heading font-semibold text-foreground">Score: {score}</span>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/60 border border-border">
          <Timer size={14} className="text-teal-pop" />
          <span className="text-xs font-heading font-semibold text-foreground">{time}s</span>
        </div>
      </div>

      {!done ? (
        <>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Hint</p>
          <p className="text-foreground/80 mb-6">{SCRAMBLE_WORDS[idx].hint}</p>
          <div className="text-center mb-6">
            <span className="inline-block font-heading font-black text-3xl md:text-5xl tracking-[0.4em] text-gradient">
              {scrambled}
            </span>
          </div>
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
            <input
              autoFocus
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Type the unscrambled word…"
              className={`flex-1 px-4 py-3 rounded-xl bg-background/60 border text-foreground outline-none transition-colors
                ${feedback === "ok" ? "border-primary" : feedback === "no" ? "border-destructive" : "border-border focus:border-purple-pop"}`}
            />
            <button type="submit" className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-pop to-orange-pop text-primary-foreground font-heading font-semibold hover:scale-105 transition-transform">
              Check
            </button>
            <button type="button" onClick={nextWord} className="px-4 py-3 rounded-xl border border-border text-foreground hover:bg-background/60 inline-flex items-center gap-2">
              <Shuffle size={14} /> Skip
            </button>
          </form>
        </>
      ) : (
        <div className="text-center py-6 animate-fade-in">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-pop to-orange-pop flex items-center justify-center mb-5 shadow-xl shadow-purple-pop/30">
            <Brain size={36} className="text-background" />
          </div>
          <h3 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-2">Time's Up! ⏱️</h3>
          <p className="text-muted-foreground mb-6">You unscrambled <span className="text-glow font-bold">{score}</span> words.</p>
          <button onClick={reset} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-heading font-semibold hover:bg-primary/90 transition-all hover:scale-105">
            <RefreshCw size={16} /> Play Again
          </button>
        </div>
      )}
    </div>
  );
};

const GamesSection = () => {
  const [tab, setTab] = useState<"trivia" | "scramble">("trivia");

  return (
    <section id="games" className="relative py-20 md:py-28 overflow-hidden bg-background">
      <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-yellow-pop/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-blue-pop/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-purple-pop/10 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-label inline-flex items-center gap-2">
              <Gamepad2 size={14} className="text-pink-pop" />
              ICT Mini Games
            </span>
            <h2 className="section-title">
              Play. Learn. <span className="text-gradient">Level Up.</span>
            </h2>
            <p className="section-desc">
              Two fun challenges for every aspiring techie at SLC. Pick a game and test your skills 🎮
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={80}>
          <div className="flex justify-center gap-2 mb-8">
            <button
              onClick={() => setTab("trivia")}
              className={`px-5 py-2.5 rounded-full font-heading font-semibold text-sm inline-flex items-center gap-2 transition-all ${
                tab === "trivia" ? "bg-gradient-to-r from-blue-pop to-pink-pop text-primary-foreground shadow-lg shadow-pink-pop/30" : "bg-background/60 border border-border text-foreground hover:border-primary/60"
              }`}
            >
              <Brain size={14} /> Tech Trivia
            </button>
            <button
              onClick={() => setTab("scramble")}
              className={`px-5 py-2.5 rounded-full font-heading font-semibold text-sm inline-flex items-center gap-2 transition-all ${
                tab === "scramble" ? "bg-gradient-to-r from-purple-pop to-orange-pop text-primary-foreground shadow-lg shadow-purple-pop/30" : "bg-background/60 border border-border text-foreground hover:border-primary/60"
              }`}
            >
              <Shuffle size={14} /> Word Scramble
            </button>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={120}>
          <div className="max-w-2xl mx-auto">
            {tab === "trivia" ? <TriviaGame /> : <ScrambleGame />}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default GamesSection;
