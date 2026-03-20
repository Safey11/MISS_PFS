"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const categories = ["All", "Accounting", "Business Studies", "Economics", "Past Papers", "Revision Notes"];

const resources = [
  {
    id: 1,
    title: "O Level Accounting — Complete Notes",
    description: "Comprehensive chapter-by-chapter notes covering the full CIE O Level Accounting syllabus with worked examples.",
    category: "Accounting",
    level: "O Level",
    type: "PDF",
    size: "4.2 MB",
    pages: 84,
    downloads: 1240,
    date: "Jan 2024",
    free: true,
    color: "amber",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="2" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M7 7h8M7 10.5h8M7 14h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 2,
    title: "A Level Accounting — Ratio Analysis Workbook",
    description: "All 12 key ratios with formulas, interpretation guide, and 30 practice questions with full solutions.",
    category: "Accounting",
    level: "A Level",
    type: "PDF",
    size: "2.1 MB",
    pages: 36,
    downloads: 890,
    date: "Feb 2024",
    free: true,
    color: "stone",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="2" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M7 7h8M7 10.5h8M7 14h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: "Business Studies — Marketing Mix Revision Cards",
    description: "Flashcard-style revision notes on the 4Ps, 7Ps, and marketing strategy with real-world examples.",
    category: "Business Studies",
    level: "O Level",
    type: "PDF",
    size: "1.8 MB",
    pages: 24,
    downloads: 1050,
    date: "Mar 2024",
    free: true,
    color: "amber",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="5" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M7 5V4a1 1 0 011-1h6a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M7 11h8M7 14h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 4,
    title: "Economics — Demand & Supply Diagrams Guide",
    description: "Step-by-step guide to drawing all examinable diagrams for O Level Economics with shift explanations.",
    category: "Economics",
    level: "O Level",
    type: "PDF",
    size: "3.5 MB",
    pages: 48,
    downloads: 760,
    date: "Nov 2023",
    free: true,
    color: "amber",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <polyline points="3,18 8,11 13,14 19,6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="19" cy="6" r="1.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 5,
    title: "O Level Accounting — Past Papers 2018–2023",
    description: "Full collection of CIE O Level Accounting past papers with mark schemes, organized by year and variant.",
    category: "Past Papers",
    level: "O Level",
    type: "ZIP",
    size: "18.4 MB",
    pages: null,
    downloads: 2100,
    date: "Dec 2023",
    free: true,
    color: "amber",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 4h8l6 6v8a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M12 4v6h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M9 13v4M9 13l-2 2M9 13l2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 6,
    title: "A Level Business — Essay Writing Framework",
    description: "Structured approach to answering 20-mark A Level Business Studies essays with model answers and evaluation techniques.",
    category: "Business Studies",
    level: "A Level",
    type: "PDF",
    size: "2.6 MB",
    pages: 32,
    downloads: 670,
    date: "Jan 2024",
    free: false,
    color: "stone",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="2" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M7 7h8M7 10.5h8M7 14h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 7,
    title: "Economics — Macro Policy Revision Notes",
    description: "Clear, concise notes on fiscal, monetary, and supply-side policies with evaluation points for A Level.",
    category: "Economics",
    level: "A Level",
    type: "PDF",
    size: "3.1 MB",
    pages: 52,
    downloads: 540,
    date: "Feb 2024",
    free: false,
    color: "stone",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <polyline points="3,18 8,11 13,14 19,6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="19" cy="6" r="1.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 8,
    title: "A Level Accounts — Past Papers 2019–2023",
    description: "Complete A Level Accounting past paper bundle with detailed mark schemes and examiner reports.",
    category: "Past Papers",
    level: "A Level",
    type: "ZIP",
    size: "22.7 MB",
    pages: null,
    downloads: 1380,
    date: "Dec 2023",
    free: false,
    color: "stone",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 4h8l6 6v8a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M12 4v6h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M9 13v4M9 13l-2 2M9 13l2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 9,
    title: "O Level Commerce — Full Revision Notes",
    description: "All topics summarized with key definitions, diagrams, and quick-recall tables for last-minute revision.",
    category: "Revision Notes",
    level: "O Level",
    type: "PDF",
    size: "5.8 MB",
    pages: 96,
    downloads: 930,
    date: "Oct 2023",
    free: true,
    color: "amber",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 19V5a2 2 0 012-2h12v14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M4 19a2 2 0 002 2h12a2 2 0 002-2" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M9 7h6M9 10.5h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const colorMap = {
  amber: {
    iconBg: "bg-amber-50 border-amber-100 text-amber-700",
    levelBadge: "bg-amber-50 text-amber-800 border-amber-200",
    catBadge: "bg-amber-50/60 text-amber-700",
    dlBtn: "bg-amber-800 hover:bg-amber-900 text-white shadow-[0_3px_12px_rgba(146,64,14,0.2)]",
    lockBtn: "border-amber-200 text-amber-700 hover:bg-amber-50",
    statText: "text-amber-800",
  },
  stone: {
    iconBg: "bg-stone-50 border-stone-200 text-stone-600",
    levelBadge: "bg-stone-100 text-stone-600 border-stone-200",
    catBadge: "bg-stone-50 text-stone-500",
    dlBtn: "bg-stone-800 hover:bg-stone-900 text-white shadow-[0_3px_12px_rgba(30,20,10,0.15)]",
    lockBtn: "border-stone-200 text-stone-600 hover:bg-stone-50",
    statText: "text-stone-700",
  },
};

function useInView(threshold = 0.08) {
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

function ResourceCard({ resource, index, inView }) {
  const [downloading, setDownloading] = useState(false);
  const c = colorMap[resource.color];

  const handleDownload = (e) => {
    e.preventDefault();
    if (!resource.free) return;
    setDownloading(true);
    setTimeout(() => setDownloading(false), 2000);
    // Wire up: window.open(`/resources/${resource.id}.pdf`, '_blank');
  };

  return (
    <div
      className={`group bg-white border border-stone-100 rounded-sm hover:border-stone-200 hover:shadow-[0_6px_28px_rgba(30,20,10,0.07)] transition-all duration-400 flex flex-col
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${120 + index * 80}ms`, transitionDuration: "600ms" }}
    >
      {/* Card top */}
      <div className="p-5 flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className={`w-10 h-10 rounded-sm border flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:scale-105 ${c.iconBg}`}
            style={{ transition: "transform 0.2s" }}>
            {resource.icon}
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className={`text-[10px] px-2 py-0.5 rounded-sm border font-medium tracking-wide ${c.levelBadge}`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {resource.level}
            </span>
            {resource.free ? (
              <span className="text-[10px] px-2 py-0.5 rounded-sm bg-emerald-50 border border-emerald-200 text-emerald-700 font-medium tracking-wide"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Free
              </span>
            ) : (
              <span className="text-[10px] px-2 py-0.5 rounded-sm bg-stone-100 border border-stone-200 text-stone-500 font-medium tracking-wide"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Premium
              </span>
            )}
          </div>
        </div>

        {/* Category tag */}
        <span className={`inline-block text-[10px] tracking-[0.18em] uppercase font-medium mb-2 ${c.catBadge}`}
          style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {resource.category}
        </span>

        {/* Title */}
        <h3 className="text-[17px] font-semibold text-stone-800 leading-snug mb-2"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
          {resource.title}
        </h3>

        {/* Description */}
        <p className="text-[12.5px] leading-relaxed text-stone-500"
          style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {resource.description}
        </p>
      </div>

      {/* Divider */}
      <div className="mx-5 h-px bg-stone-100" />

      {/* Card footer */}
      <div className="p-5">
        {/* Meta info row */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-stone-400">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v6M3 5l3 3 3-3M1 10h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className={`text-[11px] font-medium ${c.statText}`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {resource.downloads.toLocaleString()}
            </span>
          </div>
          {resource.pages && (
            <div className="flex items-center gap-1.5 text-stone-400">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect x="2" y="1" width="8" height="10" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M4 4h4M4 6.5h4M4 9h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <span className="text-[11px] text-stone-400"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {resource.pages}pp
              </span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-stone-400 ml-auto">
            <span className="text-[10px] px-2 py-0.5 bg-stone-50 border border-stone-100 rounded-sm text-stone-500 font-mono">
              {resource.type}
            </span>
            <span className="text-[11px] text-stone-400"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {resource.size}
            </span>
          </div>
        </div>

        {/* Action button */}
        {resource.free ? (
          <button
            onClick={handleDownload}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-sm text-[11px] tracking-widest uppercase font-semibold transition-all duration-200 active:scale-[0.98] ${c.dlBtn}`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {downloading ? (
              <>
                <svg className="animate-spin" width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="20 10" strokeLinecap="round"/>
                </svg>
                Downloading...
              </>
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M6.5 1v8M3.5 6.5l3 3 3-3M1.5 11.5h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download Free
              </>
            )}
          </button>
        ) : (
          <Link
            href="/contact"
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-sm border text-[11px] tracking-widest uppercase font-semibold transition-all duration-200 ${c.lockBtn}`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <rect x="3" y="5.5" width="7" height="6" rx="1" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M4.5 5.5V4a2 2 0 014 0v1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            Request Access
          </Link>
        )}
      </div>
    </div>
  );
}

export default function ResourcesSection() {
  const [sectionRef, inView] = useInView();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  const filtered = resources.filter((r) => {
    const matchCat = activeCategory === "All" || r.category === activeCategory;
    const matchSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFree = !showFreeOnly || r.free;
    return matchCat && matchSearch && matchFree;
  });

  const totalDownloads = resources.reduce((a, r) => a + r.downloads, 0);

  return (
    <section ref={sectionRef} className="relative bg-[#faf8f5] py-28 overflow-hidden">

      {/* Grain texture */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.025]" aria-hidden>
        <filter id="grain3">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#grain3)"/>
      </svg>

      {/* Ambient orb */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(217,119,6,0.06) 0%, transparent 70%)" }}/>

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* ── Header ── */}
        <div className="grid lg:grid-cols-2 gap-10 items-end mb-14">
          <div>
            <div className={`flex items-center gap-4 mb-4 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <span className="w-10 h-px bg-amber-700"/>
              <span className="text-[11px] tracking-[0.25em] uppercase text-amber-700 font-medium"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Study Materials
              </span>
            </div>
            <h2
              className={`text-[42px] lg:text-[54px] font-semibold leading-[1.08] tracking-tight text-stone-800 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", transitionDelay: "80ms" }}
            >
              Resources &{" "}
              <span className="italic text-amber-800">Downloads</span>
            </h2>
            <p
              className={`mt-4 text-[14px] leading-relaxed text-stone-500 max-w-md transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ fontFamily: "'DM Sans', sans-serif", transitionDelay: "160ms" }}
            >
              Carefully crafted notes, past papers, and revision guides. Free resources available instantly — premium materials on request.
            </p>
          </div>

          {/* Summary stats */}
          <div
            className={`grid grid-cols-3 gap-4 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "200ms" }}
          >
            {[
              { n: resources.length, label: "Total Resources" },
              { n: resources.filter((r) => r.free).length, label: "Free to Download" },
              { n: `${(totalDownloads / 1000).toFixed(1)}k`, label: "Total Downloads" },
            ].map((s) => (
              <div key={s.label} className="p-4 bg-white rounded-sm border border-stone-100 text-center">
                <p className="text-[28px] font-semibold text-stone-800 leading-none mb-1"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  {s.n}
                </p>
                <p className="text-[10px] tracking-wide uppercase text-stone-400"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Filters & Search bar ── */}
        <div
          className={`flex flex-col sm:flex-row gap-4 mb-10 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "280ms" }}
        >
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M9.5 9.5l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-stone-200 rounded-sm text-[13px] text-stone-700 placeholder:text-stone-400 focus:outline-none focus:border-amber-400 transition-colors duration-200"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
          </div>

          {/* Free only toggle */}
          <button
            onClick={() => setShowFreeOnly(!showFreeOnly)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-sm border text-[11px] tracking-widest uppercase font-semibold transition-all duration-200
              ${showFreeOnly
                ? "bg-emerald-700 border-emerald-700 text-white"
                : "bg-white border-stone-200 text-stone-600 hover:border-stone-300"}`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M6 3.5V6l2 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            Free Only
          </button>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 sm:ml-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-2 text-[10px] tracking-widest uppercase font-semibold rounded-sm border transition-all duration-200
                  ${activeCategory === cat
                    ? "bg-amber-800 border-amber-800 text-white shadow-sm"
                    : "bg-white border-stone-200 text-stone-500 hover:border-amber-300 hover:text-amber-800"}`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Resource grid ── */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filtered.map((resource, i) => (
              <ResourceCard key={resource.id} resource={resource} index={i} inView={inView}/>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="#a8a29e" strokeWidth="1.4"/>
                <path d="M17 17l3.5 3.5" stroke="#a8a29e" strokeWidth="1.4" strokeLinecap="round"/>
                <path d="M9 11h4M11 9v4" stroke="#a8a29e" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="text-[16px] font-semibold text-stone-700 mb-1"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              No resources found
            </p>
            <p className="text-[13px] text-stone-400"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Try a different search or category filter.
            </p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("All"); setShowFreeOnly(false); }}
              className="mt-4 text-[11px] tracking-widest uppercase text-amber-700 hover:text-amber-900 font-semibold transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Clear filters
            </button>
          </div>
        )}

        {/* ── Bottom request strip ── */}
        <div
          className={`relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-7 bg-white border border-stone-100 rounded-sm shadow-[0_2px_16px_rgba(30,20,10,0.05)] transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "600ms" }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-48 pointer-events-none"
            style={{ background: "linear-gradient(to left, rgba(254,243,199,0.4), transparent)" }}/>
          <div className="flex items-start gap-5">
            <div className="w-11 h-11 rounded-sm bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2l2.4 5.6H18l-4.8 3.6 2 5.8L10 13.4l-5.2 3.6 2-5.8L2 7.6h5.6L10 2Z" stroke="#b45309" strokeWidth="1.3" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-[18px] font-semibold text-stone-800 leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                Need something specific?
              </p>
              <p className="text-[12.5px] text-stone-500 mt-1 max-w-md"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Can't find what you're looking for? Request a specific topic, chapter, or past paper set and I'll have it ready for you.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="relative z-10 inline-flex items-center gap-2 px-6 py-3 border border-amber-800 text-amber-800 text-[11px] tracking-widest uppercase font-semibold rounded-sm hover:bg-amber-800 hover:text-white transition-all duration-300 whitespace-nowrap"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Request a Resource
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
