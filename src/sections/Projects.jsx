import { useRef, useState } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { projects } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { IoArrowForward, IoLogoGithub } from "react-icons/io5";

const Projects = () => {
  const cardRefs = useRef([]);
  const overlayRefs = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const text = `Handpicked work\n  that moves the needle.`;

  useGSAP(() => {
    // Staggered card entrance on scroll
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.from(el, {
        y: 80,
        opacity: 0,
        duration: 1,
        delay: i * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
        },
      });
    });
  }, []);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    const overlay = overlayRefs.current[index];
    if (!overlay) return;
    gsap.killTweensOf(overlay);
    gsap.fromTo(
      overlay,
      { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
      {
        clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
        duration: 0.35,
        ease: "power2.out",
      }
    );
  };

  const handleMouseLeave = (index) => {
    setHoveredIndex(null);
    const overlay = overlayRefs.current[index];
    if (!overlay) return;
    gsap.killTweensOf(overlay);
    gsap.to(overlay, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      duration: 0.3,
      ease: "power2.in",
    });
  };

  return (
    <section id="projects" className="flex flex-col min-h-screen pb-24 bg-[#e5e5e0]">
      <AnimatedHeaderSection
        subTitle={"Selected"}
        title={"Work"}
        text={text}
        textColor={"text-black"}
        withScrollTrigger={true}
      />

      {/* Grid */}
      <div className="px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => (cardRefs.current[index] = el)}
            className="relative group overflow-hidden rounded-2xl border border-black/10 bg-white/30 flex flex-col cursor-pointer"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            {/* Dark sweep overlay */}
            <div
              ref={(el) => (overlayRefs.current[index] = el)}
              className="absolute inset-0 bg-[#393632] z-10 pointer-events-none"
              style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
            />

            {/* Project image */}
            <div className="relative w-full h-56 overflow-hidden">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Index badge */}
              <span className="absolute top-4 left-4 z-20 text-xs font-light tracking-widest text-white/70 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                0{index + 1}
              </span>
            </div>

            {/* Content */}
            <div className="relative z-20 flex flex-col flex-1 gap-4 p-6">
              {/* Title & subtitle */}
              <div>
                <h2
                  className={`text-2xl lg:text-3xl font-light leading-tight transition-colors duration-300 ${
                    hoveredIndex === index ? "text-white" : "text-black"
                  }`}
                >
                  {project.name}
                </h2>
                <p
                  className={`text-xs font-light tracking-widest uppercase mt-1 transition-colors duration-300 ${
                    hoveredIndex === index ? "text-white/50" : "text-black/40"
                  }`}
                >
                  {project.subtitle}
                </p>
              </div>

              {/* Description */}
              <p
                className={`text-sm font-light leading-relaxed transition-colors duration-300 ${
                  hoveredIndex === index ? "text-white/70" : "text-black/60"
                }`}
              >
                {project.description}
              </p>

              {/* Tech chips */}
              <div className="flex flex-wrap gap-2 mt-auto pt-2">
                {project.frameworks.map((fw) => (
                  <span
                    key={fw.id}
                    className={`px-3 py-1 rounded-full text-xs font-light tracking-wider uppercase border transition-all duration-300 ${
                      hoveredIndex === index
                        ? "border-white/25 text-white/60"
                        : "border-black/15 text-black/45"
                    }`}
                  >
                    {fw.name}
                  </span>
                ))}
              </div>

              {/* CTA row */}
              <div className="flex items-center justify-between pt-4 border-t border-black/10">
                <div
                  className={`w-full border-t transition-colors duration-300 ${
                    hoveredIndex === index ? "border-white/10" : "border-black/10"
                  }`}
                />
                <div className="flex items-center gap-3 shrink-0">
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                      className={`transition-colors duration-300 ${
                        hoveredIndex === index
                          ? "text-white/60 hover:text-white"
                          : "text-black/40 hover:text-black"
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <IoLogoGithub className="w-5 h-5" />
                    </a>
                  )}
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center gap-1.5 text-xs font-light tracking-widest uppercase transition-colors duration-300 group/link ${
                      hoveredIndex === index
                        ? "text-white hover:text-white/70"
                        : "text-black hover:text-black/60"
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    View
                    <IoArrowForward className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
