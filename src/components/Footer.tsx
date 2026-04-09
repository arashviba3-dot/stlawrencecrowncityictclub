const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground/70 py-10">
      <div className="container mx-auto px-4 text-center">
        <p className="font-heading font-bold text-lg text-primary-foreground mb-2">
          SLC <span className="text-glow">ICT Club</span>
        </p>
        <p className="text-sm mb-4">
          St Lawrence Crown City, Mpigi — Empowering Students with ICT
        </p>
        <div className="flex justify-center gap-6 text-sm mb-6">
          <a href="#home" className="hover:text-glow transition-colors">Home</a>
          <a href="#about" className="hover:text-glow transition-colors">About</a>
          <a href="#activities" className="hover:text-glow transition-colors">Activities</a>
          <a href="#contact" className="hover:text-glow transition-colors">Contact</a>
        </div>
        <p className="text-xs text-primary-foreground/40">
          © {new Date().getFullYear()} St Lawrence Crown City ICT Club. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
