import { User } from "lucide-react";

const team = [
  { name: "Club President", role: "President", desc: "Leads club meetings, organizes events, and represents the club in school activities." },
  { name: "Vice President", role: "Vice President", desc: "Supports the president and coordinates project teams across all ICT initiatives." },
  { name: "Secretary", role: "Secretary", desc: "Manages documentation, meeting notes, and communication with members." },
  { name: "Tech Lead", role: "Technical Lead", desc: "Guides students through coding workshops and oversees technical projects." },
  { name: "Design Lead", role: "Design Lead", desc: "Leads graphic design and digital media production activities." },
  { name: "Club Patron", role: "Staff Patron", desc: "Provides mentorship and guidance to club members on all activities." },
];

const TeamSection = () => {
  return (
    <section id="team" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary font-heading font-semibold text-sm uppercase tracking-widest mb-3">Our Team</p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
            Meet the Leaders
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our club is driven by passionate student leaders who organize events, mentor peers, and push innovation forward.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {team.map((member) => (
            <div key={member.role} className="bg-card rounded-xl p-6 text-center shadow-sm border border-border card-hover">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <User className="text-primary" size={28} />
              </div>
              <h3 className="font-heading font-semibold text-foreground">{member.name}</h3>
              <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{member.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
