"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const subjects = [
  {
    code: "0452",
    title: "Accounting",
    board: "Cambridge O Level",
    level: "O Level",
    color: "amber",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="3" width="20" height="22" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 9h12M8 13h12M8 17h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M17 20l1.5 1.5L21 18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    description:
      "Master double-entry bookkeeping, financial statements, and profit & loss accounts with exam-focused strategies.",
    topics: ["Double Entry", "Trial Balance", "Final Accounts", "Depreciation", "Bank Reconciliation"],
    examTips: "Focus on layouts — examiners reward neat, structured answers.",
    students: "320+",
    passRate: "97%",
    sessions: "O Level · Mon & Wed",
  },
  {
    code: "9706",
    title: "Accounting",
    board: "Cambridge A Level",
    level: "A Level",
    color: "stone",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="3" width="20" height="22" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 9h12M8 13h12M8 17h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M17 20l1.5 1.5L21 18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    description:
      "Advanced financial and management accounting, company accounts, and cost analysis for A Level success.",
    topics: ["Partnership Accounts", "Limited Companies", "Costing", "Budgeting", "Ratio Analysis"],
    examTips: "Ratio analysis questions carry heavy marks — practise all 12 key ratios.",
    students: "180+",
    passRate: "95%",
    sessions: "A Level · Tue & Thu",
  },
  {
    code: "0455",
    title: "Business Studies",
    board: "Cambridge O Level",
    level: "O Level",
    color: "amber",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4L24 9v10L14 24 4 19V9L14 4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <circle cx="14" cy="14" r="3" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
    description:
      "Understand how businesses operate, market, finance, and grow — with real-world case study application.",
    topics: ["Business Organisation", "Marketing Mix", "Human Resources", "Finance", "Operations"],
    examTips: "Always apply theory to the case study — generic answers score poorly.",
    students: "290+",
    passRate: "96%",
    sessions: "O Level · Sat AM",
  },
  {
    code: "9609",
    title: "Business Studies",
    board: "Cambridge A Level",
    level: "A Level",
    color: "stone",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4L24 9v10L14 24 4 19V9L14 4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <circle cx="14" cy="14" r="3" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
    description:
      "Strategic business decision-making, leadership, global markets, and evaluative essay writing for A Level.",
    topics: ["Corporate Strategy", "Leadership", "Global Business", "Change Management", "Investment Appraisal"],
    examTips: "Essays need evaluation — always end with a justified conclusion.",
    students: "140+",
    passRate: "94%",
    sessions: "A Level · Sat PM",
  },
  {
    code: "0455",
    title: "Economics",
    board: "Cambridge O Level",
    level: "O Level",
    color: "amber",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <polyline points="4,22 10,14 16,17 24,8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="8" r="2" fill="currentColor" />
      </svg>
    ),
    description:
      "Microeconomics and macroeconomics fundamentals — demand, supply, markets, money, and government policy.",
    topics: ["Demand & Supply", "Market Structures", "Inflation", "Trade", "Government Policy"],
    examTips: "Always draw neat diagrams — they can earn up to 4 marks on their own.",
    students: "260+",
    passRate: "96%",
    sessions: "O Level · Wed & Fri",
  },
  {
    code: "9708",
    title: "Economics",
    board: "Cambridge A Level",
    level: "A Level",
    color: "stone",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <polyline points="4,22 10,14 16,17 24,8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="8" r="2" fill="currentColor" />
      </svg>
    ),
    description:
      "Advanced microeconomic theory, macroeconomic models, data response, and essay writing for A Level.",
    topics: ["Theory of the Firm", "Market Failure", "National Income", "Monetary Policy", "Development Economics"],
    examTips: "Data response requires precise calculations — show every working step.",
    students: "120+",
    passRate: "93%",
    sessions: "A Level · Fri & Sun",
  },
];

