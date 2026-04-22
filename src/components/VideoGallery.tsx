import { useState } from "react";
import { Play, X, Film, Sparkles } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import projectCodingVideo from "@/assets/project-coding-video.mp4.asset.json";
import projectRoboticsVideo from "@/assets/project-robotics-video.mp4.asset.json";
import heroVideo from "@/assets/hero-video.mp4.asset.json";

type Video = {
  title: string;
  url: string;
  category: string;
  duration: string;
  accent: string;
};

const featured: Video = {
  title: "Inside the SLC ICT Club",
  url: heroVideo.url,
  category: "Showcase Reel",
  duration: "Featured",
  accent: "from-primary/30 via-pink-pop/20 to-yellow-pop/20",
};

const videos: Video[] = [
  {
    title: "Coding Workshop Highlights",
    url: projectCodingVideo.url,
    category: "Workshop",
    duration: "Behind the scenes",
    accent: "from-blue-pop/25 to-primary/20",
  },
  {
    title: "Robotics Project Demo",
    url: projectRoboticsVideo.url,
    category: "Project",
    duration: "Live demo",
    accent: "from-pink-pop/25 to-secondary/20",
  },
  {
    title: "Creative Sound Lab",
    url: projectCodingVideo.url,
    category: "Music & Sound",
    duration: "Studio session",
    accent: "from-yellow-pop/25 to-pink-pop/20",
  },
  {
    title: "Web Design Sprint",
    url: projectRoboticsVideo.url,
    category: "Design",
    duration: "Time-lapse",
    accent: "from-primary/25 to-blue-pop/20",
  },
];

const VideoCard = ({ video, onPlay, large = false }: { video: Video; onPlay: () => void; large?: boolean }) => (
  <button
    onClick={onPlay}
    className={`group relative w-full ${
      large ? "aspect-[16/10] md:aspect-[16/9]" : "aspect-video"
    } rounded-2xl overflow-hidden bg-gradient-to-br ${video.accent} border border-primary-foreground/10 hover:border-primary/40 transition-all duration-500 hover:scale-[1.02]`}
  >
    <video
      className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-500"
      muted
      playsInline
      preload="metadata"
    >
      <source src={video.url} type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

    {/* Play button */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className={`${
          large ? "w-20 h-20" : "w-14 h-14"
        } rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/30`}
      >
        <Play className="text-primary-foreground ml-1" size={large ? 32 : 22} />
      </div>
    </div>

    {/* Category badge */}
    <div className="absolute top-4 left-4">
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/70 backdrop-blur-md border border-primary-foreground/10 text-[10px] font-heading font-semibold uppercase tracking-wider text-primary-foreground">
        <Film size={10} className="text-pink-pop" />
        {video.category}
      </span>
    </div>

    {/* Title overlay */}
    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 text-left">
      <p
        className={`font-heading font-bold text-primary-foreground ${
          large ? "text-xl md:text-2xl" : "text-sm md:text-base"
        } leading-tight mb-1`}
      >
        {video.title}
      </p>
      <p className="text-primary-foreground/70 text-xs">{video.duration}</p>
    </div>
  </button>
);

const VideoGallery = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="py-20 md:py-28 section-dark relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-pop/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-pop/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-yellow-pop/8 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection>
          <div className="section-header">
            <span className="text-glow font-heading font-semibold text-sm uppercase tracking-[0.25em] mb-3 inline-flex items-center gap-2 justify-center">
              <Sparkles size={14} className="text-yellow-pop" />
              Video Gallery
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary-foreground mb-5 leading-tight">
              Watch Us in <span className="text-gradient">Action</span>
            </h2>
            <p className="text-primary-foreground/60 text-lg max-w-2xl mx-auto leading-relaxed">
              Highlights, projects, workshops and behind-the-scenes moments from the club.
            </p>
          </div>
        </AnimatedSection>

        {/* Featured + grid layout */}
        <div className="grid lg:grid-cols-3 gap-5 max-w-6xl mx-auto mb-6">
          <AnimatedSection delay={0} className="lg:col-span-2">
            <VideoCard video={featured} onPlay={() => setActiveVideo(featured.url)} large />
          </AnimatedSection>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-5">
            {videos.slice(0, 2).map((v, i) => (
              <AnimatedSection key={v.title} delay={(i + 1) * 100}>
                <VideoCard video={v} onPlay={() => setActiveVideo(v.url)} />
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Secondary grid */}
        <div className="grid sm:grid-cols-2 gap-5 max-w-6xl mx-auto">
          {videos.slice(2).map((v, i) => (
            <AnimatedSection key={v.title} delay={i * 100}>
              <VideoCard video={v} onPlay={() => setActiveVideo(v.url)} />
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Fullscreen modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveVideo(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-destructive/20 transition-colors"
            aria-label="Close"
          >
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
