"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, X, Maximize2, MapPin, Calendar, Layers } from "lucide-react";
import { PROJECTS, Project } from "@/data/images";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CATEGORIES = [
  { label: "All Projects", value: "all" },
  { label: "Residential", value: "residential" },
  { label: "Commercial", value: "commercial" },
  { label: "Hospitality", value: "hospitality" },
  { label: "Conceptual", value: "conceptual" },
];

export function PortfolioShowcase({ isFullPage = false }: { isFullPage?: boolean }) {
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);

  const filteredProjects = React.useMemo(() => {
    if (activeCategory === "all") return isFullPage ? PROJECTS : PROJECTS.slice(0, 4);
    return PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory, isFullPage]);

  return (
    <section className="py-24 bg-[#F2EFE9]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C86D51] font-semibold">
              Selected Works
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#1E1C1A]">
              Architecture of distinction.
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat.value
                    ? "bg-[#1E1C1A] text-white font-medium shadow-sm"
                    : "bg-white/70 text-[#1E1C1A] hover:bg-white border border-[#DCD5CB]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative bg-white border border-[#E5DFD5] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative h-80 sm:h-96 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <Badge variant="secondary" className="capitalize">
                    {project.category}
                  </Badge>
                </div>

                {/* Floating Expand Icon */}
                <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#1E1C1A] opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-75">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Bottom Overlay Text */}
                <div className="absolute bottom-6 left-6 right-6 z-10 text-white space-y-2">
                  <div className="flex items-center gap-4 text-xs text-gray-300 font-sans uppercase tracking-wider">
                    <span>{project.location}</span>
                    <span>•</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-white group-hover:text-[#F2C4B3] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-200 line-clamp-2 font-sans font-light">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button on Homepage */}
        {!isFullPage && (
          <div className="pt-16 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/projects" className="flex items-center gap-2">
                <span>View All Portfolio Projects</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>

      {/* Quick View Modal for Selected Project */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in-0 duration-200">
          <div className="relative w-full max-w-4xl bg-[#F9F8F5] border border-[#DCD5CB] shadow-2xl max-h-[90vh] overflow-y-auto p-6 md:p-10">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white border border-[#DCD5CB] hover:bg-[#1E1C1A] hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Badge variant="accent" className="capitalize">
                  {selectedProject.category} Architectural Design
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-serif text-[#1E1C1A]">
                  {selectedProject.title}
                </h2>
              </div>

              {/* Main Image */}
              <div className="relative h-80 sm:h-[420px] w-full overflow-hidden border border-[#DCD5CB]">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Project Meta Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-white border border-[#DCD5CB] text-xs">
                <div>
                  <span className="text-muted-foreground block uppercase text-[10px]">Location</span>
                  <span className="font-semibold text-[#1E1C1A] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C86D51]" /> {selectedProject.location}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block uppercase text-[10px]">Year</span>
                  <span className="font-semibold text-[#1E1C1A] flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C86D51]" /> {selectedProject.year}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block uppercase text-[10px]">Area</span>
                  <span className="font-semibold text-[#1E1C1A] flex items-center gap-1 mt-0.5">
                    <Layers className="w-3.5 h-3.5 text-[#C86D51]" /> {selectedProject.area}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block uppercase text-[10px]">Lead Architect</span>
                  <span className="font-semibold text-[#1E1C1A] mt-0.5 block">{selectedProject.architect}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {selectedProject.description}
              </p>

              {/* Secondary Gallery Images */}
              {selectedProject.secondaryImages && selectedProject.secondaryImages.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-[#DCD5CB]">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1E1C1A]">
                    Interior Gallery & Perspectives
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedProject.secondaryImages.map((img, idx) => (
                      <div key={idx} className="relative h-44 w-full overflow-hidden border border-[#DCD5CB]">
                        <Image src={img} alt={`Perspective ${idx + 1}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Action inside Modal */}
              <div className="pt-4 flex justify-end">
                <Button asChild variant="accent">
                  <Link href="/contact">Inquire Similar Project</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
