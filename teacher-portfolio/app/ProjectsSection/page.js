"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const categories = ["All", "Blog Article", "Website Copy", "Email Copy", "Social Content", "Educational"];

const projects = [
  {
    id: 1,
    title: "The Complete Guide to Business Budgeting",
    category: "Blog Article",
    client: "FinanceHub Blog",
    niche: "Business & Finance",
    excerpt:
      "A 2,800-word comprehensive guide breaking down zero-based budgeting, rolling forecasts, and variance analysis for small business owners.",
    tags: ["Budgeting", "SME Finance", "Long-form"],
    wordCount: "2,800 words",
    readTime: "11 min read",
    result: "Top 3 Google ranking in 6 weeks",
    featured: true,
    color: "amber",
  },
  {
    id: 2,
    title: "Homepage & Services Copy — Accounting Firm",
    category: "Website Copy",
    client: "Khan & Associates CPA",
    niche: "Professional Services",
    excerpt:
      "Full website copy for a Karachi-based accounting firm — homepage, about page, 5 service pages, and a contact page. Clear, trust-building, conversion-focused.",
    tags: ["Homepage", "Service Pages", "B2B"],
    wordCount: "3,200 words",
    readTime: "5 pages",
    result: "30% increase in enquiry form submissions",
    featured: true,
    color: "amber",
  },
  {
    id: 3,
    title: "5-Part Email Welcome Sequence — Online Course",
    category: "Email Copy",
    client: "EduPro Academy",
    niche: "EdTech",
    excerpt:
      "A nurture email sequence for a business studies online course — from welcome email to upsell. Written to feel personal, warm, and value-first.",
    tags: ["Email Sequence", "EdTech", "Nurture"],
    wordCount: "1,500 words",
    readTime: "5 emails",
    result: "42% open rate, 18% click-through",
    featured: false,
    color: "stone",
  },
  {
    id: 4,
    title: "LinkedIn Thought Leadership — Finance Consultant",
    category: "Social Content",
    client: "Independent Finance Consultant",
    niche: "Business & Finance",
    excerpt:
      "12 LinkedIn posts per month for a CFO consultant — covering financial trends, leadership insights, and business tips. Built audience from 800 to 4,200 followers.",
    tags: ["LinkedIn", "Thought Leadership", "Finance"],
    wordCount: "12 posts/month",
    readTime: "Ongoing",
    result: "4,200 followers gained in 4 months",
    featured: false,
    color: "stone",
  },
  {
    id: 5,
    title: "Understanding Inflation — Educational Blog Series",
    category: "Educational",
    client: "EconLearn Platform",
    niche: "Education & Finance",
    excerpt:
      "A 6-part blog series explaining macroeconomic concepts for O & A Level students — inflation, interest rates, fiscal policy — in plain, engaging language.",
    tags: ["Economics", "Education", "Series"],
    wordCount: "6 × 1,200 words",
    readTime: "Series",
    result: "Most-read series on platform for 3 months",
    featured: true,
    color: "amber",
  },
  {
    id: 6,
    title: "Product Descriptions — FinTech App Features",
    category: "Website Copy",
    client: "PayEdge (FinTech Startup)",
    niche: "FinTech",
    excerpt:
      "Feature and product descriptions for a B2B payments app — turning complex technical features into clear, benefit-led copy that speaks to finance managers.",
    tags: ["FinTech", "Product Copy", "B2B"],
    wordCount: "1,800 words",
    readTime: "14 descriptions",
    result: "Launched with zero rewrites needed",
    featured: false,
    color: "stone",
  },
];

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

