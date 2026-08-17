import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/data/images";

export function ServicesGrid() {
  return (
    <section className="py-24 bg-[#F9F8F5]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-[#DCD5CB]">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C86D51] font-semibold">
              Our Capabilities
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#1E1C1A]">
              Comprehensive architectural & interior services.
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-md font-sans">
            From concept drafting and spatial planning to turnkey procurement, we deliver cohesive luxury environments.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-12">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="group bg-white border border-[#E5DFD5] hover:border-[#C86D51] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl"
            >
              <div>
                {/* Image Header */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-[#1E1C1A]/80 backdrop-blur-sm text-white px-3 py-1 text-xs font-serif">
                    {service.number}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-serif text-[#1E1C1A] group-hover:text-[#C86D51] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>

                  {/* Bullet features */}
                  <ul className="space-y-2 pt-2 border-t border-[#F0ECE4]">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-[11px] text-[#3A3530] flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#C86D51]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Link Action */}
              <div className="p-6 pt-0 mt-auto">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#1E1C1A] group-hover:text-[#C86D51] transition-colors"
                >
                  <span>Request Proposal</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
