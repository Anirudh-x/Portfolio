import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { IoLogoGithub } from "react-icons/io5";
import { IoLogoLinkedin } from "react-icons/io5";
import gsap from "gsap";

const Contact = () => {
  const text = `To discuss further,
  Contact on below details.`;
  const items = [
    "just imagin, I code",
    "just imagin, I code",
    "just imagin, I code",
    "just imagin, I code",
    "just imagin, I code",
  ];
  useGSAP(() => {
    gsap.from(".social-link", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: ".social-link",
      },
    });
  }, []);
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
        <div className="flex px-10 font-light text-white uppercase lg:text-[32px] text-[26px] leading-none mb-10">
          <div className="flex flex-col w-full gap-10">
            <div className="social-link">
              <h2>E-mail</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <p className="text-xl tracking-wider lowercase md:text-2xl lg:text-3xl">
                aniruddharautofficial@gmail.com
              </p>
            </div>
            <div className="social-link">
              <h2>Phone</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <p className="text-xl lowercase md:text-2xl lg:text-3xl">
                +91 7385947544
              </p>
            </div>
            <div className="social-link">
              <h2>Social Media</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <div className="flex flex-wrap gap-2">
                <div className="flex flex-wrap md:flex-row gap-4 mt-2">
                  <a
                    href="https://www.linkedin.com/in/aniruddha-raut-16a300253/"
                    target="_blank"
                    className="text-sm leading-loose tracking-widest uppercase hover:text-white transition-colors duration-300"
                  >
                    <IoLogoLinkedin className="h-[2rem] w-[2rem]" />
                  </a>
                  <a
                    href="https://github.com/Anirudh-x"
                    target="_blank"
                    className="text-sm leading-loose tracking-widest uppercase hover:text-white transition-colors duration-300"
                  >
                    <IoLogoGithub className="h-[2rem] w-[2rem]" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Marquee items={items} className="text-white bg-transparent" />
    </section>
  );
};

export default Contact;
