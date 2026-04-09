import { Mail, Phone, MapPin, Send } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import SocialLinks from "./SocialLinks";

const ContactSection = () => {
  return (
    <section id="contact" className="relative py-20 md:py-28 overflow-hidden">
      {/* Dark background */}
      <div className="section-dark absolute inset-0" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-secondary/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection>
          <div className="section-header">
            <span className="text-glow font-heading font-semibold text-sm uppercase tracking-[0.25em] mb-3 inline-block">Contact Us</span>
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary-foreground mb-5 leading-tight">
              Get In Touch
            </h2>
            <p className="text-primary-foreground/60 text-lg max-w-2xl mx-auto leading-relaxed">
              Reach out for inquiries, partnerships, or to learn more about joining our community.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {[
            {
              icon: Mail,
              title: "Email",
              content: <a href="mailto:arashviba3@gmail.com" className="text-glow hover:underline text-sm">arashviba3@gmail.com</a>,
            },
            {
              icon: Phone,
              title: "Phone",
              content: (
                <div className="space-y-1">
                  <a href="tel:+256775491333" className="text-primary-foreground/70 hover:text-glow transition-colors text-sm block">+256 775 491 333</a>
                  <a href="tel:+256775491331" className="text-primary-foreground/70 hover:text-glow transition-colors text-sm block">+256 775 491 331</a>
                </div>
              ),
            },
            {
              icon: MapPin,
              title: "Address",
              content: <p className="text-primary-foreground/70 text-sm">PO Box 947<br />Mpigi, Uganda</p>,
            },
          ].map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 100}>
              <div className="text-center p-8 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 hover:bg-primary-foreground/10 hover:border-primary/30 hover:scale-105 transition-all duration-500">
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-glow" size={24} />
                </div>
                <h3 className="font-heading font-semibold text-primary-foreground mb-3">{item.title}</h3>
                {item.content}
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Google Map */}
        <AnimatedSection delay={150}>
          <div className="max-w-4xl mx-auto mb-12 rounded-2xl overflow-hidden border border-primary-foreground/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63835.41!2d32.28!3d0.22!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177d9a5ef7e3e3a5%3A0x5bdf3b2e0c8c4c4f!2sMpigi%2C%20Uganda!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              width="100%"
              height="300"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="St Lawrence Crown City location - Mpigi, Uganda"
            />
          </div>
        </AnimatedSection>

        {/* Social Links */}
        <AnimatedSection delay={200}>
          <div className="text-center mb-12">
            <h3 className="font-heading font-semibold text-primary-foreground mb-6 text-lg">Follow Us on Social Media</h3>
            <SocialLinks />
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={250}>
          <div className="text-center">
            <a
              href="mailto:arashviba3@gmail.com"
              className="group inline-flex items-center justify-center gap-3 px-10 py-4 rounded-xl bg-primary text-primary-foreground font-heading font-semibold text-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-105"
            >
              <Send size={20} className="group-hover:translate-x-1 transition-transform" />
              Send Us a Message
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ContactSection;
