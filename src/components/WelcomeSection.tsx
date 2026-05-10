import { Globe, Film, Music2, Palette, Sparkles, Rocket, ShieldCheck, Users } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import schoolCrest from "@/assets/school-crest.jpg";
import studentsUniform from "@/assets/students-uniform.jpg";

const highlights = [
  {
    icon: Globe,
    title: "Modern Websites",
    desc: "Clean, responsive, user-friendly designs built with the latest web tech.",
    iconBg: "bg-blue-pop/15",
    iconColor: "text-blue-pop",
    blob: "bg-blue-pop/10 group-hover:bg-blue-pop/20",
    emoji: "🌐",
  },
  {
    icon: Film,
    title: "Video Production",
    desc: "Creative video content and visual storytelling crafted with professionalism.",
    iconBg: "bg-pink-pop/15",
    iconColor: "text-pink-pop",
    blob: "bg-pink-pop/10 group-hover:bg-pink-pop/20",
    emoji: "🎬",
  },
  {
    icon: Music2,
    title: "Music & Sound",
    desc: "Audio experiences that blend technology with raw creativity.",
    iconBg: "bg-yellow-pop/15",
    iconColor: "text-yellow-pop",
    blob: "bg-yellow-pop/10 group-hover:bg-yellow-pop/20",
    emoji: "🎶",
  },
  {
    icon: Palette,
    title: "Graphics & Branding",
    desc: "Digital graphics, branding, and artistic designs that stand out.",
    iconBg: "bg-primary/15",
    iconColor: "text-primary",
    blob: "bg-primary/10 group-hover:bg-primary/20",
    emoji: "🎨",
  },
];

