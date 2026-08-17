import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Award, Compass, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/data/images";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata = {
  title: "About Studio — VINYASA Architecture",
  description: "Learn about Vinyasa architecture studio philosophy, team, award history, and design approach.",
};

const PRINCIPLES = [
  {
    number: "01",
    title: "Honesty of Materials",
    description: "We honor the natural qualities of raw stone, patinated bronze, and unvarnished timber, allowing textures to mature gracefully over decades.",
  },
  {
    number: "02",
    title: "Sculpting with Light",
    description: "Natural light is treated as a core building element. We study sun trajectories to create subtle shadow plays throughout every hour of the day.",
  },
  {
    number: "03",
    title: "Emotional Proportion",
    description: "Spatial volumes are calibrated not just for efficiency, but to invoke a visceral sense of calm, sanctuary, and expansive quiet.",
  },
  {
    number: "04",
    title: "Uncompromising Precision",
    description: "From invisible door hinges to perfectly aligned shadow gaps, our shop drawings leave zero room for ambiguity or compromise.",
  },
];

const TEAM = [
  {
    name: "Aarav Sharma",
    role: "Founder & Principal Architect",
    bio: "Over 18 years shaping luxury residences and cultural pavilions across North America and Europe.",
    image: IMAGES.founder,
  },
  {
    name: "Elena Rostova",
    role: "Director of Interior Architecture",
    bio: "Specialist in bespoke joinery, rare stone sourcing, and sensory interior lighting environments.",
    image: IMAGES.aboutStudio,
  },
  {
    name: "Kenji Sato",
    role: "Lead Masterplanner & Partner",
    bio: "Pioneer in modern Japanese biophilic design and large-scale hospitality developments.",
    image: IMAGES.teamMember2,
  },
];

const AWARDS = [
  { year: "2024", title: "International Architecture Award", project: "Dune Sanctuary Villa", issuer: "ArchDaily" },
  { year: "2023", title: "Gold Design Excellence", project: "Komorebi Tech HQ", issuer: "Design Prize Asia" },
  { year: "2023", title: "Residential Interior of the Year", project: "Aurora Sky Loft", issuer: "Architectural Digest" },
  { year: "2022", title: "Best Hospitality Concept", project: "Solstice Retreat", issuer: "Frame Awards" },
];

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 bg-[#F9F8F5]">
      {/* Page Hero */}
      <section className="py-16 md:py-24 border-b border-[#DCD5CB]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C86D51] font-semibold">
              About Vinyasa Studio
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif text-[#1E1C1A] leading-tight">
              We design timeless spaces where human life unfolds in harmony.
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
              Established in 2010, Vinyasa is a multi-disciplinary architecture and interior design laboratory. We work closely with private individuals, developers, and visionaries to manifest extraordinary built environments.
            </p>
          </div>
        </div>
      </section>

      {/* Main Philosophy Section */}
      <section className="py-24 border-b border-[#DCD5CB]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative h-[480px] w-full border border-[#E5DFD5] overflow-hidden shadow-xl">
              <Image
                src={IMAGES.aboutMain}
                alt="Vinyasa Studio Material Library"
                fill
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C86D51] font-semibold">
                Our Ethos
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1E1C1A]">
                Architecture as a quiet dialogue between space and soul.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We believe that the spaces we inhabit directly shape our inner state. In an era dominated by superficial decoration and fast construction, Vinyasa champions slow, deliberate craftsmanship, enduring natural materials, and spatial purity.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our collaborative studio practice unites master architects, interior specialists, lighting designers, and master carpenters under a unified vision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Guiding Principles */}
      <section className="py-24 bg-[#F2EFE9] border-b border-[#DCD5CB]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="pb-12 text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C86D51] font-semibold">
              Foundation
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1E1C1A]">
              Our Guiding Design Pillars
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRINCIPLES.map((item) => (
              <div
                key={item.number}
                className="bg-white border border-[#E5DFD5] p-8 space-y-4 shadow-sm hover:border-[#C86D51] transition-colors"
              >
                <span className="text-xs font-serif text-[#C86D51] font-bold block">
                  {item.number}
                </span>
                <h3 className="text-xl font-serif text-[#1E1C1A]">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-sans font-light">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 border-b border-[#DCD5CB]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-12">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C86D51] font-semibold">
                Leadership
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1E1C1A]">
                The Minds Behind Vinyasa
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((member, idx) => (
              <div key={idx} className="bg-white border border-[#E5DFD5] overflow-hidden group shadow-sm">
                <div className="relative h-72 w-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-serif text-[#1E1C1A]">{member.name}</h3>
                  <span className="text-xs text-[#C86D51] font-medium block uppercase tracking-wider">
                    {member.role}
                  </span>
                  <p className="text-xs text-muted-foreground leading-relaxed pt-2">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-24 bg-[#141312] text-[#F9F8F5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="pb-12 text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C86D51] font-semibold">
              Distinction
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white">
              Awards & Global Recognition
            </h2>
          </div>

          <div className="divide-y divide-[#262422] max-w-4xl mx-auto">
            {AWARDS.map((award, idx) => (
              <div
                key={idx}
                className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/5 px-4 transition-colors"
              >
                <div className="flex items-center gap-6">
                  <span className="text-sm font-serif text-[#C86D51] font-bold">
                    {award.year}
                  </span>
                  <div>
                    <h4 className="text-lg font-serif text-white">{award.title}</h4>
                    <p className="text-xs text-gray-400">Project: {award.project}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400 uppercase tracking-widest border border-white/20 px-3 py-1 self-start sm:self-auto">
                  {award.issuer}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaBanner />
    </div>
  );
}
