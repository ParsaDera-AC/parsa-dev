import Header from "/components/Header.js";
import Hero from "/components/Hero";
import AboutMe from "/components/AboutMe";
import Projects from "/components/Projects";
import Contact from "/components/Contact";
import Skills from "@/components/Skills";
import Resume from "@/components/Resume";
import SoftSkills from "@/components/SoftSkills";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";

export default function Page() {
  return (
    <>
      <Header />
      <Hero />
      <AboutMe />
      <SoftSkills/>
      <Skills/>
      <Projects />
      <Contact />
      <Resume/>
      <Footer />
      <MobileNav />
    </>
  );
}
