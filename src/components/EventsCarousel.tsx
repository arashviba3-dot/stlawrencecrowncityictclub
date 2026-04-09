import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import eventCompetition from "@/assets/event-competition.jpg";
import eventWorkshop from "@/assets/event-workshop.jpg";
import eventDesign from "@/assets/event-design.jpg";
import eventGroup from "@/assets/event-group.jpg";

const events = [
  { image: eventCompetition, title: "Regional Tech Competition 2024", desc: "Students winning certificates at the regional ICT challenge." },
  { image: eventWorkshop, title: "Coding Workshop", desc: "Hands-on programming workshop in our computer lab." },
  { image: eventDesign, title: "Digital Art Showcase", desc: "Students creating vibrant digital artwork on their computers." },
  { image: eventGroup, title: "Club Members 2024", desc: "Our amazing club members ready to innovate and learn." },
];

const EventsCarousel = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % events.length);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + events.length) % events.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-label">Events & Highlights</span>
            <h2 className="section-title">
              Club <span className="text-gradient">Moments</span>
            </h2>
            <p className="section-desc">
              Relive the highlights from our workshops, competitions, and community events.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <div className="relative max-w-5xl mx-auto">
            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden aspect-video group">
              {events.map((event, i) => (
                <div
                  key={event.title}
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{ opacity: i === current ? 1 : 0 }}
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h3 className="font-heading font-bold text-xl md:text-2xl text-primary-foreground mb-1">{event.title}</h3>
                    <p className="text-primary-foreground/70 text-sm">{event.desc}</p>
                  </div>
                </div>
              ))}

              {/* Nav buttons */}
              <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/40 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-background/60 transition-all" aria-label="Previous">
                <ChevronLeft size={20} />
              </button>
              <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/40 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-background/60 transition-all" aria-label="Next">
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {events.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === current ? "bg-primary w-8" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default EventsCarousel;
