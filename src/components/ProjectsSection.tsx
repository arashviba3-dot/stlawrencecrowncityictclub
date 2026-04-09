import { useState } from "react";
import { Play, ExternalLink } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import projectCodingVideo from "@/assets/project-coding-video.mp4.asset.json";
import projectRoboticsVideo from "@/assets/project-robotics-video.mp4.asset.json";

const projects = [
  {
    title: "School Management System",
    description: "A web-based system to manage student records, attendance, and grades built with HTML, CSS, and JavaScript.",
    progress: 75,
    video: projectCodingVideo.url,
    tags: ["Web Dev", "JavaScript", "Database"],
    color: "blue-pop",
  },
  {
    title: "Robotics Car Project",
    description: "An Arduino-powered smart car with obstacle avoidance and remote control capabilities built by club members.",
    progress: 50,
    video: projectRoboticsVideo.url,
    tags: ["Robotics", "Arduino", "Electronics"],
    color: "pink-pop",
  },
  {
    title: "Digital Art Portfolio",
    description: "A curated collection of graphic designs, logos, and digital illustrations created using Canva and Photoshop.",
    progress: 90,
    video: null,
    tags: ["Design", "Canva", "Branding"],
    color: "yellow-pop",
  },
  {
    title: "Club Website Development",
    description: "This very website you're browsing — designed and built by our club members to showcase our work.",
    progress: 100,
    video: null,
    tags: ["React", "Tailwind", "TypeScript"],
    color: "primary",
  },
];

const ProjectsSection = () => {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  return (
    <section id="projects" className="py-20 md:py-28 section-alt">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-label">Our Projects</span>
            <h2 className="section-title">
              Featured <span className="text-gradient">Work</span>
            </h2>
            <p className="section-desc">
              Explore the projects our members are building — from websites to robots, each project develops real-world skills.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, i) => (
            <AnimatedSection key={project.title} delay={i * 100}>
              <div className="glass-card rounded-2xl overflow-hidden card-hover glow-border group">
                {/* Video or gradient placeholder */}
                <div className="relative h-48 overflow-hidden bg-muted">
                  {project.video ? (
                    <>
                      <video
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                        autoPlay={playingVideo === i}
                        onMouseEnter={(e) => {
                          setPlayingVideo(i);
                          e.currentTarget.play();
                        }}
                        onMouseLeave={(e) => {
                          setPlayingVideo(null);
                          e.currentTarget.pause();
                          e.currentTarget.currentTime = 0;
                        }}
                      >
                        <source src={project.video} type="video/mp4" />
                      </video>
                      {playingVideo !== i && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/40">
                          <div className="w-14 h-14 rounded-full bg-primary/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="text-primary-foreground ml-1" size={24} />
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br from-${project.color}/20 to-${project.color}/5 flex items-center justify-center`}>
                      <ExternalLink className="text-muted-foreground" size={32} />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>

                  {/* Progress bar */}
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className={`text-${project.color} font-semibold`}>{project.progress}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r from-${project.color} to-primary transition-all duration-1000`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {project.progress === 100 ? "✅ Completed" : project.progress >= 75 ? "🚀 Nearly done" : "🔧 In progress"}
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

export default ProjectsSection;
