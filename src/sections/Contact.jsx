import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import {
  IoLogoGithub,
  IoLogoLinkedin,
  IoCheckmarkCircle,
  IoAlertCircle,
  IoChevronDown,
  IoCheckmark,
} from "react-icons/io5";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";

const SUBJECTS = [
  "Full-Stack Development",
  "DevOps & Cloud Solutions",
  "Security & Performance Audit",
  "Web / Mobile Application",
  "Automation & AI Integration",
  "General Inquiry",
  "Partnership / Collaboration",
  "Other",
];

const INITIAL_STATE = {
  name: "",
  phone: "",
  email: "",
  subject: "",
  message: "",
  referrer: "",
};

// ── Input field wrapper ───────────────────────────────────────────────────────
const Field = ({ label, optional = false, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-light tracking-[0.2em] uppercase text-white/40 flex gap-2">
      {label}
      {optional && (
        <span className="text-[#cfa355]/60 normal-case tracking-normal">optional</span>
      )}
    </label>
    {children}
    {error && (
      <p className="text-xs text-red-400/80 font-light flex items-center gap-1">
        <IoAlertCircle className="w-3.5 h-3.5 shrink-0" />
        {error}
      </p>
    )}
  </div>
);

const inputCls =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white font-light text-sm placeholder:text-white/20 focus:outline-none focus:border-[#cfa355]/50 focus:bg-white/8 transition-all duration-300";

const Contact = () => {
  const text = `To discuss further,\n  Contact on below details.`;
  const items = [
    "just imagin, I code",
    "just imagin, I code",
    "just imagin, I code",
    "just imagin, I code",
    "just imagin, I code",
  ];

  const [form, setForm] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const formRef = useRef(null);
  const successRef = useRef(null);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (dropdownOpen) {
      gsap.killTweensOf(menuRef.current);
      gsap.set(menuRef.current, { display: "block" });
      gsap.fromTo(
        menuRef.current,
        {
          height: 0,
          opacity: 0,
          scaleY: 0.95,
          transformOrigin: "top center",
        },
        {
          height: "auto",
          opacity: 1,
          scaleY: 1,
          duration: 0.35,
          ease: "power3.out",
        }
      );
    } else {
      gsap.killTweensOf(menuRef.current);
      gsap.to(menuRef.current, {
        height: 0,
        opacity: 0,
        scaleY: 0.95,
        duration: 0.22,
        ease: "power2.inOut",
        transformOrigin: "top center",
        onComplete: () => {
          if (menuRef.current) {
            gsap.set(menuRef.current, { display: "none" });
          }
        },
      });
    }
  }, [dropdownOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSelectSubject = (val) => {
    setForm((prev) => ({ ...prev, subject: val }));
    if (errors.subject) setErrors((prev) => ({ ...prev, subject: "" }));
  };

  useGSAP(() => {
    gsap.from(".social-link", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: { trigger: ".social-link" },
    });
    gsap.from(".contact-form-field", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: { trigger: ".contact-form-field", start: "top 85%" },
    });
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^\+?[\d\s\-()]{7,15}$/.test(form.phone.trim()))
      e.phone = "Enter a valid phone number";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address";
    if (!form.subject) e.subject = "Please select a subject";
    if (form.referrer && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.referrer))
      e.referrer = "Enter a valid referrer email";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      // Shake the form
      gsap.fromTo(
        formRef.current,
        { x: -8 },
        { x: 0, duration: 0.4, ease: "elastic.out(1,0.3)" }
      );
      return;
    }

    setStatus("sending");
    setErrors({});

    // ── Simulate async submission (swap for real API later) ──
    await new Promise((res) => setTimeout(res, 1500));

    setStatus("success");
    gsap.fromTo(
      successRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );

    // Reset after 5s
    setTimeout(() => {
      setForm(INITIAL_STATE);
      setStatus("idle");
    }, 5000);
  };

  return (
    <section
      id="contact"
      className="flex flex-col justify-between min-h-screen bg-black"
    >
      <div>
        <AnimatedHeaderSection
          subTitle={"You Dream It, I Code it"}
          title={"Contact"}
          text={text}
          textColor={"text-white"}
          withScrollTrigger={true}
        />

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-16 px-6 md:px-10 mb-16">

          {/* ── Left: contact info ─────────────────────────────────────── */}
          <div className="flex flex-col gap-10 font-light text-white uppercase lg:text-[28px] text-[22px] leading-none lg:w-1/3 shrink-0">
            <div className="social-link">
              <h2>E-mail</h2>
              <div className="w-full h-px my-3 bg-white/20" />
              <p className="text-base tracking-wider lowercase normal-case text-white/60">
                aniruddharautofficial@gmail.com
              </p>
            </div>
            <div className="social-link">
              <h2>Phone</h2>
              <div className="w-full h-px my-3 bg-white/20" />
              <p className="text-base lowercase text-white/60">
                +91 7385947544
              </p>
            </div>
            <div className="social-link">
              <h2>Social</h2>
              <div className="w-full h-px my-3 bg-white/20" />
              <div className="flex gap-4 mt-1">
                <a
                  href="https://www.linkedin.com/in/aniruddha-raut-16a300253/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/50 hover:text-white transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <IoLogoLinkedin className="h-7 w-7" />
                </a>
                <a
                  href="https://github.com/Anirudh-x"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/50 hover:text-white transition-colors duration-300"
                  aria-label="GitHub"
                >
                  <IoLogoGithub className="h-7 w-7" />
                </a>
              </div>
            </div>

            {/* Availability badge */}
            {/* <div className="social-link">
              <div className="flex items-center gap-3 mt-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                </span>
                <p className="text-sm font-light tracking-widest text-green-400/80 normal-case">
                  Available for new projects
                </p>
              </div>
            </div> */}
          </div>

          {/* ── Right: form ────────────────────────────────────────────── */}
          <div className="flex-1">
            {status === "success" ? (
              <div
                ref={successRef}
                className="flex flex-col items-center justify-center gap-6 h-full min-h-[400px] text-center"
              >
                <IoCheckmarkCircle className="w-16 h-16 text-[#cfa355]" />
                <div>
                  <h3 className="text-white text-2xl font-light mb-2">Message sent!</h3>
                  <p className="text-white/40 text-sm font-light tracking-wider">
                    I'll get back to you within 24 hours.
                  </p>
                </div>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                className="grid grid-cols-1 sm:grid-cols-2 gap-5"
              >
                {/* Name */}
                <div className="contact-form-field">
                  <Field label="Full Name" error={errors.name}>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Arjun Mehta"
                      className={`${inputCls} ${errors.name ? "border-red-400/40" : ""}`}
                    />
                  </Field>
                </div>

                {/* Phone */}
                <div className="contact-form-field">
                  <Field label="Phone Number" error={errors.phone}>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className={`${inputCls} ${errors.phone ? "border-red-400/40" : ""}`}
                    />
                  </Field>
                </div>

                {/* Email */}
                <div className="contact-form-field">
                  <Field label="Email Address" error={errors.email}>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="arjun@company.com"
                      className={`${inputCls} ${errors.email ? "border-red-400/40" : ""}`}
                    />
                  </Field>
                </div>

                {/* Subject dropdown */}
                <div className={`contact-form-field ${dropdownOpen ? "relative z-50" : "relative z-10"}`}>
                  <Field label="Subject" error={errors.subject}>
                    <div className="relative" ref={dropdownRef}>
                      <button
                        id="contact-subject"
                        type="button"
                        onClick={() => setDropdownOpen((prev) => !prev)}
                        aria-haspopup="listbox"
                        aria-expanded={dropdownOpen}
                        className={`${inputCls} flex items-center justify-between text-left cursor-pointer transition-all duration-300 ${errors.subject ? "border-red-400/40" : ""
                          } ${dropdownOpen
                            ? "border-[#cfa355] ring-1 ring-[#cfa355]/40 bg-[#393632]"
                            : "hover:border-[#cfa355]/40"
                          } ${form.subject === "" ? "text-white/20" : "text-white"}`}
                      >
                        <span className="truncate">
                          {form.subject || "Select a service…"}
                        </span>
                        <IoChevronDown
                          className={`w-4 h-4 text-[#cfa355] transition-transform duration-300 shrink-0 ml-2 ${dropdownOpen ? "rotate-180" : ""
                            }`}
                        />
                      </button>

                      <input
                        type="hidden"
                        name="subject"
                        value={form.subject}
                      />

                      <div
                        ref={menuRef}
                        role="listbox"
                        style={{
                          display: "none",
                          height: 0,
                          opacity: 0,
                          backgroundColor: "#1c1a17",
                        }}
                        className="absolute left-0 right-0 top-full mt-2 z-50 rounded-xl border border-[#cfa355]/40 shadow-2xl shadow-black overflow-hidden origin-top"
                      >
                        <div
                          style={{ backgroundColor: "#1c1a17" }}
                          className="py-1 divide-y divide-[#2a2723]"
                        >
                          {SUBJECTS.map((s) => {
                            const isSelected = form.subject === s;
                            return (
                              <button
                                key={s}
                                type="button"
                                role="option"
                                aria-selected={isSelected}
                                onClick={() => {
                                  handleSelectSubject(s);
                                  setDropdownOpen(false);
                                }}
                                style={{
                                  backgroundColor: isSelected
                                    ? "rgba(207, 163, 85, 0.2)"
                                    : "#1c1a17",
                                }}
                                className={`w-full px-4 py-2.5 text-left text-sm font-light flex items-center justify-between transition-colors duration-150 cursor-pointer ${isSelected
                                    ? "text-[#cfa355] font-medium"
                                    : "text-[#e5e5e0]/90 hover:bg-[#cfa355]/15 hover:text-[#cfa355]"
                                  }`}
                              >
                                <span>{s}</span>
                                {isSelected && (
                                  <IoCheckmark className="w-4 h-4 text-[#cfa355] shrink-0 ml-2" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </Field>
                </div>

                {/* Message — full width */}
                <div className="contact-form-field sm:col-span-2">
                  <Field label="Message" optional>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell me about your project, timeline, budget…"
                      className={`${inputCls} resize-none`}
                    />
                  </Field>
                </div>

                {/* Referrer email — full width */}
                <div className="contact-form-field sm:col-span-2">
                  <Field label="Referrer's Email" optional error={errors.referrer}>
                    <input
                      id="contact-referrer"
                      type="email"
                      name="referrer"
                      value={form.referrer}
                      onChange={handleChange}
                      placeholder="Who referred you? (their email)"
                      className={`${inputCls} ${errors.referrer ? "border-red-400/40" : ""}`}
                    />
                  </Field>
                </div>

                {/* Submit */}
                <div className="contact-form-field sm:col-span-2">
                  <button
                    id="contact-submit"
                    type="submit"
                    disabled={status === "sending"}
                    className="group relative w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-[#cfa355] text-black text-sm font-light tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#cfa355]/90 hover:gap-5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer overflow-hidden"
                  >
                    {status === "sending" ? (
                      <>
                        <svg
                          className="w-4 h-4 animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg
                          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <Marquee items={items} className="text-white bg-transparent" />
    </section>
  );
};

export default Contact;
