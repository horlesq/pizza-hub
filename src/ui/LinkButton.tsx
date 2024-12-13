import { Link, useNavigate } from "react-router-dom";
import { LinkButtonProps } from "../types/types";

export function LinkButton({ children, to }: LinkButtonProps) {
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
