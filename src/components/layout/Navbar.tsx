"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ArrowUpRight, Compass, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About Studio", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-glass border-b border-[#DCD5CB]/60 py-4 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-9 h-9 border border-[#1E1C1A] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
            <span className="font-serif font-bold text-lg leading-none">वि</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-xl tracking-widest text-[#1E1C1A] uppercase">
              विNYASA
            </span>
            <span className="text-[9px] tracking-[0.25em] text-muted-foreground uppercase -mt-1 font-sans">
              Architecture & Studio
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-9">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-xs tracking-widest uppercase font-medium transition-colors hover:text-[#C86D51] py-1 ${
                  isActive ? "text-[#C86D51]" : "text-[#1E1C1A]/80"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C86D51]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <Button asChild variant="default" size="sm">
            <Link href="/contact" className="flex items-center gap-2">
              <span>Book Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>

        {/* Mobile Hamburger Sheet */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open Navigation Menu">
                <Menu className="w-6 h-6 text-[#1E1C1A]" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col justify-between pt-12">
              <SheetHeader className="text-left border-b border-[#DCD5CB] pb-6">
                <SheetTitle className="text-2xl font-serif tracking-widest uppercase">
                  विNYASA
                </SheetTitle>
                <p className="text-xs text-muted-foreground tracking-wider uppercase">
                  Architecture & Interior Design
                </p>
              </SheetHeader>

              {/* Mobile Navigation List */}
              <div className="flex flex-col gap-6 my-auto">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className={`text-xl font-serif transition-colors ${
                          isActive ? "text-[#C86D51]" : "text-[#1E1C1A] hover:text-[#C86D51]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  );
                })}
              </div>

              {/* Mobile Drawer Bottom Details */}
              <div className="border-t border-[#DCD5CB] pt-6 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <Phone className="w-4 h-4 text-[#C86D51]" />
                  <span>+1 (212) 555-0198</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <Mail className="w-4 h-4 text-[#C86D51]" />
                  <span>concierge@vinyasa-studio.com</span>
                </div>
                <SheetClose asChild>
                  <Button asChild variant="accent" className="w-full mt-2">
                    <Link href="/contact">Inquire Project</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
