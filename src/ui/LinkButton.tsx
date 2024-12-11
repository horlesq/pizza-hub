import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

type ButtonProps = {
  children: ReactNode;
  to: string;
};

export function LinkButton({ children, to }: ButtonProps) {
  const navigate = useNavigate();

  if (to === "-1")
    return (
      <button
        className="text-sm font-semibold text-red-500 hover:text-red-700"
        onClick={() => navigate(-1)}
      >
        &larr; Go back
      </button>
    );

  return (
    <Link
      to={to}
      className="text-sm font-semibold text-red-500 hover:text-red-700"
    >
      {children}
    </Link>
  );
}
