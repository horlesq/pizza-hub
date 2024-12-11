import { ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  to: string;
};

export function Button({ children, disabled = false, to }: ButtonProps) {
  if (to)
    return (
      <Link
        to={to}
        className="inline-block rounded-full bg-red-500 px-4 py-3 font-semibold uppercase tracking-wide text-slate-800 transition-colors duration-300 hover:bg-red-400 focus:bg-red-400 focus:outline-none focus:ring focus:ring-red-500 focus:ring-offset-1 disabled:cursor-not-allowed"
      >
        {children}
      </Link>
    );

  return (
    <button
      disabled={disabled}
      className="inline-block rounded-full bg-red-500 px-4 py-3 font-semibold uppercase tracking-wide text-slate-800 transition-colors duration-300 hover:bg-red-400 focus:bg-red-400 focus:outline-none focus:ring focus:ring-red-500 focus:ring-offset-1 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}
