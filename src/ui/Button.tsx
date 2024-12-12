import { ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonVariant = "primary" | "small";

type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  to?: string;
  type: ButtonVariant;
};

// Common base styles
const base =
  "inline-block rounded-full bg-red-500 font-semibold uppercase tracking-wide text-slate-800 transition-colors duration-300 hover:bg-red-400 focus:bg-red-400 focus:outline-none focus:ring focus:ring-red-500 focus:ring-offset-1 disabled:cursor-not-allowed";

// Style variations
const styles = {
  primary: base + "px-4 py-3 md:px-6 md:py-4",
  small: base + "py-3 px-2 md:px-5 md:py-2 text-xs",
};

export function Button({ children, disabled = false, to, type }: ButtonProps) {
  // If `to` is provided, render a `Link`
  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  // Otherwise, render a regular `button`
  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}
