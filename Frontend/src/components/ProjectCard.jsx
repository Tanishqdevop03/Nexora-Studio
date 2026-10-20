import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export function ProjectCover({ project, className = "" }) {
  const [from, to] = project.color || ["#7c5cff", "#16161d"];
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${className}`}
      />
    );
  }
  return (
    <div
      className={`relative h-full w-full transition-transform duration-700 group-hover:scale-105 ${className}`}
      style={{ background: `radial-gradient(circle at 30% 20%, ${from}, ${to} 70%)` }}
    >
      <div className="absolute inset-0 bg-grid opacity-40" />
      <span className="absolute inset-0 grid place-items-center font-display text-6xl font-bold text-white/90 md:text-7xl">
        {project.title}
      </span>
    </div>
  );
}

export default function ProjectCard({ project, className = "" }) {
  return (
    <Link to={`/work/${project.slug}`} className={`group block ${className}`}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-surface">
        <ProjectCover project={project} />
        <span className="absolute top-5 right-5 grid h-12 w-12 place-items-center rounded-full bg-white text-black opacity-0 transition-all duration-500 group-hover:rotate-45 group-hover:opacity-100">
          <ArrowUpRight size={22} />
        </span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold transition-colors group-hover:text-accent">{project.title}</h3>
          <p className="mt-1 text-muted">{project.summary}</p>
        </div>
        <span className="shrink-0 text-sm text-muted">{project.year}</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-line px-3 py-1 text-xs text-white/70">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
