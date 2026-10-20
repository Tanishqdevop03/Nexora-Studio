import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, description, align = "left", className = "" }) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow && (
        <Reveal>
          <p className={`mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent ${centered ? "justify-center" : ""}`}>
            <span className="h-px w-6 bg-accent" />
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="text-4xl font-semibold leading-[1.05] md:text-6xl">{title}</h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="mt-5 text-lg leading-relaxed text-muted">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
