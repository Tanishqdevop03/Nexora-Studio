import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Clock, Loader2, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import SocialIcons from "../components/SocialIcons";
import { services } from "../data/services";
import { site } from "../config/site";
import { sendContact } from "../lib/api";

const budgets = ["< $2k", "$2k – $5k", "$5k – $15k", "$15k+", "Not sure yet"];
const initialForm = { name: "", email: "", company: "", service: "", budget: "", message: "", website: "" };

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-white/70">{label}</span>
      {children}
      {error && <span className="mt-2 block text-sm text-red-400">{error}</span>}
    </label>
  );
}

const inputClass = (error) =>
  `w-full rounded-2xl border bg-surface-2 px-5 py-4 text-white placeholder:text-white/30 outline-none transition focus:border-accent ${
    error ? "border-red-400/70" : "border-line"
  }`;

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }));
  };

  const validate = () => {
    const err = {};
    if (form.name.trim().length < 2) err.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) err.email = "Please enter a valid email.";
    if (form.message.trim().length < 10) err.message = "Tell us a bit more (at least 10 characters).";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus({ state: "loading", message: "" });
    try {
      const res = await sendContact(form);
      setStatus({ state: "success", message: res.message });
      setForm(initialForm);
    } catch (err) {
      if (err.errors) setErrors(err.errors);
      setStatus({ state: "error", message: err.message });
    }
  };

  const contactItems = [
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: Phone, label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
    { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: `https://wa.me/${site.whatsapp}` },
    { icon: MapPin, label: "Location", value: site.location },
    { icon: Clock, label: "Response time", value: site.responseTime },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let&apos;s talk about <span className="text-accent">your project.</span>
          </>
        }
        description="Tell us what you're building. We'll get back within 24 hours with honest thoughts on how we can help — or who can."
      />

      <section className="pb-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <div className="relative rounded-[2rem] border border-line bg-surface p-6 md:p-10">
              <AnimatePresence mode="wait">
                {status.state === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex min-h-[500px] flex-col items-center justify-center text-center"
                  >
                    <span className="grid h-20 w-20 place-items-center rounded-full bg-accent text-black">
                      <CheckCircle2 size={40} />
                    </span>
                    <h2 className="mt-8 text-4xl font-semibold">Message sent!</h2>
                    <p className="mt-4 max-w-md text-muted">{status.message}</p>
                    <button
                      onClick={() => setStatus({ state: "idle", message: "" })}
                      className="mt-8 rounded-full border border-line px-6 py-3 text-sm font-semibold transition hover:bg-white hover:text-black"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={onSubmit} noValidate className="space-y-6" exit={{ opacity: 0 }}>
                    <div className="grid gap-6 md:grid-cols-2">
                      <Field label="Your name *" error={errors.name}>
                        <input value={form.name} onChange={update("name")} placeholder="John Doe" className={inputClass(errors.name)} />
                      </Field>
                      <Field label="Email *" error={errors.email}>
                        <input
                          type="email"
                          value={form.email}
                          onChange={update("email")}
                          placeholder="john@company.com"
                          className={inputClass(errors.email)}
                        />
                      </Field>
                      <Field label="Company">
                        <input value={form.company} onChange={update("company")} placeholder="Company name" className={inputClass()} />
                      </Field>
                      <Field label="Service">
                        <select value={form.service} onChange={update("service")} className={`${inputClass()} appearance-none`}>
                          <option value="">Select a service</option>
                          {services.map((s) => (
                            <option key={s.id} value={s.title}>
                              {s.title}
                            </option>
                          ))}
                          <option value="Other">Other</option>
                        </select>
                      </Field>
                    </div>

                    <div>
                      <span className="mb-3 block text-sm text-white/70">Budget</span>
                      <div className="flex flex-wrap gap-2">
                        {budgets.map((b) => (
                          <button
                            type="button"
                            key={b}
                            onClick={() => setForm((f) => ({ ...f, budget: f.budget === b ? "" : b }))}
                            className={`rounded-full px-5 py-2.5 text-sm transition ${
                              form.budget === b ? "bg-accent text-black" : "border border-line text-white/70 hover:text-white"
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Field label="Tell us about your project *" error={errors.message}>
                      <textarea
                        rows={6}
                        value={form.message}
                        onChange={update("message")}
                        placeholder="What are you building? What problem are you solving? Any timelines?"
                        className={`${inputClass(errors.message)} resize-none`}
                      />
                    </Field>

                    {/* Honeypot field — hidden from humans, catches bots */}
                    <input
                      type="text"
                      name="website"
                      value={form.website}
                      onChange={update("website")}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="absolute -left-[9999px] h-0 w-0 opacity-0"
                    />

                    {status.state === "error" && (
                      <p className="rounded-2xl border border-red-400/30 bg-red-400/10 px-5 py-4 text-sm text-red-300">
                        {status.message}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status.state === "loading"}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 font-semibold text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
                    >
                      {status.state === "loading" ? (
                        <>
                          <Loader2 className="animate-spin" size={18} /> Sending...
                        </>
                      ) : (
                        <>
                          Send Message <Send size={18} />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-4">
            <div className="space-y-3">
              {contactItems.map(({ icon: Icon, label, value, href }) => {
                const inner = (
                  <>
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-surface-2 text-accent">
                      <Icon size={20} />
                    </span>
                    <span>
                      <span className="block text-sm text-muted">{label}</span>
                      <span className="font-medium">{value}</span>
                    </span>
                  </>
                );
                return href ? (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex items-center gap-4 rounded-3xl border border-line p-5 transition hover:border-accent/50 hover:bg-surface"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={label} className="flex items-center gap-4 rounded-3xl border border-line p-5">
                    {inner}
                  </div>
                );
              })}
              <div className="rounded-3xl border border-line p-5">
                <p className="mb-4 text-sm text-muted">Follow us</p>
                <SocialIcons />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
