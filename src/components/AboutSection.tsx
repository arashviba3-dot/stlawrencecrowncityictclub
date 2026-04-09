import { Target, Eye, Users } from "lucide-react";

const stats = [
  { icon: Users, value: "20", label: "Max Members" },
  { icon: Target, value: "10+", label: "Projects Done" },
  { icon: Eye, value: "5+", label: "Workshops/Year" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-primary font-heading font-semibold text-sm uppercase tracking-widest mb-3">About Us</p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-6">
            Building Tomorrow's Innovators
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            The St Lawrence Crown City ICT Club was established to create an environment where students can explore their technological interests, learn new skills, and collaborate on innovative projects. With a maximum of 20 dedicated members, we ensure quality participation and effective mentoring.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto mb-16">
          <div className="bg-card rounded-xl p-8 shadow-sm border border-border card-hover">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Target className="text-primary" size={24} />
            </div>
            <h3 className="font-heading font-semibold text-xl text-foreground mb-3">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To foster creativity, problem-solving, and critical thinking skills through practical ICT activities such as coding, robotics, web development, graphic design, and digital media production.
            </p>
          </div>
          <div className="bg-card rounded-xl p-8 shadow-sm border border-border card-hover">
            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
              <Eye className="text-secondary" size={24} />
            </div>
            <h3 className="font-heading font-semibold text-xl text-foreground mb-3">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              To become a leading student-led technology community in Mpigi and beyond, inspiring innovation and digital literacy among young learners.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="mx-auto text-primary mb-2" size={28} />
              <p className="font-heading font-bold text-3xl text-foreground">{stat.value}</p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
