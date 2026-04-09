import activitiesCoding from "@/assets/activities-coding.jpg";
import activitiesWeb from "@/assets/activities-web.jpg";
import activitiesDesign from "@/assets/activities-design.jpg";
import { Code, Globe, Palette, Video } from "lucide-react";

const activities = [
  {
    icon: Code,
    title: "Coding & Robotics",
    description: "Programming workshops where students learn Python, Scratch, and build robotics projects with hands-on mentoring.",
    image: activitiesCoding,
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "Students design and build real websites, learning HTML, CSS, and modern web tools through collaborative projects.",
    image: activitiesWeb,
  },
  {
    icon: Palette,
    title: "Graphic Design",
    description: "Creative digital art and graphic design sessions where students develop visual communication skills.",
    image: activitiesDesign,
  },
  {
    icon: Video,
    title: "Digital Storytelling",
    description: "Students produce digital media content, video stories, and presentations that showcase their creativity.",
    image: null,
  },
];

const ActivitiesSection = () => {
  return (
    <section id="activities" className="py-20 md:py-28 section-alt">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary font-heading font-semibold text-sm uppercase tracking-widest mb-3">Activities & Projects</p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
            What We Do
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From programming workshops to design competitions, our club engages students in hands-on ICT experiences.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {activities.map((activity) => (
            <div key={activity.title} className="bg-card rounded-xl overflow-hidden shadow-sm border border-border card-hover group">
              {activity.image ? (
                <div className="h-48 overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <activity.icon className="text-primary" size={48} />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <activity.icon className="text-primary" size={18} />
                  <h3 className="font-heading font-semibold text-foreground">{activity.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
