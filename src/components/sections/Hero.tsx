import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Award, Compass, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/data/images";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#F9F8F5]">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1E1C1A_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 border border-[#DCD5CB] rounded-full bg-white/60">
              <span className="w-2 h-2 rounded-full bg-[#C86D51] animate-pulse" />
              <span className="text-[11px] font-medium tracking-widest uppercase text-[#1E1C1A]/80">
                Award-Winning Architectural Studio
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-serif text-[#1E1C1A] leading-[1.08] tracking-tight">
              Designing spaces that <span className="italic font-normal text-[#C86D51]">resonate</span> with quiet luxury.
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed font-sans font-light">
              We orchestrate light, raw materials, and refined spatial geometry to curate tailored residential and commercial environments across New York, London, and Tokyo.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button asChild variant="default" size="lg">
                <Link href="/projects" className="flex items-center gap-2">
                  <span>Explore Portfolio</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">Our Studio Philosophy</Link>
              </Button>
            </div>

            {/* Key Metrics */}
            <div className="pt-8 border-t border-[#DCD5CB] grid grid-cols-3 gap-6">
              <div>
                <span className="block text-2xl sm:text-4xl font-serif font-semibold text-[#1E1C1A]">
                  15+
                </span>
                <span className="text-[11px] tracking-wider uppercase text-muted-foreground">
                  Years Experience
                </span>
              </div>
              <div>
                <span className="block text-2xl sm:text-4xl font-serif font-semibold text-[#1E1C1A]">
                  240+
                </span>
                <span className="text-[11px] tracking-wider uppercase text-muted-foreground">
                  Completed Projects
                </span>
              </div>
              <div>
                <span className="block text-2xl sm:text-4xl font-serif font-semibold text-[#1E1C1A]">
                  18
                </span>
                <span className="text-[11px] tracking-wider uppercase text-muted-foreground">
                  Global Design Awards
                </span>
              </div>
            </div>
          </div>

          {/* Right Visual Image Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Image Container */}
              <div className="relative h-[480px] sm:h-[560px] w-full overflow-hidden shadow-2xl border border-[#E8E3DA]">
                <Image
                  src={IMAGES.heroMain}
                  alt="Vinyasa Luxury Architecture Interior"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Floating Architectural Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md border border-white/50 shadow-lg">
                  <span className="text-[10px] uppercase tracking-widest text-[#C86D51] font-semibold block">
                    Featured Project
                  </span>
                  <p className="text-sm font-serif text-[#1E1C1A]">
                    The Dune Sanctuary Villa — Malibu
                  </p>
                </div>
              </div>

              {/* Secondary Overlapping Inset Image */}
              <div className="hidden sm:block absolute -bottom-8 -left-10 w-48 h-48 overflow-hidden shadow-xl border-4 border-[#F9F8F5]">
                <Image
                  src={IMAGES.heroSecondary}
                  alt="Detail Interior Joinery"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
