import { motion } from "framer-motion";

export default function PageHeader({ eyebrow, title, description }) {
  return (
    <section className="relative overflow-hidden pt-40 pb-16 md:pt-48 md:pb-24">
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-violet/20 blur-[120px]" />
      <div className="container-x relative">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent"
        >
          <span className="h-px w-6 bg-accent" />
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl text-5xl leading-[1] font-semibold md:text-8xl"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
