import { BookOpen, Code2, MonitorSmartphone, Lightbulb } from "lucide-react";

const resources = [
  { icon: Code2, title: "Scratch Programming", desc: "Free visual coding platform perfect for beginners to learn programming logic.", link: "https://scratch.mit.edu" },
  { icon: MonitorSmartphone, title: "FreeCodeCamp", desc: "Comprehensive web development tutorials and certifications for all levels.", link: "https://freecodecamp.org" },
  { icon: BookOpen, title: "Khan Academy Computing", desc: "Interactive lessons on computer science, algorithms, and web design.", link: "https://khanacademy.org/computing" },
  { icon: Lightbulb, title: "Canva for Education", desc: "Free graphic design tool for creating posters, presentations, and digital art.", link: "https://canva.com/education" },
];

const ResourcesSection = () => {
  return (
    <section id="resources" className="py-20 md:py-28 section-alt">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary font-heading font-semibold text-sm uppercase tracking-widest mb-3">Resources</p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
            Learning Tools & Guides
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore free tools and tutorials to enhance your ICT skills independently.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {resources.map((res) => (
            <a
              key={res.title}
              href={res.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card rounded-xl p-6 shadow-sm border border-border card-hover group block"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <res.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">{res.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{res.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
