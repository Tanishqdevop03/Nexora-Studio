import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import Reveal from "./Reveal";
import SocialIcons from "./SocialIcons";
import { navLinks, site } from "../config/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line pt-24 pb-10">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />

      <div className="container-x relative">
        <Reveal>
          <Link to="/contact" className="group block">
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-muted">Have an idea?</p>
            <h2 className="flex flex-wrap items-center gap-4 text-5xl font-semibold leading-none md:text-8xl">
              Let&apos;s build something
              <span className="text-accent">extraordinary.</span>
              <span className="grid h-16 w-16 place-items-center rounded-full bg-accent text-black transition-transform duration-500 group-hover:rotate-45 md:h-24 md:w-24">
                <ArrowUpRight size={40} />
              </span>
            </h2>
          </Link>
        </Reveal>

        <div className="mt-20 grid gap-12 border-t border-line pt-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-muted">
              A product engineering studio building SaaS platforms, AI automations and custom software for ambitious
              founders.
            </p>
            <SocialIcons className="mt-6" />
          </div>

          <div>
            <h4 className="mb-4 text-sm uppercase tracking-[0.2em] text-muted">Menu</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-white/80 transition hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm uppercase tracking-[0.2em] text-muted">Contact</h4>
            <ul className="space-y-3 text-white/80">
              <li>
                <a href={`mailto:${site.email}`} className="transition hover:text-accent">
                  {site.email}
                </a>
              </li>
              {site.phones.map((phone) => (
                <li key={phone}>
                  <a href={`tel:${phone.replace(/\s/g, "")}`} className="transition hover:text-accent">
                    {phone}
                  </a>
                </li>
              ))}
              <li>
                <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer" className="transition hover:text-accent">
                  WhatsApp
                </a>
              </li>
              <li className="text-muted">{site.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-line pt-8 text-sm text-muted md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse-dot rounded-full bg-accent" />
            Available worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
