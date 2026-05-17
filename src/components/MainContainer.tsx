import { lazy, Suspense, PropsWithChildren, useEffect, useState } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import Certificates from "./Certificates";
import setSplitText from "./utils/splitText";
import TechStack from "./TechStack";
import Stats from "./Stats";
import FunFacts from "./FunFacts";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Particles = () => (
  <div className="particles-bg" aria-hidden="true">
    {Array.from({ length: 12 }).map((_, i) => (
      <div className="particle" key={i} />
    ))}
  </div>
);

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView]);

  // Scroll-reveal animations
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal-up");
    revealElements.forEach((el) => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.toggleActions === "play none none none") {
          t.kill();
        }
      });
    };
  }, []);

  return (
    <div className="container-main">
      <Particles />
      <Cursor />
      <Navbar />
      <SocialIcons />
      {children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing />
            <About />
            <Stats />
            <WhatIDo />
            <TechStack />
            <Career />
            <Work />
            <Certificates />
            <FunFacts />
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;

