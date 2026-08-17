import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/data/images";

export function AboutPreview() {
  return (
    <section className="py-24 bg-[#F2EFE9] border-y border-[#E5DFD5]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Imagery Stack */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-8 relative h-[420px] sm:h-[480px] shadow-xl overflow-hidden">
                <Image
                  src={IMAGES.aboutMain}
                  alt="Vinyasa Design Studio Interior"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="col-span-4 relative h-[320px] sm:h-[380px] shadow-lg overflow-hidden -ml-6 z-10 border-4 border-[#F2EFE9]">
                <Image
                  src={IMAGES.aboutStudio}
                  alt="Architectural Material Exploration"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Founder Quote Card */}
            <div className="mt-6 p-6 bg-white border border-[#DCD5CB] shadow-md max-w-md">
              <p className="font-serif italic text-sm text-[#1E1C1A] leading-relaxed">
                &ldquo;Architecture isn&apos;t simply creating walls; it is the choreography of light, shadow, texture, and emotional peace.&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden relative">
                  <Image
                    src={IMAGES.founder}
                    alt="Aarav Sharma"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[#1E1C1A]">
                    Aarav Sharma
                  </span>
                  <span className="text-[10px] uppercase text-muted-foreground">
                    Principal & Design Director
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C86D51] font-semibold">
                Studio Heritage
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-[#1E1C1A] leading-tight">
                Crafting spatial elegance through tactile materials & deliberate proportion.
              </h2>
            </div>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Founded in 2010, Vinyasa has emerged as a premier boutique studio specializing in architectural interventions and high-end residential interiors. We reject temporary trends in favor of enduring beauty, honest materials, and spatial harmony.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3 bg-white/70 border border-[#DCD5CB]/80">
                <CheckCircle2 className="w-5 h-5 text-[#C86D51] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1E1C1A]">
                    Bespoke Craftsmanship
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Every piece of joinery & stone cut is uniquely custom tailored.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white/70 border border-[#DCD5CB]/80">
                <CheckCircle2 className="w-5 h-5 text-[#C86D51] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1E1C1A]">
                    Sustainable Materials
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Sourcing ethically harvested timbers and local natural stone.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button asChild variant="default">
                <Link href="/about" className="flex items-center gap-2">
                  <span>Learn More About Our Team</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
