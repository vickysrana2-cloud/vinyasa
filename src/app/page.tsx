import { Hero } from "@/components/sections/Hero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { PortfolioShowcase } from "@/components/sections/PortfolioShowcase";
import { ProcessAccordion } from "@/components/sections/ProcessAccordion";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBanner } from "@/components/sections/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ServicesGrid />
      <PortfolioShowcase />
      <ProcessAccordion />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
