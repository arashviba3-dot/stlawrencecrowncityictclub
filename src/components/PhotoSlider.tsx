import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import p1 from "@/assets/student-photo-1.jpg";
import p2 from "@/assets/student-photo-2.jpg";
import p3 from "@/assets/student-photo-3.jpg";
import p4 from "@/assets/student-photo-4.jpg";
import p5 from "@/assets/student-photo-5.jpg";
import p6 from "@/assets/student-photo-6.jpg";
import p7 from "@/assets/student-photo-7.jpg";
import p8 from "@/assets/student-photo-8.jpg";
import p9 from "@/assets/student-photo-9.jpg";
import p10 from "@/assets/student-photo-10.jpg";

const slides = [
  { src: p1, caption: "Our ICT Family — Crown City Pride" },
  { src: p2, caption: "Bright minds, brighter futures" },
  { src: p3, caption: "Learning. Building. Leading." },
  { src: p4, caption: "Innovators of tomorrow, today" },
  { src: p5, caption: "St Lawrence — For a Bright Future" },
  { src: p6, caption: "Code. Create. Conquer." },
  { src: p7, caption: "The world rewards success, not efforts" },
  { src: p8, caption: "Focused minds at the Crown City ICT Lab" },
  { src: p9, caption: "Hands on keyboards, eyes on the future" },
  { src: p10, caption: "Inside our smart computer lab" },
];

const PhotoSlider = () => {
  const [i, setI] = useState(0);
  const next = () => setI((v) => (v + 1) % slides.length);
  const prev = () => setI((v) => (v - 1 + slides.length) % slides.length);

  useEffect(() => {
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="gallery" className="py-20 section-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl" style={{ background: "hsl(var(--purple-pop) / 0.3)" }} />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl" style={{ background: "hsl(var(--blue-pop) / 0.3)" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="section-header">
          <span className="section-label">Photo Gallery</span>
          <h2 className="section-title text-gradient">Crown City Moments</h2>
          <p className="section-desc">Real students, real memories — captured at St Lawrence Schools and Colleges.</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative aspect-[16/10] rounded-3xl overflow-hidden glass-card group">
            {slides.map((s, idx) => (
              <img
                key={idx}
                src={s.src}
                alt={s.caption}
                loading={idx === 0 ? "eager" : "lazy"}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-1000"
                style={{ opacity: idx === i ? 1 : 0, transform: idx === i ? "scale(1)" : "scale(1.05)" }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />

            <button onClick={prev} aria-label="Previous"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass-card flex items-center justify-center hover:scale-110 transition opacity-0 group-hover:opacity-100">
              <ChevronLeft />
            </button>
            <button onClick={next} aria-label="Next"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass-card flex items-center justify-center hover:scale-110 transition opacity-0 group-hover:opacity-100">
              <ChevronRight />
            </button>

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p className="font-heading font-bold text-xl md:text-2xl text-foreground drop-shadow-lg">{slides[i].caption}</p>
              <div className="flex gap-2 mt-4">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setI(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className="h-1.5 rounded-full transition-all"
                    style={{
                      width: idx === i ? 32 : 12,
                      background: idx === i ? "hsl(var(--glow))" : "hsl(var(--muted-foreground) / 0.5)",
                      boxShadow: idx === i ? "0 0 12px hsl(var(--glow))" : "none",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-7 gap-2 md:gap-3 mt-4">
            {slides.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                className="aspect-square rounded-xl overflow-hidden border-2 transition-all hover:scale-105"
                style={{
                  borderColor: idx === i ? "hsl(var(--glow))" : "transparent",
                  boxShadow: idx === i ? "0 0 16px hsl(var(--glow) / 0.6)" : "none",
                }}
              >
                <img src={s.src} alt="" className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoSlider;
