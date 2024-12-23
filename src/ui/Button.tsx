import { Link } from "react-router-dom";
import { ButtonProps } from "../types/types";

// Common base styles
const base =
  "inline-block py-1.5 rounded-full bg-red-500 font-semibold uppercase tracking-wide text-slate-800 transition-colors duration-300 hover:bg-red-400 focus:bg-red-400 focus:outline-none focus:ring focus:ring-red-500 focus:ring-offset-1 disabled:cursor-not-allowed";

// Style variations
const styles = {
  primary: base + "py-4 px-4 md:px-6 md:py-4",
  secondary:
    " px-4 md:px-6 md:py-3.5 inline-block py-1 rounded-full border-2 border-slate-300 font-semibold uppercase tracking-wide text-slate-500 hover:text-slate-100 transition-colors duration-300 hover:bg-slate-500 focus:bg-slate-100 focus:outline-none disabled:cursor-not-allowed",
  small: base + "py-6 px-2 md:px-4 md:py-2 text-xs",
  round:
    "rounded-full font-bold bg-red-500 text-slate-900 hover:bg-red-400 py-1 px-3 text-xs md:px-3.5 md:py-1.5 md:text-sm",
};

// Button component that can render as a `Link` (from React Router),
// a button with an `onClick` handler, or a standard button.
export function Button({
  children,
  disabled = false,
  to,
  type,
  onClick,
}: ButtonProps) {
  // If `to` is provided, render a `Link`
  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  // If `onClick` is provided, render a `button` with onClick handler
  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );

  // Otherwise, render a regular `button`
  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}
