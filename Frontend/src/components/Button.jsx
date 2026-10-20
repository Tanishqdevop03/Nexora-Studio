import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const variants = {
  primary: "bg-accent text-black hover:bg-white",
  outline: "border border-line text-white hover:border-white hover:bg-white hover:text-black",
  ghost: "text-white hover:text-accent",
};

export default function Button({ to, href, children, variant = "primary", icon = true, className = "", ...props }) {
  const classes = `group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-300 ${variants[variant]} ${className}`;

  const content = (
    <>
      {children}
      {icon && (
        <ArrowUpRight
          size={18}
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer" {...props}>
        {content}
      </a>
    );
  }
  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
