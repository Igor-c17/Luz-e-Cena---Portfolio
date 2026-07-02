import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";
import { StudioTourSection } from "@/sections/StudioTour";
import { ProjectsSection } from "@/sections/Projects";
import { Gallery } from "@/sections/Gallery";
import { BehindTheScenesSection } from "@/sections/BehindTheScenes";
import { TapeSection } from "@/sections/Tape";
import { TestimonialsSection } from "@/sections/Testimonials";
import { AboutSection } from "@/sections/About";
import { ContactSection } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      {/* <StudioTourSection /> */}
      <ProjectsSection />
      <Gallery />
      <BehindTheScenesSection />
      {/* <TapeSection /> */}
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
