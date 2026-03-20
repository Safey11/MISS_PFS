"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/Servicessection" },
  { label: "Projects", href: "/ProjectsSection" },
  { label: "Teaching", href: "/experiance" },
  { label: "Resources", href: "/resource" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out
          ${scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_24px_0_rgba(30,20,10,0.08)] py-3"
            : "bg-transparent py-5"
          }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="group flex flex-col leading-tight select-none">
            <span
              className="text-[11px] tracking-[0.22em] uppercase font-medium text-amber-700 transition-opacity duration-300 group-hover:opacity-70"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Writer & Educator
            </span>
            <span
              className="text-[22px] font-semibold tracking-tight text-stone-800 transition-colors duration-300 group-hover:text-amber-800"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Miss Ayesha Khan
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative px-3.5 py-2 text-[12.5px] tracking-wide font-medium transition-colors duration-200 rounded-sm group
                      ${isActive ? "text-amber-800" : "text-stone-600 hover:text-stone-900"}`}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-3.5 right-3.5 h-px bg-amber-700 transition-transform duration-300 origin-left
                        ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA — Desktop */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-[12px] tracking-widest uppercase font-semibold border border-amber-800 text-amber-800 rounded-sm hover:bg-amber-800 hover:text-white transition-all duration-300"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Hire Me
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-sm hover:bg-stone-100 transition-colors duration-200"
          >
            <span className={`block h-px w-6 bg-stone-700 transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block h-px bg-stone-700 transition-all duration-300 ${menuOpen ? "w-0 opacity-0" : "w-5"}`} />
            <span className={`block h-px w-6 bg-stone-700 transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-50 md:hidden transition-all duration-500 ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-stone-900/50 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0"}`}
        />
        <div className={`absolute top-0 right-0 h-full w-72 bg-white shadow-2xl flex flex-col transition-transform duration-500 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>

          <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
            <Link href="/" onClick={() => setMenuOpen(false)} className="flex flex-col leading-tight">
              <span className="text-[10px] tracking-[0.22em] uppercase font-medium text-amber-700"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                Writer & Educator
              </span>
              <span className="text-[17px] font-semibold text-stone-800 tracking-tight"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                Miss Ayesha Khan
              </span>
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors flex-shrink-0"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 3l10 10M13 3L3 13" stroke="#57534e" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <ul className="flex flex-col px-4 py-6 gap-1 flex-1 overflow-y-auto">
            {navLinks.map((link, i) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center justify-between px-4 py-3 rounded-sm text-[14px] font-medium transition-all duration-200
                      ${isActive
                        ? "bg-amber-50 text-amber-800 border-l-2 border-amber-700"
                        : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                      }`}
                    style={{ fontFamily: "'DM Sans', sans-serif", transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
                  >
                    {link.label}
                    {isActive && (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7h8M8 4l3 3-3 3" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="px-6 pb-8">
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 w-full py-3 text-[12px] tracking-widest uppercase font-semibold bg-amber-800 text-white rounded-sm hover:bg-amber-900 transition-colors duration-200"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Hire Me
            </Link>
            <p className="text-center text-[11px] text-stone-400 mt-4 tracking-wide"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Content Writer · Commerce Educator
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
