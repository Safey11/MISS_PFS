"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const values = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L12.4 7.6H18.4L13.6 11.2L15.6 17L10 13.4L4.4 17L6.4 11.2L1.6 7.6H7.6L10 2Z" stroke="#b45309" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
    title: "Excellence First",
    desc: "Every lesson is crafted with precision — no shortcuts, no compromise on quality.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="#b45309" strokeWidth="1.4" />
        <path d="M10 6v4l3 2" stroke="#b45309" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    title: "Patience & Clarity",
    desc: "Complex topics broken down step-by-step until every student truly understands.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 10h14M3 5h14M3 15h8" stroke="#b45309" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    title: "Exam Strategy",
    desc: "Focused preparation with past papers, marking schemes, and structured revision.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 3C6.13 3 3 6.13 3 10s3.13 7 7 7 7-3.13 7-7" stroke="#b45309" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M13 3l4 4-4 4" stroke="#b45309" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Student Growth",
    desc: "Beyond grades — building analytical thinking and real-world business awareness.",
  },
];

const qualifications = [
  { degree: "Master of Education", field: "Curriculum & Instruction", year: "2012", school: "University of Karachi" },
  { degree: "Bachelor of Commerce", field: "Accounting & Finance", year: "2008", school: "University of Karachi" },
  { degree: "Cambridge Certified", field: "O & A Level Examiner", year: "2015", school: "Cambridge Assessment" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export default function AboutSection() {
  const [sectionRef, inView] = useInView();

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-28 overflow-hidden"
    >
      {/* Subtle background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#78716c 1px, transparent 1px), linear-gradient(90deg, #78716c 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Warm accent blob — top left */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(217,119,6,0.06) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* ── Section header ── */}
        <div className={`flex items-center gap-4 mb-4 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="w-10 h-px bg-amber-700" />
          <span className="text-[11px] tracking-[0.25em] uppercase text-amber-700 font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Who I Am
          </span>
        </div>

        <h2
          className={`text-[42px] lg:text-[54px] font-semibold leading-[1.08] tracking-tight text-stone-800 mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", transitionDelay: "80ms" }}
        >
          A Teacher Who <span className="italic text-amber-800">Truly</span> Cares
        </h2>

        {/* ── Two-column layout ── */}
        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* LEFT — Photo + quote */}
          <div
            className={`transition-all duration-1000 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            style={{ transitionDelay: "160ms" }}
          >
            <div className="relative">
              {/* Offset decorative frame */}
              <div className="absolute -top-3 -left-3 w-full h-full border border-amber-700/20 rounded-sm pointer-events-none z-0" />

              {/* Photo */}
              <div className="relative z-10 w-full aspect-[4/5] bg-gradient-to-br from-stone-100 to-amber-50 rounded-sm overflow-hidden shadow-[0_8px_48px_rgba(30,20,10,0.10)]">
                {/* Replace with real image: <Image src="/teacher.jpg" alt="Ms. Ayesha khan" fill className="object-cover" /> */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-30">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="22" r="14" stroke="#92400e" strokeWidth="1.5" />
                    <path d="M6 58c0-14.36 11.64-26 26-26s26 11.64 26 26" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span className="text-[12px] tracking-wide text-stone-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>Teacher's Photo</span>
                </div>
                {/* Gradient overlay for depth */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-stone-900/30 to-transparent" />
              </div>

              {/* Quote card overlapping photo */}
              <div className="absolute -bottom-6 -right-4 lg:-right-8 z-20 bg-white rounded-sm shadow-[0_4px_32px_rgba(30,20,10,0.12)] p-5 max-w-[240px] border border-stone-100">
                <svg width="22" height="16" viewBox="0 0 22 16" fill="none" className="mb-2">
                  <path d="M0 16V9.6C0 4.267 2.667 1.067 8 0l1.2 1.6C6.133 2.533 4.4 4.4 4 7.2H7V16H0ZM12 16V9.6C12 4.267 14.667 1.067 20 0l1.2 1.6C18.133 2.533 16.4 4.4 16 7.2H19V16H12Z" fill="#e7c99a" />
                </svg>
                <p className="text-[12.5px] leading-relaxed text-stone-600 italic" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "15px" }}>
                  Teaching isn't just a profession — it's the most powerful investment in the future.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-6 h-px bg-amber-700" />
                  <span className="text-[10px] tracking-wide uppercase text-stone-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>Miss Ayesha Khan </span>
                </div>
              </div>
            </div>

            {/* Qualifications below photo */}
            <div className="mt-16 space-y-4">
              <p className="text-[11px] tracking-[0.22em] uppercase text-stone-400 mb-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Qualifications
              </p>
              {qualifications.map((q, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-4 p-4 rounded-sm border border-stone-100 hover:border-amber-200 hover:bg-amber-50/50 transition-all duration-300 group
                    ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: `${400 + i * 80}ms` }}
                >
                  <div className="w-10 h-10 rounded-sm bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 1l7 4-7 4L1 5l7-4Z" stroke="#b45309" strokeWidth="1.2" strokeLinejoin="round" />
                      <path d="M4 7.5V12l4 2.5L12 12V7.5" stroke="#b45309" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-stone-800 leading-tight" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "16px" }}>
                      {q.degree}
                    </p>
                    <p className="text-[12px] text-stone-500 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>{q.field}</p>
                    <p className="text-[11px] text-stone-400 mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{q.school} · {q.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Bio + values */}
          <div
            className={`transition-all duration-1000 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            style={{ transitionDelay: "240ms" }}
          >
            {/* Bio paragraphs */}
            <div className="space-y-5 mb-12">
              <p className="text-[16px] leading-[1.85] text-stone-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                I'm <strong className="text-stone-800 font-semibold"> Miss Ayesha Khan</strong>, a Senior Commerce Teacher with over 15 years
                of experience guiding O & A Level students across Karachi. My journey began
                with a simple belief — that every student, given the right guidance, can
                excel in Commerce.
              </p>
              <p className="text-[16px] leading-[1.85] text-stone-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Over the years I've taught at leading institutions, served as a Cambridge
                examiner, and helped hundreds of students secure top grades. My approach
                blends rigorous academics with a genuine passion for the subject.
              </p>
              <p className="text-[16px] leading-[1.85] text-stone-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Beyond the classroom, I develop tailored study materials, conduct weekend
                revision sessions, and stay current with the latest Cambridge syllabus
                updates — so my students are always one step ahead.
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-10">
              <div className="flex-1 h-px bg-stone-100" />
              <span className="text-[10px] tracking-[0.2em] uppercase text-stone-300" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                My Teaching Philosophy
              </span>
              <div className="flex-1 h-px bg-stone-100" />
            </div>

            {/* Values grid */}
            <div className="grid sm:grid-cols-2 gap-5 mb-12">
              {values.map((v, i) => (
                <div
                  key={i}
                  className={`group p-5 rounded-sm border border-stone-100 hover:border-amber-200 hover:shadow-[0_4px_20px_rgba(146,64,14,0.07)] transition-all duration-300 cursor-default
                    ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                  style={{ transitionDelay: `${320 + i * 80}ms` }}
                >
                  <div className="w-9 h-9 rounded-sm bg-amber-50 border border-amber-100 flex items-center justify-center mb-3 group-hover:bg-amber-100 transition-colors">
                    {v.icon}
                  </div>
                  <p className="text-[15px] font-semibold text-stone-800 mb-1.5" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "17px" }}>
                    {v.title}
                  </p>
                  <p className="text-[12.5px] leading-relaxed text-stone-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA strip */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 p-6 bg-stone-50 rounded-sm border border-stone-100">
              <div>
                <p className="text-[16px] font-semibold text-stone-800 leading-tight" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "19px" }}>
                  Interested in tuition?
                </p>
                <p className="text-[12px] text-stone-400 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Limited slots available each term.
                </p>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-800 text-white text-[12px] tracking-widest uppercase font-semibold rounded-sm hover:bg-amber-900 active:scale-[0.98] transition-all duration-200 whitespace-nowrap shadow-[0_4px_16px_rgba(146,64,14,0.2)]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Get in Touch
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
