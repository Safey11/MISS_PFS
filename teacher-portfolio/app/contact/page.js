"use client";

import { useState } from "react";

const subjectOptions = [
  "Accounting (O Level)",
  "Accounting (A Level)",
  "Business Studies (O Level)",
  "Business Studies (A Level)",
  "Economics (O Level)",
  "Economics (A Level)",
  "General Enquiry",
  "Resource Request",
];

const levelOptions = ["O Level", "A Level", "Not sure yet"];

const contactInfo = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 4h12a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M2 5l7 5 7-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    label: "Email",
    value: "rahil.ahmed@teacher.com",
    href: "mailto:rahil.ahmed@teacher.com",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3.5 2h3l1.5 4-2 1.5a10 10 0 004.5 4.5L12 10l4 1.5v3A1.5 1.5 0 0114.5 16C7 16 2 11 2 3.5A1.5 1.5 0 013.5 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Phone",
    value: "+92 300 1234567",
    href: "tel:+923001234567",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 1C6.24 1 4 3.24 4 6c0 4 5 11 5 11s5-7 5-11c0-2.76-2.24-5-5-5z" stroke="currentColor" strokeWidth="1.3"/>
        <circle cx="9" cy="6" r="2" stroke="currentColor" strokeWidth="1.3"/>
      </svg>
    ),
    label: "Location",
    value: "Karachi, Pakistan",
    href: null,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M9 5v4l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    label: "Response Time",
    value: "Within 1–2 business days",
    href: null,
  },
];

