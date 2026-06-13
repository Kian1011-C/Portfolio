import Navbar from "@/app/components/ui/Navbar";
import Footer from "@/app/components/ui/Footer";
import CommandPalette from "@/app/components/ui/CommandPalette";
import HeroSection from "@/app/components/sections/HeroSection";
import AboutSection from "@/app/components/sections/AboutSection";
import TelemetrySection from "@/app/components/sections/TelemetrySection";
import SkillsSection from "@/app/components/sections/SkillsSection";
import ProjectsSection from "@/app/components/sections/ProjectsSection";
import ResearchSection from "@/app/components/sections/ResearchSection";
import EducationSection from "@/app/components/sections/EducationSection";
import GitHubSection from "@/app/components/sections/GitHubSection";
import ContactSection from "@/app/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <AboutSection />
        <TelemetrySection />
        <SkillsSection />
        <ProjectsSection />
        <ResearchSection />
        <EducationSection />
        <GitHubSection />
        <ContactSection />
      </main>
      <Footer />
      <CommandPalette />
    </>
  );
}
