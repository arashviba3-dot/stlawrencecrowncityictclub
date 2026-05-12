import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WelcomeSection from "@/components/WelcomeSection";
import AboutSection from "@/components/AboutSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import ProjectsSection from "@/components/ProjectsSection";
import EventsCarousel from "@/components/EventsCarousel";
import TeamSection from "@/components/TeamSection";
import VideoGallery from "@/components/VideoGallery";
import ResourcesSection from "@/components/ResourcesSection";
import GamesSection from "@/components/GamesSection";
import FacilitiesSection from "@/components/FacilitiesSection";
import NewsletterSignup from "@/components/NewsletterSignup";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SchoolAnthemPlayer from "@/components/SchoolAnthemPlayer";
import PhotoSlider from "@/components/PhotoSlider";

const Index = () => {
  return (
    <div className="min-h-screen scroll-smooth">
      <Navbar />
      <HeroSection />
      <PhotoSlider />
      <WelcomeSection />
      <AboutSection />
      <ActivitiesSection />
      <ProjectsSection />
      <EventsCarousel />
      <TeamSection />
      <FacilitiesSection />
      <VideoGallery />
      <ResourcesSection />
      <GamesSection />
      <NewsletterSignup />
      <ContactSection />
      <Footer />
      <SchoolAnthemPlayer />
    </div>
  );
};

export default Index;
