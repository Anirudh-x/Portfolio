import { useRef, useState } from "react";
import { testimonials } from "../constants";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// ─── Relative Time Utility ─────────────────────────────────────────────────
const getRelativeTime = (isoDate) => {
  const now = new Date();
  const past = new Date(isoDate);
  const diffMs = now - past;

  if (diffMs < 0) return "just now"; // future-proof for live submissions

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours   = Math.floor(minutes / 60);
  const days    = Math.floor(hours / 24);
  const weeks   = Math.floor(days / 7);
  const months  = Math.floor(days / 30);
  const years   = Math.floor(days / 365);

  if (seconds < 60)    return "just now";
  if (minutes < 60)    return minutes === 1 ? "a minute ago" : `${minutes} minutes ago`;
  if (hours < 24)      return hours === 1 ? "an hour ago" : `${hours} hours ago`;
  if (days === 1)      return "a day ago";
  if (days < 7)        return `${days} days ago`;
  if (weeks === 1)     return "a week ago";
  if (weeks < 5)       return `${weeks} weeks ago`;
  if (months === 1)    return "a month ago";
  if (months < 12)     return `${months} months ago`;
  if (years === 1)     return "a year ago";
  return `${years} years ago`;
};
// ──────────────────────────────────────────────────────────────────────────

const StarRating = ({ rating }) => (
  <div className="flex gap-1">
    {Array.from({ length: rating }).map((_, i) => (
      <svg
        key={i}
        className="w-4 h-4 text-[#cfa355]"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef([]);
  const progressRef = useRef(null);
  const sectionRef = useRef(null);
  const text = `Real words\n  from real clients.`;

  useGSAP(() => {
    gsap.to(progressRef.current, {
      width: `${((activeIndex + 1) / testimonials.length) * 100}%`,
      duration: 0.5,
      ease: "power2.out",
    });
  }, [activeIndex]);

  useGSAP(() => {
    gsap.from(sectionRef.current, {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });
  }, []);

  const goTo = (index) => {
    if (index < 0 || index >= testimonials.length) return;
    const prev = cardRefs.current[activeIndex];
    const next = cardRefs.current[index];
    const direction = index > activeIndex ? 1 : -1;

    if (prev) {
      gsap.to(prev, {
        x: -60 * direction,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => gsap.set(prev, { x: 0, opacity: 0 }),
      });
    }

    setActiveIndex(index);

    if (next) {
      gsap.fromTo(
        next,
        { x: 60 * direction, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: "power2.out", delay: 0.05 }
      );
    }
  };

  const active = testimonials[activeIndex];

  return (
    <section
      id="testimonials"
      className="min-h-screen bg-[#393632] flex flex-col"
    >
      <AnimatedHeaderSection
        subTitle={"What clients say"}
        title={"Testimonials"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />

      <div
        ref={sectionRef}
        className="flex flex-col flex-1 px-6 md:px-10 pb-20 gap-12"
      >
        {/* Sliding cards */}
        <div className="relative overflow-hidden">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              ref={(el) => (cardRefs.current[i] = el)}
              className="absolute inset-0"
              style={{
                opacity: i === 0 ? 1 : 0,
                pointerEvents: i === activeIndex ? "auto" : "none",
              }}
            >
              <div className="flex flex-col gap-8 max-w-4xl">
                {/* Stars + time badge on same row */}
                <div className="flex items-center gap-4">
                  <StarRating rating={t.rating} />
                  {t.date && (
                    <span className="flex items-center gap-1.5 text-xs font-light tracking-widest text-white/30 uppercase">
                      <svg
                        className="w-3 h-3 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {getRelativeTime(t.date)}
                    </span>
                  )}
                </div>

                <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light text-white leading-relaxed">
                  &ldquo;{t.content}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4">
                  {/* Initials avatar */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#cfa355]/20 border border-[#cfa355]/40 flex items-center justify-center">
                    <span className="text-[#cfa355] font-light text-sm tracking-widest">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-light text-lg">{t.name}</p>
                    <p className="text-white/40 text-sm tracking-widest uppercase">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Invisible spacer — mirrors the active card's layout to give the container height */}
          <div className="invisible flex flex-col gap-8 max-w-4xl">
            <div className="flex items-center gap-4">
              <StarRating rating={5} />
              <span className="text-xs tracking-widest text-white/30 uppercase">
                {active.date ? getRelativeTime(active.date) : ""}
              </span>
            </div>
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light text-white leading-relaxed">
              &ldquo;{active.content}&rdquo;
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full" />
              <div>
                <p className="text-white font-light text-lg">{active.name}</p>
                <p className="text-white/40 text-sm tracking-widest uppercase">
                  {active.role}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-6 mt-auto">
          {/* Progress bar */}
          <div className="w-full h-px bg-white/10 relative">
            <div
              ref={progressRef}
              className="absolute top-0 left-0 h-px bg-[#cfa355] transition-none"
              style={{
                width: `${((activeIndex + 1) / testimonials.length) * 100}%`,
              }}
            />
          </div>

          {/* Navigation row */}
          <div className="flex items-center justify-between">
            {/* Counter */}
            <span className="text-white/30 text-sm font-light tracking-widest">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(testimonials.length).padStart(2, "0")}
            </span>

            {/* Dot indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    i === activeIndex
                      ? "w-6 h-1.5 bg-[#cfa355]"
                      : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-4">
              <button
                onClick={() => goTo(activeIndex - 1)}
                disabled={activeIndex === 0}
                className="group w-12 h-12 rounded-full border border-white/20 flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-[#cfa355]/60 hover:bg-[#cfa355]/10 disabled:opacity-20 disabled:cursor-not-allowed"
                aria-label="Previous testimonial"
              >
                <svg
                  className="w-4 h-4 text-white transition-transform duration-300 group-hover:-translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => goTo(activeIndex + 1)}
                disabled={activeIndex === testimonials.length - 1}
                className="group w-12 h-12 rounded-full border border-white/20 flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-[#cfa355]/60 hover:bg-[#cfa355]/10 disabled:opacity-20 disabled:cursor-not-allowed"
                aria-label="Next testimonial"
              >
                <svg
                  className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Client name strip */}
          <div className="flex flex-wrap gap-4 border-t border-white/10 pt-6">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => goTo(i)}
                className={`text-sm font-light tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                  i === activeIndex
                    ? "text-[#cfa355]"
                    : "text-white/30 hover:text-white/60"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
