import { ArrowUp } from "lucide-react";
import clubLogo from "@/assets/club-logo.png";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <img src={clubLogo} alt="SLC ICT Club" className="w-10 h-10 object-contain" width={40} height={40} loading="lazy" />
            <div>
              <p className="font-heading font-bold text-xl text-foreground">
                SLC <span className="text-glow">ICT Club</span>
              </p>
              <p className="text-muted-foreground text-xs italic">
                "The world rewards success, not efforts"
              </p>
            </div>
          </div>

          <div className="flex items-center gap-8 text-sm">
            {["Home", "About", "Activities", "Team", "Resources", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-muted-foreground hover:text-glow transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>

          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-glow hover:border-primary transition-all duration-300 hover:scale-110"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>

        <div className="py-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground/50">
            © {new Date().getFullYear()} St Lawrence Crown City ICT Club. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
