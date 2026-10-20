import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import Button from "./Button";
import SocialIcons from "./SocialIcons";
import { navLinks, site } from "../config/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled && !open ? "border-b border-line bg-ink/70 py-3 backdrop-blur-xl" : "py-5"
      }`}
    >
      <nav className="container-x flex items-center justify-between">
        <Logo className="relative z-50" />

        <ul className="hidden items-center gap-1 rounded-full border border-line bg-surface/60 p-1 backdrop-blur md:flex">
          {navLinks
            .filter((l) => l.to !== "/contact")
            .map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `block rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                      isActive ? "bg-white text-black" : "text-white/70 hover:text-white"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
        </ul>

        <Button to="/contact" className="hidden md:inline-flex">
          Start a Project
        </Button>

        <button
          onClick={() => setOpen((o) => !o)}
          className="relative z-50 grid h-11 w-11 place-items-center rounded-full border border-line md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-5 pt-28 pb-10 md:hidden"
          >
            <ul className="space-y-2">
              {[{ label: "Home", to: "/" }, ...navLinks].map((link, i) => (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                >
                  <NavLink
                    to={link.to}
                    end
                    className={({ isActive }) =>
                      `font-display text-5xl font-semibold ${isActive ? "text-accent" : "text-white"}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            <div className="space-y-6">
              <a href={`mailto:${site.email}`} className="block text-lg text-muted">
                {site.email}
              </a>
              <SocialIcons />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