const levelColors = {
  amber: {
    badge: "bg-amber-50 text-amber-800 border-amber-200",
    icon: "text-amber-700 bg-amber-50 border-amber-100",
    accent: "bg-amber-700",
    tag: "bg-amber-50 text-amber-700 border-amber-200",
    hover: "hover:border-amber-200 hover:shadow-[0_8px_32px_rgba(146,64,14,0.08)]",
    dot: "bg-amber-700",
  },
  stone: {
    badge: "bg-stone-100 text-stone-600 border-stone-200",
    icon: "text-stone-600 bg-stone-50 border-stone-200",
    accent: "bg-stone-700",
    tag: "bg-stone-50 text-stone-600 border-stone-200",
    hover: "hover:border-stone-300 hover:shadow-[0_8px_32px_rgba(30,20,10,0.07)]",
    dot: "bg-stone-500",
  },
};

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function SubjectCard({ subject, index, inView }) {
  const [flipped, setFlipped] = useState(false);
  const c = levelColors[subject.color];

  return (
    <div
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: `${150 + index * 100}ms`, perspective: "1000px" }}
    >
      <div
        className="relative w-full cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          height: "320px",
        }}
        onClick={() => setFlipped(!flipped)}
        role="button"
        aria-label={`${flipped ? "Hide" : "Show"} details for ${subject.title} ${subject.board}`}
      >
        {/* ── FRONT ── */}
        <div
          className={`absolute inset-0 rounded-sm border border-stone-100 bg-white p-6 flex flex-col transition-all duration-300 ${c.hover}`}
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Top row */}
          <div className="flex items-start justify-between mb-5">
            <div className={`w-12 h-12 rounded-sm border flex items-center justify-center ${c.icon}`}>
              {subject.icon}
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className={`text-[10px] px-2.5 py-1 rounded-sm border font-medium tracking-wide ${c.badge}`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {subject.level}
              </span>
              <span className="text-[10px] text-stone-400 tracking-wide"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {subject.code}
              </span>
            </div>
          </div>

          {/* Title & board */}
          <div className="mb-3">
            <h3 className="text-[22px] font-semibold text-stone-800 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              {subject.title}
            </h3>
            <p className="text-[12px] text-stone-400 mt-0.5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {subject.board}
            </p>
          </div>

          {/* Description */}
          <p className="text-[13px] leading-relaxed text-stone-500 flex-1"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {subject.description}
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-stone-100">
            <div className="text-center">
              <p className="text-[18px] font-semibold text-stone-800 leading-none"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                {subject.students}
              </p>
              <p className="text-[9px] tracking-wide uppercase text-stone-400 mt-0.5"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Students
              </p>
            </div>
            <div className="w-px h-8 bg-stone-100" />
            <div className="text-center">
              <p className="text-[18px] font-semibold text-stone-800 leading-none"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                {subject.passRate}
              </p>
              <p className="text-[9px] tracking-wide uppercase text-stone-400 mt-0.5"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Pass Rate
              </p>
            </div>
            <div className="w-px h-8 bg-stone-100" />
            {/* Flip hint */}
            <div className="flex items-center gap-1.5 text-stone-400">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 6.5C2 4.01 4.01 2 6.5 2s4.5 2.01 4.5 4.5S8.99 11 6.5 11"
                  stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M4 9l-1.5 2L1 9" stroke="currentColor" strokeWidth="1.2"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[10px] tracking-wide"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Details
              </span>
            </div>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className={`absolute inset-0 rounded-sm border bg-white p-6 flex flex-col ${subject.color === "amber" ? "border-amber-200" : "border-stone-200"}`}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {/* Back header */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-stone-400 mb-1"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {subject.board}
              </p>
              <h4 className="text-[20px] font-semibold text-stone-800"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                {subject.title} — Topics
              </h4>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setFlipped(false); }}
              className="w-7 h-7 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 2l8 8M10 2l-8 8" stroke="#78716c" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Topics */}
          <div className="flex flex-wrap gap-2 mb-5">
            {subject.topics.map((t) => (
              <span key={t} className={`text-[11px] px-2.5 py-1 rounded-sm border tracking-wide ${c.tag}`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {t}
              </span>
            ))}
          </div>

          {/* Exam tip */}
          <div className={`flex-1 p-4 rounded-sm ${subject.color === "amber" ? "bg-amber-50 border border-amber-100" : "bg-stone-50 border border-stone-100"}`}>
            <p className="text-[10px] tracking-[0.2em] uppercase text-stone-400 mb-2"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Exam Tip
            </p>
            <p className="text-[13px] leading-relaxed text-stone-600 italic"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "15px" }}>
              "{subject.examTips}"
            </p>
          </div>

          {/* Session info + CTA */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${c.dot}`} />
              <span className="text-[11px] text-stone-500"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {subject.sessions}
              </span>
            </div>
            <Link
              href="/contact"
              onClick={(e) => e.stopPropagation()}
              className={`text-[10px] tracking-widest uppercase font-semibold px-3 py-1.5 rounded-sm transition-all duration-200
                ${subject.color === "amber"
                  ? "bg-amber-800 text-white hover:bg-amber-900"
                  : "bg-stone-800 text-white hover:bg-stone-900"}`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Enrol
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SubjectsSection() {
  const [sectionRef, inView] = useInView();
  const [filter, setFilter] = useState("All");
  const filters = ["All", "O Level", "A Level"];

  const filtered = filter === "All" ? subjects : subjects.filter((s) => s.level === filter);

  return (
    <section ref={sectionRef} className="relative bg-white py-28 overflow-hidden">

      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #78716c 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div>
            <div className={`flex items-center gap-4 mb-4 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <span className="w-10 h-px bg-amber-700" />
              <span className="text-[11px] tracking-[0.25em] uppercase text-amber-700 font-medium"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                What I Teach
              </span>
            </div>
            <h2
              className={`text-[42px] lg:text-[54px] font-semibold leading-[1.08] tracking-tight text-stone-800 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", transitionDelay: "80ms" }}
            >
              Subjects &{" "}
              <span className="italic text-amber-800">Expertise</span>
            </h2>
            <p
              className={`mt-4 text-[14px] leading-relaxed text-stone-500 max-w-lg transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ fontFamily: "'DM Sans', sans-serif", transitionDelay: "160ms" }}
            >
              Covering Cambridge O & A Level commerce subjects with structured lessons, past paper practice, and proven exam strategies. Flip any card to explore topics and tips.
            </p>
          </div>

          {/* Filter tabs */}
          <div
            className={`flex items-center gap-1 p-1 bg-stone-100 rounded-sm self-start lg:self-end transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "240ms" }}
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-[11px] tracking-widest uppercase font-semibold rounded-sm transition-all duration-200
                  ${filter === f
                    ? "bg-white text-amber-800 shadow-sm border border-stone-200"
                    : "text-stone-500 hover:text-stone-700"}`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* ── Subject cards grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filtered.map((subject, i) => (
            <SubjectCard key={`${subject.title}-${subject.level}`} subject={subject} index={i} inView={inView} />
          ))}
        </div>

        {/* ── Bottom CTA strip ── */}
        <div
          className={`relative overflow-hidden rounded-sm bg-stone-900 px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "500ms" }}
        >
          {/* Background accent */}
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(217,119,6,0.15) 0%, transparent 70%)" }} />

          <div className="relative z-10">
            <p className="text-[11px] tracking-[0.22em] uppercase text-amber-600 mb-2"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Not sure which subject?
            </p>
            <h3 className="text-[26px] font-semibold text-white leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              Let's find the right fit for you.
            </h3>
            <p className="text-[13px] text-stone-400 mt-1.5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Send a message and I'll guide you based on your syllabus and goals.
            </p>
          </div>
          <Link
            href="/contact"
            className="relative z-10 inline-flex items-center gap-2.5 px-7 py-3.5 bg-amber-700 text-white text-[12px] tracking-widest uppercase font-semibold rounded-sm hover:bg-amber-600 active:scale-[0.98] transition-all duration-200 whitespace-nowrap shadow-[0_4px_20px_rgba(217,119,6,0.3)]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Get Guidance
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
