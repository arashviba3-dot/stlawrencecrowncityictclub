import { User, Crown, Shield, Wrench, PenTool, GraduationCap } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const team = [
  { name: "Club President", role: "President", icon: Crown, desc: "Leads club meetings, organizes events, and represents the club in school activities.", accent: "from-primary to-secondary" },
  { name: "Vice President", role: "Vice President", icon: Shield, desc: "Supports the president and coordinates project teams across all ICT initiatives.", accent: "from-secondary to-primary" },
  { name: "Secretary", role: "Secretary", icon: User, desc: "Manages documentation, meeting notes, and communication with members.", accent: "from-primary to-accent" },
  { name: "Tech Lead", role: "Technical Lead", icon: Wrench, desc: "Guides students through coding workshops and oversees technical projects.", accent: "from-secondary to-primary" },
  { name: "Design Lead", role: "Design Lead", icon: PenTool, desc: "Leads graphic design and digital media production activities.", accent: "from-accent to-primary" },
  { name: "Club Patron", role: "Staff Patron", icon: GraduationCap, desc: "Provides mentorship and guidance to club members on all activities.", accent: "from-primary to-secondary" },
];

const TeamSection = () => {
  return (
    <section id="team" className="py-20 md:py-28 section-alt">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-label">Our Team</span>
            <h2 className="section-title">
              Meet the <span className="text-gradient">Leaders</span>
            </h2>
            <p className="section-desc">
              Our club is driven by passionate student leaders who organize events, mentor peers, and push innovation forward.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {team.map((member, i) => (
            <AnimatedSection key={member.role} delay={i * 80}>
              <div className="glass-card rounded-2xl p-7 text-center card-hover glow-border group">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.accent} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-500`}>
                  <member.icon className="text-primary-foreground" size={32} />
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground">{member.name}</h3>
                <p className="text-primary text-sm font-semibold mb-3 tracking-wide">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
