"use client";

import Image from "next/image";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { PROCESS_STEPS, IMAGES } from "@/data/images";

export function ProcessAccordion() {
  return (
    <section className="py-24 bg-[#141312] text-[#F9F8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text & Accordion */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C86D51] font-semibold">
                Our Methodology
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif leading-tight">
                A disciplined process from initial sketch to turnkey reveal.
              </h2>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed font-sans font-light">
              We guide every project through four distinct phases designed to ensure total aesthetic integrity, budget transparency, and structural precision.
            </p>

            {/* Accordion Component */}
            <Accordion type="single" collapsible defaultValue="step-0" className="w-full">
              {PROCESS_STEPS.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={`step-${idx}`}
                  className="border-b border-[#262422] py-2"
                >
                  <AccordionTrigger className="hover:no-underline text-white hover:text-[#C86D51] py-4 text-left">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-serif text-[#C86D51] font-semibold">
                        {item.step}
                      </span>
                      <span className="text-lg sm:text-xl font-serif">{item.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400 pl-9 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Right Architectural Image Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[480px] sm:h-[560px] w-full border border-[#262422] overflow-hidden shadow-2xl">
              <Image
                src={IMAGES.aboutStudio}
                alt="Architectural Crafting and Blueprints"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-[#1E1C1A]/90 backdrop-blur-md border border-white/10">
                <span className="text-[10px] uppercase tracking-widest text-[#C86D51] font-semibold block">
                  Studio Craft Philosophy
                </span>
                <p className="text-sm font-serif text-white mt-1">
                  &ldquo;Precision is non-negotiable. Every millimeter of custom joinery and joint line matters.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
