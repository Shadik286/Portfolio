import { ProfileSection } from "@/components/sections/ProfileSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { CPSection } from "@/components/sections/CPSection";
import { LeadershipEducationSection } from "@/components/sections/LeadershipEducationSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <ProfileSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <CPSection />
      <LeadershipEducationSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
