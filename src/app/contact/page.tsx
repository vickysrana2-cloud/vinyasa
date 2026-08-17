"use client";

import * as React from "react";
import { Mail, Phone, MapPin, Clock, CheckCircle2, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const OFFICES = [
  {
    city: "New York Studio",
    address: "450 Hudson Street, Suite 400",
    district: "Tribeca, NY 10014",
    phone: "+1 (212) 555-0198",
    email: "ny@vinyasa-studio.com",
    hours: "Mon – Fri: 09:00 – 18:00 EST",
  },
  {
    city: "London Office",
    address: "18 Mayfair Square, 2nd Floor",
    district: "Mayfair, London W1J 6QA",
    phone: "+44 20 7946 0912",
    email: "uk@vinyasa-studio.com",
    hours: "Mon – Fri: 09:00 – 18:00 GMT",
  },
  {
    city: "Tokyo Design Lab",
    address: "5-7-2 Minami-Aoyama, Minato-ku",
    district: "Tokyo 107-0062",
    phone: "+81 3 5551 0422",
    email: "tokyo@vinyasa-studio.com",
    hours: "Mon – Fri: 09:30 – 18:30 JST",
  },
];

const FAQS = [
  {
    q: "What is your typical project scope and minimum budget commitment?",
    a: "We accept full-scale interior architecture, bespoke residential builds, and commercial flagship spaces. Typical project budgets begin at $150,000 for interior styling & joinery packages and $500,000+ for ground-up architectural commissions.",
  },
  {
    q: "Do you undertake international commissions outside of NY, London, and Tokyo?",
    a: "Yes. Over 40% of our portfolio consists of international commissions in Switzerland, Japan, Italy, the Middle East, and the Caribbean. Our team manages on-site supervision through dedicated local partners.",
  },
  {
    q: "How long does a full architectural or interior design project take?",
    a: "Concept design and spatial blueprinting generally spans 6 to 10 weeks. Execution and procurement timelines range from 4 months for luxury apartments to 18+ months for custom private estates.",
  },
  {
    q: "Can Vinyasa work alongside our chosen general contractor?",
    a: "Absolutly. We provide detailed technical shop drawings, material schedules, and regular site audits to ensure your contractor executes every architectural detail according to specification.",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    serviceType: "residential",
    budget: "$250k - $500k",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 bg-[#F9F8F5]">
      {/* Page Hero */}
      <section className="py-16 md:py-20 border-b border-[#DCD5CB]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C86D51] font-semibold">
              Inquire Project
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif text-[#1E1C1A] leading-tight">
              Let&apos;s shape your space together.
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
              Whether you are planning a private coastal sanctuary, an urban loft, or a commercial flagship, we invite you to start a conversation with our studio.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form & Contact Info Section */}
      <section className="py-20 border-b border-[#DCD5CB]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Form Column */}
            <div className="lg:col-span-7 bg-white border border-[#E5DFD5] p-8 sm:p-12 shadow-sm space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#1E1C1A]">
                  Consultation Request
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Fill out the form below and our client director will contact you within 24 hours.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 bg-[#F4F9F5] border border-[#BDE0C7] text-[#1E562F] space-y-4 text-center">
                  <CheckCircle2 className="w-12 h-12 text-[#288444] mx-auto animate-bounce" />
                  <h3 className="text-xl font-serif">Thank You for Your Inquiry</h3>
                  <p className="text-xs text-[#2A6E3F] max-w-md mx-auto leading-relaxed">
                    We have received your project details. A member of our senior architectural team will reach out to schedule your private consultation.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="mt-4 border-[#288444] text-[#288444]"
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider font-semibold text-[#1E1C1A]">
                        Full Name *
                      </label>
                      <Input
                        required
                        placeholder="e.g. Victoria Sterling"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider font-semibold text-[#1E1C1A]">
                        Email Address *
                      </label>
                      <Input
                        required
                        type="email"
                        placeholder="e.g. victoria@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider font-semibold text-[#1E1C1A]">
                        Phone Number
                      </label>
                      <Input
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider font-semibold text-[#1E1C1A]">
                        Project Location
                      </label>
                      <Input
                        placeholder="e.g. Aspen, Colorado / Paris"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider font-semibold text-[#1E1C1A]">
                        Service Category
                      </label>
                      <select
                        className="w-full h-12 border border-[#DCD5CB] bg-transparent px-4 text-sm focus:outline-none focus:border-[#1E1C1A]"
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      >
                        <option value="residential">Bespoke Residential Architecture</option>
                        <option value="interior">Interior Architecture & Joinery</option>
                        <option value="commercial">Commercial / Workspace</option>
                        <option value="turnkey">Turnkey Design & Execution</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider font-semibold text-[#1E1C1A]">
                        Estimated Budget
                      </label>
                      <select
                        className="w-full h-12 border border-[#DCD5CB] bg-transparent px-4 text-sm focus:outline-none focus:border-[#1E1C1A]"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      >
                        <option value="$150k - $250k">$150,000 – $250,000</option>
                        <option value="$250k - $500k">$250,000 – $500,000</option>
                        <option value="$500k - $1M">$500,000 – $1,000,000</option>
                        <option value="$1M+">$1,000,000+</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-semibold text-[#1E1C1A]">
                      Project Overview & Vision *
                    </label>
                    <Textarea
                      required
                      placeholder="Tell us about the property, your desired timeline, scope of work, and aesthetic aspirations..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <Button type="submit" variant="accent" size="lg" className="w-full">
                    Submit Project Inquiry
                  </Button>
                </form>
              )}
            </div>

            {/* Direct Studio Info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-[0.25em] text-[#C86D51] font-semibold">
                  Global Presence
                </span>
                <h2 className="text-3xl font-serif text-[#1E1C1A]">
                  Our Studio Offices
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Visit our studios by appointment for material inspections and spatial blueprint reviews.
                </p>
              </div>

              <div className="space-y-6">
                {OFFICES.map((office, idx) => (
                  <div key={idx} className="bg-white border border-[#E5DFD5] p-6 space-y-3 shadow-sm">
                    <h3 className="text-lg font-serif text-[#1E1C1A]">{office.city}</h3>
                    <div className="space-y-1.5 text-xs text-muted-foreground">
                      <p className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#C86D51] shrink-0" />
                        <span>{office.address}, {office.district}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#C86D51] shrink-0" />
                        <span>{office.phone}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-[#C86D51] shrink-0" />
                        <span>{office.email}</span>
                      </p>
                      <p className="flex items-center gap-2 pt-1 border-t border-[#F0ECE4]">
                        <Clock className="w-3.5 h-3.5 text-[#C86D51] shrink-0" />
                        <span>{office.hours}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#F2EFE9]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C86D51] font-semibold">
              Clarifications
            </span>
            <h2 className="text-3xl font-serif text-[#1E1C1A]">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="bg-white p-6 border border-[#E5DFD5]">
            {FAQS.map((faq, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`}>
                <AccordionTrigger className="hover:no-underline font-serif text-[#1E1C1A]">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
