import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight, Cpu, Layers, Users } from "lucide-react";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import Marquee from "../components/Marquee";
import Counter from "../components/Counter";
import SectionHeading from "../components/SectionHeading";
import ProjectCard from "../components/ProjectCard";
import Testimonials from "../components/Testimonials";
import CTASection from "../components/CTASection";
import { services, ticker } from "../data/services";
import { projects } from "../data/projects";
import { stats } from "../config/site";

const ease = [0.22, 1, 0.36, 1];
const heroWords = ["Complex", "products,", "engineered", "for", "ambitious", "founders."];

const pillars = [
  { icon: Layers, title: "Product Engineering", text: "Architecture and code built to scale — not to be rewritten in six months." },
  { icon: Cpu, title: "AI & Automation", text: "LLM features and automations that save real hours, not demo-ware." },
  { icon: Users, title: "Direct Founder Access", text: "You talk to the people building your product. No account managers in between." },
];

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-32 pb-20">
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="pointer-events-none absolute top-1/4 -left-40 h-[500px] w-[500px] rounded-full bg-violet/25 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-accent/15 blur-[140px]" />

      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-2 text-sm text-white/80 backdrop-blur"
        >
          <span className="h-2 w-2 animate-pulse-dot rounded-full bg-accent" />
          Taking on new projects for this quarter
        </motion.div>

        <h1 className="max-w-6xl text-[13vw] leading-[0.95] font-semibold sm:text-7xl md:text-8xl lg:text-[7.5rem]">
          {heroWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pr-[0.25em] align-top">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.1 + i * 0.08, ease }}
                className={`inline-block ${i >= 4 ? "text-accent" : ""}`}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="max-w-xl text-lg leading-relaxed text-muted md:text-xl"
          >
            We build SaaS platforms, AI automations and custom software that typical agencies can&apos;t handle — with
            senior engineers you talk to directly.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="flex flex-wrap gap-3"
          >
            <Button to="/work">See Our Work</Button>
            <Button to="/services" variant="outline">
              What We Build
            </Button>
          </motion.div>
        </div>

        <motion.a
          href="#intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-20 hidden items-center gap-3 text-sm text-muted transition hover:text-white md:inline-flex"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full border border-line">
            <ArrowDown size={16} className="animate-bounce" />
          </span>
          Scroll to explore
        </motion.a>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section id="intro" className="py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="About us"
              title={
                <>
                  We build. <span className="text-muted">Not just design.</span>
                </>
              }
            />
            <Reveal delay={0.15}>
              <p className="mt-8 text-lg leading-relaxed text-white/80 md:text-xl">
                Nexora is a product engineering studio for SaaS, AI and custom software. We partner with established
                founders and operators — in fintech, SaaS, edtech and services — to turn hard technical problems into
                products that work.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                A senior engineer is personally involved in every project, you work directly with the people building
                it, and if something isn&apos;t a fit, we say so upfront.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <Link to="/about" className="mt-8 inline-flex items-center gap-2 font-semibold text-accent hover:underline">
                More about us <ArrowUpRight size={18} />
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:col-span-5">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div className="flex h-full flex-col justify-between rounded-3xl border border-line bg-surface p-6 md:p-8">
                  <p className="font-display text-5xl font-semibold md:text-6xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-6 text-sm text-muted">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-4 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <div className="group h-full rounded-3xl border border-line p-8 transition-colors hover:border-accent/50 hover:bg-surface">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-surface-2 text-accent transition group-hover:bg-accent group-hover:text-black">
                  <Icon size={24} />
                </span>
                <h3 className="mt-8 text-2xl font-semibold">{title}</h3>
                <p className="mt-3 text-muted">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesPreview() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow="What we actually build" title="Engineering hard problems." />
          <Reveal>
            <Button to="/services" variant="outline">
              All Services
            </Button>
          </Reveal>
        </div>

        <div className="mt-16 border-t border-line">
          {services.slice(0, 4).map((service, i) => (
            <Reveal key={service.id} delay={i * 0.05}>
              <Link
                to={`/services#${service.id}`}
                className="group grid gap-4 border-b border-line py-8 transition-colors md:grid-cols-12 md:items-center md:py-10"
              >
                <span className="font-display text-muted md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-3xl font-semibold transition-all duration-500 group-hover:translate-x-2 group-hover:text-accent md:col-span-5 md:text-4xl">
                  {service.title}
                </h3>
                <p className="text-muted md:col-span-4">{service.short}</p>
                <div className="flex items-center justify-between md:col-span-2 md:justify-end md:gap-4">
                  <span className="rounded-full border border-line px-3 py-1 text-xs text-white/70">{service.tag}</span>
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-black">
                    <ArrowUpRight size={20} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedWork() {
  const featured = projects.filter((p) => p.featured);
  if (!featured.length) return null;

  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Featured work"
            title="Selected projects & innovations."
            description="A curated look at products we've designed, engineered and shipped."
          />
          <Reveal>
            <Button to="/work" variant="outline">
              View All Work
            </Button>
          </Reveal>
        </div>
      </div>

      <div className="no-scrollbar mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 md:px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} className="w-[85vw] shrink-0 snap-start sm:w-[480px]" />
        ))}
      </div>
      <p className="container-x mt-6 text-sm text-muted">← Swipe to explore →</p>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee items={ticker} />
      <Intro />
      <ServicesPreview />
      <FeaturedWork />
      <Testimonials />
      <CTASection />
    </>
  );
}
