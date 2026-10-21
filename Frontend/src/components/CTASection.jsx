import { Mail, MessageCircle, Phone } from "lucide-react";
import Button from "./Button";
import Reveal from "./Reveal";
import { site } from "../config/site";

export default function CTASection() {
  const options = [
    { icon: Mail, label: "Email us", value: site.email, href: `mailto:${site.email}` },
    ...site.phones.map((phone) => ({
      icon: Phone,
      label: "Call us",
      value: phone,
      href: `tel:${phone.replace(/\s/g, "")}`,
    })),
    { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: `https://wa.me/${site.whatsapp}` },
  ];

  return (
    <section className="py-24">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-accent p-8 text-black md:p-16">
            <div className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/40 blur-3xl" />
            <div className="relative grid gap-12 lg:grid-cols-2 lg:items-end">
              <div>
                <h2 className="text-4xl leading-[1.05] font-semibold md:text-6xl">
                  Got a technical problem that needs solving?
                </h2>
                <p className="mt-6 max-w-lg text-lg text-black/70">
                  We take on complex engineering without overselling. If we&apos;re not the right fit, we&apos;ll tell you
                  upfront.
                </p>
                <Button to="/contact" className="mt-8 bg-black text-white hover:bg-white hover:text-black">
                  Let&apos;s Talk
                </Button>
              </div>
              <div className="grid gap-3">
                {options.map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex items-center gap-4 rounded-2xl bg-black/5 p-4 transition hover:bg-black hover:text-white"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-black text-accent">
                      <Icon size={20} />
                    </span>
                    <span>
                      <span className="block text-sm opacity-60">{label}</span>
                      <span className="font-semibold">{value}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
