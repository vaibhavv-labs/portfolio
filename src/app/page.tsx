import Starfield from "@/components/Starfield";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certificates from "@/components/Certificates";
import Marquee from "@/components/Marquee";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Starfield />
      <Navbar />
      <Hero />
      <About />
      <Stats />
      <Skills />
      <Projects />
      <Experience />
      <Certificates />
      <Marquee />
      <Contact />
    </main>
  );
}
