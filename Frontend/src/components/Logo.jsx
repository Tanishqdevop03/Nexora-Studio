import { Link } from "react-router-dom";

export default function Logo({ className = "" }) {
  return (
    <Link
      to="/"
      aria-label="Nexora Studio home"
      className={`font-display text-2xl font-bold tracking-tight text-white ${className}`}
    >
      nexora<span className="text-accent">.</span>
    </Link>
  );
}