function InputField({ label, required, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-[11px] tracking-[0.18em] uppercase font-medium text-stone-500"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {label}
        {required && <span className="text-amber-700 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-[11px] text-red-500 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "w-full px-4 py-3 bg-white border border-stone-200 rounded-sm text-[14px] text-stone-800 placeholder:text-stone-300 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all duration-200";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    level: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [serverMessage, setServerMessage] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address.";
    if (!form.subject) e.subject = "Please select a subject.";
    if (!form.message.trim()) e.message = "Message is required.";
    else if (form.message.trim().length < 20)
      e.message = "Message must be at least 20 characters.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");
    setServerMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setServerMessage(data.message);
        setForm({ name: "", email: "", phone: "", subject: "", level: "", message: "" });
      } else {
        setStatus("error");
        setServerMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setServerMessage("Network error. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-[#faf8f5] relative overflow-hidden">

      {/* Grain texture */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.025]" aria-hidden>
        <filter id="grain4">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#grain4)"/>
      </svg>

      {/* Ambient orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(217,119,6,0.08) 0%, transparent 70%)" }}/>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(120,93,47,0.05) 0%, transparent 70%)" }}/>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-36 pb-24">

        {/* ── Page header ── */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="w-10 h-px bg-amber-700"/>
            <span className="text-[11px] tracking-[0.25em] uppercase text-amber-700 font-medium"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Get in Touch
            </span>
          </div>
          <h1
            className="text-[46px] lg:text-[60px] font-semibold leading-[1.06] tracking-tight text-stone-800 mb-5"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Let's Start a{" "}
            <span className="italic text-amber-800">Conversation</span>
          </h1>
          <p className="text-[15px] leading-relaxed text-stone-500"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Whether you're a student looking for tuition, a parent with questions, or just want to know more — I'd love to hear from you.
          </p>
        </div>

        {/* ── Two column layout ── */}
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">

          {/* LEFT — Contact info */}
          <div className="lg:sticky lg:top-32 space-y-8">

            {/* Info cards */}
            <div className="space-y-3">
              {contactInfo.map((info, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-white border border-stone-100 rounded-sm hover:border-amber-200 hover:shadow-[0_2px_16px_rgba(146,64,14,0.06)] transition-all duration-300 group">
                  <div className="w-9 h-9 rounded-sm bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0 text-amber-700 group-hover:bg-amber-100 transition-colors">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.18em] uppercase text-stone-400 mb-0.5"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {info.label}
                    </p>
                    {info.href ? (
                      <a href={info.href}
                        className="text-[14px] text-stone-700 hover:text-amber-800 transition-colors font-medium"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-[14px] text-stone-700 font-medium"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {info.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Availability badge */}
            <div className="p-5 bg-white border border-stone-100 rounded-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
                <span className="text-[11px] tracking-wide uppercase text-emerald-600 font-medium"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Currently accepting students
                </span>
              </div>
              <p className="text-[13px] text-stone-500 leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Limited slots available for O & A Level tuition this term. Early enquiries are encouraged.
              </p>
              <div className="mt-4 pt-4 border-t border-stone-100 grid grid-cols-2 gap-3">
                {[
                  { label: "O Level", slots: "3 slots left" },
                  { label: "A Level", slots: "2 slots left" },
                ].map((s) => (
                  <div key={s.label} className="text-center p-2.5 bg-amber-50 border border-amber-100 rounded-sm">
                    <p className="text-[13px] font-semibold text-amber-800"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                      {s.label}
                    </p>
                    <p className="text-[10px] text-amber-600 tracking-wide"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {s.slots}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative quote */}
            <div className="hidden lg:block p-5 border-l-2 border-amber-700/30">
              <p className="text-[16px] italic text-stone-500 leading-relaxed"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "18px" }}>
                "Every question asked is a step closer to mastery."
              </p>
              <div className="flex items-center gap-2 mt-3">
                <span className="w-5 h-px bg-amber-700"/>
                <span className="text-[10px] tracking-wide uppercase text-stone-400"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Miss Ayesha Khan
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT — Form */}
          <div className="bg-white border border-stone-100 rounded-sm shadow-[0_4px_32px_rgba(30,20,10,0.06)] overflow-hidden">

            {/* Form header */}
            <div className="px-8 py-6 border-b border-stone-100 bg-stone-50/60">
              <p className="text-[19px] font-semibold text-stone-800"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                Send a Message
              </p>
              <p className="text-[12.5px] text-stone-400 mt-1"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Fields marked with <span className="text-amber-700">*</span> are required.
              </p>
            </div>

            {/* Success state */}
            {status === "success" && (
              <div className="mx-8 mt-8 p-5 bg-emerald-50 border border-emerald-200 rounded-sm flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l3.5 3.5L13 5" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-emerald-800"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "16px" }}>
                    Message sent successfully!
                  </p>
                  <p className="text-[12.5px] text-emerald-700 mt-1"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {serverMessage} A confirmation email has been sent to your inbox.
                  </p>
                </div>
              </div>
            )}

            {/* Error banner */}
            {status === "error" && (
              <div className="mx-8 mt-8 p-4 bg-red-50 border border-red-200 rounded-sm flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="#dc2626" strokeWidth="1.3"/>
                  <path d="M8 5v4M8 11v1" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <p className="text-[12.5px] text-red-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {serverMessage}
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="p-8 space-y-6">

              {/* Row 1 — Name + Email */}
              <div className="grid sm:grid-cols-2 gap-5">
                <InputField label="Full Name" required error={errors.name}>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Sarah Khan"
                    className={`${inputClass} ${errors.name ? "border-red-300 focus:border-red-400" : ""}`}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </InputField>
                <InputField label="Email Address" required error={errors.email}>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`${inputClass} ${errors.email ? "border-red-300 focus:border-red-400" : ""}`}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </InputField>
              </div>

              {/* Row 2 — Phone + Level */}
              <div className="grid sm:grid-cols-2 gap-5">
                <InputField label="Phone Number" error={errors.phone}>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+92 300 0000000"
                    className={inputClass}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </InputField>
                <InputField label="Your Level" error={errors.level}>
                  <select
                    name="level"
                    value={form.level}
                    onChange={handleChange}
                    className={`${inputClass} cursor-pointer`}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <option value="">Select level...</option>
                    {levelOptions.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </InputField>
              </div>

              {/* Row 3 — Subject */}
              <InputField label="Subject / Enquiry" required error={errors.subject}>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className={`${inputClass} cursor-pointer ${errors.subject ? "border-red-300" : ""}`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <option value="">Select a subject...</option>
                  {subjectOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </InputField>

              {/* Row 4 — Message */}
              <InputField label="Your Message" required error={errors.message}>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Tell me about your current level, which topics you're finding difficult, and what kind of support you're looking for..."
                  className={`${inputClass} resize-none leading-relaxed ${errors.message ? "border-red-300 focus:border-red-400" : ""}`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
                <div className="flex justify-between mt-1">
                  <span/>
                  <span className={`text-[11px] ${form.message.length < 20 && form.message.length > 0 ? "text-red-400" : "text-stone-300"}`}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {form.message.length} / min 20
                  </span>
                </div>
              </InputField>

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full flex items-center justify-center gap-3 py-4 bg-amber-800 text-white text-[12px] tracking-widest uppercase font-semibold rounded-sm hover:bg-amber-900 active:scale-[0.99] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(146,64,14,0.25)]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {status === "loading" ? (
                  <>
                    <svg className="animate-spin" width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.5"
                        strokeDasharray="24 12" strokeLinecap="round"/>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-stone-400"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Your information is kept private and never shared with third parties.
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
