import Image from "next/image";
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/images";

export function Testimonials() {
  return (
    <section className="py-24 bg-[#F9F8F5]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto pb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C86D51] font-semibold">
            Client Words
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#1E1C1A]">
            Endorsements from private patrons & visionaries.
          </h2>
        </div>

        {/* Grid of Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#E5DFD5] p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-[#C86D51]/40" />
                <p className="text-sm text-[#3A3530] font-sans font-light leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-[#F0ECE4] flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden relative border border-[#DCD5CB] shrink-0">
                  <Image
                    src={item.avatar}
                    alt={item.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1E1C1A]">
                    {item.author}
                  </h4>
                  <p className="text-[11px] text-muted-foreground">
                    {item.role} • <span className="text-[#C86D51]">{item.location}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
