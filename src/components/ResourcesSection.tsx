import { BookOpen, Code2, MonitorSmartphone, Lightbulb, ExternalLink, FileText, Download, GraduationCap } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import successImg from "@/assets/student-success.jpg";

const resources = [
  { icon: Code2, title: "Scratch Programming", desc: "Free visual coding platform perfect for beginners to learn programming logic and game development.", link: "https://scratch.mit.edu", color: "from-orange-400 to-yellow-500" },
  { icon: MonitorSmartphone, title: "FreeCodeCamp", desc: "Comprehensive web development tutorials and industry-recognized certifications for all levels.", link: "https://freecodecamp.org", color: "from-primary to-secondary" },
  { icon: BookOpen, title: "Khan Academy", desc: "Interactive lessons on computer science, algorithms, cryptography, and web design.", link: "https://khanacademy.org/computing", color: "from-green-400 to-teal-500" },
  { icon: Lightbulb, title: "Canva for Education", desc: "Free graphic design tool for creating posters, presentations, social media graphics, and digital art.", link: "https://canva.com/education", color: "from-purple-400 to-pink-500" },
];

const ResourcesSection = () => {
  return (
    <section id="resources" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-label">Resources</span>
            <h2 className="section-title">
              Learning <span className="text-gradient">Tools & Guides</span>
            </h2>
            <p className="section-desc">
              Explore free tools and tutorials to enhance your ICT skills and keep learning beyond the classroom.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          {resources.map((res, i) => (
            <AnimatedSection key={res.title} delay={i * 100}>
              <a
                href={res.link}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-2xl p-7 card-hover glow-border group block h-full"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${res.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500`}>
                  <res.icon className="text-primary-foreground" size={26} />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-2 flex items-center gap-2">
                  {res.title}
                  <ExternalLink size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{res.desc}</p>
              </a>
            </AnimatedSection>
          ))}
        </div>

        {/* Downloadable study materials */}
        <AnimatedSection delay={200}>
          <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden border border-border bg-gradient-to-br from-blue-pop/10 via-pink-pop/5 to-yellow-pop/10 grid md:grid-cols-2 gap-0">
            <div className="relative min-h-[260px] overflow-hidden">
              <img
                src={successImg}
                alt="Books, globe, and a graduation cap symbolising student success"
                width={736}
                height={736}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/10 to-transparent md:bg-gradient-to-l" />
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-pop/20 backdrop-blur-md border border-yellow-pop/40">
                <GraduationCap size={14} className="text-yellow-pop" />
                <span className="text-xs font-heading font-semibold text-foreground uppercase tracking-wider">
                  Study Hub
                </span>
              </div>
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <h3 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-3">
                Unlocking Student Success Through{" "}
                <span className="text-gradient">Formal Education</span>
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Download official past papers, set exams, and study guides curated by our
                academic team. Practice, prepare and excel.
              </p>
              <div className="space-y-3">
                <a
                  href="/resources/FORM_2_SET_3_EXAMS.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 p-4 rounded-xl border border-border bg-background/60 hover:border-pink-pop/60 hover:bg-background/80 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-lg bg-pink-pop/15 border border-pink-pop/30 flex items-center justify-center shrink-0">
                      <FileText size={20} className="text-pink-pop" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-heading font-semibold text-foreground text-sm truncate">
                        Form 2 — Set 3 Exams
                      </p>
                      <p className="text-xs text-muted-foreground">PDF · Past paper</p>
                    </div>
                  </div>
                  <Download
                    size={18}
                    className="text-muted-foreground group-hover:text-glow group-hover:translate-y-0.5 transition-all shrink-0"
                  />
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ResourcesSection;
