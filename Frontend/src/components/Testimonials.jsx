import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { testimonials } from "../data/testimonials";

const pad = (n) => String(n).padStart(2, "0");
const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;
  const current = testimonials[index];

  const go = (dir) => setIndex((i) => (i + dir + total) % total);

  useEffect(() => {
    if (paused || total < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 7000);
    return () => clearInterval(id);
  }, [paused, total]);

  if (!total) return null;

  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Testimonials"
          title="What our clients say."
          description="Honest words from the founders and teams we've built with."
        />

        <div
          className="relative mt-16 overflow-hidden rounded-[2rem] border border-line bg-surface p-8 md:p-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Quote className="absolute top-8 right-8 text-accent/20" size={120} strokeWidth={1} />

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <p className="max-w-4xl font-display text-2xl leading-snug font-medium md:text-4xl">
                &ldquo;{current.quote}&rdquo;
              </p>
              <div className="mt-10 flex items-center gap-4">
                {current.avatar ? (
                  <img src={current.avatar} alt={current.name} className="h-14 w-14 rounded-full object-cover" />
                ) : (
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-accent font-semibold text-black">
                    {initials(current.name)}
                  </span>
                )}
                <div>
                  <p className="font-semibold">{current.name}</p>
                  <p className="text-sm text-muted">
                    {current.role}
                    {current.company && `, ${current.company}`}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 flex items-center justify-between border-t border-line pt-8">
            <p className="font-display text-lg">
              <span className="text-white">{pad(index + 1)}</span>
              <span className="text-muted"> / {pad(total)}</span>
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="grid h-12 w-12 place-items-center rounded-full border border-line transition hover:border-white hover:bg-white hover:text-black"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="grid h-12 w-12 place-items-center rounded-full bg-accent text-black transition hover:bg-white"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
