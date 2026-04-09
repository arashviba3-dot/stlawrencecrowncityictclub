import heroBanner from "@/assets/hero-banner.jpg";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={heroBanner}
        alt="St Lawrence Crown City ICT Club students working in computer lab"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="hero-overlay absolute inset-0" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="text-glow font-heading font-medium text-sm md:text-base uppercase tracking-[0.3em] mb-4 animate-fade-in-up">
          St Lawrence Crown City
        </p>
        <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          ICT Club
        </h1>
        <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          Empowering Students with ICT — fostering creativity, innovation, and digital literacy among young learners in Mpigi.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
          <a href="#about" className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-heading font-semibold hover:bg-primary/90 transition-colors">
            Discover More
          </a>
          <a href="#contact" className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-primary-foreground/30 text-primary-foreground font-heading font-semibold hover:bg-primary-foreground/10 transition-colors">
            Get In Touch
          </a>
        </div>
      </div>

      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/60 animate-bounce">
        <ArrowDown size={28} />
      </a>
    </section>
  );
};

export default HeroSection;
