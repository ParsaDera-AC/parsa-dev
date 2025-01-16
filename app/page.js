import Header from "/components/Header.js";
import Hero from "/components/Hero";
import AboutMe from "/components/AboutMe";
import Projects from "/components/Projects";
import Contact from "/components/Contact";
import Skills from "@/components/Skills";

export default function Page() {
  return (
    <>
      <Header />
      <Hero />
      <AboutMe />
      <Skills/>
      <Projects />
      <Contact />
    </>
  );
}
