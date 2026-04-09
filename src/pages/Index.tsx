import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import ProjectsSection from "@/components/ProjectsSection";
import EventsCarousel from "@/components/EventsCarousel";
import TeamSection from "@/components/TeamSection";
import VideoGallery from "@/components/VideoGallery";
import ResourcesSection from "@/components/ResourcesSection";
import NewsletterSignup from "@/components/NewsletterSignup";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen scroll-smooth">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ActivitiesSection />
      <ProjectsSection />
      <EventsCarousel />
      <TeamSection />
      <VideoGallery />
      <ResourcesSection />
      <NewsletterSignup />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
