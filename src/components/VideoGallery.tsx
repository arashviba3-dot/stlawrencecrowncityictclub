import { useState } from "react";
import { Play, X } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import projectCodingVideo from "@/assets/project-coding-video.mp4.asset.json";
import projectRoboticsVideo from "@/assets/project-robotics-video.mp4.asset.json";

const videos = [
  { title: "Coding Workshop Highlights", url: projectCodingVideo.url, color: "from-blue-pop/20 to-primary/20" },
  { title: "Robotics Project Demo", url: projectRoboticsVideo.url, color: "from-pink-pop/20 to-secondary/20" },
];

const VideoGallery = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="py-20 md:py-28 section-dark relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-pop/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-pop/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection>
          <div className="section-header">
            <span className="text-glow font-heading font-semibold text-sm uppercase tracking-[0.25em] mb-3 inline-block">Video Gallery</span>
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary-foreground mb-5 leading-tight">
              Watch Us in <span className="text-gradient">Action</span>
            </h2>
            <p className="text-primary-foreground/60 text-lg max-w-2xl mx-auto leading-relaxed">
              See our club projects and activities come to life through video.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {videos.map((video, i) => (
            <AnimatedSection key={video.title} delay={i * 100}>
              <button
                onClick={() => setActiveVideo(video.url)}
                className={`group relative w-full aspect-video rounded-2xl overflow-hidden bg-gradient-to-br ${video.color} border border-primary-foreground/10 hover:border-primary/30 transition-all duration-500 hover:scale-[1.02]`}
              >
                <video className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" muted playsInline preload="metadata">
                  <source src={video.url} type="video/mp4" />
                </video>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="text-primary-foreground ml-1" size={28} />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent">
                  <p className="font-heading font-semibold text-primary-foreground text-sm">{video.title}</p>
                </div>
              </button>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Fullscreen modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setActiveVideo(null)}>
          <button className="absolute top-6 right-6 w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-destructive/20 transition-colors" aria-label="Close">
            <X size={20} />
          </button>
          <video
            className="max-w-4xl w-full rounded-2xl"
            controls
            autoPlay
            onClick={(e) => e.stopPropagation()}
          >
            <source src={activeVideo} type="video/mp4" />
          </video>
        </div>
      )}
    </section>
  );
};

export default VideoGallery;
