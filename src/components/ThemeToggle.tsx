import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("light-mode", !dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="w-10 h-10 rounded-full bg-muted/50 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:text-glow hover:border-primary transition-all duration-300"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default ThemeToggle;
