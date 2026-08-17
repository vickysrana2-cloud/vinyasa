import { PortfolioShowcase } from "@/components/sections/PortfolioShowcase";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata = {
  title: "Projects Showcase — VINYASA Architecture",
  description: "Browse Vinyasa portfolio of luxury residential villas, urban sky lofts, biophilic commercial headquarters, and hospitality retreats.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-28 pb-20 bg-[#F9F8F5]">
      {/* Page Hero */}
      <section className="py-16 md:py-20 border-b border-[#DCD5CB]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C86D51] font-semibold">
              Curated Commissions
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif text-[#1E1C1A] leading-tight">
              Selected Architectural & Interior Works.
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
              Explore our global portfolio spanning private oceanfront estates, penthouse lofts, tech headquarters, and Japanese wellness retreats.
            </p>
          </div>
        </div>
      </section>

      {/* Main Portfolio Grid */}
      <PortfolioShowcase isFullPage={true} />

      {/* CTA */}
      <CtaBanner />
    </div>
  );
}
