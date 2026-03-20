import AboutSection from "./about/page";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import ContactPage from "./contact/page";
import ExperienceSection from "./experiance/page";
import ResourcesSection from "./resource/page";
import SubjectsSection from "./subject/page";

export default function Home() {
  return (
   
    <>
    <Navbar />
    <HeroSection />
    <AboutSection />
    <ExperienceSection />
    <SubjectsSection />
    <ResourcesSection />
    <ContactPage />

    </>
  );
}
