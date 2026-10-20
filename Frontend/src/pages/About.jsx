import { CheckCircle2, Handshake, ShieldCheck, Zap } from "lucide-react";
import PageHeader from "../components/PageHeader";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import Counter from "../components/Counter";
import Marquee from "../components/Marquee";
import CTASection from "../components/CTASection";
import { stats } from "../config/site";
import { process, ticker } from "../data/services";

const values = [
  { icon: ShieldCheck, title: "Honesty first", text: "If we can't deliver it well, we'll tell you before you sign — not after." },
  { icon: Handshake, title: "Direct access", text: "No middle-men. You talk to the engineers and designers doing the work." },
  { icon: Zap, title: "Ship fast, ship right", text: "Weekly demos, tight feedback loops and code that's built to last." },
];

const audience = [
  "Founders building their first serious product",
  "Operators who need internal tools and automations",
  "SaaS teams that need extra senior engineering hands",
  "Businesses in fintech, edtech, SaaS and services",
];

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About Nexora"
        title={
          <>
            A small studio with <span className="text-accent">serious engineering.</span>
          </>
        }
        description="We're a team of engineers and designers who love solving hard problems. We started Nexora to give founders what most agencies can't: senior people, honest advice and products that actually scale."
      />

      <section className="py-16">
        <div className="container-x grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="rounded-3xl border border-line bg-surface p-6 md:p-8">
                <p className="font-display text-5xl font-semibold md:text-6xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-4 text-sm text-muted">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="container-x grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Who we work with" title="Built for founders who mean business." />
            <ul className="mt-10 space-y-4">
              {audience.map((item, i) => (
                <Reveal key={item} delay={i * 0.06}>
                  <li className="flex items-start gap-3 text-lg text-white/80">
                    <CheckCircle2 className="mt-1 shrink-0 text-accent" size={20} />
                    {item}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal delay={0.1}>
            <blockquote className="relative h-full rounded-[2rem] border border-line bg-surface p-8 md:p-12">
              <p className="font-display text-2xl leading-snug md:text-3xl">
                &ldquo;Most agencies sell you a website. We sit with you, understand the business, and engineer the
                system that actually moves the needle.&rdquo;
              </p>
              <footer className="mt-10 flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-accent font-semibold text-black">TG</span>
                <div>
                  <p className="font-semibold">Tanishq Garg</p>
                  <p className="text-sm text-muted">Founder, Nexora Studio</p>
                </div>
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Our values" title="How we work." />
          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {values.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.1}>
                <div className="h-full rounded-3xl border border-line p-8 transition hover:border-accent/50 hover:bg-surface">
                  <Icon className="text-accent" size={32} />
                  <h3 className="mt-8 text-2xl font-semibold">{title}</h3>
                  <p className="mt-3 text-muted">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Process" title="From first call to launch." />
          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.08} className="bg-ink">
                <div className="h-full p-8">
                  <span className="font-display text-5xl font-semibold text-accent">{p.step}</span>
                  <h3 className="mt-8 text-2xl font-semibold">{p.title}</h3>
                  <p className="mt-3 text-muted">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Marquee items={ticker} className="my-12" />
      <CTASection />
    </>
  );
}
