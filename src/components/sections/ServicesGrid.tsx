import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/data/images";

export function ServicesGrid() {
  return (
    <section className="bg-[#F9F8F5] py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-[#DCD5CB] pb-16 md:flex-row md:items-end">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C86D51]">
              Our Capabilities
            </span>

            <h2 className="font-serif text-3xl text-[#1E1C1A] sm:text-5xl">
              Comprehensive architectural & interior services.
            </h2>
          </div>

          <p className="max-w-md font-sans text-sm text-muted-foreground">
            From concept drafting and spatial planning to turnkey procurement,
            we deliver cohesive luxury environments.
          </p>
        </div>

        {/* =========================================================
            MOBILE — ONE CARD AT A TIME
        ========================================================= */}
        <div className="relative overflow-hidden pt-12 md:hidden">
          <div className="services-slider flex">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="w-full shrink-0"
              >
                <ServiceCard service={service} />
              </div>
            ))}

            {/* Clone first card for seamless final transition */}
            {SERVICES.length > 0 && (
              <div className="w-full shrink-0">
                <ServiceCard service={SERVICES[0]} />
              </div>
            )}
          </div>
        </div>

        {/* =========================================================
            TABLET / DESKTOP — NORMAL GRID
        ========================================================= */}
        <div className="hidden grid-cols-1 gap-8 pt-12 md:grid md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SERVICE CARD
========================================================= */

function ServiceCard({
  service,
}: {
  service: (typeof SERVICES)[number];
}) {
  return (
    <div
      className="
        group
        flex
        min-h-full
        w-full
        flex-col
        justify-between
        overflow-hidden
        border
        border-[#E5DFD5]
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:border-[#C86D51]
        hover:shadow-xl
        md:w-auto
      "
    >
      <div>
        {/* Image */}
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw"
            className="
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-105
            "
          />

          {/* Number */}
          <div
            className="
              absolute
              left-4
              top-4
              bg-[#1E1C1A]/80
              px-3
              py-1
              font-serif
              text-xs
              text-white
              backdrop-blur-sm
            "
          >
            {service.number}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 p-6">
          <h3
            className="
              font-serif
              text-xl
              text-[#1E1C1A]
              transition-colors
              duration-300
              group-hover:text-[#C86D51]
            "
          >
            {service.title}
          </h3>

          <p className="text-xs leading-relaxed text-muted-foreground">
            {service.description}
          </p>

          {/* Features */}
          <ul className="space-y-2 border-t border-[#F0ECE4] pt-3">
            {service.features.map((feature, idx) => (
              <li
                key={`${service.id}-feature-${idx}`}
                className="flex items-center gap-2 text-[11px] text-[#3A3530]"
              >
                <span className="h-1 w-1 shrink-0 rounded-full bg-[#C86D51]" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Link */}
      <div className="mt-auto p-6 pt-0">
        <Link
          href="/contact"
          className="
            inline-flex
            items-center
            gap-2
            text-xs
            font-semibold
            uppercase
            tracking-wider
            text-[#1E1C1A]
            transition-colors
            duration-300
            group-hover:text-[#C86D51]
          "
        >
          <span>Request Proposal</span>

          <ArrowUpRight
            className="
              h-3.5
              w-3.5
              transition-transform
              duration-300
              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
            "
          />
        </Link>
      </div>
    </div>
  );
}