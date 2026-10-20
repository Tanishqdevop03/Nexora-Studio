import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import ProjectCard from "../components/ProjectCard";
import Testimonials from "../components/Testimonials";
import CTASection from "../components/CTASection";
import { categories, projects } from "../data/projects";

export default function Work() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title={
          <>
            Products we&apos;re <span className="text-accent">proud of.</span>
          </>
        }
        description="A selection of platforms, AI systems and websites we've designed and engineered for our clients."
      />

      <section className="pb-24">
        <div className="container-x">
          <div className="no-scrollbar mb-12 flex gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition ${
                  active === cat ? "bg-accent text-black" : "border border-line text-white/70 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div layout className="grid gap-x-8 gap-y-16 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <Testimonials />
      <CTASection />
    </>
  );
}
