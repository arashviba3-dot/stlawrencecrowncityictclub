import { Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary font-heading font-semibold text-sm uppercase tracking-widest mb-3">Contact Us</p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
            Get In Touch
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Reach out for inquiries, partnerships, or to learn more about joining the club.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center bg-card rounded-xl p-8 shadow-sm border border-border card-hover">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Mail className="text-primary" size={24} />
            </div>
            <h3 className="font-heading font-semibold text-foreground mb-2">Email</h3>
            <a href="mailto:arashviba3@gmail.com" className="text-primary text-sm hover:underline">
              arashviba3@gmail.com
            </a>
          </div>

          <div className="text-center bg-card rounded-xl p-8 shadow-sm border border-border card-hover">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Phone className="text-primary" size={24} />
            </div>
            <h3 className="font-heading font-semibold text-foreground mb-2">Phone</h3>
            <p className="text-muted-foreground text-sm">
              <a href="tel:+256775491333" className="hover:text-primary transition-colors">+256 775 491 333</a>
              <br />
              <a href="tel:+256775491331" className="hover:text-primary transition-colors">+256 775 491 331</a>
            </p>
          </div>

          <div className="text-center bg-card rounded-xl p-8 shadow-sm border border-border card-hover">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MapPin className="text-primary" size={24} />
            </div>
            <h3 className="font-heading font-semibold text-foreground mb-2">Address</h3>
            <p className="text-muted-foreground text-sm">
              PO Box 947<br />Mpigi, Uganda
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
