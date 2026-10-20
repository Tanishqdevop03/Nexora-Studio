import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Check } from "lucide-react";
import PageHeader from "../components/PageHeader";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import CTASection from "../components/CTASection";
import { process, services } from "../data/services";

export default function Services() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  }, [hash]);

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={
          <>
            What we <span className="text-accent">actually build.</span>
          </>
        }
        description="From MVPs to AI systems and scalable platforms — we cover the full product lifecycle with a small, senior team."
      />

      <section className="pb-24">
        <div className="container-x space-y-6">
          {services.map((service, i) => (
            <Reveal key={service.id}>
              <article
                id={service.id}
                className="group grid scroll-mt-28 gap-10 rounded-[2rem] border border-line bg-surface p-8 transition-colors hover:border-accent/40 md:p-12 lg:grid-cols-12"
              >
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-4">
                    <span className="font-display text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <span className="rounded-full border border-line px-3 py-1 text-xs text-white/70">{service.tag}</span>
                  </div>
                  <h2 className="mt-6 text-4xl font-semibold md:text-5xl">{service.title}</h2>
                  <p className="mt-5 text-lg leading-relaxed text-muted">{service.description}</p>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7">
                  <div>
                    <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">What&apos;s included</h4>
                    <ul className="space-y-3">
                      {service.points.map((point) => (
                        <li key={point} className="flex items-center gap-3">
                          <span className="grid h-6 w-6 place-items-center rounded-full bg-accent/15 text-accent">
                            <Check size={14} />
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">Tech we use</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.stack.map((tech) => (
                        <span key={tech} className="rounded-full bg-surface-2 px-4 py-2 text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Button to="/contact" variant="ghost" className="mt-8 px-0">
                      Discuss this service
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Process" title="A simple, transparent process." align="center" />
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.08}>
                <div className="relative h-full rounded-3xl border border-line p-8">
                  <span className="font-display text-6xl font-semibold text-white/10">{p.step}</span>
                  <h3 className="mt-4 text-2xl font-semibold">{p.title}</h3>
                  <p className="mt-3 text-muted">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
