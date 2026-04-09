import { Target, Eye, Users, Sparkles, Award, Lightbulb } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import aboutBg from "@/assets/about-bg.jpg";

const values = [
  { icon: Sparkles, title: "Innovation", desc: "Pushing boundaries in technology and creative problem-solving" },
  { icon: Award, title: "Excellence", desc: "Maintaining high standards in every project we undertake" },
  { icon: Users, title: "Collaboration", desc: "Working together to achieve more than any individual can" },
  { icon: Lightbulb, title: "Creativity", desc: "Encouraging fresh ideas and unconventional approaches" },
];

const AboutSection = () => {
  return (
    <section id="about" className="relative overflow-hidden">
      {/* Light section */}
      <div className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-label">About Us</span>
              <h2 className="section-title">
                Building Tomorrow's <span className="text-gradient">Innovators</span>
              </h2>
              <p className="section-desc">
                The St Lawrence Crown City ICT Club was established to create an environment where students can explore their technological interests, learn new skills, and collaborate on innovative projects.
              </p>
            </div>
          </AnimatedSection>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
            <AnimatedSection delay={100}>
              <div className="glass-card rounded-2xl p-8 card-hover glow-border h-full">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <Target className="text-primary" size={28} />
                </div>
                <h3 className="font-heading font-bold text-2xl text-foreground mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  To foster creativity, problem-solving, and critical thinking skills through practical ICT activities such as coding, robotics, web development, graphic design, and digital media production.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <div className="glass-card rounded-2xl p-8 card-hover glow-border h-full">
                <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-5">
                  <Eye className="text-secondary" size={28} />
                </div>
                <h3 className="font-heading font-bold text-2xl text-foreground mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  To become a leading student-led technology community in Mpigi and beyond, inspiring innovation and digital literacy among young learners.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Dark values section with background image */}
      <div className="relative py-20 md:py-28 overflow-hidden">
        <img src={aboutBg} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" width={1920} height={800} />
        <div className="absolute inset-0 bg-foreground/80" />
        
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection>
            <div className="section-header">
              <span className="text-glow font-heading font-semibold text-sm uppercase tracking-[0.25em] mb-3 inline-block">Our Values</span>
              <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary-foreground mb-5 leading-tight">
                What Drives Us
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 100}>
                <div className="text-center p-6 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 hover:bg-primary-foreground/10 transition-all duration-500">
                  <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="text-glow" size={26} />
                  </div>
                  <h3 className="font-heading font-semibold text-primary-foreground text-lg mb-2">{value.title}</h3>
                  <p className="text-primary-foreground/60 text-sm leading-relaxed">{value.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Stats */}
          <AnimatedSection delay={200}>
            <div className="flex flex-wrap justify-center gap-12 md:gap-20 mt-16 pt-16 border-t border-primary-foreground/10">
              {[
                { value: "20", label: "Active Members" },
                { value: "10+", label: "Projects Completed" },
                { value: "5+", label: "Workshops / Year" },
                { value: "3", label: "Competition Wins" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-heading font-bold text-4xl md:text-5xl text-glow">{stat.value}</p>
                  <p className="text-primary-foreground/50 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
