import { ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-foreground border-t border-primary-foreground/10">
      <div className="container mx-auto px-4">
        <div className="py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="font-heading font-bold text-2xl text-primary-foreground mb-1">
              SLC <span className="text-glow">ICT Club</span>
            </p>
            <p className="text-primary-foreground/50 text-sm">
              Empowering Students with Technology · Mpigi, Uganda
            </p>
          </div>

          <div className="flex items-center gap-8 text-sm">
            {["Home", "About", "Activities", "Team", "Resources", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-primary-foreground/50 hover:text-glow transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>

          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-lg border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/50 hover:text-glow hover:border-glow transition-all duration-300"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>

        <div className="py-6 border-t border-primary-foreground/10 text-center">
          <p className="text-xs text-primary-foreground/30">
            © {new Date().getFullYear()} St Lawrence Crown City ICT Club. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
