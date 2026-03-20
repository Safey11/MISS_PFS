"use client";

import { useEffect, useRef, useState } from "react";

const experiences = [
  {
    period: "2018 — Present",
    role: "Senior Commerce Teacher",
    institution: "Guards Public collage",
    location: "Karachi, Pakistan",
    type: "Full-time",
    subjects: ["Accounting", "Business Studies", "Economics"],
    highlights: [
      "Consistently achieved 95%+ pass rates across O & A Level batches",
      "Developed a comprehensive revision booklet adopted school-wide",
      "Mentored 3 junior teachers on Cambridge syllabus delivery",
      "Coordinated inter-school commerce olympiad for 3 consecutive years",
    ],
  },
  {
    period: "2014 — 2018",
    role: "Commerce & Accounts Teacher",
    institution: "Beaconhouse School System",
    location: "Karachi, Pakistan",
    type: "Full-time",
    subjects: ["Accounting", "Commerce"],
    highlights: [
      "Taught O Level Accounting to batches of 30–40 students",
      "Introduced case-study based learning to improve conceptual clarity",
      "Achieved school's highest A* rate in Accounting (2017)",
      "Served as House Coordinator and Academic Counsellor",
    ],
  },
  {
    period: "2010 — 2014",
    role: "Business Studies Teacher",
    institution: "Karachi Grammar School",
    location: "Karachi, Pakistan",
    type: "Full-time",
    subjects: ["Business Studies", "Economics"],
    highlights: [
      "Designed structured lesson plans aligned with CIE syllabus",
      "Organized business simulation workshops for A Level students",
      "Contributed to school's academic review panel",
    ],
  },
  {
    period: "2008 — 2010",
    role: "Junior Commerce Teacher",
    institution: "Army Public School",
    location: "Karachi, Pakistan",
    type: "Full-time",
    subjects: ["Commerce", "Principles of Accounts"],
    highlights: [
      "Delivered foundational commerce curriculum to Matric students",
      "Prepared and graded internal assessment papers",
      "Awarded 'Best New Teacher' at annual staff ceremony",
    ],
  },
];