function ProjectCard({ project, index, inView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative flex flex-col bg-white border rounded-sm overflow-hidden transition-all duration-500
        ${hovered ? "border-amber-200 shadow-[0_12px_40px_rgba(146,64,14,0.10)] -translate-y-1" : "border-stone-100 shadow-none"}
        ${project.featured ? "lg:col-span-1" : ""}
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${120 + index * 90}ms` }}
    >
      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="text-[9px] tracking-[0.18em] uppercase font-semibold px-2.5 py-1 bg-amber-800 text-white rounded-sm"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Featured
          </span>
        </div>
      )}

      {/* Color bar top */}
      <div className={`h-1 w-full transition-all duration-500 ${hovered ? "bg-amber-700" : "bg-stone-100"}`} />

      <div className="p-6 flex flex-col flex-1">
        {/* Category + niche */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] tracking-[0.18em] uppercase font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-sm"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {project.category}
          </span>
          <span className="text-[10px] text-stone-400"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {project.niche}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[20px] font-semibold text-stone-800 leading-snug mb-1.5"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
          {project.title}
        </h3>

        {/* Client */}
        <p className="text-[11px] text-stone-400 mb-4 tracking-wide"
          style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Client: {project.client}
        </p>

        {/* Excerpt */}
        <p className="text-[13px] leading-relaxed text-stone-500 flex-1 mb-5"
          style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {project.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span key={tag}
              className="text-[10px] px-2.5 py-1 bg-stone-50 border border-stone-200 text-stone-500 rounded-sm"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4 pt-4 border-t border-stone-100">
          <div className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="1.5" y="1.5" width="9" height="9" rx="1" stroke="#a8a29e" strokeWidth="1.2"/>
              <path d="M3.5 4.5h5M3.5 6.5h5M3.5 8.5h3" stroke="#a8a29e" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span className="text-[11px] text-stone-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {project.wordCount}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="4.5" stroke="#a8a29e" strokeWidth="1.2"/>
              <path d="M6 3.5V6l2 1.5" stroke="#a8a29e" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span className="text-[11px] text-stone-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {project.readTime}
            </span>
          </div>
        </div>

        {/* Result — revealed on hover */}
        <div className={`overflow-hidden transition-all duration-400 ${hovered ? "max-h-20 opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"}`}>
          <div className="flex items-start gap-2.5 p-3 bg-emerald-50 border border-emerald-100 rounded-sm">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mt-0.5">
              <path d="M2.5 7l3 3 6-6" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[12px] text-emerald-700 font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {project.result}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const [sectionRef, inView] = useInView();
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section ref={sectionRef} className="relative bg-[#faf8f5] py-28 overflow-hidden">

      {/* Grain texture */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.025]" aria-hidden>
        <filter id="grain5">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#grain5)"/>
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div>
            <div className={`flex items-center gap-4 mb-4 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <span className="w-10 h-px bg-amber-700" />
              <span className="text-[11px] tracking-[0.25em] uppercase text-amber-700 font-medium"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Portfolio
              </span>
            </div>
            <h2
              className={`text-[42px] lg:text-[54px] font-semibold leading-[1.08] tracking-tight text-stone-800 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", transitionDelay: "80ms" }}
            >
              Selected <span className="italic text-amber-800">Work</span>
            </h2>
            <p
              className={`mt-4 text-[14px] leading-relaxed text-stone-500 max-w-lg transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ fontFamily: "'DM Sans', sans-serif", transitionDelay: "160ms" }}
            >
              A mix of content types across Business & Finance, Education, and FinTech. Hover any card to see the result it achieved.
            </p>
          </div>

          {/* Filter tabs */}
          <div
            className={`flex flex-wrap gap-2 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "240ms" }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-2 text-[10px] tracking-widest uppercase font-semibold rounded-sm border transition-all duration-200
                  ${activeFilter === cat
                    ? "bg-amber-800 border-amber-800 text-white"
                    : "bg-white border-stone-200 text-stone-500 hover:border-amber-300 hover:text-amber-800"}`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Projects grid ── */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} inView={inView} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="#a8a29e" strokeWidth="1.4"/>
                <path d="M9 9h6M9 13h4" stroke="#a8a29e" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="text-[16px] font-semibold text-stone-700 mb-1"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              No projects in this category yet
            </p>
            <button
              onClick={() => setActiveFilter("All")}
              className="mt-3 text-[11px] tracking-widest uppercase text-amber-700 hover:text-amber-900 font-semibold"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              View all projects
            </button>
          </div>
        )}

        {/* ── Bottom CTA ── */}
        <div
          className={`relative overflow-hidden rounded-sm bg-stone-900 px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "500ms" }}
        >
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(217,119,6,0.15) 0%, transparent 70%)" }}
          />
          <div className="relative z-10">
            <p className="text-[11px] tracking-[0.22em] uppercase text-amber-500 mb-2"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Like what you see?
            </p>
            <h3 className="text-[26px] font-semibold text-white leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              Let's build your next project together.
            </h3>
            <p className="text-[13px] text-stone-400 mt-1.5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Whether it's one article or an entire content strategy — I'm ready.
            </p>
          </div>
          <Link
            href="/contact"
            className="relative z-10 inline-flex items-center gap-2.5 px-7 py-3.5 bg-amber-700 text-white text-[12px] tracking-widest uppercase font-semibold rounded-sm hover:bg-amber-600 active:scale-[0.98] transition-all duration-200 whitespace-nowrap shadow-[0_4px_20px_rgba(217,119,6,0.3)]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Start a Project
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
