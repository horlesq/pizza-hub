import { Link, useNavigate } from "react-router-dom";
import { LinkButtonProps } from "../types/types";

// LinkButton component renders a navigational button or link
export function LinkButton({ children, to }: LinkButtonProps) {
  const navigate = useNavigate();

  // Handle "Go Back" functionality for `to="-1"`
  if (to === "-1")
    return (
      <button
        className="text-sm font-semibold text-red-500 hover:text-red-700"
        onClick={() => navigate(-1)}
      >
        &larr; Go back
      </button>
    );

  // Standard Link for other routes
  return (
    <Link
      to={to}
      className="text-sm font-semibold text-red-500 hover:text-red-700"
    >
      {children}
    </Link>
  );
}
