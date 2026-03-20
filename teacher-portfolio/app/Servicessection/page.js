"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const services = [
  {
    number: "01",
    title: "Blog & Article Writing",
    description:
      "Long-form, research-backed blog posts and articles that educate, engage, and rank. From 500-word explainers to 3,000-word deep dives — tailored to your brand voice.",
    deliverables: ["SEO-optimised articles", "Research-backed content", "Brand voice matching", "Meta descriptions"],
    turnaround: "3–5 days",
    color: "amber",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 19V5a2 2 0 012-2h12v14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M4 19a2 2 0 002 2h12a2 2 0 002-2" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M9 7h6M9 11h6M9 15h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: "02",
    title: "Website Copywriting",
    description:
      "Compelling homepage, about, and service page copy that converts visitors into clients. Clear, persuasive writing that communicates your value and drives action.",
    deliverables: ["Homepage copy", "About page", "Service pages", "CTA optimization"],
    turnaround: "5–7 days",
    color: "amber",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M7 21h10M12 17v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M7 8h4M7 11h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Email & Newsletter Copy",
    description:
      "Engaging email sequences and newsletters that build relationships and drive clicks. Written to feel personal, professional, and worth opening every single time.",
    deliverables: ["Welcome sequences", "Weekly newsletters", "Promotional emails", "Subject line testing"],
    turnaround: "2–4 days",
    color: "amber",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: "04",
    title: "LinkedIn & Social Content",
    description:
      "Thought leadership posts, carousels, and profile copy for LinkedIn and other platforms. Content that builds authority, grows your network, and attracts opportunities.",
    deliverables: ["LinkedIn posts", "Profile optimisation", "Content calendar", "Carousel scripts"],
    turnaround: "1–3 days",
    color: "amber",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M7 10v7M7 7v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M11 17v-4a2 2 0 014 0v4M11 10v7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: "05",
    title: "Product & Service Descriptions",
    description:
      "Punchy, benefit-led descriptions for products, courses, and services. Copy that sells without sounding salesy — built on clarity, specificity, and value.",
    deliverables: ["Product pages", "Course descriptions", "Feature highlights", "Tone of voice guide"],
    turnaround: "2–3 days",
    color: "amber",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M20 7H4a1 1 0 00-1 1v10a1 1 0 001 1h16a1 1 0 001-1V8a1 1 0 00-1-1z" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M12 12v4M10 14h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: "06",
    title: "Academic & Educational Content",
    description:
      "Curriculum-aligned study guides, educational blog posts, and course content. Backed by 15+ years in the classroom — accurate, structured, and student-friendly.",
    deliverables: ["Study guides", "Course content", "Explainer articles", "Educational blogs"],
    turnaround: "4–6 days",
    color: "stone",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 3L2 8l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M6 10.5V16l6 3 6-3v-5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const process = [
  { step: "01", title: "Discovery Call", desc: "We discuss your goals, audience, and brand voice." },
  { step: "02", title: "Research & Outline", desc: "I research your niche and send a content outline for approval." },
  { step: "03", title: "First Draft", desc: "Full draft delivered within the agreed turnaround time." },
  { step: "04", title: "Revisions", desc: "Up to 2 rounds of revisions until you're completely happy." },
  { step: "05", title: "Final Delivery", desc: "Polished, ready-to-publish content delivered to you." },
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

export default function ServicesSection() {
  const [sectionRef, inView] = useInView();
  const [processRef, processInView] = useInView(0.1);
  const [activeService, setActiveService] = useState(null);

  return (
    <section ref={sectionRef} className="relative bg-white py-28 overflow-hidden">

      {/* Dot grid background */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #78716c 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Warm orb top right */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(217,119,6,0.07) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* ── Header ── */}
        <div className="grid lg:grid-cols-2 gap-10 items-end mb-16">
          <div>
            <div className={`flex items-center gap-4 mb-4 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <span className="w-10 h-px bg-amber-700" />
              <span className="text-[11px] tracking-[0.25em] uppercase text-amber-700 font-medium"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                What I Offer
              </span>
            </div>
            <h2
              className={`text-[42px] lg:text-[54px] font-semibold leading-[1.08] tracking-tight text-stone-800 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", transitionDelay: "80ms" }}
            >
              Words That <br />
              <span className="italic text-amber-800">Work</span> For You
            </h2>
            <p
              className={`mt-4 text-[14px] leading-relaxed text-stone-500 max-w-md transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ fontFamily: "'DM Sans', sans-serif", transitionDelay: "160ms" }}
            >
              Business & Finance content with the clarity of an educator and the sharpness of a writer. Hover any service to see what's included.
            </p>
          </div>

          {/* Credential pill */}
          <div
            className={`flex flex-col gap-4 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="p-5 bg-stone-900 rounded-sm text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(217,119,6,0.18) 0%, transparent 70%)" }}
              />
              <p className="text-[11px] tracking-[0.22em] uppercase text-amber-500 mb-2 relative z-10"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                The edge you get
              </p>
              <p className="text-[16px] leading-relaxed text-stone-200 relative z-10"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "18px" }}>
                "15+ years teaching Business & Finance means my content doesn't just sound good — it's <em>technically accurate</em> and built to educate."
              </p>
              <div className="flex items-center gap-2 mt-4 relative z-10">
                <span className="w-5 h-px bg-amber-600" />
                <span className="text-[10px] tracking-wide uppercase text-stone-400"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Miss Ayesha Khan
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Services grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {services.map((service, i) => (
            <div
              key={i}
              onMouseEnter={() => setActiveService(i)}
              onMouseLeave={() => setActiveService(null)}
              className={`group relative flex flex-col p-6 border rounded-sm cursor-default transition-all duration-400
                ${activeService === i
                  ? "border-amber-200 shadow-[0_8px_32px_rgba(146,64,14,0.10)] bg-amber-50/30 -translate-y-1"
                  : "border-stone-100 bg-white hover:border-amber-100"
                }
                ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${120 + i * 80}ms` }}
            >
              {/* Number */}
              <span
                className="absolute top-5 right-5 text-[11px] font-medium text-stone-300 tracking-widest"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {service.number}
              </span>

              {/* Icon */}
              <div className={`w-11 h-11 rounded-sm border flex items-center justify-center mb-5 transition-colors duration-300 flex-shrink-0
                ${activeService === i
                  ? "bg-amber-100 border-amber-200 text-amber-800"
                  : "bg-stone-50 border-stone-200 text-stone-600"
                }`}>
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-[19px] font-semibold text-stone-800 mb-2 leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-[13px] leading-relaxed text-stone-500 flex-1 mb-5"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {service.description}
              </p>

              {/* Deliverables — show on hover */}
              <div className={`overflow-hidden transition-all duration-400 ${activeService === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                <p className="text-[10px] tracking-[0.18em] uppercase text-stone-400 mb-2"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Includes
                </p>
                <ul className="space-y-1.5 mb-4">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 flex-shrink-0" />
                      <span className="text-[12px] text-stone-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {d}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-stone-100 mt-auto">
                <div className="flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="5" stroke="#a8a29e" strokeWidth="1.2"/>
                    <path d="M6 3.5V6l2 1.5" stroke="#a8a29e" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  <span className="text-[11px] text-stone-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {service.turnaround}
                  </span>
                </div>
                <Link
                  href="/contact"
                  className={`text-[10px] tracking-widest uppercase font-semibold transition-all duration-200
                    ${activeService === i ? "text-amber-800 underline underline-offset-2" : "text-stone-400 hover:text-amber-700"}`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Enquire →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ── My Process ── */}
        <div ref={processRef} className="mb-16">
          <div className={`text-center mb-12 transition-all duration-700 ${processInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="w-10 h-px bg-amber-700" />
              <span className="text-[11px] tracking-[0.25em] uppercase text-amber-700 font-medium"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                How It Works
              </span>
              <span className="w-10 h-px bg-amber-700" />
            </div>
            <h3 className="text-[34px] font-semibold text-stone-800"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              My Writing Process
            </h3>
          </div>

          {/* Process steps */}
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-8 left-0 right-0 h-px bg-stone-100 hidden lg:block" />

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {process.map((p, i) => (
                <div
                  key={i}
                  className={`relative flex flex-col items-center text-center transition-all duration-700
                    ${processInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {/* Step circle */}
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-amber-200 flex items-center justify-center mb-4 relative z-10 shadow-[0_2px_12px_rgba(146,64,14,0.1)]">
                    <span className="text-[13px] font-semibold text-amber-800"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "15px" }}>
                      {p.step}
                    </span>
                  </div>
                  <p className="text-[15px] font-semibold text-stone-800 mb-1.5"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                    {p.title}
                  </p>
                  <p className="text-[12px] leading-relaxed text-stone-500"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA Banner ── */}
        <div
          className={`relative overflow-hidden rounded-sm bg-[#faf8f5] border border-amber-100 px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-all duration-700 ${processInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "400ms" }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-64 pointer-events-none"
            style={{ background: "linear-gradient(to left, rgba(254,243,199,0.5), transparent)" }}
          />
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-amber-700 mb-2"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Ready to get started?
            </p>
            <h4 className="text-[26px] font-semibold text-stone-800 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              Let's create content that <em className="text-amber-800">converts.</em>
            </h4>
            <p className="text-[13px] text-stone-500 mt-1"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Drop me a message and I'll get back to you within 24 hours.
            </p>
          </div>
          <Link
            href="/contact"
            className="relative z-10 inline-flex items-center gap-2.5 px-7 py-3.5 bg-amber-800 text-white text-[12px] tracking-widest uppercase font-semibold rounded-sm hover:bg-amber-900 active:scale-[0.98] transition-all duration-200 whitespace-nowrap shadow-[0_4px_20px_rgba(146,64,14,0.25)]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Work With Me
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
