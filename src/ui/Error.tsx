import { useRouteError } from "react-router-dom";
import { RouteError } from "../types/types";
import { LinkButton } from "./LinkButton";

// NotFound fallback component for handling route errors
export function NotFound() {
  const error = useRouteError() as RouteError;

  return (
    <div>
      <h1>Something went wrong!</h1>
      <p>{error.data || error.message}</p>

      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}
