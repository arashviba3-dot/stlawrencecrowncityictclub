import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <section className="py-16 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection>
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-3">
              Stay <span className="text-gradient">Updated</span>
            </h3>
            <p className="text-muted-foreground mb-8">
              Subscribe to get updates on new projects, events, and club activities.
            </p>

            {submitted ? (
              <div className="flex items-center justify-center gap-2 text-primary animate-fade-in">
                <CheckCircle size={20} />
                <span className="font-medium">Thanks for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  required
                  className="flex-1 px-5 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-heading font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105"
                >
                  <Send size={16} />
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default NewsletterSignup;
