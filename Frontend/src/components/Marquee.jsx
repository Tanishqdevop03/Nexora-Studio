import { Asterisk } from "lucide-react";

export default function Marquee({ items, className = "" }) {
  const loop = [...items, ...items];
  return (
    <div className={`relative overflow-hidden border-y border-line py-6 ${className}`}>
      <div className="flex w-max animate-marquee">
        {loop.map((item, i) => (
          <div key={i} className="flex items-center gap-8 pr-8">
            <span className="font-display text-3xl font-medium whitespace-nowrap text-white/90 md:text-5xl">
              {item}
            </span>
            <Asterisk className="text-accent" size={32} />
          </div>
        ))}
      </div>
    </div>
  );
}
