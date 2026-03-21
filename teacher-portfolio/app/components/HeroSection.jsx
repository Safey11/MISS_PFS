"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const stats = [
  { value: "15+", label: "Years Teaching" },
  { value: "1200+", label: "Students Taught" },
  { value: "98%", label: "Pass Rate" },
  { value: "6", label: "Subjects Covered" },
];

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  // Trigger entrance animations on mount
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Subtle parallax on background orbs
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX / innerWidth - 0.5) * 20,
        y: (e.clientY / innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#faf8f5]"
    >
      {/* ── Background texture & decorative elements ── */}

      {/* Warm paper grain texture via SVG filter */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.035]" aria-hidden>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* Soft ambient orbs */}
      <div
        className="absolute top-[-8%] right-[-5%] w-[560px] h-[560px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(217,119,6,0.10) 0%, transparent 70%)",
          transform: `translate(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px)`,
          transition: "transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      />
      <div
        className="absolute bottom-[-10%] left-[-8%] w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(120,93,47,0.07) 0%, transparent 70%)",
          transform: `translate(${mousePos.x * -0.4}px, ${mousePos.y * -0.4}px)`,
          transition: "transform 1s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      />

      {/* Decorative vertical rule — left */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3">
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-amber-700/30 to-transparent" />
        <span
          className="text-[10px] tracking-[0.3em] text-stone-400 uppercase rotate-90 whitespace-nowrap"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Educator
        </span>
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-amber-700/30 to-transparent" />
      </div>

      {/* Decorative corner bracket — top right */}
      <div className="absolute top-28 right-10 hidden lg:block opacity-20">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M48 0H28V4H44V20H48V0Z" fill="#92400e" />
          <path d="M0 48V28H4V44H20V48H0Z" fill="#92400e" />
        </svg>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Text content */}
          <div className="flex flex-col">

            {/* Eyebrow tag */}
            <div
              className={`inline-flex items-center gap-2 mb-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "0ms" }}
            >
              <span className="w-8 h-px bg-amber-700" />
              <span
                className="text-[11px] tracking-[0.25em] uppercase text-amber-700 font-medium"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Commerce Educator
              </span>
            </div>

            {/* Main heading */}
            <h1
              className={`mb-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                transitionDelay: "120ms",
              }}
            >
              <span className="block text-[52px] lg:text-[68px] font-semibold leading-[1.05] tracking-tight text-stone-800">
                Shaping
              </span>
              <span className="block text-[52px] lg:text-[68px] font-semibold leading-[1.05] tracking-tight text-stone-800">
                Future{" "}
                <span className="italic text-amber-800 relative">
                  Commerce
                  {/* Decorative underline stroke */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="8"
                    viewBox="0 0 200 8"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <path
                      d="M2 6 C40 2, 80 6, 120 4 C160 2, 185 5, 198 4"
                      stroke="#b45309"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      opacity="0.6"
                    />
                  </svg>
                </span>
              </span>
              <span className="block text-[52px] lg:text-[68px] font-semibold leading-[1.05] tracking-tight text-stone-800">
                Leaders
              </span>
            </h1>

            {/* Sub-description */}
            <p
              className={`text-[15px] leading-relaxed text-stone-500 max-w-md mb-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                transitionDelay: "240ms",
              }}
            >
              With over 15 years of dedicated teaching, I bring clarity to complex concepts
              in Accounting, Economics, and Business Studies — building confident,
              exam-ready students.
            </p>

            {/* CTA buttons */}
            <div
              className={`flex flex-wrap gap-4 mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: "360ms" }}
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-amber-800 text-white text-[13px] tracking-widest uppercase font-semibold rounded-sm hover:bg-amber-900 active:scale-[0.98] transition-all duration-200 shadow-[0_4px_20px_rgba(146,64,14,0.25)]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Meet the Teacher
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/subject"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-stone-300 text-stone-700 text-[13px] tracking-widest uppercase font-semibold rounded-sm hover:border-amber-700 hover:text-amber-800 active:scale-[0.98] transition-all duration-200"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                View Subjects
              </Link>
            </div>

            {/* Stats row */}
            <div
              className={`grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-stone-200 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: "480ms" }}
            >
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span
                    className="text-[28px] font-semibold text-stone-800 leading-none"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-[11px] tracking-wide text-stone-400 uppercase"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Visual card */}
          <div
            className={`relative flex justify-center lg:justify-end transition-all duration-1000 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            style={{ transitionDelay: "300ms" }}
          >
            {/* Offset decorative frame */}
            <div className="absolute top-4 left-4 lg:top-6 lg:left-6 w-full max-w-sm h-full border border-amber-700/20 rounded-sm pointer-events-none z-0" />

            {/* Main photo card */}
            <div className="relative z-10 w-full max-w-sm bg-white rounded-sm shadow-[0_8px_48px_rgba(30,20,10,0.12)] overflow-hidden">

              {/* Photo placeholder */}
              <div className="relative h-80 bg-gradient-to-br from-stone-100 to-amber-50 flex items-center justify-center overflow-hidden">
                {/* Replace this div with <Image> when you have the teacher's photo */}
                <div className="flex flex-col items-center gap-3 opacity-40">
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                    <circle cx="28" cy="20" r="12" stroke="#92400e" strokeWidth="1.5" />
                    <path d="M6 50c0-12.15 9.85-22 22-22s22 9.85 22 22" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span className="text-[12px] tracking-wide text-stone-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Teacher's Photo
                  </span>
                </div>

                {/* Subtle diagonal overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent" />

                {/* Subject badge floating top-right */}
                <div
                  className="absolute top-4 right-4 bg-amber-800 text-white px-3 py-1.5 rounded-sm"
                >
                  <span className="text-[10px] tracking-[0.18em] uppercase font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    B.Com · M.Ed
                  </span>
                </div>
              </div>

              {/* Card info footer */}
              <div className="px-6 py-5 border-t border-stone-100">
                <p
                  className="text-[19px] font-semibold text-stone-800 leading-tight mb-0.5"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Miss Ayesha Khan
                </p>
                <p
                  className="text-[12px] text-stone-400 tracking-wide"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Senior Commerce Teacher · O & A Levels
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {["Accounting", "Economics", "Business"].map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-sm tracking-wide"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating experience pill */}
            <div
              className="absolute -bottom-4 -left-4 lg:-left-8 bg-white rounded-sm shadow-[0_4px_24px_rgba(30,20,10,0.10)] px-5 py-3.5 flex items-center gap-3 border border-stone-100 z-20"
              style={{
                animation: visible ? "floatY 4s ease-in-out infinite" : "none",
              }}
            >
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1v6l3 3" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="8" cy="8" r="7" stroke="#b45309" strokeWidth="1.2" />
                </svg>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-stone-800 leading-none mb-0.5" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  15+ Years
                </p>
                <p className="text-[10px] text-stone-400 tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  of Excellence
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
        style={{ transitionDelay: "800ms" }}
      >
        <span
          className="text-[10px] tracking-[0.25em] uppercase text-stone-400"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-stone-300 to-transparent relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full bg-amber-700"
            style={{ height: "40%", animation: "scrollDot 2s ease-in-out infinite" }}
          />
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes scrollDot {
          0% { transform: translateY(-100%); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translateY(250%); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