const milestones = [
  { year: "2008", label: "Career Began" },
  { year: "2012", label: "M.Ed Completed" },
  { year: "2015", label: "Cambridge Examiner" },
  { year: "2018", label: "Senior Teacher" },
  { year: "2023", label: "1200+ Students" },
];

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function ExperienceCard({ exp, index, inView }) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <div
      className={`relative transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${200 + index * 120}ms` }}
    >
      {/* Timeline dot & line */}
      <div className="absolute left-0 top-0 flex flex-col items-center" style={{ width: "28px" }}>
        <div className={`w-3 h-3 rounded-full border-2 mt-5 flex-shrink-0 transition-colors duration-300 ${expanded ? "bg-amber-700 border-amber-700" : "bg-white border-stone-300"}`} />
        {index < experiences.length - 1 && (
          <div className="w-px flex-1 mt-2" style={{ minHeight: "100%", background: "linear-gradient(to bottom, #d6d3d1, transparent)" }} />
        )}
      </div>

      {/* Card */}
      <div className="ml-10">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left group"
          aria-expanded={expanded}
        >
          <div className={`p-6 rounded-sm border transition-all duration-300 ${expanded ? "border-amber-200 bg-amber-50/40 shadow-[0_4px_24px_rgba(146,64,14,0.07)]" : "border-stone-100 bg-white hover:border-amber-100 hover:bg-stone-50/60"}`}>

            {/* Top row */}
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                {/* Period badge */}
                <span
                  className="inline-block text-[10px] tracking-[0.2em] uppercase text-amber-700 font-medium mb-2"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {exp.period}
                </span>
                {/* Role */}
                <h3
                  className="text-[20px] font-semibold text-stone-800 leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {exp.role}
                </h3>
                {/* Institution */}
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className="text-[13px] text-stone-600 font-medium"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {exp.institution}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-stone-300" />
                  <span
                    className="text-[12px] text-stone-400"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Right side: type badge + expand icon */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <span
                  className="text-[10px] px-2.5 py-1 bg-stone-100 text-stone-500 rounded-sm tracking-wide border border-stone-200"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {exp.type}
                </span>
                <div className={`w-7 h-7 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${expanded ? "bg-amber-800 border-amber-800" : "border-stone-200 bg-white"}`}>
                  <svg
                    width="12" height="12" viewBox="0 0 12 12" fill="none"
                    className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                  >
                    <path d="M2 4l4 4 4-4" stroke={expanded ? "#fff" : "#78716c"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Subject tags */}
            <div className="flex flex-wrap gap-2">
              {exp.subjects.map((s) => (
                <span
                  key={s}
                  className="text-[10px] px-2.5 py-1 bg-white border border-amber-200 text-amber-800 rounded-sm tracking-wide"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </button>

        {/* Expandable highlights */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="ml-0 mt-px border-x border-b border-amber-100 rounded-b-sm bg-white px-6 py-5">
            <p
              className="text-[10px] tracking-[0.22em] uppercase text-stone-400 mb-4"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Key Highlights
            </p>
            <ul className="space-y-3">
              {exp.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-700 flex-shrink-0" />
                  <span
                    className="text-[13.5px] leading-relaxed text-stone-600"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {h}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const [sectionRef, inView] = useInView();
  const [milestoneRef, milestoneInView] = useInView(0.3);

  return (
    <section ref={sectionRef} className="relative bg-[#faf8f5] py-28 overflow-hidden">

      {/* Background texture */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.025]" aria-hidden>
        <filter id="grain2">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain2)" />
      </svg>

      {/* Ambient orb */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(217,119,6,0.07) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* ── Section header ── */}
        <div className="grid lg:grid-cols-2 gap-10 items-end mb-16">
          <div>
            <div className={`flex items-center gap-4 mb-4 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <span className="w-10 h-px bg-amber-700" />
              <span className="text-[11px] tracking-[0.25em] uppercase text-amber-700 font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Career Journey
              </span>
            </div>
            <h2
              className={`text-[42px] lg:text-[54px] font-semibold leading-[1.08] tracking-tight text-stone-800 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", transitionDelay: "80ms" }}
            >
              15 Years of <br />
              <span className="italic text-amber-800">Dedicated</span> Teaching
            </h2>
          </div>

          {/* Summary stats */}
          <div
            className={`grid grid-cols-3 gap-4 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "160ms" }}
          >
            {[
              { n: "4", label: "Institutions" },
              { n: "15+", label: "Years Experience" },
              { n: "12+", label: "Courses Taught" },
            ].map((s) => (
              <div key={s.label} className="p-4 bg-white rounded-sm border border-stone-100 text-center">
                <p className="text-[30px] font-semibold text-stone-800 leading-none mb-1"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{s.n}</p>
                <p className="text-[10px] tracking-wide uppercase text-stone-400"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Career milestone bar ── */}
        <div
          ref={milestoneRef}
          className={`relative mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "240ms" }}
        >
          <div className="relative flex items-center justify-between px-4 py-6 bg-white rounded-sm border border-stone-100 overflow-hidden">
            {/* Progress line */}
            <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-px bg-stone-100" />
            <div
              className="absolute left-8 top-1/2 -translate-y-1/2 h-px bg-amber-700/40 transition-all duration-1500"
              style={{ right: "8px", transitionDelay: "400ms" }}
            />

            {milestones.map((m, i) => (
              <div
                key={i}
                className={`relative flex flex-col items-center gap-2 z-10 transition-all duration-500 ${milestoneInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${300 + i * 100}ms` }}
              >
                <span
                  className="text-[10px] tracking-wide text-stone-400 hidden sm:block"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {m.label}
                </span>
                <div className={`w-2.5 h-2.5 rounded-full border-2 ${i === milestones.length - 1 ? "bg-amber-700 border-amber-700" : "bg-white border-amber-700/50"}`} />
                <span
                  className="text-[12px] font-semibold text-stone-700"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "14px" }}
                >
                  {m.year}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Main timeline ── */}
        <div className="lg:grid lg:grid-cols-[1fr_2fr] gap-16 items-start">

          {/* Left sticky label */}
          <div className="hidden lg:block sticky top-32">
            <div
              className={`transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}
              style={{ transitionDelay: "160ms" }}
            >
              <p
                className="text-[13px] leading-relaxed text-stone-500 mb-8"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Click any position to expand details about that role, the subjects taught, and key achievements.
              </p>

              {/* Download CV button */}
              <a
                href="/cv.pdf"
                download
                className="inline-flex items-center gap-2.5 px-5 py-3 border border-amber-800 text-amber-800 text-[11px] tracking-widest uppercase font-semibold rounded-sm hover:bg-amber-800 hover:text-white transition-all duration-300 group"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Download CV
              </a>

              {/* Decorative element */}
              <div className="mt-12 w-full h-px bg-gradient-to-r from-amber-700/30 to-transparent" />
              <div className="mt-6 flex flex-col gap-2">
                <p className="text-[10px] tracking-[0.2em] uppercase text-stone-300" style={{ fontFamily: "'DM Sans', sans-serif" }}>Currently at</p>
                <p className="text-[18px] font-semibold text-stone-700" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Guards Public Collage</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] text-stone-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>Open to tuition inquiries</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Timeline cards */}
          <div className="relative space-y-4 pl-1">
            {experiences.map((exp, i) => (
              <ExperienceCard key={i} exp={exp} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
