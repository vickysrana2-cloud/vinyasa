import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/data/images";

export function CtaBanner() {
  return (
    <section className="relative py-28 bg-[#141312] text-white overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={IMAGES.ctaBg}
          alt="Luxury Architecture CTA Background"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141312] via-[#141312]/90 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl space-y-8">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C86D51] font-semibold">
            Start Your Spatial Journey
          </span>

          <h2 className="text-4xl sm:text-6xl font-serif leading-[1.1] text-white">
            Ready to shape your private sanctuary or commercial space?
          </h2>

          <p className="text-base text-gray-300 font-sans font-light leading-relaxed max-w-2xl">
            Schedule a private architectural consultation with our principal design directors in New York, London, or remotely worldwide.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button asChild variant="accent" size="lg">
              <Link href="/contact" className="flex items-center gap-2">
                <span>Request Studio Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:border-white">
              <Link href="/projects">View Recent Commissions</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