const WelcomeSection = () => {
  return (
    <section id="welcome" className="relative py-20 md:py-28 overflow-hidden bg-background">
      {/* Decorative blobs */}
      <div className="absolute top-10 -left-20 w-72 h-72 rounded-full bg-blue-pop/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 rounded-full bg-pink-pop/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-yellow-pop/8 blur-[90px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-label inline-flex items-center gap-2">
              <Sparkles size={14} className="text-yellow-pop" />
              Welcome
            </span>
            <h2 className="section-title">
              Welcome to <span className="text-gradient">St Lawrence Crown City</span> ICT Club
              <span className="inline-block ml-2">💻🚀</span>
            </h2>
            <p className="section-desc">
              A dynamic and innovative community of students passionate about technology,
              creativity, and digital transformation — eager to learn, create, and lead in
              the modern digital world.
            </p>
          </div>
        </AnimatedSection>

        {/* School crest spotlight */}
        <AnimatedSection delay={50}>
          <div className="max-w-5xl mx-auto mb-14 rounded-3xl overflow-hidden border border-primary/30 bg-gradient-to-br from-blue-pop/10 via-yellow-pop/5 to-pink-pop/10 grid md:grid-cols-[260px_1fr] gap-0 items-center">
            <div className="relative flex items-center justify-center p-8 bg-gradient-to-br from-background to-background/60">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsl(var(--yellow-pop)/0.18),_transparent_70%)]" />
              <img
                src={schoolCrest}
                alt="St Lawrence Schools and Colleges crest"
                width={224}
                height={224}
                className="relative w-44 h-44 md:w-52 md:h-52 object-contain drop-shadow-[0_0_40px_hsla(45,90%,55%,0.45)] hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-8 md:p-10">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-pop/15 border border-yellow-pop/40 mb-4">
                <ShieldCheck size={14} className="text-yellow-pop" />
                <span className="text-xs font-heading font-semibold uppercase tracking-wider text-foreground">
                  St Lawrence Schools & Colleges
                </span>
              </span>
              <h3 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-3 leading-tight">
                <span className="text-blue-pop">For</span>{" "}
                <span className="text-yellow-pop">a Bright</span>{" "}
                <span className="text-pink-pop">Future</span>
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Proudly part of the St Lawrence family — a heritage of excellence, character,
                and innovation. Our ICT Club carries that legacy into the digital age.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Students spotlight */}
        <AnimatedSection delay={80}>
          <div className="max-w-5xl mx-auto mb-14 rounded-3xl overflow-hidden border border-purple-pop/30 bg-gradient-to-br from-purple-pop/10 via-blue-pop/5 to-orange-pop/10 grid md:grid-cols-2 gap-0 items-stretch">
            <div className="relative overflow-hidden min-h-[280px] md:min-h-[380px]">
              <img
                src={studentsUniform}
                alt="St Lawrence Crown City students in uniform"
                className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/70 via-transparent to-transparent" />
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-pop/15 border border-purple-pop/40 mb-4 self-start">
                <Users size={14} className="text-purple-pop" />
                <span className="text-xs font-heading font-semibold uppercase tracking-wider text-foreground">
                  Our Crown City Family
                </span>
              </span>
              <h3 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-3 leading-tight">
                Proud. <span className="text-orange-pop">Sharp.</span> <span className="text-teal-pop">Future-ready.</span>
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Students of St Lawrence Crown City — confident, smart, and disciplined.
                Behind every line of code and every project is a young mind ready to lead
                the next digital generation.
              </p>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          <AnimatedSection delay={100}>
            <div className="glass-card rounded-2xl p-8 card-hover glow-border h-full">
              <div className="w-14 h-14 rounded-xl bg-blue-pop/15 flex items-center justify-center mb-5">
                <Rocket className="text-blue-pop" size={26} />
              </div>
              <h3 className="font-heading font-bold text-2xl text-foreground mb-3">
                Real-World Skills, Real Impact
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We focus on building real-world skills through practical experience and
                collaboration. Members design and develop modern websites with clean,
                responsive, and user-friendly layouts, produce high-quality video content,
                engaging visual designs, and creative digital media that reflect both
                talent and professionalism.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <div className="glass-card rounded-2xl p-8 card-hover glow-border h-full">
              <div className="w-14 h-14 rounded-xl bg-pink-pop/15 flex items-center justify-center mb-5">
                <Sparkles className="text-pink-pop" size={26} />
              </div>
              <h3 className="font-heading font-bold text-2xl text-foreground mb-3">
                Where Creativity Meets Technology
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                The club explores music and sound production, combining technology with
                creativity to craft unique audio experiences. From editing videos to
                designing graphics and experimenting with new digital tools, our members
                are constantly pushing their limits and improving their skills.
              </p>
            </div>
          </AnimatedSection>
        </div>

        {/* Project highlights */}
        <AnimatedSection>
          <h3 className="font-heading font-bold text-2xl md:text-3xl text-center text-foreground mb-10">
            What We <span className="text-gradient">Showcase</span>
          </h3>
        </AnimatedSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          {highlights.map((h, i) => (
            <AnimatedSection key={h.title} delay={i * 100}>
              <div className="group relative rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 h-full overflow-hidden">
                <div
                  className={`absolute -top-10 -right-10 w-32 h-32 rounded-full ${h.blob} blur-2xl transition-all duration-500`}
                />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${h.iconBg} flex items-center justify-center`}
                    >
                      <h.icon className={h.iconColor} size={22} />
                    </div>
                    <span className="text-2xl">{h.emoji}</span>
                  </div>
                  <h4 className="font-heading font-semibold text-lg text-foreground mb-2">
                    {h.title}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{h.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Mission CTA */}
        <AnimatedSection delay={200}>
          <div className="relative rounded-3xl overflow-hidden max-w-5xl mx-auto p-10 md:p-14 text-center bg-gradient-to-br from-primary/15 via-pink-pop/10 to-yellow-pop/10 border border-primary/30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.15),_transparent_60%)] pointer-events-none" />
            <div className="relative">
              <p className="text-glow font-heading font-semibold uppercase tracking-[0.25em] text-xs mb-4">
                Our Mission
              </p>
              <h3 className="font-heading font-bold text-2xl md:text-4xl text-foreground mb-5 leading-tight">
                Empowering students with{" "}
                <span className="text-gradient">future-ready skills</span> in technology
                and creativity.
              </h3>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-8">
                Preparing learners to become leaders, innovators, and problem-solvers in a
                rapidly evolving world. Join us and be part of a movement shaping the
                future through technology, creativity, and innovation 🔥
              </p>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary text-primary-foreground font-heading font-semibold text-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-105"
              >
                Join the Club
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default WelcomeSection;
