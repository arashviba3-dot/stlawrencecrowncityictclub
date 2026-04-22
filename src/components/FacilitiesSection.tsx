import { Wifi, Monitor, Presentation, Building2 } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import smartClassroom from "@/assets/facility-smart-classroom.jpg";
import computerLab from "@/assets/facility-computer-lab.jpg";
import smartBoard from "@/assets/facility-smart-board.jpg";
import building from "@/assets/facility-building.jpg";

const facilities = [
  {
    img: smartClassroom,
    title: "Smart Classrooms",
    desc: "Modern classrooms equipped with cutting-edge technology for immersive learning.",
    icon: Monitor,
    color: "text-blue-pop",
    badge: "bg-blue-pop/15 border-blue-pop/30",
  },
  {
    img: computerLab,
    title: "High-Speed WiFi",
    desc: "Campus-wide fiber WiFi powering research, projects and collaboration.",
    icon: Wifi,
    color: "text-pink-pop",
    badge: "bg-pink-pop/15 border-pink-pop/30",
  },
  {
    img: smartBoard,
    title: "Interactive Smart Boards",
    desc: "Touch-enabled smart boards bringing every lesson to life with rich visuals.",
    icon: Presentation,
    color: "text-yellow-pop",
    badge: "bg-yellow-pop/15 border-yellow-pop/30",
  },
  {
    img: building,
    title: "Modern ICT Building",
    desc: "Purpose-built facility designed for innovation, creativity and tech excellence.",
    icon: Building2,
    color: "text-primary",
    badge: "bg-primary/15 border-primary/30",
  },
];

const FacilitiesSection = () => {
  return (
    <section id="facilities" className="relative py-20 md:py-28 overflow-hidden bg-background">
      <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-blue-pop/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full bg-pink-pop/10 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-label inline-flex items-center gap-2">
              <Building2 size={14} className="text-yellow-pop" />
              Our Facilities
            </span>
            <h2 className="section-title">
              Smart ICT Club <span className="text-gradient">Buildings</span>
            </h2>
            <p className="section-desc">
              State-of-the-art facilities with computers, smart boards, and high-speed WiFi —
              built to inspire the next generation of innovators 🚀
            </p>
          </div>
        </AnimatedSection>

        {/* Bento grid layout */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-5 max-w-6xl mx-auto">
          {/* Large feature card */}
          <AnimatedSection delay={0} className="md:col-span-2 md:row-span-2">
            <div className="group relative h-full min-h-[400px] rounded-3xl overflow-hidden border border-border hover:border-primary/40 transition-all duration-500">
              <img
                src={facilities[0].img}
                alt={facilities[0].title}
                width={1280}
                height={832}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md ${facilities[0].badge} mb-4`}>
                  <Monitor className={facilities[0].color} size={14} />
                  <span className="text-xs font-heading font-semibold uppercase tracking-wider text-foreground">
                    Featured
                  </span>
                </div>
                <h3 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-2">
                  {facilities[0].title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base max-w-md">
                  {facilities[0].desc}
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Smaller cards */}
          {facilities.slice(1).map((f, i) => (
            <AnimatedSection key={f.title} delay={(i + 1) * 100}>
              <div className="group relative h-full min-h-[190px] rounded-3xl overflow-hidden border border-border hover:border-primary/40 transition-all duration-500">
                <img
                  src={f.img}
                  alt={f.title}
                  width={1280}
                  height={832}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <div className={`w-10 h-10 rounded-xl ${f.badge} border backdrop-blur-md flex items-center justify-center mb-3`}>
                    <f.icon className={f.color} size={18} />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-1">
                    {f.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
                    {f.desc}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;
