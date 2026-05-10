import { useState } from "react";
import { Gamepad2, Trophy, RefreshCw, Check, X as XIcon, Sparkles } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

type Question = {
  q: string;
  options: string[];
  answer: number;
  fact: string;
};

const QUESTIONS: Question[] = [
  {
    q: "What does 'ICT' stand for?",
    options: [
      "International Computer Tech",
      "Information & Communication Technology",
      "Internet Cloud Tools",
      "Integrated Coding Team",
    ],
    answer: 1,
    fact: "ICT empowers learning, business, and innovation worldwide.",
  },
  {
    q: "Which language is used to style web pages?",
    options: ["HTML", "Python", "CSS", "C++"],
    answer: 2,
    fact: "CSS gives websites their colours, layouts, and animations.",
  },
  {
    q: "What is the brain of a computer?",
    options: ["RAM", "GPU", "Motherboard", "CPU"],
    answer: 3,
    fact: "The CPU executes instructions that make everything happen.",
  },
  {
    q: "Which company makes the Android operating system?",
    options: ["Apple", "Microsoft", "Google", "Samsung"],
    answer: 2,
    fact: "Android powers more than 70% of the world's smartphones.",
  },
  {
    q: "What does 'AI' commonly stand for?",
    options: [
      "Automated Internet",
      "Artificial Intelligence",
      "Application Interface",
      "Advanced Iteration",
    ],
    answer: 1,
    fact: "AI helps computers learn patterns and make smart decisions.",
  },
  {
    q: "Which of these is a programming language?",
    options: ["HTTP", "JPEG", "Python", "Wi-Fi"],
    answer: 2,
    fact: "Python is beginner-friendly and used by NASA, Google & more.",
  },
];

const accents = [
  "from-blue-pop/20 to-primary/20 border-blue-pop/40",
  "from-pink-pop/20 to-primary/20 border-pink-pop/40",
  "from-yellow-pop/20 to-primary/20 border-yellow-pop/40",
  "from-primary/20 to-secondary/20 border-primary/40",
];

const GamesSection = () => {
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
    if (index + 1 >= QUESTIONS.length) {
      setDone(true);
    } else {
      setIndex((n) => n + 1);
      setSelected(null);
    }
  };

  const reset = () => {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  };

  return (
    <section id="games" className="relative py-20 md:py-28 overflow-hidden bg-background">
      <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-yellow-pop/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-blue-pop/10 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-label inline-flex items-center gap-2">
              <Gamepad2 size={14} className="text-pink-pop" />
              ICT Mini Game
            </span>
            <h2 className="section-title">
              Test Your <span className="text-gradient">Tech Knowledge</span>
            </h2>
            <p className="section-desc">
              A fun trivia challenge for every aspiring techie at SLC. Play, learn, repeat 🎮
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="max-w-2xl mx-auto">
            <div className={`relative rounded-3xl border bg-gradient-to-br ${accents[index % accents.length]} backdrop-blur-sm p-6 md:p-10 shadow-2xl shadow-primary/10`}>
              {/* Score bar */}
              <div className="flex items-center justify-between mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/60 border border-border">
                  <Trophy size={14} className="text-yellow-pop" />
                  <span className="text-xs font-heading font-semibold text-foreground">
                    Score: {score}/{QUESTIONS.length}
                  </span>
                </div>
                <span className="text-xs font-heading font-semibold text-muted-foreground tracking-wider uppercase">
                  Q {Math.min(index + 1, QUESTIONS.length)} / {QUESTIONS.length}
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 bg-background/60 rounded-full overflow-hidden mb-8">
                <div
                  className="h-full bg-gradient-to-r from-blue-pop via-pink-pop to-yellow-pop transition-all duration-500"
                  style={{ width: `${((done ? QUESTIONS.length : index) / QUESTIONS.length) * 100}%` }}
                />
              </div>

              {!done ? (
                <>
                  <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-6 leading-snug">
                    {current.q}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {current.options.map((opt, i) => {
                      const isCorrect = i === current.answer;
                      const isPicked = selected === i;
                      const reveal = selected !== null;
                      return (
                        <button
                          key={i}
                          onClick={() => choose(i)}
                          disabled={reveal}
                          className={`group text-left px-4 py-3.5 rounded-xl border transition-all duration-300 font-medium text-sm md:text-base flex items-center justify-between gap-3
                            ${
                              reveal && isCorrect
                                ? "bg-primary/20 border-primary text-foreground"
                                : reveal && isPicked && !isCorrect
                                ? "bg-destructive/15 border-destructive text-foreground"
                                : "bg-background/60 border-border text-foreground hover:border-primary/60 hover:bg-background/80 hover:scale-[1.02]"
                            }
                            ${reveal ? "cursor-default" : "cursor-pointer"}
                          `}
                        >
                          <span>{opt}</span>
                          {reveal && isCorrect && <Check size={18} className="text-primary" />}
                          {reveal && isPicked && !isCorrect && (
                            <XIcon size={18} className="text-destructive" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {selected !== null && (
                    <div className="mt-6 p-4 rounded-xl bg-background/60 border border-border animate-fade-in">
                      <p className="text-sm text-muted-foreground flex items-start gap-2">
                        <Sparkles size={14} className="text-yellow-pop mt-0.5 shrink-0" />
                        <span>
                          <span className="text-foreground font-semibold">Did you know?</span>{" "}
                          {current.fact}
                        </span>
                      </p>
                      <button
                        onClick={next}
                        className="mt-4 w-full sm:w-auto px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-sm hover:bg-primary/90 transition-all hover:scale-105"
                      >
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
                    {score === QUESTIONS.length
                      ? "Perfect Score! 🏆"
                      : score >= QUESTIONS.length / 2
                      ? "Well Played! 🎉"
                      : "Keep Learning! 💪"}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    You scored <span className="text-glow font-bold">{score}</span> out of{" "}
                    {QUESTIONS.length}.
                  </p>
                  <button
                    onClick={reset}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-heading font-semibold hover:bg-primary/90 transition-all hover:scale-105"
                  >
                    <RefreshCw size={16} /> Play Again
                  </button>
                </div>
              )}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default GamesSection;
