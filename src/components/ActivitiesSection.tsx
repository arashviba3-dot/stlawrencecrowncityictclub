import activitiesCoding from "@/assets/activities-coding.jpg";
import activitiesWeb from "@/assets/activities-web.jpg";
import activitiesDesign from "@/assets/activities-design.jpg";
import activitiesCompetition from "@/assets/activities-competition.jpg";
import { Code, Globe, Palette, Trophy } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const activities = [
  {
    icon: Code,
    title: "Coding & Robotics",
    description: "Programming workshops where students learn Python, Scratch, and build robotics projects with hands-on mentoring.",
    image: activitiesCoding,
    color: "from-primary/80 to-primary/40",
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "Students design and build real websites, learning HTML, CSS, and modern web tools through collaborative projects.",
    image: activitiesWeb,
    color: "from-secondary/80 to-secondary/40",
  },
  {
    icon: Palette,
    title: "Graphic Design",
    description: "Creative digital art and graphic design sessions where students develop visual communication skills.",
    image: activitiesDesign,
    color: "from-accent/80 to-accent/40",
  },
  {
    icon: Trophy,
    title: "Competitions",
    description: "Students participate in tech competitions, showcasing their skills and winning awards at regional events.",
    image: activitiesCompetition,
    color: "from-primary/80 to-secondary/40",
  },
];

const ActivitiesSection = () => {
  return (
    <section id="activities" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-label">Activities & Projects</span>
            <h2 className="section-title">
              What We <span className="text-gradient">Create</span>
            </h2>
            <p className="section-desc">
              From programming workshops to design competitions, our club engages students in hands-on ICT experiences that build real skills.
            </p>
          </div>
        </AnimatedSection>

        {/* Bento-style grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {activities.map((activity, i) => (
            <AnimatedSection key={activity.title} delay={i * 100}>
              <div className={`group relative rounded-2xl overflow-hidden card-hover ${i === 0 ? 'md:row-span-2' : ''}`}>
                <div className={`${i === 0 ? 'h-80 md:h-full' : 'h-72'} relative`}>
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${activity.color} opacity-60 group-hover:opacity-40 transition-opacity duration-500`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                  {/* Content - slides up on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform transition-transform duration-500">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/30 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary/50 transition-colors duration-300">
                        <activity.icon className="text-primary-foreground" size={20} />
                      </div>
                      <h3 className="font-heading font-bold text-xl text-primary-foreground">{activity.title}</h3>
                    </div>
                    <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-md opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      {activity.description}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
