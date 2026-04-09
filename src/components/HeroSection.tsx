import heroVideo from "@/assets/hero-video.mp4.asset.json";
import heroBanner from "@/assets/hero-banner.jpg";
import { ArrowDown, Play } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={heroBanner}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroVideo.url} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="hero-overlay absolute inset-0" />

      {/* Animated decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/10 blur-[100px] floating" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-secondary/10 blur-[120px] floating" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary-foreground/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-primary-foreground/[0.03]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 mb-8 animate-fade-in-up">
          <Play size={12} className="text-glow fill-current" />
          <span className="text-primary-foreground/80 text-sm font-medium tracking-wide">St Lawrence Crown City</span>
        </div>

        <h1 className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl text-primary-foreground leading-[1.05] mb-6 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          <span className="block">ICT Club</span>
          <span className="shimmer-text text-3xl md:text-4xl lg:text-5xl font-medium mt-2 block">Empowering Students with Technology</span>
        </h1>

        <p className="text-primary-foreground/70 text-lg md:text-xl max-w-2xl mx-auto mb-12 animate-fade-in-up leading-relaxed" style={{ animationDelay: "0.3s" }}>
          Fostering creativity, innovation, and digital literacy among young learners in Mpigi through hands-on ICT education.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
          <a
            href="#about"
            className="group inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary text-primary-foreground font-heading font-semibold text-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
          >
            Discover More
            <ArrowDown size={18} className="ml-2 group-hover:translate-y-0.5 transition-transform" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-primary-foreground/25 text-primary-foreground font-heading font-semibold text-lg hover:bg-primary-foreground/10 transition-all duration-300"
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-primary-foreground/40 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-primary-foreground/40 to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
