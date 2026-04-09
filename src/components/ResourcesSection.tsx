import { BookOpen, Code2, MonitorSmartphone, Lightbulb, ExternalLink } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
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
      </div>
    </section>
  );
};

export default ResourcesSection;
