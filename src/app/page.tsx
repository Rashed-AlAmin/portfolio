import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Activity } from "@/components/sections/activity";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main id="main" className="mx-auto max-w-5xl px-5 sm:px-8">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Activity />
      <Contact />
    </main>
  );
}
