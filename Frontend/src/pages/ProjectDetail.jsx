import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import { ProjectCover } from "../components/ProjectCard";
import CTASection from "../components/CTASection";
import NotFound from "./NotFound";
import { projects } from "../data/projects";

export default function ProjectDetail() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return <NotFound />;

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  const meta = [
    { label: "Client", value: project.client },
    { label: "Year", value: project.year },
    { label: "Category", value: project.category },
    { label: "Services", value: project.tags.join(", ") },
  ];

  return (
    <>
      <section className="pt-36 md:pt-44">
        <div className="container-x">
          <Link to="/work" className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-white">
            <ArrowLeft size={16} /> All projects
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-6xl font-semibold md:text-9xl"
          >
            {project.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 max-w-2xl text-xl text-muted"
          >
            {project.summary}
          </motion.p>

          <div className="mt-12 grid grid-cols-2 gap-6 border-y border-line py-8 md:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label}>
                <p className="text-xs uppercase tracking-[0.2em] text-muted">{m.label}</p>
                <p className="mt-2 font-medium">{m.value}</p>
              </div>
            ))}
          </div>

          <Reveal>
            <div className="group mt-12 aspect-[16/9] overflow-hidden rounded-[2rem] border border-line">
              <ProjectCover project={project} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x grid gap-16 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">The challenge</h2>
            <p className="mt-6 text-2xl leading-snug md:text-3xl">{project.challenge}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Our solution</h2>
            <p className="mt-6 text-2xl leading-snug md:text-3xl">{project.solution}</p>
          </Reveal>
        </div>

        {project.results?.length > 0 && (
          <div className="container-x mt-20">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Results</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {project.results.map((r, i) => (
                <Reveal key={r} delay={i * 0.08}>
                  <div className="h-full rounded-3xl border border-line bg-surface p-8 font-display text-2xl font-medium">
                    {r}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {project.link && (
          <div className="container-x mt-12">
            <Button href={project.link}>Visit Live Site</Button>
          </div>
        )}
      </section>

      {next && next.slug !== project.slug && (
        <section className="border-t border-line py-20">
          <Link to={`/work/${next.slug}`} className="container-x group block">
            <p className="text-sm uppercase tracking-[0.2em] text-muted">Next project</p>
            <h2 className="mt-4 flex items-center gap-6 text-5xl font-semibold transition-colors group-hover:text-accent md:text-8xl">
              {next.title}
              <ArrowUpRight className="transition-transform duration-500 group-hover:rotate-45" size={64} />
            </h2>
          </Link>
        </section>
      )}

      <CTASection />
    </>
  );
}
