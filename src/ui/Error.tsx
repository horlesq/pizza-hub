import { useNavigate, useRouteError } from "react-router-dom";
import { RouteError } from "../types/types";

export function NotFound() {
    const navigate = useNavigate();
    const error = useRouteError() as RouteError;
    console.log(error);

    return (
        <div>
            <h1>Something went wrong!</h1>
            <p>{error.data || error.message}</p>
            <button onClick={() => navigate(-1)}>&larr; Go back</button>
        </div>
    );
}
